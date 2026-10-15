import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {freeModel,family,panelAvailable} from '../server/core.js';
import {modelIdentity,uniqueModels} from '../server/identity.js';
import {nvidiaModels,nvidiaConnection,nvidiaGeneration} from '../server/nvidia.js';

const token='nvapi-FIXTURE_ONLY_123456789';
function fixture(config={token,freeOnly:true},response){
 const calls=[],writes=[];
 const ctx=vm.createContext({freeModel,family,nvidiaConnection,nvidiaGeneration,Buffer,AbortSignal,Response,Date,setTimeout,clearTimeout,
  secret:async provider=>{assert.equal(provider,'nvidia');return JSON.stringify(config)},
  q:async(sql,args)=>{writes.push({sql,args});return sql.startsWith('SELECT * FROM ca_provider_state')?[{next_at:new Date(0)}]:sql.startsWith('UPDATE ca_provider_state')?[{}]:[]},
  fetch:async(url,init)=>{calls.push({url,init});if(response)return response(url,init);return Response.json(url.endsWith('/models')?{data:[...nvidiaModels.map(id=>({id})),{id:'paid/unknown'},{id:'nvidia/nemotron-embed'}]}:{model:nvidiaModels[2],choices:[{finish_reason:'stop',message:{content:'OK'}}],usage:{prompt_tokens:9,completion_tokens:1}})}
 });
 vm.runInContext(fs.readFileSync(new URL('../server/providers.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,'').replace(/export /g,'')+'\nglobalThis.api={request,discover,chat};',ctx);
 return {ctx,calls,writes};
}
test('NVIDIA ödeme/partner modeli DB free etiketi taşısa bile çağrıdan önce reddedilir',async()=>{
 const f=fixture();await assert.rejects(()=>f.ctx.api.chat({provider:'nvidia',name:'paid/unknown',free:true,enabled:true},'Sistem','Soru'),/izin listesinde değil/);assert.equal(f.calls.length,0);
});
test('NVIDIA ücretsiz prototip onayı ve kendi anahtarı olmadan ağ çağrısı yapmaz',async()=>{
 for(const config of [{token,freeOnly:false},{token:'groq_TEST_KEY',freeOnly:true}]){
  const f=fixture(config);await assert.rejects(()=>f.ctx.api.request('nvidia','/models'),/onayı gerekli/);assert.equal(f.calls.length,0);
 }
});
test('NVIDIA keşfi yalnız resmî API listesindeki dört izinli kimliği kaydeder; sağlık uydurmaz',async()=>{
 const f=fixture();const models=await f.ctx.api.discover('nvidia',true);
 assert.equal(models.length,4);assert.equal(f.calls[0].url,'https://integrate.api.nvidia.com/v1/models');
 const inserts=f.writes.filter(w=>w.sql.startsWith('INSERT INTO ca_models'));
 assert.equal(inserts.length,4);assert.ok(inserts.every(w=>w.args[5]===false));
 assert.equal(panelAvailable({free:true,enabled:true,health:'untested'}),false);
});
test('NVIDIA anahtarı yalnız sabit NVIDIA hostuna gider; kısa Nemotron yanıtında düşünme kapatılır',async()=>{
 const f=fixture();const model={id:'nvidia:'+nvidiaModels[2],provider:'nvidia',name:nvidiaModels[2],free:true,enabled:true};
 const result=await f.ctx.api.chat(model,'Türkçe yaz','OK',512);
 assert.equal(f.calls[0].url,'https://integrate.api.nvidia.com/v1/chat/completions');
 assert.equal(f.calls[0].init.headers.Authorization,'Bearer '+token);
 const body=JSON.parse(f.calls[0].init.body);assert.equal(body.model,model.name);assert.equal(body.chat_template_kwargs.enable_thinking,false);assert.equal(body.max_tokens,512);
 assert.equal(result.actualModel,model.name);assert.equal(result.text,'OK');assert.equal(JSON.stringify(result).includes(token),false);
});
test('NVIDIA quota yanıtı açık hata olur; token veya sağlayıcı hata gövdesi sızmaz',async()=>{
 const f=fixture(undefined,()=>new Response('secret='+token,{status:429,headers:{'retry-after':'60'}}));
 await assert.rejects(()=>f.ctx.api.chat({id:'test',provider:'nvidia',name:nvidiaModels[0],free:true,enabled:true},'Sistem','Soru'),e=>e.status===429&&e.retryAfter===60&&!e.message.includes(token));
 assert.equal(f.calls.length,1);assert.ok(f.writes.some(w=>w.args?.[1]==='quota'));
});
test('NVIDIA kataloğu erişilemediğinde boş başarılı keşif gösterilmez',async()=>{
 const f=fixture(undefined,()=>new Response('denied',{status:403}));await assert.rejects(()=>f.ctx.api.discover('nvidia',true),/HTTP 403/);assert.equal(f.writes.length,0);
});
test('aynı Gemma başka sağlayıcıdan gelse de tek model sayılır; NVIDIA hakem değildir',()=>{
 assert.equal(modelIdentity('nvidia:google/gemma-4-31b-it'),modelIdentity('openrouter:google/gemma-4-31b-it:free'));
 assert.equal(uniqueModels([{name:'nvidia:google/gemma-4-31b-it'},{name:'openrouter:google/gemma-4-31b-it:free'}]).length,1);
 assert.equal(freeModel('nvidia','deepseek-flash'),false);
});
test('NVIDIA güvenli formu telefon için Account ID istemez ve prototip koşulunu açıklar',()=>{
 const el={innerHTML:'',addEventListener(){}};
 const ctx=vm.createContext({document:{getElementById:()=>el},URL,URLSearchParams,location:{href:'https://example.com/',pathname:'/',search:'',hash:''},history:{replaceState(){}},setTimeout,clearTimeout});
 vm.runInContext(fs.readFileSync(new URL('../public/app.js',import.meta.url),'utf8').replace(/init\(\);\s*$/,''),ctx);
 vm.runInContext("state.signed=true;state.tab='Bağlantılar';state.status={settings:{freeConfirmed:true},providers:[{id:'nvidia',name:'NVIDIA',verified:true,connected:false,docs:'https://build.nvidia.com/'}],models:[]};render()",ctx);
 assert.match(el.innerHTML,/Generate API Key/);assert.match(el.innerHTML,/name="nvidiaFree"/);assert.match(el.innerHTML,/name="key"/);assert.doesNotMatch(el.innerHTML,/name="accountId"/);assert.match(el.innerHTML,/kesintisiz üretim kotası değildir/);
});

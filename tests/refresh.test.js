import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const source=fs.readFileSync(new URL('../public/app.js',import.meta.url),'utf8');
async function restore(search,runs){let detailCalls=0;const context=vm.createContext({document:{activeElement:null},URLSearchParams,encodeURIComponent,location:{search},tabs:['Konsey','Tartışma'],state:{signed:true,run:null,question:'',tab:'Konsey'},render(){},async api(path){if(path==='status')return {};if(path==='runs')return {runs};detailCalls++;return {run:{id:path.slice(5),question:'Sırçalı Hotel',mode:'live'},events:[{stage:'critique'}]}}});vm.runInContext(source.slice(source.indexOf('async function reload(){'),source.indexOf('\nfunction connect()')),context);await vm.runInContext('reload()',context);return {state:context.state,detailCalls}}
test('yenilemede seçili araştırma, tartışma ve olaylar geri yüklenir',async()=>{const {state,detailCalls}=await restore('?run=older&view=Tart%C4%B1%C5%9Fma',[{id:'new',mode:'live',status:'processing'},{id:'older',mode:'live',status:'completed'}]);assert.equal(state.run.id,'older');assert.equal(state.tab,'Tartışma');assert.equal(state.events[0].stage,'critique');assert.equal(detailCalls,1)});
test('eski bağlantıda sürmekte olan araştırma otomatik açılır',async()=>{const {state}=await restore('',[{id:'health',mode:'health',status:'completed'},{id:'active',mode:'live',status:'processing'}]);assert.equal(state.run.id,'active')});

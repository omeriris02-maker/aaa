import test from 'node:test';
import assert from 'node:assert/strict';
import {panelAvailable} from '../server/core.js';
const now=Date.now(),base={provider:'groq',free:true,enabled:true,health:'healthy',last_tested:new Date(now-100000)};
test('geçici kota ve timeout bekleme sonrasında yeniden denenebilir',()=>{assert.equal(panelAvailable({...base,health:'quota'},now),true);assert.equal(panelAvailable({...base,health:'timeout'},now),true);assert.equal(panelAvailable({...base,health:'quota',last_tested:new Date(now-30000)},now),false);assert.equal(panelAvailable({...base,circuit_until:new Date(now+10000)},now),false)});
test('ücretli, sınanmamış, iptal edilmiş ve kalıcı hatalı model kullanılmaz',()=>{for(const overrides of [{free:false},{provider:'deepseek'},{enabled:false},{health:'untested'},{health:'disconnected'},{health:'error'},{last_tested:null}])assert.equal(panelAvailable({...base,...overrides},now),false)});

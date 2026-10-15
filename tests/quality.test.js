import test from 'node:test';
import assert from 'node:assert/strict';
import {researchTask,inspectAnswer,debateDigest} from '../server/quality.js';
test('sekiz rol ayrı araştırma odağı ve sorgusu alır',()=>{const tasks=Array.from({length:8},(_,i)=>researchTask('Sırçalı Hotel',i));assert.equal(new Set(tasks.map(t=>t.query)).size,8);assert.equal(new Set(tasks.map(t=>t.angle)).size,8)});
test('olmayan kaynaklar, kesik yanıt ve tekrar işaretlenir',()=>{const r=inspectAnswer('özlü bir şekilde tekrar eden sözcükler '.repeat(5)+' [S1] [S9]',[{id:'S1'}],'length');assert.deepEqual(r.unknownCitations,['S9']);assert.equal(r.truncated,true);assert.equal(r.warnings.length,3)});
test('hakem özeti revizyonu önce tutar ve byte bütçesine sığar',()=>{const events=['research','critique','revision'].flatMap(stage=>Array.from({length:8},(_,i)=>({agent:i,stage,model:'test',targets:[],text:'Kanıt ve güncellenmiş sonuç. '.repeat(100),metadata:{quality:{warnings:['Kesik']}}})));const digest=debateDigest(events,8000);assert.equal(digest[0].stage,'revision');assert.equal(digest.length,24);assert.ok(Buffer.byteLength(JSON.stringify(digest))<=8000);assert.equal(digest[0].qualityWarnings[0],'Kesik')});

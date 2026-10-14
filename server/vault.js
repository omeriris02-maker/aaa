import {randomBytes,createCipheriv,createDecipheriv} from 'node:crypto';
import {q} from './db.js';
export function seal(value,key,provider){const iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',key,iv);cipher.setAAD(Buffer.from(provider));const encrypted=Buffer.concat([cipher.update(value,'utf8'),cipher.final()]);return {iv:iv.toString('base64'),tag:cipher.getAuthTag().toString('base64'),data:encrypted.toString('base64')}}
export function unseal(value,key,provider){const cipher=createDecipheriv('aes-256-gcm',key,Buffer.from(value.iv,'base64'));cipher.setAAD(Buffer.from(provider));cipher.setAuthTag(Buffer.from(value.tag,'base64'));return Buffer.concat([cipher.update(Buffer.from(value.data,'base64')),cipher.final()]).toString('utf8')}
function root(){const key=Buffer.from(process.env.VAULT_MASTER_KEY||'','base64');if(key.length!==32)throw Error('Anahtar kasası yapılandırılmadı');return key}
export async function secret(provider){const [row]=await q('SELECT cipher FROM ca_keys WHERE provider=$1',[provider]);if(!row)throw Error(provider+': anahtar bağlı değil');return unseal(row.cipher,root(),provider)}
export async function saveSecret(provider,value){await q('INSERT INTO ca_keys(provider,cipher) VALUES($1,$2) ON CONFLICT(provider) DO UPDATE SET cipher=$2,updated_at=now()',[provider,seal(value,root(),provider)])}

export const researchAngles=[
 'Resmi birinci taraf kaynağı, kimlik ve doğrudan yanıt',
 'Bağımsız kaynaklarla iddia ve karşı kanıt karşılaştırması',
 'İddianın yanlış olabileceği durumlar ve güncellik',
 'Somut adres, sayısal veri, teknik ayrıntılar',
 'Birinci taraf belge, tarih ve kaynak güvenilirliği',
 'Güncel uygulama, erişilebilirlik ve pratik riskler',
 'Benzer isimler, alternatif açıklamalar ve ayrıştırma',
 'En güçlü karşı kanıt ve yanlış eşleştirme ihtimali'
];
export function researchTask(question,index){return {angle:researchAngles[index%8],query:question+' '+['resmi site','adres bilgi','kapalı isim değişikliği','adres konum','resmi belge','iletişim','benzer isim','yorum tarih'][index%8]}}
export function inspectAnswer(text,sources,finishReason){const known=new Set(sources.map(s=>s.id));const unknown=[...new Set([...text.matchAll(/\[(S\d+)\]/g)].map(m=>m[1]).filter(id=>!known.has(id)))];const warnings=[];if(unknown.length)warnings.push('Kaynak listesinde olmayan atıflar: '+unknown.join(', '));if(['length','MAX_TOKENS'].includes(finishReason))warnings.push('Yanıt token sınırında kesildi; tamamlanmış sonuç sayılmamalı');if(/(.{18,100}?)\1\1/u.test(text))warnings.push('Tekrarlayan bozuk çıktı; kanıt olarak güvenilmemeli');return {warnings,unknownCitations:unknown,truncated:['length','MAX_TOKENS'].includes(finishReason)}}
export function debateDigest(events,byteBudget){const ranked=[...events].sort((a,b)=>({revision:0,critique:1,research:2}[a.stage]-{revision:0,critique:1,research:2}[b.stage]));const rows=ranked.map(e=>({agent:e.agent+1,stage:e.stage,model:e.model,targets:e.targets.map(i=>i+1),qualityWarnings:e.metadata?.quality?.warnings||[],text:e.text.slice(0,e.stage==='revision'?1800:e.stage==='critique'?900:500)}));while(Buffer.byteLength(JSON.stringify(rows))>byteBudget&&rows.some(r=>r.text.length>100))for(const r of rows)r.text=r.text.slice(0,Math.max(100,Math.floor(r.text.length*.85)));return rows}

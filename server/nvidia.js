// Public API Catalog prototype endpoints; no partner or paid endpoint routing.
export const nvidiaModels = Object.freeze([
 'deepseek-ai/deepseek-v4.1-flash',
 'nvidia/nemotron-3-ultra-550b-a55b',
 'nvidia/nemotron-3.5-lightning-30b-a3b',
 'google/gemma-4-31b-it'
]);
export function nvidiaConnection(value){
 let config;
 try{config=JSON.parse(value)}catch{throw Error('NVIDIA ücretsiz prototip bağlantısını güvenli formdan yeniden kaydedin')}
 if(config?.freeOnly!==true||!/^nvapi-[A-Za-z0-9._-]{8,}$/.test(config.token||''))throw Error('NVIDIA API Catalog anahtarı ve ücretsiz prototip kullanım onayı gerekli');
 return config.token;
}
export function nvidiaGeneration(name){
 return name.startsWith('nvidia/nemotron-')?{chat_template_kwargs:{enable_thinking:false}}:{};
}

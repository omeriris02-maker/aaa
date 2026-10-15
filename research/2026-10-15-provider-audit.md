# Council AI — resmî ücretsiz API incelemesi

Kontrol: 15 Ekim 2026. Kamuya açık resmî belgeler ve model katalogları HTTPS ile incelendi. Kullanıcının canlı anahtarlarıyla yeni inference/kalite testi yapılmadı; katalog görünürlüğü erişim veya kalite garantisi değildir. Bu çalışma yeni sağlayıcı etkinleştirmedi.

## Uygun ve koşullu adaylar

| Sağlayıcı | Resmî bulgu | Karar |
|---|---|---|
| Groq | Free Plan tablosunda openai/gpt-oss-120b, openai/gpt-oss-20b, qwen/qwen3.8-27b için 30 RPM, 1.000 RPD, 8.000 TPM, 200.000 TPD. Kesin limit hesapta değişebilir. | GPT-OSS 120B ve Qwen'i ayrı kısa görevlerle test et. 120B'yi yalnız parametre sayısı nedeniyle kazanan ilan etme. |
| Gemini | gemini-3.8-flash, gemini-3.6-flash, gemini-2.5-flash ve Flash-Lite için standart API giriş/çıkış ücretsiz katmanı var. Gemini 4 Argon ücretsiz değil. Limitler proje bazlı; AI Studio'dan görülmeli. | Bir güçlü Gemini seç; aynı aileyle konseyi doldurma. Free tier projesi kullanılmalı, ücretli proje aynı model için faturalandırılabilir. |
| OpenRouter | Canlı /models yanıtında 15 adet :free kimlikte prompt/completion fiyatı sıfır. Ücretsiz router ve müzik modelleri genel araştırma adayı sayılmadı. Ücretsiz hesap kesin günlük kotası /api/v1/key içindeki free_model_daily_requests ile öğrenilmeli. | Gemma 4 31B, Nemotron 3 Ultra, Inkling aday; Laguna yedek. North-mini-code/LFM 2.6B genel araştırmada öncelikli değil. Bu tercih değerlendirme hipotezidir, ölçülmüş sıralama değil. |
| Z.ai | Resmî GLM-4.5 sayfası GLM-4.5-Flash'ı Free olarak tanımlıyor; normal GLM-4.5/Air ücretsiz sayılmaz. | Farklı aile olarak tut; endpoint ve anahtar sağlayıcısı korunmalı. |
| Cloudflare Workers AI | Workers Free için 10.000 Neuron/gün; UTC 00:00 sıfırlama, aşımda hata. Llama 3.3 70B katalogda. Bazı Kimi/GLM/DeepSeek frontier modelleri ücretli billing/prepaid gerektiriyor. | Yeni sağlayıcı için en somut aday. Workers Free hesabı, model izinleri ve gerçek test gerekli. |
| Ollama Cloud | Free planda aylık yenilenen başlangıç kullanım kredisi, starter modeller ve 1 eşzamanlı istek. Daha büyük modeller için kredi gerekebilir. Kamuya açık /api/tags tüm hesaba ücretsiz modeller listesi değildir. | Koşullu yedek sağlayıcı; starter listesi/ücretsiz kalan kota hesapta doğrulanmadan büyük modeller açılmamalı. |
| Mistral | Güncel belgelerde Free mode ve planlar arası aylık kullanım; pay-as-you-go kapalıysa kullanım durabilir. Açık belgeler araştırılan hesap için ücretsiz API model/kota miktarını kesinleştirmiyor. Eski Experiment doküman adresleri 404. | Hesapta ücretsiz API erişimi ve bütçesi görülmeden etkinleştirme. |

## Elenen / doğrulanamayan seçenekler

- GitHub Models: GitHub Docs, 30 Temmuz 2026 itibarıyla playground, katalog, inference API ve BYOK hizmetinin tamamen emekli edildiğini bildiriyor. Copilot ayrı üründür.
- Cerebras: Resmî FAQ kalıcı ücretsiz katman olmadığını, doğrulanmış ödeme yöntemiyle 30 günde süresi dolan 5 dolar deneme kredisi verdiğini söylüyor. Sürekli ücretsiz panel hedefini karşılamıyor.
- xKiro: Resmî domain erişimi bu ortamda 403 ile engellendi; ücretsiz koşullar ve API/model eşleşmesi doğrulanamadı. Ücretsiz diye tanıtılmamalı.
- SenseNova/MiniMax gibi model ailesinin açık olması API'nin ücretsiz olduğu anlamına gelmez. Ollama kataloğunda olmaları ücretsiz hesaba erişim kanıtı değil.

## Sekiz farklı aile için önerilen test havuzu

1. Groq — openai/gpt-oss-120b
2. Groq — qwen/qwen3.8-27b
3. Gemini — gemini-3.8-flash (erişim/sağlık sonucuna göre ücretsiz 3.6 veya 2.5)
4. Cloudflare — Llama 3.3 70B Instruct FP8 Fast
5. OpenRouter — google/gemma-4-31b-it:free
6. OpenRouter — nvidia/nemotron-3-ultra-550b-a55b:free
7. OpenRouter — thinkingmachines/inkling:free
8. Z.ai — glm-4.5-flash

Bu, test önerisidir; sekizinin kullanıcı hesabında başarıyla bağlandığı iddia edilmiyor. Özellikle OpenRouter 403/429 ve modelin kısa görünür yanıt üretmesi ölçülmeli. Yedekler başka rolün modelini devralamaz. Yeni Cloudflare ailesi kullanılamazsa Laguna ayrı aile adayıdır.

## Seçim ölçütleri

Aynı Türkçe görevler: doğru otel paydaları; sağlanmamış bir S numarası uydurmama; tarih/erişim ayrımı; haklı eleştiriyle görüş değiştirme; 70 kelimelik anlaşılır cevap; gecikme; timeout/429 oranı. En az birkaç tekrar gerekir. Sadece OK sağlık testi kalite ölçümü değildir. Sonuçlar modele/gerçek sağlayıcıya göre kaydedilmeli; başarısızlıklar saklanmamalı.

## Resmî kaynaklar

- https://console.groq.com/docs/models
- https://console.groq.com/docs/rate-limits
- https://ai.google.dev/gemini-api/docs/pricing
- https://ai.google.dev/gemini-api/docs/rate-limits
- https://openrouter.ai/api/v1/models
- https://openrouter.ai/docs/api-reference/limits
- https://openrouter.ai/docs/guides/routing/model-variants/free
- https://docs.z.ai/guides/llm/glm-4.5
- https://developers.cloudflare.com/workers-ai/platform/pricing/
- https://developers.cloudflare.com/workers-ai/models/
- https://ollama.com/pricing
- https://docs.ollama.com/cloud
- https://ollama.com/api/tags
- https://docs.github.com/en/github-models/use-github-models/prototyping-with-ai-models
- https://inference-docs.cerebras.ai/support/rate-limits
- https://docs.mistral.ai/admin/billing-usage/subscriptions.md
- https://docs.mistral.ai/inference/pricing.md

## OpenCode ek inceleme ve düzeltme

Resmî repo, `deepseek-v4.1-flash-free` fiyatını ücretsiz ve genel belgede ücretsiz sohbeti anahtarsız gösteriyor. Ancak gerçek istek (15 Ekim 2026, resmî `/zen/v1/chat/completions` uyumluluk yolu) HTTP 403 JSON ile `FreeTierError: OpenCode's free tier can only be used from within OpenCode` döndürdü. Bu çalışma koşulu Council AI kullanımını dışlıyor. Model bu uygulamada kapatıldı; uygulama kimliği taklidi veya kısıt aşma yapılmadı. Önceki yalnız 403/bağlantı açıklaması bu ayrıntıyı kaçırmıştı. Katalogdaki ücretsiz fiyat, üçüncü taraf uygulamada kullanım izni kanıtı değildir.

Kaynak kodda uyumluluk yolu: https://github.com/anomalyco/opencode/blob/dev/packages/console/app/src/lib/inference-proxy.ts . Genel belge: https://github.com/anomalyco/opencode/blob/dev/services/www/src/docs/content/console/api/inference.mdx . Çelişkinin ayrımı: genel endpoint belgeleri ile gerçek ücretsiz katmanın istemci kullanım kuralı aynı şey değil.

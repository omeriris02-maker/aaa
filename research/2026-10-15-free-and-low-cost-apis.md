# Council AI: ücretsiz ve düşük maliyetli API araştırması

Kontrol tarihi: 15 Ekim 2026. Resmî belgeler, fiyat tabloları ve herkese açık model kataloğu incelendi. Bu çalışma yeni sağlayıcılarda gerçek çıkarım/kalite testi yapıldığını göstermez. Kullanıcı anahtarları okunmadı; ücretli panel açılmadı ve satın alma yapılmadı.

## Karar

- Yeni incelenecek en dikkat çekici ücretsiz aday **NVIDIA API Catalog**. Resmî ana sayfa ücretsiz inference sunuyor ve DeepSeek V4.1 Flash ile Nemotron modellerini listeliyor. Hesaba özel kota, sürekli ücretsiz kullanım ve Council AI'nin üretim kullanımına uygun koşullar doğrulanmadan canlı ücretsiz havuza alınmamalı.
- Yenilenen ücretsiz kota için mevcut **Groq, Gemini, Z.ai, Cloudflare ve OpenRouter :free** seçenekleri hâlâ temel adaylar. Her sağlayıcının hesabı, kotası ve modeli ayrı doğrulanmalı.
- Çok ucuz ücretli çeşitlilik için **DeepInfra** öncelikli karşılaştırma adayı. **OpenRouter ücretli katalog** ikinci seçenek; bakiye süresi ve satın alma ücretleri önemli.
- Kullanıcının mevcut kuralı sürüyor: ücretli çağrı yalnız doğrudan DeepSeek hakemi. Aşağıdaki ücretli panel örnekleri yalnız maliyet karşılaştırmasıdır.

## Ücretsiz adayların durumu

| Sağlayıcı | Doğrulanan durum | Council AI açısından sonuç |
|---|---|---|
| [NVIDIA](https://build.nvidia.com/) | Ana sayfada “Free inference with leading models”; DeepSeek V4.1 Flash ve Nemotron ailesi listeleniyor. | Yeni aday. Dokümantasyon kökü bu ortamdan 403 verdi; hesap kotası ve üretim koşulu tamamlanamadı. Gerçek sağlık/kalite testi yapılmadı. |
| [Cloudflare Workers AI](https://developers.cloudflare.com/workers-ai/platform/pricing/) | Günlük 10.000 Neurons ücretsiz; Workers Free planında kota sonrasında çağrılar durur. | Hesap Free kalmalı. Ücretli/purchased-credit gerektiren modeller bu kotaya otomatik dahil sayılmaz. |
| [Groq](https://console.groq.com/docs/rate-limits) | Model bazında Free plan sınırları var; GPT-OSS ve Qwen gibi aileler bulunuyor. | Gerçek hesabın kalan token/istek kotası belirleyici. Aynı modelin başka sağlayıcıdaki kopyası çeşitlilik sayılmaz. |
| [Gemini](https://ai.google.dev/gemini-api/docs/pricing) | Desteklenen modellerde ayrı ücretsiz katman var. | Billing açılmış projenin ücretli kullanımı ücretsiz katmanla karıştırılmamalı; hesap ve model uygunluğu kontrol edilmeli. |
| [Z.ai](https://docs.z.ai/guides/llm/glm-4.5) | GLM-4.5-Flash ücretsiz olarak belirtiliyor. | Büyük GLM modellerine ücretsiz olduğu varsayımıyla geçilmez. |
| [OpenRouter](https://openrouter.ai/api/v1/models) | Kontrol edilen katalogda 15 adet açık `:free` kimlikli, prompt/completion fiyatı sıfır model kaydı var. | Katalog kaydı sağlık testi değildir. Hesabın günlük ücretsiz kotası ayrıca kontrol edilmeli; otomatik router model kimliğini gizleyebilir. |
| [Ollama Cloud](https://ollama.com/pricing) | Ücretsiz planda sınırlı başlangıç kullanımı; katalogdaki her model ücretsiz değil. | Ücretsiz hesapta gerçekten erişilebilen modeller ve eşzamanlılık doğrulanmadan sayılmaz. |
| [OVHcloud](https://docs.ovhcloud.com/en/guides/public-cloud/ai-machine-learning/ai-endpoints-getting-started) | Anonim kullanım için IP/model başına 2 istek/dakika belgeleniyor. Anahtarlı kullanım için ödeme yöntemi gerekiyor; Discovery projesi anahtarları çalışmıyor. | Anonim deneme, kalıcı ücretsiz üretim kotası olarak doğrulanmadı. Sekiz ajan için güvenilir temel sağlayıcı sayılmadı. |

### Ücretsiz sanılabilen, fakat bu ihtiyaca uymayanlar

- [Hugging Face](https://huggingface.co/docs/inference-providers/pricing): güncel tabloda ücretsiz kullanıcı aylık kredisi **None**; kullanım için kredi satın alma gerekiyor. Eski “aylık $0,10 ücretsiz” bilgisi bu tabloda geçerli değil.
- [SambaNova](https://cloud.sambanova.ai/plans): “Free” plan adı API'nin bedava olduğunu göstermiyor; ilk API kullanımı için ödeme yöntemi/kredi satın alma koşulu var.
- [Cerebras](https://inference-docs.cerebras.ai/support/rate-limits): doğrulanmış ödeme yöntemiyle verilen $5 deneme kredisi **30 gün** içinde bitiyor. Yenilenen ücretsiz kota değil.
- [Together](https://docs.together.ai/docs/billing): ücretsiz deneme yok; ilk yükleme en az **$15**, sonrakiler en az $5.
- [Alibaba Model Studio](https://www.alibabacloud.com/help/en/model-studio/new-free-quota): belirtilen başlangıç kotası 90 günlük; süre/kota sonrası ücretlendirme riski var. Sürekli ücretsiz aday değil.
- [SiliconFlow](https://www.siliconflow.com/pricing): $1 başlangıç kredisi sürekli ücretsiz kota değil. Postpaid harcama sınırı ayrıca gerekli.
- [Scaleway](https://www.scaleway.com/en/generative-apis/): aynı ürün sayfasında güncel token fiyatları ve eski “beta boyunca ücretsiz” SSS metni birlikte bulunuyor. Bu çelişki açıklanmadan ücretsiz ilan edilmedi. Bazı “Free” hücreleri yalnız çıktı fiyatına ait; giriş ücretli.
- [Featherless](https://featherless.ai/pricing): $25/ay Chat planı insan kullanımı için, uygulama/background API kullanımına uygun değil. Developer başlangıcı $50/ay kredi; $5/yıl ihtiyacına uymuyor.
- OpenCode ücretsiz DeepSeek: önceki gerçek testte `FreeTierError`, yalnız OpenCode içinden kullanım koşulu. Council AI için uygun değil; istemci taklidi yapılmayacak.

## Çok ucuz ücretli modeller

USD / 1 milyon token. Standart interaktif kullanım, cache indirimi ve batch hariç. Bunlar sağlayıcının fiyat/katalog kayıtlarıdır; kalite sıralaması veya çalıştığı doğrulaması değildir. Tam model kimliği bağlantı sırasında ayrıca keşfedilmeli.

| Sağlayıcı / model | Giriş | Çıkış |
|---|---:|---:|
| [DeepInfra](https://deepinfra.com/pricing) / NVIDIA Nemotron 3.5 Lightning | $0,06 | $0,16 |
| DeepInfra / Llama 3.3 70B Instruct Turbo | $0,10 | $0,32 |
| DeepInfra / Gemma 4 31B IT Turbo | $0,09 | $0,34 |
| DeepInfra / Qwen3 235B A22B Instruct 2507 | $0,09 | $0,55 |
| DeepInfra / DeepSeek V4 Flash | $0,09 | $0,18 |
| DeepInfra / DeepSeek V4 Flash 0731 | $0,06 | $0,18 |
| [OpenRouter](https://openrouter.ai/api/v1/models) / GPT-OSS 20B | $0,018 | $0,09 |
| OpenRouter / Qwen3.7 Flash | $0,03 | $0,13 |
| OpenRouter / GPT-OSS 120B | $0,15 | $0,60 |
| [Mistral](https://docs.mistral.ai/inference/pricing.md) / Small 4 (`mistral-small-2603`) | $0,15 | $0,60 |
| Mistral / Large 3 (`mistral-large-2512`) | $0,50 | $1,50 |
| [Chutes](https://chutes.ai/pricing) / Nemotron 3 Nano Omni 30B TEE | $0,0245 | $0,0978 |
| [SiliconFlow](https://www.siliconflow.com/pricing) / DeepSeek V4.1 Flash | $0,15 | $0,60 |

DeepSeek V4 Flash/0731 ile V4.1 Flash aynı sürüm kabul edilmez. Küçük veya ucuz modelin daha iyi araştırdığı varsayılmaz; Türkçe, atıf doğruluğu, eleştiri kalitesi ve tamamlanmış yanıt ölçülmeli. Aynı aileden sekiz çağrı sekiz bağımsız kanıt değildir.

[Doğrudan DeepSeek](https://api-docs.deepseek.com/quick_start/pricing) hakem API kimliği `deepseek-flash`; güncel tabloda DeepSeek V4.1 Flash'a karşılık geliyor. Cache-miss giriş/çıkış fiyatları yoğun saatlerde $0,30/$1,20, diğer saatlerde $0,15/$0,60. Yoğun saatler, Çin resmî tatilleri dışındaki hafta içi UTC 01:00–04:00 ve 06:00–10:00. Hesap aşağıda pahalı saatleri kullanır.

## $5 bir yıl yeter mi?

**Belirli kullanımda mümkün; abonelik veya garanti değil.** Şu örnek gerçek faturadan değil, açık token varsayımından hesaplandı:

- Sekiz rol, araştırma/eleştiri/revizyon: 24 panel çağrısı.
- Panel çağrısı başına ortalama 1.800 giriş + 250 çıkış: toplam 43.200 giriş + 6.000 çıkış token.
- Hakem: 8.000 giriş + 1.000 çıkış token.
- Toplama %25 değişken tüketim/tekrar payı; cache indirimi yok.
- Gizli reasoning tokenları, daha uzun belgeler, ek turlar veya uzun yanıtlar bu varsayımı aşabilir. Sağlayıcı faturası esas alınır.

| Senaryo | Araştırma başına | $5 ile yaklaşık | Günde 1 / yılda 365 araştırma |
|---|---:|---:|---:|
| Ücretsiz panel + doğrudan DeepSeek Flash hakem, yoğun saat | $0,00450 | 1.111 | $1,64 |
| Ücretsiz panel + aynı hakem, yoğun olmayan saat | $0,00225 | 2.222 | $0,82 |
| Ücretli DeepInfra karışımı + aynı hakem, yoğun saat | $0,01166 | 429 | $4,26 |

Ücretli karışım hesabında dört aile eşit token payıyla kullanıldı: Llama 70B, Gemma 31B Turbo, Qwen 235B, Nemotron Lightning. Ortalama giriş $0,085/M, çıkış $0,3425/M. Bu, ölçülmüş kalite sonucu veya etkinleştirilen bir konfigürasyon değildir.

İlk senaryoda günde iki araştırma yaklaşık $3,29/yıl, üç araştırma yaklaşık $4,93/yıl model tüketimi yapar. Ücretsiz sağlayıcıların kotaları, kullanılabilirliği ve fiyatları değişebilir.

### Yükleme, bakiye süresi ve diğer masraflar

- [OpenRouter sözleşmesi](https://openrouter.ai/terms): minimum kredi alımı $5; satın alma ücretleri ayrıca değerlendirilir. Kullanılmayan krediler 365 gün sonunda silinebilir. Otomatik yükleme isteğe bağlıdır; küçük bütçede kapalı tutulmalı.
- DeepInfra ve doğrudan DeepSeek için minimum yükleme ile satın alınmış bakiyenin geçerlilik süresi bu araştırmada yeterli açıklıkta doğrulanamadı. “$5 yükleme kesin mümkün ve süresiz” denmiyor; yukarıdaki $5 hesabı token tüketim bütçesidir.
- [Tavily](https://docs.tavily.com/documentation/api-credits): aylık 1.000 ücretsiz kredi. Basic search 1 kredi/istek; Basic extract 5 başarılı URL başına 1 kredi. PAYG $0,008/kredi. Sekiz ayrı Basic arama tek başına 8 kredi: extraction hariç bile ayda en fazla 125 böyle araştırma. Sayfa açma ve ek aramalar bu sayıyı düşürür; çağrı gruplaması/fatura yuvarlaması gerçek kullanımdan ölçülmeli. Ücretsiz planın limitinde durmak gerekir.
- Barındırma, veritabanı, alan adı, vergiler ve ödeme ücretleri bu token hesabına dahil değil. Mevcut Render ücretsiz hizmetinin uyuması ve PostgreSQL deneme süresi bu araştırmayla çözülmüş sayılmaz. $5/yıl tüm ürünün toplam maliyeti olarak sunulamaz.

## Önerilen sonraki doğrulama

1. NVIDIA: koşul/kota doğrulaması, güvenli bağlantı formu, gerçek küçük sağlık testi; sonra Türkçe kaynaklı araştırma/eleştiri benchmark'ı. Şimdilik yalnız aday.
2. Mevcut ücretsiz ailelerden en kaliteli farklı modelleri kıyasla; sekiz rol için kontrollü tekrar, gerçek model sayısının görünmesi ve korelasyon uyarısı devam etsin.
3. Ücretli panel ancak kullanıcı ayrıca bu kuralı değiştirmeyi isterse değerlendirilsin. DeepInfra'daki dört aile bunun için maliyet açısından öncelikli aday; mevcut uygulamada açılmadı.

Bu rapor sağlayıcı araştırmasıdır; yeni bir bağlantı kurulduğu, sekiz canlı modelin testten geçtiği veya araştırma kalitesinin arttığı iddiası değildir.

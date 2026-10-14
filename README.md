# Council AI

Türkçe araştırma konseyi. Ücretsiz panel modelleri bağımsız bulgular, hedefli eleştiriler ve revizyonlar üretir. Ücretli çağrılar yalnızca doğrudan DeepSeek hakemine yapılır.

Render üzerindeki sunucu, PostgreSQL'deki kalıcı iş kuyruğunu işler. Anahtar kasasının AES-256-GCM anahtarı Render secret environment içinde tutulur; sağlayıcı anahtarları veritabanında yalnız şifreli olarak saklanır. Tarayıcıya anahtar değerleri geri dönmez.

Ücretsiz Render barındırması boşta uyur ve ücretsiz PostgreSQL süreli denemedir; sürekli üretim hizmeti olarak tanıtılmamalıdır. Uygulama bu sınırlamayı gösterir.

Environment names: DATABASE_URL, VAULT_MASTER_KEY, OWNER_EMAIL, NODE_ENV, HOSTING_MODE.

API anahtarları yeni uygulamanın oturum korumalı Bağlantılar ekranına girilir. Floot'tan gizli anahtar dışa aktarımı yapılmaz.

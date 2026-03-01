# Отчёт о нелокальных вызовах OpenCode

Этот документ перечисляет все внешние HTTP‑запросы, которые делает приложение OpenCode, с указанием файлов исходного кода, целевых URL, назначения и возможности конфигурации.

**Обновлено:** 2026-03-01  
**Версия репозитория:** v1.2.15

## Ключевые выводы

1. **Основные категории внешних вызовов:**
   - Получение метаданных моделей ИИ (`models.dev`)
   - Работа с провайдерами ИИ (OpenAI, Anthropic, Google Vertex, Amazon Bedrock и др.)
   - OAuth‑авторизация через OpenAI (`auth.openai.com`)
   - Загрузка информации о релизах с GitHub (`api.github.com`)
   - Загрузка бинарных файлов с GitHub Releases (`github.com/anomalyco/opencode/releases/latest/download/`)
   - Email‑рассылка через EmailOctopus (`api.emailoctopus.com`)
   - Отправка email через AWS SES (`email.us-east-1.amazonaws.com`)
   - Хранение данных в S3 (`s3.{region}.amazonaws.com`, enterprise‑версия)
   - Проверка версии пакета в npm‑реестре (`registry.npmjs.org`)
   - Проксирование документации (`docs.opencode.ai`, `docs.dev.opencode.ai`, `enterprise.opencode.ai`)
   - Проксирование запросов к провайдерам ИИ через единый эндпоинт `/zen`

2. **Конфигурируемость:** URL можно переопределить через переменные окружения.

## Конфигурационные переменные и флаги

- **`OPENCODE_MODELS_URL`** – базовый URL для получения каталога моделей.
- **`OPENCODE_DISABLE_MODELS_FETCH`** – если установлен, отключает запросы к `models.dev`.
- **`OPENCODE_GITHUB_API_URL`** – GitHub API base URL.
- **`OPENCODE_GITHUB_REPO_URL`** – GitHub repository URL для загрузки релизов.
- **`OPENCODE_OPENAI_AUTH_URL`** – OpenAI OAuth issuer URL.
- **`OPENCODE_OPENAI_CODEX_URL`** – OpenAI Codex API endpoint.
- **`OPENCODE_ENTERPRISE_DOCS_URL`** – Enterprise docs URL.
- **`AZURE_COGNITIVE_SERVICES_RESOURCE_NAME`** – имя ресурса Azure для формирования URL.
- **`GOOGLE_CLOUD_LOCATION`**, **`VERTEX_LOCATION`**, **`GOOGLE_CLOUD_PROJECT`** – влияют на URL Google Vertex AI.
- **`AWS_REGION`**, **`AWS_PROFILE`**, **`AWS_ACCESS_KEY_ID`** – используются для аутентификации в Amazon Bedrock.
- **`AWS_SES_REGION`** – регион для AWS SES (обязателен, если используется отправка email).
- **`AWS_SES_ENDPOINT`** – endpoint для AWS SES.
- **`Resource.App.stage`** – определяет хост документации.

---

_Сгенерировано автоматически на основе анализа кода в репозитории OpenCode._

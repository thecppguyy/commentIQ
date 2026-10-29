# CommentIQ MVP build plan

## Summary

Build a working, single-user-per-account feedback analysis app using Next.js, Neon/PostgreSQL, and a Python FastAPI analysis service. Use Docker Compose for local development, with a Postgres-backed job queue. Match the dashboard to the references in `design/`, and keep all displayed metrics tied to imported and analyzed data.

## Implementation changes

- Restore the deleted starter `app/page.tsx` as the first implementation step. Before coding, read the installed Next.js 16 guidance for route handlers, server/client components, authentication, and environment variables.
- Add email and password registration and login using Better Auth with PostgreSQL. Store users, sessions, datasets, comments, analysis jobs, and cached summaries in Postgres. Every dataset and comment query must be scoped to the authenticated owner.
- Build CSV preview and import with configurable column mapping. Require a comment column; support product, rating, date, region, and source as optional fields. Show sample rows and row-numbered validation errors before import; don’t silently discard invalid records. Do not retain the original file.
- Create a dataset and queued analysis job when import succeeds. Track `pending`, `processing`, `completed`, and `failed` states. A FastAPI service runs the worker loop, claims jobs through Postgres, and stores results so opening the dashboard never reruns analysis.
- Use local Hugging Face Transformers for sentiment, a local language detector, scikit-learn for keywords, and explainable spam heuristics. Default to CardiffNLP’s multilingual XLM-R sentiment model; its model card describes sentiment fine-tuning in Arabic, English, French, German, Hindi, Italian, Spanish, and Portuguese. Show low-confidence or unsupported-language results as uncertain. Keep spam signals and reasons distinct from sentiment, and describe suspicious reviews as indicators rather than proof. ([Model card](https://huggingface.co/cardiffnlp/twitter-xlm-roberta-base-sentiment))
- Build dashboard, comment explorer, and insights views using the design references. Calculate metrics and charts from stored results; provide dataset, date, sentiment, language, product, and spam filters. Paginate and filter comments through the backend. Show sentiment trends only when usable dates exist and use empty states when data is absent.
- Generate insights from actual aggregated analysis and representative comments using optional, configurable Gemini access. Cache summaries per analysis version; if Gemini is unconfigured or unavailable, explain that while leaving other views usable.
- Add filtered CSV export with ownership checks. Use local Postgres in Docker Compose for development and configure `DATABASE_URL` for Neon in deployment; keep secrets server-side.
- Add a responsive pricing section to the public landing page. Display the four plans and monthly comment allowances below; payment processing and automated quota enforcement are not part of the landing-page work.

## Pricing plans

All prices are monthly and shown in Indian rupees.

| Plan | Price | Monthly comments | Included capabilities | Target audience |
| --- | ---: | ---: | --- | --- |
| Free | ₹0 | 500 | Basic sentiment analysis, language detection, basic analytics dashboard, CSV upload and export | Students, individual creators, and people trying CommentIQ |
| Starter (recommended) | ₹499 | 3,000 | Sentiment and spam analysis, keyword and topic insights, AI-generated summaries, report exports, longer dataset history | Creators, small businesses, and individual marketers |
| Growth | ₹1,499 | 15,000 | Everything in Starter, product-wise comparisons, sentiment trends and advanced filters, more AI-generated insights, priority processing | Growing e-commerce businesses and marketing agencies |
| Business | ₹4,999 | 75,000 | Everything in Growth, multiple team members, advanced reporting, higher processing limits, priority support | Agencies and businesses with substantial feedback volumes |

## Public interfaces

- Auth: register, sign in, sign out, and session endpoints.
- Datasets: preview CSV, create/list/delete datasets, get analytics, explicitly request reanalysis, query paginated comments, generate insights, and export filtered CSV.
- Analysis results: persist sentiment and confidence, language, spam signals and reasons, suspicious indicators, keywords/topics, model identity, and analysis status.

## Test and acceptance cases

- Registration, login, logout, and attempts to access another user’s dataset.
- CSV preview and import with mapped headers, optional fields, malformed rows, missing comments, and duplicate headers.
- Job status transitions, recoverable model errors, stored results reused on dashboard reload, and explicit reanalysis.
- Analytics and filters against imported data, including missing dates or metadata; paginated search and filtered export.
- Spam heuristics report reasons without claiming fraud; uncertain sentiment is visible.
- Insights use real analysis context, and unavailable Gemini does not break the rest of the app.

## Assumptions and defaults

- English and multilingual comments are in scope; quality depends on the model and detected language.
- Region analytics use only supplied region values; never infer location from language.
- Docker Compose includes the web app, FastAPI analysis service, and local Postgres. Neon is the deployment database.
- The original starter page deletion is accidental and will be restored before implementation begins.

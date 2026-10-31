# Dhikr Daily — Progressive Web App

**Status: functional v2.1 mobile PWA with bundled Arabic Hisnul Muslim chapters; formal religious and copyright review still required before claiming authoritative editions.**

A privacy-conscious, responsive and offline-first daily adhkar reader. No build tools, subscriptions or API keys are required. All application code and starter data are included.

## Quick start

1. Open `preview.html` directly on a phone or computer to test the UI, search, reading and settings; it is a complete single-file preview. File URLs do **not** support Service Workers, so use the hosted version for PWA installation/offline caching.
2. For a real installable PWA, upload the contents of this folder (especially `index.html`, `app.js`, `data.js`, `styles.css`, `manifest.webmanifest`, `service-worker.js` and the `assets/` folder) to GitHub Pages or another HTTPS static host.
3. Open the HTTPS URL, browse once while connected, then use your browser's **Install app** / **Add to Home screen** command.

## GitHub Pages deployment

1. Create a new repository, e.g. `dhikr-daily`.
2. Commit **the files from inside this directory into the repository root**. Do not accidentally place them under another nested `dhikr-pwa/` directory unless that is your intended site path.
3. Repository **Settings → Pages → Build and deployment → Deploy from a branch → main / (root) → Save**.
4. Visit `https://YOUR_USERNAME.github.io/dhikr-daily/`. The PWA manifest uses relative paths, so a project repository path works.
5. Later releases should bump `CACHE` in `service-worker.js` to force offline-file updates.

## Release 2.0 features

- Bundled **133 Arabic Hisnul Muslim chapters (302 Arabic entries)** in `hisn-full.json` with offline cache after initial installation, chapter index and Arabic-title search. This expanded corpus is Arabic-only and independently reviewed translations remain a future task.
- Daily dhikr journey, guided and continuous reading, memorisation, automatic count-based advancement, copy, share, printer layout and optional screen-awake mode.
- Accessibility controls: high contrast, reduced motion, Arabic font style, independent Arabic/translation sizes with live preview.
- Update check, local privacy-first settings/backup export/import and full personal history migration.
- Documentation: `docs/RELEASE_NOTES.md`, `docs/THIRD_PARTY_NOTICES.md` and `docs/CONTENT_AUDIT.md`.

## Implemented features

- Bilingual Malay/English navigation and working starter Malay/English meaning text.
- Morning, evening, after-salah, bedtime, Qur'anic and selected Sunnah collections.
- **Al-Ma’thurat Sughra/Kubra preview reading paths**, *explicitly not the authorised or complete edition*.
- **Hisnul Muslim** has a starter translated selection and a separately labelled **full Arabic 133-chapter corpus** with 302 items. The latter is not a scholar-reviewed/translated official edition.
- Guided reading, continuous scrolling, memorisation hide/reveal, browser-generated Arabic speech where available (not verified audio recitation), target counters, bookmarking, progress and local completion calendar.
- Search Arabic/Malay/English/transliteration, offline phrase-to-intent keyword matching (e.g. “I am worried about an exam”), quick situation chips, personal collections and saved items. This is deterministic retrieval, not generative AI.
- Family and beginner-friendly short reading pathway with simple daily supplications.
- Theme (light, dark, system); six accent palettes plus a custom colour picker; independent Arabic and translation font size with live preview; translation, transliteration and Arabic visibility toggles.
- Settings-only JSON export/import; full JSON export/import for device migration; import validation and overwrite confirmation.
- In-app morning/evening reminders while the app is **open**. Reliable notifications while closed require additional platform-specific background infrastructure, so those are **not** claimed.
- Offline installation via Service Worker after first successful download; no cloud accounts, ad/tracking scripts or third-party JS/CDNs.
- Browser-local history, preferences and custom collections. Export before uninstall or clearing the browser's site data.

## Known content limitations — do not advertise as complete editions

The bundled starter corpus currently includes **28** individual entries, each with an Arabic text, working English and Malay meaning, and a primary reference. The content has **not** undergone a complete scholarly audit; repetition counts and Arabic vowel marks must be checked against authoritative editions. Full Al-Ma’thurat arrangements, full Hisnul Muslim chapters, professional verified recitation audio and reviewed translations require additional permissions, suitable sources and editorial review. The demonstration paths are not replacements for published books.

The full Arabic Hisnul Muslim chapter JSON is now bundled in the repository from `asellam/HisnElMuslim` (MIT licensed repository) and fetched from the **same GitHub Pages origin**, then pre-cached offline by the service worker on installation. Its Arabic-only content and original repeat counts require an independent edition audit. No external GitHub request is required to use the expanded corpus. See `docs/THIRD_PARTY_NOTICES.md`.

No automated AI-generated supplication or automated hadith grading is included; search only returns bundled records. The content is in `data.js`, with a single canonical record for each entry and collection paths containing those record IDs. This structure permits professionally reviewed book editions to be added later without changes to UI logic.

## Licensing, copyright and attribution notes

- The PWA application code in `app.js`, `styles.css` and `index.html` is original project code. See `LICENSE`.
- The source book *Hisnul Muslim* is attributed to Sa'id ibn Ali ibn Wahf al-Qahtani. The *Al-Ma’thurat* compilation is attributed to Hasan al-Banna. This project does not bundle complete reproductions of either book.
- Primary hadith citations should be independently verified with the original collections and trusted editions. Content translations are working explanations, not licensed book translations.
- The Qur'anic verses were transcribed individually and are **not** an attributed complete Tanzil edition. If replacing with the Tanzil text corpus, use it **verbatim**, preserve copyright notices, and link to https://tanzil.net/ per its license.
- Research reference: https://github.com/Seen-Arabic/Morning-And-Evening-Adhkar-DB (MIT license) for future authenticated adhkar import; this dataset is not copied wholesale into this starter package.
- Public religious content release should be reviewed by an appropriately qualified Islamic studies/hadith reviewer and native-language translators.

## Privacy and backups

- Everything is saved in browser localStorage under `dhikr-daily-v1`.
- Exporting **Settings** stores only appearance/reader/reminder preferences.
- Exporting **Full backup** stores settings, custom collections, bookmarks, completion calendar, daily counters and last reading location.
- Importing a full backup replaces the current stored personal data after confirmation. Keep a backup elsewhere if migrating between devices.
- Imported JSON is validated, data is rendered with HTML escaping, and this application never executes content from a JSON backup.

## Future enhancements

1. Scholarly verified and properly licensed complete Al-Ma’thurat and Hisnul Muslim editions with edition selector, chapter index and discrepancy notes.
2. Approved Malay/English translations and audio with documented reciter/recording permissions and downloaded offline audio packs.
3. Richer educational notes and referenced authentic grading records; transparent disagreement handling.
4. Optional genuine push reminders and encrypted opt-in sync for multiple devices.
5. Child/family learning mode, educator dashboard and optional AI retrieval **strictly limited to reviewed records**, never generated religious text.

## Automated checks

Run `node --check app.js && node --check data.js && node --check service-worker.js && node tests/sanity.mjs`. GitHub Actions runs these checks on every push and PR.

## Verify before deploying

Run `node --check app.js && node --check data.js && node --check service-worker.js`. Then open `preview.html`; visit Settings and test theme, palette, sliders, exports, import, and a full read/counter cycle. For real offline testing, run a local HTTPS server or use GitHub Pages and turn off networking after the first visit.

## v2.1 — Four Al-Ma’thurat paths (31 October 2026)

Sughra Pagi/Petang (32 items per session) and Kubra Pagi/Petang (43 items per session), with distinct morning/evening wording at five positions. They are **secondary-source working sequences**, not verified exact replicas of the linked dynoboyz app. The Google Play listing only gives sample screenshots, not all pages. Counts and ordering came from comparison of published reading guides and [workrahmattb/almatsurat-app](https://github.com/workrahmattb/almatsurat-app); these 32/43 counts must not be conflated with other 29/42 editions. The Qur'anic Arabic passages were independently sourced from [ibnmalik/quran_json](https://github.com/ibnmalik/quran_json). Third-party translations were not copied. Except three previously included surah meanings, translations for new entries are pending review. See docs/CONTENT_AUDIT.md.

## Al-Ma’thurat 2.1 (2026-10-31)

The following four reading paths are implemented: **Sughra Pagi, Sughra Petang, Kubra Pagi and Kubra Petang**. The numbering follows the distinct passages in the Malay guide [AkuIslam](https://akuislam.com/panduan/al-mathurat-sughra-kubra-rumi/) (30 Sughra units and 49 Kubra units), rather than claiming an identical PDF-page division. Original reference: [dynoboyz Android app](https://play.google.com/store/apps/details?id=com.dynoboyz.al_mathurat). Its Play screenshots show the booklet covers and only sample pages; the internal full sequence was **not independently extracted or verified**. This is an editorial reconstruction, not an official edition or certified copy of that application.

The Quranic Arabic is drawn from [semarketir/quranjson](https://github.com/semarketir/quranjson), source/surah, MIT-licensed. Other Arabic du‘a passages are compiled and must receive human proofreading and narration review prior to any 'verified edition' claim. Full Malay/English translation for the expanded reading paths is **pending**; informational placeholders are used instead of invented translations. Do not use the app as the sole authority for hadith grading or edition fidelity. The original 28-entry starter library remains unchanged.

Files: `mathurat.js` contains the additional passages and four collection arrays; `service-worker.js` precaches the data for offline reading, and the local preview has been refreshed.

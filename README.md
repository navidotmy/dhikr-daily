# Dhikr Daily — Progressive Web App

**Status: functional starter application / content review required before public publication.**

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

## Implemented features

- Bilingual Malay/English navigation and working starter Malay/English meaning text.
- Morning, evening, after-salah, bedtime, Qur'anic and selected Sunnah collections.
- **Al-Ma’thurat Sughra/Kubra preview reading paths**, *explicitly not the authorised or complete edition*.
- **Hisnul Muslim starter selection**, *not the full 132/133 chapters*.
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

The optional Arabic Hisnul Muslim content pack can be downloaded (from `asellam/HisnElMuslim`, MIT license) at the user’s request and is then stored locally for offline reading. Its Arabic-only content and original repeat counts require an independent edition audit. External GitHub requests happen only on an explicit content-pack download/update.

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

## Verify before deploying

Run `node --check app.js && node --check data.js && node --check service-worker.js`. Then open `preview.html`; visit Settings and test theme, palette, sliders, exports, import, and a full read/counter cycle. For real offline testing, run a local HTTPS server or use GitHub Pages and turn off networking after the first visit.

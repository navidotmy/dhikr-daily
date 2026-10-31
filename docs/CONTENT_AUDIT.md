# Religious content & publication checklist

**Status: pre-publication review remains outstanding. v2 contains an offline Arabic Hisnul Muslim corpus and starter translations; it is not an endorsed authoritative edition.**

## 1. What is currently bundled

- 28 curated supplications/recitations, each with Arabic, working Malay/English meanings, transliteration and a source citation.
- 9 reading paths, including curated morning/evening practice, after-salah, sleep, Qur'anic du'a, Sunnah du'a, and **Al-Ma'thurat Sughra/Kubra previews**.
- The Al-Ma'thurat previews **are not** the authentic complete edition sequences and should remain labelled *Preview* until rights, sequencing, repetitions and variations are verified.
- The **Hisnul Muslim Starter Selection** is not the complete 132/133-chapter book.
- The bundled Arabic Hisnul Muslim pack is fetched from the same deployed site after install (no optional third-party request needed); its source is `asellam/HisnElMuslim/hisn.json` (MIT-licensed repository). Its complete Arabic chapter structure is displayed in the app and saved locally; the corpus has not been verified against a scholarly edition, and the English/Malay meanings are absent. This is a **bundled offline reference corpus**, not a claim of official edition status.

## 2. Required source-by-source editorial process

1. Choose a canonical published Arabic edition for each collection and record its author, publisher, publication year, edition, page and permission/licence for digital use.
2. Compare Arabic Unicode text **character-by-character** with authoritative source; protect Qur'anic text from editorial changes. Track Unicode normalization in a search-only field, never the display text.
3. Independently verify every surah/ayah and hadith reference, ideally against a printed or official source. Identify missing or conflicting source attributions.
4. Assess repetition count and timing; do not infer a set count where an authentic narration does not specify one. Avoid conflating book compiler instructions with the Prophet's reported instruction.
5. Distinguish: Qur'anic verse, authentic Prophetic hadith, disputed report, and personal permissible supplication. Never label the entire collection as uniformly *Sahih*.
6. Where authenticated scholarship differs, list assessments and authorities rather than silently selecting a single verdict.
7. Compare Malay and English meanings against licensed review-approved translations. Transliteration is a learning aid and not a replacement for Arabic.
8. Obtain recording permissions and document reciter and original source before offering recorded recitation. Device text-to-speech does not qualify as verified recitation.
9. Conduct external scholar/hadith reviewer signoff and native-language proofreading; record review date and signed edition/version used.
10. For future patches: run diff reports for changed Arabic text and sources, and notify readers of material corrections.

## 3. Licensing review blockers

- The MIT licence in a code repository is not by itself proof that the underlying Arabic book, compilation sequence, translations, hadith editorial notes, or audio recordings have unrestricted publication rights.
- For entire Al-Ma'thurat and Hisnul Muslim books, independently validate any continuing copyright and seek publisher/rights-holder permission as required.
- Tanzil Qur'an corpus conditions: **verbatim only**, CC BY 3.0 attribution, preserve copyright notice and link to https://tanzil.net/. It is not bundled as a complete edition in this starter build.
- Do not use third-party translation apps or audio downloads without a licence or explicit permission.
- Keep a `sources.json` (future enhancement) per-entry with URL, publication data, verified status, licence and reviewer.

## 4. Technical release checklist

- HTTPS static host; valid PWA manifest; 192px/512px icons; Service Worker version bumped before each update.
- App works in airplane mode after install, including optional pack if downloaded first.
- Backup export/import works on browsers and devices, including filenames, JSON schema, private browsing limits, app storage quota warnings and malicious/oversized file rejection.
- Light/dark/system themes and custom accent meet accessibility contrast requirements, including unusual bright colors.
- Arabic right-to-left shaping and clear diacritics are tested on Android Chrome, iOS Safari and desktop; font size preview matches reader output.
- Device speech marked machine-generated. No claim of certified recitation.
- Notification reminders explicitly marked **app-open-only**, not guaranteed push delivery.
- Install and update flow tested on intended GitHub Pages project path.
- No accounts, trackers or collection of private data. No third-party runtime GitHub content-pack request is required; the bundled corpus is cached by the service worker.

## 5. Content expansion plan

1. Curate and approve the full Al-Ma'thurat Sughra/Kubra reading arrangements, including edition/version labels.
2. Approve full Hisnul Muslim Arabic chapter text and licensed translations (Malay and English) with chapter indexes.
3. Add cross-reference mapping of duplicates between collections; preserve provenance for each appearance.
4. Provide downloaded optional audio packs, only with licensing and professional review.
5. Add content update ledger, reviewer workflow and user-facing correction notices.

## v2.1 Al-Ma’thurat sequence provenance (31 October 2026)

- Four functional Arabic reading paths: Sughra Morning/Evening = 32 entries each; Kubra Morning/Evening = 43 each. These counts describe a secondary arrangement, **not** a verified dynoboyz edition.
- Source order was triangulated with `workrahmattb/almatsurat-app/assets/data/wazifah/{sugro,kubro}.json` and publicly available reading guides. The full Android app could not be compared page-by-page; do **not** advertise exact-matching fidelity.
- Quran excerpts reconstructed from `ibnmalik/quran_json` numbered verses instead of repeating transcription errors in the secondary source; independent scholarly verification remains necessary.
- Wording distinctions for Pagi/Petang are resolved explicitly at positions 21, 22, 23, 24 and 42; compare against publisher edition before approving.
- Individual hadith authentication and repetition count verification remain pending. Some closing prayers are compilation prayers, not necessarily verbatim authenticated hadith.
- No third-party translation prose imported. Most new entries show a translation-under-review notice.

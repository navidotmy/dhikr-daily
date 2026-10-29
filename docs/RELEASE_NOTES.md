# Dhikr Daily 2.0 — release notes (2026-10-29)

## Application improvements

- Added bundled offline-first Arabic Hisnul Muslim corpus (133 chapters, 302 entries) with searchable chapter index, rather than asking users to download it from third-party servers. This corpus comes from `asellam/HisnElMuslim`, MIT licensed repository (see THIRD_PARTY_NOTICES.md). **No implication of edition/authenticity endorsement is made**; Arabic text, hadith references, repeat counts and translation require independent religious editorial checking.
- Preserved bilingual Malay/English navigation and 28 curated starter entries with working translations and transliteration; Hisnul Muslim expanded corpus is **Arabic only**. Al-Ma’thurat Sughra/Kubra paths remain explicitly *previews*, not the authorised complete compilations. Do not distribute as complete Al-Ma’thurat.
- Added searchable chapter index, daily journey, source-review status labels, copy Arabic and meaning, browser share, printer-friendly reading view, auto-advance counters, optional Screen Wake Lock, Arabic font style, high-contrast and reduced-motion settings, and explicit app-update check.
- Preserved dark/light/system theme, custom app colour palette, independent Arabic/translation font sliders with preview, settings-only and full-data JSON backup/import, bookmarks, custom collections, calendar and reading modes.
- Bundled `hisn-full.json` in service worker pre-cache and upgraded cache to v2.0.0. Requires HTTPS and first successful online load for offline use. Fully offline installation cannot be assured if first load interrupted.

## Privacy & unsupported capabilities

- Nothing in this release needs server credentials, user accounts, analytics or third-party requests for routine operation.
- Device speech synthesis is not a licensed recitation audio recording. No packaged recitation files are provided.
- Reminders are **only while the app is open**; reliable scheduled push notifications while closed require a consented backend/service and compatible device. Such infrastructure is not configured.
- No cloud account sync, family dashboard or AI-generated explanation is claimed. Current natural-language search performs deterministic matching against bundled records and will not invent supplications.
- Content copyright and edition/translation permissions must be reviewed before representing this as an authoritative religious publication.

## Deployment

Repo `navidotmy/dhikr-daily`, branch `main`, static GitHub Pages `(root)`.
Publishing GitHub Pages must be configured in GitHub Settings → Pages; the current GitHub connection can commit code, not administer Pages settings.

## Regression checklist

1. Reader opens from Home, completes target count, saves session, bookmark toggles.
2. Arabic/translation font sliders update the live preview and reader.
3. Dark/light/system and custom palettes persist after reload.
4. Settings-only export and import; full-data migration, including collections, history, bookmarks.
5. Hisnul Muslim index finds Arabic titles and opens chapters; 133 chapters available offline after precache.
6. In reader, print and copy work, share graceful fallback, screen Wake Lock when supported.
7. Reload and run offline via browser dev tools after initial successful PWA installation.
8. Page works at `/dhikr-daily/` (relative asset paths).

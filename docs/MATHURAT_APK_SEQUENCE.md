# Al-Ma'thurat booklet sequence — APK comparison

Reference: user-uploaded `Al-Ma'thurat Kubra & Sughra.apk` (package originally linked by user to `com.dynoboyz.al_mathurat`).

The exact image-resource page lists were recovered from the compiled `SlidingFragment` static array initializer in `classes6.dex`, then compared against the APK's `res/drawable-nodpi-v4/page*.webp` images. No application code, advertisements, tracking libraries or APK executables are distributed.

## Kubra — 27 pages

`page1_kubra`, then `page2` through `page27` inclusive in ascending order.

## Sughra — 18 pages

`page1_sughra`, `page2`, `page3`, `page4`, `page5`, `page6`, `page15`, `page16`, `page17`, `page18`, `page19`, `page20`, `page21`, `page23`, `page28`, `page25`, `page26`, `page27`.

`page28.webp` is byte-for-byte identical to `page24.webp` in this APK, but the Sughra page list explicitly selects `page28`; retain that label for traceability.

## Morning vs evening

The APK has two primary image sequences (Sughra and Kubra), **not four distinct sets**. The physical booklet includes morning/evening alternatives within certain pages. Dhikr Daily provides four entry points (Sughra/Pagi, Sughra/Petang, Kubra/Pagi, Kubra/Petang) to match the user's daily reading workflow, but **the image order for Pagi and Petang is the same within each edition**. Users must read the appropriate alternative wording on the page. The PWA must not imply that the APK contains separate morning-only/evening-only page sets.

## Accessibility, sources and limitations

- Scanned pages retain the APK's original Arabic wording and Malay text. Page images do not respond to the normal Arabic/Malay font size controls; the booklet reader instead has a zoom control and continuous reading mode.
- Booklet images extracted from the user's supplied APK are separate from the existing, individually sourced, editable Dhikr Daily supplication corpus. Scholarly checking and rights clearance are still recommended before broader public distribution.
- Metadata records the page sequence; it does not claim that every supplication or associated virtue has received independent hadith grading.

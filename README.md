# findnshot

An object-only interactive painting study using Joachim Beuckelaer's **The Well-stocked Kitchen (1566)**. Seventy manually curated rectangular bounding boxes reveal object names and let visitors collect cropped object views with one click. Fifteen manually marked face regions show an opaque, grayscale TV-static censor effect on hover, keyboard focus, or tap. Faces have no recognition result or capture action and never increment the collection. This is a local visual effect, not automatic face detection. The painting fills the viewport; visitors drag to pan cropped portions into view. Near a box, its corners fade in; hovering slightly magnifies and brightens the object and reveals its name. This is an explicitly labeled interactive prototype, not live AI inference or an accuracy evaluation.

Serve `dist/` with a static HTTP server. Buildless HTML/CSS/JS, no dependencies or external fonts. The painting and all assets are bundled locally. Captures stay in browser memory and reset on reload; no analytics, camera access, uploads, face analysis, accounts, or remote model requests are implemented by this page. 

On small screens, drag to pan the full-screen painting and tap objects to capture. Keyboard: Tab to an object (offscreen targets pan into view), Enter/Space to capture. Face regions are keyboard-accessible and only activate the privacy effect. The compact count button opens the collection. Dialogs support Escape. Reduced motion uses a still opaque noise mask. Noise rendering runs only while a face effect is active and stops when the page is hidden.

## Verification

Browser checks: desktop and 390 px mobile viewport; 70 object targets and 15 privacy targets; knife capture; a small lemon selected independently of its enclosing dish; foreground and background face censoring without increasing capture count; object selection clears the mask; drag-to-pan clears the mask without capturing; collection reset; no horizontal page overflow or console errors. JavaScript syntax checks passed. Annotation validation confirmed unique IDs, in-bounds boxes, and reachable areas for all 70 objects after overlap priority and face exclusion. Smaller boxes take priority over larger enclosing boxes. Object magnifier/collection crops mask any intersecting annotated face. The annotations are illustrative manual labels; ambiguous ingredients use generic names.

## Artwork provenance

- Artist: Joachim Beuckelaer (museum catalog spelling: Joachim Bueckelaer)
- Title: The Well-stocked Kitchen
- Date: 1566; Rijksmuseum object SK-A-1451
- Official record: https://id.rijksmuseum.nl/200109172
- Rights: Public domain, as stated in the official record; verified 2026-11-07.
- Image: https://iiif.micr.io/PvtVH/full/2400,/0/default.jpg (official museum page's IIIF image identifier, full uncropped painting)
- Local asset: `dist/assets/the-well-stocked-kitchen.jpg`, 2400 × 1637
- Site credit links to the museum record. No generated artwork or merchant reproduction is used.

## Cloudflare Pages

This project is ready for Git-based deployment from `howon-kim/findnshot`. See [CLOUDFLARE.md](CLOUDFLARE.md) for setup. No build dependencies, API keys, or environment variables are required.

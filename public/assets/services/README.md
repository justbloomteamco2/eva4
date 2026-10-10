# Replacing service images

Each service has its own folder:

- `security/`
- `housekeeping/`
- `gardening/`
- `manpower/`

Replace an existing image using the same filename to update it everywhere. To
add a carousel photo, drop a `.jpg`, `.jpeg`, `.png`, `.webp`, or `.avif` image
into the matching folder. New files appear in that service's carousel after the
next build/deploy; use a descriptive filename because it becomes the fallback
caption and alt text.

The lead image shown on the services cards is set in
`src/services/ContentService.js`. Update that service's `image` and `imageAlt`
there if you want a different lead photo. Existing carousel captions and alt
text are also maintained there.

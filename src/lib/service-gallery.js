import { readdirSync } from "node:fs";
import { basename, extname, join } from "node:path";

const imageExtensions = new Set([".avif", ".jpeg", ".jpg", ".png", ".webp"]);

function formatImageName(filename) {
  return basename(filename, extname(filename))
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export function getServiceGallery(service) {
  const folder = join(process.cwd(), "public", "assets", "services", service.id);
  const files = readdirSync(folder, { withFileTypes: true })
    .filter((entry) => entry.isFile() && imageExtensions.has(extname(entry.name).toLowerCase()))
    .map((entry) => entry.name);
  const filesByName = new Set(files);
  const captions = new Map(service.gallery.map((photo) => [basename(photo.src), photo]));
  const listedPhotos = service.gallery.filter((photo) => filesByName.has(basename(photo.src)));
  const additionalPhotos = files
    .filter((filename) => !captions.has(filename))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
    .map((filename) => {
      const name = formatImageName(filename);
      return {
        src: `/assets/services/${service.id}/${filename}`,
        alt: `${service.title}: ${name}`,
        caption: name,
      };
    });

  return [...listedPhotos, ...additionalPhotos];
}

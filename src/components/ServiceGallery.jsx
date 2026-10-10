"use client";

import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function ServiceGallery({ title, photos }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();
  const photo = photos[activeIndex];

  useEffect(() => {
    if (paused || reduceMotion || photos.length < 2) return;
    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % photos.length);
    }, 5000);
    return () => window.clearInterval(interval);
  }, [paused, photos.length, reduceMotion]);

  const showPhoto = (offset) => {
    setActiveIndex((index) => (index + offset + photos.length) % photos.length);
  };

  return (
    <div className="service-gallery" role="region" aria-label={`${title} photo carousel`}>
      <figure className="service-gallery-item" aria-live="off">
        <div className="service-gallery-image">
          <Image
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            fill
            priority={activeIndex === 0}
            sizes="(max-width: 760px) 90vw, 70vw"
          />
        </div>
        <figcaption>{photo.caption}</figcaption>
      </figure>
      <div className="service-gallery-controls">
        <button
          type="button"
          aria-label="Previous photo"
          onClick={() => showPhoto(-1)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <span className="service-gallery-count" aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          aria-label="Next photo"
          onClick={() => showPhoto(1)}
        >
          <span aria-hidden="true">→</span>
        </button>
        {!reduceMotion && (
          <button
            className="service-gallery-toggle"
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? "Play slideshow" : "Pause slideshow"}
          </button>
        )}
      </div>
    </div>
  );
}

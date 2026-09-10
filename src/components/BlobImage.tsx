import Image from "next/image";

/**
 * A photograph clipped to a soft organic shape.
 *
 * The curved edge is an SVG clip-path, not a pre-masked PNG: one closed path
 * of bezier curves, applied to the image by the browser. That means the shape
 * scales to any size without softening, costs no extra download, and can be
 * swapped or retuned by editing numbers rather than re-exporting artwork.
 *
 * `clipPathUnits="objectBoundingBox"` makes the path coordinates fractions of
 * the element's own box (0-1) rather than pixels, so one path fits whatever
 * size the image is rendered at.
 *
 * The shape is deliberately asymmetric and slightly irregular. A symmetrical
 * blob reads as a graphic device; an uneven one reads as something drawn, and
 * echoes the hand-drawn curve of the logo's heart.
 *
 * Note the id: clip paths live in a global namespace, so two of these on one
 * page with the same id would fight. If this is ever used twice, the id needs
 * to be passed in.
 */
export function BlobImage({
  src,
  alt,
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <svg
        width="0"
        height="0"
        aria-hidden
        className="absolute"
        focusable="false"
      >
        <defs>
          <clipPath id="blob-organic" clipPathUnits="objectBoundingBox">
            <path
              d="
                M0.50,0.005
                C0.70,0.00 0.90,0.05 0.965,0.22
                C1.02,0.38 0.955,0.55 0.965,0.70
                C0.975,0.86 0.86,0.975 0.68,0.99
                C0.50,1.005 0.28,1.00 0.145,0.925
                C0.01,0.85 -0.015,0.65 0.015,0.47
                C0.045,0.29 0.10,0.10 0.26,0.04
                C0.34,0.005 0.42,0.01 0.50,0.005
                Z"
            />
          </clipPath>
        </defs>
      </svg>

      <div
        className="relative aspect-square overflow-hidden"
        style={{ clipPath: "url(#blob-organic)" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 1024px) 90vw, 420px"
          className="object-cover"
        />
      </div>

      {/* The hand-drawn heart — the same human mark as the Caveat signature,
          used once here and never repeated on the page. */}
      <svg
        viewBox="0 0 40 36"
        className="absolute -right-3 bottom-10 w-12 text-brand sm:w-14"
        fill="none"
        aria-hidden
      >
        <path
          d="M20 33C10 26 3 20 3 13.5 3 8 7 4.5 11.5 4.5c3 0 5.5 1.6 6.9 4.2C19.8 6 22.4 4.5 25.4 4.5 30.5 4.5 34 8.4 34 13.5c0 2.2-.9 4.3-2.4 6.3"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

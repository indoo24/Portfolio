import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Read synchronously at module load: async file I/O would opt the image
// routes out of build-time prerendering under Cache Components.
const serif = readFileSync(join(process.cwd(), "src/assets/og/InstrumentSerif-Regular.ttf"));
const sans = readFileSync(join(process.cwd(), "src/assets/og/HankenGrotesk-Medium.ttf"));

/** Shared social card used by the home page and every case study. */
export function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#0b0c0a",
        backgroundImage:
          "linear-gradient(to right, rgba(236,235,227,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(236,235,227,0.05) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        color: "#ecebe3",
        fontFamily: "Hanken",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 48,
            height: 48,
            border: "1px solid #3b3f35",
            borderRadius: 4,
            color: "#c6f04a",
            fontSize: 18,
          }}
        >
          YK
        </div>
        <span style={{ color: "#a9ab9f", letterSpacing: 2, textTransform: "uppercase" }}>
          {eyebrow}
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontFamily: "Instrument Serif",
            fontSize: title.length > 16 ? 100 : 128,
            lineHeight: 0.95,
            letterSpacing: -3,
          }}
        >
          {title}
          <span style={{ color: "#c6f04a" }}>.</span>
        </div>
        <div style={{ marginTop: 28, fontSize: 34, color: "#a9ab9f" }}>{subtitle}</div>
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Hanken", data: sans, style: "normal", weight: 500 },
      ],
    },
  );
}

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Read synchronously at module load: async file I/O would opt the image
// routes out of build-time prerendering under Cache Components.
const asset = (file: string) => readFileSync(join(process.cwd(), "src/assets/og", file));
const sora = asset("Sora-Bold.ttf");
const jakarta = asset("PlusJakartaSans-Medium.ttf");
const photo = `data:image/jpeg;base64,${asset("profile.jpg").toString("base64")}`;

function FlutterMark({ size }: { size: number }) {
  return (
    <svg width={size} height={(size * 24) / 20} viewBox="2 0 20 24">
      <path fill="#54C5F8" d="M14.314 0 2.3 12 6 15.7 21.684.013z" />
      <path fill="#54C5F8" d="M14.328 11.072H21.7l-6.46 6.46H7.857z" />
      <path fill="#01579B" d="M7.857 17.53h7.383L21.7 24h-7.373z" />
    </svg>
  );
}

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
        alignItems: "center",
        justifyContent: "space-between",
        padding: "64px 72px",
        background: "radial-gradient(circle at 78% 40%, #173a7a 0%, #0a1430 45%, #050b18 100%)",
        color: "#eaf0ff",
        fontFamily: "Jakarta",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 700 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24 }}>
          <FlutterMark size={30} />
          <span style={{ color: "#5cc8ff", letterSpacing: 3, textTransform: "uppercase" }}>
            {eyebrow}
          </span>
        </div>
        <div
          style={{
            marginTop: 28,
            fontFamily: "Sora",
            fontSize: title.length > 18 ? 74 : 92,
            lineHeight: 1.02,
            letterSpacing: -3,
          }}
        >
          {title}
        </div>
        <div style={{ marginTop: 24, fontSize: 32, color: "#a6b4d6" }}>{subtitle}</div>
        <div
          style={{
            marginTop: 40,
            width: 220,
            height: 6,
            borderRadius: 6,
            background: "linear-gradient(90deg, #5cc8ff, #3d8bff)",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          padding: 6,
          borderRadius: 999,
          background: "linear-gradient(135deg, #5cc8ff, #3d8bff, #01579b)",
          boxShadow: "0 30px 90px rgba(61,139,255,0.5)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- rendered by ImageResponse */}
        <img src={photo} width={300} height={300} alt="" style={{ borderRadius: 999 }} />
      </div>
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Sora", data: sora, style: "normal", weight: 700 },
        { name: "Jakarta", data: jakarta, style: "normal", weight: 500 },
      ],
    },
  );
}

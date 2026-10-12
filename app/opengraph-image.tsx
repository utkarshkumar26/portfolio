import { ImageResponse } from "next/og";
import { profile } from "@/data/portfolio";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "76px",
          color: "#f5f7ff",
          backgroundColor: "#05060a",
          backgroundImage: "linear-gradient(135deg, #05060a 0%, #0b0d19 100%)",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 40,
            width: 350,
            height: 350,
            border: "1px solid rgba(139,92,246,.35)",
            borderRadius: 999,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 75,
            right: 75,
            width: 280,
            height: 280,
            border: "1px solid rgba(0,229,255,.25)",
            borderRadius: 999,
          }}
        />
        <div style={{ display: "flex", fontSize: 22, letterSpacing: 5, color: "#00e5ff", marginBottom: 26 }}>
          {profile.role.toUpperCase()}&nbsp; / &nbsp;{profile.location.toUpperCase()}
        </div>
        <div style={{ display: "flex", fontSize: 82, fontWeight: 700, letterSpacing: -4 }}>
          {profile.name}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#b9bdcd", marginTop: 24 }}>
          {profile.pitch}
        </div>
        <div style={{ display: "flex", position: "absolute", bottom: 52, right: 76, fontSize: 18, color: "#7b8092" }}>
          UTKARSH.DEV
        </div>
      </div>
    ),
    size,
  );
}

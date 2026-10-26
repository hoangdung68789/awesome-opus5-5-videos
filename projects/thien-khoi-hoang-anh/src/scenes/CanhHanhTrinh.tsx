import type React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { clamp, fontFamily } from "../brand";
import { ease, GOLD_TEXT, goldGradientText, SHADOW, SIZE, TK_RED } from "../mg/tk/style";

type Props = {
  readonly n1Year: string;
  readonly n1Text: string;
  readonly n2Year: string;
  readonly n2Text: string;
  readonly n3Year: string;
  readonly n3Title: string;
  readonly n3Sub1: string;
  readonly n3Sub2: string;
  readonly photoA: string;
  readonly photoB: string;
  readonly photoC: string;
  readonly n1At: number;
  readonly n2At: number;
  readonly n3At: number;
};

// C6 – Hành trình Phòng Hoàng Anh → Khối Hoàng Anh (2024 → 2026).
// Dòng thời gian dọc + ảnh thật của khối trên thẻ 3D (CSS perspective).
// Số liệu/mốc chỉ lấy từ Dũng cung cấp và chữ trên ảnh sự kiện.
// Mốc 1: ping ghim · Mốc 2: chớp sáng + shutter (T8) · Mốc 3: đập nhịp + kick (T6).
export const CanhHanhTrinh: React.FC<Props> = (p) => {
  const frame = useCurrentFrame();
  const line = interpolate(frame, [p.n1At - 8, p.n3At + 8], [0, 1], clamp);

  const node = (y: number, at: number, active: boolean, children: React.ReactNode) => {
    const k = ease(frame, at, at + 9);
    const dot = interpolate(frame, [at, at + 4, at + 9], [0, 1.4, 1], clamp);
    return (
      <div style={{ position: "absolute", left: 0, top: y, width: 1080 }}>
        <div
          style={{
            position: "absolute",
            left: 120 - 13,
            top: 18,
            width: 26,
            height: 26,
            borderRadius: 13,
            background: active ? GOLD_TEXT : "#8a7a52",
            boxShadow: active ? "0 0 22px rgba(243,220,138,0.9)" : "none",
            scale: String(dot),
          }}
        />
        <div style={{ position: "absolute", left: 172, width: 748, opacity: k * (active ? 1 : 0.45), translate: `${(1 - k) * 40}px 0px` }}>{children}</div>
      </div>
    );
  };

  const n1Active = frame < p.n2At;
  const n2Active = frame >= p.n2At && frame < p.n3At;
  const n3Active = frame >= p.n3At;

  // Thẻ ảnh 3D: A (16.10.2025) + B phía sau, rồi C (Giám đốc Khối) trượt lên trước.
  const a = ease(frame, p.n2At, p.n2At + 12);
  const c = ease(frame, p.n3At, p.n3At + 12);
  const flash = interpolate(frame, [p.n2At - 1, p.n2At + 1, p.n2At + 9], [0, 0.9, 0], clamp);
  const drift = Math.sin(frame / 40) * 3;
  const slam = interpolate(frame, [p.n3At, p.n3At + 5, p.n3At + 9], [1.6, 0.96, 1], clamp);
  const shake = Math.sin(frame * 2.3) * interpolate(frame, [p.n3At + 3, p.n3At + 14], [7, 0], clamp);

  const card = (src: string, k: number, rotY: number, z: number, x: number, y: number, dim: number, w: number, h: number): React.ReactNode => (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        borderRadius: 18,
        overflow: "hidden",
        border: "8px solid #fbf6ea",
        boxShadow: "0 30px 70px rgba(0,0,0,0.6)",
        transform: `translateZ(${z}px) rotateY(${rotY + drift}deg) rotateX(${4 + (1 - k) * 18}deg) translateY(${(1 - k) * 380}px)`,
        opacity: Math.min(1, k * 1.6),
      }}
    >
      <Img src={staticFile(src)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "#000", opacity: dim }} />
    </div>
  );

  // nền: navy sâu + lưới sàn phối cảnh vàng mờ + hạt sáng trôi
  const particles = Array.from({ length: 26 }, (_, i) => {
    const sx = (i * 397) % 1080;
    const sy = (i * 733) % 1920;
    const sp = 0.4 + ((i * 37) % 10) / 10;
    const yy = (sy - frame * sp * 2 + 1920) % 1920;
    const r = 2 + (i % 4);
    return <div key={i} style={{ position: "absolute", left: sx, top: yy, width: r * 2, height: r * 2, borderRadius: r, background: GOLD_TEXT, opacity: 0.12 + (i % 5) * 0.05 }} />;
  });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", fontFamily, color: "#fff", textShadow: SHADOW, background: "radial-gradient(120% 80% at 50% 30%, #1a2142 0%, #0b0f22 55%, #05060d 100%)" }}>
      <div style={{ position: "absolute", left: -540, right: -540, bottom: -200, height: 900, perspective: 900 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: "rotateX(72deg)",
            backgroundImage: "linear-gradient(rgba(243,220,138,0.18) 2px, transparent 2px), linear-gradient(90deg, rgba(243,220,138,0.18) 2px, transparent 2px)",
            backgroundSize: "120px 120px",
            backgroundPosition: `0px ${frame * 2}px`,
          }}
        />
      </div>
      {particles}

      {/* tiêu đề cảnh – đi vào cùng chuyển cảnh iris */}
      <div style={{ position: "absolute", left: 80, width: 840, top: 150, textAlign: "center" }}>
        <div style={{ fontWeight: 700, fontSize: SIZE.small, letterSpacing: 8, color: GOLD_TEXT }}>HÀNH TRÌNH 2024 – 2026</div>
        <div style={{ fontWeight: 900, fontSize: SIZE.main, marginTop: 6 }}>KHỐI HOÀNG ANH</div>
      </div>

      {/* trục thời gian */}
      <div style={{ position: "absolute", left: 120 - 2, top: 368, width: 4, height: 520 * line, background: `linear-gradient(${GOLD_TEXT}, rgba(243,220,138,0.25))`, borderRadius: 2 }} />

      {node(350, p.n1At, n1Active, (
        <>
          <div style={{ fontWeight: 800, fontSize: 46, color: GOLD_TEXT }}>{p.n1Year}</div>
          <div style={{ fontWeight: 700, fontSize: SIZE.sub }}>{p.n1Text}</div>
        </>
      ))}
      {node(520, p.n2At, n2Active, (
        <>
          <div style={{ fontWeight: 800, fontSize: 46, color: GOLD_TEXT }}>{p.n2Year}</div>
          <div style={{ fontWeight: 700, fontSize: SIZE.sub }}>{p.n2Text}</div>
        </>
      ))}
      {node(690, p.n3At, n3Active, (
        <div style={{ translate: `${shake}px 0px` }}>
          <div style={{ fontWeight: 800, fontSize: 46, color: GOLD_TEXT }}>{p.n3Year}</div>
          <div style={{ fontWeight: 900, fontSize: 64, lineHeight: 1.05, scale: String(slam), transformOrigin: "left center", ...goldGradientText }}>{p.n3Title}</div>
          <div style={{ marginTop: 8, height: 6, width: 260 * ease(frame, p.n3At + 5, p.n3At + 14), background: TK_RED, borderRadius: 3 }} />
          <div style={{ marginTop: 10, fontWeight: 600, fontSize: SIZE.small, lineHeight: 1.3 }}>{p.n3Sub1}</div>
          <div style={{ fontWeight: 600, fontSize: SIZE.small, lineHeight: 1.3 }}>{p.n3Sub2}</div>
        </div>
      ))}

      {/* thẻ ảnh 3D */}
      <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920, perspective: 1600, perspectiveOrigin: "50% 60%" }}>
        {card(p.photoB, a, -14, -160, 150, 1000 - c * 40, 0.35 + c * 0.25, 720, 480)}
        {card(p.photoA, a, -6, -40 - c * 140, 90, 1010 - c * 50, c * 0.45, 820, 547)}
        {card(p.photoC, c, 4, 60, 100, 1040, 0, 800, 451)}
        <div style={{ position: "absolute", inset: 0, background: "#fff8e6", opacity: flash * 0.75 }} />
      </div>
    </div>
  );
};

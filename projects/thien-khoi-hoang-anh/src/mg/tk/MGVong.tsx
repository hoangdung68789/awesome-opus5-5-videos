import type React from "react";
import { interpolate, Interactive, type InteractivitySchema, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp } from "../../brand";
import { centerBlock, ease, GOLD_TEXT, SIZE } from "./style";

type Props = {
  readonly percent: number;
  readonly center: string;
  readonly label: string;
  readonly top: number;
  readonly style?: React.CSSProperties;
};

// Đồ họa nét "Vòng tỷ lệ": vòng vàng vẽ dần đến đúng tỷ lệ, chữ giữa bật lên khi vòng đóng.
// SFX: swish nhẹ trong lúc vẽ vòng.
const MGVongInner: React.FC<Props> = ({ percent, center, label, top, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const enter = ease(frame, 0, 6);
  const draw = ease(frame, 2, 22);
  const txt = ease(frame, 14, 22);
  const out = interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], clamp);
  const R = 118;
  const C = 2 * Math.PI * R;

  return (
    <div style={{ ...centerBlock(top), opacity: enter * out, ...style }}>
      <div style={{ position: "relative", width: 300, height: 300, margin: "0 auto" }}>
        <svg width={300} height={300} viewBox="0 0 300 300" style={{ position: "absolute", inset: 0, rotate: "-90deg" }}>
          <circle cx={150} cy={150} r={R} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth={16} />
          <circle
            cx={150}
            cy={150}
            r={R}
            fill="none"
            stroke={GOLD_TEXT}
            strokeWidth={16}
            strokeLinecap="round"
            strokeDasharray={`${C * (percent / 100) * draw} ${C}`}
            style={{ filter: "drop-shadow(0 0 12px rgba(243,220,138,0.55))" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 64,
            opacity: txt,
            scale: String(0.8 + 0.2 * txt),
          }}
        >
          {center}
        </div>
      </div>
      <div style={{ marginTop: 14, fontWeight: 700, fontSize: SIZE.sub, opacity: txt }}>{label}</div>
    </div>
  );
};

const schema = {
  percent: { type: "number", default: 23.3, step: 0.1, description: "Tỷ lệ % vẽ vòng", hiddenFromList: false },
  center: { type: "string", default: "≈ 1/4", description: "Chữ giữa vòng" },
  label: { type: "string", default: "GDP CẢ NƯỚC", description: "Nhãn dưới vòng" },
  top: { type: "number", default: 470, step: 1, description: "Vị trí trên (px)", hiddenFromList: false },
} as const satisfies InteractivitySchema;

export const MGVong = Interactive.create({ Component: MGVongInner, layout: "none", schema });

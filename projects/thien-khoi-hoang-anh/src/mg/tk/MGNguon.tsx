import type React from "react";
import { interpolate, Interactive, type InteractivitySchema, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, fontFamily, SAFE_9x16 } from "../../brand";
import { SIZE } from "./style";

type Props = {
  readonly text: string;
  readonly style?: React.CSSProperties;
};

// Dòng nguồn số liệu (chú thích nhỏ, nằm ngay trên dải chú thích TikTok).
const MGNguonInner: React.FC<Props> = ({ text, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const o = interpolate(frame, [0, 8, durationInFrames - 6, durationInFrames], [0, 0.82, 0.82, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: SAFE_9x16.left,
        width: 1080 - SAFE_9x16.left - SAFE_9x16.right,
        top: 1920 - SAFE_9x16.bottom - 48,
        fontFamily,
        fontWeight: 500,
        fontSize: SIZE.note,
        color: "#ffffff",
        opacity: o,
        textShadow: "0 2px 10px rgba(0,0,0,0.8)",
        ...style,
      }}
    >
      {text}
    </div>
  );
};

const schema = {
  text: { type: "string", default: "Nguồn: …", description: "Nguồn số liệu + thời điểm" },
} as const satisfies InteractivitySchema;

export const MGNguon = Interactive.create({ Component: MGNguonInner, layout: "none", schema });

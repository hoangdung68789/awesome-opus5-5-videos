import type React from "react";
import { interpolate, Interactive, type InteractivitySchema, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp } from "../../brand";
import { centerBlock, ease, SIZE } from "./style";

type Props = {
  readonly text: string;
  readonly top: number;
  readonly fontSize: number;
  readonly style?: React.CSSProperties;
};

// Kiểu chữ T5 "Bút dạ quang": chữ hiện, vệt vàng quét dưới chữ như bút dạ.
// SFX: tiếng bút kẻ đúng lúc quét (khung 3→13).
const MGButDaInner: React.FC<Props> = ({ text, top, fontSize, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const enter = ease(frame, 0, 6);
  const sweep = ease(frame, 3, 13);
  const out = interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], clamp);

  return (
    <div style={{ ...centerBlock(top), opacity: enter * out, ...style }}>
      <span style={{ position: "relative", display: "inline-block", fontWeight: 800, fontSize, padding: "0 10px" }}>
        <span
          style={{
            position: "absolute",
            left: 0,
            bottom: fontSize * 0.08,
            height: fontSize * 0.34,
            width: `${sweep * 100}%`,
            background: "linear-gradient(90deg, rgba(243,220,138,0.55), rgba(201,162,74,0.7))",
            borderRadius: 6,
            transform: "skewX(-12deg)",
          }}
        />
        <span style={{ position: "relative" }}>{text}</span>
      </span>
    </div>
  );
};

const schema = {
  text: { type: "string", default: "CAO THỨ 2 GIAI ĐOẠN 2011–2025", description: "Câu điểm cộng" },
  top: { type: "number", default: 560, step: 1, description: "Vị trí trên (px)", hiddenFromList: false },
  fontSize: { type: "number", default: SIZE.sub, step: 1, description: "Cỡ chữ", hiddenFromList: false },
} as const satisfies InteractivitySchema;

export const MGButDa = Interactive.create({ Component: MGButDaInner, layout: "none", schema });

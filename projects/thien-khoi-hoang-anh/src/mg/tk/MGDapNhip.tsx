import type React from "react";
import { interpolate, Interactive, type InteractivitySchema, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp } from "../../brand";
import { centerBlock, ease, SIZE, TK_RED } from "./style";

type Props = {
  readonly title: string;
  readonly sub: string;
  readonly top: number;
  readonly fontSize: number;
  readonly style?: React.CSSProperties;
};

// Kiểu chữ T6 "Đập nhịp": chữ đập từ to xuống đúng phách, rung khung tắt dần,
// vạch đỏ Thiên Khôi kẻ dưới chữ. SFX: boom/kick đúng khung 0.
const MGDapNhipInner: React.FC<Props> = ({ title, sub, top, fontSize, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const s = interpolate(frame, [0, 5, 9], [1.7, 0.96, 1], clamp);
  const o = interpolate(frame, [0, 3], [0, 1], clamp);
  const shake = Math.sin(frame * 2.3) * interpolate(frame, [3, 14], [9, 0], clamp);
  const line = ease(frame, 5, 14);
  const subIn = ease(frame, 8, 16);
  const out = interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], clamp);

  return (
    <div style={{ ...centerBlock(top), opacity: out, translate: `${shake}px 0px`, ...style }}>
      <div
        style={{
          fontWeight: 900,
          fontSize,
          letterSpacing: 1,
          lineHeight: 1.05,
          scale: String(s),
          opacity: o,
          filter: `blur(${interpolate(frame, [0, 4], [6, 0], clamp)}px)`,
        }}
      >
        {title}
      </div>
      <div style={{ margin: "16px auto 0", height: 8, width: `${line * 46}%`, background: TK_RED, borderRadius: 4, boxShadow: "0 0 18px rgba(229,38,47,0.6)" }} />
      {sub ? (
        <div style={{ marginTop: 18, fontWeight: 600, fontSize: SIZE.sub, opacity: subIn, translate: `0px ${(1 - subIn) * 18}px` }}>{sub}</div>
      ) : null}
    </div>
  );
};

const schema = {
  title: { type: "string", default: "THIÊN KHÔI GROUP", description: "Chữ đập nhịp" },
  sub: { type: "string", default: "", description: "Dòng phụ" },
  top: { type: "number", default: 320, step: 1, description: "Vị trí trên (px)", hiddenFromList: false },
  fontSize: { type: "number", default: 80, step: 1, description: "Cỡ chữ", hiddenFromList: false },
} as const satisfies InteractivitySchema;

export const MGDapNhip = Interactive.create({ Component: MGDapNhipInner, layout: "none", schema });

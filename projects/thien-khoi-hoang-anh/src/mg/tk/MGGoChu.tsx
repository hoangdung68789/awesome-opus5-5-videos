import type React from "react";
import { interpolate, Interactive, type InteractivitySchema, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp } from "../../brand";
import { centerBlock, GOLD_TEXT } from "./style";

type Props = {
  readonly line1: string;
  readonly line2: string;
  readonly line2At: number;
  readonly charsPerFrame: number;
  readonly fontSize: number;
  readonly italic: boolean;
  readonly top: number;
  readonly style?: React.CSSProperties;
};

// Kiểu chữ T4 "Gõ chữ": hiện từng ký tự theo nhịp gõ phím, có con trỏ.
// SFX: tiếng gõ phím thật bắt đầu cùng khung ký tự đầu của mỗi dòng.
const MGGoChuInner: React.FC<Props> = ({ line1, line2, line2At, charsPerFrame, fontSize, italic, top, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const out = interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], clamp);
  const n1 = Math.min(line1.length, Math.floor(frame * charsPerFrame) + 1);
  const n2 = line2 ? Math.max(0, Math.min(line2.length, Math.floor((frame - line2At) * charsPerFrame) + 1)) : 0;
  const typing2 = line2 && frame >= line2At;
  const caretOn = Math.floor(frame / 8) % 2 === 0;
  const caret = (
    <span style={{ display: "inline-block", width: 5, height: fontSize * 0.9, marginLeft: 6, background: GOLD_TEXT, opacity: caretOn ? 1 : 0, verticalAlign: "-0.1em" }} />
  );

  return (
    <div
      style={{
        ...centerBlock(top),
        fontWeight: italic ? 600 : 800,
        fontStyle: italic ? "italic" : "normal",
        fontSize,
        lineHeight: 1.25,
        opacity: out,
        ...style,
      }}
    >
      <div>
        {line1.slice(0, n1)}
        {!typing2 ? caret : null}
      </div>
      {line2 ? (
        <div style={{ color: italic ? GOLD_TEXT : "#ffffff", minHeight: fontSize * 1.25 }}>
          {line2.slice(0, n2)}
          {typing2 ? caret : null}
        </div>
      ) : null}
    </div>
  );
};

const schema = {
  line1: { type: "string", default: "TP. HỒ CHÍ MINH", description: "Dòng gõ 1" },
  line2: { type: "string", default: "", description: "Dòng gõ 2 (để trống nếu không dùng)" },
  line2At: { type: "number", default: 32, step: 1, description: "Khung bắt đầu gõ dòng 2", hiddenFromList: false },
  charsPerFrame: { type: "number", default: 0.9, step: 0.1, description: "Ký tự mỗi khung", hiddenFromList: false },
  fontSize: { type: "number", default: 72, step: 1, description: "Cỡ chữ", hiddenFromList: false },
  italic: { type: "boolean", default: false, description: "Chữ nghiêng (câu trích)" },
  top: { type: "number", default: 300, step: 1, description: "Vị trí trên (px)", hiddenFromList: false },
} as const satisfies InteractivitySchema;

export const MGGoChu = Interactive.create({ Component: MGGoChuInner, layout: "none", schema });

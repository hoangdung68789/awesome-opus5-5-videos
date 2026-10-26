import type React from "react";
import { interpolate, Interactive, type InteractivitySchema, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp } from "../../brand";
import { centerBlock, GOLD_TEXT, pop, SIZE } from "./style";

type Props = {
  readonly line1: string;
  readonly line2: string;
  readonly line3: string;
  readonly line2At: number;
  readonly line3At: number;
  readonly top: number;
  readonly style?: React.CSSProperties;
};

// Kiểu chữ T1 "Bật từng từ": từng từ nẩy vào, dòng cuối là từ khóa vàng phóng nhẹ.
// SFX: pop ở dòng 1 và pop/boom nhẹ ở dòng từ khóa. Khung 0 đã thấy chữ (ảnh bìa TikTok).
const MGBatTuInner: React.FC<Props> = ({ line1, line2, line3, line2At, line3At, top, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const out = interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], clamp);

  const renderLine = (text: string, at: number, accent: boolean, warm: number) => (
    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", columnGap: 22 }}>
      {text.split(" ").map((word, i) => {
        const p = pop(frame + warm, at + i * 3, 8);
        return (
          <span
            key={`${word}-${i}`}
            style={{
              display: "inline-block",
              opacity: Math.min(1, p * 1.4),
              scale: String((accent ? 0.55 : 0.7) + (accent ? 0.45 : 0.3) * p),
              transformOrigin: "50% 60%",
              translate: `0px ${(1 - p) * 26}px`,
              color: accent ? GOLD_TEXT : "#ffffff",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );

  return (
    <div
      style={{
        ...centerBlock(top),
        fontWeight: 800,
        fontSize: SIZE.main,
        lineHeight: 1.18,
        opacity: out,
        scale: String(0.96 + 0.04 * out),
        ...style,
      }}
    >
      {renderLine(line1, 0, false, 6)}
      {line2 ? renderLine(line2, line2At, false, 0) : null}
      {line3 ? renderLine(line3, line3At, true, 0) : null}
    </div>
  );
};

const schema = {
  line1: { type: "string", default: "NĂM 2025,", description: "Dòng 1 (thấy ngay khung 0)" },
  line2: { type: "string", default: "KINH TẾ VIỆT NAM", description: "Dòng 2" },
  line3: { type: "string", default: "TĂNG BAO NHIÊU?", description: "Dòng từ khóa (vàng)" },
  line2At: { type: "number", default: 10, step: 1, description: "Khung bật dòng 2", hiddenFromList: false },
  line3At: { type: "number", default: 22, step: 1, description: "Khung bật dòng 3", hiddenFromList: false },
  top: { type: "number", default: 300, step: 1, description: "Vị trí trên (px)", hiddenFromList: false },
} as const satisfies InteractivitySchema;

export const MGBatTu = Interactive.create({ Component: MGBatTuInner, layout: "none", schema });

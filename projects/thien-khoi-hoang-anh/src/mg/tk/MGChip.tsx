import type React from "react";
import { interpolate, Interactive, type InteractivitySchema, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, fontFamily } from "../../brand";
import { GOLD_TEXT, pop, SHADOW, SIZE } from "./style";

type Props = {
  readonly v1: string;
  readonly l1: string;
  readonly v2: string;
  readonly l2: string;
  readonly v3: string;
  readonly l3: string;
  readonly v4: string;
  readonly l4: string;
  readonly at2: number;
  readonly at3: number;
  readonly at4: number;
  readonly top: number;
  readonly style?: React.CSSProperties;
};

// Kiểu chữ T3 "Chip xếp lần lượt": mỗi dòng (số vàng + nhãn trắng) bật vào theo phách,
// gạch đầu dòng vàng. Không thẻ nền. SFX: click/pop cao độ tăng dần mỗi dòng.
const MGChipInner: React.FC<Props> = ({ v1, l1, v2, l2, v3, l3, v4, l4, at2, at3, at4, top, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const out = interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], clamp);

  const row = (v: string, l: string, at: number, big: boolean) => {
    const p = pop(frame, at, 8);
    return (
      <div
        style={{
          display: "flex",
          flexDirection: big ? "column" : "row",
          alignItems: big ? "flex-start" : "center",
          gap: big ? 4 : 26,
          paddingLeft: big ? 40 : 0,
          position: "relative",
          marginBottom: big ? 0 : 26,
          opacity: Math.min(1, p * 1.5),
          translate: `${(1 - p) * -60}px 0px`,
        }}
      >
        <div style={{ position: big ? "absolute" : "static", left: 0, top: 48, width: 14, height: 14, borderRadius: 7, background: GOLD_TEXT, boxShadow: "0 0 14px rgba(243,220,138,0.7)", flexShrink: 0 }} />
        <div style={{ color: GOLD_TEXT, fontWeight: 800, fontSize: big ? 96 : 76, minWidth: big ? 0 : 190, fontVariantNumeric: "tabular-nums", scale: String(0.85 + 0.15 * p), transformOrigin: "left center" }}>
          {v}
        </div>
        <div style={{ color: "#ffffff", fontWeight: 700, fontSize: big ? SIZE.small : SIZE.sub, lineHeight: 1.2, whiteSpace: "pre-line" }}>{l}</div>
      </div>
    );
  };

  return (
    <div style={{ position: "absolute", left: 120, width: 800, top, fontFamily, textShadow: SHADOW, opacity: out, ...style }}>
      {row(v1, l1, 0, false)}
      {row(v2, l2, at2, false)}
      {row(v3, l3, at3, false)}
      {row(v4, l4, at4, true)}
    </div>
  );
};

const schema = {
  v1: { type: "string", default: "2020", description: "Số 1" },
  l1: { type: "string", default: "THÀNH LẬP", description: "Nhãn 1" },
  v2: { type: "string", default: "7", description: "Số 2" },
  l2: { type: "string", default: "CHI NHÁNH", description: "Nhãn 2" },
  v3: { type: "string", default: "31", description: "Số 3" },
  l3: { type: "string", default: "TRỤ SỞ", description: "Nhãn 3" },
  v4: { type: "string", default: "40.000+", description: "Số 4 (lớn)" },
  l4: { type: "string", default: "nhà tư vấn, môi giới,\nnhà đầu tư dùng hệ sinh thái", description: "Nhãn 4" },
  at2: { type: "number", default: 16, step: 1, description: "Khung bật dòng 2", hiddenFromList: false },
  at3: { type: "number", default: 31, step: 1, description: "Khung bật dòng 3", hiddenFromList: false },
  at4: { type: "number", default: 46, step: 1, description: "Khung bật dòng 4", hiddenFromList: false },
  top: { type: "number", default: 300, step: 1, description: "Vị trí trên (px)", hiddenFromList: false },
} as const satisfies InteractivitySchema;

export const MGChip = Interactive.create({ Component: MGChipInner, layout: "none", schema });

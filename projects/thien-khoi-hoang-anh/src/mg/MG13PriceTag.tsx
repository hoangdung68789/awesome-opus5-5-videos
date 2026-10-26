import type React from "react";
import { interpolate, Interactive, type InteractivitySchema } from "remotion";
import { clamp, COLORS, fontFamily, GOLD, GOLD_TEXT_GRADIENT } from "../brand";
import { EASE_OUT, useEnterExit } from "./motion";

type Props = {
  readonly amount: number;
  readonly unit: string;
  readonly note: string;
  readonly countUp: boolean;
  readonly style?: React.CSSProperties;
};

const formatVi = (value: number, decimals: number) =>
  value.toFixed(decimals).replace(".", ",");

// MG13 – Giá bán: số lớn màu nhấn, phóng 80→100% (gợi ý SFX: ding).
// Bật `countUp` để thành MG26 – đếm số từ 0 lên giá.
const MG13PriceTagInner: React.FC<Props> = ({ amount, unit, note, countUp, style }) => {
  const { frame, fps, enter, exit } = useEnterExit();
  const decimals = Number.isInteger(amount) ? 0 : 1;
  const counted = countUp
    ? interpolate(frame, [0.1 * fps, 1.1 * fps], [0, amount], { ...clamp, easing: EASE_OUT })
    : amount;

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 160,
        top: 760,
        textAlign: "center",
        fontFamily,
        scale: String(0.8 + 0.2 * enter),
        opacity: enter * (1 - exit),
        ...style,
      }}
    >
      <div
        style={{
          color: GOLD.light,
          fontSize: 40,
          fontWeight: 600,
          letterSpacing: "0.3em",
          marginRight: "-0.3em",
        }}
      >
        GIÁ BÁN
      </div>
      <div
        style={{
          fontSize: 168,
          fontWeight: 800,
          lineHeight: 1.05,
          backgroundImage: GOLD_TEXT_GRADIENT,
          backgroundSize: "250% 100%",
          backgroundPosition: `${interpolate(frame, [0.3 * fps, 1.6 * fps], [100, 0], clamp)}% 0%`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          filter: "drop-shadow(0 8px 30px rgba(0,0,0,0.85))",
        }}
      >
        {formatVi(counted, decimals)} {unit}
      </div>
      {note ? (
        <div
          style={{
            display: "inline-block",
            marginTop: 12,
            padding: "8px 26px",
            borderRadius: 999,
            background: COLORS.card,
            color: COLORS.text,
            fontSize: 42,
            fontWeight: 500,
          }}
        >
          {note}
        </div>
      ) : null}
    </div>
  );
};

const schema = {
  amount: { type: "number", default: 7.3, min: 0, step: 0.1, description: "Giá (số)", hiddenFromList: false },
  unit: { type: "string", default: "tỷ", description: "Đơn vị" },
  note: { type: "string", default: "Thương lượng", description: "Ghi chú" },
  countUp: { type: "boolean", default: false, description: "Đếm số (MG26)" },
} as const satisfies InteractivitySchema;

export const MG13PriceTag = Interactive.create({
  Component: MG13PriceTagInner,
  layout: "none",
  schema,
});

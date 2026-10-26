import type React from "react";
import { interpolate, Interactive, type InteractivitySchema } from "remotion";
import { clamp, COLORS, fontFamily, GOLD } from "../brand";
import { EASE_OUT, useEnterExit } from "./motion";

type Props = {
  readonly text: string;
  readonly style?: React.CSSProperties;
};

// MG12 – Huy hiệu pháp lý: dấu tích vẽ dần + "Sổ hồng riêng · Hoàn công".
// Chỉ dùng khi pháp lý đã xác minh. Gợi ý SFX: pop.
const MG12LegalBadgeInner: React.FC<Props> = ({ text, style }) => {
  const { frame, fps, enter, exit } = useEnterExit(0.3);
  const tick = interpolate(frame, [0.15 * fps, 0.5 * fps], [0, 1], { ...clamp, easing: EASE_OUT });
  const pop = interpolate(frame, [0, 0.18 * fps, 0.32 * fps], [0.7, 1.08, 1], clamp);

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 160,
        top: 360,
        display: "flex",
        justifyContent: "center",
        opacity: enter * (1 - exit),
        ...style,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          padding: "20px 36px 20px 22px",
          borderRadius: 999,
          background: COLORS.card,
          border: `3px solid ${GOLD.base}`,
          boxShadow: `0 0 40px rgba(201,162,74,0.35)`,
          scale: String(pop),
        }}
      >
        <svg width={68} height={68} viewBox="0 0 76 76">
          <circle cx={38} cy={38} r={36} fill={GOLD.base} />
          <path
            d="M21 39 L33 51 L56 26"
            fill="none"
            stroke="#1a1408"
            strokeWidth={8}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1 1"
            strokeDashoffset={1 - tick}
          />
        </svg>
        <span style={{ color: COLORS.text, fontFamily, fontWeight: 700, fontSize: 44, whiteSpace: "nowrap" }}>
          {text}
        </span>
      </div>
    </div>
  );
};

const schema = {
  text: { type: "string", default: "Sổ hồng riêng · Hoàn công", description: "Pháp lý (đã xác minh)" },
} as const satisfies InteractivitySchema;

export const MG12LegalBadge = Interactive.create({
  Component: MG12LegalBadgeInner,
  layout: "none",
  schema,
});

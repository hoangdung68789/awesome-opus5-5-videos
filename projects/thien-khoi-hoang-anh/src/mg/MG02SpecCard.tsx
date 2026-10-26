import type React from "react";
import { interpolate, Interactive, type InteractivitySchema } from "remotion";
import { clamp, COLORS, fontFamily, GOLD } from "../brand";
import { EASE_OUT, useEnterExit } from "./motion";

type Props = {
  readonly specs: string;
  readonly label: string;
  readonly style?: React.CSSProperties;
};

// MG02 – Thẻ thông số 2D: "4x16m · 4 tầng · 4PN". Trượt vào, giữ ≥2,5s.
// Mỗi thông số tách bằng dấu "·" và hiện lần lượt.
const MG02SpecCardInner: React.FC<Props> = ({ specs, label, style }) => {
  const { frame, fps, enter, exit } = useEnterExit(0.3);
  const items = specs.split("·").map((s) => s.trim()).filter(Boolean);

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        bottom: 520,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        padding: "28px 36px",
        borderRadius: 24,
        background: COLORS.card,
        border: `2px solid ${COLORS.cardBorder}`,
        boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
        fontFamily,
        translate: `${(1 - enter) * -120 + exit * -120}px 0px`,
        opacity: enter * (1 - exit),
        ...style,
      }}
    >
      {label ? (
        <div
          style={{
            color: GOLD.light,
            fontSize: 30,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
      ) : null}
      <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
        {items.map((item, i) => {
          const t = interpolate(
            frame,
            [0.2 * fps + i * 0.15 * fps, 0.45 * fps + i * 0.15 * fps],
            [0, 1],
            { ...clamp, easing: EASE_OUT },
          );
          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 22,
                opacity: t,
                translate: `0px ${(1 - t) * 16}px`,
              }}
            >
              {i > 0 ? (
                <div style={{ width: 8, height: 8, borderRadius: 4, background: GOLD.base }} />
              ) : null}
              <span style={{ color: COLORS.text, fontSize: 56, fontWeight: 700 }}>{item}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const schema = {
  specs: { type: "string", default: "4x16m · 4 tầng · 4PN", description: "Thông số (cách nhau bởi ·)" },
  label: { type: "string", default: "Thông số", description: "Nhãn nhỏ phía trên" },
} as const satisfies InteractivitySchema;

export const MG02SpecCard = Interactive.create({
  Component: MG02SpecCardInner,
  layout: "none",
  schema,
});

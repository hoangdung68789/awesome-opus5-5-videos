import type React from "react";
import { interpolate, Interactive, type InteractivitySchema } from "remotion";
import { clamp, COLORS, fontFamily, GOLD } from "../brand";
import { EASE_OUT, useEnterExit } from "./motion";

type Props = {
  readonly text: string;
  readonly fix: string;
  readonly negative: boolean;
  readonly radius: number;
  readonly style?: React.CSSProperties;
};

// MG08 – Callout điểm cộng / MG09 – điểm trừ + cách khắc phục (bật `negative`).
// Vòng tròn vẽ dần quanh chi tiết, nhãn trượt ra bên phải.
// Đặt `left`/`top` vào tâm chi tiết cần chỉ (vòng tròn nằm ở góc trên trái).
const MG08CalloutInner: React.FC<Props> = ({ text, fix, negative, radius, style }) => {
  const { frame, fps, exit } = useEnterExit();
  const draw = interpolate(frame, [0, 0.5 * fps], [0, 1], { ...clamp, easing: EASE_OUT });
  const labelIn = interpolate(frame, [0.35 * fps, 0.65 * fps], [0, 1], {
    ...clamp,
    easing: EASE_OUT,
  });
  // MG09 dùng màu trung tính, không phóng đại điểm trừ.
  const color = negative ? COLORS.neutral : GOLD.light;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      style={{
        position: "absolute",
        left: 260,
        top: 800,
        opacity: 1 - exit,
        ...style,
      }}
    >
      <svg
        width={radius * 2 + 20}
        height={radius * 2 + 20}
        style={{ position: "absolute", left: -radius - 10, top: -radius - 10, overflow: "visible" }}
      >
        <circle
          cx={radius + 10}
          cy={radius + 10}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={7}
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - draw)}
          transform={`rotate(-90 ${radius + 10} ${radius + 10})`}
          style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.8))" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: radius + 30,
          top: -50,
          width: "max-content",
          maxWidth: 520,
          padding: "18px 26px",
          borderRadius: 20,
          background: COLORS.card,
          borderLeft: `6px solid ${color}`,
          fontFamily,
          opacity: labelIn,
          translate: `${(1 - labelIn) * -30}px 0px`,
        }}
      >
        <div style={{ color: COLORS.text, fontSize: 44, fontWeight: 700, lineHeight: 1.15 }}>
          {text}
        </div>
        {negative && fix ? (
          <div style={{ color, fontSize: 38, fontWeight: 500, marginTop: 8 }}>{fix}</div>
        ) : null}
      </div>
    </div>
  );
};

const schema = {
  text: { type: "string", default: "Cột BTCT chắc", description: "Nội dung chính" },
  fix: { type: "string", default: "", description: "Cách khắc phục (MG09)" },
  negative: { type: "boolean", default: false, description: "Điểm trừ (MG09)" },
  radius: { type: "number", default: 90, min: 30, max: 300, step: 2, description: "Bán kính vòng", hiddenFromList: false },
} as const satisfies InteractivitySchema;

export const MG08Callout = Interactive.create({
  Component: MG08CalloutInner,
  layout: "none",
  schema,
});

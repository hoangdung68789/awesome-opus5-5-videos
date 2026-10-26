import type React from "react";
import { interpolate, Interactive, type InteractivitySchema } from "remotion";
import { clamp, COLORS, fontFamily, GOLD } from "../brand";
import { EASE_OUT, useEnterExit } from "./motion";

type Props = {
  readonly label: string;
  readonly span: number;
  readonly color: string;
  readonly style?: React.CSSProperties;
};

// MG04 – Độ rộng hẻm: mũi tên hai đầu vẽ dần từ giữa + nhãn "Hẻm 6m".
// Đặt `top` ngang mặt đường và chỉnh `span` cho khớp hai mép hẻm.
const MG04AlleyWidthInner: React.FC<Props> = ({ label, span, color, style }) => {
  const { frame, fps, exit } = useEnterExit();
  const draw = interpolate(frame, [0, 0.6 * fps], [0, 1], { ...clamp, easing: EASE_OUT });
  const labelIn = interpolate(frame, [0.45 * fps, 0.75 * fps], [0, 1], {
    ...clamp,
    easing: EASE_OUT,
  });
  const half = (span / 2) * draw;
  const cx = span / 2 + 30;

  return (
    <div
      style={{
        position: "absolute",
        left: (1080 - span - 60) / 2,
        top: 1150,
        width: span + 60,
        height: 200,
        opacity: 1 - exit,
        ...style,
      }}
    >
      <svg width={span + 60} height={120} style={{ overflow: "visible" }}>
        <defs>
          <marker id="mg04-head" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0 0 L10 5 L0 10 Z" fill={color} />
          </marker>
        </defs>
        <line
          x1={cx - half}
          x2={cx + half}
          y1={60}
          y2={60}
          stroke={color}
          strokeWidth={8}
          strokeLinecap="round"
          markerStart={draw > 0.05 ? "url(#mg04-head)" : undefined}
          markerEnd={draw > 0.05 ? "url(#mg04-head)" : undefined}
          style={{ filter: "drop-shadow(0 3px 8px rgba(0,0,0,0.7))" }}
        />
        <line x1={30} x2={30} y1={30} y2={90} stroke={color} strokeWidth={5} opacity={draw} />
        <line x1={span + 30} x2={span + 30} y1={30} y2={90} stroke={color} strokeWidth={5} opacity={draw} />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 100,
          textAlign: "center",
          opacity: labelIn,
          translate: `0px ${(1 - labelIn) * 20}px`,
        }}
      >
        <span
          style={{
            display: "inline-block",
            padding: "10px 30px",
            borderRadius: 999,
            background: COLORS.card,
            border: `2px solid ${color}`,
            color: COLORS.text,
            fontFamily,
            fontWeight: 700,
            fontSize: 60,
          }}
        >
          {label}
        </span>
      </div>
    </div>
  );
};

const schema = {
  label: { type: "string", default: "Hẻm 6m", description: "Nhãn độ rộng" },
  span: { type: "number", default: 760, min: 200, max: 1000, step: 10, description: "Bề rộng mũi tên (px)", hiddenFromList: false },
  color: { type: "color", default: GOLD.light, description: "Màu mũi tên" },
} as const satisfies InteractivitySchema;

export const MG04AlleyWidth = Interactive.create({
  Component: MG04AlleyWidthInner,
  layout: "none",
  schema,
});

import type React from "react";
import { Easing, interpolate, Interactive, type InteractivitySchema, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp } from "../../brand";
import { centerBlock, ease, formatVi, goldGradientText, SIZE } from "./style";

type Props = {
  readonly label: string;
  readonly value: number;
  readonly decimals: number;
  readonly suffix: string;
  readonly rollFrames: number;
  readonly top: number;
  readonly style?: React.CSSProperties;
};

// Kiểu chữ T2 "Số chạy": số lăn rồi dừng đúng giá trị, nẩy + lóe vàng khi chốt.
// SFX: tick_roll khi bắt đầu lăn, âm chốt (chuông/xu) đúng khung dừng.
const MGSoChayInner: React.FC<Props> = ({ label, value, decimals, suffix, rollFrames, top, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const enter = ease(frame, 0, 8);
  const out = interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], clamp);
  const k = interpolate(frame, [0, rollFrames], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const bump = interpolate(frame, [rollFrames, rollFrames + 4, rollFrames + 10], [1, 1.1, 1], clamp);
  const flash = interpolate(frame, [rollFrames, rollFrames + 3, rollFrames + 14], [0, 1, 0], clamp);

  return (
    <div style={{ ...centerBlock(top), opacity: enter * out, ...style }}>
      <div style={{ fontWeight: 700, fontSize: SIZE.sub, letterSpacing: 1, translate: `0px ${(1 - enter) * 20}px` }}>
        {label}
      </div>
      <div
        style={{
          marginTop: 6,
          fontWeight: 800,
          fontSize: SIZE.number,
          lineHeight: 1.05,
          fontVariantNumeric: "tabular-nums",
          scale: String(bump),
          ...goldGradientText,
          textShadow: `0 4px 22px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5), 0 0 ${20 + 30 * flash}px rgba(255,210,100,${0.3 + 0.6 * flash})`,
        }}
      >
        {formatVi(value * k, decimals)}
        {suffix}
      </div>
    </div>
  );
};

const schema = {
  label: { type: "string", default: "GDP VIỆT NAM 2025 TĂNG", description: "Nhãn trên số" },
  value: { type: "number", default: 8.02, step: 0.01, description: "Giá trị (đã xác minh)", hiddenFromList: false },
  decimals: { type: "number", default: 2, step: 1, description: "Số chữ số thập phân", hiddenFromList: false },
  suffix: { type: "string", default: "%", description: "Đơn vị sau số" },
  rollFrames: { type: "number", default: 31, step: 1, description: "Số khung lăn đến khi chốt", hiddenFromList: false },
  top: { type: "number", default: 300, step: 1, description: "Vị trí trên (px)", hiddenFromList: false },
} as const satisfies InteractivitySchema;

export const MGSoChay = Interactive.create({ Component: MGSoChayInner, layout: "none", schema });

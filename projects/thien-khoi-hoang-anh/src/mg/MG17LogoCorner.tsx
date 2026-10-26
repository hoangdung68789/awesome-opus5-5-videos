import type React from "react";
import { Interactive, type InteractivitySchema } from "remotion";
import { fontFamily, GOLD, LOGO_PATHS, LOGO_VIEWBOX } from "../brand";

type Props = {
  readonly showName: boolean;
  readonly style?: React.CSSProperties;
};

// MG17 – Logo góc: nhỏ, mờ 70-80%, cố định góc trên phải trong vùng an toàn.
// Chỉ dùng khi Dũng yêu cầu và ẩn ở cảnh CTA (đặt durationInFrames dừng trước CTA).
const MG17LogoCornerInner: React.FC<Props> = ({ showName, style }) => (
  <div
    style={{
      position: "absolute",
      top: 150,
      right: 170,
      display: "flex",
      alignItems: "center",
      gap: 12,
      opacity: 0.75,
      ...style,
    }}
  >
    <svg viewBox={LOGO_VIEWBOX} width={70} height={84} style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="mg17-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={GOLD.deep} />
          <stop offset="50%" stopColor={GOLD.light} />
          <stop offset="100%" stopColor={GOLD.base} />
        </linearGradient>
      </defs>
      {LOGO_PATHS.map((d) => (
        <path key={d} d={d} fill="none" stroke="url(#mg17-gold)" strokeWidth={16} strokeLinecap="square" />
      ))}
    </svg>
    {showName ? (
      <div style={{ fontFamily, color: GOLD.light, lineHeight: 1.05 }}>
        <div style={{ fontSize: 26, fontWeight: 700 }}>HOÀNG DŨNG</div>
        <div style={{ fontSize: 14, fontWeight: 400, letterSpacing: "0.32em" }}>REAL ESTATE</div>
      </div>
    ) : null}
  </div>
);

const schema = {
  showName: { type: "boolean", default: false, description: "Hiện tên bên cạnh" },
} as const satisfies InteractivitySchema;

export const MG17LogoCorner = Interactive.create({
  Component: MG17LogoCornerInner,
  layout: "none",
  schema,
});

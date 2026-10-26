import type React from "react";
import { interpolate, Interactive, type InteractivitySchema } from "remotion";
import { clamp, COLORS, fontFamily, GOLD } from "../brand";
import { EASE_OUT, useEnterExit } from "./motion";

type Props = {
  readonly line: string;
  readonly contact: string;
  readonly style?: React.CSSProperties;
};

// MG16 – Thẻ CTA: trượt lên, giữ ≥3s. Không logo, không chữ thương hiệu
// (H-chung-004). `contact` chỉ lấy từ brand.txt – để trống thì ẩn dòng này.
const MG16CtaInner: React.FC<Props> = ({ line, contact, style }) => {
  const { frame, fps, enter, exit } = useEnterExit(0.35);
  const shine = interpolate(frame, [0.6 * fps, 1.6 * fps], [-120, 220], clamp);
  const contactIn = interpolate(frame, [0.3 * fps, 0.6 * fps], [0, 1], { ...clamp, easing: EASE_OUT });

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 160,
        bottom: 480,
        padding: "34px 40px",
        borderRadius: 28,
        overflow: "hidden",
        background: `linear-gradient(135deg, ${GOLD.light}, ${GOLD.base} 55%, ${GOLD.deep})`,
        boxShadow: "0 24px 70px rgba(0,0,0,0.5)",
        fontFamily,
        textAlign: "center",
        translate: `0px ${(1 - enter) * 160 + exit * 160}px`,
        opacity: enter * (1 - exit),
        ...style,
      }}
    >
      <div style={{ color: "#17120a", fontSize: 58, fontWeight: 800, lineHeight: 1.15 }}>{line}</div>
      {contact ? (
        <div
          style={{
            marginTop: 14,
            color: "#17120a",
            fontSize: 50,
            fontWeight: 600,
            opacity: contactIn,
          }}
        >
          {contact}
        </div>
      ) : null}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${shine}%`,
          width: "35%",
          background: "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0) 100%)",
        }}
      />
      <div style={{ position: "absolute", inset: 0, borderRadius: 28, border: `2px solid ${COLORS.text}33` }} />
    </div>
  );
};

const schema = {
  line: { type: "string", default: "Nhắn anh Dũng đi xem thực tế", description: "Câu CTA" },
  contact: { type: "string", default: "", description: "SĐT / Zalo (từ brand.txt)" },
} as const satisfies InteractivitySchema;

export const MG16Cta = Interactive.create({
  Component: MG16CtaInner,
  layout: "none",
  schema,
});

import type React from "react";
import { Interactive, type InteractivitySchema } from "remotion";
import { COLORS, fontFamily, GOLD } from "../brand";
import { useEnterExit } from "./motion";

type Props = {
  readonly text: string;
  readonly highlight: string;
  readonly accentColor: string;
  readonly style?: React.CSSProperties;
};

// MG01 – Chữ Hook: ≤8 từ, tô màu nhấn 1-2 từ khóa, phóng 60→100% trong 0,25s.
const MG01HookInner: React.FC<Props> = ({ text, highlight, accentColor, style }) => {
  const { enter, exit } = useEnterExit();
  const parts = highlight ? text.split(highlight) : [text];

  return (
    <div
      style={{
        position: "absolute",
        left: 80,
        right: 160,
        top: 300,
        textAlign: "center",
        fontFamily,
        fontWeight: 800,
        fontSize: 96,
        lineHeight: 1.12,
        color: COLORS.text,
        textShadow: "0 6px 30px rgba(0,0,0,0.85), 0 2px 4px rgba(0,0,0,0.9)",
        scale: String(0.6 + 0.4 * enter - 0.1 * exit),
        opacity: enter * (1 - exit),
        ...style,
      }}
    >
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 ? (
            <span style={{ color: accentColor }}>{highlight}</span>
          ) : null}
        </span>
      ))}
    </div>
  );
};

const schema = {
  text: { type: "string", default: "Nhà hẻm xe hơi chỉ 5 tỷ?", description: "Câu hook (≤8 từ)" },
  highlight: { type: "string", default: "5 tỷ", description: "Từ khóa tô màu" },
  accentColor: { type: "color", default: GOLD.light, description: "Màu nhấn" },
} as const satisfies InteractivitySchema;

export const MG01Hook = Interactive.create({
  Component: MG01HookInner,
  layout: "none",
  schema,
});

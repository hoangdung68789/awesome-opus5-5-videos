import type React from "react";
import { interpolate, Interactive, type InteractivitySchema, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp } from "../../brand";
import { centerBlock, ease, GOLD_TEXT, SIZE } from "./style";

type Props = {
  readonly big: string;
  readonly ring: string;
  readonly line1: string;
  readonly line2: string;
  readonly top: number;
  readonly style?: React.CSSProperties;
};

// Kiểu chữ T7 "Con dấu": dấu tròn nét vàng đóng xuống (to → đúng cỡ, xoay nghiêng),
// vòng bụi lan ra; hai dòng mô tả hiện sau. SFX: stamp thump đúng khung 4 (lúc chạm).
const MGConDauInner: React.FC<Props> = ({ big, ring, line1, line2, top, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const s = interpolate(frame, [0, 4, 8], [2.3, 0.94, 1], clamp);
  const o = interpolate(frame, [0, 2], [0, 1], clamp);
  const burst = ease(frame, 4, 18);
  const lines = ease(frame, 9, 17);
  const out = interpolate(frame, [durationInFrames - 6, durationInFrames], [1, 0], clamp);

  return (
    <div style={{ ...centerBlock(top), opacity: out, ...style }}>
      <div style={{ position: "relative", width: 330, height: 330, margin: "0 auto" }}>
        <div
          style={{
            position: "absolute",
            inset: -40 * burst,
            borderRadius: "50%",
            border: `3px solid rgba(243,220,138,${0.6 * (1 - burst)})`,
          }}
        />
        <div style={{ position: "absolute", inset: 0, scale: String(s), rotate: "-12deg", opacity: o }}>
          <svg width={330} height={330} viewBox="0 0 330 330" style={{ position: "absolute", inset: 0 }}>
            <defs>
              <path id="dau-vong" d="M165 165 m-122 0 a122 122 0 1 1 244 0 a122 122 0 1 1 -244 0" />
            </defs>
            <circle cx={165} cy={165} r={156} fill="none" stroke={GOLD_TEXT} strokeWidth={7} />
            <circle cx={165} cy={165} r={100} fill="none" stroke={GOLD_TEXT} strokeWidth={3} />
            <text fill={GOLD_TEXT} fontSize={27} fontWeight={800} letterSpacing={4}>
              <textPath href="#dau-vong" startOffset="0">
                {ring}
              </textPath>
            </text>
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: GOLD_TEXT, fontWeight: 900, fontSize: 66, lineHeight: 1 }}>
            {big}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 30, opacity: lines, translate: `0px ${(1 - lines) * 20}px` }}>
        <div style={{ fontWeight: 700, fontSize: SIZE.sub, lineHeight: 1.25, whiteSpace: "pre-line" }}>{line1}</div>
        <div style={{ marginTop: 12, fontWeight: 600, fontSize: SIZE.small, color: GOLD_TEXT }}>{line2}</div>
      </div>
    </div>
  );
};

const schema = {
  big: { type: "string", default: "TOP 5", description: "Chữ giữa dấu" },
  ring: { type: "string", default: "VARS AWARDS 2026 • VARS AWARDS 2026 •", description: "Chữ chạy quanh dấu" },
  line1: { type: "string", default: "Dẫn đầu phát triển nền tảng công nghệ\ncho môi giới BĐS & khách hàng", description: "Dòng mô tả" },
  line2: { type: "string", default: "TKG Proptech · Thiên Khôi HRM", description: "Dòng sản phẩm" },
  top: { type: "number", default: 260, step: 1, description: "Vị trí trên (px)", hiddenFromList: false },
} as const satisfies InteractivitySchema;

export const MGConDau = Interactive.create({ Component: MGConDauInner, layout: "none", schema });

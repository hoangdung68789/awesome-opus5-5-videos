import type React from "react";
import { Img, interpolate, Interactive, type InteractivitySchema, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp } from "../../brand";
import { centerBlock, ease, GOLD_TEXT, goldGradientText, pop, SIZE } from "./style";

type TacGiaProps = {
  readonly photo: string;
  readonly hoTen: string;
  readonly line1: string;
  readonly line2: string;
  readonly nameAt: number;
  readonly subAt: number;
  readonly style?: React.CSSProperties;
};

// Thẻ tác giả: ảnh chân dung lật 3D vào, lóe sáng; tên lộ qua mặt nạ (kiểu chữ T8
// "Chớp sáng + mặt nạ", SFX shutter); 2 dòng phụ (pop nhẹ). Cuối cảnh thu nhỏ bay lên
// đúng chỗ ảnh đại diện của CTA.
const MGTheTacGiaInner: React.FC<TacGiaProps> = ({ photo, hoTen, line1, line2, nameAt, subAt, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const flip = ease(frame, 0, 16);
  const flash = interpolate(frame, [nameAt - 2, nameAt + 1, nameAt + 9], [0, 0.85, 0], clamp);
  const mask = ease(frame, nameAt, nameAt + 10);
  const sub = ease(frame, subAt, subAt + 8);
  const exit = ease(frame, durationInFrames - 9, durationInFrames);

  return (
    <div style={{ position: "absolute", inset: 0, ...style }}>
      <div
        style={{
          position: "absolute",
          left: 220,
          top: 250,
          width: 560,
          height: 590,
          perspective: 1400,
          translate: `${exit * 30}px ${exit * -10}px`,
          scale: String(1 - exit * 0.6),
          opacity: 1 - exit,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 30,
            overflow: "hidden",
            border: `3px solid ${GOLD_TEXT}`,
            boxShadow: "0 30px 80px rgba(0,0,0,0.6), 0 0 40px rgba(243,220,138,0.25)",
            transform: `rotateY(${(1 - flip) * 75}deg) rotateX(${(1 - flip) * 8}deg)`,
            opacity: Math.min(1, flip * 2),
          }}
        >
          <Img src={staticFile(photo)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 20%" }} />
          <div style={{ position: "absolute", inset: 0, background: "#fff8e6", opacity: flash }} />
        </div>
      </div>
      <div style={{ ...centerBlock(900), opacity: 1 - exit }}>
        <div style={{ clipPath: `inset(0 ${(1 - mask) * 100}% 0 0)`, fontWeight: 900, fontSize: SIZE.main + 6, letterSpacing: 2, ...goldGradientText }}>{hoTen}</div>
        <div style={{ marginTop: 14, fontWeight: 700, fontSize: SIZE.sub, opacity: sub, translate: `0px ${(1 - sub) * 16}px` }}>{line1}</div>
        <div style={{ marginTop: 8, fontWeight: 600, fontSize: SIZE.small, opacity: sub * 0.9, translate: `0px ${(1 - sub) * 16}px` }}>{line2}</div>
      </div>
    </div>
  );
};

const tacGiaSchema = {
  photo: { type: "string", default: "assets/hoang-dung-chan-dung.jpg", description: "Ảnh chân dung (public/)" },
  hoTen: { type: "string", default: "HOÀNG DŨNG", description: "Tên tác giả" },
  line1: { type: "string", default: "Môi giới nhà phố TP.HCM", description: "Dòng phụ 1" },
  line2: { type: "string", default: "Khối Hoàng Anh · Thiên Khôi Group", description: "Dòng phụ 2" },
  nameAt: { type: "number", default: 11, step: 1, description: "Khung lộ tên", hiddenFromList: false },
  subAt: { type: "number", default: 23, step: 1, description: "Khung hiện dòng phụ", hiddenFromList: false },
} as const satisfies InteractivitySchema;

export const MGTheTacGia = Interactive.create({ Component: MGTheTacGiaInner, layout: "none", schema: tacGiaSchema });

type CtaProps = {
  readonly photo: string;
  readonly hoTen: string;
  readonly question1: string;
  readonly question2: string;
  readonly cta: string;
  readonly ctaAt: number;
  readonly beatFrames: number;
  readonly style?: React.CSSProperties;
};

// CTA: ảnh đại diện tròn + câu hỏi (pop) + "NHẮN TIN NGAY" nhịp đập theo phách nhạc,
// vòng sóng lan từ biểu tượng tin nhắn. Không logo, không chữ thương hiệu (H-chung-004).
const MGCtaInner: React.FC<CtaProps> = ({ photo, hoTen, question1, question2, cta, ctaAt, beatFrames, style }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const av = pop(frame, 0, 10);
  const q = pop(frame, 2, 9);
  const c = pop(frame, ctaAt, 9);
  const out = interpolate(frame, [durationInFrames - 5, durationInFrames], [1, 0.85], clamp);
  const since = Math.max(0, frame - ctaAt);
  const beatPhase = (since % beatFrames) / beatFrames;
  const beat = frame >= ctaAt ? 1 + 0.06 * Math.max(0, 1 - beatPhase * 3) : 1;

  const ring = (offset: number) => {
    const ph = ((since + offset) % (beatFrames * 2)) / (beatFrames * 2);
    return (
      <div
        style={{
          position: "absolute",
          left: 50 - 50 * (1 + ph * 1.4),
          top: 50 - 50 * (1 + ph * 1.4),
          width: 100 * (1 + ph * 1.4),
          height: 100 * (1 + ph * 1.4),
          borderRadius: "50%",
          border: `3px solid ${GOLD_TEXT}`,
          opacity: frame >= ctaAt ? 0.8 * (1 - ph) : 0,
        }}
      />
    );
  };

  return (
    <div style={{ position: "absolute", inset: 0, opacity: out, ...style }}>
      <div
        style={{
          position: "absolute",
          left: 500 - 110,
          top: 230,
          width: 220,
          height: 220,
          borderRadius: "50%",
          overflow: "hidden",
          border: `4px solid ${GOLD_TEXT}`,
          boxShadow: "0 16px 50px rgba(0,0,0,0.55)",
          scale: String(0.6 + 0.4 * av),
          opacity: Math.min(1, av * 1.5),
        }}
      >
        <Img src={staticFile(photo)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "50% 22%" }} />
      </div>
      <div style={{ ...centerBlock(470), fontWeight: 700, fontSize: SIZE.small, opacity: av }}>{hoTen}</div>
      <div style={{ ...centerBlock(600), fontWeight: 800, fontSize: 64, lineHeight: 1.2, opacity: Math.min(1, q * 1.4), scale: String(0.85 + 0.15 * q) }}>
        <div>{question1}</div>
        <div style={{ color: GOLD_TEXT }}>{question2}</div>
      </div>
      <div style={{ ...centerBlock(860), display: "flex", flexDirection: "column", alignItems: "center", gap: 18, opacity: Math.min(1, c * 1.4) }}>
        <div style={{ position: "relative", width: 100, height: 100, flexShrink: 0 }}>
          {ring(0)}
          {ring(beatFrames)}
          <svg width={100} height={100} viewBox="0 0 100 100" style={{ position: "absolute", inset: 0, scale: String(beat) }}>
            <path d="M18 24 h64 a10 10 0 0 1 10 10 v30 a10 10 0 0 1 -10 10 h-34 l-18 14 v-14 h-12 a10 10 0 0 1 -10 -10 v-30 a10 10 0 0 1 10 -10 z" fill="none" stroke={GOLD_TEXT} strokeWidth={6} strokeLinejoin="round" />
            <circle cx={34} cy={49} r={5} fill={GOLD_TEXT} />
            <circle cx={50} cy={49} r={5} fill={GOLD_TEXT} />
            <circle cx={66} cy={49} r={5} fill={GOLD_TEXT} />
          </svg>
        </div>
        <div style={{ fontWeight: 900, fontSize: 80, letterSpacing: 1, whiteSpace: "nowrap", scale: String((0.7 + 0.3 * c) * beat), ...goldGradientText }}>{cta}</div>
      </div>
    </div>
  );
};

const ctaSchema = {
  photo: { type: "string", default: "assets/hoang-dung-chan-dung.jpg", description: "Ảnh đại diện (public/)" },
  hoTen: { type: "string", default: "Hoàng Dũng · Khối Hoàng Anh", description: "Tên dưới ảnh" },
  question1: { type: "string", default: "Anh chị cần mua – bán", description: "Câu hỏi dòng 1" },
  question2: { type: "string", default: "nhà phố TP.HCM?", description: "Câu hỏi dòng 2 (vàng)" },
  cta: { type: "string", default: "NHẮN TIN NGAY", description: "Lời kêu gọi" },
  ctaAt: { type: "number", default: 31, step: 1, description: "Khung hiện CTA", hiddenFromList: false },
  beatFrames: { type: "number", default: 15.3, step: 0.1, description: "Độ dài 1 phách (khung) – nhạc 117,5 BPM", hiddenFromList: false },
} as const satisfies InteractivitySchema;

export const MGCta = Interactive.create({ Component: MGCtaInner, layout: "none", schema: ctaSchema });

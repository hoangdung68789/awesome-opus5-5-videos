import {
  AbsoluteFill,
  Easing,
  Interactive,
  type InteractivitySchema,
  interpolate,
  random,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { fontFamily, GOLD, GOLD_TEXT_GRADIENT, LOGO_PATHS, LOGO_VIEWBOX } from "./brand";

const ease = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

type BrandIdentProps = {
  readonly brandName: string;
  readonly subtitle: string;
  readonly flashIn: boolean;
};

// Ident thương hiệu: nét vàng tự vẽ logo + chữ HOÀNG DŨNG + vệt sáng quét.
// Dũng chấm 9/10 (17/10/2026) – giữ nguyên phong cách này. Dài tối thiểu 5 giây.
// Bật `flashIn` khi cảnh trước kết thúc bằng chớp sáng vàng.
const BrandIdentInner: React.FC<BrandIdentProps> = ({ brandName, subtitle, flashIn }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse 80% 55% at 50% 45%, #17130b 0%, #070604 60%, #000 100%)",
        fontFamily,
      }}
    >
      {/* Drifting gold dust */}
      {new Array(60).fill(0).map((_, i) => {
        const x = random(`lx${i}`) * 1080;
        const y0 = random(`ly${i}`) * 1920;
        const speed = 0.4 + random(`ls${i}`) * 1.2;
        const size = 2 + random(`lz${i}`) * 4;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: (((y0 - frame * speed) % 1920) + 1920) % 1920,
              width: size,
              height: size,
              borderRadius: "50%",
              background: GOLD.light,
              boxShadow: `0 0 ${size * 3}px ${GOLD.base}`,
              opacity: 0.25 + random(`lo${i}`) * 0.5,
            }}
          />
        );
      })}

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          scale: interpolate(frame, [0, 6 * fps], [1.08, 1], {
            ...clamp,
            easing: Easing.out(Easing.quad),
            output: "perceptual-scale",
          }),
        }}
      >
        <Interactive.Svg
          name="Logo mark"
          viewBox={LOGO_VIEWBOX}
          width={640}
          height={772}
          style={{
            overflow: "visible",
            marginTop: -330,
            filter: `drop-shadow(0 0 ${interpolate(frame, [0.5 * fps, 2 * fps, 3 * fps], [30, 18, 8], clamp)}px rgba(243,220,138,0.55))`,
          }}
        >
          <defs>
            <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#8a6a24" />
              <stop offset="40%" stopColor="#e8c868" />
              <stop offset="60%" stopColor="#f6e3a0" />
              <stop offset="100%" stopColor="#a8822f" />
            </linearGradient>
          </defs>
          {LOGO_PATHS.map((d, i) => (
            <path
              key={d}
              d={d}
              pathLength={1}
              fill="none"
              stroke="url(#gold)"
              strokeWidth={12}
              strokeLinejoin="miter"
              strokeLinecap="square"
              strokeDasharray="1 1"
              strokeDashoffset={interpolate(
                frame,
                [0.2 * fps + i * 0.18 * fps, 1.6 * fps + i * 0.18 * fps],
                [1, 0],
                { ...clamp, easing: Easing.inOut(Easing.cubic) },
              )}
            />
          ))}
        </Interactive.Svg>

        <Interactive.Div
          name="Brand name"
          style={{
            position: "absolute",
            top: 1215,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 118,
            fontWeight: 700,
            letterSpacing: `${interpolate(frame, [1.6 * fps, 3 * fps], [0.3, 0.02], { ...clamp, easing: ease })}em`,
            backgroundImage: GOLD_TEXT_GRADIENT,
            backgroundSize: "300% 100%",
            backgroundPosition: `${interpolate(frame, [3 * fps, 4.6 * fps], [100, 0], {
              ...clamp,
              easing: Easing.inOut(Easing.quad),
            })}% 0%`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            opacity: interpolate(frame, [1.6 * fps, 2.4 * fps], [0, 1], clamp),
            translate: interpolate(frame, [1.6 * fps, 2.6 * fps], ["0px 30px", "0px 0px"], {
              ...clamp,
              easing: ease,
            }),
          }}
        >
          {brandName}
        </Interactive.Div>

        <Interactive.Div
          name="Subtitle"
          style={{
            position: "absolute",
            top: 1385,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 28,
            color: GOLD.base,
            fontSize: 50,
            fontWeight: 300,
            opacity: interpolate(frame, [2.4 * fps, 3.2 * fps], [0, 1], clamp),
          }}
        >
          <div
            style={{
              height: 2,
              width: interpolate(frame, [2.6 * fps, 3.6 * fps], [0, 90], { ...clamp, easing: ease }),
              background: `linear-gradient(90deg, rgba(201,162,74,0), ${GOLD.base})`,
            }}
          />
          <span
            style={{
              letterSpacing: `${interpolate(frame, [2.4 * fps, 3.6 * fps], [0.7, 0.38], { ...clamp, easing: ease })}em`,
              marginRight: "-0.38em",
            }}
          >
            {subtitle}
          </span>
          <div
            style={{
              height: 2,
              width: interpolate(frame, [2.6 * fps, 3.6 * fps], [0, 90], { ...clamp, easing: ease }),
              background: `linear-gradient(90deg, ${GOLD.base}, rgba(201,162,74,0))`,
            }}
          />
        </Interactive.Div>
      </AbsoluteFill>

      {/* Light sweep across the whole lockup */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(105deg, rgba(255,240,200,0) 40%, rgba(255,240,200,0.22) 50%, rgba(255,240,200,0) 60%)",
          mixBlendMode: "screen",
          translate: interpolate(frame, [3.8 * fps, 5 * fps], ["-1100px 0px", "1100px 0px"], {
            ...clamp,
            easing: Easing.inOut(Easing.quad),
          }),
        }}
      />

      {/* Flash in from the city scene */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% 55%, #fff6dc 0%, ${GOLD.light} 30%, rgba(201,162,74,0) 75%)`,
          opacity: flashIn ? interpolate(frame, [0, 0.6 * fps], [1, 0], {
            ...clamp,
            easing: Easing.out(Easing.quad),
          }) : 0,
        }}
      />
    </AbsoluteFill>
  );
};

const schema = {
  brandName: { type: "string", default: "HOÀNG DŨNG", description: "Tên thương hiệu" },
  subtitle: { type: "string", default: "REAL ESTATE", description: "Dòng phụ" },
  flashIn: { type: "boolean", default: false, description: "Chớp sáng khi vào" },
} as const satisfies InteractivitySchema;

export const BrandIdent = Interactive.create({
  Component: BrandIdentInner,
  layout: "absolute-fill",
  schema,
});

import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp, fontFamily, GOLD } from "../brand";
import { lerp3, projectPoint, type Vec3 } from "../three/camera";
import { ClayWorld } from "../three/ClayWorld";

// Các cảnh nền 3D đất sét. Số khung là khung NỘI BỘ của từng cảnh
// (0 = đầu TransitionSeries.Sequence chứa cảnh đó).

const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

const t = (frame: number, a: number, b: number, easing = easeInOut) =>
  interpolate(frame, [a, b], [0, 1], { ...clamp, easing });

// C1 Hook – thành phố đất sét mọc lên, máy cẩu lên.
export const NenThanhPhoMoc: React.FC = () => {
  const frame = useCurrentFrame();
  const k = t(frame, 0, 128);
  return (
    <ClayWorld
      params={{
        mode: "city",
        cam: lerp3([15, 1.6, 25], [19, 5.2, 22], k),
        target: lerp3([0, 4.6, 0], [0, 4.4, 0], k),
        focal: 1.55,
        grow: interpolate(frame, [0, 84], [0.45, 1], { ...clamp, easing: easeOut }),
        night: 0,
      }}
    />
  );
};

// C2 – biểu đồ cột 3D tăng trưởng GDP. Nhãn bám đỉnh cột bằng phép chiếu.
const BAR_X = [-1.9, 0, 1.9] as const;
export const NenCotGDP: React.FC<{
  readonly values: readonly [number, number, number];
  readonly years: readonly [string, string, string];
  readonly riseAt: readonly [number, number, number];
}> = ({ values, years, riseAt }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const k = t(frame, 0, 128);
  const cam: Vec3 = lerp3([0.0, 5.2, 13.2], [1.3, 5.6, 12.2], k);
  const target: Vec3 = [0, 2.3, 0];
  const focal = 1.08;
  const grow = riseAt.map((s) => t(frame, s, s + 14, easeOut));
  const scale = 0.4;
  const bars: Vec3 = [values[0] * scale * grow[0], values[1] * scale * grow[1], values[2] * scale * grow[2]];

  return (
    <>
      <ClayWorld params={{ mode: "bars", cam, target, focal, grow: 1, night: 0, bars }} />
      {BAR_X.map((x, i) => {
        const top = projectPoint([x, 0.24 + bars[i] + 0.15, 0], cam, target, focal, width, height);
        const foot = projectPoint([x, 0.0, 0.9], cam, target, focal, width, height);
        const on = t(frame, riseAt[i] + 4, riseAt[i] + 12, easeOut);
        const shown = (values[i] * grow[i]).toFixed(2).replace(".", ",");
        return (
          <div key={years[i]}>
            <div
              style={{
                position: "absolute",
                left: top.x - 160,
                width: 320,
                top: top.y - 96,
                textAlign: "center",
                fontFamily,
                fontWeight: 800,
                fontSize: i === 2 ? 72 : 58,
                color: i === 2 ? GOLD.light : "#ffffff",
                opacity: on,
                translate: `0px ${(1 - on) * 24}px`,
                textShadow: "0 4px 22px rgba(0,0,0,0.55)",
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {shown}%
            </div>
            <div
              style={{
                position: "absolute",
                left: foot.x - 120,
                width: 240,
                top: foot.y + 18,
                textAlign: "center",
                fontFamily,
                fontWeight: 700,
                fontSize: 42,
                color: "#ffffff",
                opacity: 0.35 + 0.65 * on,
                textShadow: "0 3px 16px rgba(0,0,0,0.5)",
              }}
            >
              {years[i]}
            </div>
          </div>
        );
      })}
    </>
  );
};

// C3 – bay thấp dọc đường phố về phía toà tháp trung tâm, ghim vàng trên đỉnh.
export const NenBayPhoHCM: React.FC<{ readonly pinAt: number }> = ({ pinAt }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const k = t(frame, 0, 124);
  const cam: Vec3 = lerp3([1.2, 1.4, 25], [1.2, 2.4, 17.2], k);
  const target: Vec3 = lerp3([-0.2, 9.0, -2], [0, 9.6, 0], k);
  const focal = 1.2;
  const pin = projectPoint([0, 10.6, 0], cam, target, focal, width, height);
  const drop = interpolate(frame, [pinAt, pinAt + 10], [-140, 0], { ...clamp, easing: Easing.bounce });
  const on = t(frame, pinAt, pinAt + 4);
  return (
    <>
      <ClayWorld params={{ mode: "city", cam, target, focal, grow: 1, night: 0.12 }} />
      <svg
        width={90}
        height={120}
        viewBox="0 0 90 120"
        style={{ position: "absolute", left: pin.x - 45, top: pin.y - 118 + drop, opacity: on, overflow: "visible" }}
      >
        <ellipse cx={45} cy={116} rx={18 * on} ry={5 * on} fill="rgba(0,0,0,0.35)" />
        <path
          d="M45 112 C45 112 10 70 10 44 A35 35 0 1 1 80 44 C80 70 45 112 45 112 Z"
          fill={GOLD.base}
          stroke={GOLD.light}
          strokeWidth={4}
        />
        <circle cx={45} cy={44} r={13} fill="#1a1408" />
      </svg>
    </>
  );
};

// C4 – nhà phố đất sét xây dần từng tầng, máy xoay chậm (đoạn lặng của nhạc).
export const NenNhaPhoXay: React.FC = () => {
  const frame = useCurrentFrame();
  const k = t(frame, 0, 89);
  const a = 0.78 - 0.3 * k;
  const r = 13 - 1.2 * k;
  return (
    <ClayWorld
      params={{
        mode: "street",
        cam: [Math.sin(a) * r, 1.2 + 0.8 * k, Math.cos(a) * r],
        target: [0, 3.6, -1.0],
        focal: 1.25,
        grow: interpolate(frame, [4, 70], [0, 1], { ...clamp, easing: Easing.bezier(0.34, 1.3, 0.64, 1) }),
        night: 0.18,
      }}
    />
  );
};

// C5 – thành phố về đêm, máy bay vòng cao (drop nhạc, phần Thiên Khôi Group).
export const NenThanhPhoDem: React.FC = () => {
  const frame = useCurrentFrame();
  const k = t(frame, 0, 170, Easing.bezier(0.33, 0, 0.2, 1));
  const a = 0.85 + 0.75 * k;
  const r = 27 - 4 * k;
  return (
    <ClayWorld
      params={{
        mode: "city",
        cam: [Math.sin(a) * r, 6.2 - 1.6 * k, Math.cos(a) * r],
        target: [0, 7.0, 0],
        focal: 1.55,
        grow: 1,
        night: interpolate(frame, [0, 10], [0.55, 1], clamp),
      }}
    />
  );
};

// C7 – nhà phố giờ xanh (blue hour) phía sau thẻ tác giả + CTA.
export const NenNhaPhoTacGia: React.FC = () => {
  const frame = useCurrentFrame();
  const k = t(frame, 0, 169);
  return (
    <>
      <ClayWorld
        params={{
          mode: "street",
          cam: lerp3([-5.6, 1.3, 9.4], [-4.2, 1.8, 8.8], k),
          target: [0, 3.8, -1.0],
          focal: 1.25,
          grow: 1,
          night: 0.42,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(6,8,18,0.6) 0%, rgba(6,8,18,0.25) 30%, rgba(6,8,18,0.55) 50%, rgba(6,8,18,0.82) 70%, rgba(6,8,18,0.7) 100%)",
        }}
      />
    </>
  );
};

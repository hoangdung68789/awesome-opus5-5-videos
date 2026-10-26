import type React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { clamp, fontFamily } from "../brand";
import { ease, formatVi, GOLD_TEXT, goldGradientText, pop, SHADOW, SIZE, TK_RED } from "../mg/tk/style";

type Props = {
  readonly tieuDeNho: string;
  readonly tieuDe: string;
  readonly moc1: string;
  readonly moTa1: string;
  readonly moc2: string;
  readonly moTa2: string;
  readonly moc3: string;
  readonly moTa3: string;
  readonly phu3a: string;
  readonly phu3b: string;
  readonly nhanTruc: readonly [string, string, string];
  readonly anh2: string;
  readonly anh2b: string;
  readonly anh3: string;
  // Số liệu thật từng mốc (vd số thành viên). Để 0 → không hiện số, cột cao theo tỷ lệ định tính.
  readonly soLieu: readonly [number, number, number];
  readonly donVi: string;
  readonly at1: number;
  readonly at2: number;
  readonly at3: number;
};

// C6 – Biểu đồ phát triển Khối Hoàng Anh (2D motion graphics, không 3D).
// Cột trồi theo từng mốc, đường tăng trưởng vàng vẽ dần nối đỉnh cột, chấm mốc nẩy + sóng,
// biểu tượng nét (Phòng → 2 căn → cụm tháp "Khối"), ảnh sự kiện thật ở mốc 2 và 3.
// Mốc 1: ping · Mốc 2: chớp sáng + shutter (T8) · Mốc 3: đập nhịp + kick (T6).

const BASE_Y = 1420;
const XS = [235, 505, 775] as const;
const BAR_W = 128;
const QUALITATIVE_H = [150, 270, 400] as const;
const OVERSHOOT = Easing.bezier(0.34, 1.45, 0.64, 1);

const iconHouse = (
  <g>
    <path d="M30 96 V40 L55 22 L80 40 V96 Z" />
    <path d="M44 96 V74 H66 V96" />
    <path d="M42 50 H68 M42 62 H68" />
  </g>
);
const iconTwoHouses = (
  <g>
    <path d="M10 96 V44 L32 28 L54 44 V96 Z" />
    <path d="M54 96 V30 L78 12 L102 30 V96" />
    <path d="M24 96 V78 H40 V96 M70 96 V76 H88 V96" />
    <path d="M66 46 H92 M66 58 H92" />
  </g>
);
const iconKhoi = (
  <g>
    <path d="M8 98 V56 H34 V98 M78 98 V64 H104 V98" />
    <path d="M38 98 V26 H74 V98 Z" />
    <path d="M44 40 H68 M44 52 H68 M44 64 H68 M44 76 H68" />
    <path d="M42 18 L48 6 L56 14 L64 6 L70 18 Z" />
  </g>
);

export const CanhPhatTrienKhoi: React.FC<Props> = (p) => {
  const frame = useCurrentFrame();
  const at = [p.at1, p.at2, p.at3] as const;
  const coSo = p.soLieu.every((v) => v > 0);
  const maxV = Math.max(...p.soLieu, 1);
  const H = [0, 1, 2].map((i) => (coSo ? 110 + 290 * (p.soLieu[i] / maxV) : QUALITATIVE_H[i]));

  const rise = [0, 1, 2].map((i) => interpolate(frame, [at[i] - 6, at[i] + 8], [0, 1], { ...clamp, easing: OVERSHOOT }));
  const top = [0, 1, 2].map((i) => ({ x: XS[i], y: BASE_Y - H[i] - 34 }));
  const start = { x: 120, y: BASE_Y - 70 };
  const end = { x: 905, y: top[2].y - 150 };

  // đường tăng trưởng: 4 đoạn, mỗi đoạn đến đỉnh cột đúng khung mốc
  const seg = (a: { x: number; y: number }, b: { x: number; y: number }, last: boolean) =>
    last
      ? `M${a.x} ${a.y} C${a.x + 50} ${a.y} ${b.x - 40} ${b.y + 40} ${b.x} ${b.y}`
      : `M${a.x} ${a.y} C${(a.x + b.x) / 2} ${a.y} ${(a.x + b.x) / 2} ${b.y} ${b.x} ${b.y}`;
  const segs = [
    { d: seg(start, top[0], false), k: ease(frame, at[0] - 10, at[0]), a: start, b: top[0] },
    { d: seg(top[0], top[1], false), k: ease(frame, at[1] - 10, at[1]), a: top[0], b: top[1] },
    { d: seg(top[1], top[2], false), k: ease(frame, at[2] - 10, at[2]), a: top[1], b: top[2] },
    { d: seg(top[2], end, true), k: ease(frame, at[2] + 2, at[2] + 14), a: top[2], b: end },
  ];
  const tipX = segs.reduce((x, s) => (s.k > 0 ? s.a.x + (s.b.x - s.a.x) * s.k : x), start.x);
  const areaD = `${segs.map((s, i) => (i === 0 ? s.d : s.d.replace(/^M[^C]+/, ""))).join(" ")} L${end.x} ${BASE_Y} L${start.x} ${BASE_Y} Z`;
  const arrowK = ease(frame, at[2] + 12, at[2] + 18);

  // khối chữ theo mốc: chỉ 1 cụm hiện tại một thời điểm
  const vis = (i: number) => {
    const inn = ease(frame, at[i], at[i] + 8);
    const next = i < 2 ? at[i + 1] : 99999;
    const out = interpolate(frame, [next - 6, next], [1, 0], clamp);
    return inn * out;
  };
  const v1 = vis(0);
  const v2 = vis(1);
  const v3 = vis(2);
  const slam = interpolate(frame, [at[2], at[2] + 5, at[2] + 9], [1.6, 0.96, 1], clamp);
  const shake = Math.sin(frame * 2.3) * interpolate(frame, [at[2] + 3, at[2] + 14], [8, 0], clamp);

  // ảnh: mốc 2 bật + lóe sáng; mốc 3 ảnh cũ trượt ra trái, ảnh Giám đốc Khối rơi vào
  const ph2 = pop(frame, at[1], 10);
  const ph2out = ease(frame, at[2] - 4, at[2] + 6);
  const ph3 = interpolate(frame, [at[2] + 2, at[2] + 8, at[2] + 12], [0, 1.06, 1], clamp);
  const flash = interpolate(frame, [at[1] - 1, at[1] + 1, at[1] + 9], [0, 0.85, 0], clamp);
  const burst = ease(frame, at[2], at[2] + 20);

  const particles = Array.from({ length: 24 }, (_, i) => {
    const sx = (i * 397) % 1080;
    const sy = (i * 733) % 1920;
    const sp = 0.4 + ((i * 37) % 10) / 10;
    const yy = (sy - frame * sp * 2 + 1920) % 1920;
    const r = 2 + (i % 4);
    return <div key={i} style={{ position: "absolute", left: sx, top: yy, width: r * 2, height: r * 2, borderRadius: r, background: GOLD_TEXT, opacity: 0.1 + (i % 5) * 0.04 }} />;
  });

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", fontFamily, color: "#fff", textShadow: SHADOW, background: "radial-gradient(120% 75% at 50% 35%, #1b2246 0%, #0b0f22 55%, #05060d 100%)" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(243,220,138,0.16) 2px, transparent 2px)",
          backgroundSize: "54px 54px",
          backgroundPosition: `0px ${frame * 0.6}px`,
          opacity: 0.6,
        }}
      />
      {particles}

      {/* tiêu đề – vào cùng chuyển cảnh iris */}
      <div style={{ position: "absolute", left: 60, width: 960, top: 140, textAlign: "center" }}>
        <div style={{ fontWeight: 700, fontSize: SIZE.small - 2, letterSpacing: 7, color: GOLD_TEXT }}>{p.tieuDeNho}</div>
        <div style={{ fontWeight: 900, fontSize: SIZE.main, marginTop: 4 }}>{p.tieuDe}</div>
      </div>

      {/* khối chữ theo mốc */}
      <div style={{ position: "absolute", left: 60, width: 960, top: 300, textAlign: "center" }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, opacity: v1, translate: `0px ${(1 - v1) * 24}px` }}>
          <div style={{ fontWeight: 800, fontSize: 46, color: GOLD_TEXT }}>{p.moc1}</div>
          <div style={{ fontWeight: 800, fontSize: 52 }}>{p.moTa1}</div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, opacity: v2, translate: `0px ${(1 - v2) * 24}px` }}>
          <div style={{ fontWeight: 800, fontSize: 46, color: GOLD_TEXT }}>{p.moc2}</div>
          <div style={{ fontWeight: 800, fontSize: 52 }}>{p.moTa2}</div>
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, top: 0, opacity: Math.min(1, v3 * 2), translate: `${shake}px 0px` }}>
          <div style={{ fontWeight: 800, fontSize: 46, color: GOLD_TEXT }}>{p.moc3}</div>
          <div style={{ fontWeight: 900, fontSize: 64, lineHeight: 1.05, scale: String(slam), ...goldGradientText }}>{p.moTa3}</div>
          <div style={{ margin: "12px auto 0", height: 7, width: 300 * ease(frame, at[2] + 5, at[2] + 14), background: TK_RED, borderRadius: 4 }} />
          <div style={{ marginTop: 10, fontWeight: 600, fontSize: SIZE.small, opacity: ease(frame, at[2] + 8, at[2] + 16) }}>{p.phu3a}</div>
          <div style={{ fontWeight: 600, fontSize: SIZE.small, opacity: ease(frame, at[2] + 10, at[2] + 18) }}>{p.phu3b}</div>
        </div>
      </div>

      {/* mốc 2024: nhà phố nét vàng tự vẽ dần ("Phòng ra đời") */}
      <svg
        width={300}
        height={279}
        viewBox="0 0 112 104"
        style={{ position: "absolute", left: 390, top: 462, overflow: "visible", opacity: interpolate(frame, [at[0], at[0] + 4, at[1] - 6, at[1]], [0, 1, 1, 0], clamp), filter: "drop-shadow(0 0 14px rgba(243,220,138,0.45))" }}
        fill="none"
        stroke="#ffe08a"
        strokeWidth={2.6}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        {[
          "M30 96 V40 L55 22 L80 40 V96 Z",
          "M44 96 V74 H66 V96",
          "M42 50 H68",
          "M42 62 H68",
          "M14 96 H96",
        ].map((d, k) => (
          <path key={d} d={d} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - ease(frame, at[0] + k * 3, at[0] + 14 + k * 3)} />
        ))}
      </svg>

      {/* ảnh sự kiện thật */}
      <div style={{ position: "absolute", left: 300, top: 470, width: 400, height: 267, rotate: `${-9 + ph2out * -20}deg`, translate: `${-60 - ph2out * 600}px 10px`, scale: String(0.6 + 0.4 * ph2), opacity: Math.min(1, ph2 * 1.6) * (1 - ph2out) * 0.9, border: "7px solid #fbf6ea", borderRadius: 14, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.6)" }}>
        <Img src={staticFile(p.anh2b)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
      <div style={{ position: "absolute", left: 330, top: 455, width: 440, height: 293, rotate: `${-2 + ph2out * -16}deg`, translate: `${ph2out * -620}px 0px`, scale: String(0.6 + 0.4 * ph2), opacity: Math.min(1, ph2 * 1.6) * (1 - ph2out), border: "8px solid #fbf6ea", borderRadius: 16, overflow: "hidden", boxShadow: "0 28px 70px rgba(0,0,0,0.65)" }}>
        <Img src={staticFile(p.anh2)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "#fff8e6", opacity: flash }} />
      </div>
      <div style={{ position: "absolute", left: 320, top: 568, width: 440, height: 248, rotate: "2deg", scale: String(0.4 + 0.6 * Math.min(ph3, 1.06)), opacity: Math.min(1, ph3 * 1.8), border: "8px solid #fbf6ea", borderRadius: 16, overflow: "hidden", boxShadow: "0 28px 70px rgba(0,0,0,0.65)" }}>
        <Img src={staticFile(p.anh3)} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      {/* biểu đồ */}
      <svg width={1080} height={1920} viewBox="0 0 1080 1920" style={{ position: "absolute", inset: 0, overflow: "visible", textShadow: "none" }}>
        <defs>
          <linearGradient id="cot" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f3dc8a" stopOpacity={0.55} />
            <stop offset="1" stopColor="#c9a24a" stopOpacity={0.08} />
          </linearGradient>
          <linearGradient id="cotVang" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffe08a" stopOpacity={0.95} />
            <stop offset="1" stopColor="#c9a24a" stopOpacity={0.25} />
          </linearGradient>
          <linearGradient id="vung" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f3dc8a" stopOpacity={0.32} />
            <stop offset="1" stopColor="#f3dc8a" stopOpacity={0} />
          </linearGradient>
          <clipPath id="loVung">
            <rect x={0} y={0} width={tipX} height={1920} />
          </clipPath>
          <filter id="sang" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* trục */}
        <line x1={110} y1={BASE_Y} x2={915} y2={BASE_Y} stroke="rgba(255,255,255,0.35)" strokeWidth={3} strokeDasharray={`${805 * ease(frame, 0, 14)} 2000`} />
        <line x1={110} y1={BASE_Y} x2={110} y2={880} stroke="rgba(255,255,255,0.22)" strokeWidth={3} strokeDasharray={`${540 * ease(frame, 4, 18)} 2000`} />
        <text x={124} y={900} fill={GOLD_TEXT} fontSize={28} fontWeight={700} letterSpacing={3} opacity={ease(frame, 10, 20)} style={{ fontFamily }}>
          QUY MÔ ↑
        </text>

        {/* cột */}
        {[0, 1, 2].map((i) => (
          <rect
            key={`cot-${i}`}
            x={XS[i] - BAR_W / 2}
            y={BASE_Y - H[i] * rise[i]}
            width={BAR_W}
            height={Math.max(0, H[i] * rise[i])}
            rx={14}
            fill={i === 2 ? "url(#cotVang)" : "url(#cot)"}
            stroke={GOLD_TEXT}
            strokeOpacity={i === 2 ? 1 : 0.7}
            strokeWidth={3}
          />
        ))}

        {/* vùng dưới đường + đường tăng trưởng */}
        <path d={areaD} fill="url(#vung)" clipPath="url(#loVung)" />
        {segs.map((s, i) => (
          <path key={`duong-${i}`} d={s.d} fill="none" stroke="#ffe08a" strokeWidth={9} strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - s.k} filter="url(#sang)" />
        ))}
        {/* đầu mũi tên theo hướng tiếp tuyến cuối đường (lên phải 45°) */}
        <polygon
          points={`${end.x + 10},${end.y - 10} ${end.x - 34},${end.y - 8} ${end.x + 8},${end.y + 34}`}
          fill="#ffe08a"
          opacity={arrowK}
          filter="url(#sang)"
        />

        {/* chấm mốc + sóng + biểu tượng */}
        {[0, 1, 2].map((i) => {
          const d = interpolate(frame, [at[i], at[i] + 4, at[i] + 9], [0, 1.5, 1], clamp);
          const ring = ease(frame, at[i], at[i] + 16);
          const ic = pop(frame, at[i] + 2, 9);
          const icon = i === 0 ? iconHouse : i === 1 ? iconTwoHouses : iconKhoi;
          return (
            <g key={`moc-${i}`}>
              <circle cx={top[i].x} cy={top[i].y} r={14 + 52 * ring} fill="none" stroke={GOLD_TEXT} strokeWidth={3} opacity={frame >= at[i] ? 0.8 * (1 - ring) : 0} />
              <circle cx={top[i].x} cy={top[i].y} r={14 * d} fill={GOLD_TEXT} stroke="#fff6d8" strokeWidth={4} />
              <g transform={`translate(${top[i].x} ${top[i].y - 95}) scale(${ic}) translate(-56 -55)`} opacity={Math.min(1, ic * 1.5)} fill="none" stroke={i === 2 ? "#ffe08a" : GOLD_TEXT} strokeWidth={5} strokeLinejoin="round" strokeLinecap="round">
                {icon}
              </g>
            </g>
          );
        })}

        {/* tia sáng mốc Khối */}
        <g opacity={burst > 0 && burst < 1 ? 1 - burst : 0} stroke="#ffe08a" strokeWidth={5} strokeLinecap="round">
          {Array.from({ length: 12 }, (_, k) => {
            const a = (k / 12) * Math.PI * 2;
            const r1 = 70 + 60 * burst;
            const r2 = 100 + 110 * burst;
            const cx = top[2].x;
            const cy = top[2].y - 95;
            return <line key={k} x1={cx + Math.cos(a) * r1} y1={cy + Math.sin(a) * r1} x2={cx + Math.cos(a) * r2} y2={cy + Math.sin(a) * r2} />;
          })}
        </g>
      </svg>

      {/* nhãn trục ngang + số liệu (nếu có) */}
      {[0, 1, 2].map((i) => {
        const on = ease(frame, at[i] - 4, at[i] + 6);
        const active = frame >= at[i] && (i === 2 || frame < at[i + 1]);
        return (
          <div key={`nhan-${i}`}>
            <div style={{ position: "absolute", left: XS[i] - 130, width: 260, top: BASE_Y + 18, textAlign: "center", fontWeight: 700, fontSize: i === 1 ? 32 : SIZE.small, color: active ? GOLD_TEXT : "rgba(255,255,255,0.75)", opacity: 0.35 + 0.65 * on }}>
              {p.nhanTruc[i]}
            </div>
            {coSo ? (
              <div style={{ position: "absolute", left: XS[i] - 150, width: 300, top: top[i].y - 230, textAlign: "center", fontWeight: 800, fontSize: 44, opacity: on, ...goldGradientText }}>
                {formatVi(p.soLieu[i] * ease(frame, at[i], at[i] + 14), 0)} {p.donVi}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

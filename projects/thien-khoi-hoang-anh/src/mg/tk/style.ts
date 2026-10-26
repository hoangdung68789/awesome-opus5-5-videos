import type React from "react";
import { Easing, interpolate } from "remotion";
import { clamp, fontFamily, SAFE_9x16 } from "../../brand";

// Chuẩn chữ dự án Thiên Khôi × Khối Hoàng Anh (H-hieu_ung_3d-002):
// chữ chính ~6,7% chiều rộng (72px), số nhấn tối đa ~10% (108px), chữ phụ 3,5–4% (38–44px).
// Không thẻ/khối nền sau chữ; nền tối → chữ trắng + nhấn vàng, bóng mềm.
export const SIZE = { main: 72, number: 108, sub: 42, small: 38, note: 26 } as const;

export const SHADOW = "0 4px 24px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.45)";
export const GOLD_TEXT = "#f3dc8a";
export const TK_RED = "#e5262f";

// Khối chữ căn giữa trong vùng an toàn 9:16 (trái 80, phải 160).
export const centerBlock = (top: number): React.CSSProperties => ({
  position: "absolute",
  left: SAFE_9x16.left,
  width: 1080 - SAFE_9x16.left - SAFE_9x16.right,
  top,
  textAlign: "center",
  fontFamily,
  color: "#ffffff",
  textShadow: SHADOW,
});

// Chữ vàng đặc + bóng tối mềm (gradient kẹp chữ bị đục trên nền 3D nên không dùng).
export const goldGradientText: React.CSSProperties = {
  color: "#ffe08a",
  textShadow: "0 4px 22px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.5), 0 0 26px rgba(255,200,90,0.28)",
};

const POP = Easing.bezier(0.34, 1.56, 0.64, 1);

// Bật vào: 0→1 trong `len` khung, có vọt nhẹ.
export const pop = (frame: number, at: number, len = 8) =>
  interpolate(frame, [at, at + len], [0, 1], { ...clamp, easing: POP });

export const ease = (frame: number, a: number, b: number) =>
  interpolate(frame, [a, b], [0, 1], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) });

// Định dạng số kiểu Việt Nam: 8,02 · 40.000
export const formatVi = (value: number, decimals: number) => {
  const fixed = value.toFixed(decimals);
  const [int, dec] = fixed.split(".");
  const intDots = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return dec ? `${intDots},${dec}` : intDots;
};

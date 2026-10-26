// Phép chiếu giống hệt camera trong clayShader.ts, để đặt nhãn/ghim (DOM)
// đúng vị trí vật thể 3D. Toạ độ trả về theo khung 1080x1920 (gốc trên-trái).

export type Vec3 = readonly [number, number, number];

const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: Vec3, b: Vec3): Vec3 => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const norm = (a: Vec3): Vec3 => {
  const l = Math.hypot(a[0], a[1], a[2]);
  return [a[0] / l, a[1] / l, a[2] / l];
};

export const projectPoint = (
  point: Vec3,
  cam: Vec3,
  target: Vec3,
  focal: number,
  width: number,
  height: number,
) => {
  const cw = norm(sub(target, cam));
  const cu = norm(cross(cw, [0, 1, 0]));
  const cv = cross(cu, cw);
  const d = sub(point, cam);
  const z = dot(d, cw);
  const x = (dot(d, cu) * focal) / z;
  const y = (dot(d, cv) * focal) / z;
  return { x: width / 2 + x * height, y: height / 2 - y * height, visible: z > 0 };
};

export const lerp3 = (a: Vec3, b: Vec3, t: number): Vec3 => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];

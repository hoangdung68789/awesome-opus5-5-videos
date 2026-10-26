// Shader 3D đất sét (clay) raymarching SDF – chuẩn MG22 đã duyệt 16/10/2026.
// Ba cảnh trong một shader, chọn bằng uMode:
//   0 = thành phố đất sét mọc lên (uGrow 0→1), 1 = cột số liệu 3D (uBars),
//   2 = dãy nhà phố TP.HCM, căn giữa xây dần từng tầng (uGrow 0→1).
// Cửa kính là hình khối lõm thật (không vẽ texture cửa sổ).
// Mọi chuyển động lấy từ uniform do useCurrentFrame() tính – shader không tự chạy.

export const CLAY_VERT = /* glsl */ `
in vec3 position;
void main() {
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

export const CLAY_FRAG = /* glsl */ `
precision highp float;
precision highp int;

uniform vec2 uRes;
uniform int uMode;
uniform vec3 uCamPos;
uniform vec3 uCamTarget;
uniform float uFocal;
uniform float uGrow;
uniform vec3 uBars;
uniform float uNight;

out vec4 fragColor;

// 1 = dùng giới hạn bước theo biên ô khi raymarch; 0 khi tính pháp tuyến/AO/bóng
// (nếu không sẽ ra vệt kẻ trên mặt đất).
float gBound = 1.0;

#define CELL 2.4
#define RAD 6.0

const float M_GROUND = 1.0;
const float M_BLD = 2.0;
const float M_TOWER = 3.0;
const float M_GOLD = 4.0;
const float M_FACADE = 5.0;
const float M_WHITE = 6.0;
const float M_GLASS = 7.0;
const float M_PLANT = 8.0;
const float M_WOOD = 9.0;
const float M_NEIGH = 10.0;
const float M_BAR = 11.0;
const float M_BASE = 12.0;

float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float sdRoundBox(vec3 p, vec3 b, float r) {
  vec3 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
}

float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float sdCyl(vec3 p, float h, float r) {
  vec2 d = abs(vec2(length(p.xz), p.y)) - vec2(r, h);
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0));
}

vec2 opU(vec2 a, vec2 b) { return a.x < b.x ? a : b; }

// Khối nhà đất sét có dải kính lõm theo tầng.
vec2 clayBlock(vec3 p, vec3 c, vec3 hs, float r, float fh, float mat) {
  vec3 q = p - c;
  float dOuter = sdRoundBox(q, hs, r);
  float yy = mod(p.y - (c.y - hs.y) + fh * 0.35, fh);
  float rib = max(abs(yy - 0.5 * fh) - 0.22 * fh, -(dOuter + 0.06));
  rib = max(rib, q.y - hs.y + 0.22);
  rib = max(rib, -(q.y + hs.y - 0.3));
  float d = max(dOuter, -rib);
  return vec2(d, (-rib > dOuter) ? M_GLASS : mat);
}

// ---------- 0. Thành phố ----------
float bldHeight(vec2 id) {
  float h = hash12(id * 1.37 + 4.1);
  float d = length(id);
  float base = mix(0.7, 3.6, h * h) * (1.0 + 1.3 * exp(-d * d / 9.0));
  float g = clamp(uGrow * 2.4 - d / 6.5 - h * 0.35, 0.0, 1.0);
  g = g * g * (3.0 - 2.0 * g);
  return max(base * g, 0.03);
}

vec2 tower(vec3 p) {
  float g = clamp(uGrow * 1.7 - 0.25, 0.0, 1.0);
  g = g * g * (3.0 - 2.0 * g);
  float H = 9.5 * g + 0.03;
  float h1 = min(H, 4.0);
  vec2 res = clayBlock(p, vec3(0.0, h1 * 0.5, 0.0), vec3(0.95, h1 * 0.5, 0.95), 0.2, 0.38, M_TOWER);
  if (H > 4.0) {
    float h2 = clamp(H - 4.0, 0.0, 3.2);
    res = opU(res, clayBlock(p, vec3(0.0, 4.0 + h2 * 0.5, 0.0), vec3(0.76, h2 * 0.5, 0.76), 0.18, 0.38, M_TOWER));
    float ring = sdRoundBox(p - vec3(0.0, 4.0, 0.0), vec3(1.0, 0.06, 1.0), 0.05);
    res = opU(res, vec2(ring, M_GOLD));
  }
  if (H > 7.2) {
    float h3 = clamp(H - 7.2, 0.0, 1.8);
    res = opU(res, clayBlock(p, vec3(0.0, 7.2 + h3 * 0.5, 0.0), vec3(0.55, h3 * 0.5, 0.55), 0.16, 0.38, M_TOWER));
    float ring2 = sdRoundBox(p - vec3(0.0, 7.2, 0.0), vec3(0.8, 0.06, 0.8), 0.05);
    res = opU(res, vec2(ring2, M_GOLD));
  }
  if (H > 9.0) {
    float crown = sdRoundBox(p - vec3(0.0, 9.08, 0.0), vec3(0.6, 0.08, 0.6), 0.05);
    float sp = sdCyl(p - vec3(0.0, 9.6, 0.0), 0.6, 0.06);
    res = opU(res, vec2(min(crown, sp), M_GOLD));
  }
  return res;
}

vec2 mapCity(vec3 p) {
  vec2 res = vec2(p.y, M_GROUND);
  vec2 g = p.xz / CELL;
  vec2 id = clamp(floor(g + 0.5), vec2(-RAD), vec2(RAD));
  vec2 lp = p.xz - id * CELL;
  if (dot(id, id) > 0.5) {
    float h = bldHeight(id);
    float r1 = hash12(id + 9.7);
    float r2 = hash12(id + 3.3);
    vec2 hs = vec2(0.6 + 0.26 * r1, 0.6 + 0.26 * r2);
    float mat = M_BLD + fract(r1 * 7.0) * 0.5;
    vec3 c = vec3(id.x * CELL, h * 0.5, id.y * CELL);
    vec2 b = clayBlock(p, c, vec3(hs.x, h * 0.5, hs.y), 0.14, 0.5, mat);
    if (h > 2.4) {
      float h2 = h * 0.26;
      b = opU(b, clayBlock(p, vec3(c.x, h + h2 * 0.5, c.z), vec3(hs.x * 0.68, h2 * 0.5, hs.y * 0.68), 0.12, 0.5, mat));
    } else if (r2 > 0.45 && h > 0.5) {
      float tank = sdCyl(vec3(lp.x - hs.x * 0.4, p.y - h - 0.16, lp.y + hs.y * 0.3), 0.14, 0.16);
      b = opU(b, vec2(tank, M_WHITE));
    }
    res = opU(res, b);
    // cây xanh ven đường, mọc cùng nhịp với nhà
    float tg = clamp(uGrow * 2.4 - length(id) / 6.5, 0.0, 1.0);
    if (tg > 0.0) {
      vec3 tp = vec3(lp.x - 1.0, p.y - 0.34 * tg, lp.y - 0.55 * (r2 - 0.5));
      res = opU(res, vec2(length(tp) - 0.17 * tg, M_PLANT));
    }
  }
  // giới hạn bước theo biên ô để không bỏ sót nhà bên cạnh
  if (gBound > 0.5 && abs(g.x) < RAD + 0.5 && abs(g.y) < RAD + 0.5) {
    float edge = min(CELL * 0.5 - abs(lp.x), CELL * 0.5 - abs(lp.y));
    res.x = min(res.x, max(edge, 0.0) + 0.06);
  }
  res = opU(res, tower(p));
  return res;
}

// ---------- 1. Cột số liệu ----------
vec2 mapBars(vec3 p) {
  vec2 res = vec2(p.y + 0.02, M_GROUND);
  float base = sdRoundBox(p - vec3(0.0, 0.12, 0.0), vec3(3.1, 0.12, 1.15), 0.1);
  res = opU(res, vec2(base, M_BASE));
  for (int i = 0; i < 3; i++) {
    float x = -1.9 + float(i) * 1.9;
    float h = max(uBars[i], 0.02);
    float d = sdRoundBox(p - vec3(x, 0.24 + h * 0.5, 0.0), vec3(0.58, h * 0.5, 0.58), 0.2);
    res = opU(res, vec2(d, i == 2 ? M_GOLD : M_BAR + float(i) * 0.25));
  }
  return res;
}

// ---------- 2. Nhà phố ----------
// Một căn nhà phố: rộng 2*hw, mặt tiền ở z = 0, sâu 3.2; mỗi tầng cao 0.9.
vec2 townhouse(vec3 p, float hw, float floors, float build, float matBody, bool hero) {
  float FH = 0.9;
  float H = floors * FH;
  // "mọc lên" từ mặt đất: tịnh tiến cả căn (không cắt ngang để tránh lỗi hình)
  p.y += (1.0 - build) * (H + 0.9);
  vec3 q = p - vec3(0.0, H * 0.5, -1.6);
  float body = sdRoundBox(q, vec3(hw, H * 0.5, 1.6), 0.05);
  float fy = clamp(floor(p.y / FH), 0.0, floors - 1.0);
  vec3 wq = p - vec3(0.0, fy * FH + (fy < 0.5 ? 0.4 : 0.48), 0.0);
  float hole = sdBox(wq, vec3(hw - 0.2, fy < 0.5 ? 0.36 : 0.3, 0.12));
  body = max(body, -hole);
  vec2 res = vec2(body, matBody);
  float glass = sdBox(wq - vec3(0.0, 0.0, -0.1), vec3(hw - 0.2, fy < 0.5 ? 0.36 : 0.3, 0.02));
  res = opU(res, vec2(glass, fy < 0.5 ? M_WOOD : M_GLASS));
  // sàn ban công nằm vắt qua ranh tầng: lấy ranh tầng gần nhất để SDF liên tục
  float fb = clamp(floor(p.y / FH + 0.5), 1.0, floors - 1.0);
  float slab = sdRoundBox(p - vec3(0.0, fb * FH + 0.02, 0.2), vec3(hw + 0.02, 0.05, 0.22), 0.03);
  res = opU(res, vec2(slab, M_WHITE));
  if (fy > 0.5) {
    float rail = sdRoundBox(p - vec3(0.0, fy * FH + 0.22, 0.4), vec3(hw, 0.15, 0.025), 0.02);
    res = opU(res, vec2(rail, M_WHITE));
    if (hero) {
      float pl = length(p - vec3(hw - 0.18, fy * FH + 0.26, 0.26)) - 0.14;
      pl = min(pl, length(p - vec3(-hw + 0.2, fy * FH + 0.22, 0.27)) - 0.11);
      res = opU(res, vec2(pl, M_PLANT));
    }
  }
  float tum = sdRoundBox(p - vec3(0.0, H + 0.35, -2.0), vec3(hw * 0.7, 0.35, 0.7), 0.06);
  float para = sdRoundBox(p - vec3(0.0, H + 0.12, -0.05), vec3(hw, 0.12, 0.05), 0.03);
  res = opU(res, vec2(tum, matBody));
  res = opU(res, vec2(para, M_WHITE));
  if (hero) {
    float fin = sdRoundBox(p - vec3(hw - 0.08, H * 0.5 + 0.45, 0.08), vec3(0.06, H * 0.5 - 0.45, 0.06), 0.03);
    res = opU(res, vec2(fin, M_GOLD));
  }
  return res;
}

vec2 mapStreet(vec3 p) {
  vec2 res = vec2(p.y, M_GROUND);
  float walk = sdRoundBox(p - vec3(0.0, 0.04, 0.9), vec3(40.0, 0.04, 0.7), 0.03);
  res = opU(res, vec2(walk, M_BASE));
  res = opU(res, townhouse(p, 0.78, 5.0, uGrow, M_FACADE, true));
  float W = 1.62;
  float ix = clamp(floor(p.x / W + 0.5), -4.0, 4.0);
  if (abs(ix) > 0.5) {
    float r = hash12(vec2(ix, 2.0));
    float fl = 3.0 + floor(r * 2.0);
    vec3 q = p - vec3(ix * W, 0.0, -0.05 * r);
    q.z += 0.22 * (hash12(vec2(ix, 7.0)) - 0.5);
    res = opU(res, townhouse(q, 0.72 + 0.06 * hash12(vec2(ix, 5.0)), fl, 1.0, M_NEIGH + r * 0.5, false));
  }
  // giới hạn bước theo biên từng căn (kể cả căn chính) để không lọt vào nhà bên
  float lx = p.x - ix * W;
  if (gBound > 0.5 && abs(p.x) < 4.5 * W) res.x = min(res.x, max(W * 0.5 - abs(lx), 0.0) + 0.05);
  return res;
}

vec2 map(vec3 p) {
  if (uMode == 0) return mapCity(p);
  if (uMode == 1) return mapBars(p);
  return mapStreet(p);
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(0.003, 0.0);
  return normalize(vec3(
    map(p + e.xyy).x - map(p - e.xyy).x,
    map(p + e.yxy).x - map(p - e.yxy).x,
    map(p + e.yyx).x - map(p - e.yyx).x));
}

float softShadow(vec3 ro, vec3 rd) {
  float res = 1.0;
  float t = 0.05;
  for (int i = 0; i < 18; i++) {
    vec3 sp = ro + rd * t;
    if (sp.y > 10.6) break;
    float h = map(sp).x;
    res = min(res, 9.0 * h / t);
    t += clamp(h, 0.06, 0.9);
    if (res < 0.01 || t > 14.0) break;
  }
  return clamp(res, 0.0, 1.0);
}

float calcAO(vec3 p, vec3 n) {
  float occ = 0.0;
  float sca = 1.0;
  for (int i = 0; i < 3; i++) {
    float h = 0.04 + 0.18 * float(i);
    float d = map(p + n * h).x;
    occ += (h - d) * sca;
    sca *= 0.75;
  }
  return clamp(1.0 - 2.2 * occ, 0.0, 1.0);
}

// Trời: đỉnh tối (chữ trắng/vàng đọc rõ), chân trời ấm hoàng hôn.
vec3 skyColor(vec3 rd) {
  float y = clamp(rd.y, -0.2, 1.0);
  vec3 top = mix(vec3(0.06, 0.08, 0.17), vec3(0.015, 0.02, 0.05), uNight);
  vec3 mid = mix(vec3(0.34, 0.24, 0.36), vec3(0.06, 0.06, 0.14), uNight);
  vec3 hor = mix(vec3(0.98, 0.62, 0.40), vec3(0.30, 0.17, 0.22), uNight);
  vec3 c = mix(hor, mid, smoothstep(-0.02, 0.12, y));
  return mix(c, top, smoothstep(0.1, 0.38, y));
}

vec3 matColor(float m, vec3 p) {
  if (m < 1.5) {
    float road = 0.0;
    if (uMode == 0) {
      vec2 lp = mod(p.xz + CELL * 0.5, CELL) - CELL * 0.5;
      road = smoothstep(0.92, 1.0, max(abs(lp.x), abs(lp.y)) / (CELL * 0.5));
    }
    if (uMode == 2) road = smoothstep(1.55, 1.7, p.z);
    return mix(vec3(0.78, 0.69, 0.60), vec3(0.36, 0.34, 0.38), uMode == 1 ? 0.55 : road);
  }
  if (m < 3.0) {
    float k = fract((m - M_BLD) * 2.0 * 7.13);
    if (k < 0.35) return vec3(0.95, 0.89, 0.80);
    if (k < 0.6) return vec3(0.96, 0.75, 0.60);
    if (k < 0.8) return vec3(0.70, 0.78, 0.70);
    return vec3(0.66, 0.74, 0.88);
  }
  if (m < 3.5) return vec3(0.96, 0.95, 0.93);
  if (m < 4.5) return vec3(0.98, 0.74, 0.30);
  if (m < 5.5) return vec3(0.96, 0.91, 0.83);
  if (m < 6.5) return vec3(0.99, 0.98, 0.96);
  if (m < 7.5) return vec3(0.34, 0.40, 0.52);
  if (m < 8.5) return vec3(0.40, 0.66, 0.38);
  if (m < 9.5) return vec3(0.62, 0.42, 0.28);
  if (m < 11.0) {
    float k = (m - M_NEIGH) * 2.0;
    if (k < 0.25) return vec3(0.72, 0.86, 0.80);
    if (k < 0.5) return vec3(0.97, 0.80, 0.66);
    if (k < 0.75) return vec3(0.98, 0.90, 0.66);
    return vec3(0.74, 0.84, 0.94);
  }
  if (m < 11.9) return mix(vec3(0.95, 0.88, 0.78), vec3(0.97, 0.80, 0.62), (m - M_BAR) * 4.0);
  return vec3(0.30, 0.31, 0.38);
}

bool isGlass(float m) { return m >= M_GLASS - 0.1 && m < M_GLASS + 0.5; }

// Dải kính phát sáng ban đêm, sáng ngẫu nhiên từng đoạn.
float nightGlow(float m, vec3 p) {
  if (uNight < 0.01 || !isGlass(m)) return 0.0;
  vec2 cell = uMode == 2 ? floor(vec2(p.x / 1.62 + 0.5, p.y / 0.9)) : floor(vec2((p.x + p.z) * 1.6, p.y * 2.4));
  return 0.25 + 0.75 * step(0.42, hash12(cell));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 ro = uCamPos;
  vec3 cw = normalize(uCamTarget - ro);
  vec3 cu = normalize(cross(cw, vec3(0.0, 1.0, 0.0)));
  vec3 cv = cross(cu, cw);
  vec3 rd = normalize(uv.x * cu + uv.y * cv + uFocal * cw);

  vec3 col = pow(skyColor(rd), vec3(2.2));
  float t = 0.05;
  vec2 h = vec2(0.0);
  bool hit = false;
  // trần hình học theo cảnh: tia đã vượt trần và đang đi lên thì chắc chắn ra trời
  float ceilY = uMode == 0 ? 10.6 : (uMode == 1 ? 4.8 : 6.8);
  for (int i = 0; i < 160; i++) {
    vec3 p = ro + rd * t;
    if (p.y > ceilY && rd.y >= 0.0) break;
    h = map(p);
    if (h.x < max(0.0004 * t, 0.0006)) { hit = true; break; }
    t += h.x * 0.85;
    if (t > 80.0) break;
  }

  if (hit) {
    vec3 p = ro + rd * t;
    gBound = 0.0;
    vec3 n = calcNormal(p);
    vec3 base = pow(matColor(h.y, p), vec3(2.2));
    vec3 sunDir = normalize(mix(vec3(-0.55, 0.42, 0.62), vec3(0.4, 0.75, 0.35), uNight));
    vec3 sunCol = mix(vec3(1.25, 0.92, 0.66), vec3(0.32, 0.38, 0.62), uNight);
    vec3 skyCol = mix(vec3(0.42, 0.48, 0.70), vec3(0.10, 0.12, 0.24), uNight);
    float ao = calcAO(p, n);
    float sh = softShadow(p + n * 0.02, sunDir);
    float wrap = clamp((dot(n, sunDir) + 0.3) / 1.3, 0.0, 1.0);
    float sky = 0.55 + 0.45 * n.y;
    float bounce = clamp(-n.y * 0.5 + 0.5, 0.0, 1.0) * 0.25;
    float fre = pow(clamp(1.0 + dot(n, rd), 0.0, 1.0), 3.0);
    vec3 lin = sunCol * 1.7 * wrap * mix(0.1, 1.0, sh);
    lin += skyCol * sky * ao * 0.5;
    lin += vec3(0.9, 0.55, 0.35) * bounce * ao * (1.0 - uNight) * 0.6;
    col = base * lin;
    // tán xạ dưới bề mặt kiểu đất sét + viền sáng
    col += base * 0.08 * (1.0 - wrap) * ao * vec3(1.0, 0.6, 0.45);
    col += fre * ao * mix(vec3(1.0, 0.75, 0.55), vec3(0.45, 0.5, 0.9), uNight) * 0.22;
    if (h.y > 3.5 && h.y < 4.5) col += vec3(1.0, 0.7, 0.25) * 0.12 * (0.4 + uNight);
    col += vec3(1.0, 0.62, 0.26) * nightGlow(h.y, p) * uNight * 0.9;
    if (isGlass(h.y)) {
      vec3 refl = reflect(rd, n);
      col += pow(skyColor(refl), vec3(2.2)) * 0.35 * (1.0 - uNight) * (0.3 + fre);
    }
    // sương xa hòa vào trời
    float fog = 1.0 - exp(-0.00022 * t * t);
    col = mix(col, pow(skyColor(normalize(vec3(rd.x, 0.02, rd.z))), vec3(2.2)), fog);
  }

  // tone map ACES + gamma
  col = (col * (2.51 * col + 0.03)) / (col * (2.43 * col + 0.59) + 0.14);
  col = pow(clamp(col, 0.0, 1.0), vec3(0.4545));
  // vignette nhẹ
  vec2 q = gl_FragCoord.xy / uRes;
  col *= 0.78 + 0.22 * pow(16.0 * q.x * q.y * (1.0 - q.x) * (1.0 - q.y), 0.18);
  fragColor = vec4(col, 1.0);
}
`;

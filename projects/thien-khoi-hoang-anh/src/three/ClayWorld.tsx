import { ThreeCanvas } from "@remotion/three";
import { useMemo } from "react";
import { useVideoConfig } from "remotion";
import * as THREE from "three";
import type { Vec3 } from "./camera";
import { CLAY_FRAG, CLAY_VERT } from "./clayShader";

export type ClayMode = "city" | "bars" | "street";

export type ClayParams = {
  readonly mode: ClayMode;
  readonly cam: Vec3;
  readonly target: Vec3;
  readonly focal: number;
  readonly grow: number;
  readonly night: number;
  readonly bars?: Vec3;
};

const MODE_INDEX: Record<ClayMode, number> = { city: 0, bars: 1, street: 2 };

// Nền 3D đất sét. `quality` < 1 dựng shader ở độ phân giải thấp hơn rồi phóng
// lên khung 1080x1920 (đất sét mềm nên 0.75 vẫn nét, render nhanh gần gấp đôi).
export const ClayWorld: React.FC<{ readonly params: ClayParams; readonly quality?: number; readonly topScrim?: number }> = ({
  params,
  quality = 0.62,
  topScrim = 0.5,
}) => {
  const { width, height } = useVideoConfig();
  const w = Math.round(width * quality);
  const h = Math.round(height * quality);

  const material = useMemo(
    () =>
      new THREE.RawShaderMaterial({
        glslVersion: THREE.GLSL3,
        vertexShader: CLAY_VERT,
        fragmentShader: CLAY_FRAG,
        depthTest: false,
        depthWrite: false,
        uniforms: {
          uRes: { value: new THREE.Vector2(w, h) },
          uMode: { value: 0 },
          uCamPos: { value: new THREE.Vector3() },
          uCamTarget: { value: new THREE.Vector3() },
          uFocal: { value: 1.6 },
          uGrow: { value: 1 },
          uBars: { value: new THREE.Vector3() },
          uNight: { value: 0 },
        },
      }),
    [w, h],
  );

  const u = material.uniforms;
  u.uRes.value.set(w, h);
  u.uMode.value = MODE_INDEX[params.mode];
  u.uCamPos.value.set(...params.cam);
  u.uCamTarget.value.set(...params.target);
  u.uFocal.value = params.focal;
  u.uGrow.value = params.grow;
  u.uNight.value = params.night;
  u.uBars.value.set(...(params.bars ?? [0, 0, 0]));

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", background: "#0b0d18" }}>
      <div style={{ width: w, height: h, transform: `scale(${1 / quality})`, transformOrigin: "0 0" }}>
        <ThreeCanvas width={w} height={h} gl={{ preserveDrawingBuffer: true, antialias: false }} dpr={1}>
          <mesh frustumCulled={false} material={material}>
            <planeGeometry args={[2, 2]} />
          </mesh>
        </ThreeCanvas>
      </div>
      {/* hạ sáng nhẹ vùng trời phía trên để chữ trắng/vàng đọc rõ (chỉnh màu nền, không phải thẻ sau chữ) */}
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, rgba(5,6,15,${topScrim}) 0%, rgba(5,6,15,${topScrim * 0.5}) 28%, rgba(5,6,15,0) 48%)` }} />
    </div>
  );
};

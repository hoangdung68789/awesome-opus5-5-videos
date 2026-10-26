import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { clamp } from "../brand";

// Ngôn ngữ chuyển động chung của bộ MG: vào/ra 0,25 giây (Bước 4.4 mục 3).
export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN = Easing.bezier(0.7, 0, 0.84, 0);

// `enter` đi 0→1 khi MG xuất hiện, `exit` đi 0→1 trong 0,25 giây cuối.
// Trong một Sequence, durationInFrames là độ dài của chính lớp MG đó.
export const useEnterExit = (enterSeconds = 0.25, exitSeconds = 0.25) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const enter = interpolate(frame, [0, enterSeconds * fps], [0, 1], {
    ...clamp,
    easing: EASE_OUT,
  });
  const exit = interpolate(
    frame,
    [durationInFrames - exitSeconds * fps, durationInFrames],
    [0, 1],
    { ...clamp, easing: EASE_IN },
  );
  return { frame, fps, durationInFrames, enter, exit };
};

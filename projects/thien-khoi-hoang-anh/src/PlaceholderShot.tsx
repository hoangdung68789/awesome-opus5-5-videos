import type React from "react";
import { Interactive, type InteractivitySchema } from "remotion";
import { fontFamily, GOLD } from "./brand";

type Props = {
  readonly label: string;
  readonly hint: string;
};

// Khung giữ chỗ cho một shot (T/BR) khi chưa có video thô.
// Khi dựng thật, thay bằng <Video> từ @remotion/media đọc bản proxy trong public/proxy/.
const PlaceholderShotInner: React.FC<Props> = ({ label, hint }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 470,
      textAlign: "center",
      fontFamily,
      color: "rgba(255,255,255,0.35)",
    }}
  >
    <div style={{ fontSize: 44, fontWeight: 700, color: `${GOLD.light}88` }}>{label}</div>
    <div style={{ fontSize: 30, marginTop: 8 }}>{hint}</div>
  </div>
);

const schema = {
  label: { type: "string", default: "C1 Hook – T1 take3", description: "Tên cảnh" },
  hint: { type: "string", default: "Thay bằng video thô", description: "Ghi chú" },
} as const satisfies InteractivitySchema;

export const PlaceholderShot = Interactive.create({
  Component: PlaceholderShotInner,
  layout: "absolute-fill",
  schema,
});

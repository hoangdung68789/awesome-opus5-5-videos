// Xuất nhanh nhiều khung để kiểm tra (QA Công cụ B) rồi ghép thành 1 ảnh tổng hợp.
// Dùng: node scripts/qa-stills.mjs <compositionId> <outDir> <frame,frame,...> [scale]
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const [id, outDir, framesArg, scaleArg] = process.argv.slice(2);
const frames = framesArg.split(",").map(Number);
const scale = Number(scaleArg ?? 0.5);
const browserExecutable = process.env.REMOTION_BROWSER || null;
fs.mkdirSync(outDir, { recursive: true });
const serveUrl = await bundle({ entryPoint: path.resolve("src/index.ts") });
const chromiumOptions = { gl: process.env.REMOTION_GL || "swangle" };
const composition = await selectComposition({ serveUrl, id, browserExecutable, chromiumOptions });
const files = [];
for (const frame of frames) {
  const output = path.join(outDir, `${id}_${String(frame).padStart(4, "0")}.jpg`);
  const t0 = Date.now();
  await renderStill({ serveUrl, composition, frame, output, scale, imageFormat: "jpeg", jpegQuality: 85, browserExecutable, chromiumOptions });
  console.log(`frame ${frame} → ${output} (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
  files.push(output);
}
const cols = Math.min(files.length, 4);
const sheet = path.join(outDir, `${id}_sheet.jpg`);
const inputs = files.flatMap((f) => ["-i", f]);
const rows = Math.ceil(files.length / cols);
const layout = files.map((_, i) => `${(i % cols) === 0 ? "0" : Array.from({ length: i % cols }, (_, k) => `w${k}`).join("+")}_${Math.floor(i / cols) === 0 ? "0" : Array.from({ length: Math.floor(i / cols) }, (_, k) => `h${k * cols}`).join("+")}`).join("|");
if (files.length > 1) {
  execFileSync("ffmpeg", ["-y", "-v", "error", ...inputs, "-filter_complex", `xstack=inputs=${files.length}:layout=${layout}:fill=black`, sheet]);
  console.log(`sheet → ${sheet} (${cols}x${rows})`);
}

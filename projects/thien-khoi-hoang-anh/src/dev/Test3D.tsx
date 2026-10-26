import { Series } from "remotion";
import { NenBayPhoHCM, NenCotGDP, NenNhaPhoTacGia, NenNhaPhoXay, NenThanhPhoDem, NenThanhPhoMoc } from "../scenes/Backgrounds3D";

export const Test3D = () => (
  <Series>
    <Series.Sequence durationInFrames={129}><NenThanhPhoMoc /></Series.Sequence>
    <Series.Sequence durationInFrames={128}><NenCotGDP values={[5.05, 7.09, 8.02]} years={["2023", "2024", "2025"]} riseAt={[12, 28, 52]} /></Series.Sequence>
    <Series.Sequence durationInFrames={124}><NenBayPhoHCM pinAt={29} /></Series.Sequence>
    <Series.Sequence durationInFrames={89}><NenNhaPhoXay /></Series.Sequence>
    <Series.Sequence durationInFrames={170}><NenThanhPhoDem /></Series.Sequence>
    <Series.Sequence durationInFrames={169}><NenNhaPhoTacGia /></Series.Sequence>
  </Series>
);

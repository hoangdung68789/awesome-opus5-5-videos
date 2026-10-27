import { Composition, Folder } from "remotion";
import { BrandIdent } from "./BrandIdent";
import { HdreMau } from "./HdreMau";
import { MG01Hook } from "./mg/MG01Hook";
import { MG02SpecCard } from "./mg/MG02SpecCard";
import { MG04AlleyWidth } from "./mg/MG04AlleyWidth";
import { MG08Callout } from "./mg/MG08Callout";
import { MG12LegalBadge } from "./mg/MG12LegalBadge";
import { MG13PriceTag } from "./mg/MG13PriceTag";
import { MG16Cta } from "./mg/MG16Cta";
import { MG17LogoCorner } from "./mg/MG17LogoCorner";
import { PlaceholderShot } from "./PlaceholderShot";
import { Test3D } from "./dev/Test3D";
import { ThienKhoiHoangAnh } from "./ThienKhoiHoangAnh";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ThienKhoi-HoangAnh-9x16"
        component={ThienKhoiHoangAnh}
        durationInFrames={930}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ coAmThanh: true }}
      />
      <Composition
        id="HDRE-Mau"
        component={HdreMau}
        durationInFrames={715}
        fps={30}
        width={1080}
        height={1920}
      />
      <Folder name="Nhan-dien">
        <Composition
          id="BrandIdent"
          component={BrandIdent}
          durationInFrames={180}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ brandName: "HOÀNG DŨNG", subtitle: "REAL ESTATE", flashIn: false }}
        />
      </Folder>
      <Folder name="MG">
        <Composition
          id="MG01-Hook"
          component={MG01Hook}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ text: "Nhà hẻm xe hơi chỉ 5 tỷ?", highlight: "5 tỷ", accentColor: "#f3dc8a" }}
        />
        <Composition
          id="MG02-ThongSo"
          component={MG02SpecCard}
          durationInFrames={90}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ specs: "4x16m · 4 tầng · 4PN", label: "Thông số" }}
        />
        <Composition
          id="MG04-Hem"
          component={MG04AlleyWidth}
          durationInFrames={75}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ label: "Hẻm 6m", span: 760, color: "#f3dc8a" }}
        />
        <Composition
          id="MG08-Callout"
          component={MG08Callout}
          durationInFrames={75}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ text: "Cột BTCT chắc", fix: "", negative: false, radius: 90 }}
        />
        <Composition
          id="MG12-PhapLy"
          component={MG12LegalBadge}
          durationInFrames={80}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ text: "Sổ hồng riêng · Hoàn công" }}
        />
        <Composition
          id="MG13-Gia"
          component={MG13PriceTag}
          durationInFrames={80}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ amount: 7.3, unit: "tỷ", note: "Thương lượng", countUp: true }}
        />
        <Composition
          id="MG16-CTA"
          component={MG16Cta}
          durationInFrames={110}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ line: "Nhắn anh Dũng đi xem thực tế", contact: "" }}
        />
        <Composition
          id="MG17-LogoGoc"
          component={MG17LogoCorner}
          durationInFrames={60}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{ showName: true }}
        />
      </Folder>
      <Folder name="Nen-3D">
        <Composition id="Nen3D-XemNhanh" component={Test3D} durationInFrames={809} fps={30} width={1080} height={1920} />
      </Folder>
      <Folder name="Khung">
        <Composition
          id="PlaceholderShot"
          component={PlaceholderShot}
          durationInFrames={60}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            label: "C1 Hook – T1 take3",
            hint: "Thay bằng video thô",
            style: { background: "linear-gradient(160deg, #1b2230, #0b0d12)" },
          }}
        />
      </Folder>
    </>
  );
};

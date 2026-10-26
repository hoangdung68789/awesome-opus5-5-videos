import { lightLeak } from "@remotion/effects/light-leak";
import { Audio } from "@remotion/media";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { iris } from "@remotion/transitions/iris";
import { pushCut } from "@remotion/transitions/push-cut";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { interpolate, Solid, staticFile, Track, useCurrentFrame, useVideoConfig } from "remotion";
import { MGBatTu } from "./mg/tk/MGBatTu";
import { MGButDa } from "./mg/tk/MGButDa";
import { MGChip } from "./mg/tk/MGChip";
import { MGConDau } from "./mg/tk/MGConDau";
import { MGDapNhip } from "./mg/tk/MGDapNhip";
import { MGGoChu } from "./mg/tk/MGGoChu";
import { MGNguon } from "./mg/tk/MGNguon";
import { MGSoChay } from "./mg/tk/MGSoChay";
import { MGCta, MGTheTacGia } from "./mg/tk/MGTacGiaCta";
import { MGVong } from "./mg/tk/MGVong";
import { NenBayPhoHCM, NenCotGDP, NenNhaPhoTacGia, NenNhaPhoXay, NenThanhPhoDem, NenThanhPhoMoc } from "./scenes/Backgrounds3D";
import { CanhPhatTrienKhoi } from "./scenes/CanhPhatTrienKhoi";

// Video MG 9:16 – "Kinh tế tăng tốc → TP.HCM → Thiên Khôi Group → Khối Hoàng Anh → Hoàng Dũng".
// 30 fps, 930 khung = 31,0 s, khớp bài nhạc TikTok Dũng gửi (117,5 BPM; lặng 11,5–14,4 s; drop 14,4 s).
// Mốc khung tuyệt đối ghi trực tiếp; bảng lời/cảnh/MG/SFX ở KICH_BAN.md.
//
// Cảnh (TransitionSeries) — bắt đầu ở khung: C1 0 · C2 117 · C3 233 · C4 343 · C5 432 · C6 590 · C7 761.

// Vùng chữ rộng hơn cho chữ ở nửa trên khung: cột nút TikTok bên phải chỉ chiếm nửa dưới.
const TOP_WIDE = { left: 60, width: 960 } as const;

const LightLeakOverlay: React.FC<{ readonly seed: number; readonly hueShift: number }> = ({ seed, hueShift }) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width, height } = useVideoConfig();
  return (
    <Solid
      width={width}
      height={height}
      effects={[
        lightLeak({
          seed,
          hueShift,
          progress: interpolate(frame, [0, durationInFrames - 1], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
        }),
      ]}
    />
  );
};

export const ThienKhoiHoangAnh = () => {
  const frame = useCurrentFrame();

  return (
    <>
      <TransitionSeries name="Cảnh">
        <TransitionSeries.Sequence name="C1 Hook – Thành phố đất sét mọc" durationInFrames={129}>
          <NenThanhPhoMoc />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={pushCut({ flashColor: "#fff3d6", flashOpacity: 0.35 })} timing={linearTiming({ durationInFrames: 12 })} />
        <TransitionSeries.Sequence name="C2 GDP – Cột số liệu 3D" durationInFrames={128}>
          <NenCotGDP values={[5.05, 7.09, 8.02]} years={["2023", "2024", "2025"]} riseAt={[12, 28, 52]} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={linearTiming({ durationInFrames: 12 })} />
        <TransitionSeries.Sequence name="C3 TP.HCM – Bay phố về tháp" durationInFrames={124}>
          <NenBayPhoHCM pinAt={29} />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: 14 })} />
        <TransitionSeries.Sequence name="C4 Đoạn lặng – Nhà phố mọc" durationInFrames={89}>
          <NenNhaPhoXay />
        </TransitionSeries.Sequence>
        <TransitionSeries.Overlay durationInFrames={24}>
          <LightLeakOverlay seed={3} hueShift={20} />
        </TransitionSeries.Overlay>
        <TransitionSeries.Sequence name="C5 Thiên Khôi Group – Thành phố đêm" durationInFrames={170}>
          <NenThanhPhoDem />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={iris({ width: 1080, height: 1920 })} timing={linearTiming({ durationInFrames: 12 })} />
        <TransitionSeries.Sequence name="C6 Khối Hoàng Anh – Biểu đồ phát triển (2D)" durationInFrames={183}>
          <CanhPhatTrienKhoi
            tieuDeNho="HÀNH TRÌNH PHÁT TRIỂN 2024 – 2026"
            tieuDe="HOÀNG ANH"
            moc1="2024"
            moTa1="Phòng Hoàng Anh ra đời"
            moc2="16.10.2025"
            moTa2="Phòng Hoàng Anh tròn 1 tuổi"
            moc3="2026"
            moTa3="NÂNG CẤP THÀNH KHỐI"
            phu3a="Khối Hoàng Anh Hồ Chí Minh"
            phu3b="Giám đốc Khối: Bà Đặng Thu Hương"
            nhanTruc={["2024", "16.10.2025", "2026"]}
            anh2="assets/phong-hoang-anh-1-tuoi.jpg"
            anh2b="assets/phong-hoang-anh-1-tuoi-2.jpg"
            anh3="assets/khoi-hoang-anh-giam-doc-khoi.jpg"
            soLieu={[0, 0, 0]}
            donVi="thành viên"
            at1={22}
            at2={68}
            at3={114}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={wipe({ direction: "from-bottom" })} timing={linearTiming({ durationInFrames: 12 })} />
        <TransitionSeries.Sequence name="C7 Tác giả + CTA – Nhà phố giờ xanh" durationInFrames={169}>
          <NenNhaPhoTacGia />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Track name="MG">
        {/* C1 Hook */}
        <MGBatTu name="MG Hook bật từ (T1)" from={0} durationInFrames={52} line1="NĂM 2025," line2="KINH TẾ VIỆT NAM" line3="TĂNG BAO NHIÊU?" line2At={10} line3At={22} top={300} />
        <MGSoChay name="MG Số chạy 8,02% (T2)" from={52} durationInFrames={65} label="GDP VIỆT NAM 2025 TĂNG" value={8.02} decimals={2} suffix="%" rollFrames={31} top={290} />
        <MGButDa name="MG Bút dạ – cao thứ 2 (T5)" from={85} durationInFrames={32} text="CAO THỨ 2 GIAI ĐOẠN 2011–2025" top={500} fontSize={42} />
        <MGNguon name="Nguồn C1" from={52} durationInFrames={65} text="Nguồn: Cục Thống kê (Bộ Tài chính), công bố 05/01/2026" />

        {/* C2 GDP */}
        <MGBatTu name="MG Tiêu đề GDP bật từ (T1)" from={123} durationInFrames={69} line1="TĂNG TRƯỞNG GDP" line2="VIỆT NAM" line3="" line2At={6} line3At={0} top={200} />
        <MGSoChay name="MG Số chạy 514 tỷ USD (T2)" from={192} durationInFrames={43} label="QUY MÔ NỀN KINH TẾ 2025" value={514} decimals={0} suffix=" TỶ USD" rollFrames={15} top={170} />
        <MGNguon name="Nguồn C2" from={123} durationInFrames={110} text="Nguồn: Tổng cục Thống kê / Cục Thống kê – số liệu ước tính công bố cuối mỗi năm" />

        {/* C3 TP.HCM */}
        <MGGoChu name="MG Gõ chữ TP. HỒ CHÍ MINH (T4)" from={239} durationInFrames={108} line1="TP. HỒ CHÍ MINH" line2="" line2At={0} charsPerFrame={0.9} fontSize={72} italic={false} top={170} />
        <MGVong name="MG Vòng ≈1/4 GDP" from={268} durationInFrames={48} percent={23.3} center="≈ 1/4" label="GDP CẢ NƯỚC NĂM 2025" top={330} />
        <MGButDa name="MG Bút dạ – GRDP +8,03% (T5)" from={316} durationInFrames={31} text="GRDP 2025 TĂNG 8,03%" top={300} fontSize={64} />
        <MGNguon name="Nguồn C3" from={268} durationInFrames={79} text="Nguồn: Cục Thống kê TP.HCM qua báo SGGP, 01/2026 (GRDP không tính dầu khí)" />

        {/* C4 đoạn lặng */}
        <MGGoChu name="MG Gõ câu trích (T4)" from={352} durationInFrames={78} line1="Thị trường càng lớn," line2="càng cần người dẫn đường giỏi." line2At={32} charsPerFrame={1.1} fontSize={52} italic top={230} style={TOP_WIDE} />

        {/* C5 Thiên Khôi Group */}
        <MGDapNhip name="MG Đập nhịp THIÊN KHÔI GROUP (T6)" from={432} durationInFrames={38} title="THIÊN KHÔI GROUP" sub="Hệ sinh thái công nghệ cho môi giới BĐS" top={260} fontSize={78} style={TOP_WIDE} />
        <MGChip
          name="MG Chip Thiên Khôi (T3)"
          from={470}
          durationInFrames={80}
          v1="2020"
          l1="THÀNH LẬP"
          v2="7"
          l2="CHI NHÁNH"
          v3="31"
          l3="TRỤ SỞ"
          v4="40.000+"
          l4={"nhà tư vấn, môi giới,\nnhà đầu tư dùng hệ sinh thái"}
          at2={18}
          at3={33}
          at4={48}
          top={250}
        />
        <MGConDau
          name="MG Con dấu TOP 5 VARS 2026 (T7)"
          from={550}
          durationInFrames={46}
          big="TOP 5"
          ring="VARS AWARDS 2026 • VARS AWARDS 2026 •"
          line1={"Dẫn đầu phát triển nền tảng công nghệ\ncho môi giới BĐS & khách hàng"}
          line2="TKG Proptech · Thiên Khôi HRM"
          top={200}
          style={TOP_WIDE}
        />
        <MGNguon name="Nguồn C5" from={470} durationInFrames={120} text="Nguồn: Thiên Khôi Group công bố; VnEconomy, Nhân Dân, Dân Trí (07/2026)" />

        {/* C7 Tác giả + CTA */}
        <MGTheTacGia name="MG Thẻ tác giả – lộ tên (T8)" from={767} durationInFrames={70} photo="assets/hoang-dung-chan-dung.jpg" hoTen="HOÀNG DŨNG" line1="Môi giới nhà phố TP.HCM" line2="Khối Hoàng Anh · Thiên Khôi Group" nameAt={11} subAt={23} />
        <MGCta name="MG CTA Nhắn tin ngay" from={837} durationInFrames={93} photo="assets/hoang-dung-chan-dung.jpg" hoTen="Hoàng Dũng · Khối Hoàng Anh" question1="Anh chị cần mua – bán" question2="nhà phố TP.HCM?" cta="NHẮN TIN NGAY" ctaAt={31} beatFrames={15.3} />
      </Track>

      <Track name="Nhạc">
        <Audio
          name="Nhạc nền TikTok (Dũng gửi)"
          src={staticFile("audio/nhac-nen-tiktok.mp3")}
          volume={interpolate(frame, [0, 2, 918, 930], [0, 0.9, 0.9, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
        />
      </Track>

      <Track name="SFX">
        <Audio name="SFX pop – hook dòng 1" from={0} src={staticFile("sfx/pop_hook_1.wav")} volume={0.55} />
        <Audio name="SFX pop – hook từ khóa" from={22} src={staticFile("sfx/pop_hook_2.wav")} volume={0.6} />
        <Audio name="SFX tick lăn số 8,02%" from={52} src={staticFile("sfx/tick_roll.wav")} volume={0.4} />
        <Audio name="SFX chuông chốt 8,02%" from={83} src={staticFile("sfx/lock_bell.wav")} volume={0.5} />
        <Audio name="SFX bút dạ – cao thứ 2" from={88} src={staticFile("sfx/marker_1.wav")} volume={0.45} />
        <Audio name="SFX whoosh C1→C2" from={113} src={staticFile("sfx/whoosh_1.wav")} volume={0.5} />
        <Audio name="SFX pluck – cột 2023" from={129} src={staticFile("sfx/bar_1.wav")} volume={0.45} />
        <Audio name="SFX pluck – cột 2024" from={145} src={staticFile("sfx/bar_2.wav")} volume={0.45} />
        <Audio name="SFX pluck – cột 2025" from={169} src={staticFile("sfx/bar_3.wav")} volume={0.5} />
        <Audio name="SFX tick lăn số 514" from={192} src={staticFile("sfx/tick_roll.wav")} volume={0.35} trimAfter={16} />
        <Audio name="SFX xu – chốt 514 tỷ USD" from={207} src={staticFile("sfx/coins.wav")} volume={0.5} />
        <Audio name="SFX whoosh C2→C3" from={230} src={staticFile("sfx/whoosh_2.wav")} volume={0.5} />
        <Audio name="SFX gõ phím – TP.HCM" from={239} src={staticFile("sfx/typing.wav")} volume={0.4} />
        <Audio name="SFX ping – ghim rơi" from={262} src={staticFile("sfx/ping_pin.wav")} volume={0.45} />
        <Audio name="SFX swish – vòng 1/4" from={270} src={staticFile("sfx/swish_soft.wav")} volume={0.4} />
        <Audio name="SFX bút dạ – GRDP" from={319} src={staticFile("sfx/marker_2.wav")} volume={0.45} />
        <Audio name="SFX twirl – C3→C4" from={341} src={staticFile("sfx/twirl_soft.wav")} volume={0.4} />
        <Audio name="SFX gõ phím – câu trích 1" from={352} src={staticFile("sfx/typing.wav")} volume={0.35} />
        <Audio name="SFX gõ phím – câu trích 2" from={384} src={staticFile("sfx/typing_2.wav")} volume={0.3} trimAfter={27} />
        <Audio name="SFX riser trước drop" from={386} src={staticFile("sfx/riser.wav")} trimBefore={60} volume={0.55} />
        <Audio name="SFX boom – drop THIÊN KHÔI" from={432} src={staticFile("sfx/boom.wav")} volume={0.85} />
        <Audio name="SFX chip 1 – 2020" from={470} src={staticFile("sfx/chip_1.wav")} volume={0.45} />
        <Audio name="SFX chip 2 – 7 chi nhánh" from={488} src={staticFile("sfx/chip_2.wav")} volume={0.45} />
        <Audio name="SFX chip 3 – 31 trụ sở" from={503} src={staticFile("sfx/chip_3.wav")} volume={0.45} />
        <Audio name="SFX chip 4 – 40.000+" from={518} src={staticFile("sfx/chip_4.wav")} volume={0.5} />
        <Audio name="SFX con dấu – VARS" from={554} src={staticFile("sfx/stamp.wav")} volume={0.75} />
        <Audio name="SFX whoosh C5→C6" from={587} src={staticFile("sfx/whoosh_3.wav")} volume={0.5} />
        <Audio name="SFX ping – mốc 2024" from={612} src={staticFile("sfx/ping_node.wav")} volume={0.45} />
        <Audio name="SFX shutter – ảnh 16.10.2025" from={658} src={staticFile("sfx/shutter_1.wav")} volume={0.5} />
        <Audio name="SFX kick – KHỐI HOÀNG ANH" from={704} src={staticFile("sfx/kick_slam.wav")} volume={0.7} />
        <Audio name="SFX whoosh C6→C7" from={758} src={staticFile("sfx/whoosh_4.wav")} volume={0.5} />
        <Audio name="SFX shutter – tên HOÀNG DŨNG" from={778} src={staticFile("sfx/shutter_2.wav")} volume={0.45} />
        <Audio name="SFX pop nhẹ – dòng phụ tác giả" from={790} src={staticFile("sfx/pop_sub.wav")} volume={0.35} />
        <Audio name="SFX pop – câu hỏi CTA" from={839} src={staticFile("sfx/pop_cta.wav")} volume={0.5} />
        <Audio name="SFX thông báo – NHẮN TIN NGAY" from={868} src={staticFile("sfx/notify.wav")} volume={0.6} />
      </Track>
    </>
  );
};

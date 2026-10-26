import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { Track } from "remotion";
import { BrandIdent } from "./BrandIdent";
import { MG01Hook } from "./mg/MG01Hook";
import { MG02SpecCard } from "./mg/MG02SpecCard";
import { MG04AlleyWidth } from "./mg/MG04AlleyWidth";
import { MG08Callout } from "./mg/MG08Callout";
import { MG12LegalBadge } from "./mg/MG12LegalBadge";
import { MG13PriceTag } from "./mg/MG13PriceTag";
import { MG16Cta } from "./mg/MG16Cta";
import { MG17LogoCorner } from "./mg/MG17LogoCorner";
import { PlaceholderShot } from "./PlaceholderShot";

// Bản dựng mẫu theo kịch bản 5 cảnh. Cấu trúc chuẩn cho mọi dự án:
//   1. TransitionSeries "Cảnh"  – mỗi shot (T/BR) một TransitionSeries.Sequence,
//      tên theo bảng lời thoại, ví dụ "C3 Bếp – BR05".
//   2. Track "MG"               – mỗi lớp MG một JSX riêng, tên mang mã MG.
//   3. Track "Logo"             – MG17 (chỉ khi Dũng yêu cầu), dừng trước cảnh CTA.
//   4. Âm thanh: Giọng / Nhạc / SFX là các <Audio> riêng, đặt tên theo nhóm.
// Mốc tính bằng khung hình ở 30 fps; dự án thật dùng fps của video gốc.
export const HdreMau = () => {
  return (
    <>
      <TransitionSeries name="Cảnh">
        <TransitionSeries.Sequence name="C1 Hook – T1 take3" durationInFrames={90}>
          <PlaceholderShot
            label="C1 Hook – T1 take3"
            hint="Dũng nói câu hook trước mặt tiền"
            style={{ background: "linear-gradient(160deg, #1b2230, #0b0d12)" }}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: 10 })}
        />
        <TransitionSeries.Sequence name="C2 Hẻm – BR02" durationInFrames={90}>
          <PlaceholderShot
            label="C2 Hẻm – BR02"
            hint="POV đi vào hẻm"
            style={{ background: "linear-gradient(160deg, #23301f, #0c100b)" }}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: 10 })}
        />
        <TransitionSeries.Sequence name="C3 Nhà – BR05" durationInFrames={150}>
          <PlaceholderShot
            label="C3 Nhà – BR05"
            hint="Lia phòng khách, cận kết cấu"
            style={{ background: "linear-gradient(160deg, #302619, #110d08)" }}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 10 })}
        />
        <TransitionSeries.Sequence name="C4 Pháp lý & giá – BR17" durationInFrames={165}>
          <PlaceholderShot
            label="C4 Pháp lý & giá – BR17"
            hint="Sổ hồng trên bàn (bật MG14 che thông tin)"
            style={{ background: "linear-gradient(160deg, #2a1d2a, #0f0a0f)" }}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 10 })}
        />
        <TransitionSeries.Sequence name="C5 CTA – BR18" durationInFrames={120}>
          <PlaceholderShot
            label="C5 CTA – BR18"
            hint="Dũng nói CTA trước nhà"
            style={{ background: "linear-gradient(160deg, #1d2a30, #0a0f11)" }}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 10 })}
        />
        <TransitionSeries.Sequence name="Ident thương hiệu" durationInFrames={150}>
          <BrandIdent brandName="HOÀNG DŨNG" subtitle="REAL ESTATE" flashIn={false} />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      <Track name="MG">
        <MG01Hook
          name="MG01 Hook"
          from={6}
          durationInFrames={78}
          text="Nhà hẻm xe hơi chỉ 5 tỷ?"
          highlight="5 tỷ"
          accentColor="#f3dc8a"
        />
        <MG04AlleyWidth
          name="MG04 Hẻm 6m"
          from={95}
          durationInFrames={70}
          label="Hẻm 6m"
          span={760}
          color="#f3dc8a"
        />
        <MG02SpecCard
          name="MG02 Thông số"
          from={168}
          durationInFrames={77}
          specs="4x16m · 4 tầng · 4PN"
          label="Thông số"
        />
        <MG08Callout
          name="MG09 Điểm trừ"
          from={248}
          durationInFrames={57}
          text="Thấm nhẹ sân thượng"
          fix="Sửa khoảng X triệu"
          negative
          radius={90}
        />
        <MG12LegalBadge
          name="MG12 Pháp lý"
          from={305}
          durationInFrames={80}
          text="Sổ hồng riêng · Hoàn công"
        />
        <MG13PriceTag
          name="MG13 Giá"
          from={388}
          durationInFrames={74}
          amount={7.3}
          unit="tỷ"
          note="Thương lượng"
          countUp
        />
        <MG16Cta
          name="MG16 CTA"
          from={460}
          durationInFrames={110}
          line="Nhắn anh Dũng đi xem thực tế"
          contact=""
        />
      </Track>

      <Track name="Logo">
        <MG17LogoCorner name="MG17 Logo góc" durationInFrames={455} showName={false} />
      </Track>
    </>
  );
};

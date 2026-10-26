# Kịch bản & bảng dựng – "Kinh tế tăng tốc → Thiên Khôi Group → Khối Hoàng Anh"

- **Tác giả dựng:** Hoàng Dũng – Khối Hoàng Anh, Thiên Khôi Group
- **Khung hình:** 1080×1920 (9:16), 30 fps, 930 khung = **31,0 giây** (đúng độ dài bài nhạc Dũng gửi)
- **Composition:** `ThienKhoi-HoangAnh-9x16` (file `src/ThienKhoiHoangAnh.tsx`)
- **Phong cách:** Motion Graphics + 3D đất sét (raymarching SDF, chuẩn MG22) + ảnh thật của Khối, cắt theo phách nhạc TikTok (mẫu "câu hỏi → con số → câu chuyện → CTA").

## 1. Nhạc nền (Dũng gửi, tải từ TikTok qua SaveTik)

| Thông số đo | Giá trị |
|---|---|
| Độ dài | 31,14 s |
| Nhịp | ≈ 117,5 BPM (1 phách ≈ 0,51 s ≈ 15,3 khung) |
| Đoạn A (sôi) | 0,1 – 11,5 s |
| Đoạn lặng / build | 11,5 – 14,4 s (âm lượng giảm ~15 dB) |
| **Drop** | **14,4 s (khung 432)** |
| Đoạn B | 14,4 – 28,0 s, hụt nhẹ 28,0 s, cú chốt 28,9 s |

Mọi điểm cắt cảnh và chữ chính đặt đúng phách đo được (librosa beat/onset).
⚠️ Nhạc tải từ TikTok có bản quyền của chủ sở hữu: đăng lên TikTok nên **chọn lại đúng âm thanh đó trong thư viện TikTok** khi đăng (hoặc chấp nhận rủi ro bị tắt tiếng như thói quen H-am_thanh-001). File nhạc **không** đưa lên GitHub công khai.

## 2. Bảng cảnh

| Cảnh | Khung | Giây | Nền | Nội dung chữ | Chuyển cảnh ra |
|---|---|---|---|---|---|
| C1 Hook | 0–129 | 0–4,3 | Thành phố đất sét mọc lên (máy cẩu lên) | "NĂM 2025, KINH TẾ VIỆT NAM **TĂNG BAO NHIÊU?**" → **8,02%** → "CAO THỨ 2 GIAI ĐOẠN 2011–2025" | Push-cut + lóe sáng (0,4 s) + whoosh |
| C2 GDP | 117–245 | 3,9–8,2 | Biểu đồ cột 3D đất sét 2023/2024/2025 | "TĂNG TRƯỞNG GDP VIỆT NAM" · 5,05% · 7,09% · **8,02%** → "QUY MÔ NỀN KINH TẾ 2025: **514 TỶ USD**" | Slide từ phải (0,4 s) + whoosh |
| C3 TP.HCM | 233–357 | 7,8–11,9 | Bay thấp dọc phố về toà tháp, ghim vàng rơi | "TP. HỒ CHÍ MINH" → vòng **≈ 1/4 GDP cả nước** → "**GRDP 2025 TĂNG 8,03%**" | Fade mềm (0,47 s) + twirl |
| C4 Lặng | 343–432 | 11,4–14,4 | Dãy nhà phố, căn giữa mọc lên từ mặt đất | *"Thị trường càng lớn, càng cần người dẫn đường giỏi."* (gõ chữ) + riser | Light leak trên điểm cắt (drop) + boom |
| C5 Thiên Khôi | 432–602 | 14,4–20,1 | Thành phố đêm, dải kính sáng vàng | **THIÊN KHÔI GROUP** (đập nhịp) → 2020 thành lập · 7 chi nhánh · 31 trụ sở · **40.000+** → dấu **TOP 5 VARS AWARDS 2026** | Iris tròn (0,4 s) + whoosh |
| C6 Khối Hoàng Anh | 590–773 | 19,7–25,8 | **Biểu đồ phát triển 2D (motion graphics, không 3D)**: nền navy chấm vàng; 3 cột trồi đúng mốc, đường tăng trưởng vàng vẽ dần + mũi tên, biểu tượng nét Phòng → 2 căn → cụm tháp "Khối", nhà phố nét vàng tự vẽ ở mốc 2024, ảnh thật ở mốc 2 và 3 | **2024** Phòng Hoàng Anh ra đời → **16.10.2025** Phòng Hoàng Anh tròn 1 tuổi (ảnh) → **2026 NÂNG CẤP THÀNH KHỐI** · Khối Hoàng Anh Hồ Chí Minh · Giám đốc Khối: Bà Đặng Thu Hương (ảnh) | Wipe từ dưới (0,4 s) + whoosh |
| C7 Tác giả + CTA | 761–930 | 25,4–31,0 | Dãy nhà phố giờ xanh | Thẻ chân dung **HOÀNG DŨNG** · Môi giới nhà phố TP.HCM · Khối Hoàng Anh – Thiên Khôi Group → "Anh chị cần mua – bán nhà phố TP.HCM?" → **NHẮN TIN NGAY** (đập theo phách) | — |

Mỗi kiểu chuyển cảnh dùng 1 lần, đều có SFX; CTA không logo, không chữ "Hoàng Dũng Real Estate" (H-chung-004), không tự điền số điện thoại.

## 3. Kiểu chữ động (8 kiểu, mỗi kiểu ≤ 2 lần, không kiểu nào lặp liền nhau)

| Mã | Kiểu chữ | Lần 1 | Lần 2 | SFX |
|---|---|---|---|---|
| T1 | Bật từng từ | Hook C1 | Tiêu đề GDP C2 | pop / pop từ khóa |
| T2 | Số chạy + chốt | 8,02% | 514 tỷ USD | tick lăn + chuông / xu |
| T3 | Chip xếp lần lượt | 4 dòng Thiên Khôi C5 | (cột số liệu C2 là đồ họa biểu đồ) | pluck/select cao độ tăng dần |
| T4 | Gõ chữ | TP. HỒ CHÍ MINH | Câu trích C4 | gõ phím thật |
| T5 | Bút dạ quang | "Cao thứ 2 giai đoạn 2011–2025" | "GRDP 2025 tăng 8,03%" | tiếng bút dạ kẻ |
| T6 | Đập nhịp | THIÊN KHÔI GROUP | NÂNG CẤP THÀNH KHỐI | boom / kick |
| T7 | Con dấu | TOP 5 VARS AWARDS 2026 | – | stamp thump |
| T8 | Chớp sáng + mặt nạ | Ảnh 16.10.2025 (biểu đồ C6) | Tên HOÀNG DŨNG | shutter |
| CTA | Nhịp đập + vòng sóng | NHẮN TIN NGAY | – | chuông thông báo |

Cỡ chữ (H-hieu_ung_3d-002): chữ chính 72 px (6,7% khung), số nhấn tối đa 108 px (10%), chữ phụ 38–42 px; không thẻ/khối nền sau chữ; nền tối → chữ trắng + nhấn vàng, bóng mềm. Chữ nửa trên khung dùng vùng 60–1020 px (cột nút TikTok bên phải chỉ ở nửa dưới); chữ nửa dưới giữ vùng an toàn trái 80 / phải 160 / dưới 420.

## 4. Bảng Chữ/MG → SFX → mốc → mức (âm lượng so với nhạc 0,9)

| Khung | Giây | SFX | File | Âm lượng | So với nhạc |
|---:|---:|---|---|---:|---:|
| 0 | 0.00 | pop – hook dòng 1 | `pop_hook_1.wav` | 0.55 | -4.3 dB |
| 22 | 0.73 | pop – hook từ khóa | `pop_hook_2.wav` | 0.6 | -3.5 dB |
| 52 | 1.73 | tick lăn số 8,02% | `tick_roll.wav` | 0.4 | -7.0 dB |
| 83 | 2.77 | chuông chốt 8,02% | `lock_bell.wav` | 0.5 | -5.1 dB |
| 88 | 2.93 | bút dạ – cao thứ 2 | `marker_1.wav` | 0.45 | -6.0 dB |
| 113 | 3.77 | whoosh C1→C2 | `whoosh_1.wav` | 0.5 | -5.1 dB |
| 129 | 4.30 | pluck – cột 2023 | `bar_1.wav` | 0.45 | -6.0 dB |
| 145 | 4.83 | pluck – cột 2024 | `bar_2.wav` | 0.45 | -6.0 dB |
| 169 | 5.63 | pluck – cột 2025 | `bar_3.wav` | 0.5 | -5.1 dB |
| 192 | 6.40 | tick lăn số 514 | `tick_roll.wav` | 0.35 | -8.2 dB |
| 207 | 6.90 | xu – chốt 514 tỷ USD | `coins.wav` | 0.5 | -5.1 dB |
| 230 | 7.67 | whoosh C2→C3 | `whoosh_2.wav` | 0.5 | -5.1 dB |
| 239 | 7.97 | gõ phím – TP.HCM | `typing.wav` | 0.4 | -7.0 dB |
| 262 | 8.73 | ping – ghim rơi | `ping_pin.wav` | 0.45 | -6.0 dB |
| 270 | 9.00 | swish – vòng 1/4 | `swish_soft.wav` | 0.4 | -7.0 dB |
| 319 | 10.63 | bút dạ – GRDP | `marker_2.wav` | 0.45 | -6.0 dB |
| 341 | 11.37 | twirl – C3→C4 | `twirl_soft.wav` | 0.4 | -7.0 dB |
| 352 | 11.73 | gõ phím – câu trích 1 | `typing.wav` | 0.35 | -8.2 dB |
| 384 | 12.80 | gõ phím – câu trích 2 | `typing_2.wav` | 0.3 | -9.5 dB |
| 386 | 12.87 | riser trước drop | `riser.wav` | 0.55 | -4.3 dB |
| 432 | 14.40 | boom – drop THIÊN KHÔI | `boom.wav` | 0.85 | -0.5 dB |
| 470 | 15.67 | chip 1 – 2020 | `chip_1.wav` | 0.45 | -6.0 dB |
| 488 | 16.27 | chip 2 – 7 chi nhánh | `chip_2.wav` | 0.45 | -6.0 dB |
| 503 | 16.77 | chip 3 – 31 trụ sở | `chip_3.wav` | 0.45 | -6.0 dB |
| 518 | 17.27 | chip 4 – 40.000+ | `chip_4.wav` | 0.5 | -5.1 dB |
| 554 | 18.47 | con dấu – VARS | `stamp.wav` | 0.75 | -1.6 dB |
| 587 | 19.57 | whoosh C5→C6 | `whoosh_3.wav` | 0.5 | -5.1 dB |
| 612 | 20.40 | ping – mốc 2024 | `ping_node.wav` | 0.45 | -6.0 dB |
| 658 | 21.93 | shutter – ảnh 16.10.2025 | `shutter_1.wav` | 0.5 | -5.1 dB |
| 704 | 23.47 | kick – KHỐI HOÀNG ANH | `kick_slam.wav` | 0.7 | -2.2 dB |
| 758 | 25.27 | whoosh C6→C7 | `whoosh_4.wav` | 0.5 | -5.1 dB |
| 778 | 25.93 | shutter – tên HOÀNG DŨNG | `shutter_2.wav` | 0.45 | -6.0 dB |
| 790 | 26.33 | pop nhẹ – dòng phụ tác giả | `pop_sub.wav` | 0.35 | -8.2 dB |
| 839 | 27.97 | pop – câu hỏi CTA | `pop_cta.wav` | 0.5 | -5.1 dB |
| 868 | 28.93 | thông báo – NHẮN TIN NGAY | `notify.wav` | 0.6 | -3.5 dB |

Kiểm bằng máy: tối đa **2 SFX trong mọi cửa sổ 1 giây**; mỗi file dùng tối đa **2 lần** (`tick_roll`, `typing`). Toàn bộ SFX là **CC0** (Kenney, Ben Burnes "BB" packs qua `lavenderdotpet/CC0-Public-Domain-Sounds`), chuẩn 48 kHz WAV, cắt lặng đầu, đỉnh −1 dBFS – xem `public/sfx/sfx_index.csv`. AI chỉ kiểm bằng số đo; **Dũng nghe duyệt** độ hợp tai.

## 5. Số liệu & nguồn (chỉ đưa lên hình số đã có nguồn)

| Trên hình | Giá trị | Nguồn | Ghi chú |
|---|---|---|---|
| GDP Việt Nam 2023 | +5,05% | Tổng cục Thống kê, 29/12/2023 – [VnExpress](https://vnexpress.net/gdp-nam-2023-tang-5-05-4694770.html), [nso.gov.vn](https://www.nso.gov.vn/?p=47433) | số ước tính tại thời điểm công bố |
| GDP Việt Nam 2024 | +7,09% | Tổng cục Thống kê – [VnExpress](https://vnexpress.net/gdp-nam-2024-tang-7-09-4835950.html), [Tạp chí Ngân hàng](https://tapchinganhang.gov.vn/nam-2024-nen-kinh-te-viet-nam-dat-muc-tang-truong-709-15095-15095.html) | |
| GDP Việt Nam 2025 | +8,02%, cao thứ 2 giai đoạn 2011–2025 (chỉ sau 2022) | Cục Thống kê (Bộ Tài chính), 05/01/2026 – [VnEconomy](https://vneconomy.vn/tang-truong-gdp-2025-dat-802-quy-mo-nen-kinh-te-vuot-moc-514-ty-usd.htm), [Nhà Đầu Tư](https://nhadautu.vn/gdp-viet-nam-tang-802-nam-2025-binh-quan-dau-nguoi-dat-5026-usd-d102080.html) | |
| Quy mô GDP 2025 | ~514 tỷ USD | như trên | |
| GRDP TP.HCM 2025 | +8,03% (không tính dầu khí) | [SGGP](https://www.sggp.org.vn/tang-truong-grdp-tphcm-nam-2025-dat-803-post832217.html) | |
| TP.HCM / GDP cả nước | "≈ 1/4" (vòng vẽ 23,3%) | nguồn ghi 23,5% và 23,11% → **dùng cách nói tròn "≈ 1/4"** cho khỏi sai | |
| Thiên Khôi Group | thành lập 2020 · 7 chi nhánh · 31 trụ sở · 40.000+ nhà tư vấn, môi giới, nhà đầu tư dùng hệ sinh thái | Thiên Khôi Group công bố, đăng trên [VnEconomy](https://vneconomy.vn/thien-khoi-group-but-pha-vao-top-5-cong-nghe-bat-dong-san.htm) | **số do doanh nghiệp tự công bố** – Dũng đối chiếu với tài liệu nội bộ trước khi đăng |
| Giải thưởng | TOP 5 đơn vị dẫn đầu phát triển nền tảng công nghệ cho môi giới BĐS & khách hàng – VARS Awards 2026 (TKG Proptech, Thiên Khôi HRM) | [Nhân Dân](https://nhandan.vn/thien-khoi-group-lot-top-5-proptech-2026-voi-he-sinh-thai-cong-nghe-thuc-day-minh-bach-hoa-thi-truong-post974257.html), [Dân Trí](https://dantri.com.vn/kinh-doanh/thien-khoi-group-khang-dinh-dau-an-cong-nghe-tai-vars-awards-2026-20260706152711267.htm), [thienkhoi.com](https://thienkhoi.com/tin-tuc-su-kien/tin-tuc/thien-khoi-group-top-5-don-vi-dan-dau-phat-trien-nen-tang-cong-nghe-cho-moi-gioi-bat-dong-san-va-khach-hang-tai-vars-awards-2026) | |
| Khối Hoàng Anh | 2024 Phòng Hoàng Anh ra đời · 16.10.2025 tròn 1 tuổi · 2026 nâng cấp thành Khối Hoàng Anh Hồ Chí Minh, Giám đốc Khối Bà Đặng Thu Hương | Dũng cung cấp (tin nhắn + ảnh sự kiện: băng rôn "Mừng sinh nhật Phòng Hoàng Anh tròn 1 tuổi 16.10.2025", màn hình "Chúc mừng Giám đốc Khối – Bà Đặng Thu Hương – Khối Hoàng Anh Hồ Chí Minh") | |
| Biểu đồ phát triển C6 | cột cao theo **tỷ lệ định tính** (Phòng → Khối), trục dọc chỉ ghi "QUY MÔ ↑", **không có con số** | chưa có số liệu thật | khi Dũng gửi số (vd số thành viên từng mốc) → điền `soLieu={[a, b, c]}` và `donVi` trong `src/ThienKhoiHoangAnh.tsx`: cột tự cao theo số, số chạy hiện trên mỗi cột |

Máy chủ dựng không truy cập trực tiếp được thienkhoi.com (mạng môi trường chặn), nên số liệu Thiên Khôi lấy qua báo chính thống trích từ trang này; tra ngày 26/10/2026.

## 6. Tham chiếu mẫu viral

- Cấu trúc TikTok: chữ động xuất hiện ngay khung đầu (80,2% clip viral có caption, 78,6% caption động – [OpusClip, 2026](https://www.opus.pro/blog/anatomy-of-a-viral-tiktok-2026)), số liệu được "hé lộ dần" bằng animation (29/33 biểu đồ dữ liệu trên TikTok có chuyển động – [Online Journalism Blog, 08/2026](https://onlinejournalismblog.com/2026/08/10/how-data-journalism-is-done-on-tiktok-six-key-takeaways-from-watching-50-videos/)), một thông điệp chính, < 60 s.
- Trong repo này (`prompts/`): nhà tự mọc theo giai đoạn `cryptowluha-060792`, `mrkindey-267498`; phim sản phẩm Remotion toàn code `daniel-haida-636937`, `helloshiva0801-438284`; explainer Remotion `tony-tt-872147`.

## 7. Chấm 5 tư duy (editor-5-mindsets) – tự chấm, chờ Dũng duyệt

| Tư duy | Điểm | Ghi chú |
|---|---:|---|
| Kể chuyện | 18/20 | Câu hỏi → con số → TP.HCM → lặng → drop thương hiệu → hành trình Khối → tác giả → CTA |
| Bố cục | 18/20 | Chữ ở vùng trời trống, không đè mặt người; 1 cụm chữ chính mỗi lúc |
| Motion | 18/20 | Cắt đúng phách, 6 kiểu chuyển cảnh không lặp, 8 kiểu chữ ≤ 2 lần |
| Màu | 18/20 | Hoàng hôn → đêm (drop) → navy vàng → giờ xanh; vàng + đỏ Thiên Khôi làm điểm nhấn |
| Sound design | 18/20 | 35 SFX CC0 khớp chữ, ≤ 2 SFX/giây; cần Dũng nghe duyệt |
| **Tổng** | **90/100** | đạt cổng ≥ 90, không mục nào < 17 |

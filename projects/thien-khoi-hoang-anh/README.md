# Thiên Khôi Group × Khối Hoàng Anh – Video Motion Graphics 9:16

Video TikTok 31 giây do **Hoàng Dũng – Khối Hoàng Anh** dựng bằng Claude + Remotion:
Motion Graphics, mô hình 3D đất sét viết bằng code (raymarching SDF), số liệu kinh tế có nguồn, hành trình Phòng → Khối Hoàng Anh (2024–2026), cắt theo phách bài nhạc TikTok.

- Kịch bản, bảng chữ/SFX/mốc, nguồn số liệu: [`KICH_BAN.md`](KICH_BAN.md)
- Composition chính: `ThienKhoi-HoangAnh-9x16` (1080×1920, 30 fps, 930 khung)

## 1. Cài lần đầu (Windows, đã có Node.js 22)

```powershell
cd <thư mục repo>\projects\thien-khoi-hoang-anh
npm i
```

Chép **4 ảnh + 1 nhạc** Dũng đã gửi vào `public/` đúng tên (không có trên GitHub vì là ảnh thành viên và nhạc có bản quyền):

| Đặt vào | Tên file |
|---|---|
| `public/assets/` | `hoang-dung-chan-dung.jpg`, `khoi-hoang-anh-giam-doc-khoi.jpg`, `phong-hoang-anh-1-tuoi.jpg`, `phong-hoang-anh-1-tuoi-2.jpg` |
| `public/audio/` | `nhac-nen-tiktok.mp3` |

Chi tiết ảnh nào là file nào: `public/assets/README.md`.

## 2. Mở bàn dựng (Remotion Studio)

```powershell
npx remotion studio
```

Chọn `ThienKhoi-HoangAnh-9x16`. Mỗi lớp chữ là một clip riêng trên track **MG** (tên tiếng Việt, ví dụ "MG Số chạy 8,02% (T2)"): bấm vào clip để sửa chữ, vị trí, khung bắt đầu ngay trong Studio. Mỗi SFX là một clip riêng trên track **SFX**. Nền 3D xem nhanh ở `Nen-3D / Nen3D-XemNhanh`.

## 3. Xuất video

Máy có card đồ hoạ render 3D nhanh hơn nhiều so với máy chủ (thêm `--gl=angle`).

```powershell
# Xem trước 720p
npm run xem-truoc

# Bản cuối H.265 sau khi duyệt, chuẩn âm lượng -14 LUFS, lưu vào thư mục video của Dũng
npm run xuat-ban
ffmpeg -i _tmp/master.mp4 -c:v copy -tag:v hvc1 -af loudnorm=I=-14:TP=-1:LRA=11 -c:a aac -b:a 320k -ar 48000 -movflags +faststart "C:\Users\Admin\HDRE AI\Videos\HDRE_ThienKhoi-HoangAnh_9x16_30fps_H265_v01.mp4"
```

Máy không có GPU / máy chủ Linux: thêm `--gl=swangle` (chậm ~3 giây/khung).

## 4. Sửa nhanh hay gặp

| Muốn đổi | Sửa ở |
|---|---|
| Chữ, số, vị trí từng lớp chữ | Studio → track MG, hoặc `src/ThienKhoiHoangAnh.tsx` |
| Mốc hành trình Khối Hoàng Anh, ảnh | props của `CanhHanhTrinh` trong `src/ThienKhoiHoangAnh.tsx` |
| Góc máy / tốc độ mọc nhà 3D | `src/scenes/Backgrounds3D.tsx` |
| Hình khối, màu, ánh sáng 3D | `src/three/clayShader.ts` |
| Cỡ chữ, màu vàng, đỏ Thiên Khôi | `src/mg/tk/style.ts` |
| SFX | `public/sfx/` + bảng `public/sfx/sfx_index.csv` |

Kiểm lỗi sau khi sửa: `npm run kiem-tra`. Xuất ảnh kiểm tra nhiều khung: `node scripts/qa-stills.mjs ThienKhoi-HoangAnh-9x16 _tmp/qa 0,100,300,450,700,900`.

## 5. Bản quyền tài nguyên

- SFX: CC0 1.0 (Kenney; Ben Burnes "BB" packs qua `lavenderdotpet/CC0-Public-Domain-Sounds`) – nguồn từng file trong `public/sfx/sfx_index.csv`.
- Font Montserrat: SIL Open Font License 1.1 (`public/fonts/OFL.txt`), để cục bộ nên render được khi không có mạng.
- 3D, chữ động, chuyển cảnh: viết bằng code trong dự án.
- Nhạc TikTok và ảnh thành viên: của chủ sở hữu, chỉ dùng trên máy Dũng.

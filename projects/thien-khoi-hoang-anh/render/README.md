# Thư mục render – Thiên Khôi × Khối Hoàng Anh

## Có gì trong thư mục

| File | Nội dung |
|---|---|
| `HDRE_ThienKhoi-HoangAnh_9x16_30fps_v01.mp4` | Bản duyệt v01: 31 s, 1080×1920, 30 fps, H.264, âm lượng −14 LUFS |
| `HDRE_ThienKhoi-HoangAnh_anh-bia.jpg` | Ảnh bìa gợi ý (khung "8,02%") |
| `xem-truoc/` | Ảnh tổng hợp các khung để duyệt nhanh (3D, biểu đồ Khối Hoàng Anh, kết quả, kiểm tra 16 khung) |
| `1-mo-ban-dung.bat` | Mở Remotion Studio để xem/sửa chữ, vị trí, mốc thời gian |
| `2-xem-truoc-720p.bat` | Xuất bản xem trước 720p vào `xem-truoc/` |
| `3-xuat-ban-cuoi-H265.bat` | Xuất bản cuối H.265, chuẩn −14 LUFS, lưu vào `C:\Users\Admin\HDRE AI\Videos` |

Video, ảnh bìa và ảnh xem trước **không đưa lên GitHub** (repo đang công khai; video có ảnh thành viên Khối và nhạc TikTok có bản quyền). Tải chúng từ ứng dụng Claude, hoặc tự xuất lại trên máy bằng các file `.bat`.

## Xuất video trên máy Windows

1. Chép 4 ảnh + 1 nhạc vào `public/assets/` và `public/audio/` đúng tên (xem README trong hai thư mục đó). File `.bat` tự kiểm và báo nếu thiếu.
2. Bấm đúp `2-xem-truoc-720p.bat` để xem nhanh, hoặc `3-xuat-ban-cuoi-H265.bat` cho bản đăng.
3. Lần đầu chạy, file `.bat` tự cài thư viện (`npm i`, cần Node.js 22). Không cần cài ffmpeg: dùng ffmpeg có sẵn trong Remotion.

Máy có card đồ hoạ render 3D nhanh (`--gl=angle`); không có thì file `.bat` tự chuyển sang chế độ CPU (`--gl=swangle`, chậm, khoảng 3–6 giây/khung).

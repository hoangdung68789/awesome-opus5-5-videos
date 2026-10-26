import { continueRender, delayRender, staticFile } from "remotion";

// Bộ nhận diện Hoàng Dũng Real Estate.
// Khi dự án có `brand.txt`, cập nhật các giá trị dưới đây theo file đó.
// KHÔNG tự điền số điện thoại: chỉ lấy từ brand.txt hoặc Dũng cung cấp.

// Montserrat (SIL OFL 1.1) để cục bộ trong public/fonts: render được cả khi máy
// không có mạng; đủ dấu tiếng Việt (bộ vietnamese + latin + latin-ext).
const MONTSERRAT_SUBSETS = [
  { file: "montserrat-italic-vietnamese.woff2", style: "italic", unicodeRange: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB" },
  { file: "montserrat-italic-latin-ext.woff2", style: "italic", unicodeRange: "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF" },
  { file: "montserrat-italic-latin.woff2", style: "italic", unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD" },
  { file: "montserrat-normal-vietnamese.woff2", style: "normal", unicodeRange: "U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB" },
  { file: "montserrat-normal-latin-ext.woff2", style: "normal", unicodeRange: "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF" },
  { file: "montserrat-normal-latin.woff2", style: "normal", unicodeRange: "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD" },
] as const;

export const fontFamily = "Montserrat HDRE";

if (typeof document !== "undefined") {
  const handle = delayRender("Tải font Montserrat cục bộ");
  Promise.all(
    MONTSERRAT_SUBSETS.map((f) => {
      const face = new FontFace(fontFamily, `url(${staticFile(`fonts/${f.file}`)}) format("woff2")`, {
        weight: "300 900",
        style: f.style,
        unicodeRange: f.unicodeRange,
        display: "block",
      });
      document.fonts.add(face);
      return face.load();
    }),
  )
    .then(() => continueRender(handle))
    .catch((err) => {
      console.error(err);
      continueRender(handle);
    });
}

export const BRAND = {
  name: "HOÀNG DŨNG",
  subtitle: "REAL ESTATE",
};

export const GOLD = {
  deep: "#8a6a24",
  base: "#c9a24a",
  light: "#f3dc8a",
  edge: "#e6c066",
};

export const COLORS = {
  text: "#ffffff",
  card: "rgba(8, 8, 10, 0.62)",
  cardBorder: "rgba(201, 162, 74, 0.55)",
  // MG09 điểm trừ dùng màu trung tính, không đỏ báo động.
  neutral: "#c9ced6",
  positive: "#7fd6a2",
};

export const GOLD_TEXT_GRADIENT =
  "linear-gradient(100deg, #8a6a24 0%, #c9a24a 25%, #f3dc8a 45%, #fff3c4 50%, #f3dc8a 55%, #c9a24a 75%, #8a6a24 100%)";

// Vùng an toàn TikTok/Reels cho khung 1080x1920: tránh mép trên, dải chú thích
// phía dưới và cột nút bên phải.
export const SAFE_9x16 = { top: 140, bottom: 420, left: 80, right: 160 };

// Logo vẽ lại dạng nét từ logo gốc (không gian 1008x1071, mặt đất ở y = 654).
export const LOGO_VIEWBOX = "280 120 464 560";
export const LOGO_PATHS = [
  "M404 318 H301 V654 H414 V298 L487 236",
  "M487 236 V146 L565 212 V455",
  "M487 236 V345 L530 300 V654",
  "M532 432 L608 492 V654 H722 V318 H588",
];

export const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

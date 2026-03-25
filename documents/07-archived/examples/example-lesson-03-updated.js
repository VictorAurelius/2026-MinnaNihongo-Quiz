// EXAMPLE: Lesson 03 sau khi update với supplementary vocabulary

const LESSON_03_DATA = {
    lessonNumber: 3,
    title: "ここは ～です (Nơi này là ~)",
    vocabulary: [
      // ===== EXISTING VOCABULARY (thêm type: "main") =====
      {
        japanese: "ここ",
        kana: "ここ",
        vietnamese: "ở đây",
        english: "here",
        type: "main",
        example: "ここは しょくどうです。"
      },
      {
        japanese: "そこ",
        kana: "そこ",
        vietnamese: "ở đó",
        english: "there",
        type: "main",
        example: "トイレは そこです。"
      },
      // ... (các từ hiện tại khác)

      // ===== MISSING MAIN VOCABULARY =====
      {
        japanese: "自動販売機（じどうはんばいき）",
        kana: "じどうはんばいき",
        vietnamese: "máy bán hàng tự động",
        english: "vending machine",
        type: "main",
        example: "じどうはんばいきは あそこです。"
      },

      // ===== SUPPLEMENTARY VOCABULARY (Countries & Cities) =====
      {
        japanese: "イタリア",
        kana: "イタリア",
        vietnamese: "Ý, Italia",
        english: "Italy",
        type: "supplementary",
        example: "マリアさんは イタリアじんです。"
      },
      {
        japanese: "スイス",
        kana: "スイス",
        vietnamese: "Thụy Sĩ",
        english: "Switzerland",
        type: "supplementary",
        example: "この とけいは スイスの とけいです。"
      },
      {
        japanese: "フランス",
        kana: "フランス",
        vietnamese: "Pháp",
        english: "France",
        type: "supplementary",
        example: "この ワインは フランスの ワインです。"
      },
      {
        japanese: "ジャカルタ",
        kana: "ジャカルタ",
        vietnamese: "Jakarta (thủ đô Indonesia)",
        english: "Jakarta",
        type: "supplementary",
        example: "かいしゃは ジャカルタに あります。"
      },
      {
        japanese: "バンコク",
        kana: "バンコク",
        vietnamese: "Bangkok (thủ đô Thái Lan)",
        english: "Bangkok",
        type: "supplementary",
        example: "バンコクは タイの しゅとです。"
      },
      {
        japanese: "ベルリン",
        kana: "ベルリン",
        vietnamese: "Berlin (thủ đô Đức)",
        english: "Berlin",
        type: "supplementary",
        example: "ベルリンは ドイツの しゅとです。"
      },
      {
        japanese: "新大阪（しんおおさか）",
        kana: "しんおおさか",
        vietnamese: "Shin-Osaka (ga tàu)",
        english: "Shin-Osaka (station)",
        type: "supplementary",
        example: "しんおおさかえきは どこですか。"
      }
    ],
    grammar: [
      // ... (grammar giữ nguyên)
    ]
  };

// ===== NOTES =====
// - Thêm 1 từ main vocabulary: 自動販売機
// - Thêm 7 từ supplementary vocabulary: các quốc gia & thành phố
// - Thêm field "type" cho tất cả từ: "main" hoặc "supplementary"
// - Có thể filter vocab list theo type nếu cần:
//   - Main only: vocabulary.filter(v => v.type === "main")
//   - All: vocabulary (default)
//   - Supplementary only: vocabulary.filter(v => v.type === "supplementary")

// Minna no Nihongo — Lesson 03: ここは ～です (Nơi này là ~)
const LESSON_03_DATA =   {
    lessonNumber: 3,
    title: "ここは ～です (Nơi này là ~)",
    vocabulary: [
      {
        japanese: "ここ",
        kana: "ここ",
        vietnamese: "ở đây",
        english: "here",
        example: "ここは しょくどうです。"
      },
      {
        japanese: "そこ",
        kana: "そこ",
        vietnamese: "ở đó",
        english: "there",
        example: "トイレは そこです。"
      },
      {
        japanese: "あそこ",
        kana: "あそこ",
        vietnamese: "ở kia",
        english: "over there",
        example: "エレベーターは あそこです。"
      },
      {
        japanese: "どこ",
        kana: "どこ",
        vietnamese: "ở đâu",
        english: "where",
        example: "トイレは どこですか。"
      },
      {
        japanese: "こちら",
        kana: "こちら",
        vietnamese: "phía này (lịch sự)",
        english: "this way (polite)",
        example: ""
      },
      {
        japanese: "そちら",
        kana: "そちら",
        vietnamese: "phía đó (lịch sự)",
        english: "that way (polite)",
        example: ""
      },
      {
        japanese: "あちら",
        kana: "あちら",
        vietnamese: "phía kia (lịch sự)",
        english: "that way over there (polite)",
        example: ""
      },
      {
        japanese: "どちら",
        kana: "どちら",
        vietnamese: "phía nào (lịch sự)",
        english: "which way (polite)",
        example: "おくには どちらですか。"
      },
      {
        japanese: "教室（きょうしつ）",
        kana: "きょうしつ",
        vietnamese: "phòng học",
        english: "classroom",
        example: ""
      },
      {
        japanese: "食堂（しょくどう）",
        kana: "しょくどう",
        vietnamese: "nhà ăn, canteen",
        english: "dining hall, cafeteria",
        example: "しょくどうは 2かいです。"
      },
      {
        japanese: "事務所（じむしょ）",
        kana: "じむしょ",
        vietnamese: "văn phòng",
        english: "office",
        example: ""
      },
      {
        japanese: "会議室（かいぎしつ）",
        kana: "かいぎしつ",
        vietnamese: "phòng họp",
        english: "conference room",
        example: ""
      },
      {
        japanese: "受付（うけつけ）",
        kana: "うけつけ",
        vietnamese: "quầy lễ tân",
        english: "reception",
        example: "うけつけは 1かいです。"
      },
      {
        japanese: "ロビー",
        kana: "ロビー",
        vietnamese: "sảnh",
        english: "lobby",
        example: ""
      },
      {
        japanese: "部屋（へや）",
        kana: "へや",
        vietnamese: "phòng",
        english: "room",
        example: ""
      },
      {
        japanese: "トイレ",
        kana: "トイレ",
        vietnamese: "nhà vệ sinh",
        english: "toilet, restroom",
        example: "トイレは どこですか。"
      },
      {
        japanese: "お手洗い（おてあらい）",
        kana: "おてあらい",
        vietnamese: "nhà vệ sinh (lịch sự)",
        english: "restroom (polite)",
        example: ""
      },
      {
        japanese: "階段（かいだん）",
        kana: "かいだん",
        vietnamese: "cầu thang",
        english: "stairs",
        example: ""
      },
      {
        japanese: "エレベーター",
        kana: "エレベーター",
        vietnamese: "thang máy",
        english: "elevator",
        example: "エレベーターは あそこです。"
      },
      {
        japanese: "エスカレーター",
        kana: "エスカレーター",
        vietnamese: "thang cuốn",
        english: "escalator",
        example: ""
      },
      {
        japanese: "お国（おくに）",
        kana: "おくに",
        vietnamese: "đất nước (lịch sự)",
        english: "country (polite)",
        example: "おくには どちらですか。"
      },
      {
        japanese: "会社（かいしゃ）",
        kana: "かいしゃ",
        vietnamese: "công ty",
        english: "company",
        example: ""
      },
      {
        japanese: "うち",
        kana: "うち",
        vietnamese: "nhà",
        english: "home, house",
        example: ""
      },
      {
        japanese: "電話（でんわ）",
        kana: "でんわ",
        vietnamese: "điện thoại",
        english: "telephone",
        example: "でんわは あそこです。"
      },
      {
        japanese: "靴（くつ）",
        kana: "くつ",
        vietnamese: "giày",
        english: "shoes",
        example: ""
      },
      {
        japanese: "ネクタイ",
        kana: "ネクタイ",
        vietnamese: "cà vạt",
        english: "necktie",
        example: ""
      },
      {
        japanese: "ワイン",
        kana: "ワイン",
        vietnamese: "rượu vang",
        english: "wine",
        example: ""
      },
      {
        japanese: "売り場（うりば）",
        kana: "うりば",
        vietnamese: "quầy bán hàng",
        english: "department, counter",
        example: "くつの うりばは どこですか。"
      },
      {
        japanese: "地下（ちか）",
        kana: "ちか",
        vietnamese: "tầng hầm",
        english: "basement",
        example: ""
      },
      {
        japanese: "～階（～かい / ～がい）",
        kana: "～かい",
        vietnamese: "tầng ~",
        english: "~ floor",
        example: "しょくどうは 2かいです。"
      },
      {
        japanese: "何階（なんがい）",
        kana: "なんがい",
        vietnamese: "tầng mấy",
        english: "what floor",
        example: "うけつけは なんがいですか。"
      },
      {
        japanese: "～円（～えん）",
        kana: "～えん",
        vietnamese: "~ yên",
        english: "~ yen",
        example: "これは 500えんです。"
      },
      {
        japanese: "いくら",
        kana: "いくら",
        vietnamese: "bao nhiêu tiền",
        english: "how much",
        example: "この かばんは いくらですか。"
      },
      {
        japanese: "百（ひゃく）",
        kana: "ひゃく",
        vietnamese: "trăm",
        english: "hundred",
        example: ""
      },
      {
        japanese: "千（せん）",
        kana: "せん",
        vietnamese: "nghìn",
        english: "thousand",
        example: ""
      },
      {
        japanese: "万（まん）",
        kana: "まん",
        vietnamese: "vạn, mười nghìn",
        english: "ten thousand",
        example: ""
      }
    ],
    grammar: [
      {
        pattern: "ここ/そこ/あそこ は ～です",
        vietnamese: "Đây/đó/kia là ~",
        english: "Here/There is ~",
        explanation: "Đại từ chỉ định địa điểm. ここ (gần người nói), そこ (gần người nghe), あそこ (xa cả hai).",
        examples: [
          {
            japanese: "ここは しょくどうです。",
            vietnamese: "Đây là nhà ăn.",
            english: "This place is a dining hall."
          },
          {
            japanese: "そこは トイレです。",
            vietnamese: "Đó là nhà vệ sinh.",
            english: "That place is a restroom."
          },
          {
            japanese: "あそこは エレベーターです。",
            vietnamese: "Kia là thang máy.",
            english: "That place over there is an elevator."
          }
        ]
      },
      {
        pattern: "～は どこですか",
        vietnamese: "~ ở đâu?",
        english: "Where is ~?",
        explanation: "Câu hỏi về vị trí. 'どこ' nghĩa là 'ở đâu'.",
        examples: [
          {
            japanese: "トイレは どこですか。",
            vietnamese: "Nhà vệ sinh ở đâu?",
            english: "Where is the restroom?"
          },
          {
            japanese: "でんわは どこですか。",
            vietnamese: "Điện thoại ở đâu?",
            english: "Where is the telephone?"
          }
        ]
      },
      {
        pattern: "～は ～かいです",
        vietnamese: "~ ở tầng ~",
        english: "~ is on the ~ floor",
        explanation: "Chỉ số tầng. かい (階) nghĩa là 'tầng'.",
        examples: [
          {
            japanese: "しょくどうは 1かいです。",
            vietnamese: "Nhà ăn ở tầng 1.",
            english: "The dining hall is on the 1st floor."
          },
          {
            japanese: "かいぎしつは 3かいです。",
            vietnamese: "Phòng họp ở tầng 3.",
            english: "The meeting room is on the 3rd floor."
          }
        ]
      },
      {
        pattern: "～の ～",
        vietnamese: "~ của/ở ~",
        english: "~ of ~, ~ in/at ~",
        explanation: "Trợ từ 'の' kết nối tên địa điểm với tổ chức/công ty.",
        examples: [
          {
            japanese: "この エレベーターは IMCの エレベーターです。",
            vietnamese: "Thang máy này là thang máy của IMC.",
            english: "This elevator is IMC's elevator."
          },
          {
            japanese: "あの きょうしつは にほんごの きょうしつです。",
            vietnamese: "Lớp học kia là lớp học tiếng Nhật.",
            english: "That classroom is a Japanese classroom."
          }
        ]
      }
    ]
  };

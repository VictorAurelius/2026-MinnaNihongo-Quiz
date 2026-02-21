// Minna no Nihongo — Lesson 11: 助数詞・家族 (Trợ số từ, gia đình)
const LESSON_11_DATA =   {
    lessonNumber: 11,
    title: "助数詞・家族 (Trợ số từ, gia đình)",
    vocabulary: [
      {
        japanese: "一つ（ひとつ）",
        kana: "ひとつ",
        vietnamese: "một (cái/quả)",
        english: "One (general counter)",
        example: "りんごを　一つ　ください。"
      },
      {
        japanese: "二つ（ふたつ）",
        kana: "ふたつ",
        vietnamese: "hai (cái/quả)",
        english: "Two (general counter)",
        example: ""
      },
      {
        japanese: "三つ（みっつ）",
        kana: "みっつ",
        vietnamese: "ba (cái/quả)",
        english: "Three (general counter)",
        example: ""
      },
      {
        japanese: "四つ（よっつ）",
        kana: "よっつ",
        vietnamese: "bốn (cái/quả)",
        english: "Four (general counter)",
        example: ""
      },
      {
        japanese: "五つ（いつつ）",
        kana: "いつつ",
        vietnamese: "năm (cái/quả)",
        english: "Five (general counter)",
        example: ""
      },
      {
        japanese: "六つ（むっつ）",
        kana: "むっつ",
        vietnamese: "sáu (cái/quả)",
        english: "Six (general counter)",
        example: ""
      },
      {
        japanese: "七つ（ななつ）",
        kana: "ななつ",
        vietnamese: "bảy (cái/quả)",
        english: "Seven (general counter)",
        example: ""
      },
      {
        japanese: "八つ（やっつ）",
        kana: "やっつ",
        vietnamese: "tám (cái/quả)",
        english: "Eight (general counter)",
        example: ""
      },
      {
        japanese: "九つ（ここのつ）",
        kana: "ここのつ",
        vietnamese: "chín (cái/quả)",
        english: "Nine (general counter)",
        example: ""
      },
      {
        japanese: "十（とお）",
        kana: "とお",
        vietnamese: "mười (cái/quả)",
        english: "Ten (general counter)",
        example: ""
      },
      {
        japanese: "いくつ",
        kana: "いくつ",
        vietnamese: "bao nhiêu (cái)",
        english: "How many",
        example: "りんごを　いくつ　買いましたか。"
      },
      {
        japanese: "〜人（〜にん）",
        kana: "にん",
        vietnamese: "~ người (trợ số từ)",
        english: "Counter for people",
        example: "家族は　4人です。"
      },
      {
        japanese: "〜台（〜だい）",
        kana: "だい",
        vietnamese: "~ chiếc (máy, xe)",
        english: "Counter for machines/vehicles",
        example: "車が　3台　あります。"
      },
      {
        japanese: "〜枚（〜まい）",
        kana: "まい",
        vietnamese: "~ tờ, tấm (đồ mỏng)",
        english: "Counter for flat objects",
        example: "切手を　5枚　ください。"
      },
      {
        japanese: "〜回（〜かい）",
        kana: "かい",
        vietnamese: "~ lần",
        english: "Counter for times/occasions",
        example: "1週間に　2回　テニスを　します。"
      },
      {
        japanese: "りんご",
        kana: "りんご",
        vietnamese: "quả táo",
        english: "Apple",
        example: ""
      },
      {
        japanese: "みかん",
        kana: "みかん",
        vietnamese: "quả quýt",
        english: "Mandarin orange",
        example: ""
      },
      {
        japanese: "サンドイッチ",
        kana: "サンドイッチ",
        vietnamese: "bánh sandwich",
        english: "Sandwich",
        example: ""
      },
      {
        japanese: "カレー",
        kana: "カレー",
        vietnamese: "cà ri",
        english: "Curry",
        example: ""
      },
      {
        japanese: "アイスクリーム",
        kana: "アイスクリーム",
        vietnamese: "kem",
        english: "Ice cream",
        example: ""
      },
      {
        japanese: "切手（きって）",
        kana: "きって",
        vietnamese: "tem",
        english: "Stamp",
        example: "80円の　切手を　5枚　ください。"
      },
      {
        japanese: "葉書（はがき）",
        kana: "はがき",
        vietnamese: "bưu thiếp",
        english: "Postcard",
        example: ""
      },
      {
        japanese: "封筒（ふうとう）",
        kana: "ふうとう",
        vietnamese: "phong bì",
        english: "Envelope",
        example: ""
      },
      {
        japanese: "速達（そくたつ）",
        kana: "そくたつ",
        vietnamese: "thư chuyển phát nhanh",
        english: "Express mail",
        example: ""
      },
      {
        japanese: "書留（かきとめ）",
        kana: "かきとめ",
        vietnamese: "thư bảo đảm",
        english: "Registered mail",
        example: ""
      },
      {
        japanese: "航空便（こうくうびん）",
        kana: "こうくうびん",
        vietnamese: "thư hàng không",
        english: "Airmail",
        example: ""
      },
      {
        japanese: "船便（ふなびん）",
        kana: "ふなびん",
        vietnamese: "thư đường biển",
        english: "Sea mail, surface mail",
        example: ""
      },
      {
        japanese: "両親（りょうしん）",
        kana: "りょうしん",
        vietnamese: "bố mẹ, song thân",
        english: "Parents",
        example: ""
      },
      {
        japanese: "兄弟（きょうだい）",
        kana: "きょうだい",
        vietnamese: "anh chị em",
        english: "Siblings",
        example: "兄弟が　いますか。"
      },
      {
        japanese: "兄（あに）",
        kana: "あに",
        vietnamese: "anh trai (của mình)",
        english: "My older brother",
        example: ""
      },
      {
        japanese: "姉（あね）",
        kana: "あね",
        vietnamese: "chị gái (của mình)",
        english: "My older sister",
        example: ""
      },
      {
        japanese: "弟（おとうと）",
        kana: "おとうと",
        vietnamese: "em trai (của mình)",
        english: "My younger brother",
        example: ""
      },
      {
        japanese: "妹（いもうと）",
        kana: "いもうと",
        vietnamese: "em gái (của mình)",
        english: "My younger sister",
        example: ""
      },
      {
        japanese: "外国（がいこく）",
        kana: "がいこく",
        vietnamese: "nước ngoài",
        english: "Foreign country",
        example: ""
      },
      {
        japanese: "外国人（がいこくじん）",
        kana: "がいこくじん",
        vietnamese: "người nước ngoài",
        english: "Foreigner",
        example: ""
      },
      {
        japanese: "どのくらい",
        kana: "どのくらい",
        vietnamese: "bao lâu, bao nhiêu",
        english: "How long, how much",
        example: "どのくらい　かかりますか。"
      },
      {
        japanese: "〜週間（〜しゅうかん）",
        kana: "しゅうかん",
        vietnamese: "~ tuần",
        english: "~ week(s)",
        example: "2週間　日本に　います。"
      },
      {
        japanese: "〜か月（〜かげつ）",
        kana: "かげつ",
        vietnamese: "~ tháng",
        english: "~ month(s)",
        example: "3か月　日本語を　勉強しました。"
      },
      {
        japanese: "〜年（〜ねん）",
        kana: "ねん",
        vietnamese: "~ năm",
        english: "~ year(s)",
        example: ""
      }
    ],
    grammar: [
      {
        pattern: "〜枚（まい）、〜本（ほん）、〜個（こ）",
        vietnamese: "Trợ số từ: ~ tờ/tấm, ~ cây/chai, ~ cái",
        english: "Counters: flat objects, long objects, small objects",
        explanation: "Trợ số từ dùng để đếm các loại đồ vật khác nhau. 枚 đếm vật mỏng phẳng (giấy, tem), 本 đếm vật dài (bút, chai), 個 đếm vật nhỏ tròn (trái cây).",
        examples: [
          {
            japanese: "切手を　5枚　ください。",
            vietnamese: "Cho tôi 5 cái tem.",
            english: "Please give me 5 stamps."
          },
          {
            japanese: "ペンが　3本　あります。",
            vietnamese: "Có 3 cây bút.",
            english: "There are 3 pens."
          },
          {
            japanese: "りんごを　2個　買いました。",
            vietnamese: "Tôi đã mua 2 quả táo.",
            english: "I bought 2 apples."
          }
        ]
      },
      {
        pattern: "いくつ / 何〜（なん〜）",
        vietnamese: "Bao nhiêu (tuổi/cái), bao nhiêu ~",
        english: "How many, how old",
        explanation: "'いくつ' hỏi số lượng chung hoặc tuổi (không chính thức). '何〜' kết hợp với trợ số từ để hỏi số lượng cụ thể (何枚、何本、何個).",
        examples: [
          {
            japanese: "りんごを　いくつ　買いましたか。",
            vietnamese: "Bạn đã mua bao nhiêu quả táo?",
            english: "How many apples did you buy?"
          },
          {
            japanese: "何枚　ありますか。",
            vietnamese: "Có bao nhiêu tờ?",
            english: "How many (sheets) are there?"
          },
          {
            japanese: "お子さんは　おいくつですか。",
            vietnamese: "Con bạn bao nhiêu tuổi?",
            english: "How old is your child?"
          }
        ]
      },
      {
        pattern: "家族の呼び方",
        vietnamese: "Cách gọi thành viên gia đình",
        english: "Family terms (humble vs. respectful)",
        explanation: "Tiếng Nhật phân biệt cách gọi gia đình mình (khiêm tốn) và gia đình người khác (tôn trọng). VD: 兄 (anh trai mình) vs お兄さん (anh trai người khác).",
        examples: [
          {
            japanese: "兄は　会社員です。",
            vietnamese: "Anh trai tôi là nhân viên công ty.",
            english: "My older brother is a company employee."
          },
          {
            japanese: "お兄さんは　何人　いますか。",
            vietnamese: "Bạn có mấy anh trai?",
            english: "How many older brothers do you have?"
          },
          {
            japanese: "妹が　2人　います。",
            vietnamese: "Tôi có 2 em gái.",
            english: "I have 2 younger sisters."
          }
        ]
      },
      {
        pattern: "〜人（〜にん）",
        vietnamese: "~ người (đếm người)",
        english: "Counter for people",
        explanation: "Trợ số từ đếm người. Chú ý: 1人 (ひとり), 2人 (ふたり), 3人 (さんにん), 4人 (よにん). Hỏi: 何人 (なんにん)。",
        examples: [
          {
            japanese: "家族は　何人ですか。",
            vietnamese: "Gia đình bạn có mấy người?",
            english: "How many people are in your family?"
          },
          {
            japanese: "家族は　4人です。",
            vietnamese: "Gia đình tôi có 4 người.",
            english: "There are 4 people in my family."
          },
          {
            japanese: "友達が　3人　来ます。",
            vietnamese: "Có 3 người bạn sẽ đến.",
            english: "Three friends will come."
          }
        ]
      }
    ]
  };

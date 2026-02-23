// Minna no Nihongo — Lesson 10: あります・います (Sự tồn tại, vị trí)
const LESSON_10_DATA =   {
    lessonNumber: 10,
    title: "あります・います (Sự tồn tại, vị trí)",
    vocabulary: [
      {
        japanese: "います",
        kana: "います",
        vietnamese: "có, ở (người, động vật)",
        english: "To exist (living things)",
        example: "部屋に　猫が　います。"
      },
      {
        japanese: "あります",
        kana: "あります",
        vietnamese: "có, ở (đồ vật)",
        english: "To exist (non-living things)",
        example: "机の　上に　本が　あります。"
      },
      {
        japanese: "いろいろ（な）",
        kana: "いろいろ",
        vietnamese: "nhiều loại, đa dạng",
        english: "Various",
        example: "スーパーに　いろいろな　物が　あります。"
      },
      {
        japanese: "男の人（おとこのひと）",
        kana: "おとこのひと",
        vietnamese: "đàn ông",
        english: "Man",
        example: ""
      },
      {
        japanese: "女の人（おんなのひと）",
        kana: "おんなのひと",
        vietnamese: "phụ nữ",
        english: "Woman",
        example: ""
      },
      {
        japanese: "男の子（おとこのこ）",
        kana: "おとこのこ",
        vietnamese: "con trai, bé trai",
        english: "Boy",
        example: ""
      },
      {
        japanese: "女の子（おんなのこ）",
        kana: "おんなのこ",
        vietnamese: "con gái, bé gái",
        english: "Girl",
        example: ""
      },
      {
        japanese: "犬（いぬ）",
        kana: "いぬ",
        vietnamese: "con chó",
        english: "Dog",
        example: "公園に　犬が　います。"
      },
      {
        japanese: "猫（ねこ）",
        kana: "ねこ",
        vietnamese: "con mèo",
        english: "Cat",
        example: ""
      },
      {
        japanese: "木（き）",
        kana: "き",
        vietnamese: "cây",
        english: "Tree",
        example: ""
      },
      {
        japanese: "物（もの）",
        kana: "もの",
        vietnamese: "đồ vật, thứ",
        english: "Thing, object",
        example: ""
      },
      {
        japanese: "電池（でんち）",
        kana: "でんち",
        vietnamese: "pin",
        english: "Battery",
        example: ""
      },
      {
        japanese: "箱（はこ）",
        kana: "はこ",
        vietnamese: "hộp",
        english: "Box",
        example: "箱の　中に　何が　ありますか。"
      },
      {
        japanese: "スイッチ",
        kana: "スイッチ",
        vietnamese: "công tắc",
        english: "Switch",
        example: ""
      },
      {
        japanese: "冷蔵庫（れいぞうこ）",
        kana: "れいぞうこ",
        vietnamese: "tủ lạnh",
        english: "Refrigerator",
        example: ""
      },
      {
        japanese: "テーブル",
        kana: "テーブル",
        vietnamese: "bàn",
        english: "Table",
        example: "テーブルの　上に　花が　あります。"
      },
      {
        japanese: "ベッド",
        kana: "ベッド",
        vietnamese: "giường",
        english: "Bed",
        example: ""
      },
      {
        japanese: "棚（たな）",
        kana: "たな",
        vietnamese: "kệ, giá",
        english: "Shelf",
        example: ""
      },
      {
        japanese: "ドア",
        kana: "ドア",
        vietnamese: "cửa ra vào",
        english: "Door",
        example: ""
      },
      {
        japanese: "窓（まど）",
        kana: "まど",
        vietnamese: "cửa sổ",
        english: "Window",
        example: ""
      },
      {
        japanese: "ポスト",
        kana: "ポスト",
        vietnamese: "hòm thư",
        english: "Postbox, mailbox",
        example: ""
      },
      {
        japanese: "ビル",
        kana: "ビル",
        vietnamese: "tòa nhà",
        english: "Building",
        example: ""
      },
      {
        japanese: "コンビニ",
        kana: "コンビニ",
        vietnamese: "cửa hàng tiện lợi",
        english: "Convenience store",
        example: "駅の　近くに　コンビニが　あります。"
      },
      {
        japanese: "公園（こうえん）",
        kana: "こうえん",
        vietnamese: "công viên",
        english: "Park",
        example: ""
      },
      {
        japanese: "喫茶店（きっさてん）",
        kana: "きっさてん",
        vietnamese: "quán cà phê",
        english: "Coffee shop",
        example: ""
      },
      {
        japanese: "本屋（ほんや）",
        kana: "ほんや",
        vietnamese: "tiệm sách",
        english: "Bookstore",
        example: ""
      },
      {
        japanese: "〜屋（〜や）",
        kana: "や",
        vietnamese: "tiệm, cửa hàng ~",
        english: "~ shop, ~ store",
        example: ""
      },
      {
        japanese: "乗り場（のりば）",
        kana: "のりば",
        vietnamese: "bến xe, nơi lên xe",
        english: "Bus/taxi stand, platform",
        example: "タクシー乗り場は　あそこです。"
      },
      {
        japanese: "県（けん）",
        kana: "けん",
        vietnamese: "tỉnh",
        english: "Prefecture",
        example: ""
      },
      {
        japanese: "上（うえ）",
        kana: "うえ",
        vietnamese: "trên",
        english: "On, above",
        example: "机の　上に　本が　あります。"
      },
      {
        japanese: "下（した）",
        kana: "した",
        vietnamese: "dưới",
        english: "Under, below",
        example: ""
      },
      {
        japanese: "前（まえ）",
        kana: "まえ",
        vietnamese: "trước",
        english: "In front of",
        example: ""
      },
      {
        japanese: "後ろ（うしろ）",
        kana: "うしろ",
        vietnamese: "phía sau",
        english: "Behind",
        example: ""
      },
      {
        japanese: "右（みぎ）",
        kana: "みぎ",
        vietnamese: "bên phải",
        english: "Right",
        example: ""
      },
      {
        japanese: "左（ひだり）",
        kana: "ひだり",
        vietnamese: "bên trái",
        english: "Left",
        example: ""
      },
      {
        japanese: "中（なか）",
        kana: "なか",
        vietnamese: "bên trong",
        english: "Inside",
        example: ""
      },
      {
        japanese: "外（そと）",
        kana: "そと",
        vietnamese: "bên ngoài",
        english: "Outside",
        example: ""
      },
      {
        japanese: "隣（となり）",
        kana: "となり",
        vietnamese: "bên cạnh",
        english: "Next to",
        example: "銀行の　隣に　郵便局が　あります。"
      },
      {
        japanese: "近く（ちかく）",
        kana: "ちかく",
        vietnamese: "gần",
        english: "Near, nearby",
        example: ""
      },
      {
        japanese: "間（あいだ）",
        kana: "あいだ",
        vietnamese: "ở giữa",
        english: "Between",
        example: "銀行と　郵便局の　間に　花屋が　あります。"
      }
    ],
    grammar: [
      {
        pattern: "います/あります",
        vietnamese: "có, tồn tại",
        english: "there is/are, to exist",
        explanation: "います dùng cho người và động vật, あります dùng cho đồ vật và thực vật.",
        examples: [
          {
            japanese: "へやに だれが いますか。",
            vietnamese: "Ai đang ở trong phòng?",
            english: "Who is in the room?"
          },
          {
            japanese: "つくえの うえに ほんが あります。",
            vietnamese: "Trên bàn có sách.",
            english: "There is a book on the desk."
          },
          {
            japanese: "にわに ねこが います。",
            vietnamese: "Trong vườn có mèo.",
            english: "There is a cat in the garden."
          }
        ]
      },
      {
        pattern: "～に ～が います/あります",
        vietnamese: "ở ~ có ~",
        english: "there is ~ in/at/on ~",
        explanation: "Trợ từ 'に' chỉ vị trí tồn tại, 'が' đánh dấu chủ ngữ.",
        examples: [
          {
            japanese: "こうえんに こどもが たくさん います。",
            vietnamese: "Trong công viên có nhiều trẻ em.",
            english: "There are many children in the park."
          },
          {
            japanese: "つくえの したに ねこが います。",
            vietnamese: "Dưới bàn có mèo.",
            english: "There is a cat under the desk."
          }
        ]
      },
      {
        pattern: "～は ～に います/あります",
        vietnamese: "~ ở ~",
        english: "~ is in/at/on ~",
        explanation: "Câu trúc này hỏi hoặc nói về vị trí của một đối tượng cụ thể.",
        examples: [
          {
            japanese: "やまださんは どこに いますか。",
            vietnamese: "Anh Yamada ở đâu?",
            english: "Where is Yamada?"
          },
          {
            japanese: "かぎは つくえの なかに あります。",
            vietnamese: "Chìa khóa ở trong bàn.",
            english: "The key is in the desk."
          }
        ]
      },
      {
        pattern: "～の 上/下/中/前/後ろ/隣/近く",
        vietnamese: "trên/dưới/trong/trước/sau/bên cạnh/gần ~",
        english: "on/under/in/in front of/behind/next to/near ~",
        explanation: "Các từ chỉ vị trí tương đối.",
        examples: [
          {
            japanese: "ほんは つくえの うえに あります。",
            vietnamese: "Sách ở trên bàn.",
            english: "The book is on the desk."
          },
          {
            japanese: "ぎんこうは デパートの となりに あります。",
            vietnamese: "Ngân hàng ở bên cạnh trung tâm thương mại.",
            english: "The bank is next to the department store."
          }
        ]
      }
    ]
  };

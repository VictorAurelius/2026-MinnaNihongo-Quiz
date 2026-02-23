// Minna no Nihongo — Lesson 08: 形容詞 (Tính từ い và な)
const LESSON_08_DATA =   {
    lessonNumber: 8,
    title: "形容詞 (Tính từ い và な)",
    vocabulary: [
      {
        japanese: "ハンサム（な）",
        kana: "ハンサム",
        vietnamese: "đẹp trai",
        english: "Handsome",
        example: "ミラーさんは　ハンサムですね。"
      },
      {
        japanese: "きれい（な）",
        kana: "きれい",
        vietnamese: "đẹp, sạch sẽ",
        english: "Beautiful, clean",
        example: "きれいな　花ですね。"
      },
      {
        japanese: "静か（な）（しずか）",
        kana: "しずか",
        vietnamese: "yên tĩnh",
        english: "Quiet",
        example: "この　町は　静かです。"
      },
      {
        japanese: "にぎやか（な）",
        kana: "にぎやか",
        vietnamese: "nhộn nhịp, sôi động",
        english: "Lively, bustling",
        example: "東京は　にぎやかな　町です。"
      },
      {
        japanese: "有名（な）（ゆうめい）",
        kana: "ゆうめい",
        vietnamese: "nổi tiếng",
        english: "Famous",
        example: "奈良は　有名な　町です。"
      },
      {
        japanese: "親切（な）（しんせつ）",
        kana: "しんせつ",
        vietnamese: "tử tế, tốt bụng",
        english: "Kind",
        example: "山田さんは　親切です。"
      },
      {
        japanese: "元気（な）（げんき）",
        kana: "げんき",
        vietnamese: "khỏe mạnh, hoạt bát",
        english: "Healthy, energetic",
        example: "お元気ですか。"
      },
      {
        japanese: "暇（な）（ひま）",
        kana: "ひま",
        vietnamese: "rảnh rỗi",
        english: "Free (time)",
        example: "日曜日は　暇です。"
      },
      {
        japanese: "便利（な）（べんり）",
        kana: "べんり",
        vietnamese: "tiện lợi",
        english: "Convenient",
        example: "この　辞書は　便利です。"
      },
      {
        japanese: "不便（な）（ふべん）",
        kana: "ふべん",
        vietnamese: "bất tiện",
        english: "Inconvenient",
        example: ""
      },
      {
        japanese: "大きい（おおきい）",
        kana: "おおきい",
        vietnamese: "to, lớn",
        english: "Big",
        example: "大きい　かばんですね。"
      },
      {
        japanese: "小さい（ちいさい）",
        kana: "ちいさい",
        vietnamese: "nhỏ, bé",
        english: "Small",
        example: ""
      },
      {
        japanese: "新しい（あたらしい）",
        kana: "あたらしい",
        vietnamese: "mới",
        english: "New",
        example: "新しい　車を　買いました。"
      },
      {
        japanese: "古い（ふるい）",
        kana: "ふるい",
        vietnamese: "cũ",
        english: "Old (things)",
        example: ""
      },
      {
        japanese: "いい（よい）",
        kana: "いい",
        vietnamese: "tốt, hay",
        english: "Good",
        example: "いい　天気ですね。"
      },
      {
        japanese: "悪い（わるい）",
        kana: "わるい",
        vietnamese: "xấu, tệ",
        english: "Bad",
        example: ""
      },
      {
        japanese: "暑い（あつい）",
        kana: "あつい",
        vietnamese: "nóng (thời tiết)",
        english: "Hot (weather)",
        example: "きょうは　暑いですね。"
      },
      {
        japanese: "寒い（さむい）",
        kana: "さむい",
        vietnamese: "lạnh (thời tiết)",
        english: "Cold (weather)",
        example: "北海道は　寒いです。"
      },
      {
        japanese: "熱い（あつい）",
        kana: "あつい",
        vietnamese: "nóng (đồ vật, chất lỏng)",
        english: "Hot (things)",
        example: "このコーヒーは　熱いです。"
      },
      {
        japanese: "冷たい（つめたい）",
        kana: "つめたい",
        vietnamese: "lạnh (đồ vật, chất lỏng)",
        english: "Cold (things)",
        example: "冷たい　水を　ください。"
      },
      {
        japanese: "難しい（むずかしい）",
        kana: "むずかしい",
        vietnamese: "khó",
        english: "Difficult",
        example: "日本語は　難しいですか。"
      },
      {
        japanese: "やさしい",
        kana: "やさしい",
        vietnamese: "dễ, hiền lành",
        english: "Easy, gentle",
        example: ""
      },
      {
        japanese: "高い（たかい）",
        kana: "たかい",
        vietnamese: "cao, đắt",
        english: "High, expensive",
        example: "この　時計は　高いです。"
      },
      {
        japanese: "安い（やすい）",
        kana: "やすい",
        vietnamese: "rẻ",
        english: "Cheap, inexpensive",
        example: "あの　レストランは　安いです。"
      },
      {
        japanese: "低い（ひくい）",
        kana: "ひくい",
        vietnamese: "thấp",
        english: "Low, short (height)",
        example: ""
      },
      {
        japanese: "おもしろい",
        kana: "おもしろい",
        vietnamese: "thú vị, hay",
        english: "Interesting, funny",
        example: "この　映画は　おもしろいです。"
      },
      {
        japanese: "つまらない",
        kana: "つまらない",
        vietnamese: "chán, nhàm chán",
        english: "Boring",
        example: ""
      },
      {
        japanese: "忙しい（いそがしい）",
        kana: "いそがしい",
        vietnamese: "bận rộn",
        english: "Busy",
        example: "毎日　忙しいです。"
      },
      {
        japanese: "楽しい（たのしい）",
        kana: "たのしい",
        vietnamese: "vui vẻ",
        english: "Fun, enjoyable",
        example: "旅行は　楽しかったです。"
      },
      {
        japanese: "白い（しろい）",
        kana: "しろい",
        vietnamese: "trắng",
        english: "White",
        example: ""
      },
      {
        japanese: "黒い（くろい）",
        kana: "くろい",
        vietnamese: "đen",
        english: "Black",
        example: ""
      },
      {
        japanese: "赤い（あかい）",
        kana: "あかい",
        vietnamese: "đỏ",
        english: "Red",
        example: ""
      },
      {
        japanese: "青い（あおい）",
        kana: "あおい",
        vietnamese: "xanh da trời, xanh lam",
        english: "Blue, green",
        example: ""
      },
      {
        japanese: "町（まち）",
        kana: "まち",
        vietnamese: "thị trấn, thành phố",
        english: "Town, city",
        example: ""
      },
      {
        japanese: "食べ物（たべもの）",
        kana: "たべもの",
        vietnamese: "đồ ăn, thức ăn",
        english: "Food",
        example: "日本の　食べ物は　おいしいです。"
      },
      {
        japanese: "所（ところ）",
        kana: "ところ",
        vietnamese: "nơi, chỗ",
        english: "Place",
        example: ""
      },
      {
        japanese: "寮（りょう）",
        kana: "りょう",
        vietnamese: "ký túc xá",
        english: "Dormitory",
        example: ""
      },
      {
        japanese: "生活（せいかつ）",
        kana: "せいかつ",
        vietnamese: "cuộc sống, sinh hoạt",
        english: "Life, living",
        example: "日本の　生活は　どうですか。"
      },
      {
        japanese: "仕事（しごと）",
        kana: "しごと",
        vietnamese: "công việc",
        english: "Work, job",
        example: "仕事は　忙しいです。"
      },
      {
        japanese: "どう",
        kana: "どう",
        vietnamese: "thế nào",
        english: "How",
        example: "日本の　生活は　どうですか。"
      },
      {
        japanese: "どんな",
        kana: "どんな",
        vietnamese: "loại nào, như thế nào",
        english: "What kind of",
        example: "どんな　映画が　好きですか。"
      },
      {
        japanese: "とても",
        kana: "とても",
        vietnamese: "rất",
        english: "Very",
        example: "この　ケーキは　とても　おいしいです。"
      },
      {
        japanese: "あまり",
        kana: "あまり",
        vietnamese: "không lắm, không mấy",
        english: "Not very (with negative)",
        example: "あまり　おもしろくないです。"
      }
    ],
    grammar: [
      {
        pattern: "い-adjective + です",
        vietnamese: "Tính từ đuôi い",
        english: "i-adjective + desu",
        explanation: "Tính từ đuôi い trực tiếp bổ nghĩa cho danh từ hoặc đứng cuối câu với です.",
        examples: [
          {
            japanese: "この ほんは おもしろいです。",
            vietnamese: "Cuốn sách này thú vị.",
            english: "This book is interesting."
          },
          {
            japanese: "あたらしい くつを かいました。",
            vietnamese: "Tôi đã mua giày mới.",
            english: "I bought new shoes."
          },
          {
            japanese: "きょうは あついです。",
            vietnamese: "Hôm nay nóng.",
            english: "It's hot today."
          }
        ]
      },
      {
        pattern: "な-adjective + です",
        vietnamese: "Tính từ đuôi な",
        english: "na-adjective + desu",
        explanation: "Tính từ đuôi な cần thêm 'な' khi bổ nghĩa trực tiếp cho danh từ, nhưng bỏ 'な' khi đứng cuối câu với です.",
        examples: [
          {
            japanese: "ふじさんは きれいです。",
            vietnamese: "Núi Phú Sĩ đẹp.",
            english: "Mt. Fuji is beautiful."
          },
          {
            japanese: "しずかな ところです。",
            vietnamese: "Là nơi yên tĩnh.",
            english: "It's a quiet place."
          },
          {
            japanese: "にほんごは べんりです。",
            vietnamese: "Tiếng Nhật tiện lợi.",
            english: "Japanese is convenient."
          }
        ]
      },
      {
        pattern: "～は ～くないです",
        vietnamese: "~ không ~",
        english: "~ is not ~",
        explanation: "Phủ định của tính từ đuôi い: bỏ い, thêm くないです.",
        examples: [
          {
            japanese: "この くつは たかくないです。",
            vietnamese: "Đôi giày này không đắt.",
            english: "These shoes are not expensive."
          },
          {
            japanese: "あまり おもしろくないです。",
            vietnamese: "Không mấy thú vị.",
            english: "It's not very interesting."
          }
        ]
      },
      {
        pattern: "～は ～じゃ ありません",
        vietnamese: "~ không ~",
        english: "~ is not ~",
        explanation: "Phủ định của tính từ đuôi な và danh từ.",
        examples: [
          {
            japanese: "あまり きれいじゃ ありません。",
            vietnamese: "Không mấy đẹp.",
            english: "It's not very beautiful."
          },
          {
            japanese: "ここは しずかじゃ ありません。",
            vietnamese: "Đây không yên tĩnh.",
            english: "This place is not quiet."
          }
        ]
      },
      {
        pattern: "～は どうですか",
        vietnamese: "~ thế nào?",
        english: "How is ~?",
        explanation: "Câu hỏi về tính chất, trạng thái của sự vật.",
        examples: [
          {
            japanese: "にほんの せいかつは どうですか。",
            vietnamese: "Cuộc sống ở Nhật thế nào?",
            english: "How is life in Japan?"
          },
          {
            japanese: "この レストランは どうですか。",
            vietnamese: "Nhà hàng này thế nào?",
            english: "How is this restaurant?"
          }
        ]
      }
    ]
  };

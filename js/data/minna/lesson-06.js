// Minna no Nihongo — Lesson 06: ～を します (Làm ~)
const LESSON_06_DATA =   {
    lessonNumber: 6,
    title: "～を します (Làm ~)",
    vocabulary: [
      {
        japanese: "食べます（たべます）",
        kana: "たべます",
        vietnamese: "ăn",
        english: "to eat",
        example: "あさごはんを たべます。"
      },
      {
        japanese: "飲みます（のみます）",
        kana: "のみます",
        vietnamese: "uống",
        english: "to drink",
        example: "コーヒーを のみます。"
      },
      {
        japanese: "吸います（すいます）",
        kana: "すいます",
        vietnamese: "hút (thuốc)",
        english: "to smoke",
        example: "たばこを すいます。"
      },
      {
        japanese: "見ます（みます）",
        kana: "みます",
        vietnamese: "xem, nhìn",
        english: "to see, to watch",
        example: "テレビを みます。"
      },
      {
        japanese: "聞きます（ききます）",
        kana: "ききます",
        vietnamese: "nghe",
        english: "to listen, to hear",
        example: "おんがくを ききます。"
      },
      {
        japanese: "読みます（よみます）",
        kana: "よみます",
        vietnamese: "đọc",
        english: "to read",
        example: "しんぶんを よみます。"
      },
      {
        japanese: "書きます（かきます）",
        kana: "かきます",
        vietnamese: "viết",
        english: "to write",
        example: "てがみを かきます。"
      },
      {
        japanese: "買います（かいます）",
        kana: "かいます",
        vietnamese: "mua",
        english: "to buy",
        example: "ほんを かいます。"
      },
      {
        japanese: "撮ります（とります）",
        kana: "とります",
        vietnamese: "chụp (ảnh)",
        english: "to take (a photo)",
        example: "しゃしんを とります。"
      },
      {
        japanese: "します",
        kana: "します",
        vietnamese: "làm, chơi",
        english: "to do, to play",
        example: "サッカーを します。"
      },
      {
        japanese: "会います（あいます）",
        kana: "あいます",
        vietnamese: "gặp",
        english: "to meet",
        example: "ともだちに あいます。"
      },
      {
        japanese: "ご飯（ごはん）",
        kana: "ごはん",
        vietnamese: "cơm, bữa ăn",
        english: "rice, meal",
        example: ""
      },
      {
        japanese: "朝ご飯（あさごはん）",
        kana: "あさごはん",
        vietnamese: "bữa sáng",
        english: "breakfast",
        example: ""
      },
      {
        japanese: "昼ご飯（ひるごはん）",
        kana: "ひるごはん",
        vietnamese: "bữa trưa",
        english: "lunch",
        example: ""
      },
      {
        japanese: "晩ご飯（ばんごはん）",
        kana: "ばんごはん",
        vietnamese: "bữa tối",
        english: "dinner",
        example: ""
      },
      {
        japanese: "パン",
        kana: "パン",
        vietnamese: "bánh mì",
        english: "bread",
        example: ""
      },
      {
        japanese: "卵（たまご）",
        kana: "たまご",
        vietnamese: "trứng",
        english: "egg",
        example: ""
      },
      {
        japanese: "肉（にく）",
        kana: "にく",
        vietnamese: "thịt",
        english: "meat",
        example: ""
      },
      {
        japanese: "魚（さかな）",
        kana: "さかな",
        vietnamese: "cá",
        english: "fish",
        example: ""
      },
      {
        japanese: "野菜（やさい）",
        kana: "やさい",
        vietnamese: "rau",
        english: "vegetable",
        example: ""
      },
      {
        japanese: "果物（くだもの）",
        kana: "くだもの",
        vietnamese: "trái cây",
        english: "fruit",
        example: ""
      },
      {
        japanese: "水（みず）",
        kana: "みず",
        vietnamese: "nước",
        english: "water",
        example: ""
      },
      {
        japanese: "お茶（おちゃ）",
        kana: "おちゃ",
        vietnamese: "trà",
        english: "tea",
        example: ""
      },
      {
        japanese: "紅茶（こうちゃ）",
        kana: "こうちゃ",
        vietnamese: "trà đen, hồng trà",
        english: "black tea",
        example: ""
      },
      {
        japanese: "牛乳（ぎゅうにゅう）",
        kana: "ぎゅうにゅう",
        vietnamese: "sữa bò",
        english: "milk",
        example: ""
      },
      {
        japanese: "ジュース",
        kana: "ジュース",
        vietnamese: "nước trái cây",
        english: "juice",
        example: ""
      },
      {
        japanese: "ビール",
        kana: "ビール",
        vietnamese: "bia",
        english: "beer",
        example: ""
      },
      {
        japanese: "お酒（おさけ）",
        kana: "おさけ",
        vietnamese: "rượu",
        english: "alcohol, sake",
        example: ""
      },
      {
        japanese: "映画（えいが）",
        kana: "えいが",
        vietnamese: "phim",
        english: "movie",
        example: "えいがを みます。"
      },
      {
        japanese: "手紙（てがみ）",
        kana: "てがみ",
        vietnamese: "thư",
        english: "letter",
        example: ""
      },
      {
        japanese: "写真（しゃしん）",
        kana: "しゃしん",
        vietnamese: "ảnh",
        english: "photograph",
        example: ""
      },
      {
        japanese: "レポート",
        kana: "レポート",
        vietnamese: "báo cáo",
        english: "report",
        example: ""
      },
      {
        japanese: "花（はな）",
        kana: "はな",
        vietnamese: "hoa",
        english: "flower",
        example: "はなを かいます。"
      },
      {
        japanese: "サッカー",
        kana: "サッカー",
        vietnamese: "bóng đá",
        english: "soccer",
        example: ""
      },
      {
        japanese: "テニス",
        kana: "テニス",
        vietnamese: "quần vợt",
        english: "tennis",
        example: ""
      },
      {
        japanese: "花見（はなみ）",
        kana: "はなみ",
        vietnamese: "ngắm hoa",
        english: "flower viewing",
        example: ""
      },
      {
        japanese: "何（なに）",
        kana: "なに",
        vietnamese: "cái gì",
        english: "what",
        example: ""
      },
      {
        japanese: "一緒に（いっしょに）",
        kana: "いっしょに",
        vietnamese: "cùng nhau",
        english: "together",
        example: "いっしょに いきませんか。"
      },
      {
        japanese: "ちょっと",
        kana: "ちょっと",
        vietnamese: "một chút",
        english: "a little, a moment",
        example: "ちょっと すみません。"
      },
      {
        japanese: "いつも",
        kana: "いつも",
        vietnamese: "luôn luôn",
        english: "always",
        example: ""
      },
      {
        japanese: "時々（ときどき）",
        kana: "ときどき",
        vietnamese: "thỉnh thoảng",
        english: "sometimes",
        example: ""
      },
      {
        japanese: "それから",
        kana: "それから",
        vietnamese: "sau đó",
        english: "after that, and then",
        example: ""
      },
      {
        japanese: "いいですね",
        kana: "いいですね",
        vietnamese: "hay quá nhỉ",
        english: "that's nice",
        example: ""
      },
      {
        japanese: "わかりました",
        kana: "わかりました",
        vietnamese: "tôi hiểu rồi",
        english: "I understand",
        example: ""
      }
    ],
    grammar: [
      {
        pattern: "～を ～ます",
        vietnamese: "làm ~",
        english: "do ~ (verb)",
        explanation: "Trợ từ 'を' đánh dấu tân ngữ (object) của động từ.",
        examples: [
          {
            japanese: "しんぶんを よみます。",
            vietnamese: "Tôi đọc báo.",
            english: "I read the newspaper."
          },
          {
            japanese: "コーヒーを のみます。",
            vietnamese: "Tôi uống cà phê.",
            english: "I drink coffee."
          },
          {
            japanese: "てがみを かきます。",
            vietnamese: "Tôi viết thư.",
            english: "I write a letter."
          }
        ]
      },
      {
        pattern: "～で ～を ～ます",
        vietnamese: "làm ~ ở ~",
        english: "do ~ at/in ~",
        explanation: "Trợ từ 'で' chỉ địa điểm diễn ra hành động.",
        examples: [
          {
            japanese: "としょかんで ほんを よみます。",
            vietnamese: "Tôi đọc sách ở thư viện.",
            english: "I read books at the library."
          },
          {
            japanese: "うちで テレビを みます。",
            vietnamese: "Tôi xem TV ở nhà.",
            english: "I watch TV at home."
          }
        ]
      },
      {
        pattern: "なにを ～ますか",
        vietnamese: "làm cái gì?",
        english: "what do you ~?",
        explanation: "Câu hỏi về đối tượng của hành động.",
        examples: [
          {
            japanese: "あさ なにを たべますか。",
            vietnamese: "Buổi sáng bạn ăn gì?",
            english: "What do you eat in the morning?"
          },
          {
            japanese: "どこで しんぶんを かいますか。",
            vietnamese: "Bạn mua báo ở đâu?",
            english: "Where do you buy the newspaper?"
          }
        ]
      },
      {
        pattern: "～を ～ましょう",
        vietnamese: "hãy cùng làm ~",
        english: "let's ~",
        explanation: "Rủ người khác cùng làm việc gì đó.",
        examples: [
          {
            japanese: "いっしょに コーヒーを のみましょう。",
            vietnamese: "Hãy cùng uống cà phê nào.",
            english: "Let's drink coffee together."
          },
          {
            japanese: "きょうとへ いきましょう。",
            vietnamese: "Hãy đi Kyoto nào.",
            english: "Let's go to Kyoto."
          }
        ]
      }
    ]
  };

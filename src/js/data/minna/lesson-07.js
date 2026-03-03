// Minna no Nihongo — Lesson 07: あげます・もらいます (Cho, nhận, mượn, dạy)
const LESSON_07_DATA =   {
    lessonNumber: 7,
    title: "あげます・もらいます (Cho, nhận, mượn, dạy)",
    vocabulary: [
      {
        japanese: "あげます",
        kana: "あげます",
        vietnamese: "cho, tặng",
        type: "main",
        english: "To give",
        example: "わたしは　ミラーさんに　花を　あげました。"
      },
      {
        japanese: "もらいます",
        kana: "もらいます",
        vietnamese: "nhận, được cho",
        type: "main",
        english: "To receive",
        example: "わたしは　カリナさんに　プレゼントを　もらいました。"
      },
      {
        japanese: "貸します（かします）",
        kana: "かします",
        vietnamese: "cho mượn",
        type: "main",
        english: "To lend",
        example: "わたしは　サントスさんに　本を　貸しました。"
      },
      {
        japanese: "借ります（かります）",
        kana: "かります",
        vietnamese: "mượn",
        type: "main",
        english: "To borrow",
        example: "わたしは　山田さんに　傘を　借りました。"
      },
      {
        japanese: "教えます（おしえます）",
        kana: "おしえます",
        vietnamese: "dạy, chỉ bảo",
        type: "main",
        english: "To teach, to tell",
        example: "わたしは　木村さんに　英語を　教えます。"
      },
      {
        japanese: "習います（ならいます）",
        kana: "ならいます",
        vietnamese: "học (từ ai đó)",
        type: "main",
        english: "To learn (from someone)",
        example: "わたしは　小林先生に　日本語を　習います。"
      },
      {
        japanese: "かけます",
        kana: "かけます",
        vietnamese: "gọi (điện thoại)",
        type: "main",
        english: "To make (a phone call)",
        example: "わたしは　会社に　電話を　かけます。"
      },
      {
        japanese: "送ります（おくります）",
        kana: "おくります",
        vietnamese: "gửi",
        type: "main",
        english: "To send",
        example: "わたしは　国の　家族に　荷物を　送ります。"
      },
      {
        japanese: "手（て）",
        kana: "て",
        vietnamese: "tay",
        type: "main",
        english: "Hand",
        example: "手を　洗います。"
      },
      {
        japanese: "紙（かみ）",
        kana: "かみ",
        vietnamese: "giấy",
        type: "main",
        english: "Paper",
        example: ""
      },
      {
        japanese: "シャツ",
        kana: "シャツ",
        vietnamese: "áo sơ mi",
        type: "main",
        english: "Shirt",
        example: ""
      },
      {
        japanese: "プレゼント",
        kana: "プレゼント",
        vietnamese: "quà tặng",
        type: "main",
        english: "Present, gift",
        example: "誕生日の　プレゼントを　もらいました。"
      },
      {
        japanese: "荷物（にもつ）",
        kana: "にもつ",
        vietnamese: "hành lý, bưu kiện",
        type: "main",
        english: "Luggage, package",
        example: ""
      },
      {
        japanese: "お金（おかね）",
        kana: "おかね",
        vietnamese: "tiền",
        type: "main",
        english: "Money",
        example: ""
      },
      {
        japanese: "切符（きっぷ）",
        kana: "きっぷ",
        vietnamese: "vé",
        type: "main",
        english: "Ticket",
        example: "切符を　買います。"
      },
      {
        japanese: "クリスマス",
        kana: "クリスマス",
        vietnamese: "Giáng sinh",
        type: "main",
        english: "Christmas",
        example: "クリスマスに　プレゼントを　あげます。"
      },
      {
        japanese: "父（ちち）",
        kana: "ちち",
        vietnamese: "bố (của mình)",
        type: "main",
        english: "My father",
        example: "父は　会社員です。"
      },
      {
        japanese: "母（はは）",
        kana: "はは",
        vietnamese: "mẹ (của mình)",
        type: "main",
        english: "My mother",
        example: "母に　花を　あげました。"
      },
      {
        japanese: "お父さん（おとうさん）",
        kana: "おとうさん",
        vietnamese: "bố (của người khác)",
        type: "main",
        english: "(Someone's) father",
        example: "お父さんは　お元気ですか。"
      },
      {
        japanese: "お母さん（おかあさん）",
        kana: "おかあさん",
        vietnamese: "mẹ (của người khác)",
        type: "main",
        english: "(Someone's) mother",
        example: ""
      },
      {
        japanese: "はし",
        kana: "はし",
        vietnamese: "đũa",
        type: "main",
        english: "Chopsticks",
        example: "はしで　食べます。"
      },
      {
        japanese: "スプーン",
        kana: "スプーン",
        vietnamese: "muỗng, thìa",
        type: "main",
        english: "Spoon",
        example: ""
      },
      {
        japanese: "ナイフ",
        kana: "ナイフ",
        vietnamese: "dao",
        type: "main",
        english: "Knife",
        example: ""
      },
      {
        japanese: "フォーク",
        kana: "フォーク",
        vietnamese: "nĩa",
        type: "main",
        english: "Fork",
        example: ""
      },
      {
        japanese: "はさみ",
        kana: "はさみ",
        vietnamese: "kéo",
        type: "main",
        english: "Scissors",
        example: ""
      },
      {
        japanese: "もう",
        kana: "もう",
        vietnamese: "đã, rồi",
        type: "main",
        english: "Already",
        example: "もう　お昼ごはんを　食べましたか。"
      },
      {
        japanese: "まだ",
        kana: "まだ",
        vietnamese: "chưa, vẫn chưa",
        type: "main",
        english: "Not yet",
        example: "いいえ、まだです。"
      },
      // Supplementary Vocabulary (参考語彙) - Family Members
      {
        japanese: "父（ちち）",
        kana: "ちち",
        vietnamese: "cha, bố (của mình)",
        english: "father (own)",
        type: "supplementary",
        example: ""
      },
      {
        japanese: "お父さん（おとうさん）",
        kana: "おとうさん",
        vietnamese: "cha, bố (người khác)",
        english: "father (someone else's)",
        type: "supplementary",
        example: ""
      },
      {
        japanese: "母（はは）",
        kana: "はは",
        vietnamese: "mẹ (của mình)",
        english: "mother (own)",
        type: "supplementary",
        example: ""
      },
      {
        japanese: "お母さん（おかあさん）",
        kana: "おかあさん",
        vietnamese: "mẹ (người khác)",
        english: "mother (someone else's)",
        type: "supplementary",
        example: ""
      },
      {
        japanese: "兄（あに）",
        kana: "あに",
        vietnamese: "anh trai (của mình)",
        english: "older brother (own)",
        type: "supplementary",
        example: ""
      },
      {
        japanese: "お兄さん（おにいさん）",
        kana: "おにいさん",
        vietnamese: "anh trai (người khác)",
        english: "older brother (someone else's)",
        type: "supplementary",
        example: ""
      },
      {
        japanese: "姉（あね）",
        kana: "あね",
        vietnamese: "chị gái (của mình)",
        english: "older sister (own)",
        type: "supplementary",
        example: ""
      },
      {
        japanese: "お姉さん（おねえさん）",
        kana: "おねえさん",
        vietnamese: "chị gái (người khác)",
        english: "older sister (someone else's)",
        type: "supplementary",
        example: ""
      },
      {
        japanese: "弟（おとうと）",
        kana: "おとうと",
        vietnamese: "em trai",
        english: "younger brother",
        type: "supplementary",
        example: ""
      },
      {
        japanese: "妹（いもうと）",
        kana: "いもうと",
        vietnamese: "em gái",
        english: "younger sister",
        type: "supplementary",
        example: ""
      },
      {
        japanese: "祖父（そふ）",
        kana: "そふ",
        vietnamese: "ông (của mình)",
        english: "grandfather (own)",
        type: "supplementary",
        example: ""
      },
      {
        japanese: "祖母（そぼ）",
        kana: "そぼ",
        vietnamese: "bà (của mình)",
        english: "grandmother (own)",
        type: "supplementary",
        example: ""
      }
    ],
    grammar: [
      {
        pattern: "～に ～を あげます",
        vietnamese: "cho ~ cái ~",
        type: "main",
        english: "give ~ to ~",
        explanation: "Trợ từ 'に' chỉ người nhận, 'を' chỉ vật được cho.",
        examples: [
          {
            japanese: "わたしは ともだちに プレゼントを あげます。",
            vietnamese: "Tôi cho bạn quà.",
            type: "main",
        english: "I give a present to my friend."
          },
          {
            japanese: "ちちに ネクタイを あげました。",
            vietnamese: "Tôi đã cho bố cái cà vạt.",
            type: "main",
        english: "I gave my father a necktie."
          }
        ]
      },
      {
        pattern: "～に ～を もらいます",
        vietnamese: "nhận ~ từ ~",
        type: "main",
        english: "receive ~ from ~",
        explanation: "Trợ từ 'に' hoặc 'から' chỉ người cho, 'を' chỉ vật nhận được.",
        examples: [
          {
            japanese: "わたしは やまださんに はなを もらいました。",
            vietnamese: "Tôi nhận hoa từ anh Yamada.",
            type: "main",
        english: "I received flowers from Yamada."
          },
          {
            japanese: "たんじょうびに ははから プレゼントを もらいました。",
            vietnamese: "Sinh nhật tôi nhận quà từ mẹ.",
            type: "main",
        english: "I received a present from my mother on my birthday."
          }
        ]
      },
      {
        pattern: "～に ～を かします/かります",
        vietnamese: "cho mượn/mượn ~ của ~",
        type: "main",
        english: "lend/borrow ~ to/from ~",
        explanation: "かします = cho mượn, かります = mượn/vay.",
        examples: [
          {
            japanese: "わたしは たなかさんに ほんを かしました。",
            vietnamese: "Tôi đã cho Tanaka mượn sách.",
            type: "main",
        english: "I lent a book to Tanaka."
          },
          {
            japanese: "ともだちに CDを かりました。",
            vietnamese: "Tôi mượn CD của bạn.",
            type: "main",
        english: "I borrowed a CD from my friend."
          }
        ]
      },
      {
        pattern: "もう ～ました",
        vietnamese: "đã ~ rồi",
        type: "main",
        english: "already ~",
        explanation: "'もう' với thì quá khứ biểu thị hành động đã hoàn thành.",
        examples: [
          {
            japanese: "もう ひるごはんを たべましたか。",
            vietnamese: "Bạn đã ăn trưa rồi chưa?",
            type: "main",
        english: "Have you already eaten lunch?"
          },
          {
            japanese: "はい、もう たべました。",
            vietnamese: "Vâng, tôi đã ăn rồi.",
            type: "main",
        english: "Yes, I've already eaten."
          }
        ]
      }
    ]
  };

// Minna no Nihongo — Lesson 07: あげます・もらいます (Cho, nhận, mượn, dạy)
const LESSON_07_DATA =   {
    lessonNumber: 7,
    title: "あげます・もらいます (Cho, nhận, mượn, dạy)",
    vocabulary: [
      {
        japanese: "あげます",
        kana: "あげます",
        vietnamese: "cho, tặng",
        english: "To give",
        example: "わたしは　ミラーさんに　花を　あげました。"
      },
      {
        japanese: "もらいます",
        kana: "もらいます",
        vietnamese: "nhận, được cho",
        english: "To receive",
        example: "わたしは　カリナさんに　プレゼントを　もらいました。"
      },
      {
        japanese: "貸します（かします）",
        kana: "かします",
        vietnamese: "cho mượn",
        english: "To lend",
        example: "わたしは　サントスさんに　本を　貸しました。"
      },
      {
        japanese: "借ります（かります）",
        kana: "かります",
        vietnamese: "mượn",
        english: "To borrow",
        example: "わたしは　山田さんに　傘を　借りました。"
      },
      {
        japanese: "教えます（おしえます）",
        kana: "おしえます",
        vietnamese: "dạy, chỉ bảo",
        english: "To teach, to tell",
        example: "わたしは　木村さんに　英語を　教えます。"
      },
      {
        japanese: "習います（ならいます）",
        kana: "ならいます",
        vietnamese: "học (từ ai đó)",
        english: "To learn (from someone)",
        example: "わたしは　小林先生に　日本語を　習います。"
      },
      {
        japanese: "かけます",
        kana: "かけます",
        vietnamese: "gọi (điện thoại)",
        english: "To make (a phone call)",
        example: "わたしは　会社に　電話を　かけます。"
      },
      {
        japanese: "送ります（おくります）",
        kana: "おくります",
        vietnamese: "gửi",
        english: "To send",
        example: "わたしは　国の　家族に　荷物を　送ります。"
      },
      {
        japanese: "手（て）",
        kana: "て",
        vietnamese: "tay",
        english: "Hand",
        example: "手を　洗います。"
      },
      {
        japanese: "紙（かみ）",
        kana: "かみ",
        vietnamese: "giấy",
        english: "Paper",
        example: ""
      },
      {
        japanese: "シャツ",
        kana: "シャツ",
        vietnamese: "áo sơ mi",
        english: "Shirt",
        example: ""
      },
      {
        japanese: "プレゼント",
        kana: "プレゼント",
        vietnamese: "quà tặng",
        english: "Present, gift",
        example: "誕生日の　プレゼントを　もらいました。"
      },
      {
        japanese: "荷物（にもつ）",
        kana: "にもつ",
        vietnamese: "hành lý, bưu kiện",
        english: "Luggage, package",
        example: ""
      },
      {
        japanese: "お金（おかね）",
        kana: "おかね",
        vietnamese: "tiền",
        english: "Money",
        example: ""
      },
      {
        japanese: "切符（きっぷ）",
        kana: "きっぷ",
        vietnamese: "vé",
        english: "Ticket",
        example: "切符を　買います。"
      },
      {
        japanese: "クリスマス",
        kana: "クリスマス",
        vietnamese: "Giáng sinh",
        english: "Christmas",
        example: "クリスマスに　プレゼントを　あげます。"
      },
      {
        japanese: "父（ちち）",
        kana: "ちち",
        vietnamese: "bố (của mình)",
        english: "My father",
        example: "父は　会社員です。"
      },
      {
        japanese: "母（はは）",
        kana: "はは",
        vietnamese: "mẹ (của mình)",
        english: "My mother",
        example: "母に　花を　あげました。"
      },
      {
        japanese: "お父さん（おとうさん）",
        kana: "おとうさん",
        vietnamese: "bố (của người khác)",
        english: "(Someone's) father",
        example: "お父さんは　お元気ですか。"
      },
      {
        japanese: "お母さん（おかあさん）",
        kana: "おかあさん",
        vietnamese: "mẹ (của người khác)",
        english: "(Someone's) mother",
        example: ""
      },
      {
        japanese: "はし",
        kana: "はし",
        vietnamese: "đũa",
        english: "Chopsticks",
        example: "はしで　食べます。"
      },
      {
        japanese: "スプーン",
        kana: "スプーン",
        vietnamese: "muỗng, thìa",
        english: "Spoon",
        example: ""
      },
      {
        japanese: "ナイフ",
        kana: "ナイフ",
        vietnamese: "dao",
        english: "Knife",
        example: ""
      },
      {
        japanese: "フォーク",
        kana: "フォーク",
        vietnamese: "nĩa",
        english: "Fork",
        example: ""
      },
      {
        japanese: "はさみ",
        kana: "はさみ",
        vietnamese: "kéo",
        english: "Scissors",
        example: ""
      },
      {
        japanese: "もう",
        kana: "もう",
        vietnamese: "đã, rồi",
        english: "Already",
        example: "もう　お昼ごはんを　食べましたか。"
      },
      {
        japanese: "まだ",
        kana: "まだ",
        vietnamese: "chưa, vẫn chưa",
        english: "Not yet",
        example: "いいえ、まだです。"
      }
    ],
    grammar: [
      {
        pattern: "～に ～を あげます",
        vietnamese: "cho ~ cái ~",
        english: "give ~ to ~",
        explanation: "Trợ từ 'に' chỉ người nhận, 'を' chỉ vật được cho.",
        examples: [
          {
            japanese: "わたしは ともだちに プレゼントを あげます。",
            vietnamese: "Tôi cho bạn quà.",
            english: "I give a present to my friend."
          },
          {
            japanese: "ちちに ネクタイを あげました。",
            vietnamese: "Tôi đã cho bố cái cà vạt.",
            english: "I gave my father a necktie."
          }
        ]
      },
      {
        pattern: "～に ～を もらいます",
        vietnamese: "nhận ~ từ ~",
        english: "receive ~ from ~",
        explanation: "Trợ từ 'に' hoặc 'から' chỉ người cho, 'を' chỉ vật nhận được.",
        examples: [
          {
            japanese: "わたしは やまださんに はなを もらいました。",
            vietnamese: "Tôi nhận hoa từ anh Yamada.",
            english: "I received flowers from Yamada."
          },
          {
            japanese: "たんじょうびに ははから プレゼントを もらいました。",
            vietnamese: "Sinh nhật tôi nhận quà từ mẹ.",
            english: "I received a present from my mother on my birthday."
          }
        ]
      },
      {
        pattern: "～に ～を かします/かります",
        vietnamese: "cho mượn/mượn ~ của ~",
        english: "lend/borrow ~ to/from ~",
        explanation: "かします = cho mượn, かります = mượn/vay.",
        examples: [
          {
            japanese: "わたしは たなかさんに ほんを かしました。",
            vietnamese: "Tôi đã cho Tanaka mượn sách.",
            english: "I lent a book to Tanaka."
          },
          {
            japanese: "ともだちに CDを かりました。",
            vietnamese: "Tôi mượn CD của bạn.",
            english: "I borrowed a CD from my friend."
          }
        ]
      },
      {
        pattern: "もう ～ました",
        vietnamese: "đã ~ rồi",
        english: "already ~",
        explanation: "'もう' với thì quá khứ biểu thị hành động đã hoàn thành.",
        examples: [
          {
            japanese: "もう ひるごはんを たべましたか。",
            vietnamese: "Bạn đã ăn trưa rồi chưa?",
            english: "Have you already eaten lunch?"
          },
          {
            japanese: "はい、もう たべました。",
            vietnamese: "Vâng, tôi đã ăn rồi.",
            english: "Yes, I've already eaten."
          }
        ]
      }
    ]
  };

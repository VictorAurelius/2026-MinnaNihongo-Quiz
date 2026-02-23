// Minna no Nihongo — Lesson 24: くれます (Cho tôi/ai đó)
const LESSON_24_DATA =   {
    lessonNumber: 24,
    title: "くれます (Cho tôi/ai đó)",
    vocabulary: [
      {
        japanese: "くれます",
        kana: "くれます",
        vietnamese: "cho (tôi/người thân của tôi)",
        english: "To give (to me/my group)",
        example: "友達が本をくれました。"
      },
      {
        japanese: "あげます",
        kana: "あげます",
        vietnamese: "cho, tặng",
        english: "To give",
        example: "友達にプレゼントをあげます。"
      },
      {
        japanese: "もらいます",
        kana: "もらいます",
        vietnamese: "nhận được",
        english: "To receive",
        example: "母にセーターをもらいました。"
      },
      {
        japanese: "連れて行きます（つれていきます）",
        kana: "つれていきます",
        vietnamese: "dẫn đi, đưa đi",
        english: "To take (someone)",
        example: "子どもを公園に連れて行きます。"
      },
      {
        japanese: "連れて来ます（つれてきます）",
        kana: "つれてきます",
        vietnamese: "dẫn đến, đưa đến",
        english: "To bring (someone)",
        example: "友達を家に連れて来ました。"
      },
      {
        japanese: "送ります（おくります）",
        kana: "おくります",
        vietnamese: "gửi, tiễn",
        english: "To send, to see off",
        example: "駅まで送ります。"
      },
      {
        japanese: "紹介します（しょうかいします）",
        kana: "しょうかいします",
        vietnamese: "giới thiệu",
        english: "To introduce",
        example: "友達を紹介します。"
      },
      {
        japanese: "案内します（あんないします）",
        kana: "あんないします",
        vietnamese: "hướng dẫn, dẫn đường",
        english: "To guide, to show around",
        example: "東京を案内してくれました。"
      },
      {
        japanese: "説明します（せつめいします）",
        kana: "せつめいします",
        vietnamese: "giải thích",
        english: "To explain",
        example: "使い方を説明してくれました。"
      },
      {
        japanese: "迎えに来ます（むかえにきます）",
        kana: "むかえにきます",
        vietnamese: "đến đón",
        english: "To come to pick up",
        example: "空港に迎えに来てくれました。"
      },
      {
        japanese: "届けます（とどけます）",
        kana: "とどけます",
        vietnamese: "giao, chuyển đến",
        english: "To deliver",
        example: "荷物を届けます。"
      },
      {
        japanese: "直します（なおします）",
        kana: "なおします",
        vietnamese: "sửa chữa",
        english: "To fix, to repair",
        example: "父がパソコンを直してくれました。"
      },
      {
        japanese: "翻訳します（ほんやくします）",
        kana: "ほんやくします",
        vietnamese: "dịch, phiên dịch",
        english: "To translate",
        example: "手紙を翻訳してもらいました。"
      },
      {
        japanese: "相談します（そうだんします）",
        kana: "そうだんします",
        vietnamese: "tham khảo, bàn bạc",
        english: "To consult",
        example: "先生に相談しました。"
      },
      {
        japanese: "世話をします（せわをします）",
        kana: "せわをします",
        vietnamese: "chăm sóc",
        english: "To take care of",
        example: "犬の世話をします。"
      },
      {
        japanese: "おじいさん",
        kana: "おじいさん",
        vietnamese: "ông (nội/ngoại)",
        english: "Grandfather, old man",
        example: "おじいさんは元気ですか。"
      },
      {
        japanese: "おばあさん",
        kana: "おばあさん",
        vietnamese: "bà (nội/ngoại)",
        english: "Grandmother, old woman",
        example: "おばあさんがセーターを作ってくれました。"
      },
      {
        japanese: "おじさん",
        kana: "おじさん",
        vietnamese: "chú, bác (nam)",
        english: "Uncle, middle-aged man",
        example: "おじさんにお土産をもらいました。"
      },
      {
        japanese: "おばさん",
        kana: "おばさん",
        vietnamese: "cô, dì, bác (nữ)",
        english: "Aunt, middle-aged woman",
        example: "おばさんがケーキを作ってくれました。"
      },
      {
        japanese: "息子（むすこ）",
        kana: "むすこ",
        vietnamese: "con trai (của mình)",
        english: "Son",
        example: "息子は大学生です。"
      },
      {
        japanese: "娘（むすめ）",
        kana: "むすめ",
        vietnamese: "con gái (của mình)",
        english: "Daughter",
        example: "娘は高校生です。"
      },
      {
        japanese: "自分（じぶん）",
        kana: "じぶん",
        vietnamese: "bản thân, tự mình",
        english: "Oneself",
        example: "自分でやります。"
      },
      {
        japanese: "先輩（せんぱい）",
        kana: "せんぱい",
        vietnamese: "tiền bối, đàn anh/chị",
        english: "Senior (at work/school)",
        example: "先輩がいろいろ教えてくれました。"
      },
      {
        japanese: "後輩（こうはい）",
        kana: "こうはい",
        vietnamese: "hậu bối, đàn em",
        english: "Junior (at work/school)",
        example: "後輩に仕事を教えてあげました。"
      },
      {
        japanese: "社長（しゃちょう）",
        kana: "しゃちょう",
        vietnamese: "giám đốc, chủ tịch công ty",
        english: "Company president",
        example: "社長に紹介してもらいました。"
      },
      {
        japanese: "部長（ぶちょう）",
        kana: "ぶちょう",
        vietnamese: "trưởng phòng",
        english: "Department manager",
        example: "部長が推薦してくれました。"
      },
      {
        japanese: "課長（かちょう）",
        kana: "かちょう",
        vietnamese: "trưởng ban, trưởng bộ phận",
        english: "Section chief",
        example: "課長に相談しました。"
      },
      {
        japanese: "奥さん（おくさん）",
        kana: "おくさん",
        vietnamese: "vợ (của người khác)",
        english: "Wife (someone else's)",
        example: "田中さんの奥さんは先生です。"
      },
      {
        japanese: "ご主人（ごしゅじん）",
        kana: "ごしゅじん",
        vietnamese: "chồng (của người khác)",
        english: "Husband (someone else's)",
        example: "ご主人はお元気ですか。"
      },
      {
        japanese: "〜てあげます",
        kana: "〜てあげます",
        vietnamese: "làm ~ cho (ai đó)",
        english: "To do ~ for someone",
        example: "友達に日本語を教えてあげました。"
      },
      {
        japanese: "〜てもらいます",
        kana: "〜てもらいます",
        vietnamese: "được (ai đó) làm ~ cho",
        english: "To have someone do ~ for me",
        example: "友達に手伝ってもらいました。"
      },
      {
        japanese: "〜てくれます",
        kana: "〜てくれます",
        vietnamese: "(Ai đó) làm ~ cho tôi",
        english: "Someone does ~ for me",
        example: "母が料理を作ってくれました。"
      }
    ],
    grammar: [
      {
        pattern: "あげます / くれます / もらいます",
        vietnamese: "Cho (từ tôi) / Cho (cho tôi) / Nhận",
        english: "Give (from me) / Give (to me) / Receive",
        explanation: "Ba động từ chỉ việc cho nhận. あげます: tôi cho người khác. くれます: người khác cho tôi. もらいます: tôi nhận từ người khác.",
        examples: [
          {
            japanese: "私は　友達に　プレゼントを　あげました。",
            vietnamese: "Tôi đã tặng quà cho bạn.",
            english: "I gave a present to my friend."
          },
          {
            japanese: "友達が　私に　プレゼントを　くれました。",
            vietnamese: "Bạn đã tặng quà cho tôi.",
            english: "My friend gave me a present."
          },
          {
            japanese: "私は　友達に　プレゼントを　もらいました。",
            vietnamese: "Tôi đã nhận quà từ bạn.",
            english: "I received a present from my friend."
          }
        ]
      },
      {
        pattern: "〜てあげます / 〜てくれます / 〜てもらいます",
        vietnamese: "Làm ~ cho (ai) / (Ai) làm ~ cho tôi / Nhờ (ai) làm ~",
        english: "Do ~ for someone / Someone does ~ for me / Have someone do ~",
        explanation: "Động từ て-form kết hợp với động từ cho nhận. てあげます: làm giúp người khác. てくれます: người khác làm giúp tôi. てもらいます: được người khác làm giúp.",
        examples: [
          {
            japanese: "私は　弟に　日本語を　教えて　あげました。",
            vietnamese: "Tôi đã dạy tiếng Nhật cho em trai.",
            english: "I taught Japanese to my younger brother."
          },
          {
            japanese: "母が　料理を　作って　くれました。",
            vietnamese: "Mẹ đã nấu ăn cho tôi.",
            english: "My mother cooked for me."
          },
          {
            japanese: "私は　先生に　漢字を　教えて　もらいました。",
            vietnamese: "Tôi đã được thầy dạy chữ Hán.",
            english: "I had my teacher teach me kanji."
          }
        ]
      },
      {
        pattern: "〜に〜を　あげます",
        vietnamese: "Cho ~ (cho ai)",
        english: "Give ~ to someone",
        explanation: "Cấu trúc cho đồ vật. Người nhận + に + đồ vật + を + あげます. に chỉ người nhận, を chỉ đồ vật được cho.",
        examples: [
          {
            japanese: "田中さんに　花を　あげました。",
            vietnamese: "Tôi đã tặng hoa cho anh Tanaka.",
            english: "I gave flowers to Mr. Tanaka."
          },
          {
            japanese: "友達に　お土産を　あげます。",
            vietnamese: "Tôi tặng quà lưu niệm cho bạn.",
            english: "I give souvenirs to my friend."
          },
          {
            japanese: "妹に　本を　あげました。",
            vietnamese: "Tôi đã cho em gái quyển sách.",
            english: "I gave a book to my younger sister."
          }
        ]
      },
      {
        pattern: "〜に〜を　もらいます",
        vietnamese: "Nhận ~ từ (ai)",
        english: "Receive ~ from someone",
        explanation: "Cấu trúc nhận đồ vật. Người cho + に + đồ vật + を + もらいます. に chỉ người cho (nguồn gốc).",
        examples: [
          {
            japanese: "田中さんに　チョコレートを　もらいました。",
            vietnamese: "Tôi đã nhận chocolate từ anh Tanaka.",
            english: "I received chocolate from Mr. Tanaka."
          },
          {
            japanese: "誕生日に　両親に　時計を　もらいました。",
            vietnamese: "Sinh nhật tôi đã nhận đồng hồ từ bố mẹ.",
            english: "I received a watch from my parents on my birthday."
          },
          {
            japanese: "友達に　手紙を　もらいました。",
            vietnamese: "Tôi đã nhận thư từ bạn.",
            english: "I received a letter from my friend."
          }
        ]
      }
    ]
  };

// Minna no Nihongo — Lesson 20: 普通形 (Thể thông thường)
const LESSON_20_DATA =   {
    lessonNumber: 20,
    title: "普通形 (Thể thông thường)",
    vocabulary: [
      {
        japanese: "要ります（いります）",
        kana: "いります",
        vietnamese: "cần",
        english: "To need",
        example: "パスポートが要ります。"
      },
      {
        japanese: "調べます（しらべます）",
        kana: "しらべます",
        vietnamese: "tra cứu, điều tra",
        english: "To investigate, to look up",
        example: "辞書で言葉を調べます。"
      },
      {
        japanese: "直します（なおします）",
        kana: "なおします",
        vietnamese: "sửa chữa",
        english: "To fix, to repair",
        example: "時計を直します。"
      },
      {
        japanese: "修理します（しゅうりします）",
        kana: "しゅうりします",
        vietnamese: "sửa chữa (máy móc)",
        english: "To repair",
        example: "パソコンを修理します。"
      },
      {
        japanese: "着ます（きます）",
        kana: "きます",
        vietnamese: "mặc (áo)",
        english: "To wear (upper body)",
        example: "シャツを着ます。"
      },
      {
        japanese: "はきます",
        kana: "はきます",
        vietnamese: "mang, đi (giày/quần)",
        english: "To wear (lower body/shoes)",
        example: "靴をはきます。"
      },
      {
        japanese: "かぶります",
        kana: "かぶります",
        vietnamese: "đội (mũ)",
        english: "To wear (hat)",
        example: "帽子をかぶります。"
      },
      {
        japanese: "かけます",
        kana: "かけます",
        vietnamese: "đeo (kính)",
        english: "To wear (glasses)",
        example: "眼鏡をかけます。"
      },
      {
        japanese: "いる",
        kana: "いる",
        vietnamese: "có, ở (thể thông thường của います)",
        english: "To exist (animate, plain form)",
        example: "猫がいる。"
      },
      {
        japanese: "ある",
        kana: "ある",
        vietnamese: "có, ở (thể thông thường của あります)",
        english: "To exist (inanimate, plain form)",
        example: "本がある。"
      },
      {
        japanese: "付き合います（つきあいます）",
        kana: "つきあいます",
        vietnamese: "hẹn hò, giao tiếp",
        english: "To go out with, to associate with",
        example: "友達と付き合います。"
      },
      {
        japanese: "僕（ぼく）",
        kana: "ぼく",
        vietnamese: "tôi, mình (nam giới dùng)",
        english: "I (male, informal)",
        example: "僕は学生だ。"
      },
      {
        japanese: "君（きみ）",
        kana: "きみ",
        vietnamese: "bạn, cậu (thân mật)",
        english: "You (informal)",
        example: "君はどう思う？"
      },
      {
        japanese: "〜くん",
        kana: "〜くん",
        vietnamese: "hậu tố gọi thân mật (thường dùng cho nam)",
        english: "Suffix for boys/younger males",
        example: "田中くん、元気？"
      },
      {
        japanese: "お腹がすきました（おなかがすきました）",
        kana: "おなかがすきました",
        vietnamese: "đói bụng",
        english: "I'm hungry",
        example: "お腹がすきました。何か食べたいです。"
      },
      {
        japanese: "お腹がいっぱいです（おなかがいっぱいです）",
        kana: "おなかがいっぱいです",
        vietnamese: "no bụng",
        english: "I'm full",
        example: "もうお腹がいっぱいです。"
      },
      {
        japanese: "喉が渇きました（のどがかわきました）",
        kana: "のどがかわきました",
        vietnamese: "khát nước",
        english: "I'm thirsty",
        example: "喉が渇きました。水をください。"
      },
      {
        japanese: "すごい",
        kana: "すごい",
        vietnamese: "tuyệt vời, ghê gớm",
        english: "Amazing, great",
        example: "すごい！よくできたね。"
      },
      {
        japanese: "本当（ほんとう）",
        kana: "ほんとう",
        vietnamese: "thật, thực sự",
        english: "True, really",
        example: "本当？信じられない。"
      },
      {
        japanese: "嘘（うそ）",
        kana: "うそ",
        vietnamese: "nói dối, nói xạo",
        english: "Lie, not true",
        example: "嘘でしょう！"
      },
      {
        japanese: "だめ（な）",
        kana: "だめ",
        vietnamese: "không được, không tốt",
        english: "No good, not allowed",
        example: "ここで写真を撮っちゃだめです。"
      },
      {
        japanese: "普通形（ふつうけい）",
        kana: "ふつうけい",
        vietnamese: "thể thông thường",
        english: "Plain form",
        example: ""
      },
      {
        japanese: "つまり",
        kana: "つまり",
        vietnamese: "nghĩa là, tức là",
        english: "In other words, that is to say",
        example: "つまり、行かないということですか。"
      },
      {
        japanese: "例えば（たとえば）",
        kana: "たとえば",
        vietnamese: "ví dụ",
        english: "For example",
        example: "例えば、寿司やラーメンが好きです。"
      },
      {
        japanese: "ところで",
        kana: "ところで",
        vietnamese: "à mà, nhân tiện",
        english: "By the way",
        example: "ところで、明日暇？"
      },
      {
        japanese: "遅くなります（おそくなります）",
        kana: "おそくなります",
        vietnamese: "bị muộn, trở nên trễ",
        english: "To become late",
        example: "帰りが遅くなります。"
      },
      {
        japanese: "まあまあ",
        kana: "まあまあ",
        vietnamese: "tàm tạm, bình thường",
        english: "So-so",
        example: "最近どう？まあまあだよ。"
      }
    ],
    grammar: [
      {
        pattern: "普通形（Plain form）",
        vietnamese: "Thể thông thường (thường thể)",
        english: "Plain form (casual form)",
        explanation: "Dạng thường của động từ/tính từ/danh từ. Động từ: 行く/行かない/行った/行かなかった. い形: 高い/高くない. な形・名詞: だ/じゃない/だった/じゃなかった.",
        examples: [
          {
            japanese: "動詞：行く、行かない、行った、行かなかった",
            vietnamese: "Động từ: đi, không đi, đã đi, đã không đi",
            english: "Verb: go, don't go, went, didn't go"
          },
          {
            japanese: "い形容詞：高い、高くない、高かった、高くなかった",
            vietnamese: "Tính từ い: cao, không cao, đã cao, đã không cao",
            english: "い-adjective: expensive, not expensive, was expensive, wasn't expensive"
          },
          {
            japanese: "な形容詞・名詞：静かだ、静かじゃない、静かだった",
            vietnamese: "Tính từ な/Danh từ: yên tĩnh, không yên, đã yên",
            english: "な-adjective/Noun: quiet, not quiet, was quiet"
          }
        ]
      },
      {
        pattern: "〜と思います",
        vietnamese: "Tôi nghĩ rằng ~",
        english: "I think that ~",
        explanation: "Diễn tả ý kiến, suy nghĩ của bản thân. Dùng thể thường + と思います. Danh từ và な形 không cần だ trước と思います.",
        examples: [
          {
            japanese: "明日は　雨が　降ると　思います。",
            vietnamese: "Tôi nghĩ ngày mai sẽ mưa.",
            english: "I think it will rain tomorrow."
          },
          {
            japanese: "この　映画は　面白いと　思います。",
            vietnamese: "Tôi nghĩ bộ phim này thú vị.",
            english: "I think this movie is interesting."
          },
          {
            japanese: "田中さんは　来ないと　思います。",
            vietnamese: "Tôi nghĩ anh Tanaka sẽ không đến.",
            english: "I think Mr. Tanaka won't come."
          }
        ]
      },
      {
        pattern: "〜と言いました / 〜と言っていました",
        vietnamese: "~ đã nói rằng ~",
        english: "~ said that ~",
        explanation: "Trích dẫn lời nói của người khác. Dùng thể thường + と言いました. 言っていました nhấn mạnh thời điểm trong quá khứ.",
        examples: [
          {
            japanese: "田中さんは　明日　来ると　言いました。",
            vietnamese: "Anh Tanaka đã nói rằng ngày mai sẽ đến.",
            english: "Mr. Tanaka said he would come tomorrow."
          },
          {
            japanese: "先生は　試験は　難しいと　言っていました。",
            vietnamese: "Thầy giáo đã nói rằng bài thi khó.",
            english: "The teacher said the exam was difficult."
          },
          {
            japanese: "山田さんは　忙しいと　言っていました。",
            vietnamese: "Chị Yamada đã nói rằng bận.",
            english: "Ms. Yamada said she was busy."
          }
        ]
      },
      {
        pattern: "〜でしょう",
        vietnamese: "Có lẽ ~, chắc là ~ (suy đoán)",
        english: "Probably ~, I suppose ~",
        explanation: "Diễn tả suy đoán, dự đoán. Động từ/い形 thể thường + でしょう. な形・名詞bỏ だ + でしょう. Lịch sự hơn: と思います.",
        examples: [
          {
            japanese: "明日は　雨が　降るでしょう。",
            vietnamese: "Ngày mai có lẽ sẽ mưa.",
            english: "It will probably rain tomorrow."
          },
          {
            japanese: "この　本は　面白いでしょう。",
            vietnamese: "Quyển sách này chắc thú vị.",
            english: "This book is probably interesting."
          },
          {
            japanese: "田中さんは　もう　帰ったでしょう。",
            vietnamese: "Anh Tanaka có lẽ đã về rồi.",
            english: "Mr. Tanaka has probably gone home already."
          }
        ]
      }
    ]
  };

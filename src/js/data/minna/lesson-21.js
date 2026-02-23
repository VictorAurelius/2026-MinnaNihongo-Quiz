// Minna no Nihongo — Lesson 21: 〜と思います (Tôi nghĩ rằng ~)
const LESSON_21_DATA =   {
    lessonNumber: 21,
    title: "〜と思います (Tôi nghĩ rằng ~)",
    vocabulary: [
      {
        japanese: "思います（おもいます）",
        kana: "おもいます",
        vietnamese: "nghĩ",
        english: "To think",
        example: "日本語は面白いと思います。"
      },
      {
        japanese: "言います（いいます）",
        kana: "いいます",
        vietnamese: "nói",
        english: "To say",
        example: "先生は明日テストがあると言いました。"
      },
      {
        japanese: "勝ちます（かちます）",
        kana: "かちます",
        vietnamese: "thắng",
        english: "To win",
        example: "日本チームが勝ちました。"
      },
      {
        japanese: "負けます（まけます）",
        kana: "まけます",
        vietnamese: "thua",
        english: "To lose",
        example: "試合に負けました。"
      },
      {
        japanese: "足ります（たります）",
        kana: "たります",
        vietnamese: "đủ",
        english: "To be enough, to suffice",
        example: "お金が足りません。"
      },
      {
        japanese: "役に立ちます（やくにたちます）",
        kana: "やくにたちます",
        vietnamese: "có ích",
        english: "To be useful",
        example: "この辞書は役に立ちます。"
      },
      {
        japanese: "動きます（うごきます）",
        kana: "うごきます",
        vietnamese: "chuyển động, hoạt động",
        english: "To move, to work (machine)",
        example: "時計が動きません。"
      },
      {
        japanese: "咲きます（さきます）",
        kana: "さきます",
        vietnamese: "nở (hoa)",
        english: "To bloom",
        example: "桜が咲きました。"
      },
      {
        japanese: "変わります（かわります）",
        kana: "かわります",
        vietnamese: "thay đổi",
        english: "To change",
        example: "信号が変わりました。"
      },
      {
        japanese: "届きます（とどきます）",
        kana: "とどきます",
        vietnamese: "được giao đến, tới nơi",
        english: "To be delivered, to arrive",
        example: "手紙が届きました。"
      },
      {
        japanese: "困ります（こまります）",
        kana: "こまります",
        vietnamese: "gặp khó khăn, phiền",
        english: "To be troubled",
        example: "お金がなくて困ります。"
      },
      {
        japanese: "開きます（ひらきます）",
        kana: "ひらきます",
        vietnamese: "mở (tự mở ra)",
        english: "To open (intransitive)",
        example: "ドアが開きました。"
      },
      {
        japanese: "閉まります（しまります）",
        kana: "しまります",
        vietnamese: "đóng (tự đóng)",
        english: "To close (intransitive)",
        example: "店が閉まりました。"
      },
      {
        japanese: "つきます",
        kana: "つきます",
        vietnamese: "bật (đèn tự sáng)",
        english: "To turn on (intransitive)",
        example: "電気がつきました。"
      },
      {
        japanese: "消えます（きえます）",
        kana: "きえます",
        vietnamese: "tắt, biến mất",
        english: "To go out, to disappear",
        example: "電気が消えました。"
      },
      {
        japanese: "壊れます（こわれます）",
        kana: "こわれます",
        vietnamese: "bị hỏng, bị vỡ",
        english: "To break (intransitive)",
        example: "パソコンが壊れました。"
      },
      {
        japanese: "割れます（われます）",
        kana: "われます",
        vietnamese: "bị vỡ, bị nứt",
        english: "To crack, to break",
        example: "コップが割れました。"
      },
      {
        japanese: "折れます（おれます）",
        kana: "おれます",
        vietnamese: "bị gãy",
        english: "To break, to snap",
        example: "木の枝が折れました。"
      },
      {
        japanese: "汚れます（よごれます）",
        kana: "よごれます",
        vietnamese: "bị bẩn",
        english: "To get dirty",
        example: "服が汚れました。"
      },
      {
        japanese: "付きます（つきます）",
        kana: "つきます",
        vietnamese: "dính, được gắn vào",
        english: "To be attached",
        example: "エアコンが付いています。"
      },
      {
        japanese: "見つかります（みつかります）",
        kana: "みつかります",
        vietnamese: "được tìm thấy",
        english: "To be found",
        example: "鍵が見つかりました。"
      },
      {
        japanese: "将来（しょうらい）",
        kana: "しょうらい",
        vietnamese: "tương lai",
        english: "Future",
        example: "将来、医者になりたいです。"
      },
      {
        japanese: "夢（ゆめ）",
        kana: "ゆめ",
        vietnamese: "giấc mơ, ước mơ",
        english: "Dream",
        example: "私の夢は先生になることです。"
      },
      {
        japanese: "ニュース",
        kana: "ニュース",
        vietnamese: "tin tức",
        english: "News",
        example: "毎朝ニュースを見ます。"
      },
      {
        japanese: "政治（せいじ）",
        kana: "せいじ",
        vietnamese: "chính trị",
        english: "Politics",
        example: "政治に興味がありません。"
      },
      {
        japanese: "社会（しゃかい）",
        kana: "しゃかい",
        vietnamese: "xã hội",
        english: "Society",
        example: "社会の問題について話しました。"
      },
      {
        japanese: "歴史（れきし）",
        kana: "れきし",
        vietnamese: "lịch sử",
        english: "History",
        example: "日本の歴史を勉強しています。"
      },
      {
        japanese: "事故（じこ）",
        kana: "じこ",
        vietnamese: "tai nạn",
        english: "Accident",
        example: "交通事故がありました。"
      },
      {
        japanese: "地震（じしん）",
        kana: "じしん",
        vietnamese: "động đất",
        english: "Earthquake",
        example: "昨日地震がありました。"
      },
      {
        japanese: "台風（たいふう）",
        kana: "たいふう",
        vietnamese: "bão",
        english: "Typhoon",
        example: "台風が来ると思います。"
      },
      {
        japanese: "戦争（せんそう）",
        kana: "せんそう",
        vietnamese: "chiến tranh",
        english: "War",
        example: "戦争は絶対にだめだと思います。"
      },
      {
        japanese: "平和（へいわ）",
        kana: "へいわ",
        vietnamese: "hòa bình",
        english: "Peace",
        example: "世界の平和を願っています。"
      },
      {
        japanese: "必要（な）（ひつよう）",
        kana: "ひつよう",
        vietnamese: "cần thiết",
        english: "Necessary",
        example: "パスポートが必要です。"
      },
      {
        japanese: "無理（な）（むり）",
        kana: "むり",
        vietnamese: "không thể, quá sức",
        english: "Impossible, unreasonable",
        example: "それは無理だと思います。"
      },
      {
        japanese: "〜と思います（〜とおもいます）",
        kana: "〜とおもいます",
        vietnamese: "tôi nghĩ rằng ~",
        english: "I think that ~",
        example: "明日は雨だと思います。"
      },
      {
        japanese: "〜と言いました（〜といいました）",
        kana: "〜といいました",
        vietnamese: "đã nói rằng ~",
        english: "Said that ~",
        example: "先生は明日休みだと言いました。"
      },
      {
        japanese: "〜でしょう？",
        kana: "〜でしょう",
        vietnamese: "~ phải không? (xác nhận)",
        english: "~ right? (seeking confirmation)",
        example: "明日は日曜日でしょう？"
      }
    ],
    grammar: [
      {
        pattern: "〜と思っています",
        vietnamese: "Tôi đang nghĩ rằng ~ (ý định)",
        english: "I'm thinking that ~ (intention)",
        explanation: "Diễn tả ý định, kế hoạch đã suy nghĩ từ trước. Khác với と思います (ý kiến tức thời), と思っています nhấn mạnh sự suy nghĩ kéo dài.",
        examples: [
          {
            japanese: "将来　医者に　なろうと　思っています。",
            vietnamese: "Tôi đang nghĩ sẽ trở thành bác sĩ trong tương lai.",
            english: "I'm thinking of becoming a doctor in the future."
          },
          {
            japanese: "来年　日本に　留学しようと　思っています。",
            vietnamese: "Tôi đang nghĩ năm sau sẽ du học Nhật.",
            english: "I'm thinking of studying abroad in Japan next year."
          },
          {
            japanese: "今度の　休みに　京都へ　行こうと　思っています。",
            vietnamese: "Tôi đang nghĩ kỳ nghỉ tới sẽ đi Kyoto.",
            english: "I'm thinking of going to Kyoto during the next holiday."
          }
        ]
      },
      {
        pattern: "〜と言っていました",
        vietnamese: "~ đã nói rằng ~",
        english: "~ said that ~",
        explanation: "Trích dẫn lời nói của người khác trong quá khứ. Dùng thể thường + と言っていました. Nhấn mạnh hành động nói trong một khoảng thời gian.",
        examples: [
          {
            japanese: "田中さんは　今日は　来られないと　言っていました。",
            vietnamese: "Anh Tanaka đã nói rằng hôm nay không thể đến.",
            english: "Mr. Tanaka said he couldn't come today."
          },
          {
            japanese: "先生は　宿題を　忘れないでと　言っていました。",
            vietnamese: "Thầy đã dặn đừng quên bài tập.",
            english: "The teacher said not to forget the homework."
          },
          {
            japanese: "友達は　日本語は　難しいと　言っていました。",
            vietnamese: "Bạn tôi đã nói tiếng Nhật khó.",
            english: "My friend said Japanese was difficult."
          }
        ]
      },
      {
        pattern: "〜でしょう",
        vietnamese: "Có lẽ ~, chắc ~ (dự đoán)",
        english: "Probably ~, I suppose ~",
        explanation: "Diễn tả suy đoán của người nói. Động từ/い形 thể thường + でしょう. な形・名詞 bỏ だ + でしょう. Lịch sự hơn と思います.",
        examples: [
          {
            japanese: "明日は　雨が　降るでしょう。",
            vietnamese: "Ngày mai có lẽ sẽ mưa.",
            english: "It will probably rain tomorrow."
          },
          {
            japanese: "この　試験は　難しいでしょう。",
            vietnamese: "Kỳ thi này chắc khó.",
            english: "This exam is probably difficult."
          },
          {
            japanese: "田中さんは　もう　寝たでしょう。",
            vietnamese: "Anh Tanaka có lẽ đã ngủ rồi.",
            english: "Mr. Tanaka has probably gone to bed already."
          }
        ]
      },
      {
        pattern: "〜でしょう？（上昇調）",
        vietnamese: "~ phải không? (xác nhận)",
        english: "~ right? (seeking confirmation)",
        explanation: "Dùng でしょう với ngữ điệu lên cuối câu để xác nhận thông tin với người nghe. Có nghĩa 'đúng không?', 'phải không?'.",
        examples: [
          {
            japanese: "明日は　日曜日でしょう？",
            vietnamese: "Ngày mai là chủ nhật phải không?",
            english: "Tomorrow is Sunday, right?"
          },
          {
            japanese: "あなたも　行くでしょう？",
            vietnamese: "Bạn cũng đi phải không?",
            english: "You're going too, right?"
          },
          {
            japanese: "この　本、読んだでしょう？",
            vietnamese: "Bạn đã đọc quyển sách này rồi phải không?",
            english: "You've read this book, haven't you?"
          }
        ]
      }
    ]
  };

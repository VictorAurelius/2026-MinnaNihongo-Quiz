// Minna no Nihongo — Lesson 13: ほしい・〜たい (Mong muốn, gọi món)
const LESSON_13_DATA =   {
    lessonNumber: 13,
    title: "ほしい・〜たい (Mong muốn, gọi món)",
    vocabulary: [
      {
        japanese: "欲しい（ほしい）",
        kana: "ほしい",
        vietnamese: "muốn (đồ vật)",
        english: "To want (something)",
        example: "新しい　パソコンが　欲しいです。"
      },
      {
        japanese: "〜たいです",
        kana: "たいです",
        vietnamese: "muốn (làm gì)",
        english: "Want to (do something)",
        example: "日本へ　行きたいです。"
      },
      {
        japanese: "遊びます（あそびます）",
        kana: "あそびます",
        vietnamese: "chơi",
        english: "To play, to enjoy oneself",
        example: "公園で　遊びます。"
      },
      {
        japanese: "泳ぎます（およぎます）",
        kana: "およぎます",
        vietnamese: "bơi",
        english: "To swim",
        example: "プールで　泳ぎたいです。"
      },
      {
        japanese: "迎えに行きます（むかえにいきます）",
        kana: "むかえにいきます",
        vietnamese: "đi đón",
        english: "To go to pick up (someone)",
        example: "空港へ　迎えに行きます。"
      },
      {
        japanese: "疲れました（つかれました）",
        kana: "つかれました",
        vietnamese: "mệt rồi",
        english: "I'm tired",
        example: "きょうは　とても　疲れました。"
      },
      {
        japanese: "のど",
        kana: "のど",
        vietnamese: "cổ họng",
        english: "Throat",
        example: "のどが　渇きました。"
      },
      {
        japanese: "お腹（おなか）",
        kana: "おなか",
        vietnamese: "bụng",
        english: "Stomach",
        example: "お腹が　すきました。"
      },
      {
        japanese: "子供（こども）",
        kana: "こども",
        vietnamese: "trẻ em, con cái",
        english: "Child, children",
        example: ""
      },
      {
        japanese: "店（みせ）",
        kana: "みせ",
        vietnamese: "cửa hàng, tiệm",
        english: "Shop, store",
        example: ""
      },
      {
        japanese: "レストラン",
        kana: "レストラン",
        vietnamese: "nhà hàng",
        english: "Restaurant",
        example: "あの　レストランで　食べたいです。"
      },
      {
        japanese: "プール",
        kana: "プール",
        vietnamese: "bể bơi",
        english: "Swimming pool",
        example: ""
      },
      {
        japanese: "川（かわ）",
        kana: "かわ",
        vietnamese: "sông",
        english: "River",
        example: ""
      },
      {
        japanese: "経済（けいざい）",
        kana: "けいざい",
        vietnamese: "kinh tế",
        english: "Economy, economics",
        example: ""
      },
      {
        japanese: "美術（びじゅつ）",
        kana: "びじゅつ",
        vietnamese: "mỹ thuật",
        english: "Art, fine arts",
        example: "美術の　本が　欲しいです。"
      },
      {
        japanese: "釣り（つり）",
        kana: "つり",
        vietnamese: "câu cá",
        english: "Fishing",
        example: "釣りに　行きたいです。"
      },
      {
        japanese: "スキー",
        kana: "スキー",
        vietnamese: "trượt tuyết",
        english: "Skiing",
        example: "冬は　スキーに　行きたいです。"
      },
      {
        japanese: "会議（かいぎ）",
        kana: "かいぎ",
        vietnamese: "cuộc họp",
        english: "Meeting, conference",
        example: "あした　会議が　あります。"
      },
      {
        japanese: "登録（とうろく）",
        kana: "とうろく",
        vietnamese: "đăng ký",
        english: "Registration",
        example: ""
      },
      {
        japanese: "週末（しゅうまつ）",
        kana: "しゅうまつ",
        vietnamese: "cuối tuần",
        english: "Weekend",
        example: "週末　何を　したいですか。"
      },
      {
        japanese: "〜ごろ",
        kana: "ごろ",
        vietnamese: "khoảng ~ (thời gian)",
        english: "About, around (time)",
        example: "12時ごろ　昼ごはんを　食べます。"
      },
      {
        japanese: "何か（なにか）",
        kana: "なにか",
        vietnamese: "cái gì đó",
        english: "Something",
        example: "何か　食べたいです。"
      },
      {
        japanese: "どこか",
        kana: "どこか",
        vietnamese: "nơi nào đó",
        english: "Somewhere",
        example: "週末　どこか　行きたいですか。"
      },
      {
        japanese: "別々に（べつべつに）",
        kana: "べつべつに",
        vietnamese: "riêng, tách biệt",
        english: "Separately",
        example: "お会計は　別々に　お願いします。"
      },
      {
        japanese: "いかがですか",
        kana: "いかがですか",
        vietnamese: "thế nào ạ? (lịch sự)",
        english: "How about? (polite)",
        example: "コーヒーは　いかがですか。"
      },
      {
        japanese: "ください",
        kana: "ください",
        vietnamese: "cho tôi, xin hãy",
        english: "Please give me",
        example: "これを　ください。"
      },
      {
        japanese: "じゃ",
        kana: "じゃ",
        vietnamese: "vậy thì",
        english: "Well then",
        example: "じゃ、コーヒーを　ください。"
      },
      {
        japanese: "注文（ちゅうもん）",
        kana: "ちゅうもん",
        vietnamese: "gọi món, đặt hàng",
        english: "Order",
        example: "ご注文は？"
      }
    ],
    grammar: [
      {
        pattern: "〜たいです",
        vietnamese: "Muốn ~",
        english: "Want to ~",
        explanation: "Diễn tả mong muốn của bản thân. Động từ ます-form bỏ ます, thêm たいです. Phủ định: たくないです. VD: 行きます → 行きたいです。",
        examples: [
          {
            japanese: "日本に　行きたいです。",
            vietnamese: "Tôi muốn đi Nhật.",
            english: "I want to go to Japan."
          },
          {
            japanese: "寿司が　食べたいです。",
            vietnamese: "Tôi muốn ăn sushi.",
            english: "I want to eat sushi."
          },
          {
            japanese: "今日は　何も　したくないです。",
            vietnamese: "Hôm nay tôi không muốn làm gì cả.",
            english: "I don't want to do anything today."
          }
        ]
      },
      {
        pattern: "〜に　行きます / 来ます / 帰ります",
        vietnamese: "Đi/Đến/Về để ~ (mục đích)",
        english: "Go/Come/Return to do ~",
        explanation: "Diễn tả mục đích của việc di chuyển. Dùng danh từ + に hoặc động từ ます-form (bỏ ます) + に. VD: 勉強します → 勉強しに、買います → 買いに。",
        examples: [
          {
            japanese: "映画を　見に　行きます。",
            vietnamese: "Tôi đi xem phim.",
            english: "I go to watch a movie."
          },
          {
            japanese: "日本へ　日本語を　勉強しに　来ました。",
            vietnamese: "Tôi đến Nhật để học tiếng Nhật.",
            english: "I came to Japan to study Japanese."
          },
          {
            japanese: "昼ごはんを　食べに　帰ります。",
            vietnamese: "Tôi về nhà để ăn trưa.",
            english: "I return home to eat lunch."
          }
        ]
      },
      {
        pattern: "どこかに / 何か / だれか",
        vietnamese: "Đâu đó, cái gì đó, ai đó",
        english: "Somewhere, something, someone",
        explanation: "Thêm か sau từ để hỏi (どこ, 何, だれ) để tạo nghĩa 'nào đó'. Dùng trong câu khẳng định và nghi vấn. Phủ định: どこにも (đâu cũng không).",
        examples: [
          {
            japanese: "休みに　どこかに　行きますか。",
            vietnamese: "Kỳ nghỉ bạn có đi đâu đó không?",
            english: "Will you go somewhere during the holiday?"
          },
          {
            japanese: "何か　食べたいです。",
            vietnamese: "Tôi muốn ăn gì đó.",
            english: "I want to eat something."
          },
          {
            japanese: "だれかに　会いましたか。",
            vietnamese: "Bạn đã gặp ai đó chưa?",
            english: "Did you meet someone?"
          }
        ]
      },
      {
        pattern: "ご〜",
        vietnamese: "Tiền tố lịch sự",
        english: "Honorific prefix",
        explanation: "Thêm ご trước danh từ Sino-Japanese (từ Hán) để tỏ lịch sự. VD: ご家族 (gia đình quý vị), ご注文 (đơn đặt hàng của quý khách).",
        examples: [
          {
            japanese: "ご家族は　何人ですか。",
            vietnamese: "Gia đình quý vị có mấy người?",
            english: "How many people are in your family?"
          },
          {
            japanese: "ご注文は？",
            vietnamese: "Quý khách gọi gì ạ?",
            english: "What would you like to order?"
          },
          {
            japanese: "ご住所を　お願いします。",
            vietnamese: "Xin cho biết địa chỉ của quý vị.",
            english: "May I have your address, please?"
          }
        ]
      }
    ]
  };

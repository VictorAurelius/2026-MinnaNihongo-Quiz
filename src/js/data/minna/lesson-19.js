// Minna no Nihongo — Lesson 19: た形 (Thể た — kinh nghiệm, liệt kê hoạt động)
const LESSON_19_DATA =   {
    lessonNumber: 19,
    title: "た形 (Thể た — kinh nghiệm, liệt kê hoạt động)",
    vocabulary: [
      {
        japanese: "登（のぼ）ります",
        kana: "のぼります",
        vietnamese: "leo (núi)",
        english: "To climb",
        example: "富士山に登ったことがありますか。"
      },
      {
        japanese: "泊（と）まります",
        kana: "とまります",
        vietnamese: "ở lại, nghỉ qua đêm",
        english: "To stay (overnight)",
        example: "旅館に泊まったことがありますか。"
      },
      {
        japanese: "掃除（そうじ）します",
        kana: "そうじします",
        vietnamese: "dọn dẹp, quét dọn",
        english: "To clean",
        example: "部屋を掃除したり、洗濯したりします。"
      },
      {
        japanese: "洗濯（せんたく）します",
        kana: "せんたくします",
        vietnamese: "giặt giũ",
        english: "To do laundry",
        example: "日曜日に洗濯したり、買い物したりします。"
      },
      {
        japanese: "練習（れんしゅう）します",
        kana: "れんしゅうします",
        vietnamese: "luyện tập",
        english: "To practice",
        example: "毎日日本語を練習しています。"
      },
      {
        japanese: "引（ひ）っ越（こ）します",
        kana: "ひっこしします",
        vietnamese: "chuyển nhà",
        english: "To move (house)",
        example: "来月東京に引っ越します。"
      },
      {
        japanese: "なります",
        kana: "なります",
        vietnamese: "trở nên, trở thành",
        english: "To become",
        example: "日本語が上手になりました。"
      },
      {
        japanese: "痩（や）せます",
        kana: "やせます",
        vietnamese: "gầy đi, giảm cân",
        english: "To become thin / to lose weight",
        example: "最近痩せましたね。"
      },
      {
        japanese: "太（ふと）ります",
        kana: "ふとります",
        vietnamese: "mập lên, tăng cân",
        english: "To become fat / to gain weight",
        example: "最近太りました。"
      },
      {
        japanese: "生（う）まれます",
        kana: "うまれます",
        vietnamese: "được sinh ra",
        english: "To be born",
        example: "東京で生まれました。"
      },
      {
        japanese: "お正月（おしょうがつ）",
        kana: "おしょうがつ",
        vietnamese: "Tết Nhật Bản",
        english: "New Year",
        example: "お正月に何をしましたか。"
      },
      {
        japanese: "美容院（びよういん）",
        kana: "びよういん",
        vietnamese: "tiệm làm tóc",
        english: "Beauty salon / hair salon",
        example: "美容院で髪を切りました。"
      },
      {
        japanese: "試合（しあい）",
        kana: "しあい",
        vietnamese: "trận đấu",
        english: "Match / game (sports)",
        example: "サッカーの試合を見たことがありますか。"
      },
      {
        japanese: "サーフィン",
        kana: "サーフィン",
        vietnamese: "lướt sóng",
        english: "Surfing",
        example: "サーフィンをしたことがありますか。"
      },
      {
        japanese: "お遍路（おへんろ）",
        kana: "おへんろ",
        vietnamese: "hành hương (88 chùa ở Shikoku)",
        english: "Shikoku pilgrimage",
        example: "お遍路をしたことがありますか。"
      },
      {
        japanese: "柔道（じゅうどう）",
        kana: "じゅうどう",
        vietnamese: "nhu đạo (judo)",
        english: "Judo",
        example: "柔道を習ったことがありますか。"
      },
      {
        japanese: "空手（からて）",
        kana: "からて",
        vietnamese: "karate (không thủ đạo)",
        english: "Karate",
        example: "空手をしたことがあります。"
      },
      {
        japanese: "相撲（すもう）",
        kana: "すもう",
        vietnamese: "sumo (đấu vật Nhật)",
        english: "Sumo wrestling",
        example: "相撲を見たことがありますか。"
      },
      {
        japanese: "剣道（けんどう）",
        kana: "けんどう",
        vietnamese: "kiếm đạo (kendo)",
        english: "Kendo",
        example: "剣道を練習したことがあります。"
      },
      {
        japanese: "生（い）け花（ばな）",
        kana: "いけばな",
        vietnamese: "cắm hoa Nhật Bản",
        english: "Japanese flower arrangement",
        example: "生け花を習ったことがありますか。"
      },
      {
        japanese: "茶道（さどう）",
        kana: "さどう",
        vietnamese: "trà đạo",
        english: "Tea ceremony",
        example: "茶道をしたことがあります。"
      },
      {
        japanese: "一度（いちど）",
        kana: "いちど",
        vietnamese: "một lần",
        english: "Once / one time",
        example: "一度富士山に登ったことがあります。"
      },
      {
        japanese: "一度（いちど）も",
        kana: "いちども",
        vietnamese: "chưa bao giờ (dùng với phủ định)",
        english: "Never (with negative)",
        example: "一度も日本へ行ったことがありません。"
      },
      {
        japanese: "〜たことがあります",
        kana: "〜たことがあります",
        vietnamese: "đã từng ~",
        english: "Have experienced ~ / have done ~ before",
        example: "日本料理を食べたことがあります。"
      },
      {
        japanese: "〜たり〜たりします",
        kana: "〜たり〜たりします",
        vietnamese: "làm những việc như ~ và ~",
        english: "Do things like ~ and ~",
        example: "休みの日は本を読んだり、映画を見たりします。"
      }
    ],
    grammar: [
      {
        pattern: "た形（た-form）",
        vietnamese: "Thể た (quá khứ thường)",
        english: "た-form (plain past)",
        explanation: "Dạng quá khứ thường của động từ. て-form chuyển て→た, で→だ. VD: 買って→買った, 食べて→食べた, 飲んで→飲んだ.",
        examples: [
          {
            japanese: "行きます　→　行った",
            vietnamese: "đi → đã đi",
            english: "go → went"
          },
          {
            japanese: "食べます　→　食べた",
            vietnamese: "ăn → đã ăn",
            english: "eat → ate"
          },
          {
            japanese: "来ます　→　来（き）た",
            vietnamese: "đến → đã đến",
            english: "come → came"
          }
        ]
      },
      {
        pattern: "〜たことがあります",
        vietnamese: "Đã từng ~",
        english: "Have done ~ (experience)",
        explanation: "Diễn tả kinh nghiệm đã làm việc gì đó trong quá khứ. Động từ た-form + ことがあります. Phủ định: ことがありません (chưa từng).",
        examples: [
          {
            japanese: "富士山に　登ったことが　あります。",
            vietnamese: "Tôi đã từng leo núi Phú Sĩ.",
            english: "I have climbed Mt. Fuji."
          },
          {
            japanese: "納豆を　食べたことが　ありますか。",
            vietnamese: "Bạn đã từng ăn natto chưa?",
            english: "Have you ever eaten natto?"
          },
          {
            japanese: "京都に　行ったことが　ありません。",
            vietnamese: "Tôi chưa từng đi Kyoto.",
            english: "I have never been to Kyoto."
          }
        ]
      },
      {
        pattern: "〜たり〜たりします",
        vietnamese: "Làm những việc như ~ và ~",
        english: "Do things like ~ and ~",
        explanation: "Liệt kê một số hoạt động đại diện, ngụ ý còn nhiều hoạt động khác. Động từ た-form + り, lặp lại + します. VD: 読んだり見たりします.",
        examples: [
          {
            japanese: "休みの　日は　本を　読んだり、音楽を　聞いたりします。",
            vietnamese: "Ngày nghỉ tôi đọc sách, nghe nhạc, v.v.",
            english: "On holidays, I read books, listen to music, and so on."
          },
          {
            japanese: "週末は　映画を　見たり、買い物したりします。",
            vietnamese: "Cuối tuần tôi xem phim, đi mua sắm, v.v.",
            english: "On weekends, I watch movies, go shopping, and so on."
          },
          {
            japanese: "朝は　散歩したり、ジョギングしたりします。",
            vietnamese: "Buổi sáng tôi đi dạo, chạy bộ, v.v.",
            english: "In the morning, I take walks, jog, and so on."
          }
        ]
      },
      {
        pattern: "〜たり〜たりしました",
        vietnamese: "Đã làm những việc như ~ và ~",
        english: "Did things like ~ and ~ (past)",
        explanation: "Dạng quá khứ của たり〜たりします. Diễn tả những hoạt động đã làm trong quá khứ.",
        examples: [
          {
            japanese: "京都で　お寺を　見たり、お土産を　買ったりしました。",
            vietnamese: "Ở Kyoto tôi đã xem chùa, mua quà, v.v.",
            english: "In Kyoto, I saw temples, bought souvenirs, and so on."
          },
          {
            japanese: "昨日は　掃除したり、洗濯したりしました。",
            vietnamese: "Hôm qua tôi đã dọn dẹp, giặt giũ, v.v.",
            english: "Yesterday, I cleaned, did laundry, and so on."
          },
          {
            japanese: "パーティーで　歌ったり、踊ったりしました。",
            vietnamese: "Ở tiệc tôi đã hát, nhảy, v.v.",
            english: "At the party, I sang, danced, and so on."
          }
        ]
      }
    ]
  };

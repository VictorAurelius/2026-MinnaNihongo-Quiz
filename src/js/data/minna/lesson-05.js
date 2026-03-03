// Minna no Nihongo — Lesson 05: ～へ 行きます (Đi đến ~)
const LESSON_05_DATA =   {
    lessonNumber: 5,
    title: "～へ 行きます (Đi đến ~)",
    vocabulary: [
      {
        japanese: "行きます（いきます）",
        kana: "いきます",
        vietnamese: "đi",
        type: "main",
        english: "to go",
        example: "がっこうへ いきます。"
      },
      {
        japanese: "来ます（きます）",
        kana: "きます",
        vietnamese: "đến",
        type: "main",
        english: "to come",
        example: "にほんへ きました。"
      },
      {
        japanese: "帰ります（かえります）",
        kana: "かえります",
        vietnamese: "về",
        type: "main",
        english: "to go back, to return",
        example: "うちへ かえります。"
      },
      {
        japanese: "学校（がっこう）",
        kana: "がっこう",
        vietnamese: "trường học",
        type: "main",
        english: "school",
        example: ""
      },
      {
        japanese: "スーパー",
        kana: "スーパー",
        vietnamese: "siêu thị",
        type: "main",
        english: "supermarket",
        example: ""
      },
      {
        japanese: "駅（えき）",
        kana: "えき",
        vietnamese: "nhà ga",
        type: "main",
        english: "station",
        example: ""
      },
      {
        japanese: "飛行機（ひこうき）",
        kana: "ひこうき",
        vietnamese: "máy bay",
        type: "main",
        english: "airplane",
        example: "ひこうきで にほんへ きました。"
      },
      {
        japanese: "船（ふね）",
        kana: "ふね",
        vietnamese: "tàu, thuyền",
        type: "main",
        english: "ship, boat",
        example: ""
      },
      {
        japanese: "電車（でんしゃ）",
        kana: "でんしゃ",
        vietnamese: "tàu điện",
        type: "main",
        english: "electric train",
        example: "でんしゃで がっこうへ いきます。"
      },
      {
        japanese: "バス",
        kana: "バス",
        vietnamese: "xe buýt",
        type: "main",
        english: "bus",
        example: ""
      },
      {
        japanese: "タクシー",
        kana: "タクシー",
        vietnamese: "taxi",
        type: "main",
        english: "taxi",
        example: ""
      },
      {
        japanese: "自転車（じてんしゃ）",
        kana: "じてんしゃ",
        vietnamese: "xe đạp",
        type: "main",
        english: "bicycle",
        example: ""
      },
      {
        japanese: "歩いて（あるいて）",
        kana: "あるいて",
        vietnamese: "đi bộ",
        type: "main",
        english: "on foot",
        example: "あるいて がっこうへ いきます。"
      },
      {
        japanese: "人（ひと）",
        kana: "ひと",
        vietnamese: "người",
        type: "main",
        english: "person, people",
        example: ""
      },
      {
        japanese: "友達（ともだち）",
        kana: "ともだち",
        vietnamese: "bạn bè",
        type: "main",
        english: "friend",
        example: "ともだちと いきます。"
      },
      {
        japanese: "彼（かれ）",
        kana: "かれ",
        vietnamese: "anh ấy",
        type: "main",
        english: "he, boyfriend",
        example: ""
      },
      {
        japanese: "彼女（かのじょ）",
        kana: "かのじょ",
        vietnamese: "cô ấy",
        type: "main",
        english: "she, girlfriend",
        example: ""
      },
      {
        japanese: "家族（かぞく）",
        kana: "かぞく",
        vietnamese: "gia đình",
        type: "main",
        english: "family",
        example: ""
      },
      {
        japanese: "一人で（ひとりで）",
        kana: "ひとりで",
        vietnamese: "một mình",
        type: "main",
        english: "alone, by oneself",
        example: "ひとりで いきます。"
      },
      {
        japanese: "先週（せんしゅう）",
        kana: "せんしゅう",
        vietnamese: "tuần trước",
        type: "main",
        english: "last week",
        example: ""
      },
      {
        japanese: "今週（こんしゅう）",
        kana: "こんしゅう",
        vietnamese: "tuần này",
        type: "main",
        english: "this week",
        example: ""
      },
      {
        japanese: "来週（らいしゅう）",
        kana: "らいしゅう",
        vietnamese: "tuần sau",
        type: "main",
        english: "next week",
        example: ""
      },
      {
        japanese: "先月（せんげつ）",
        kana: "せんげつ",
        vietnamese: "tháng trước",
        type: "main",
        english: "last month",
        example: ""
      },
      {
        japanese: "今月（こんげつ）",
        kana: "こんげつ",
        vietnamese: "tháng này",
        type: "main",
        english: "this month",
        example: ""
      },
      {
        japanese: "来月（らいげつ）",
        kana: "らいげつ",
        vietnamese: "tháng sau",
        type: "main",
        english: "next month",
        example: ""
      },
      {
        japanese: "去年（きょねん）",
        kana: "きょねん",
        vietnamese: "năm ngoái",
        type: "main",
        english: "last year",
        example: ""
      },
      {
        japanese: "今年（ことし）",
        kana: "ことし",
        vietnamese: "năm nay",
        type: "main",
        english: "this year",
        example: ""
      },
      {
        japanese: "来年（らいねん）",
        kana: "らいねん",
        vietnamese: "năm sau",
        type: "main",
        english: "next year",
        example: ""
      },
      {
        japanese: "～月（～がつ）",
        kana: "～がつ",
        vietnamese: "tháng ~",
        type: "main",
        english: "month ~",
        example: ""
      },
      {
        japanese: "何月（なんがつ）",
        kana: "なんがつ",
        vietnamese: "tháng mấy",
        type: "main",
        english: "what month",
        example: ""
      },
      {
        japanese: "～日（～にち）",
        kana: "～にち",
        vietnamese: "ngày ~",
        type: "main",
        english: "day ~",
        example: ""
      },
      {
        japanese: "何日（なんにち）",
        kana: "なんにち",
        vietnamese: "ngày mấy",
        type: "main",
        english: "what day",
        example: ""
      },
      {
        japanese: "いつ",
        kana: "いつ",
        vietnamese: "khi nào",
        type: "main",
        english: "when",
        example: "いつ にほんへ きましたか。"
      },
      {
        japanese: "誕生日（たんじょうび）",
        kana: "たんじょうび",
        vietnamese: "sinh nhật",
        type: "main",
        english: "birthday",
        example: "たんじょうびは いつですか。"
      },
      {
        japanese: "普通（ふつう）",
        kana: "ふつう",
        vietnamese: "bình thường, tàu thường",
        type: "main",
        english: "ordinary, local (train)",
        example: ""
      },
      {
        japanese: "急行（きゅうこう）",
        kana: "きゅうこう",
        vietnamese: "tàu nhanh",
        type: "main",
        english: "express (train)",
        example: ""
      },
      {
        japanese: "特急（とっきゅう）",
        kana: "とっきゅう",
        vietnamese: "tàu tốc hành",
        type: "main",
        english: "limited express",
        example: ""
      },
      {
        japanese: "次の（つぎの）",
        kana: "つぎの",
        vietnamese: "tiếp theo",
        type: "main",
        english: "next",
        example: ""
      },
      // Supplementary Vocabulary (参考語彙) - More Transportation
      {
        japanese: "新幹線（しんかんせん）",
        kana: "しんかんせん",
        vietnamese: "tàu cao tốc Shinkansen",
        english: "bullet train, Shinkansen",
        type: "supplementary",
        example: "新幹線で　東京へ　行きます。"
      },
      {
        japanese: "地下鉄（ちかてつ）",
        kana: "ちかてつ",
        vietnamese: "tàu điện ngầm",
        english: "subway, metro",
        type: "supplementary",
        example: ""
      },
      {
        japanese: "オートバイ",
        kana: "オートバイ",
        vietnamese: "xe máy",
        english: "motorcycle",
        type: "supplementary",
        example: ""
      }
    ],
    grammar: [
      {
        pattern: "～へ 行きます/来ます/帰ります",
        vietnamese: "đi/đến/về ~",
        type: "main",
        english: "go/come/return to ~",
        explanation: "Trợ từ 'へ' (đọc là 'e') chỉ hướng di chuyển.",
        examples: [
          {
            japanese: "わたしは がっこうへ いきます。",
            vietnamese: "Tôi đi đến trường.",
            type: "main",
        english: "I go to school."
          },
          {
            japanese: "にちようびに どこへ いきますか。",
            vietnamese: "Chủ nhật bạn đi đâu?",
            type: "main",
        english: "Where do you go on Sunday?"
          },
          {
            japanese: "7じに うちへ かえります。",
            vietnamese: "Tôi về nhà lúc 7 giờ.",
            type: "main",
        english: "I return home at 7 o'clock."
          }
        ]
      },
      {
        pattern: "～で 行きます/来ます/帰ります",
        vietnamese: "đi/đến/về bằng ~",
        type: "main",
        english: "go/come/return by ~",
        explanation: "Trợ từ 'で' chỉ phương tiện di chuyển.",
        examples: [
          {
            japanese: "でんしゃで かいしゃへ いきます。",
            vietnamese: "Tôi đi công ty bằng tàu điện.",
            type: "main",
        english: "I go to the company by train."
          },
          {
            japanese: "ひこうきで にほんへ きました。",
            vietnamese: "Tôi đến Nhật bằng máy bay.",
            type: "main",
        english: "I came to Japan by airplane."
          },
          {
            japanese: "あるいて うちへ かえります。",
            vietnamese: "Tôi về nhà bằng cách đi bộ.",
            type: "main",
        english: "I return home on foot."
          }
        ]
      },
      {
        pattern: "～と ～へ 行きます",
        vietnamese: "đi ~ với ~",
        type: "main",
        english: "go to ~ with ~",
        explanation: "Trợ từ 'と' chỉ người đồng hành.",
        examples: [
          {
            japanese: "ともだちと えいがを みに いきます。",
            vietnamese: "Tôi đi xem phim với bạn.",
            type: "main",
        english: "I go to see a movie with my friend."
          },
          {
            japanese: "だれと きましたか。",
            vietnamese: "Bạn đến với ai?",
            type: "main",
        english: "Who did you come with?"
          }
        ]
      },
      {
        pattern: "いつ ～ますか",
        vietnamese: "khi nào ~?",
        type: "main",
        english: "when ~?",
        explanation: "Câu hỏi về thời gian. 'いつ' nghĩa là 'khi nào'. Không dùng 'に' sau 'いつ'.",
        examples: [
          {
            japanese: "いつ にほんへ きましたか。",
            vietnamese: "Khi nào bạn đến Nhật?",
            type: "main",
        english: "When did you come to Japan?"
          },
          {
            japanese: "いつ くにへ かえりますか。",
            vietnamese: "Khi nào bạn về nước?",
            type: "main",
        english: "When will you return to your country?"
          }
        ]
      }
    ]
  };

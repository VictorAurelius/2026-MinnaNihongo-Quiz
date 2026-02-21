// Minna no Nihongo — Lesson 12: 比較 (So sánh, mùa, thời tiết)
const LESSON_12_DATA =   {
    lessonNumber: 12,
    title: "比較 (So sánh, mùa, thời tiết)",
    vocabulary: [
      {
        japanese: "簡単（な）（かんたん）",
        kana: "かんたん",
        vietnamese: "đơn giản, dễ",
        english: "Simple, easy",
        example: "この　問題は　簡単です。"
      },
      {
        japanese: "近い（ちかい）",
        kana: "ちかい",
        vietnamese: "gần",
        english: "Near, close",
        example: "駅は　近いです。"
      },
      {
        japanese: "遠い（とおい）",
        kana: "とおい",
        vietnamese: "xa",
        english: "Far",
        example: ""
      },
      {
        japanese: "速い（はやい）",
        kana: "はやい",
        vietnamese: "nhanh",
        english: "Fast, quick",
        example: "新幹線は　速いです。"
      },
      {
        japanese: "遅い（おそい）",
        kana: "おそい",
        vietnamese: "chậm, muộn",
        english: "Slow, late",
        example: ""
      },
      {
        japanese: "多い（おおい）",
        kana: "おおい",
        vietnamese: "nhiều",
        english: "Many, much",
        example: "東京は　人が　多いです。"
      },
      {
        japanese: "少ない（すくない）",
        kana: "すくない",
        vietnamese: "ít",
        english: "Few, little",
        example: ""
      },
      {
        japanese: "暖かい（あたたかい）",
        kana: "あたたかい",
        vietnamese: "ấm áp",
        english: "Warm",
        example: "春は　暖かいです。"
      },
      {
        japanese: "涼しい（すずしい）",
        kana: "すずしい",
        vietnamese: "mát mẻ",
        english: "Cool",
        example: "秋は　涼しいです。"
      },
      {
        japanese: "甘い（あまい）",
        kana: "あまい",
        vietnamese: "ngọt",
        english: "Sweet",
        example: "この　ケーキは　甘いです。"
      },
      {
        japanese: "辛い（からい）",
        kana: "からい",
        vietnamese: "cay",
        english: "Spicy, hot",
        example: ""
      },
      {
        japanese: "重い（おもい）",
        kana: "おもい",
        vietnamese: "nặng",
        english: "Heavy",
        example: "この　荷物は　重いです。"
      },
      {
        japanese: "軽い（かるい）",
        kana: "かるい",
        vietnamese: "nhẹ",
        english: "Light (weight)",
        example: ""
      },
      {
        japanese: "季節（きせつ）",
        kana: "きせつ",
        vietnamese: "mùa",
        english: "Season",
        example: "どの　季節が　いちばん　好きですか。"
      },
      {
        japanese: "春（はる）",
        kana: "はる",
        vietnamese: "mùa xuân",
        english: "Spring",
        example: "春は　暖かいです。"
      },
      {
        japanese: "夏（なつ）",
        kana: "なつ",
        vietnamese: "mùa hè",
        english: "Summer",
        example: "夏は　暑いです。"
      },
      {
        japanese: "秋（あき）",
        kana: "あき",
        vietnamese: "mùa thu",
        english: "Autumn, fall",
        example: ""
      },
      {
        japanese: "冬（ふゆ）",
        kana: "ふゆ",
        vietnamese: "mùa đông",
        english: "Winter",
        example: "冬は　寒いです。"
      },
      {
        japanese: "天気（てんき）",
        kana: "てんき",
        vietnamese: "thời tiết",
        english: "Weather",
        example: "きょうは　いい　天気ですね。"
      },
      {
        japanese: "雨（あめ）",
        kana: "あめ",
        vietnamese: "mưa",
        english: "Rain",
        example: "きょうは　雨です。"
      },
      {
        japanese: "雪（ゆき）",
        kana: "ゆき",
        vietnamese: "tuyết",
        english: "Snow",
        example: "北海道は　雪が　多いです。"
      },
      {
        japanese: "曇り（くもり）",
        kana: "くもり",
        vietnamese: "trời nhiều mây",
        english: "Cloudy",
        example: ""
      },
      {
        japanese: "風（かぜ）",
        kana: "かぜ",
        vietnamese: "gió",
        english: "Wind",
        example: ""
      },
      {
        japanese: "空（そら）",
        kana: "そら",
        vietnamese: "bầu trời",
        english: "Sky",
        example: ""
      },
      {
        japanese: "海（うみ）",
        kana: "うみ",
        vietnamese: "biển",
        english: "Sea, ocean",
        example: ""
      },
      {
        japanese: "世界（せかい）",
        kana: "せかい",
        vietnamese: "thế giới",
        english: "World",
        example: "世界で　いちばん　高い　山は　何ですか。"
      },
      {
        japanese: "〜の方（〜のほう）",
        kana: "のほう",
        vietnamese: "~ hơn (so sánh)",
        english: "~ (comparison marker)",
        example: "大阪より　東京の　方が　大きいです。"
      },
      {
        japanese: "ずっと",
        kana: "ずっと",
        vietnamese: "hơn nhiều, ~ hơn hẳn",
        english: "By far, much more",
        example: "北海道は　東京より　ずっと　寒いです。"
      },
      {
        japanese: "一番（いちばん）",
        kana: "いちばん",
        vietnamese: "nhất, số một",
        english: "The most, number one",
        example: "日本で　いちばん　高い　山は　富士山です。"
      },
      {
        japanese: "もっと",
        kana: "もっと",
        vietnamese: "hơn nữa",
        english: "More",
        example: ""
      },
      {
        japanese: "どちら",
        kana: "どちら",
        vietnamese: "cái nào (trong hai)",
        english: "Which (of two)",
        example: "肉と　魚と　どちらが　好きですか。"
      },
      {
        japanese: "どれ",
        kana: "どれ",
        vietnamese: "cái nào (trong ba trở lên)",
        english: "Which (of three or more)",
        example: ""
      }
    ],
    grammar: [
      {
        pattern: "〜ました / 〜ませんでした",
        vietnamese: "~ đã ~ / ~ đã không ~",
        english: "Past tense (polite form)",
        explanation: "Thì quá khứ của động từ lịch sự. Chuyển ます thành ました (khẳng định) hoặc ませんでした (phủ định).",
        examples: [
          {
            japanese: "昨日　映画を　見ました。",
            vietnamese: "Hôm qua tôi đã xem phim.",
            english: "I watched a movie yesterday."
          },
          {
            japanese: "朝ごはんを　食べませんでした。",
            vietnamese: "Tôi đã không ăn sáng.",
            english: "I didn't eat breakfast."
          },
          {
            japanese: "先週　京都に　行きました。",
            vietnamese: "Tuần trước tôi đã đi Kyoto.",
            english: "I went to Kyoto last week."
          }
        ]
      },
      {
        pattern: "い形容詞の過去形（〜かったです / 〜くなかったです）",
        vietnamese: "Thì quá khứ của tính từ đuôi い",
        english: "Past tense of い-adjectives",
        explanation: "Bỏ い cuối, thêm かったです (khẳng định) hoặc くなかったです (phủ định). VD: 暑い → 暑かったです / 暑くなかったです.",
        examples: [
          {
            japanese: "昨日は　暑かったです。",
            vietnamese: "Hôm qua trời nóng.",
            english: "It was hot yesterday."
          },
          {
            japanese: "試験は　難しくなかったです。",
            vietnamese: "Kỳ thi đã không khó.",
            english: "The exam was not difficult."
          },
          {
            japanese: "映画は　面白かったです。",
            vietnamese: "Phim đã thú vị.",
            english: "The movie was interesting."
          }
        ]
      },
      {
        pattern: "な形容詞の過去形（〜でした / 〜じゃありませんでした）",
        vietnamese: "Thì quá khứ của tính từ đuôi な",
        english: "Past tense of な-adjectives",
        explanation: "Chuyển です thành でした (khẳng định) hoặc じゃありませんでした (phủ định). VD: 静かです → 静かでした / 静かじゃありませんでした.",
        examples: [
          {
            japanese: "部屋は　静かでした。",
            vietnamese: "Phòng đã yên tĩnh.",
            english: "The room was quiet."
          },
          {
            japanese: "先生は　親切でした。",
            vietnamese: "Thầy giáo đã tử tế.",
            english: "The teacher was kind."
          },
          {
            japanese: "昨日は　暇じゃありませんでした。",
            vietnamese: "Hôm qua tôi đã không rảnh.",
            english: "I was not free yesterday."
          }
        ]
      },
      {
        pattern: "どちらが〜ですか / どれが〜ですか",
        vietnamese: "Cái nào ~ ? (so sánh)",
        english: "Which one ~ ? (comparison)",
        explanation: "どちらが dùng khi chọn giữa 2 vật, どれが dùng khi chọn trong 3+ vật. Trả lời bằng A の ほうが 〜です (A hơn).",
        examples: [
          {
            japanese: "肉と　魚と　どちらが　好きですか。",
            vietnamese: "Bạn thích thịt hay cá hơn?",
            english: "Which do you like better, meat or fish?"
          },
          {
            japanese: "この　3つの　中で　どれが　一番　いいですか。",
            vietnamese: "Trong 3 cái này, cái nào tốt nhất?",
            english: "Which is the best among these three?"
          },
          {
            japanese: "コーヒーの　ほうが　好きです。",
            vietnamese: "Tôi thích cà phê hơn.",
            english: "I like coffee better."
          }
        ]
      }
    ]
  };

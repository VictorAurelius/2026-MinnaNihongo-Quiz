// Minna no Nihongo — Lesson 09: すきです・きらいです (Thích, ghét, khả năng)
const LESSON_09_DATA =   {
    lessonNumber: 9,
    title: "すきです・きらいです (Thích, ghét, khả năng)",
    vocabulary: [
      {
        japanese: "わかります",
        kana: "わかります",
        vietnamese: "hiểu, biết",
        english: "To understand",
        example: "日本語が　わかります。"
      },
      {
        japanese: "あります",
        kana: "あります",
        vietnamese: "có",
        english: "To have, to exist",
        example: "お金が　あります。"
      },
      {
        japanese: "好き（な）（すき）",
        kana: "すき",
        vietnamese: "thích",
        english: "Like, fond of",
        example: "果物が　好きです。"
      },
      {
        japanese: "嫌い（な）（きらい）",
        kana: "きらい",
        vietnamese: "ghét, không thích",
        english: "Dislike, hate",
        example: ""
      },
      {
        japanese: "上手（な）（じょうず）",
        kana: "じょうず",
        vietnamese: "giỏi, khéo",
        english: "Good at, skillful",
        example: "ミラーさんは　日本語が　上手です。"
      },
      {
        japanese: "下手（な）（へた）",
        kana: "へた",
        vietnamese: "kém, vụng",
        english: "Poor at, unskillful",
        example: "わたしは　料理が　下手です。"
      },
      {
        japanese: "料理（りょうり）",
        kana: "りょうり",
        vietnamese: "món ăn, việc nấu ăn",
        english: "Cooking, cuisine",
        example: "日本　料理が　好きです。"
      },
      {
        japanese: "飲み物（のみもの）",
        kana: "のみもの",
        vietnamese: "đồ uống",
        english: "Drink, beverage",
        example: ""
      },
      {
        japanese: "スポーツ",
        kana: "スポーツ",
        vietnamese: "thể thao",
        english: "Sports",
        example: "どんな　スポーツが　好きですか。"
      },
      {
        japanese: "野球（やきゅう）",
        kana: "やきゅう",
        vietnamese: "bóng chày",
        english: "Baseball",
        example: ""
      },
      {
        japanese: "ダンス",
        kana: "ダンス",
        vietnamese: "nhảy, khiêu vũ",
        english: "Dance",
        example: ""
      },
      {
        japanese: "音楽（おんがく）",
        kana: "おんがく",
        vietnamese: "âm nhạc",
        english: "Music",
        example: "音楽を　聞きます。"
      },
      {
        japanese: "歌（うた）",
        kana: "うた",
        vietnamese: "bài hát",
        english: "Song",
        example: ""
      },
      {
        japanese: "クラシック",
        kana: "クラシック",
        vietnamese: "nhạc cổ điển",
        english: "Classical music",
        example: ""
      },
      {
        japanese: "ジャズ",
        kana: "ジャズ",
        vietnamese: "nhạc jazz",
        english: "Jazz",
        example: ""
      },
      {
        japanese: "コンサート",
        kana: "コンサート",
        vietnamese: "buổi hòa nhạc",
        english: "Concert",
        example: ""
      },
      {
        japanese: "カラオケ",
        kana: "カラオケ",
        vietnamese: "karaoke",
        english: "Karaoke",
        example: "カラオケに　行きませんか。"
      },
      {
        japanese: "歌舞伎（かぶき）",
        kana: "かぶき",
        vietnamese: "kịch Kabuki",
        english: "Kabuki (theater)",
        example: ""
      },
      {
        japanese: "絵（え）",
        kana: "え",
        vietnamese: "tranh, bức họa",
        english: "Picture, painting",
        example: ""
      },
      {
        japanese: "字（じ）",
        kana: "じ",
        vietnamese: "chữ",
        english: "Character, letter",
        example: ""
      },
      {
        japanese: "漢字（かんじ）",
        kana: "かんじ",
        vietnamese: "chữ Hán",
        english: "Kanji, Chinese character",
        example: "漢字が　わかりますか。"
      },
      {
        japanese: "ひらがな",
        kana: "ひらがな",
        vietnamese: "chữ Hiragana",
        english: "Hiragana",
        example: ""
      },
      {
        japanese: "カタカナ",
        kana: "カタカナ",
        vietnamese: "chữ Katakana",
        english: "Katakana",
        example: ""
      },
      {
        japanese: "ローマ字（ローマじ）",
        kana: "ローマじ",
        vietnamese: "chữ La-tinh",
        english: "Roman alphabet",
        example: ""
      },
      {
        japanese: "細い（ほそい）",
        kana: "ほそい",
        vietnamese: "mảnh, gầy",
        english: "Thin, slim",
        example: ""
      },
      {
        japanese: "太い（ふとい）",
        kana: "ふとい",
        vietnamese: "to, mập",
        english: "Thick, fat",
        example: ""
      },
      {
        japanese: "よく",
        kana: "よく",
        vietnamese: "thường xuyên, giỏi",
        english: "Often, well",
        example: "よく　映画を　見ます。"
      },
      {
        japanese: "だいたい",
        kana: "だいたい",
        vietnamese: "đại khái, gần như",
        english: "Mostly, roughly",
        example: "だいたい　わかります。"
      },
      {
        japanese: "たくさん",
        kana: "たくさん",
        vietnamese: "nhiều",
        english: "A lot, many",
        example: "CDを　たくさん　持っています。"
      },
      {
        japanese: "少し（すこし）",
        kana: "すこし",
        vietnamese: "một chút, một ít",
        english: "A little",
        example: "日本語が　少し　わかります。"
      },
      {
        japanese: "全然（ぜんぜん）",
        kana: "ぜんぜん",
        vietnamese: "hoàn toàn không",
        english: "Not at all (with negative)",
        example: "漢字が　全然　わかりません。"
      },
      {
        japanese: "早く（はやく）",
        kana: "はやく",
        vietnamese: "nhanh, sớm",
        english: "Early, quickly",
        example: ""
      },
      {
        japanese: "〜から",
        kana: "から",
        vietnamese: "vì, bởi vì (lý do)",
        english: "Because (reason)",
        example: "時間が　ありませんから、新聞を　読みません。"
      },
      {
        japanese: "どうして",
        kana: "どうして",
        vietnamese: "tại sao",
        english: "Why",
        example: "どうして　日本語を　勉強しますか。"
      },
      {
        japanese: "残念ですが（ざんねんですが）",
        kana: "ざんねんですが",
        vietnamese: "rất tiếc nhưng...",
        english: "I'm sorry but...",
        example: "残念ですが、行きません。"
      }
    ],
    grammar: [
      {
        pattern: "～が 好きです/嫌いです",
        vietnamese: "thích/ghét ~",
        english: "like/dislike ~",
        explanation: "Trợ từ 'が' đánh dấu đối tượng của sở thích, cảm xúc, khả năng.",
        examples: [
          {
            japanese: "わたしは にほんりょうりが すきです。",
            vietnamese: "Tôi thích món ăn Nhật.",
            english: "I like Japanese food."
          },
          {
            japanese: "やさいが きらいです。",
            vietnamese: "Tôi ghét rau.",
            english: "I dislike vegetables."
          },
          {
            japanese: "あなたは どんな スポーツが すきですか。",
            vietnamese: "Bạn thích thể thao nào?",
            english: "What sports do you like?"
          }
        ]
      },
      {
        pattern: "～が わかります",
        vietnamese: "hiểu ~",
        english: "understand ~",
        explanation: "わかります (hiểu) dùng với trợ từ 'が', không dùng 'を'.",
        examples: [
          {
            japanese: "にほんごが わかりますか。",
            vietnamese: "Bạn hiểu tiếng Nhật không?",
            english: "Do you understand Japanese?"
          },
          {
            japanese: "すこし わかります。",
            vietnamese: "Tôi hiểu một chút.",
            english: "I understand a little."
          }
        ]
      },
      {
        pattern: "～が できます",
        vietnamese: "có thể làm ~, biết ~",
        english: "can do ~",
        explanation: "できます chỉ khả năng làm việc gì đó.",
        examples: [
          {
            japanese: "ピアノが できます。",
            vietnamese: "Tôi biết chơi piano.",
            english: "I can play the piano."
          },
          {
            japanese: "りょうりが できますか。",
            vietnamese: "Bạn có biết nấu ăn không?",
            english: "Can you cook?"
          }
        ]
      },
      {
        pattern: "どうして/なぜ ～ですか",
        vietnamese: "tại sao ~?",
        english: "why ~?",
        explanation: "Câu hỏi về lý do.",
        examples: [
          {
            japanese: "どうして にほんごを べんきょうしますか。",
            vietnamese: "Tại sao bạn học tiếng Nhật?",
            english: "Why do you study Japanese?"
          },
          {
            japanese: "にほんの かいしゃで はたらきたいですから。",
            vietnamese: "Vì tôi muốn làm việc ở công ty Nhật.",
            english: "Because I want to work at a Japanese company."
          }
        ]
      },
      {
        pattern: "よく/だいたい/たくさん/すこし/あまり/全然",
        vietnamese: "Các trạng từ chỉ mức độ",
        english: "Adverbs of frequency/degree",
        explanation: "よく (thường), だいたい (đại khái), たくさん (nhiều), すこし (một chút), あまり (không lắm - với phủ định), ぜんぜん (hoàn toàn không - với phủ định).",
        examples: [
          {
            japanese: "よく えいがを みます。",
            vietnamese: "Tôi thường xem phim.",
            english: "I often watch movies."
          },
          {
            japanese: "あまり わかりません。",
            vietnamese: "Tôi không hiểu lắm.",
            english: "I don't understand very much."
          },
          {
            japanese: "ぜんぜん できません。",
            vietnamese: "Tôi hoàn toàn không biết.",
            english: "I can't do it at all."
          }
        ]
      }
    ]
  };

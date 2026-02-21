// Minna no Nihongo — Lesson 02: これは ～です (Cái này là ~)
const LESSON_02_DATA =   {
    lessonNumber: 2,
    title: "これは ～です (Cái này là ~)",
    vocabulary: [
      {
        japanese: "これ",
        kana: "これ",
        vietnamese: "cái này",
        english: "this (thing)",
        example: "これは ほんです。"
      },
      {
        japanese: "それ",
        kana: "それ",
        vietnamese: "cái đó",
        english: "that (thing, near listener)",
        example: "それは なんですか。"
      },
      {
        japanese: "あれ",
        kana: "あれ",
        vietnamese: "cái kia",
        english: "that (thing, far from both)",
        example: "あれは とけいです。"
      },
      {
        japanese: "この",
        kana: "この",
        vietnamese: "~ này",
        english: "this ~",
        example: "この ほんは わたしのです。"
      },
      {
        japanese: "その",
        kana: "その",
        vietnamese: "~ đó",
        english: "that ~",
        example: "その かばんは だれのですか。"
      },
      {
        japanese: "あの",
        kana: "あの",
        vietnamese: "~ kia",
        english: "that ~ (over there)",
        example: "あの かさは せんせいのです。"
      },
      {
        japanese: "本（ほん）",
        kana: "ほん",
        vietnamese: "sách",
        english: "book",
        example: "これは にほんごの ほんです。"
      },
      {
        japanese: "辞書（じしょ）",
        kana: "じしょ",
        vietnamese: "từ điển",
        english: "dictionary",
        example: "それは えいごの じしょです。"
      },
      {
        japanese: "雑誌（ざっし）",
        kana: "ざっし",
        vietnamese: "tạp chí",
        english: "magazine",
        example: "あれは にほんの ざっしです。"
      },
      {
        japanese: "新聞（しんぶん）",
        kana: "しんぶん",
        vietnamese: "báo",
        english: "newspaper",
        example: "これは きょうの しんぶんです。"
      },
      {
        japanese: "ノート",
        kana: "ノート",
        vietnamese: "vở, sổ ghi chép",
        english: "notebook",
        example: ""
      },
      {
        japanese: "手帳（てちょう）",
        kana: "てちょう",
        vietnamese: "sổ tay",
        english: "personal organizer",
        example: ""
      },
      {
        japanese: "名刺（めいし）",
        kana: "めいし",
        vietnamese: "danh thiếp",
        english: "business card",
        example: "これは わたしの めいしです。"
      },
      {
        japanese: "カード",
        kana: "カード",
        vietnamese: "thẻ",
        english: "card",
        example: ""
      },
      {
        japanese: "鉛筆（えんぴつ）",
        kana: "えんぴつ",
        vietnamese: "bút chì",
        english: "pencil",
        example: ""
      },
      {
        japanese: "ボールペン",
        kana: "ボールペン",
        vietnamese: "bút bi",
        english: "ballpoint pen",
        example: "この ボールペンは いくらですか。"
      },
      {
        japanese: "シャープペンシル",
        kana: "シャープペンシル",
        vietnamese: "bút chì bấm",
        english: "mechanical pencil",
        example: ""
      },
      {
        japanese: "鍵（かぎ）",
        kana: "かぎ",
        vietnamese: "chìa khóa",
        english: "key",
        example: "これは くるまの かぎです。"
      },
      {
        japanese: "時計（とけい）",
        kana: "とけい",
        vietnamese: "đồng hồ",
        english: "watch, clock",
        example: "その とけいは にほんのです。"
      },
      {
        japanese: "傘（かさ）",
        kana: "かさ",
        vietnamese: "ô, dù",
        english: "umbrella",
        example: ""
      },
      {
        japanese: "かばん",
        kana: "かばん",
        vietnamese: "cặp, túi xách",
        english: "bag",
        example: ""
      },
      {
        japanese: "テレビ",
        kana: "テレビ",
        vietnamese: "ti vi",
        english: "television",
        example: ""
      },
      {
        japanese: "ラジオ",
        kana: "ラジオ",
        vietnamese: "radio, đài",
        english: "radio",
        example: ""
      },
      {
        japanese: "カメラ",
        kana: "カメラ",
        vietnamese: "máy ảnh",
        english: "camera",
        example: ""
      },
      {
        japanese: "コンピューター",
        kana: "コンピューター",
        vietnamese: "máy tính",
        english: "computer",
        example: ""
      },
      {
        japanese: "自動車（じどうしゃ）",
        kana: "じどうしゃ",
        vietnamese: "xe ô tô",
        english: "automobile, car",
        example: ""
      },
      {
        japanese: "机（つくえ）",
        kana: "つくえ",
        vietnamese: "bàn",
        english: "desk",
        example: ""
      },
      {
        japanese: "椅子（いす）",
        kana: "いす",
        vietnamese: "ghế",
        english: "chair",
        example: ""
      },
      {
        japanese: "チョコレート",
        kana: "チョコレート",
        vietnamese: "sô cô la",
        english: "chocolate",
        example: ""
      },
      {
        japanese: "コーヒー",
        kana: "コーヒー",
        vietnamese: "cà phê",
        english: "coffee",
        example: ""
      },
      {
        japanese: "英語（えいご）",
        kana: "えいご",
        vietnamese: "tiếng Anh",
        english: "English (language)",
        example: ""
      },
      {
        japanese: "日本語（にほんご）",
        kana: "にほんご",
        vietnamese: "tiếng Nhật",
        english: "Japanese (language)",
        example: "これは にほんごの ほんです。"
      },
      {
        japanese: "～語（～ご）",
        kana: "～ご",
        vietnamese: "tiếng ~",
        english: "~ language",
        example: ""
      },
      {
        japanese: "何（なん / なに）",
        kana: "なん",
        vietnamese: "cái gì",
        english: "what",
        example: "これは なんですか。"
      },
      {
        japanese: "そうです",
        kana: "そうです",
        vietnamese: "đúng vậy",
        english: "that's right",
        example: "はい、そうです。"
      },
      {
        japanese: "違います（ちがいます）",
        kana: "ちがいます",
        vietnamese: "không phải, sai",
        english: "no, that's wrong",
        example: "いいえ、ちがいます。"
      },
      {
        japanese: "そうですか",
        kana: "そうですか",
        vietnamese: "vậy à, thế à",
        english: "is that so?",
        example: ""
      },
      {
        japanese: "あのう",
        kana: "あのう",
        vietnamese: "à..., ơ...",
        english: "well..., um...",
        example: "あのう、これは なんですか。"
      },
      {
        japanese: "ほんの 気持ちです",
        kana: "ほんのきもちです",
        vietnamese: "chút lòng thành",
        english: "it's just a small token",
        example: ""
      },
      {
        japanese: "どうぞ",
        kana: "どうぞ",
        vietnamese: "mời, xin mời",
        english: "please (offering)",
        example: "どうぞ。"
      },
      {
        japanese: "どうも",
        kana: "どうも",
        vietnamese: "cảm ơn (thân mật)",
        english: "thanks (casual)",
        example: ""
      },
      {
        japanese: "ありがとう ございます",
        kana: "ありがとうございます",
        vietnamese: "cảm ơn rất nhiều",
        english: "thank you very much",
        example: ""
      },
      {
        japanese: "これから お世話に なります",
        kana: "これからおせわになります",
        vietnamese: "từ nay xin nhờ giúp đỡ",
        english: "I hope for your kind assistance",
        example: ""
      }
    ],
    grammar: [
      {
        pattern: "これ/それ/あれ は ～です",
        vietnamese: "Cái này/đó/kia là ~",
        english: "This/That is ~",
        explanation: "Đại từ chỉ định vật thể. これ (gần người nói), それ (gần người nghe), あれ (xa cả hai).",
        examples: [
          {
            japanese: "これは カメラです。",
            vietnamese: "Cái này là máy ảnh.",
            english: "This is a camera."
          },
          {
            japanese: "それは テレビです。",
            vietnamese: "Cái đó là TV.",
            english: "That is a TV."
          },
          {
            japanese: "あれは わたしの かさです。",
            vietnamese: "Cái kia là ô của tôi.",
            english: "That over there is my umbrella."
          }
        ]
      },
      {
        pattern: "この/その/あの ～",
        vietnamese: "~ này/đó/kia",
        english: "This/That ~ (noun modifier)",
        explanation: "Từ định chỉ đứng trước danh từ. この (gần người nói), その (gần người nghe), あの (xa cả hai).",
        examples: [
          {
            japanese: "この ほんは わたしのです。",
            vietnamese: "Quyển sách này là của tôi.",
            english: "This book is mine."
          },
          {
            japanese: "その かばんは だれのですか。",
            vietnamese: "Cái cặp đó là của ai?",
            english: "Whose bag is that?"
          },
          {
            japanese: "あの ひとは たなかさんです。",
            vietnamese: "Người kia là anh Tanaka.",
            english: "That person is Mr. Tanaka."
          }
        ]
      },
      {
        pattern: "～は ～のです",
        vietnamese: "~ là của ~",
        english: "~ belongs to ~",
        explanation: "Biểu thị sở hữu. 'の' đại diện cho danh từ đã được nhắc đến (pronoun).",
        examples: [
          {
            japanese: "この かさは わたしのです。",
            vietnamese: "Cây ô này là của tôi.",
            english: "This umbrella is mine."
          },
          {
            japanese: "それは だれのですか。",
            vietnamese: "Cái đó là của ai?",
            english: "Whose is that?"
          }
        ]
      },
      {
        pattern: "そうです / そうじゃ ありません",
        vietnamese: "Đúng vậy / Không phải",
        english: "That's right / That's not right",
        explanation: "Câu trả lời ngắn xác nhận hoặc phủ định. Thay cho việc lặp lại toàn bộ câu.",
        examples: [
          {
            japanese: "これは ほんですか。— はい、そうです。",
            vietnamese: "Cái này là sách à? — Vâng, đúng vậy.",
            english: "Is this a book? — Yes, it is."
          },
          {
            japanese: "これは あなたのですか。— いいえ、そうじゃ ありません。",
            vietnamese: "Cái này là của bạn à? — Không, không phải.",
            english: "Is this yours? — No, it's not."
          }
        ]
      }
    ]
  };

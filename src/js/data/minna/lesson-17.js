// Minna no Nihongo — Lesson 17: ない形 (Thể ない — phải làm, không cần làm, xin đừng)
const LESSON_17_DATA =   {
    lessonNumber: 17,
    title: "ない形 (Thể ない — phải làm, không cần làm, xin đừng)",
    vocabulary: [
      {
        japanese: "覚（おぼ）えます",
        kana: "おぼえます",
        vietnamese: "nhớ, ghi nhớ",
        english: "To memorize / to remember",
        example: "漢字を覚えなければなりません。"
      },
      {
        japanese: "忘（わす）れます",
        kana: "わすれます",
        vietnamese: "quên",
        english: "To forget",
        example: "パスポートを忘れないでください。"
      },
      {
        japanese: "なくします",
        kana: "なくします",
        vietnamese: "làm mất",
        english: "To lose (something)",
        example: "財布をなくしました。"
      },
      {
        japanese: "出（だ）します",
        kana: "だします",
        vietnamese: "nộp (báo cáo)",
        english: "To submit / to turn in",
        example: "レポートを出さなければなりません。"
      },
      {
        japanese: "連絡（れんらく）します",
        kana: "れんらくします",
        vietnamese: "liên lạc",
        english: "To contact",
        example: "先生に連絡しなければなりません。"
      },
      {
        japanese: "大切（たいせつ）（な）",
        kana: "たいせつ",
        vietnamese: "quan trọng",
        english: "Important / precious",
        example: "パスポートは大切ですから、なくさないでください。"
      },
      {
        japanese: "危（あぶ）ない",
        kana: "あぶない",
        vietnamese: "nguy hiểm",
        english: "Dangerous",
        example: "ここは危ないですから、入らないでください。"
      },
      {
        japanese: "意味（いみ）",
        kana: "いみ",
        vietnamese: "ý nghĩa",
        english: "Meaning",
        example: "この言葉の意味がわかりません。"
      },
      {
        japanese: "お釣（つ）り",
        kana: "おつり",
        vietnamese: "tiền thối",
        english: "Change (money)",
        example: "お釣りをもらいましたか。"
      },
      {
        japanese: "パスポート",
        kana: "パスポート",
        vietnamese: "hộ chiếu",
        english: "Passport",
        example: "パスポートを忘れないでください。"
      },
      {
        japanese: "授業（じゅぎょう）",
        kana: "じゅぎょう",
        vietnamese: "giờ học, tiết học",
        english: "Class / lesson",
        example: "明日授業がありますか。"
      },
      {
        japanese: "試験（しけん）",
        kana: "しけん",
        vietnamese: "kỳ thi",
        english: "Exam / test",
        example: "来週試験がありますから、勉強しなければなりません。"
      },
      {
        japanese: "レポート",
        kana: "レポート",
        vietnamese: "báo cáo, bài luận",
        english: "Report",
        example: "レポートを出さなければなりません。"
      },
      {
        japanese: "締（し）め切（き）り",
        kana: "しめきり",
        vietnamese: "hạn chót",
        english: "Deadline",
        example: "レポートの締め切りはいつですか。"
      },
      {
        japanese: "約束（やくそく）",
        kana: "やくそく",
        vietnamese: "lời hứa, cuộc hẹn",
        english: "Promise / appointment",
        example: "友達と約束があります。"
      },
      {
        japanese: "予定（よてい）",
        kana: "よてい",
        vietnamese: "kế hoạch, dự định",
        english: "Plan / schedule",
        example: "週末の予定はありますか。"
      },
      {
        japanese: "必（かなら）ず",
        kana: "かならず",
        vietnamese: "nhất định, chắc chắn",
        english: "Certainly / without fail",
        example: "必ず来てください。"
      },
      {
        japanese: "いつまでに",
        kana: "いつまでに",
        vietnamese: "trước khi nào, hạn chót khi nào",
        english: "By when",
        example: "いつまでにレポートを出さなければなりませんか。"
      },
      {
        japanese: "できるだけ",
        kana: "できるだけ",
        vietnamese: "cố gắng hết sức, càng ... càng tốt",
        english: "As much as possible",
        example: "できるだけ早く来てください。"
      },
      {
        japanese: "〜なければなりません",
        kana: "〜なければなりません",
        vietnamese: "phải ~",
        english: "Must ~ / have to ~",
        example: "毎日勉強しなければなりません。"
      },
      {
        japanese: "〜なくてもいいです",
        kana: "〜なくてもいいです",
        vietnamese: "không cần ~, không phải ~",
        english: "Don't have to ~",
        example: "明日来なくてもいいです。"
      },
      {
        japanese: "〜ないでください",
        kana: "〜ないでください",
        vietnamese: "xin đừng ~",
        english: "Please don't ~",
        example: "ここで写真を撮らないでください。"
      }
    ],
    grammar: [
      {
        pattern: "ない形",
        vietnamese: "Thể ない (phủ định thường)",
        english: "ない-form (plain negative)",
        explanation: "Dạng phủ định thường của động từ. Nhóm I: 〜あない. Nhóm II: bỏ る thêm ない. Nhóm III: しない, 来（こ）ない. VD: 行く→行かない, 食べる→食べない。",
        examples: [
          {
            japanese: "行きます　→　行かない",
            vietnamese: "đi → không đi",
            english: "go → don't go"
          },
          {
            japanese: "食べます　→　食べない",
            vietnamese: "ăn → không ăn",
            english: "eat → don't eat"
          },
          {
            japanese: "します　→　しない",
            vietnamese: "làm → không làm",
            english: "do → don't do"
          }
        ]
      },
      {
        pattern: "〜ないでください",
        vietnamese: "Xin đừng ~",
        english: "Please don't ~",
        explanation: "Yêu cầu lịch sự đừng làm gì. Động từ ない-form + でください. VD: 行く → 行かないでください。",
        examples: [
          {
            japanese: "ここで　写真を　撮らないでください。",
            vietnamese: "Xin đừng chụp ảnh ở đây.",
            english: "Please don't take photos here."
          },
          {
            japanese: "遅刻しないでください。",
            vietnamese: "Xin đừng đến muộn.",
            english: "Please don't be late."
          },
          {
            japanese: "心配しないでください。",
            vietnamese: "Xin đừng lo lắng.",
            english: "Please don't worry."
          }
        ]
      },
      {
        pattern: "〜なければなりません",
        vietnamese: "Phải ~, cần phải ~",
        english: "Must ~, have to ~",
        explanation: "Diễn tả sự cần thiết, nghĩa vụ phải làm. Động từ ない-form bỏ い + ければなりません. VD: 行く → 行かなければなりません. Có thể viết tắt: なきゃ。",
        examples: [
          {
            japanese: "毎日　勉強しなければなりません。",
            vietnamese: "Tôi phải học mỗi ngày.",
            english: "I must study every day."
          },
          {
            japanese: "9時までに　会社に　行かなければなりません。",
            vietnamese: "Tôi phải đến công ty trước 9 giờ.",
            english: "I must get to the office by 9 o'clock."
          },
          {
            japanese: "薬を　飲まなければなりません。",
            vietnamese: "Tôi phải uống thuốc.",
            english: "I must take medicine."
          }
        ]
      },
      {
        pattern: "〜なくてもいいです",
        vietnamese: "Không cần ~, không phải ~",
        english: "Don't have to ~, need not ~",
        explanation: "Diễn tả không cần thiết phải làm, không có nghĩa vụ. Động từ ない-form bỏ い + くてもいいです. VD: 行く → 行かなくてもいいです。",
        examples: [
          {
            japanese: "明日は　来なくてもいいです。",
            vietnamese: "Mai không cần đến.",
            english: "You don't have to come tomorrow."
          },
          {
            japanese: "宿題を　しなくてもいいですか。",
            vietnamese: "Không làm bài tập cũng được à?",
            english: "Don't I have to do the homework?"
          },
          {
            japanese: "急がなくてもいいです。",
            vietnamese: "Không cần vội.",
            english: "You don't have to hurry."
          }
        ]
      }
    ]
  };

// Minna no Nihongo — Lesson 15: てもいいです (Xin phép, cấm đoán, trạng thái)
const LESSON_15_DATA =   {
    lessonNumber: 15,
    title: "てもいいです (Xin phép, cấm đoán, trạng thái)",
    vocabulary: [
      {
        japanese: "座（すわ）ります",
        kana: "すわります",
        vietnamese: "ngồi",
        english: "To sit down",
        example: "ここに座ってもいいですか。"
      },
      {
        japanese: "立（た）ちます",
        kana: "たちます",
        vietnamese: "đứng",
        english: "To stand up",
        example: "立ってください。"
      },
      {
        japanese: "入（はい）ります",
        kana: "はいります",
        vietnamese: "vào",
        english: "To enter",
        example: "この部屋に入ってはいけません。"
      },
      {
        japanese: "出（で）ます",
        kana: "でます",
        vietnamese: "ra ngoài",
        english: "To go out / to leave",
        example: "教室を出てもいいですか。"
      },
      {
        japanese: "やめます",
        kana: "やめます",
        vietnamese: "bỏ, nghỉ (việc), thôi",
        english: "To quit / to stop",
        example: "タバコをやめてください。"
      },
      {
        japanese: "押（お）します",
        kana: "おします",
        vietnamese: "nhấn, đẩy",
        english: "To push / to press",
        example: "このボタンを押してください。"
      },
      {
        japanese: "若（わか）い",
        kana: "わかい",
        vietnamese: "trẻ",
        english: "Young",
        example: "あの先生は若いです。"
      },
      {
        japanese: "長（なが）い",
        kana: "ながい",
        vietnamese: "dài",
        english: "Long",
        example: "髪が長いです。"
      },
      {
        japanese: "短（みじか）い",
        kana: "みじかい",
        vietnamese: "ngắn",
        english: "Short (length)",
        example: "髪が短いです。"
      },
      {
        japanese: "明（あか）るい",
        kana: "あかるい",
        vietnamese: "sáng",
        english: "Bright",
        example: "この部屋は明るいです。"
      },
      {
        japanese: "暗（くら）い",
        kana: "くらい",
        vietnamese: "tối",
        english: "Dark",
        example: "部屋が暗いですから、電気をつけてください。"
      },
      {
        japanese: "背（せ）が高（たか）い",
        kana: "せがたかい",
        vietnamese: "cao (người)",
        english: "Tall (person)",
        example: "ミラーさんは背が高いです。"
      },
      {
        japanese: "背（せ）が低（ひく）い",
        kana: "せがひくい",
        vietnamese: "thấp (người)",
        english: "Short (person)",
        example: "弟は背が低いです。"
      },
      {
        japanese: "太（ふと）い",
        kana: "ふとい",
        vietnamese: "mập, béo; to, dày",
        english: "Fat / thick",
        example: ""
      },
      {
        japanese: "頭（あたま）がいい",
        kana: "あたまがいい",
        vietnamese: "thông minh",
        english: "Smart / intelligent",
        example: "あの学生は頭がいいです。"
      },
      {
        japanese: "体（からだ）",
        kana: "からだ",
        vietnamese: "cơ thể",
        english: "Body",
        example: "体に気をつけてください。"
      },
      {
        japanese: "頭（あたま）",
        kana: "あたま",
        vietnamese: "đầu",
        english: "Head",
        example: "頭が痛いです。"
      },
      {
        japanese: "髪（かみ）",
        kana: "かみ",
        vietnamese: "tóc",
        english: "Hair",
        example: "髪が長いです。"
      },
      {
        japanese: "顔（かお）",
        kana: "かお",
        vietnamese: "mặt, khuôn mặt",
        english: "Face",
        example: "顔を洗います。"
      },
      {
        japanese: "目（め）",
        kana: "め",
        vietnamese: "mắt",
        english: "Eye",
        example: "目が大きいです。"
      },
      {
        japanese: "耳（みみ）",
        kana: "みみ",
        vietnamese: "tai",
        english: "Ear",
        example: "耳が痛いです。"
      },
      {
        japanese: "口（くち）",
        kana: "くち",
        vietnamese: "miệng",
        english: "Mouth",
        example: "口を開けてください。"
      },
      {
        japanese: "歯（は）",
        kana: "は",
        vietnamese: "răng",
        english: "Tooth / teeth",
        example: "毎日歯を磨きます。"
      },
      {
        japanese: "お腹（おなか）",
        kana: "おなか",
        vietnamese: "bụng",
        english: "Stomach / belly",
        example: "お腹が痛いです。"
      },
      {
        japanese: "足（あし）",
        kana: "あし",
        vietnamese: "chân",
        english: "Foot / leg",
        example: "足が痛いです。"
      },
      {
        japanese: "サービス",
        kana: "サービス",
        vietnamese: "dịch vụ, miễn phí",
        english: "Service / free of charge",
        example: "このコーヒーはサービスです。"
      },
      {
        japanese: "ジョギング",
        kana: "ジョギング",
        vietnamese: "chạy bộ",
        english: "Jogging",
        example: "毎朝ジョギングをしています。"
      },
      {
        japanese: "シャワー",
        kana: "シャワー",
        vietnamese: "vòi sen, tắm vòi sen",
        english: "Shower",
        example: "シャワーを浴びます。"
      },
      {
        japanese: "緑（みどり）",
        kana: "みどり",
        vietnamese: "màu xanh lá cây",
        english: "Green",
        example: "緑のかばんはミラーさんのです。"
      },
      {
        japanese: "お寺（おてら）",
        kana: "おてら",
        vietnamese: "chùa (Phật giáo)",
        english: "Buddhist temple",
        example: "京都でお寺を見ました。"
      },
      {
        japanese: "神社（じんじゃ）",
        kana: "じんじゃ",
        vietnamese: "đền thần (Thần đạo)",
        english: "Shinto shrine",
        example: "お正月に神社へ行きます。"
      },
      {
        japanese: "留守（るす）",
        kana: "るす",
        vietnamese: "vắng nhà",
        english: "Absence from home",
        example: "田中さんは留守です。"
      }
    ],
    grammar: [
      {
        pattern: "〜てもいいです",
        vietnamese: "~ cũng được, có thể ~ (xin phép)",
        english: "May I ~, It's okay to ~",
        explanation: "Xin phép hoặc cho phép làm gì đó. Động từ て-form + もいいです. Phủ định: てはいけません (không được ~).",
        examples: [
          {
            japanese: "ここで　写真を　撮ってもいいですか。",
            vietnamese: "Chụp ảnh ở đây có được không?",
            english: "May I take photos here?"
          },
          {
            japanese: "はい、いいですよ。",
            vietnamese: "Vâng, được ạ.",
            english: "Yes, you may."
          },
          {
            japanese: "辞書を　使ってもいいです。",
            vietnamese: "Bạn có thể dùng từ điển.",
            english: "You may use a dictionary."
          }
        ]
      },
      {
        pattern: "〜てはいけません",
        vietnamese: "Không được ~, cấm ~",
        english: "Must not ~, It's not allowed to ~",
        explanation: "Cấm đoán, không được phép làm gì đó. Động từ て-form + はいけません. Có thể viết tắt: ちゃいけません (thân mật).",
        examples: [
          {
            japanese: "ここで　たばこを　吸ってはいけません。",
            vietnamese: "Không được hút thuốc ở đây.",
            english: "You must not smoke here."
          },
          {
            japanese: "遅刻してはいけません。",
            vietnamese: "Không được đến muộn.",
            english: "You must not be late."
          },
          {
            japanese: "試験中に　話してはいけません。",
            vietnamese: "Trong khi thi không được nói chuyện.",
            english: "You must not talk during the exam."
          }
        ]
      },
      {
        pattern: "〜ています",
        vietnamese: "Đang ~, đã ~ (trạng thái hiện tại)",
        english: "Be doing ~, have done ~ (progressive/resultative)",
        explanation: "Diễn tả hành động đang diễn ra hoặc trạng thái kết quả. Động từ て-form + います. VD: 読んでいます (đang đọc), 知っています (đã biết).",
        examples: [
          {
            japanese: "今　何を　していますか。",
            vietnamese: "Bây giờ bạn đang làm gì?",
            english: "What are you doing now?"
          },
          {
            japanese: "本を　読んでいます。",
            vietnamese: "Tôi đang đọc sách.",
            english: "I am reading a book."
          },
          {
            japanese: "田中さんを　知っていますか。",
            vietnamese: "Bạn có biết anh Tanaka không?",
            english: "Do you know Mr. Tanaka?"
          }
        ]
      },
      {
        pattern: "〜ています（状態）",
        vietnamese: "Trạng thái đã ~ (kết quả còn lại)",
        english: "Resultative state (completed action with lasting result)",
        explanation: "Một số động từ dùng ています để chỉ trạng thái kết quả còn lại. VD: 結婚しています (đã kết hôn), 住んでいます (đang sống), 知っています (đã biết).",
        examples: [
          {
            japanese: "私は　結婚しています。",
            vietnamese: "Tôi đã kết hôn.",
            english: "I am married."
          },
          {
            japanese: "東京に　住んでいます。",
            vietnamese: "Tôi sống ở Tokyo.",
            english: "I live in Tokyo."
          },
          {
            japanese: "この　漢字を　知っていますか。",
            vietnamese: "Bạn có biết chữ Hán này không?",
            english: "Do you know this kanji?"
          }
        ]
      }
    ]
  };

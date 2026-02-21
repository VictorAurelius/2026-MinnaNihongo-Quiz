// Minna no Nihongo — Lesson 18: 辞書形＋ことができます (Khả năng, sở thích, trước khi làm)
const LESSON_18_DATA =   {
    lessonNumber: 18,
    title: "辞書形＋ことができます (Khả năng, sở thích, trước khi làm)",
    vocabulary: [
      {
        japanese: "できます",
        kana: "できます",
        vietnamese: "có thể, làm được",
        english: "Can / to be able to",
        example: "日本語を話すことができます。"
      },
      {
        japanese: "洗（あら）います",
        kana: "あらいます",
        vietnamese: "rửa, giặt",
        english: "To wash",
        example: "食事の前に手を洗います。"
      },
      {
        japanese: "弾（ひ）きます",
        kana: "ひきます",
        vietnamese: "chơi, đánh (đàn)",
        english: "To play (piano/guitar)",
        example: "ピアノを弾くことができますか。"
      },
      {
        japanese: "歌（うた）います",
        kana: "うたいます",
        vietnamese: "hát",
        english: "To sing",
        example: "日本の歌を歌うことができます。"
      },
      {
        japanese: "集（あつ）めます",
        kana: "あつめます",
        vietnamese: "thu thập, sưu tầm",
        english: "To collect / to gather",
        example: "切手を集めることが趣味です。"
      },
      {
        japanese: "捨（す）てます",
        kana: "すてます",
        vietnamese: "vứt, bỏ",
        english: "To throw away",
        example: "ここにごみを捨てないでください。"
      },
      {
        japanese: "換（か）えます",
        kana: "かえます",
        vietnamese: "đổi (tiền)",
        english: "To exchange / to change",
        example: "ドルを円に換えることができますか。"
      },
      {
        japanese: "運転（うんてん）します",
        kana: "うんてんします",
        vietnamese: "lái xe",
        english: "To drive",
        example: "車を運転することができますか。"
      },
      {
        japanese: "予約（よやく）します",
        kana: "よやくします",
        vietnamese: "đặt trước, đặt chỗ",
        english: "To reserve / to book",
        example: "ホテルを予約しました。"
      },
      {
        japanese: "見学（けんがく）します",
        kana: "けんがくします",
        vietnamese: "tham quan (nhà máy, trường học)",
        english: "To visit / to tour (a facility)",
        example: "工場を見学する前に、説明を聞きます。"
      },
      {
        japanese: "ピアノ",
        kana: "ピアノ",
        vietnamese: "đàn piano",
        english: "Piano",
        example: "ピアノを弾くことができますか。"
      },
      {
        japanese: "ギター",
        kana: "ギター",
        vietnamese: "đàn guitar",
        english: "Guitar",
        example: "ギターを弾くことが趣味です。"
      },
      {
        japanese: "チェス",
        kana: "チェス",
        vietnamese: "cờ vua",
        english: "Chess",
        example: "チェスができますか。"
      },
      {
        japanese: "歌（うた）",
        kana: "うた",
        vietnamese: "bài hát",
        english: "Song",
        example: "日本の歌を知っていますか。"
      },
      {
        japanese: "切符（きっぷ）",
        kana: "きっぷ",
        vietnamese: "vé",
        english: "Ticket",
        example: "切符を買う前に、地図を見てください。"
      },
      {
        japanese: "現金（げんきん）",
        kana: "げんきん",
        vietnamese: "tiền mặt",
        english: "Cash",
        example: "現金で払わなければなりませんか。"
      },
      {
        japanese: "カード",
        kana: "カード",
        vietnamese: "thẻ (tín dụng, ngân hàng)",
        english: "Card (credit card, etc.)",
        example: "カードで払うことができます。"
      },
      {
        japanese: "趣味（しゅみ）",
        kana: "しゅみ",
        vietnamese: "sở thích",
        english: "Hobby",
        example: "趣味は何ですか。"
      },
      {
        japanese: "お祭（まつ）り",
        kana: "おまつり",
        vietnamese: "lễ hội",
        english: "Festival",
        example: "日本のお祭りを見たことがありますか。"
      },
      {
        japanese: "ドラマ",
        kana: "ドラマ",
        vietnamese: "phim truyền hình",
        english: "Drama (TV series)",
        example: "日本のドラマを見ることができますか。"
      },
      {
        japanese: "国（くに）",
        kana: "くに",
        vietnamese: "nước, quốc gia; quê hương",
        english: "Country / hometown",
        example: "国で何語を話しますか。"
      },
      {
        japanese: "動物（どうぶつ）",
        kana: "どうぶつ",
        vietnamese: "động vật",
        english: "Animal",
        example: "どんな動物が好きですか。"
      },
      {
        japanese: "馬（うま）",
        kana: "うま",
        vietnamese: "ngựa",
        english: "Horse",
        example: "馬に乗ることができますか。"
      },
      {
        japanese: "ペット",
        kana: "ペット",
        vietnamese: "thú cưng",
        english: "Pet",
        example: "ペットを飼っていますか。"
      },
      {
        japanese: "日記（にっき）",
        kana: "にっき",
        vietnamese: "nhật ký",
        english: "Diary",
        example: "毎日日記を書いています。"
      },
      {
        japanese: "直接（ちょくせつ）",
        kana: "ちょくせつ",
        vietnamese: "trực tiếp",
        english: "Directly",
        example: "直接会社へ行ってください。"
      },
      {
        japanese: "自由（じゆう）に",
        kana: "じゆうに",
        vietnamese: "tự do, thoải mái",
        english: "Freely",
        example: "自由に使ってください。"
      },
      {
        japanese: "久（ひさ）しぶり",
        kana: "ひさしぶり",
        vietnamese: "lâu rồi không gặp",
        english: "Long time no see",
        example: "お久しぶりですね。"
      },
      {
        japanese: "もちろん",
        kana: "もちろん",
        vietnamese: "dĩ nhiên, tất nhiên",
        english: "Of course",
        example: "もちろん、いいですよ。"
      },
      {
        japanese: "〜ことができます",
        kana: "〜ことができます",
        vietnamese: "có thể ~",
        english: "Can ~ / to be able to ~",
        example: "漢字を読むことができます。"
      },
      {
        japanese: "〜まえに",
        kana: "〜まえに",
        vietnamese: "trước khi ~",
        english: "Before ~",
        example: "寝る前に、本を読みます。"
      }
    ],
    grammar: [
      {
        pattern: "辞書形（Dictionary form）",
        vietnamese: "Dạng từ điển (thể thường)",
        english: "Dictionary form (plain form)",
        explanation: "Dạng động từ gốc trong từ điển. Nhóm I: 〜う. Nhóm II: 〜る. Nhóm III: する、来（く）る. Dùng trong câu thường, trước một số cấu trúc ngữ pháp.",
        examples: [
          {
            japanese: "行きます　→　行く",
            vietnamese: "đi → đi (từ điển)",
            english: "go → to go"
          },
          {
            japanese: "食べます　→　食べる",
            vietnamese: "ăn → ăn (từ điển)",
            english: "eat → to eat"
          },
          {
            japanese: "来ます　→　来（く）る",
            vietnamese: "đến → đến (từ điển)",
            english: "come → to come"
          }
        ]
      },
      {
        pattern: "〜ことができます",
        vietnamese: "Có thể ~, biết ~",
        english: "Can ~, be able to ~",
        explanation: "Diễn tả khả năng làm việc gì. Động từ từ điển + ことができます. VD: 泳ぐ → 泳ぐことができます (có thể bơi).",
        examples: [
          {
            japanese: "日本語を　話すことが　できます。",
            vietnamese: "Tôi có thể nói tiếng Nhật.",
            english: "I can speak Japanese."
          },
          {
            japanese: "ピアノを　弾くことが　できますか。",
            vietnamese: "Bạn có thể chơi piano không?",
            english: "Can you play the piano?"
          },
          {
            japanese: "漢字を　読むことが　できません。",
            vietnamese: "Tôi không thể đọc chữ Hán.",
            english: "I can't read kanji."
          }
        ]
      },
      {
        pattern: "趣味は〜ことです",
        vietnamese: "Sở thích của tôi là ~",
        english: "My hobby is ~",
        explanation: "Diễn tả sở thích. Động từ từ điển + こと biến động từ thành danh từ. VD: 本を読む → 本を読むことです (sở thích là đọc sách).",
        examples: [
          {
            japanese: "私の　趣味は　映画を　見ることです。",
            vietnamese: "Sở thích của tôi là xem phim.",
            english: "My hobby is watching movies."
          },
          {
            japanese: "趣味は　音楽を　聞くことです。",
            vietnamese: "Sở thích của tôi là nghe nhạc.",
            english: "My hobby is listening to music."
          },
          {
            japanese: "趣味は　旅行することです。",
            vietnamese: "Sở thích của tôi là đi du lịch.",
            english: "My hobby is traveling."
          }
        ]
      },
      {
        pattern: "〜前に",
        vietnamese: "Trước khi ~",
        english: "Before ~",
        explanation: "Diễn tả hành động trước một hành động khác. Động từ từ điển + 前に. Danh từ + の前に. VD: 寝る前に (trước khi ngủ).",
        examples: [
          {
            japanese: "寝る　前に、歯を　磨きます。",
            vietnamese: "Trước khi ngủ, tôi đánh răng.",
            english: "Before going to bed, I brush my teeth."
          },
          {
            japanese: "出かける　前に、電気を　消してください。",
            vietnamese: "Trước khi ra ngoài, hãy tắt đèn.",
            english: "Before going out, please turn off the lights."
          },
          {
            japanese: "食事の　前に、手を　洗います。",
            vietnamese: "Trước bữa ăn, tôi rửa tay.",
            english: "Before meals, I wash my hands."
          }
        ]
      }
    ]
  };

// Minna no Nihongo — Lesson 16: 動詞の接続 (Nối động từ — sinh hoạt hàng ngày, cách làm)
const LESSON_16_DATA =   {
    lessonNumber: 16,
    title: "動詞の接続 (Nối động từ — sinh hoạt hàng ngày, cách làm)",
    vocabulary: [
      {
        japanese: "乗（の）ります",
        kana: "のります",
        vietnamese: "lên (tàu, xe)",
        english: "To ride / to get on",
        example: "バスに乗ります。"
      },
      {
        japanese: "降（お）ります",
        kana: "おります",
        vietnamese: "xuống (tàu, xe)",
        english: "To get off",
        example: "次の駅で降ります。"
      },
      {
        japanese: "乗（の）り換（か）えます",
        kana: "のりかえます",
        vietnamese: "chuyển tàu/xe",
        english: "To transfer / to change (trains)",
        example: "東京駅で乗り換えてください。"
      },
      {
        japanese: "浴（あ）びます",
        kana: "あびます",
        vietnamese: "tắm (vòi sen)",
        english: "To take (a shower)",
        example: "シャワーを浴びて、朝ごはんを食べます。"
      },
      {
        japanese: "入（い）れます",
        kana: "いれます",
        vietnamese: "cho vào, bỏ vào",
        english: "To put in / to insert",
        example: "お金を入れて、ボタンを押してください。"
      },
      {
        japanese: "出（だ）します",
        kana: "だします",
        vietnamese: "lấy ra, rút ra, gửi",
        english: "To take out / to submit",
        example: "ATMでお金を出します。"
      },
      {
        japanese: "引（ひ）きます",
        kana: "ひきます",
        vietnamese: "kéo",
        english: "To pull",
        example: "ドアを引いてください。"
      },
      {
        japanese: "払（はら）います",
        kana: "はらいます",
        vietnamese: "trả tiền, thanh toán",
        english: "To pay",
        example: "カードで払ってもいいですか。"
      },
      {
        japanese: "返（かえ）します",
        kana: "かえします",
        vietnamese: "trả lại",
        english: "To return / to give back",
        example: "図書館に本を返します。"
      },
      {
        japanese: "届（とど）けます",
        kana: "とどけます",
        vietnamese: "chuyển đến, giao",
        english: "To deliver / to report",
        example: "荷物を届けてください。"
      },
      {
        japanese: "出（で）かけます",
        kana: "でかけます",
        vietnamese: "ra ngoài, đi ra",
        english: "To go out",
        example: "ちょっと出かけます。"
      },
      {
        japanese: "脱（ぬ）ぎます",
        kana: "ぬぎます",
        vietnamese: "cởi (giày, quần áo)",
        english: "To take off (clothes/shoes)",
        example: "靴を脱いでください。"
      },
      {
        japanese: "選（えら）びます",
        kana: "えらびます",
        vietnamese: "chọn, lựa chọn",
        english: "To choose / to select",
        example: "好きなものを選んでください。"
      },
      {
        japanese: "連（つ）れて行（い）きます",
        kana: "つれていきます",
        vietnamese: "dẫn đi (người/động vật)",
        english: "To take (someone) along",
        example: "子どもを公園に連れて行きます。"
      },
      {
        japanese: "持（も）って行（い）きます",
        kana: "もっていきます",
        vietnamese: "mang đi",
        english: "To take (something)",
        example: "傘を持って行ってください。"
      },
      {
        japanese: "持（も）って来（き）ます",
        kana: "もってきます",
        vietnamese: "mang đến",
        english: "To bring (something)",
        example: "お弁当を持って来ました。"
      },
      {
        japanese: "心配（しんぱい）します",
        kana: "しんぱいします",
        vietnamese: "lo lắng",
        english: "To worry",
        example: "心配しないでください。"
      },
      {
        japanese: "残業（ざんぎょう）します",
        kana: "ざんぎょうします",
        vietnamese: "làm thêm giờ",
        english: "To work overtime",
        example: "毎日残業して、疲れました。"
      },
      {
        japanese: "出張（しゅっちょう）します",
        kana: "しゅっちょうします",
        vietnamese: "đi công tác",
        english: "To go on a business trip",
        example: "来週大阪へ出張します。"
      },
      {
        japanese: "大丈夫（だいじょうぶ）（な）",
        kana: "だいじょうぶ",
        vietnamese: "không sao, ổn",
        english: "All right / fine / OK",
        example: "大丈夫ですか。"
      },
      {
        japanese: "薬（くすり）",
        kana: "くすり",
        vietnamese: "thuốc",
        english: "Medicine",
        example: "薬を飲んで、寝てください。"
      },
      {
        japanese: "熱（ねつ）",
        kana: "ねつ",
        vietnamese: "sốt",
        english: "Fever / temperature",
        example: "熱がありますか。"
      },
      {
        japanese: "病気（びょうき）",
        kana: "びょうき",
        vietnamese: "bệnh",
        english: "Illness / disease",
        example: "病気ですから、会社を休みます。"
      },
      {
        japanese: "風邪（かぜ）",
        kana: "かぜ",
        vietnamese: "cảm lạnh",
        english: "Cold (illness)",
        example: "風邪を引きました。"
      },
      {
        japanese: "インフルエンザ",
        kana: "インフルエンザ",
        vietnamese: "cúm",
        english: "Influenza / flu",
        example: "インフルエンザですから、学校を休みます。"
      },
      {
        japanese: "天気予報（てんきよほう）",
        kana: "てんきよほう",
        vietnamese: "dự báo thời tiết",
        english: "Weather forecast",
        example: "天気予報を見ましたか。"
      },
      {
        japanese: "映画館（えいがかん）",
        kana: "えいがかん",
        vietnamese: "rạp chiếu phim",
        english: "Movie theater",
        example: "映画館で映画を見ます。"
      },
      {
        japanese: "〜から",
        kana: "〜から",
        vietnamese: "vì ~, bởi vì ~",
        english: "Because ~",
        example: "熱がありますから、病院へ行きます。"
      },
      {
        japanese: "お大事（だいじ）に",
        kana: "おだいじに",
        vietnamese: "chúc mau khỏe",
        english: "Take care / Get well soon",
        example: "お大事に。"
      },
      {
        japanese: "どうしましたか",
        kana: "どうしましたか",
        vietnamese: "bị sao vậy? Có chuyện gì?",
        english: "What happened? / What's wrong?",
        example: "どうしましたか。…頭が痛いです。"
      }
    ],
    grammar: [
      {
        pattern: "〜て、〜て、〜",
        vietnamese: "~, ~, ~ (nối động từ)",
        english: "~ and ~ and ~ (connecting verbs)",
        explanation: "Nối nhiều động từ theo thứ tự. Các động từ trước dùng て-form, động từ cuối cùng chia theo thời gian. VD: 起きて、顔を洗って、朝ごはんを食べます。",
        examples: [
          {
            japanese: "朝　起きて、顔を　洗って、朝ごはんを　食べます。",
            vietnamese: "Sáng tôi dậy, rửa mặt, và ăn sáng.",
            english: "In the morning, I get up, wash my face, and eat breakfast."
          },
          {
            japanese: "京都へ　行って、お寺を　見て、帰りました。",
            vietnamese: "Tôi đi Kyoto, xem chùa, và về.",
            english: "I went to Kyoto, saw temples, and came back."
          },
          {
            japanese: "電車に　乗って、新宿で　降ります。",
            vietnamese: "Tôi đi tàu và xuống ở Shinjuku.",
            english: "I take the train and get off at Shinjuku."
          }
        ]
      },
      {
        pattern: "〜てから、〜",
        vietnamese: "Sau khi ~, thì ~",
        english: "After doing ~, ~",
        explanation: "Diễn tả hành động theo thứ tự rõ ràng. Hành động thứ nhất dùng て-form + から, sau đó là hành động thứ hai.",
        examples: [
          {
            japanese: "宿題を　してから、遊びます。",
            vietnamese: "Sau khi làm bài tập, tôi chơi.",
            english: "After doing homework, I play."
          },
          {
            japanese: "昼ごはんを　食べてから、昼寝を　します。",
            vietnamese: "Sau khi ăn trưa, tôi ngủ trưa.",
            english: "After eating lunch, I take a nap."
          },
          {
            japanese: "手を　洗ってから、食べてください。",
            vietnamese: "Sau khi rửa tay, hãy ăn.",
            english: "Please eat after washing your hands."
          }
        ]
      },
      {
        pattern: "〜から",
        vietnamese: "Vì ~, bởi vì ~ (lý do)",
        english: "Because ~, since ~",
        explanation: "Diễn tả lý do. Câu lý do + から, câu kết quả. Dùng với cả động từ/tính từ/danh từ. Câu lý do giữ nguyên dạng lịch sự hoặc thường.",
        examples: [
          {
            japanese: "雨が　降りますから、出かけません。",
            vietnamese: "Vì trời mưa nên tôi không ra ngoài.",
            english: "Because it's raining, I won't go out."
          },
          {
            japanese: "安いですから、これを　買います。",
            vietnamese: "Vì rẻ nên tôi mua cái này.",
            english: "Because it's cheap, I'll buy this."
          },
          {
            japanese: "時間が　ありませんから、タクシーで　行きます。",
            vietnamese: "Vì không có thời gian nên tôi đi taxi.",
            english: "Because I don't have time, I'll go by taxi."
          }
        ]
      },
      {
        pattern: "それから",
        vietnamese: "Sau đó, rồi thì",
        english: "Then, after that",
        explanation: "Từ nối diễn tả trình tự các hành động. Khác với てから (sau khi ~), それから là từ nối đứng đầu câu mới.",
        examples: [
          {
            japanese: "朝ごはんを　食べます。それから、学校へ　行きます。",
            vietnamese: "Tôi ăn sáng. Sau đó đi học.",
            english: "I eat breakfast. Then I go to school."
          },
          {
            japanese: "買い物を　しました。それから、映画を　見ました。",
            vietnamese: "Tôi đi mua sắm. Sau đó xem phim.",
            english: "I went shopping. Then I watched a movie."
          },
          {
            japanese: "シャワーを　浴びます。それから、寝ます。",
            vietnamese: "Tôi tắm. Sau đó ngủ.",
            english: "I take a shower. Then I go to bed."
          }
        ]
      }
    ]
  };

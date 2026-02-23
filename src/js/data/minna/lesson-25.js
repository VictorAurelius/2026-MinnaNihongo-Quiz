// Minna no Nihongo — Lesson 25: 〜たら (Nếu ~ thì)
const LESSON_25_DATA =   {
    lessonNumber: 25,
    title: "〜たら (Nếu ~ thì)",
    vocabulary: [
      {
        japanese: "考えます（かんがえます）",
        kana: "かんがえます",
        vietnamese: "suy nghĩ",
        english: "To think, to consider",
        example: "もう少し考えます。"
      },
      {
        japanese: "着きます（つきます）",
        kana: "つきます",
        vietnamese: "đến nơi",
        english: "To arrive",
        example: "駅に着いたら、電話してください。"
      },
      {
        japanese: "間に合います（まにあいます）",
        kana: "まにあいます",
        vietnamese: "kịp giờ",
        english: "To be in time",
        example: "急いだら、間に合います。"
      },
      {
        japanese: "開きます（あきます）",
        kana: "あきます",
        vietnamese: "mở (cửa tự mở)",
        english: "To open (intransitive)",
        example: "9時になったら、店が開きます。"
      },
      {
        japanese: "入学します（にゅうがくします）",
        kana: "にゅうがくします",
        vietnamese: "nhập học",
        english: "To enter school",
        example: "来年大学に入学します。"
      },
      {
        japanese: "卒業します（そつぎょうします）",
        kana: "そつぎょうします",
        vietnamese: "tốt nghiệp",
        english: "To graduate",
        example: "大学を卒業したら、日本で働きたいです。"
      },
      {
        japanese: "就職します（しゅうしょくします）",
        kana: "しゅうしょくします",
        vietnamese: "xin việc, đi làm",
        english: "To get a job",
        example: "卒業したら、就職します。"
      },
      {
        japanese: "引退します（いんたいします）",
        kana: "いんたいします",
        vietnamese: "nghỉ hưu, giải nghệ",
        english: "To retire",
        example: "60歳になったら、引退します。"
      },
      {
        japanese: "今度（こんど）",
        kana: "こんど",
        vietnamese: "lần sau, lần tới",
        english: "Next time",
        example: "今度、一緒に行きましょう。"
      },
      {
        japanese: "一生（いっしょう）",
        kana: "いっしょう",
        vietnamese: "cả đời, suốt đời",
        english: "Whole life",
        example: "一生日本語を勉強したいです。"
      },
      {
        japanese: "いつか",
        kana: "いつか",
        vietnamese: "một ngày nào đó",
        english: "Someday",
        example: "いつか日本に住みたいです。"
      },
      {
        japanese: "たぶん",
        kana: "たぶん",
        vietnamese: "có lẽ, chắc là",
        english: "Probably, maybe",
        example: "たぶん大丈夫だと思います。"
      },
      {
        japanese: "きっと",
        kana: "きっと",
        vietnamese: "chắc chắn",
        english: "Surely, certainly",
        example: "きっと合格できますよ。"
      },
      {
        japanese: "本当に（ほんとうに）",
        kana: "ほんとうに",
        vietnamese: "thực sự, thật sự",
        english: "Really, truly",
        example: "本当にありがとうございます。"
      },
      {
        japanese: "もし",
        kana: "もし",
        vietnamese: "nếu (giả sử)",
        english: "If",
        example: "もし時間があったら、来てください。"
      },
      {
        japanese: "いくら〜ても",
        kana: "いくら〜ても",
        vietnamese: "dù ~ bao nhiêu đi nữa",
        english: "No matter how much ~",
        example: "いくら食べても太りません。"
      },
      {
        japanese: "〜たら",
        kana: "〜たら",
        vietnamese: "nếu ~ thì, khi ~ thì",
        english: "If ~, when ~",
        example: "雨が降ったら、行きません。"
      },
      {
        japanese: "〜ても",
        kana: "〜ても",
        vietnamese: "dù ~ cũng, cho dù ~",
        english: "Even if ~",
        example: "雨が降っても、行きます。"
      },
      {
        japanese: "〜なら",
        kana: "〜なら",
        vietnamese: "nếu (nói về ~) thì",
        english: "If (talking about ~)",
        example: "日本料理なら、寿司が好きです。"
      },
      {
        japanese: "チャンス",
        kana: "チャンス",
        vietnamese: "cơ hội",
        english: "Chance, opportunity",
        example: "いいチャンスがあったら、留学したいです。"
      },
      {
        japanese: "教育（きょういく）",
        kana: "きょういく",
        vietnamese: "giáo dục",
        english: "Education",
        example: "教育は大切だと思います。"
      },
      {
        japanese: "環境（かんきょう）",
        kana: "かんきょう",
        vietnamese: "môi trường",
        english: "Environment",
        example: "環境を守らなければなりません。"
      },
      {
        japanese: "場合（ばあい）",
        kana: "ばあい",
        vietnamese: "trường hợp",
        english: "Case, situation",
        example: "雨の場合は中止です。"
      },
      {
        japanese: "経験（けいけん）",
        kana: "けいけん",
        vietnamese: "kinh nghiệm",
        english: "Experience",
        example: "いい経験になりました。"
      },
      {
        japanese: "卒業式（そつぎょうしき）",
        kana: "そつぎょうしき",
        vietnamese: "lễ tốt nghiệp",
        english: "Graduation ceremony",
        example: "卒業式に出席しました。"
      },
      {
        japanese: "結婚式（けっこんしき）",
        kana: "けっこんしき",
        vietnamese: "lễ cưới",
        english: "Wedding ceremony",
        example: "来月友達の結婚式があります。"
      }
    ],
    grammar: [
      {
        pattern: "〜たら",
        vietnamese: "Nếu ~ thì ~, khi ~ thì ~",
        english: "If/When ~ (conditional)",
        explanation: "Diễn tả điều kiện giả định. た-form (động từ/い形/な形/danh từ) + ら. Dùng cho lời khuyên, đề nghị, điều kiện giả định. VD: 行く→行ったら.",
        examples: [
          {
            japanese: "春に　なったら、花見に　行きましょう。",
            vietnamese: "Khi sang xuân, hãy đi ngắm hoa.",
            english: "When spring comes, let's go see cherry blossoms."
          },
          {
            japanese: "時間が　あったら、手伝って　ください。",
            vietnamese: "Nếu có thời gian, hãy giúp tôi.",
            english: "If you have time, please help me."
          },
          {
            japanese: "雨が　降ったら、出かけません。",
            vietnamese: "Nếu trời mưa, tôi sẽ không ra ngoài.",
            english: "If it rains, I won't go out."
          }
        ]
      },
      {
        pattern: "〜ても",
        vietnamese: "Dù ~, cho dù ~",
        english: "Even if/though ~",
        explanation: "Diễn tả điều kiện đối lập. て-form + も. Dù điều kiện có xảy ra, kết quả vẫn không đổi. VD: 行く→行っても, 高い→高くても.",
        examples: [
          {
            japanese: "雨が　降っても、行きます。",
            vietnamese: "Dù trời mưa, tôi vẫn đi.",
            english: "Even if it rains, I'll go."
          },
          {
            japanese: "高くても、買います。",
            vietnamese: "Dù đắt, tôi vẫn mua.",
            english: "Even if it's expensive, I'll buy it."
          },
          {
            japanese: "忙しくても、電話してください。",
            vietnamese: "Dù bận, hãy gọi điện cho tôi.",
            english: "Even if you're busy, please call me."
          }
        ]
      },
      {
        pattern: "〜たら、〜（発見）",
        vietnamese: "~ thì phát hiện ~, ~ thì ~",
        english: "When ~ (discovered/found that ~)",
        explanation: "Diễn tả phát hiện bất ngờ sau khi làm gì. Hành động trước dùng たら, sau đó là phát hiện/kết quả bất ngờ.",
        examples: [
          {
            japanese: "家に　帰ったら、猫が　いました。",
            vietnamese: "Khi về nhà, có con mèo.",
            english: "When I got home, there was a cat."
          },
          {
            japanese: "駅に　着いたら、雨が　降って　いました。",
            vietnamese: "Khi đến ga, trời đang mưa.",
            english: "When I arrived at the station, it was raining."
          },
          {
            japanese: "窓を　開けたら、鳥が　飛んで　きました。",
            vietnamese: "Khi mở cửa sổ, có con chim bay vào.",
            english: "When I opened the window, a bird flew in."
          }
        ]
      },
      {
        pattern: "〜でも",
        vietnamese: "Dù ~ (cho dù)",
        english: "Even ~, no matter ~",
        explanation: "Nhấn mạnh 'bất kể cái gì'. Dùng với từ để hỏi + でも: 何でも (bất cứ gì), どこでも (bất cứ đâu), だれでも (bất cứ ai).",
        examples: [
          {
            japanese: "何でも　食べます。",
            vietnamese: "Tôi ăn bất cứ thứ gì.",
            english: "I eat anything."
          },
          {
            japanese: "どこでも　行きます。",
            vietnamese: "Tôi đi bất cứ đâu.",
            english: "I'll go anywhere."
          },
          {
            japanese: "だれでも　参加できます。",
            vietnamese: "Bất cứ ai cũng có thể tham gia.",
            english: "Anyone can participate."
          }
        ]
      },
      {
        pattern: "〜ば（条件形）",
        vietnamese: "Nếu ~ (dạng điều kiện)",
        english: "If ~ (conditional form)",
        explanation: "Dạng điều kiện khác của động từ (nâng cao). Động từ: 〜えば. い形: 〜ければ. な形・名詞: であれば. VD: 行く→行けば, 高い→高ければ.",
        examples: [
          {
            japanese: "時間が　あれば、手伝います。",
            vietnamese: "Nếu có thời gian, tôi sẽ giúp.",
            english: "If I have time, I'll help."
          },
          {
            japanese: "安ければ、買います。",
            vietnamese: "Nếu rẻ, tôi sẽ mua.",
            english: "If it's cheap, I'll buy it."
          },
          {
            japanese: "わからなければ、聞いてください。",
            vietnamese: "Nếu không hiểu, hãy hỏi.",
            english: "If you don't understand, please ask."
          }
        ]
      }
    ]
  };

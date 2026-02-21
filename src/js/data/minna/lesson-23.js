// Minna no Nihongo — Lesson 23: 〜とき/〜と (Khi ~/Nếu ~)
const LESSON_23_DATA =   {
    lessonNumber: 23,
    title: "〜とき/〜と (Khi ~/Nếu ~)",
    vocabulary: [
      {
        japanese: "聞きます（ききます）",
        kana: "ききます",
        vietnamese: "hỏi",
        english: "To ask",
        example: "道を聞きます。"
      },
      {
        japanese: "回します（まわします）",
        kana: "まわします",
        vietnamese: "xoay, vặn",
        english: "To turn, to rotate",
        example: "ハンドルを回します。"
      },
      {
        japanese: "引きます（ひきます）",
        kana: "ひきます",
        vietnamese: "kéo",
        english: "To pull",
        example: "ドアを引きます。"
      },
      {
        japanese: "変えます（かえます）",
        kana: "かえます",
        vietnamese: "thay đổi",
        english: "To change (transitive)",
        example: "チャンネルを変えます。"
      },
      {
        japanese: "触ります（さわります）",
        kana: "さわります",
        vietnamese: "chạm, sờ",
        english: "To touch",
        example: "壁に触らないでください。"
      },
      {
        japanese: "出ます（でます）",
        kana: "でます",
        vietnamese: "ra (tiền thối ra)",
        english: "To come out",
        example: "お釣りが出ます。"
      },
      {
        japanese: "動きます（うごきます）",
        kana: "うごきます",
        vietnamese: "chuyển động, hoạt động",
        english: "To move, to work",
        example: "ボタンを押すと、機械が動きます。"
      },
      {
        japanese: "歩きます（あるきます）",
        kana: "あるきます",
        vietnamese: "đi bộ",
        english: "To walk",
        example: "駅まで歩きます。"
      },
      {
        japanese: "渡ります（わたります）",
        kana: "わたります",
        vietnamese: "băng qua, đi qua",
        english: "To cross",
        example: "橋を渡ります。"
      },
      {
        japanese: "気をつけます（きをつけます）",
        kana: "きをつけます",
        vietnamese: "cẩn thận, chú ý",
        english: "To be careful",
        example: "車に気をつけてください。"
      },
      {
        japanese: "交通（こうつう）",
        kana: "こうつう",
        vietnamese: "giao thông",
        english: "Traffic, transportation",
        example: "交通が便利です。"
      },
      {
        japanese: "信号（しんごう）",
        kana: "しんごう",
        vietnamese: "đèn giao thông",
        english: "Traffic light",
        example: "信号が赤のとき、止まります。"
      },
      {
        japanese: "交差点（こうさてん）",
        kana: "こうさてん",
        vietnamese: "ngã tư",
        english: "Intersection, crossroads",
        example: "次の交差点を右に曲がります。"
      },
      {
        japanese: "角（かど）",
        kana: "かど",
        vietnamese: "góc (đường)",
        english: "Corner",
        example: "角を左に曲がってください。"
      },
      {
        japanese: "橋（はし）",
        kana: "はし",
        vietnamese: "cầu",
        english: "Bridge",
        example: "橋を渡ると、公園があります。"
      },
      {
        japanese: "駐車場（ちゅうしゃじょう）",
        kana: "ちゅうしゃじょう",
        vietnamese: "bãi đỗ xe",
        english: "Parking lot",
        example: "駐車場はどこですか。"
      },
      {
        japanese: "〜目（〜め）",
        kana: "〜め",
        vietnamese: "thứ ~ (số thứ tự)",
        english: "~th (ordinal number suffix)",
        example: "二つ目の角を右に曲がります。"
      },
      {
        japanese: "建物（たてもの）",
        kana: "たてもの",
        vietnamese: "tòa nhà, công trình",
        english: "Building",
        example: "あの白い建物が病院です。"
      },
      {
        japanese: "タワー",
        kana: "タワー",
        vietnamese: "tháp",
        english: "Tower",
        example: "東京タワーに行きました。"
      },
      {
        japanese: "道（みち）",
        kana: "みち",
        vietnamese: "đường, con đường",
        english: "Road, way",
        example: "この道をまっすぐ行ってください。"
      },
      {
        japanese: "方（ほう）",
        kana: "ほう",
        vietnamese: "phía, hướng",
        english: "Direction, side",
        example: "駅の方へ歩きます。"
      },
      {
        japanese: "途中（とちゅう）",
        kana: "とちゅう",
        vietnamese: "giữa đường, dọc đường",
        english: "On the way, midway",
        example: "会社へ行く途中で友達に会いました。"
      },
      {
        japanese: "左側（ひだりがわ）",
        kana: "ひだりがわ",
        vietnamese: "phía bên trái",
        english: "Left side",
        example: "左側にコンビニがあります。"
      },
      {
        japanese: "右側（みぎがわ）",
        kana: "みぎがわ",
        vietnamese: "phía bên phải",
        english: "Right side",
        example: "右側に銀行があります。"
      },
      {
        japanese: "反対（はんたい）",
        kana: "はんたい",
        vietnamese: "đối diện, ngược lại",
        english: "Opposite, reverse",
        example: "反対側に渡ってください。"
      },
      {
        japanese: "両方（りょうほう）",
        kana: "りょうほう",
        vietnamese: "cả hai",
        english: "Both",
        example: "両方とも好きです。"
      },
      {
        japanese: "ボタン",
        kana: "ボタン",
        vietnamese: "nút bấm",
        english: "Button",
        example: "このボタンを押してください。"
      },
      {
        japanese: "機械（きかい）",
        kana: "きかい",
        vietnamese: "máy móc",
        english: "Machine",
        example: "この機械の使い方を教えてください。"
      },
      {
        japanese: "お釣り（おつり）",
        kana: "おつり",
        vietnamese: "tiền thối lại",
        english: "Change (money)",
        example: "お釣りを取ってください。"
      },
      {
        japanese: "〜とき",
        kana: "〜とき",
        vietnamese: "khi ~",
        english: "When ~",
        example: "日本へ来たとき、びっくりしました。"
      },
      {
        japanese: "〜と",
        kana: "〜と",
        vietnamese: "nếu ~ thì, khi ~ thì",
        english: "When ~, if ~ (natural consequence)",
        example: "このボタンを押すと、お釣りが出ます。"
      },
      {
        japanese: "まず",
        kana: "まず",
        vietnamese: "trước tiên, đầu tiên",
        english: "First, first of all",
        example: "まず、お金を入れてください。"
      }
    ],
    grammar: [
      {
        pattern: "〜とき",
        vietnamese: "Khi ~, lúc ~",
        english: "When ~",
        explanation: "Diễn tả thời điểm xảy ra sự việc. Động từ từ điển + とき (trước khi/trong khi), た-form + とき (sau khi). い形・な形・名詞thể thường + とき.",
        examples: [
          {
            japanese: "日本に　行く　とき、何を　持って　行きますか。",
            vietnamese: "Khi đi Nhật, bạn mang gì theo?",
            english: "When you go to Japan, what will you take?"
          },
          {
            japanese: "暇な　とき、何を　しますか。",
            vietnamese: "Khi rảnh, bạn làm gì?",
            english: "What do you do when you're free?"
          },
          {
            japanese: "子どもの　とき、よく　ここで　遊びました。",
            vietnamese: "Hồi còn nhỏ, tôi thường chơi ở đây.",
            english: "When I was a child, I often played here."
          }
        ]
      },
      {
        pattern: "〜と",
        vietnamese: "Nếu ~ thì ~ (điều kiện tự nhiên)",
        english: "If/When ~ (natural consequence)",
        explanation: "Diễn tả điều kiện tự nhiên, kết quả luôn xảy ra. Động từ thể thường + と. Dùng cho sự thật, quy luật, hướng dẫn.",
        examples: [
          {
            japanese: "春に　なると、花が　咲きます。",
            vietnamese: "Khi sang xuân, hoa nở.",
            english: "When spring comes, flowers bloom."
          },
          {
            japanese: "この　ボタンを　押すと、ドアが　開きます。",
            vietnamese: "Nếu nhấn nút này, cửa sẽ mở.",
            english: "If you press this button, the door opens."
          },
          {
            japanese: "右に　曲がると、銀行が　あります。",
            vietnamese: "Nếu rẽ phải, có ngân hàng.",
            english: "If you turn right, there is a bank."
          }
        ]
      },
      {
        pattern: "〜前に / 〜後で",
        vietnamese: "Trước khi ~ / Sau khi ~",
        english: "Before ~ / After ~",
        explanation: "Diễn tả thời điểm trước hoặc sau hành động. 前に: động từ từ điển + 前に. 後で: た-form + 後で. Danh từ + の前に/の後で.",
        examples: [
          {
            japanese: "寝る　前に、歯を　磨きます。",
            vietnamese: "Trước khi ngủ, tôi đánh răng.",
            english: "Before going to bed, I brush my teeth."
          },
          {
            japanese: "ご飯を　食べた　後で、散歩します。",
            vietnamese: "Sau khi ăn cơm, tôi đi dạo.",
            english: "After eating, I take a walk."
          },
          {
            japanese: "授業の　前に、予習します。",
            vietnamese: "Trước giờ học, tôi chuẩn bị bài.",
            english: "Before class, I prepare the lesson."
          }
        ]
      },
      {
        pattern: "〜ながら",
        vietnamese: "Vừa ~ vừa ~ (đồng thời)",
        english: "While ~, ~ at the same time",
        explanation: "Diễn tả hai hành động xảy ra đồng thời. Động từ ます-form bỏ ます + ながら. Hành động chính ở cuối câu.",
        examples: [
          {
            japanese: "音楽を　聞きながら、勉強します。",
            vietnamese: "Tôi vừa học vừa nghe nhạc.",
            english: "I study while listening to music."
          },
          {
            japanese: "テレビを　見ながら、ご飯を　食べます。",
            vietnamese: "Tôi vừa ăn cơm vừa xem TV.",
            english: "I eat while watching TV."
          },
          {
            japanese: "歩きながら、話しましょう。",
            vietnamese: "Hãy vừa đi vừa nói chuyện.",
            english: "Let's talk while walking."
          }
        ]
      }
    ]
  };

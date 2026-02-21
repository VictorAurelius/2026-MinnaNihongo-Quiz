// Minna no Nihongo — Lesson 01: わたしは ～です (Giới thiệu bản thân)
const LESSON_01_DATA =   {
    lessonNumber: 1,
    title: "わたしは ～です (Giới thiệu bản thân)",
    vocabulary: [
      {
        japanese: "わたし",
        kana: "わたし",
        vietnamese: "tôi",
        english: "I, me",
        example: "わたしは がくせいです。"
      },
      {
        japanese: "あなた",
        kana: "あなた",
        vietnamese: "bạn, anh, chị",
        english: "you",
        example: "あなたは せんせいですか。"
      },
      {
        japanese: "あの ひと",
        kana: "あのひと",
        vietnamese: "người kia",
        english: "that person",
        example: "あの ひとは だれですか。"
      },
      {
        japanese: "あの かた",
        kana: "あのかた",
        vietnamese: "vị kia (lịch sự)",
        english: "that person (polite)",
        example: "あの かたは やまださんです。"
      },
      {
        japanese: "～さん",
        kana: "～さん",
        vietnamese: "anh/chị ~",
        english: "Mr./Ms. ~",
        example: "たなかさんは にほんじんです。"
      },
      {
        japanese: "～ちゃん",
        kana: "～ちゃん",
        vietnamese: "bé ~, ~ (thân mật)",
        english: "~ (endearing, for children)",
        example: ""
      },
      {
        japanese: "～くん",
        kana: "～くん",
        vietnamese: "cậu ~ (thân mật, nam)",
        english: "~ (familiar, for boys)",
        example: ""
      },
      {
        japanese: "～じん",
        kana: "～じん",
        vietnamese: "người ~ (quốc tịch)",
        english: "~ person (nationality)",
        example: "わたしは ベトナムじんです。"
      },
      {
        japanese: "先生（せんせい）",
        kana: "せんせい",
        vietnamese: "giáo viên, thầy/cô",
        english: "teacher, professor",
        example: "やまださんは せんせいです。"
      },
      {
        japanese: "教師（きょうし）",
        kana: "きょうし",
        vietnamese: "giáo viên",
        english: "teacher (profession)",
        example: ""
      },
      {
        japanese: "学生（がくせい）",
        kana: "がくせい",
        vietnamese: "sinh viên",
        english: "student (university)",
        example: "わたしは がくせいです。"
      },
      {
        japanese: "会社員（かいしゃいん）",
        kana: "かいしゃいん",
        vietnamese: "nhân viên công ty",
        english: "company employee",
        example: "たなかさんは かいしゃいんです。"
      },
      {
        japanese: "社員（しゃいん）",
        kana: "しゃいん",
        vietnamese: "nhân viên",
        english: "employee",
        example: ""
      },
      {
        japanese: "銀行員（ぎんこういん）",
        kana: "ぎんこういん",
        vietnamese: "nhân viên ngân hàng",
        english: "bank employee",
        example: ""
      },
      {
        japanese: "医者（いしゃ）",
        kana: "いしゃ",
        vietnamese: "bác sĩ",
        english: "doctor",
        example: "あの ひとは いしゃです。"
      },
      {
        japanese: "研究者（けんきゅうしゃ）",
        kana: "けんきゅうしゃ",
        vietnamese: "nhà nghiên cứu",
        english: "researcher",
        example: ""
      },
      {
        japanese: "エンジニア",
        kana: "エンジニア",
        vietnamese: "kỹ sư",
        english: "engineer",
        example: "マイクさんは エンジニアです。"
      },
      {
        japanese: "大学（だいがく）",
        kana: "だいがく",
        vietnamese: "trường đại học",
        english: "university",
        example: ""
      },
      {
        japanese: "病院（びょういん）",
        kana: "びょういん",
        vietnamese: "bệnh viện",
        english: "hospital",
        example: ""
      },
      {
        japanese: "電気（でんき）",
        kana: "でんき",
        vietnamese: "điện, đồ điện",
        english: "electricity, electric",
        example: ""
      },
      {
        japanese: "だれ",
        kana: "だれ",
        vietnamese: "ai",
        english: "who",
        example: "あの ひとは だれですか。"
      },
      {
        japanese: "どなた",
        kana: "どなた",
        vietnamese: "ai (lịch sự)",
        english: "who (polite)",
        example: "あの かたは どなたですか。"
      },
      {
        japanese: "～さい",
        kana: "～さい",
        vietnamese: "~ tuổi",
        english: "~ years old",
        example: "わたしは 25さいです。"
      },
      {
        japanese: "なんさい",
        kana: "なんさい",
        vietnamese: "mấy tuổi",
        english: "how old",
        example: "マリアさんは なんさいですか。"
      },
      {
        japanese: "はい",
        kana: "はい",
        vietnamese: "vâng, dạ",
        english: "yes",
        example: "はい、そうです。"
      },
      {
        japanese: "いいえ",
        kana: "いいえ",
        vietnamese: "không",
        english: "no",
        example: "いいえ、ちがいます。"
      },
      {
        japanese: "はじめまして",
        kana: "はじめまして",
        vietnamese: "xin chào (lần đầu gặp)",
        english: "how do you do",
        example: "はじめまして、たなかです。"
      },
      {
        japanese: "どうぞ よろしく",
        kana: "どうぞよろしく",
        vietnamese: "rất vui được gặp bạn",
        english: "pleased to meet you",
        example: ""
      },
      {
        japanese: "失礼ですが（しつれいですが）",
        kana: "しつれいですが",
        vietnamese: "xin lỗi nhưng...",
        english: "excuse me, but...",
        example: "しつれいですが、おなまえは？"
      },
      {
        japanese: "お名前は？（おなまえは？）",
        kana: "おなまえは",
        vietnamese: "tên bạn là gì?",
        english: "what is your name?",
        example: ""
      },
      {
        japanese: "アメリカ",
        kana: "アメリカ",
        vietnamese: "Mỹ",
        english: "America, USA",
        example: "マイクさんは アメリカじんです。"
      },
      {
        japanese: "イギリス",
        kana: "イギリス",
        vietnamese: "Anh",
        english: "England, UK",
        example: ""
      },
      {
        japanese: "インド",
        kana: "インド",
        vietnamese: "Ấn Độ",
        english: "India",
        example: ""
      },
      {
        japanese: "インドネシア",
        kana: "インドネシア",
        vietnamese: "Indonesia",
        english: "Indonesia",
        example: ""
      },
      {
        japanese: "韓国（かんこく）",
        kana: "かんこく",
        vietnamese: "Hàn Quốc",
        english: "South Korea",
        example: ""
      },
      {
        japanese: "タイ",
        kana: "タイ",
        vietnamese: "Thái Lan",
        english: "Thailand",
        example: ""
      },
      {
        japanese: "中国（ちゅうごく）",
        kana: "ちゅうごく",
        vietnamese: "Trung Quốc",
        english: "China",
        example: ""
      },
      {
        japanese: "ドイツ",
        kana: "ドイツ",
        vietnamese: "Đức",
        english: "Germany",
        example: ""
      },
      {
        japanese: "日本（にほん）",
        kana: "にほん",
        vietnamese: "Nhật Bản",
        english: "Japan",
        example: ""
      },
      {
        japanese: "フランス",
        kana: "フランス",
        vietnamese: "Pháp",
        english: "France",
        example: ""
      },
      {
        japanese: "ブラジル",
        kana: "ブラジル",
        vietnamese: "Brazil",
        english: "Brazil",
        example: ""
      }
    ],
    grammar: [
      {
        pattern: "～は ～です",
        vietnamese: "~ là ~",
        english: "~ is/am/are ~",
        explanation: "Dùng để giới thiệu bản thân hoặc xác định danh tính. 'は' là trợ từ chỉ chủ đề, 'です' là động từ 'là' lịch sự.",
        examples: [
          {
            japanese: "わたしは マイクです。",
            vietnamese: "Tôi là Mike.",
            english: "I am Mike."
          },
          {
            japanese: "わたしは がくせいです。",
            vietnamese: "Tôi là học sinh.",
            english: "I am a student."
          },
          {
            japanese: "やまださんは せんせいです。",
            vietnamese: "Anh Yamada là giáo viên.",
            english: "Mr. Yamada is a teacher."
          }
        ]
      },
      {
        pattern: "～は ～じゃ ありません",
        vietnamese: "~ không phải là ~",
        english: "~ is/am/are not ~",
        explanation: "Dạng phủ định của 'です'. 'じゃ' là viết tắt thân mật của 'では'.",
        examples: [
          {
            japanese: "わたしは がくせいじゃ ありません。",
            vietnamese: "Tôi không phải là học sinh.",
            english: "I am not a student."
          },
          {
            japanese: "サントスさんは せんせいじゃ ありません。",
            vietnamese: "Anh Santos không phải là giáo viên.",
            english: "Mr. Santos is not a teacher."
          }
        ]
      },
      {
        pattern: "～は ～ですか",
        vietnamese: "~ có phải là ~ không?",
        english: "Is/Am/Are ~ ~?",
        explanation: "Câu hỏi yes/no. Thêm 'か' vào cuối câu khẳng định. Trả lời: はい、～です hoặc いいえ、～じゃ ありません。",
        examples: [
          {
            japanese: "あなたは がくせいですか。",
            vietnamese: "Bạn có phải là học sinh không?",
            english: "Are you a student?"
          },
          {
            japanese: "ミラーさんは アメリカじんですか。",
            vietnamese: "Anh Miller có phải là người Mỹ không?",
            english: "Is Mr. Miller American?"
          }
        ]
      },
      {
        pattern: "～の ～",
        vietnamese: "~ của ~",
        english: "~ of ~, ~'s ~",
        explanation: "Trợ từ 'の' dùng để chỉ sở hữu hoặc thuộc tính. Kết nối hai danh từ.",
        examples: [
          {
            japanese: "これは わたしの ほんです。",
            vietnamese: "Đây là sách của tôi.",
            english: "This is my book."
          },
          {
            japanese: "やまださんは IMCの しゃいんです。",
            vietnamese: "Anh Yamada là nhân viên của IMC.",
            english: "Mr. Yamada is an employee of IMC."
          }
        ]
      }
    ]
  };

// Minna no Nihongo — Lesson 04: ～時に 起きます (Thời gian / Lịch trình)
const LESSON_04_DATA =   {
    lessonNumber: 4,
    title: "～時に 起きます (Thời gian / Lịch trình)",
    vocabulary: [
      {
        japanese: "起きます（おきます）",
        kana: "おきます",
        vietnamese: "thức dậy",
        english: "to wake up, to get up",
        example: "まいあさ 6じに おきます。"
      },
      {
        japanese: "寝ます（ねます）",
        kana: "ねます",
        vietnamese: "đi ngủ",
        english: "to sleep, to go to bed",
        example: "11じに ねます。"
      },
      {
        japanese: "働きます（はたらきます）",
        kana: "はたらきます",
        vietnamese: "làm việc",
        english: "to work",
        example: "9じから 5じまで はたらきます。"
      },
      {
        japanese: "休みます（やすみます）",
        kana: "やすみます",
        vietnamese: "nghỉ ngơi",
        english: "to rest, to take a day off",
        example: "にちようびに やすみます。"
      },
      {
        japanese: "勉強します（べんきょうします）",
        kana: "べんきょうします",
        vietnamese: "học",
        english: "to study",
        example: "まいにち にほんごを べんきょうします。"
      },
      {
        japanese: "終わります（おわります）",
        kana: "おわります",
        vietnamese: "kết thúc",
        english: "to finish, to end",
        example: "じゅぎょうは 3じに おわります。"
      },
      {
        japanese: "デパート",
        kana: "デパート",
        vietnamese: "bách hóa, trung tâm thương mại",
        english: "department store",
        example: ""
      },
      {
        japanese: "銀行（ぎんこう）",
        kana: "ぎんこう",
        vietnamese: "ngân hàng",
        english: "bank",
        example: "ぎんこうは 9じから 3じまでです。"
      },
      {
        japanese: "郵便局（ゆうびんきょく）",
        kana: "ゆうびんきょく",
        vietnamese: "bưu điện",
        english: "post office",
        example: ""
      },
      {
        japanese: "図書館（としょかん）",
        kana: "としょかん",
        vietnamese: "thư viện",
        english: "library",
        example: ""
      },
      {
        japanese: "美術館（びじゅつかん）",
        kana: "びじゅつかん",
        vietnamese: "bảo tàng mỹ thuật",
        english: "art museum",
        example: ""
      },
      {
        japanese: "今（いま）",
        kana: "いま",
        vietnamese: "bây giờ",
        english: "now",
        example: "いま 3じです。"
      },
      {
        japanese: "～時（～じ）",
        kana: "～じ",
        vietnamese: "~ giờ",
        english: "~ o'clock",
        example: "いま 7じです。"
      },
      {
        japanese: "～分（～ふん / ～ぷん）",
        kana: "～ふん",
        vietnamese: "~ phút",
        english: "~ minutes",
        example: "いま 7じ30ぷんです。"
      },
      {
        japanese: "半（はん）",
        kana: "はん",
        vietnamese: "rưỡi (30 phút)",
        english: "half (past)",
        example: "6じはんに おきます。"
      },
      {
        japanese: "午前（ごぜん）",
        kana: "ごぜん",
        vietnamese: "buổi sáng, trước trưa",
        english: "a.m., morning",
        example: "ごぜん 9じに はたらきます。"
      },
      {
        japanese: "午後（ごご）",
        kana: "ごご",
        vietnamese: "buổi chiều, sau trưa",
        english: "p.m., afternoon",
        example: ""
      },
      {
        japanese: "朝（あさ）",
        kana: "あさ",
        vietnamese: "buổi sáng",
        english: "morning",
        example: ""
      },
      {
        japanese: "昼（ひる）",
        kana: "ひる",
        vietnamese: "buổi trưa",
        english: "noon, daytime",
        example: ""
      },
      {
        japanese: "夜（よる）",
        kana: "よる",
        vietnamese: "buổi tối",
        english: "evening, night",
        example: ""
      },
      {
        japanese: "おととい",
        kana: "おととい",
        vietnamese: "hôm kia",
        english: "day before yesterday",
        example: ""
      },
      {
        japanese: "きのう",
        kana: "きのう",
        vietnamese: "hôm qua",
        english: "yesterday",
        example: ""
      },
      {
        japanese: "今日（きょう）",
        kana: "きょう",
        vietnamese: "hôm nay",
        english: "today",
        example: ""
      },
      {
        japanese: "明日（あした）",
        kana: "あした",
        vietnamese: "ngày mai",
        english: "tomorrow",
        example: ""
      },
      {
        japanese: "あさって",
        kana: "あさって",
        vietnamese: "ngày mốt",
        english: "day after tomorrow",
        example: ""
      },
      {
        japanese: "毎朝（まいあさ）",
        kana: "まいあさ",
        vietnamese: "mỗi sáng",
        english: "every morning",
        example: "まいあさ 6じに おきます。"
      },
      {
        japanese: "毎晩（まいばん）",
        kana: "まいばん",
        vietnamese: "mỗi tối",
        english: "every evening",
        example: ""
      },
      {
        japanese: "毎日（まいにち）",
        kana: "まいにち",
        vietnamese: "mỗi ngày",
        english: "every day",
        example: ""
      },
      {
        japanese: "月曜日（げつようび）",
        kana: "げつようび",
        vietnamese: "thứ Hai",
        english: "Monday",
        example: ""
      },
      {
        japanese: "火曜日（かようび）",
        kana: "かようび",
        vietnamese: "thứ Ba",
        english: "Tuesday",
        example: ""
      },
      {
        japanese: "水曜日（すいようび）",
        kana: "すいようび",
        vietnamese: "thứ Tư",
        english: "Wednesday",
        example: ""
      },
      {
        japanese: "木曜日（もくようび）",
        kana: "もくようび",
        vietnamese: "thứ Năm",
        english: "Thursday",
        example: ""
      },
      {
        japanese: "金曜日（きんようび）",
        kana: "きんようび",
        vietnamese: "thứ Sáu",
        english: "Friday",
        example: ""
      },
      {
        japanese: "土曜日（どようび）",
        kana: "どようび",
        vietnamese: "thứ Bảy",
        english: "Saturday",
        example: ""
      },
      {
        japanese: "日曜日（にちようび）",
        kana: "にちようび",
        vietnamese: "Chủ nhật",
        english: "Sunday",
        example: "にちようびに やすみます。"
      },
      {
        japanese: "何曜日（なんようび）",
        kana: "なんようび",
        vietnamese: "thứ mấy",
        english: "what day of the week",
        example: "きょうは なんようびですか。"
      },
      {
        japanese: "番号（ばんごう）",
        kana: "ばんごう",
        vietnamese: "số",
        english: "number",
        example: "でんわばんごうは なんですか。"
      },
      {
        japanese: "何時（なんじ）",
        kana: "なんじ",
        vietnamese: "mấy giờ",
        english: "what time",
        example: "いま なんじですか。"
      },
      {
        japanese: "何分（なんぷん）",
        kana: "なんぷん",
        vietnamese: "mấy phút",
        english: "how many minutes",
        example: ""
      },
      {
        japanese: "～から",
        kana: "～から",
        vietnamese: "từ ~",
        english: "from ~",
        example: "9じから はたらきます。"
      },
      {
        japanese: "～まで",
        kana: "～まで",
        vietnamese: "đến ~",
        english: "until ~",
        example: "5じまで はたらきます。"
      },
      {
        japanese: "そちら",
        kana: "そちら",
        vietnamese: "bên đó (lịch sự)",
        english: "your place (polite)",
        example: "そちらは なんじから なんじまでですか。"
      }
    ],
    grammar: [
      {
        pattern: "～時～分",
        vietnamese: "~ giờ ~ phút",
        english: "~ o'clock ~ minute",
        explanation: "Cách nói giờ và phút trong tiếng Nhật. じ (時) = giờ, ふん/ぷん (分) = phút.",
        examples: [
          {
            japanese: "いま 9じ 10ぷんです。",
            vietnamese: "Bây giờ là 9 giờ 10 phút.",
            english: "It's 9:10 now."
          },
          {
            japanese: "かいぎは 3じはんです。",
            vietnamese: "Cuộc họp là lúc 3 giờ rưỡi.",
            english: "The meeting is at 3:30."
          }
        ]
      },
      {
        pattern: "～に ～ます",
        vietnamese: "~ vào lúc ~",
        english: "~ at (time)",
        explanation: "Trợ từ 'に' chỉ thời điểm cụ thể.",
        examples: [
          {
            japanese: "まいあさ 6じに おきます。",
            vietnamese: "Tôi dậy lúc 6 giờ mỗi sáng.",
            english: "I wake up at 6 o'clock every morning."
          },
          {
            japanese: "12じ 15ふんに べんきょうします。",
            vietnamese: "Tôi học lúc 12 giờ 15 phút.",
            english: "I study at 12:15."
          }
        ]
      },
      {
        pattern: "～から ～まで",
        vietnamese: "từ ~ đến ~",
        english: "from ~ to/until ~",
        explanation: "Chỉ khoảng thời gian từ điểm bắt đầu đến điểm kết thúc.",
        examples: [
          {
            japanese: "9じから 5じまで はたらきます。",
            vietnamese: "Tôi làm việc từ 9 giờ đến 5 giờ.",
            english: "I work from 9 to 5."
          },
          {
            japanese: "げつようびから きんようびまで がっこうへ いきます。",
            vietnamese: "Tôi đi học từ thứ Hai đến thứ Sáu.",
            english: "I go to school from Monday to Friday."
          }
        ]
      },
      {
        pattern: "～は ～から ～までです",
        vietnamese: "~ từ ~ đến ~",
        english: "~ is from ~ to ~",
        explanation: "Nói về khung giờ hoạt động của một địa điểm.",
        examples: [
          {
            japanese: "ぎんこうは 9じから 3じまでです。",
            vietnamese: "Ngân hàng từ 9 giờ đến 3 giờ.",
            english: "The bank is (open) from 9 to 3."
          },
          {
            japanese: "デパートは 10じから 8じまでです。",
            vietnamese: "Cửa hàng bách hóa từ 10 giờ đến 8 giờ.",
            english: "The department store is (open) from 10 to 8."
          }
        ]
      }
    ]
  };

/**
 * N4 Core Lessons — Lesson 11: Sentence Ending Expressions
 * Appearance and hearsay expressions
 */

import type { LessonData } from '$lib/types';

export const LESSON_11_DATA: LessonData = {
  lessonNumber: 11,
  title: '様態表現 (Biểu hiện dáng vẻ, truyền đạt)',
  vocabulary: [
    // Appearance verbs
    {
      japanese: '見える',
      kana: 'みえる',
      vietnamese: 'nhìn thấy, có vẻ',
      english: 'to be visible, to look, to seem',
      type: 'main',
      example: 'あそこに富士山が見えます。'
    },
    {
      japanese: '聞こえる',
      kana: 'きこえる',
      vietnamese: 'nghe thấy',
      english: 'to be audible, can hear',
      type: 'main',
      example: '音楽が聞こえます。'
    },
    {
      japanese: '似る',
      kana: 'にる',
      vietnamese: 'giống',
      english: 'to resemble, to be similar',
      type: 'main',
      example: '彼は父に似ています。'
    },
    {
      japanese: '似ている',
      kana: 'にている',
      vietnamese: 'giống nhau',
      english: 'to be similar',
      type: 'main',
      example: '双子は顔が似ています。'
    },

    // Weather and conditions
    {
      japanese: '晴れる',
      kana: 'はれる',
      vietnamese: 'nắng, quang đãng',
      english: 'to clear up (weather)',
      type: 'main',
      example: '明日は晴れるそうです。'
    },
    {
      japanese: '曇る',
      kana: 'くもる',
      vietnamese: 'có mây, âm u',
      english: 'to become cloudy',
      type: 'main',
      example: '午後から曇りそうです。'
    },
    {
      japanese: '降る',
      kana: 'ふる',
      vietnamese: 'rơi (mưa, tuyết)',
      english: 'to fall (rain, snow)',
      type: 'main',
      example: '雨が降りそうです。'
    },
    {
      japanese: '台風',
      kana: 'たいふう',
      vietnamese: 'bão',
      english: 'typhoon',
      type: 'main',
      example: '台風が来るそうです。'
    },
    {
      japanese: '地震',
      kana: 'じしん',
      vietnamese: 'động đất',
      english: 'earthquake',
      type: 'main',
      example: '地震が起こりそうです。'
    },
    {
      japanese: '雷',
      kana: 'かみなり',
      vietnamese: 'sấm sét',
      english: 'thunder, lightning',
      type: 'main',
      example: '雷が鳴っています。'
    },

    // Appearance adjectives
    {
      japanese: '美味しそう',
      kana: 'おいしそう',
      vietnamese: 'trông ngon',
      english: 'looks delicious',
      type: 'main',
      example: 'このケーキは美味しそうです。'
    },
    {
      japanese: '楽しそう',
      kana: 'たのしそう',
      vietnamese: 'trông vui',
      english: 'looks fun',
      type: 'main',
      example: 'あの人は楽しそうです。'
    },
    {
      japanese: '難しそう',
      kana: 'むずかしそう',
      vietnamese: 'trông khó',
      english: 'looks difficult',
      type: 'main',
      example: 'この問題は難しそうです。'
    },
    {
      japanese: '暑そう',
      kana: 'あつそう',
      vietnamese: 'trông nóng',
      english: 'looks hot',
      type: 'main',
      example: '今日は暑そうです。'
    },
    {
      japanese: '寒そう',
      kana: 'さむそう',
      vietnamese: 'trông lạnh',
      english: 'looks cold',
      type: 'main',
      example: '外は寒そうです。'
    },

    // States and conditions
    {
      japanese: '元気',
      kana: 'げんき',
      vietnamese: 'khỏe mạnh, vui vẻ',
      english: 'healthy, energetic',
      type: 'main',
      example: '彼女は元気そうです。'
    },
    {
      japanese: '病気',
      kana: 'びょうき',
      vietnamese: 'bệnh',
      english: 'illness, disease',
      type: 'main',
      example: '病気のようです。'
    },
    {
      japanese: '疲れる',
      kana: 'つかれる',
      vietnamese: 'mệt mỏi',
      english: 'to get tired',
      type: 'main',
      example: '彼は疲れているようです。'
    },
    {
      japanese: '眠い',
      kana: 'ねむい',
      vietnamese: 'buồn ngủ',
      english: 'sleepy',
      type: 'main',
      example: '眠そうな顔をしています。'
    },
    {
      japanese: '忙しい',
      kana: 'いそがしい',
      vietnamese: 'bận rộn',
      english: 'busy',
      type: 'main',
      example: '最近忙しそうです。'
    },

    // Communication verbs
    {
      japanese: '伝える',
      kana: 'つたえる',
      vietnamese: 'truyền đạt, cho biết',
      english: 'to convey, to tell',
      type: 'main',
      example: '彼に伝えてください。'
    },
    {
      japanese: '知らせる',
      kana: 'しらせる',
      vietnamese: 'thông báo',
      english: 'to inform, to notify',
      type: 'main',
      example: '結果を知らせます。'
    },
    {
      japanese: '報告',
      kana: 'ほうこく',
      vietnamese: 'báo cáo',
      english: 'report',
      type: 'main',
      example: '上司に報告します。'
    },
    {
      japanese: '連絡',
      kana: 'れんらく',
      vietnamese: 'liên lạc',
      english: 'contact, communication',
      type: 'main',
      example: '後で連絡します。'
    },
    {
      japanese: '返事',
      kana: 'へんじ',
      vietnamese: 'trả lời',
      english: 'reply, answer',
      type: 'main',
      example: '返事を待っています。'
    },

    // News and information
    {
      japanese: 'ニュース',
      kana: 'ニュース',
      vietnamese: 'tin tức',
      english: 'news',
      type: 'main',
      example: 'ニュースで聞きました。'
    },
    {
      japanese: '新聞',
      kana: 'しんぶん',
      vietnamese: 'báo giấy',
      english: 'newspaper',
      type: 'main',
      example: '新聞によると、雨が降るそうです。'
    },
    {
      japanese: '天気予報',
      kana: 'てんきよほう',
      vietnamese: 'dự báo thời tiết',
      english: 'weather forecast',
      type: 'main',
      example: '天気予報によると、明日は晴れるそうです。'
    },
    {
      japanese: '情報',
      kana: 'じょうほう',
      vietnamese: 'thông tin',
      english: 'information',
      type: 'main',
      example: '新しい情報があります。'
    },
    {
      japanese: 'インターネット',
      kana: 'インターネット',
      vietnamese: 'internet',
      english: 'internet',
      type: 'main',
      example: 'インターネットで調べました。'
    },

    // Additional vocabulary
    {
      japanese: '様子',
      kana: 'ようす',
      vietnamese: 'tình trạng, dáng vẻ',
      english: 'appearance, situation',
      type: 'additional',
      example: '様子を見ましょう。'
    },
    {
      japanese: '感じ',
      kana: 'かんじ',
      vietnamese: 'cảm giác',
      english: 'feeling, impression',
      type: 'additional',
      example: 'いい感じです。'
    },
    {
      japanese: '雰囲気',
      kana: 'ふんいき',
      vietnamese: 'bầu không khí',
      english: 'atmosphere, mood',
      type: 'additional',
      example: 'いい雰囲気のレストランです。'
    },
    {
      japanese: '印象',
      kana: 'いんしょう',
      vietnamese: 'ấn tượng',
      english: 'impression',
      type: 'additional',
      example: 'いい印象を受けました。'
    },
    {
      japanese: '表情',
      kana: 'ひょうじょう',
      vietnamese: 'nét mặt, biểu cảm',
      english: 'facial expression',
      type: 'additional',
      example: '彼の表情が変わりました。'
    },
    {
      japanese: '態度',
      kana: 'たいど',
      vietnamese: 'thái độ',
      english: 'attitude',
      type: 'additional',
      example: '態度が悪いです。'
    },
    {
      japanese: '性格',
      kana: 'せいかく',
      vietnamese: 'tính cách',
      english: 'personality, character',
      type: 'additional',
      example: '明るい性格です。'
    },
    {
      japanese: '外見',
      kana: 'がいけん',
      vietnamese: 'ngoại hình',
      english: 'appearance, exterior',
      type: 'additional',
      example: '外見だけで判断しないでください。'
    },
    {
      japanese: '確か',
      kana: 'たしか',
      vietnamese: 'chắc chắn',
      english: 'certain, sure',
      type: 'additional',
      example: '確かに聞きました。'
    },
    {
      japanese: '多分',
      kana: 'たぶん',
      vietnamese: 'có lẽ',
      english: 'probably, maybe',
      type: 'additional',
      example: '多分雨が降ります。'
    },
    {
      japanese: 'きっと',
      kana: 'きっと',
      vietnamese: 'chắc chắn',
      english: 'surely, certainly',
      type: 'additional',
      example: 'きっと来ます。'
    },
    {
      japanese: 'どうやら',
      kana: 'どうやら',
      vietnamese: 'có vẻ như',
      english: 'apparently, it seems',
      type: 'additional',
      example: 'どうやら雨が降りそうです。'
    },
    {
      japanese: 'まるで',
      kana: 'まるで',
      vietnamese: 'giống như, như thể',
      english: 'just like, as if',
      type: 'additional',
      example: 'まるで夢のようです。'
    },
    {
      japanese: 'ちょうど',
      kana: 'ちょうど',
      vietnamese: 'vừa vặn, đúng lúc',
      english: 'just, exactly',
      type: 'additional',
      example: 'ちょうど来たところです。'
    },
    {
      japanese: '最近',
      kana: 'さいきん',
      vietnamese: 'gần đây',
      english: 'recently, lately',
      type: 'additional',
      example: '最近忙しいです。'
    },
    {
      japanese: '最新',
      kana: 'さいしん',
      vietnamese: 'mới nhất',
      english: 'latest, newest',
      type: 'additional',
      example: '最新のニュースです。'
    },
    {
      japanese: '最高',
      kana: 'さいこう',
      vietnamese: 'tốt nhất, cao nhất',
      english: 'best, highest',
      type: 'additional',
      example: '最高の景色です。'
    },
    {
      japanese: '調子',
      kana: 'ちょうし',
      vietnamese: 'tình trạng, tình hình',
      english: 'condition, state',
      type: 'additional',
      example: '調子がいいです。'
    },
    {
      japanese: '具合',
      kana: 'ぐあい',
      vietnamese: 'tình trạng (sức khỏe)',
      english: 'condition (health)',
      type: 'additional',
      example: '具合が悪いです。'
    },
    {
      japanese: '状態',
      kana: 'じょうたい',
      vietnamese: 'trạng thái',
      english: 'state, condition',
      type: 'additional',
      example: 'いい状態です。'
    },
    {
      japanese: '状況',
      kana: 'じょうきょう',
      vietnamese: 'tình hình',
      english: 'situation, circumstances',
      type: 'additional',
      example: '状況を説明してください。'
    },

    // Supplementary
    {
      japanese: '噂',
      kana: 'うわさ',
      vietnamese: 'tin đồn',
      english: 'rumor, gossip',
      type: 'supplementary',
      example: '噂によると、彼は結婚するそうです。'
    },
    {
      japanese: '評判',
      kana: 'ひょうばん',
      vietnamese: 'danh tiếng, uy tín',
      english: 'reputation, reviews',
      type: 'supplementary',
      example: 'この店は評判がいいです。'
    },
    {
      japanese: '口調',
      kana: 'くちょう',
      vietnamese: 'giọng điệu',
      english: 'tone (of voice)',
      type: 'supplementary',
      example: '優しい口調で話します。'
    },
    {
      japanese: '様',
      kana: 'さま',
      vietnamese: 'ngài, quý vị',
      english: 'Mr./Ms. (formal)',
      type: 'supplementary',
      example: '田中様、いらっしゃいませ。'
    },
    {
      japanese: '方',
      kana: 'かた',
      vietnamese: 'người (lịch sự)',
      english: 'person (polite)',
      type: 'supplementary',
      example: 'あの方は誰ですか。'
    }
  ],
  grammar: [
    {
      pattern: '〜そうだ (appearance)',
      vietnamese: 'trông có vẻ ~',
      english: 'looks/seems like ~',
      type: 'main',
      explanation: 'Diễn tả vẻ ngoài, trạng thái có thể quan sát được. Với い-adj: bỏ い + そう. Với な-adj/động từ: thêm そう.',
      examples: [
        {
          japanese: 'この料理は美味しそうです。',
          vietnamese: 'Món ăn này trông ngon.',
          english: 'This dish looks delicious.',
          type: 'main'
        },
        {
          japanese: '雨が降りそうです。',
          vietnamese: 'Trông như sắp mưa.',
          english: 'It looks like it will rain.',
          type: 'main'
        },
        {
          japanese: '彼は忙しそうです。',
          vietnamese: 'Anh ấy trông có vẻ bận.',
          english: 'He looks busy.',
          type: 'main'
        },
        {
          japanese: 'あの人は楽しそうに話しています。',
          vietnamese: 'Người đó nói chuyện với vẻ vui vẻ.',
          english: 'That person is talking happily.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '〜そうだ (hearsay)',
      vietnamese: 'nghe nói rằng ~',
      english: 'I heard that ~',
      type: 'main',
      explanation: 'Diễn tả thông tin nghe được từ người khác hoặc nguồn tin. Dùng với câu thông thường + そうだ.',
      examples: [
        {
          japanese: '明日は雨が降るそうです。',
          vietnamese: 'Nghe nói ngày mai sẽ mưa.',
          english: 'I heard it will rain tomorrow.',
          type: 'main'
        },
        {
          japanese: '田中さんは来月結婚するそうです。',
          vietnamese: 'Nghe nói anh Tanaka sẽ kết hôn tháng sau.',
          english: 'I heard Mr. Tanaka will get married next month.',
          type: 'main'
        },
        {
          japanese: 'ニュースによると、台風が来るそうです。',
          vietnamese: 'Theo tin tức, có bão sắp đến.',
          english: 'According to the news, a typhoon is coming.',
          type: 'main'
        }
      ]
    },
    {
      pattern: '〜ようだ',
      vietnamese: 'có vẻ như ~, giống như ~',
      english: 'it seems that ~, it\'s like ~',
      type: 'main',
      explanation: 'Diễn tả sự suy đoán dựa trên quan sát hoặc thông tin. Mềm mỏng hơn そうだ.',
      examples: [
        {
          japanese: '彼は病気のようです。',
          vietnamese: 'Anh ấy có vẻ bị bệnh.',
          english: 'He seems to be sick.',
          type: 'main'
        },
        {
          japanese: '雨が降ったようです。',
          vietnamese: 'Có vẻ như đã mưa.',
          english: 'It seems it rained.',
          type: 'main'
        },
        {
          japanese: 'まるで夢のようです。',
          vietnamese: 'Giống như trong mơ.',
          english: 'It\'s like a dream.',
          type: 'main'
        },
        {
          japanese: 'どうやら間違えたようです。',
          vietnamese: 'Có vẻ như tôi đã nhầm.',
          english: 'It seems I made a mistake.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '〜みたいだ',
      vietnamese: 'giống như ~, có vẻ ~',
      english: 'looks like ~, seems like ~',
      type: 'main',
      explanation: 'Tương tự ようだ nhưng thân mật hơn. Dùng trong hội thoại hàng ngày.',
      examples: [
        {
          japanese: '彼は学生みたいです。',
          vietnamese: 'Anh ấy có vẻ là học sinh.',
          english: 'He looks like a student.',
          type: 'main'
        },
        {
          japanese: '雨が降ったみたいです。',
          vietnamese: 'Có vẻ đã mưa rồi.',
          english: 'It seems it rained.',
          type: 'main'
        },
        {
          japanese: '彼女は忙しいみたいです。',
          vietnamese: 'Cô ấy có vẻ bận.',
          english: 'She seems busy.',
          type: 'main'
        }
      ]
    },
    {
      pattern: '〜によると',
      vietnamese: 'theo ~',
      english: 'according to ~',
      type: 'main',
      explanation: 'Dùng để trích dẫn nguồn thông tin. Thường đi kèm với そうだ.',
      examples: [
        {
          japanese: '天気予報によると、明日は晴れるそうです。',
          vietnamese: 'Theo dự báo thời tiết, ngày mai trời sẽ nắng.',
          english: 'According to the weather forecast, it will be sunny tomorrow.',
          type: 'main'
        },
        {
          japanese: '新聞によると、地震があったそうです。',
          vietnamese: 'Theo báo chí, đã có động đất.',
          english: 'According to the newspaper, there was an earthquake.',
          type: 'main'
        },
        {
          japanese: '友達によると、その店は美味しいそうです。',
          vietnamese: 'Theo bạn tôi, quán đó ngon lắm.',
          english: 'According to my friend, that restaurant is delicious.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '見える / 聞こえる',
      vietnamese: 'nhìn thấy / nghe thấy',
      english: 'can see / can hear',
      type: 'additional',
      explanation: 'Động từ khả năng tự nhiên (không cần chủ ý). 見える: nhìn thấy tự nhiên. 聞こえる: nghe thấy tự nhiên.',
      examples: [
        {
          japanese: 'あそこに富士山が見えます。',
          vietnamese: 'Nhìn thấy núi Phú Sĩ ở đằng kia.',
          english: 'Mt. Fuji can be seen over there.',
          type: 'main'
        },
        {
          japanese: '音楽が聞こえます。',
          vietnamese: 'Nghe thấy tiếng nhạc.',
          english: 'Music can be heard.',
          type: 'main'
        },
        {
          japanese: '窓から海が見えます。',
          vietnamese: 'Nhìn thấy biển từ cửa sổ.',
          english: 'The sea can be seen from the window.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '〜に似ている',
      vietnamese: 'giống với ~',
      english: 'resembles ~, looks like ~',
      type: 'additional',
      explanation: 'Diễn tả sự giống nhau về ngoại hình hoặc tính cách.',
      examples: [
        {
          japanese: '彼は父に似ています。',
          vietnamese: 'Anh ấy giống bố.',
          english: 'He resembles his father.',
          type: 'main'
        },
        {
          japanese: 'この花はバラに似ています。',
          vietnamese: 'Bông hoa này giống hoa hồng.',
          english: 'This flower looks like a rose.',
          type: 'main'
        },
        {
          japanese: '双子は顔が似ています。',
          vietnamese: 'Hai chị em sinh đôi có khuôn mặt giống nhau.',
          english: 'The twins have similar faces.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '〜らしい',
      vietnamese: 'có vẻ ~, nghe nói ~',
      english: 'seems ~, I heard ~',
      type: 'additional',
      explanation: 'Diễn tả suy đoán dựa trên thông tin gián tiếp hoặc bằng chứng không chắc chắn.',
      examples: [
        {
          japanese: '明日は雨らしいです。',
          vietnamese: 'Có vẻ ngày mai sẽ mưa.',
          english: 'It seems it will rain tomorrow.',
          type: 'main'
        },
        {
          japanese: '彼は学生らしいです。',
          vietnamese: 'Có vẻ anh ấy là học sinh.',
          english: 'He seems to be a student.',
          type: 'main'
        },
        {
          japanese: 'この店は美味しいらしいです。',
          vietnamese: 'Nghe nói quán này ngon.',
          english: 'I heard this restaurant is delicious.',
          type: 'additional'
        }
      ]
    }
  ]
};

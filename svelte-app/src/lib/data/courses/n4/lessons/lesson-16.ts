/**
 * N4 Core Lessons — Lesson 16: 条件表現 (Negative Conditionals & Assumptions)
 * Focus: ~なければ、~ないと、conditional expressions
 */

import type { LessonData } from '$lib/types';

export const LESSON_16_DATA: LessonData = {
  lessonNumber: 16,
  title: '条件表現 (Biểu thức điều kiện)',
  vocabulary: [
    // Main Vocabulary - Verbs
    {
      japanese: '急ぐ',
      kana: 'いそぐ',
      vietnamese: 'vội vã, gấp rút',
      english: 'to hurry',
      type: 'main',
      example: '急がないと遅れますよ。'
    },
    {
      japanese: '間に合う',
      kana: 'まにあう',
      vietnamese: 'kịp giờ',
      english: 'to be in time',
      type: 'main',
      example: '急げば間に合います。'
    },
    {
      japanese: '遅れる',
      kana: 'おくれる',
      vietnamese: 'trễ, muộn',
      english: 'to be late',
      type: 'main',
      example: '電車が遅れています。'
    },
    {
      japanese: '準備する',
      kana: 'じゅんびする',
      vietnamese: 'chuẩn bị',
      english: 'to prepare',
      type: 'main',
      example: '旅行の準備をしなければなりません。'
    },
    {
      japanese: '確認する',
      kana: 'かくにんする',
      vietnamese: 'xác nhận, kiểm tra',
      english: 'to confirm, to check',
      type: 'main',
      example: '予約を確認してください。'
    },
    {
      japanese: '予約する',
      kana: 'よやくする',
      vietnamese: 'đặt trước',
      english: 'to reserve, to book',
      type: 'main',
      example: 'レストランを予約しました。'
    },
    {
      japanese: '申し込む',
      kana: 'もうしこむ',
      vietnamese: 'đăng ký, nộp đơn',
      english: 'to apply',
      type: 'main',
      example: '大学に申し込みます。'
    },
    {
      japanese: '提出する',
      kana: 'ていしゅつする',
      vietnamese: 'nộp, gửi',
      english: 'to submit',
      type: 'main',
      example: 'レポートを提出しなければなりません。'
    },
    {
      japanese: '合格する',
      kana: 'ごうかくする',
      vietnamese: 'đỗ, đậu',
      english: 'to pass (exam)',
      type: 'main',
      example: '試験に合格しました。'
    },
    {
      japanese: '失敗する',
      kana: 'しっぱいする',
      vietnamese: 'thất bại',
      english: 'to fail',
      type: 'main',
      example: '失敗したら、もう一度やります。'
    },

    // Main Vocabulary - Nouns
    {
      japanese: '条件',
      kana: 'じょうけん',
      vietnamese: 'điều kiện',
      english: 'condition',
      type: 'main',
      example: 'この条件なら大丈夫です。'
    },
    {
      japanese: '場合',
      kana: 'ばあい',
      vietnamese: 'trường hợp',
      english: 'case, situation',
      type: 'main',
      example: '雨の場合は中止します。'
    },
    {
      japanese: '約束',
      kana: 'やくそく',
      vietnamese: 'lời hứa',
      english: 'promise',
      type: 'main',
      example: '約束を守らなければなりません。'
    },
    {
      japanese: '期限',
      kana: 'きげん',
      vietnamese: 'hạn chót',
      english: 'deadline',
      type: 'main',
      example: '期限までに提出してください。'
    },
    {
      japanese: '締め切り',
      kana: 'しめきり',
      vietnamese: 'hạn cuối',
      english: 'deadline',
      type: 'main',
      example: '締め切りは明日です。'
    },
    {
      japanese: '規則',
      kana: 'きそく',
      vietnamese: 'quy tắc',
      english: 'rule',
      type: 'main',
      example: '規則を守らなければなりません。'
    },
    {
      japanese: '許可',
      kana: 'きょか',
      vietnamese: 'sự cho phép',
      english: 'permission',
      type: 'main',
      example: '許可がなければ入れません。'
    },
    {
      japanese: '必要',
      kana: 'ひつよう',
      vietnamese: 'cần thiết',
      english: 'necessary',
      type: 'main',
      example: 'パスポートが必要です。'
    },
    {
      japanese: '義務',
      kana: 'ぎむ',
      vietnamese: 'nghĩa vụ',
      english: 'duty, obligation',
      type: 'main',
      example: '学生の義務です。'
    },
    {
      japanese: '責任',
      kana: 'せきにん',
      vietnamese: 'trách nhiệm',
      english: 'responsibility',
      type: 'main',
      example: '責任を取らなければなりません。'
    },

    // Additional Vocabulary - Verbs
    {
      japanese: '片付ける',
      kana: 'かたづける',
      vietnamese: 'dọn dẹp',
      english: 'to tidy up',
      type: 'additional',
      example: '部屋を片付けなければなりません。'
    },
    {
      japanese: '注意する',
      kana: 'ちゅういする',
      vietnamese: 'chú ý, cẩn thận',
      english: 'to be careful, to warn',
      type: 'additional',
      example: '車に注意してください。'
    },
    {
      japanese: '守る',
      kana: 'まもる',
      vietnamese: 'bảo vệ, giữ',
      english: 'to protect, to keep',
      type: 'additional',
      example: '約束を守ります。'
    },
    {
      japanese: '破る',
      kana: 'やぶる',
      vietnamese: 'phá vỡ, vi phạm',
      english: 'to break, to violate',
      type: 'additional',
      example: '規則を破ってはいけません。'
    },
    {
      japanese: '従う',
      kana: 'したがう',
      vietnamese: 'tuân theo',
      english: 'to follow, to obey',
      type: 'additional',
      example: '指示に従ってください。'
    },
    {
      japanese: '怠ける',
      kana: 'なまける',
      vietnamese: 'lười biếng',
      english: 'to be lazy, to neglect',
      type: 'additional',
      example: '勉強を怠けてはいけません。'
    },
    {
      japanese: '努力する',
      kana: 'どりょくする',
      vietnamese: 'nỗ lực',
      english: 'to make an effort',
      type: 'additional',
      example: 'もっと努力しなければなりません。'
    },
    {
      japanese: '我慢する',
      kana: 'がまんする',
      vietnamese: 'chịu đựng, kiên nhẫn',
      english: 'to endure, to be patient',
      type: 'additional',
      example: '少し我慢してください。'
    },
    {
      japanese: '諦める',
      kana: 'あきらめる',
      vietnamese: 'từ bỏ',
      english: 'to give up',
      type: 'additional',
      example: '諦めてはいけません。'
    },
    {
      japanese: '続ける',
      kana: 'つづける',
      vietnamese: 'tiếp tục',
      english: 'to continue',
      type: 'additional',
      example: '勉強を続けなければなりません。'
    },

    // Additional Vocabulary - Nouns
    {
      japanese: '義理',
      kana: 'ぎり',
      vietnamese: 'nghĩa vụ xã hội',
      english: 'social obligation',
      type: 'additional',
      example: '義理で行かなければなりません。'
    },
    {
      japanese: '都合',
      kana: 'つごう',
      vietnamese: 'sự thuận tiện',
      english: 'convenience, circumstances',
      type: 'additional',
      example: '都合が悪ければ、来なくてもいいです。'
    },
    {
      japanese: '理由',
      kana: 'りゆう',
      vietnamese: 'lý do',
      english: 'reason',
      type: 'additional',
      example: '理由を説明しなければなりません。'
    },
    {
      japanese: '原因',
      kana: 'げんいん',
      vietnamese: 'nguyên nhân',
      english: 'cause',
      type: 'additional',
      example: '原因を調べます。'
    },
    {
      japanese: '結果',
      kana: 'けっか',
      vietnamese: 'kết quả',
      english: 'result',
      type: 'additional',
      example: '結果を待っています。'
    },
    {
      japanese: '影響',
      kana: 'えいきょう',
      vietnamese: 'ảnh hưởng',
      english: 'influence',
      type: 'additional',
      example: '天気の影響で遅れました。'
    },
    {
      japanese: '問題',
      kana: 'もんだい',
      vietnamese: 'vấn đề',
      english: 'problem',
      type: 'additional',
      example: '問題がなければ、始めます。'
    },
    {
      japanese: '解決',
      kana: 'かいけつ',
      vietnamese: 'giải quyết',
      english: 'solution',
      type: 'additional',
      example: '問題を解決しなければなりません。'
    },
    {
      japanese: '対策',
      kana: 'たいさく',
      vietnamese: 'biện pháp',
      english: 'countermeasure',
      type: 'additional',
      example: '対策を考えます。'
    },
    {
      japanese: '方法',
      kana: 'ほうほう',
      vietnamese: 'phương pháp',
      english: 'method',
      type: 'additional',
      example: 'いい方法があります。'
    },

    // Supplementary Vocabulary - Adjectives & Adverbs
    {
      japanese: '必ず',
      kana: 'かならず',
      vietnamese: 'nhất định',
      english: 'certainly, without fail',
      type: 'supplementary',
      example: '必ず来てください。'
    },
    {
      japanese: 'きっと',
      kana: 'きっと',
      vietnamese: 'chắc chắn',
      english: 'surely',
      type: 'supplementary',
      example: 'きっと合格します。'
    },
    {
      japanese: 'もし',
      kana: 'もし',
      vietnamese: 'nếu',
      english: 'if',
      type: 'supplementary',
      example: 'もし雨なら、中止します。'
    },
    {
      japanese: '万一',
      kana: 'まんいち',
      vietnamese: 'vạn nhất',
      english: 'if by any chance',
      type: 'supplementary',
      example: '万一の場合は連絡してください。'
    },
    {
      japanese: 'とにかく',
      kana: 'とにかく',
      vietnamese: 'dù sao chăng nữa',
      english: 'anyway, anyhow',
      type: 'supplementary',
      example: 'とにかく頑張ります。'
    },
    {
      japanese: 'どうしても',
      kana: 'どうしても',
      vietnamese: 'dù thế nào',
      english: 'no matter what',
      type: 'supplementary',
      example: 'どうしても行かなければなりません。'
    },
    {
      japanese: 'ぜひ',
      kana: 'ぜひ',
      vietnamese: 'nhất định (mời mọc)',
      english: 'by all means',
      type: 'supplementary',
      example: 'ぜひ来てください。'
    },
    {
      japanese: 'できるだけ',
      kana: 'できるだけ',
      vietnamese: 'càng... càng tốt',
      english: 'as much as possible',
      type: 'supplementary',
      example: 'できるだけ早く来てください。'
    },
    {
      japanese: 'なるべく',
      kana: 'なるべく',
      vietnamese: 'càng... càng tốt',
      english: 'as much as possible',
      type: 'supplementary',
      example: 'なるべく安いものを買います。'
    },
    {
      japanese: '絶対に',
      kana: 'ぜったいに',
      vietnamese: 'tuyệt đối',
      english: 'absolutely',
      type: 'supplementary',
      example: '絶対に遅れません。'
    },

    // Supplementary Vocabulary - Time Expressions
    {
      japanese: '以前',
      kana: 'いぜん',
      vietnamese: 'trước đây',
      english: 'before, ago',
      type: 'supplementary',
      example: '以前は学生でした。'
    },
    {
      japanese: '以後',
      kana: 'いご',
      vietnamese: 'sau đó',
      english: 'after, since',
      type: 'supplementary',
      example: 'その日以後、会っていません。'
    },
    {
      japanese: '直前',
      kana: 'ちょくぜん',
      vietnamese: 'ngay trước',
      english: 'just before',
      type: 'supplementary',
      example: '出発直前に電話がありました。'
    },
    {
      japanese: '直後',
      kana: 'ちょくご',
      vietnamese: 'ngay sau',
      english: 'right after',
      type: 'supplementary',
      example: '食事の直後に寝ました。'
    },
    {
      japanese: '途中',
      kana: 'とちゅう',
      vietnamese: 'giữa chừng',
      english: 'on the way, midway',
      type: 'supplementary',
      example: '途中で止めてはいけません。'
    },
    {
      japanese: '最中',
      kana: 'さいちゅう',
      vietnamese: 'đang lúc',
      english: 'in the middle of',
      type: 'supplementary',
      example: '仕事の最中です。'
    },
    {
      japanese: '当日',
      kana: 'とうじつ',
      vietnamese: 'ngày hôm đó',
      english: 'that day, the day',
      type: 'supplementary',
      example: '当日は9時に集合です。'
    },
    {
      japanese: '前日',
      kana: 'ぜんじつ',
      vietnamese: 'ngày hôm trước',
      english: 'previous day',
      type: 'supplementary',
      example: '前日に準備しました。'
    },
    {
      japanese: '翌日',
      kana: 'よくじつ',
      vietnamese: 'ngày hôm sau',
      english: 'next day',
      type: 'supplementary',
      example: '翌日、返事が来ました。'
    },
    {
      japanese: '当時',
      kana: 'とうじ',
      vietnamese: 'thời đó',
      english: 'at that time',
      type: 'supplementary',
      example: '当時は若かったです。'
    }
  ],
  grammar: [
    {
      pattern: '～なければならない',
      vietnamese: 'phải ~, cần phải ~',
      english: 'must, have to',
      type: 'main',
      explanation: 'Diễn tả nghĩa vụ hoặc sự cần thiết. Được tạo bằng cách thêm "なければならない" vào thể phủ định của động từ (thể ない bỏ い). Dạng lịch sự: なければなりません. Dạng rút gọn thông dụng: なきゃ、なくちゃ。',
      examples: [
        {
          japanese: '明日までにレポートを提出しなければなりません。',
          vietnamese: 'Phải nộp báo cáo trước ngày mai.',
          english: 'I must submit the report by tomorrow.',
          type: 'main'
        },
        {
          japanese: '毎日薬を飲まなければなりません。',
          vietnamese: 'Phải uống thuốc mỗi ngày.',
          english: 'I have to take medicine every day.',
          type: 'main'
        },
        {
          japanese: '規則を守らなければなりません。',
          vietnamese: 'Phải tuân thủ quy tắc.',
          english: 'We must follow the rules.',
          type: 'main'
        },
        {
          japanese: 'パスポートを持って行かなければなりません。',
          vietnamese: 'Phải mang theo hộ chiếu.',
          english: 'I have to bring my passport.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～なくてもいい',
      vietnamese: 'không cần ~, không phải ~',
      english: 'don\'t have to, need not',
      type: 'main',
      explanation: 'Diễn tả việc không cần thiết phải làm. Được tạo từ thể ない của động từ (bỏ い) + てもいい. Đây là dạng phủ định của なければならない.',
      examples: [
        {
          japanese: '明日は来なくてもいいです。',
          vietnamese: 'Ngày mai không cần đến.',
          english: 'You don\'t have to come tomorrow.',
          type: 'main'
        },
        {
          japanese: '全部食べなくてもいいですよ。',
          vietnamese: 'Không cần ăn hết đâu.',
          english: 'You don\'t have to eat everything.',
          type: 'main'
        },
        {
          japanese: '急がなくてもいいです。',
          vietnamese: 'Không cần vội.',
          english: 'You don\'t have to hurry.',
          type: 'main'
        },
        {
          japanese: '今すぐ決めなくてもいいです。',
          vietnamese: 'Không cần quyết định ngay bây giờ.',
          english: 'You don\'t have to decide right now.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～ないと',
      vietnamese: 'nếu không ~ thì (không được)',
      english: 'if not, must (casual)',
      type: 'main',
      explanation: 'Dạng rút gọn của ～ないといけない hoặc ～ないとだめだ. Thường dùng trong văn nói để diễn tả nghĩa vụ. Mang ý "nếu không làm thì không ổn".',
      examples: [
        {
          japanese: 'もう行かないと。',
          vietnamese: 'Phải đi rồi. (Không đi là không được)',
          english: 'I have to go now.',
          type: 'main'
        },
        {
          japanese: '急がないと間に合わないよ。',
          vietnamese: 'Không vội sẽ không kịp đâu.',
          english: 'We won\'t make it if we don\'t hurry.',
          type: 'main'
        },
        {
          japanese: '勉強しないと、試験に落ちますよ。',
          vietnamese: 'Không học thì sẽ trượt kỳ thi đấy.',
          english: 'You\'ll fail the exam if you don\'t study.',
          type: 'main'
        },
        {
          japanese: '早く寝ないとだめだよ。',
          vietnamese: 'Phải ngủ sớm đi.',
          english: 'You need to go to bed early.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～ば',
      vietnamese: 'nếu ~',
      english: 'if (conditional)',
      type: 'main',
      explanation: 'Diễn tả điều kiện "nếu ~". Động từ: thay đổi u-dan thành e-dan + ば (書く→書けば). い-adjective: bỏ い + ければ (高い→高ければ). な-adjective/Noun: であれば/なら.',
      examples: [
        {
          japanese: '天気がよければ、ピクニックに行きます。',
          vietnamese: 'Nếu thời tiết tốt thì sẽ đi dã ngoại.',
          english: 'If the weather is good, we\'ll go on a picnic.',
          type: 'main'
        },
        {
          japanese: '分からなければ、聞いてください。',
          vietnamese: 'Nếu không hiểu thì hãy hỏi.',
          english: 'If you don\'t understand, please ask.',
          type: 'main'
        },
        {
          japanese: '安ければ買います。',
          vietnamese: 'Nếu rẻ thì tôi sẽ mua.',
          english: 'I\'ll buy it if it\'s cheap.',
          type: 'main'
        },
        {
          japanese: '時間があれば、手伝います。',
          vietnamese: 'Nếu có thời gian thì tôi sẽ giúp.',
          english: 'If I have time, I\'ll help.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～なければ',
      vietnamese: 'nếu không ~',
      english: 'if not, unless',
      type: 'main',
      explanation: 'Dạng điều kiện phủ định. Được tạo từ thể ない của động từ (bỏ い) + ければ. Diễn tả "nếu không ~ thì".',
      examples: [
        {
          japanese: '雨が降らなければ、出かけます。',
          vietnamese: 'Nếu không mưa thì sẽ ra ngoài.',
          english: 'If it doesn\'t rain, I\'ll go out.',
          type: 'main'
        },
        {
          japanese: '許可がなければ入れません。',
          vietnamese: 'Nếu không có phép thì không được vào.',
          english: 'You can\'t enter without permission.',
          type: 'main'
        },
        {
          japanese: '努力しなければ成功しません。',
          vietnamese: 'Nếu không nỗ lực thì sẽ không thành công.',
          english: 'You won\'t succeed unless you make an effort.',
          type: 'main'
        },
        {
          japanese: 'チケットがなければ見られません。',
          vietnamese: 'Nếu không có vé thì không xem được.',
          english: 'You can\'t watch it without a ticket.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～場合',
      vietnamese: 'trong trường hợp ~',
      english: 'in case of, in the event of',
      type: 'additional',
      explanation: 'Diễn tả trường hợp, tình huống. Thường dùng trong văn viết hoặc văn nói trang trọng. Có thể kết hợp với の、という、は。',
      examples: [
        {
          japanese: '雨の場合は中止します。',
          vietnamese: 'Trong trường hợp trời mưa thì sẽ hủy.',
          english: 'In case of rain, it will be canceled.',
          type: 'main'
        },
        {
          japanese: '病気の場合は休んでください。',
          vietnamese: 'Trong trường hợp bị ốm thì hãy nghỉ.',
          english: 'If you\'re sick, please take a rest.',
          type: 'main'
        },
        {
          japanese: '遅れる場合は連絡してください。',
          vietnamese: 'Trong trường hợp đến muộn thì hãy liên lạc.',
          english: 'Please contact us if you\'re going to be late.',
          type: 'main'
        },
        {
          japanese: '火事の場合は非常口を使ってください。',
          vietnamese: 'Trong trường hợp cháy thì hãy dùng lối thoát hiểm.',
          english: 'In case of fire, use the emergency exit.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～ないといけない',
      vietnamese: 'phải ~, không thể không ~',
      english: 'must, have to',
      type: 'additional',
      explanation: 'Tương tự ～なければならない nhưng thông dụng hơn trong văn nói. Diễn tả nghĩa vụ hoặc sự cần thiết. Dạng rút gọn: ～ないと。',
      examples: [
        {
          japanese: '明日早く起きないといけません。',
          vietnamese: 'Ngày mai phải dậy sớm.',
          english: 'I have to get up early tomorrow.',
          type: 'main'
        },
        {
          japanese: '宿題をしないといけない。',
          vietnamese: 'Phải làm bài tập về nhà.',
          english: 'I have to do my homework.',
          type: 'main'
        },
        {
          japanese: '今日中に終わらせないといけません。',
          vietnamese: 'Phải hoàn thành trong hôm nay.',
          english: 'I have to finish it by today.',
          type: 'main'
        },
        {
          japanese: 'もっと練習しないといけないね。',
          vietnamese: 'Phải luyện tập nhiều hơn nhé.',
          english: 'We have to practice more.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～てはいけない',
      vietnamese: 'không được ~',
      english: 'must not, may not',
      type: 'additional',
      explanation: 'Diễn tả sự cấm đoán. Được tạo từ thể て + はいけない/はだめだ. Thể thân mật: ちゃだめ、じゃだめ。',
      examples: [
        {
          japanese: 'ここで写真を撮ってはいけません。',
          vietnamese: 'Không được chụp ảnh ở đây.',
          english: 'You must not take photos here.',
          type: 'main'
        },
        {
          japanese: '諦めてはいけませんよ。',
          vietnamese: 'Không được bỏ cuộc đâu.',
          english: 'You mustn\'t give up.',
          type: 'main'
        },
        {
          japanese: '遅刻してはいけません。',
          vietnamese: 'Không được đến muộn.',
          english: 'You must not be late.',
          type: 'main'
        },
        {
          japanese: '嘘をついてはいけない。',
          vietnamese: 'Không được nói dối.',
          english: 'You must not lie.',
          type: 'additional'
        }
      ]
    }
  ]
};

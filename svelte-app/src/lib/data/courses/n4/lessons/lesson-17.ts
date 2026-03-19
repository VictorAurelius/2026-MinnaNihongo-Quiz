/**
 * N4 Core Lessons — Lesson 17: 複合動詞 (Compound Verbs & Verb Combinations)
 * Focus: ~始める、~終わる、~続ける、verb combinations
 */

import type { LessonData } from '$lib/types';

export const LESSON_17_DATA: LessonData = {
  lessonNumber: 17,
  title: '複合動詞 (Động từ ghép)',
  vocabulary: [
    // Main Vocabulary - Basic Verbs
    {
      japanese: '始める',
      kana: 'はじめる',
      vietnamese: 'bắt đầu',
      english: 'to begin, to start',
      type: 'main',
      example: '勉強を始めました。'
    },
    {
      japanese: '終わる',
      kana: 'おわる',
      vietnamese: 'kết thúc',
      english: 'to end, to finish',
      type: 'main',
      example: '会議が終わりました。'
    },
    {
      japanese: '続ける',
      kana: 'つづける',
      vietnamese: 'tiếp tục',
      english: 'to continue',
      type: 'main',
      example: '勉強を続けます。'
    },
    {
      japanese: '止める',
      kana: 'やめる',
      vietnamese: 'dừng lại, nghỉ',
      english: 'to stop, to quit',
      type: 'main',
      example: 'タバコを止めました。'
    },
    {
      japanese: '出す',
      kana: 'だす',
      vietnamese: 'đưa ra, bắt đầu',
      english: 'to put out, to start',
      type: 'main',
      example: '走り出しました。'
    },
    {
      japanese: '直す',
      kana: 'なおす',
      vietnamese: 'sửa, làm lại',
      english: 'to fix, to redo',
      type: 'main',
      example: '書き直してください。'
    },
    {
      japanese: '忘れる',
      kana: 'わすれる',
      vietnamese: 'quên',
      english: 'to forget',
      type: 'main',
      example: '財布を忘れました。'
    },
    {
      japanese: '残る',
      kana: 'のこる',
      vietnamese: 'còn lại',
      english: 'to remain, to be left',
      type: 'main',
      example: 'お金が少し残っています。'
    },
    {
      japanese: '過ぎる',
      kana: 'すぎる',
      vietnamese: 'qua, quá mức',
      english: 'to pass, to exceed',
      type: 'main',
      example: '食べ過ぎました。'
    },
    {
      japanese: '足りる',
      kana: 'たりる',
      vietnamese: 'đủ',
      english: 'to be enough',
      type: 'main',
      example: 'お金が足りません。'
    },

    // Main Vocabulary - Compound Verbs
    {
      japanese: '読み始める',
      kana: 'よみはじめる',
      vietnamese: 'bắt đầu đọc',
      english: 'to start reading',
      type: 'main',
      example: '本を読み始めました。'
    },
    {
      japanese: '食べ終わる',
      kana: 'たべおわる',
      vietnamese: 'ăn xong',
      english: 'to finish eating',
      type: 'main',
      example: 'もう食べ終わりましたか。'
    },
    {
      japanese: '話し続ける',
      kana: 'はなしつづける',
      vietnamese: 'tiếp tục nói',
      english: 'to keep talking',
      type: 'main',
      example: '彼は話し続けています。'
    },
    {
      japanese: '走り出す',
      kana: 'はしりだす',
      vietnamese: 'bắt đầu chạy',
      english: 'to start running',
      type: 'main',
      example: '急に走り出しました。'
    },
    {
      japanese: '書き直す',
      kana: 'かきなおす',
      vietnamese: 'viết lại',
      english: 'to rewrite',
      type: 'main',
      example: 'レポートを書き直しました。'
    },
    {
      japanese: '言い忘れる',
      kana: 'いいわすれる',
      vietnamese: 'quên nói',
      english: 'to forget to say',
      type: 'main',
      example: '大事なことを言い忘れました。'
    },
    {
      japanese: '飲み過ぎる',
      kana: 'のみすぎる',
      vietnamese: 'uống quá nhiều',
      english: 'to drink too much',
      type: 'main',
      example: 'お酒を飲み過ぎました。'
    },
    {
      japanese: '買い物する',
      kana: 'かいものする',
      vietnamese: 'mua sắm',
      english: 'to shop',
      type: 'main',
      example: '週末に買い物します。'
    },
    {
      japanese: '散歩する',
      kana: 'さんぽする',
      vietnamese: 'đi dạo',
      english: 'to take a walk',
      type: 'main',
      example: '公園を散歩しました。'
    },
    {
      japanese: '相談する',
      kana: 'そうだんする',
      vietnamese: 'tham khảo ý kiến',
      english: 'to consult',
      type: 'main',
      example: '先生に相談します。'
    },

    // Additional Vocabulary - More Verbs
    {
      japanese: '通う',
      kana: 'かよう',
      vietnamese: 'đi lại thường xuyên',
      english: 'to commute, to attend',
      type: 'additional',
      example: '学校に通っています。'
    },
    {
      japanese: '慣れる',
      kana: 'なれる',
      vietnamese: 'quen',
      english: 'to get used to',
      type: 'additional',
      example: '日本の生活に慣れました。'
    },
    {
      japanese: '変わる',
      kana: 'かわる',
      vietnamese: 'thay đổi',
      english: 'to change',
      type: 'additional',
      example: '町が変わりました。'
    },
    {
      japanese: '増える',
      kana: 'ふえる',
      vietnamese: 'tăng',
      english: 'to increase',
      type: 'additional',
      example: '人口が増えています。'
    },
    {
      japanese: '減る',
      kana: 'へる',
      vietnamese: 'giảm',
      english: 'to decrease',
      type: 'additional',
      example: '体重が減りました。'
    },
    {
      japanese: '進む',
      kana: 'すすむ',
      vietnamese: 'tiến tới',
      english: 'to advance, to progress',
      type: 'additional',
      example: '計画が進んでいます。'
    },
    {
      japanese: '遅れる',
      kana: 'おくれる',
      vietnamese: 'chậm, trễ',
      english: 'to be late, to be delayed',
      type: 'additional',
      example: '電車が遅れています。'
    },
    {
      japanese: '急ぐ',
      kana: 'いそぐ',
      vietnamese: 'vội vã',
      english: 'to hurry',
      type: 'additional',
      example: '急がないと遅れます。'
    },
    {
      japanese: '焦る',
      kana: 'あせる',
      vietnamese: 'vội vàng, lo lắng',
      english: 'to be impatient, to panic',
      type: 'additional',
      example: '焦らないでください。'
    },
    {
      japanese: '疲れる',
      kana: 'つかれる',
      vietnamese: 'mệt',
      english: 'to get tired',
      type: 'additional',
      example: 'とても疲れました。'
    },

    // Additional Vocabulary - Compound Actions
    {
      japanese: '作り直す',
      kana: 'つくりなおす',
      vietnamese: 'làm lại',
      english: 'to remake',
      type: 'additional',
      example: '料理を作り直しました。'
    },
    {
      japanese: '持ち出す',
      kana: 'もちだす',
      vietnamese: 'mang ra',
      english: 'to bring out',
      type: 'additional',
      example: '古い話を持ち出さないでください。'
    },
    {
      japanese: '取り出す',
      kana: 'とりだす',
      vietnamese: 'lấy ra',
      english: 'to take out',
      type: 'additional',
      example: '財布を取り出しました。'
    },
    {
      japanese: '思い出す',
      kana: 'おもいだす',
      vietnamese: 'nhớ ra',
      english: 'to remember, to recall',
      type: 'additional',
      example: '名前を思い出しました。'
    },
    {
      japanese: '聞き返す',
      kana: 'ききかえす',
      vietnamese: 'hỏi lại',
      english: 'to ask again',
      type: 'additional',
      example: 'もう一度聞き返しました。'
    },
    {
      japanese: '見直す',
      kana: 'みなおす',
      vietnamese: 'xem lại',
      english: 'to review, to look over',
      type: 'additional',
      example: 'テストを見直してください。'
    },
    {
      japanese: '乗り換える',
      kana: 'のりかえる',
      vietnamese: 'chuyển (phương tiện)',
      english: 'to transfer, to change',
      type: 'additional',
      example: 'ここで電車を乗り換えます。'
    },
    {
      japanese: '引っ越す',
      kana: 'ひっこす',
      vietnamese: 'chuyển nhà',
      english: 'to move (house)',
      type: 'additional',
      example: '来月引っ越します。'
    },
    {
      japanese: '出かける',
      kana: 'でかける',
      vietnamese: 'ra ngoài',
      english: 'to go out',
      type: 'additional',
      example: '友達と出かけました。'
    },
    {
      japanese: '帰る',
      kana: 'かえる',
      vietnamese: 'về',
      english: 'to return, to go home',
      type: 'additional',
      example: 'もう帰ります。'
    },

    // Supplementary Vocabulary - Nouns Related to Actions
    {
      japanese: '始まり',
      kana: 'はじまり',
      vietnamese: 'sự bắt đầu',
      english: 'beginning',
      type: 'supplementary',
      example: '物語の始まりです。'
    },
    {
      japanese: '終わり',
      kana: 'おわり',
      vietnamese: 'kết thúc',
      english: 'end',
      type: 'supplementary',
      example: '今日の終わりです。'
    },
    {
      japanese: '続き',
      kana: 'つづき',
      vietnamese: 'phần tiếp theo',
      english: 'continuation',
      type: 'supplementary',
      example: '続きは明日話します。'
    },
    {
      japanese: '途中',
      kana: 'とちゅう',
      vietnamese: 'giữa chừng',
      english: 'on the way, midway',
      type: 'supplementary',
      example: '途中で止めました。'
    },
    {
      japanese: '最初',
      kana: 'さいしょ',
      vietnamese: 'đầu tiên',
      english: 'first, beginning',
      type: 'supplementary',
      example: '最初から始めましょう。'
    },
    {
      japanese: '最後',
      kana: 'さいご',
      vietnamese: 'cuối cùng',
      english: 'last, end',
      type: 'supplementary',
      example: '最後まで頑張ります。'
    },
    {
      japanese: '途中',
      kana: 'とちゅう',
      vietnamese: 'dọc đường',
      english: 'on the way',
      type: 'supplementary',
      example: '途中で友達に会いました。'
    },
    {
      japanese: '経験',
      kana: 'けいけん',
      vietnamese: 'kinh nghiệm',
      english: 'experience',
      type: 'supplementary',
      example: 'いい経験になりました。'
    },
    {
      japanese: '習慣',
      kana: 'しゅうかん',
      vietnamese: 'thói quen',
      english: 'habit',
      type: 'supplementary',
      example: '毎日走る習慣があります。'
    },
    {
      japanese: '練習',
      kana: 'れんしゅう',
      vietnamese: 'luyện tập',
      english: 'practice',
      type: 'supplementary',
      example: '毎日練習しています。'
    },

    // Supplementary Vocabulary - Time & Duration
    {
      japanese: '一時',
      kana: 'いちじ',
      vietnamese: 'tạm thời',
      english: 'temporarily',
      type: 'supplementary',
      example: '一時的に止めます。'
    },
    {
      japanese: '永久',
      kana: 'えいきゅう',
      vietnamese: 'vĩnh viễn',
      english: 'permanently',
      type: 'supplementary',
      example: '永久に続きます。'
    },
    {
      japanese: '連続',
      kana: 'れんぞく',
      vietnamese: 'liên tục',
      english: 'continuous',
      type: 'supplementary',
      example: '三日連続で雨です。'
    },
    {
      japanese: '中断',
      kana: 'ちゅうだん',
      vietnamese: 'gián đoạn',
      english: 'interruption',
      type: 'supplementary',
      example: '作業を中断しました。'
    },
    {
      japanese: '再開',
      kana: 'さいかい',
      vietnamese: 'tái khởi động',
      english: 'resumption',
      type: 'supplementary',
      example: '会議を再開します。'
    },
    {
      japanese: '中止',
      kana: 'ちゅうし',
      vietnamese: 'hủy bỏ',
      english: 'cancellation',
      type: 'supplementary',
      example: '中止になりました。'
    },
    {
      japanese: '延期',
      kana: 'えんき',
      vietnamese: 'hoãn lại',
      english: 'postponement',
      type: 'supplementary',
      example: '試験が延期されました。'
    },
    {
      japanese: '進行',
      kana: 'しんこう',
      vietnamese: 'tiến hành',
      english: 'progress, proceeding',
      type: 'supplementary',
      example: '工事が進行中です。'
    },
    {
      japanese: '完了',
      kana: 'かんりょう',
      vietnamese: 'hoàn thành',
      english: 'completion',
      type: 'supplementary',
      example: '作業が完了しました。'
    },
    {
      japanese: '途中',
      kana: 'とちゅう',
      vietnamese: 'đang dở',
      english: 'incomplete, midway',
      type: 'supplementary',
      example: '仕事が途中です。'
    },

    // Supplementary Vocabulary - States & Conditions
    {
      japanese: '状態',
      kana: 'じょうたい',
      vietnamese: 'trạng thái',
      english: 'condition, state',
      type: 'supplementary',
      example: 'いい状態です。'
    },
    {
      japanese: '様子',
      kana: 'ようす',
      vietnamese: 'tình hình',
      english: 'state, appearance',
      type: 'supplementary',
      example: '様子を見ましょう。'
    },
    {
      japanese: '変化',
      kana: 'へんか',
      vietnamese: 'sự thay đổi',
      english: 'change',
      type: 'supplementary',
      example: '大きな変化がありました。'
    },
    {
      japanese: '維持',
      kana: 'いじ',
      vietnamese: 'duy trì',
      english: 'maintenance',
      type: 'supplementary',
      example: '健康を維持します。'
    },
    {
      japanese: '継続',
      kana: 'けいぞく',
      vietnamese: 'tiếp tục',
      english: 'continuation',
      type: 'supplementary',
      example: '継続して勉強します。'
    }
  ],
  grammar: [
    {
      pattern: '～始める',
      vietnamese: 'bắt đầu ~',
      english: 'to start/begin doing',
      type: 'main',
      explanation: 'Nối với thể ます của động từ (bỏ ます) để chỉ hành động bắt đầu. Ví dụ: 食べる→食べ始める (bắt đầu ăn). Nhấn mạnh thời điểm khởi đầu của hành động.',
      examples: [
        {
          japanese: '本を読み始めました。',
          vietnamese: 'Tôi đã bắt đầu đọc sách.',
          english: 'I started reading a book.',
          type: 'main'
        },
        {
          japanese: '雨が降り始めました。',
          vietnamese: 'Trời bắt đầu mưa.',
          english: 'It started to rain.',
          type: 'main'
        },
        {
          japanese: '日本語を勉強し始めたのは去年です。',
          vietnamese: 'Tôi bắt đầu học tiếng Nhật từ năm ngoái.',
          english: 'I started studying Japanese last year.',
          type: 'main'
        },
        {
          japanese: '赤ちゃんが泣き始めました。',
          vietnamese: 'Em bé bắt đầu khóc.',
          english: 'The baby started crying.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～終わる',
      vietnamese: 'làm xong ~, hoàn thành ~',
      english: 'to finish doing',
      type: 'main',
      explanation: 'Nối với thể ます của động từ (bỏ ます) để chỉ hành động hoàn tất. Ví dụ: 食べる→食べ終わる (ăn xong). Nhấn mạnh sự hoàn thành của hành động.',
      examples: [
        {
          japanese: '宿題をやり終わりました。',
          vietnamese: 'Tôi đã làm xong bài tập về nhà.',
          english: 'I finished doing my homework.',
          type: 'main'
        },
        {
          japanese: 'もう食べ終わりましたか。',
          vietnamese: 'Bạn ăn xong rồi à?',
          english: 'Have you finished eating?',
          type: 'main'
        },
        {
          japanese: 'レポートを書き終わったら、提出してください。',
          vietnamese: 'Sau khi viết xong báo cáo, hãy nộp.',
          english: 'Please submit it after you finish writing the report.',
          type: 'main'
        },
        {
          japanese: '映画が終わり終わったら、電話します。',
          vietnamese: 'Sau khi phim chiếu xong, tôi sẽ gọi điện.',
          english: 'I\'ll call after the movie ends.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～続ける',
      vietnamese: 'tiếp tục ~',
      english: 'to continue doing',
      type: 'main',
      explanation: 'Nối với thể ます của động từ (bỏ ます) để chỉ hành động tiếp diễn liên tục. Ví dụ: 話す→話し続ける (tiếp tục nói). Nhấn mạnh tính liên tục của hành động.',
      examples: [
        {
          japanese: '彼は三時間も話し続けました。',
          vietnamese: 'Anh ấy đã nói liên tục 3 tiếng đồng hồ.',
          english: 'He kept talking for three hours.',
          type: 'main'
        },
        {
          japanese: '雨が降り続いています。',
          vietnamese: 'Trời mưa liên tục.',
          english: 'It continues to rain.',
          type: 'main'
        },
        {
          japanese: '毎日走り続けています。',
          vietnamese: 'Tôi tiếp tục chạy mỗi ngày.',
          english: 'I continue to run every day.',
          type: 'main'
        },
        {
          japanese: '努力し続ければ、きっと成功します。',
          vietnamese: 'Nếu tiếp tục nỗ lực, chắc chắn sẽ thành công.',
          english: 'If you keep trying, you will surely succeed.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～出す',
      vietnamese: 'bắt đầu ~ (đột ngột)',
      english: 'to start doing suddenly',
      type: 'main',
      explanation: 'Nối với thể ます của động từ (bỏ ます) để chỉ hành động bắt đầu đột ngột hoặc bắt đầu làm điều gì đó. Ví dụ: 走る→走り出す (bắt đầu chạy). Thường mang ý nghĩa đột ngột, tự nhiên.',
      examples: [
        {
          japanese: '急に雨が降り出しました。',
          vietnamese: 'Trời đột nhiên bắt đầu mưa.',
          english: 'It suddenly started raining.',
          type: 'main'
        },
        {
          japanese: '赤ちゃんが泣き出しました。',
          vietnamese: 'Em bé bắt đầu khóc.',
          english: 'The baby started crying.',
          type: 'main'
        },
        {
          japanese: '犬が走り出しました。',
          vietnamese: 'Con chó bắt đầu chạy.',
          english: 'The dog started running.',
          type: 'main'
        },
        {
          japanese: '彼女は笑い出しました。',
          vietnamese: 'Cô ấy bật cười.',
          english: 'She burst out laughing.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～直す',
      vietnamese: 'làm lại ~, sửa lại ~',
      english: 'to redo, to do again',
      type: 'main',
      explanation: 'Nối với thể ます của động từ (bỏ ます) để chỉ việc làm lại hoặc sửa chữa. Ví dụ: 書く→書き直す (viết lại). Mang ý nghĩa sửa chữa hoặc cải thiện.',
      examples: [
        {
          japanese: 'レポートを書き直しました。',
          vietnamese: 'Tôi đã viết lại báo cáo.',
          english: 'I rewrote the report.',
          type: 'main'
        },
        {
          japanese: '間違えたので、やり直してください。',
          vietnamese: 'Vì sai rồi nên hãy làm lại.',
          english: 'Please do it again because it\'s wrong.',
          type: 'main'
        },
        {
          japanese: '服を着直しました。',
          vietnamese: 'Tôi đã mặc lại quần áo.',
          english: 'I put my clothes on again.',
          type: 'main'
        },
        {
          japanese: '考え直してみます。',
          vietnamese: 'Tôi sẽ thử suy nghĩ lại.',
          english: 'I\'ll think about it again.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～過ぎる',
      vietnamese: '~ quá mức',
      english: 'too much, excessively',
      type: 'main',
      explanation: 'Nối với thể ます của động từ (bỏ ます) hoặc với tính từ (い-adj bỏ い, な-adj giữ nguyên) để chỉ mức độ quá mức. Ví dụ: 食べる→食べ過ぎる (ăn quá nhiều), 高い→高過ぎる (quá cao).',
      examples: [
        {
          japanese: '昨日飲み過ぎました。',
          vietnamese: 'Hôm qua tôi đã uống quá nhiều.',
          english: 'I drank too much yesterday.',
          type: 'main'
        },
        {
          japanese: 'このケーキは甘過ぎます。',
          vietnamese: 'Chiếc bánh này quá ngọt.',
          english: 'This cake is too sweet.',
          type: 'main'
        },
        {
          japanese: '働き過ぎないでください。',
          vietnamese: 'Đừng làm việc quá sức.',
          english: 'Don\'t work too hard.',
          type: 'main'
        },
        {
          japanese: '心配し過ぎですよ。',
          vietnamese: 'Bạn lo lắng quá đấy.',
          english: 'You worry too much.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～忘れる',
      vietnamese: 'quên ~',
      english: 'to forget to do',
      type: 'additional',
      explanation: 'Nối với thể ます của động từ (bỏ ます) để chỉ việc quên làm điều gì đó. Ví dụ: 持つ→持ち忘れる (quên mang theo). Diễn tả hành động bị bỏ sót.',
      examples: [
        {
          japanese: '傘を持ち忘れました。',
          vietnamese: 'Tôi đã quên mang ô.',
          english: 'I forgot to bring my umbrella.',
          type: 'main'
        },
        {
          japanese: '大切なことを言い忘れました。',
          vietnamese: 'Tôi đã quên nói điều quan trọng.',
          english: 'I forgot to say something important.',
          type: 'main'
        },
        {
          japanese: '買い忘れた物がありますか。',
          vietnamese: 'Có thứ gì bạn quên mua không?',
          english: 'Is there anything you forgot to buy?',
          type: 'main'
        },
        {
          japanese: '鍵を閉め忘れました。',
          vietnamese: 'Tôi đã quên khóa cửa.',
          english: 'I forgot to lock the door.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～やすい／～にくい',
      vietnamese: 'dễ ~/khó ~',
      english: 'easy to do / hard to do',
      type: 'additional',
      explanation: 'Nối với thể ます của động từ (bỏ ます). やすい chỉ sự dễ dàng, にくい chỉ sự khó khăn. Ví dụ: 読む→読みやすい (dễ đọc), 読みにくい (khó đọc).',
      examples: [
        {
          japanese: 'この本は読みやすいです。',
          vietnamese: 'Cuốn sách này dễ đọc.',
          english: 'This book is easy to read.',
          type: 'main'
        },
        {
          japanese: '字が小さくて読みにくいです。',
          vietnamese: 'Chữ nhỏ nên khó đọc.',
          english: 'The letters are small and hard to read.',
          type: 'main'
        },
        {
          japanese: 'この靴は歩きやすいです。',
          vietnamese: 'Đôi giày này dễ đi.',
          english: 'These shoes are easy to walk in.',
          type: 'main'
        },
        {
          japanese: '彼の話は分かりにくいです。',
          vietnamese: 'Câu chuyện của anh ấy khó hiểu.',
          english: 'His story is hard to understand.',
          type: 'additional'
        }
      ]
    }
  ]
};

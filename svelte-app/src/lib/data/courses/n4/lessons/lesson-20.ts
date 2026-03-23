/**
 * N4 Core Lessons — Lesson 20: 伝聞と引用 (Reported Speech & Quotations)
 * Focus: ~と言う、~そうだ、~らしい、quotation and hearsay expressions
 */

import type { LessonData } from '$lib/types';

export const LESSON_20_DATA: LessonData = {
  lessonNumber: 20,
  title: '伝聞と引用 (Truyền đạt và Trích dẫn)',
  vocabulary: [
    // Main Vocabulary - Communication Verbs
    {
      japanese: '言う',
      kana: 'いう',
      vietnamese: 'nói',
      english: 'to say',
      type: 'main',
      example: '彼は明日来ると言いました。'
    },
    {
      japanese: '話す',
      kana: 'はなす',
      vietnamese: 'nói chuyện',
      english: 'to speak, to talk',
      type: 'main',
      example: '先生が話していました。'
    },
    {
      japanese: '伝える',
      kana: 'つたえる',
      vietnamese: 'truyền đạt',
      english: 'to convey, to tell',
      type: 'main',
      example: 'メッセージを伝えました。'
    },
    {
      japanese: '聞く',
      kana: 'きく',
      vietnamese: 'nghe',
      english: 'to hear, to ask',
      type: 'main',
      example: '噂を聞きました。'
    },
    {
      japanese: '尋ねる',
      kana: 'たずねる',
      vietnamese: 'hỏi',
      english: 'to ask, to inquire',
      type: 'main',
      example: '道を尋ねました。'
    },
    {
      japanese: '答える',
      kana: 'こたえる',
      vietnamese: 'trả lời',
      english: 'to answer',
      type: 'main',
      example: '質問に答えました。'
    },
    {
      japanese: '教える',
      kana: 'おしえる',
      vietnamese: 'dạy, cho biết',
      english: 'to teach, to tell',
      type: 'main',
      example: '住所を教えてください。'
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
      japanese: '報告する',
      kana: 'ほうこくする',
      vietnamese: 'báo cáo',
      english: 'to report',
      type: 'main',
      example: '上司に報告しました。'
    },
    {
      japanese: '連絡する',
      kana: 'れんらくする',
      vietnamese: 'liên lạc',
      english: 'to contact',
      type: 'main',
      example: '後で連絡します。'
    },

    // Main Vocabulary - Information & News
    {
      japanese: '情報',
      kana: 'じょうほう',
      vietnamese: 'thông tin',
      english: 'information',
      type: 'main',
      example: '新しい情報があります。'
    },
    {
      japanese: 'ニュース',
      kana: 'ニュース',
      vietnamese: 'tin tức',
      english: 'news',
      type: 'main',
      example: 'ニュースで聞きました。'
    },
    {
      japanese: '噂',
      kana: 'うわさ',
      vietnamese: 'tin đồn',
      english: 'rumor',
      type: 'main',
      example: '変な噂を聞きました。'
    },
    {
      japanese: '知らせ',
      kana: 'しらせ',
      vietnamese: 'tin tức, thông báo',
      english: 'news, notice',
      type: 'main',
      example: 'いい知らせがあります。'
    },
    {
      japanese: '通知',
      kana: 'つうち',
      vietnamese: 'thông báo',
      english: 'notification',
      type: 'main',
      example: '通知が届きました。'
    },
    {
      japanese: 'お知らせ',
      kana: 'おしらせ',
      vietnamese: 'thông báo',
      english: 'announcement',
      type: 'main',
      example: '大切なお知らせがあります。'
    },
    {
      japanese: '伝言',
      kana: 'でんごん',
      vietnamese: 'lời nhắn',
      english: 'message',
      type: 'main',
      example: '伝言をお願いします。'
    },
    {
      japanese: 'メッセージ',
      kana: 'メッセージ',
      vietnamese: 'tin nhắn',
      english: 'message',
      type: 'main',
      example: 'メッセージを送りました。'
    },
    {
      japanese: '連絡',
      kana: 'れんらく',
      vietnamese: 'liên lạc',
      english: 'contact, communication',
      type: 'main',
      example: '連絡を待っています。'
    },
    {
      japanese: '返事',
      kana: 'へんじ',
      vietnamese: 'trả lời',
      english: 'reply, answer',
      type: 'main',
      example: '返事をください。'
    },

    // Main Vocabulary - Expressions & Statements
    {
      japanese: '意見',
      kana: 'いけん',
      vietnamese: 'ý kiến',
      english: 'opinion',
      type: 'main',
      example: 'あなたの意見を聞かせてください。'
    },
    {
      japanese: '感想',
      kana: 'かんそう',
      vietnamese: 'cảm nhận',
      english: 'impression, feeling',
      type: 'main',
      example: '映画の感想を聞きました。'
    },
    {
      japanese: '考え',
      kana: 'かんがえ',
      vietnamese: 'suy nghĩ',
      english: 'thought, idea',
      type: 'main',
      example: 'あなたの考えは何ですか。'
    },
    {
      japanese: '評判',
      kana: 'ひょうばん',
      vietnamese: 'đánh giá',
      english: 'reputation, review',
      type: 'main',
      example: 'このレストランは評判がいいです。'
    },
    {
      japanese: '印象',
      kana: 'いんしょう',
      vietnamese: 'ấn tượng',
      english: 'impression',
      type: 'main',
      example: '第一印象はとても大切です。'
    },
    {
      japanese: '様子',
      kana: 'ようす',
      vietnamese: 'tình hình, vẻ',
      english: 'appearance, state',
      type: 'main',
      example: '様子がおかしいです。'
    },
    {
      japanese: '雰囲気',
      kana: 'ふんいき',
      vietnamese: 'không khí',
      english: 'atmosphere',
      type: 'main',
      example: 'いい雰囲気です。'
    },
    {
      japanese: '態度',
      kana: 'たいど',
      vietnamese: 'thái độ',
      english: 'attitude',
      type: 'main',
      example: '彼の態度が変わりました。'
    },
    {
      japanese: '表情',
      kana: 'ひょうじょう',
      vietnamese: 'biểu cảm',
      english: 'expression, look',
      type: 'main',
      example: '悲しい表情をしています。'
    },
    {
      japanese: '気持ち',
      kana: 'きもち',
      vietnamese: 'tâm trạng',
      english: 'feeling, mood',
      type: 'main',
      example: 'あなたの気持ちが分かります。'
    },

    // Additional Vocabulary - More Communication
    {
      japanese: '説明する',
      kana: 'せつめいする',
      vietnamese: 'giải thích',
      english: 'to explain',
      type: 'additional',
      example: 'もう一度説明してください。'
    },
    {
      japanese: '紹介する',
      kana: 'しょうかいする',
      vietnamese: 'giới thiệu',
      english: 'to introduce',
      type: 'additional',
      example: '友達を紹介します。'
    },
    {
      japanese: '述べる',
      kana: 'のべる',
      vietnamese: 'trình bày',
      english: 'to state, to mention',
      type: 'additional',
      example: '意見を述べました。'
    },
    {
      japanese: '主張する',
      kana: 'しゅちょうする',
      vietnamese: 'khẳng định',
      english: 'to assert, to insist',
      type: 'additional',
      example: '自分の意見を主張します。'
    },
    {
      japanese: '提案する',
      kana: 'ていあんする',
      vietnamese: 'đề xuất',
      english: 'to propose',
      type: 'additional',
      example: '新しい計画を提案しました。'
    },
    {
      japanese: '助言する',
      kana: 'じょげんする',
      vietnamese: 'khuyên bảo',
      english: 'to advise',
      type: 'additional',
      example: '先生に助言をもらいました。'
    },
    {
      japanese: '忠告する',
      kana: 'ちゅうこくする',
      vietnamese: 'cảnh cáo',
      english: 'to warn, to advise',
      type: 'additional',
      example: '友達に忠告しました。'
    },
    {
      japanese: '確認する',
      kana: 'かくにんする',
      vietnamese: 'xác nhận',
      english: 'to confirm',
      type: 'additional',
      example: '予約を確認しました。'
    },
    {
      japanese: '否定する',
      kana: 'ひていする',
      vietnamese: 'phủ định',
      english: 'to deny',
      type: 'additional',
      example: '彼はそれを否定しました。'
    },
    {
      japanese: '承認する',
      kana: 'しょうにんする',
      vietnamese: 'chấp nhận',
      english: 'to approve',
      type: 'additional',
      example: '計画が承認されました。'
    },

    // Additional Vocabulary - Sources & Evidence
    {
      japanese: '情報源',
      kana: 'じょうほうげん',
      vietnamese: 'nguồn thông tin',
      english: 'source of information',
      type: 'additional',
      example: '確かな情報源です。'
    },
    {
      japanese: '証拠',
      kana: 'しょうこ',
      vietnamese: 'chứng cứ',
      english: 'evidence, proof',
      type: 'additional',
      example: '証拠がありません。'
    },
    {
      japanese: '根拠',
      kana: 'こんきょ',
      vietnamese: 'căn cứ',
      english: 'basis, grounds',
      type: 'additional',
      example: '根拠のない話です。'
    },
    {
      japanese: '理由',
      kana: 'りゆう',
      vietnamese: 'lý do',
      english: 'reason',
      type: 'additional',
      example: '理由を教えてください。'
    },
    {
      japanese: '原因',
      kana: 'げんいん',
      vietnamese: 'nguyên nhân',
      english: 'cause',
      type: 'additional',
      example: '事故の原因を調べています。'
    },
    {
      japanese: '結果',
      kana: 'けっか',
      vietnamese: 'kết quả',
      english: 'result',
      type: 'additional',
      example: '試験の結果が出ました。'
    },
    {
      japanese: '事実',
      kana: 'じじつ',
      vietnamese: 'sự thật',
      english: 'fact',
      type: 'additional',
      example: 'これは事実です。'
    },
    {
      japanese: '真実',
      kana: 'しんじつ',
      vietnamese: 'sự thật',
      english: 'truth',
      type: 'additional',
      example: '真実を知りたいです。'
    },
    {
      japanese: '嘘',
      kana: 'うそ',
      vietnamese: 'dối',
      english: 'lie',
      type: 'additional',
      example: '嘘をつかないでください。'
    },
    {
      japanese: '本当',
      kana: 'ほんとう',
      vietnamese: 'thật',
      english: 'truth, reality',
      type: 'additional',
      example: '本当の話です。'
    },

    // Supplementary Vocabulary - Appearance & Impression
    {
      japanese: 'そう',
      kana: 'そう',
      vietnamese: 'có vẻ',
      english: 'seem, appear',
      type: 'supplementary',
      example: '難しそうです。'
    },
    {
      japanese: 'らしい',
      kana: 'らしい',
      vietnamese: 'nghe nói',
      english: 'seems, I heard',
      type: 'supplementary',
      example: '明日は雨らしいです。'
    },
    {
      japanese: 'みたい',
      kana: 'みたい',
      vietnamese: 'giống như',
      english: 'like, similar to',
      type: 'supplementary',
      example: '学生みたいです。'
    },
    {
      japanese: 'よう',
      kana: 'よう',
      vietnamese: 'như, giống',
      english: 'like, as if',
      type: 'supplementary',
      example: '夢のようです。'
    },
    {
      japanese: '見える',
      kana: 'みえる',
      vietnamese: 'trông có vẻ',
      english: 'to look, to appear',
      type: 'supplementary',
      example: '若く見えます。'
    },
    {
      japanese: '聞こえる',
      kana: 'きこえる',
      vietnamese: 'nghe có vẻ',
      english: 'to sound, to be heard',
      type: 'supplementary',
      example: '音が聞こえます。'
    },
    {
      japanese: '感じる',
      kana: 'かんじる',
      vietnamese: 'cảm thấy',
      english: 'to feel',
      type: 'supplementary',
      example: '寒さを感じます。'
    },
    {
      japanese: '思える',
      kana: 'おもえる',
      vietnamese: 'có thể nghĩ',
      english: 'to seem, to appear',
      type: 'supplementary',
      example: '正しいと思えます。'
    },
    {
      japanese: '信じる',
      kana: 'しんじる',
      vietnamese: 'tin',
      english: 'to believe',
      type: 'supplementary',
      example: 'あなたを信じます。'
    },
    {
      japanese: '疑う',
      kana: 'うたがう',
      vietnamese: 'nghi ngờ',
      english: 'to doubt',
      type: 'supplementary',
      example: '彼の話を疑っています。'
    },

    // Supplementary Vocabulary - Certainty & Uncertainty
    {
      japanese: '確か',
      kana: 'たしか',
      vietnamese: 'chắc chắn',
      english: 'certain, sure',
      type: 'supplementary',
      example: '確かに聞きました。'
    },
    {
      japanese: '多分',
      kana: 'たぶん',
      vietnamese: 'có lẽ',
      english: 'probably',
      type: 'supplementary',
      example: '多分明日は雨です。'
    },
    {
      japanese: 'きっと',
      kana: 'きっと',
      vietnamese: 'chắc chắn',
      english: 'surely, certainly',
      type: 'supplementary',
      example: 'きっと来ます。'
    },
    {
      japanese: 'もしかしたら',
      kana: 'もしかしたら',
      vietnamese: 'có lẽ, có thể',
      english: 'perhaps, maybe',
      type: 'supplementary',
      example: 'もしかしたら遅れるかもしれません。'
    },
    {
      japanese: 'おそらく',
      kana: 'おそらく',
      vietnamese: 'có lẽ',
      english: 'probably',
      type: 'supplementary',
      example: 'おそらく正しいでしょう。'
    },
    {
      japanese: 'まさか',
      kana: 'まさか',
      vietnamese: 'không lẽ',
      english: 'surely not',
      type: 'supplementary',
      example: 'まさか本当ではないでしょう。'
    },
    {
      japanese: '本当に',
      kana: 'ほんとうに',
      vietnamese: 'thật sự',
      english: 'really, truly',
      type: 'supplementary',
      example: '本当にありがとうございます。'
    },
    {
      japanese: '実は',
      kana: 'じつは',
      vietnamese: 'thực ra',
      english: 'actually, in fact',
      type: 'supplementary',
      example: '実は、昨日会いました。'
    },
    {
      japanese: 'やはり',
      kana: 'やはり',
      vietnamese: 'quả nhiên',
      english: 'as expected',
      type: 'supplementary',
      example: 'やはり難しかったです。'
    },
    {
      japanese: 'どうやら',
      kana: 'どうやら',
      vietnamese: 'có vẻ như',
      english: 'apparently, it seems',
      type: 'supplementary',
      example: 'どうやら雨が降りそうです。'
    }
  ],
  grammar: [
    {
      pattern: '～と言う',
      vietnamese: 'nói rằng ~',
      english: 'to say that',
      type: 'main',
      explanation: 'Dùng để trích dẫn lời nói trực tiếp hoặc gián tiếp. Dùng với câu thể thường + と言う/と言った/と言っている. Có thể dùng って trong văn nói thân mật thay cho と言う.',
      examples: [
        {
          japanese: '田中さんは明日来ると言いました。',
          vietnamese: 'Anh Tanaka nói rằng ngày mai sẽ đến.',
          english: 'Mr. Tanaka said that he would come tomorrow.',
          type: 'main'
        },
        {
          japanese: '先生は「頑張ってください」と言いました。',
          vietnamese: 'Thầy giáo nói "Hãy cố gắng".',
          english: 'The teacher said "Please do your best".',
          type: 'main'
        },
        {
          japanese: '彼は何も言いませんでした。',
          vietnamese: 'Anh ấy không nói gì cả.',
          english: 'He didn\'t say anything.',
          type: 'main'
        },
        {
          japanese: '友達が面白いって言っていました。',
          vietnamese: 'Bạn tôi nói là thú vị đấy.',
          english: 'My friend said it was interesting.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～そうだ (伝聞)',
      vietnamese: 'nghe nói ~',
      english: 'I heard that, they say that',
      type: 'main',
      explanation: 'Diễn tả thông tin nghe được từ người khác (truyền văn). Dùng với câu thể thường + そうだ. い-adj: おいしいそうだ, な-adj/Noun: 元気だそうだ. Khác với そうだ biểu thị vẻ ngoài.',
      examples: [
        {
          japanese: '明日は雨だそうです。',
          vietnamese: 'Nghe nói ngày mai trời mưa.',
          english: 'I heard it will rain tomorrow.',
          type: 'main'
        },
        {
          japanese: '田中さんは病気だそうです。',
          vietnamese: 'Nghe nói anh Tanaka bị ốm.',
          english: 'I heard Mr. Tanaka is sick.',
          type: 'main'
        },
        {
          japanese: 'この店は美味しいそうです。',
          vietnamese: 'Nghe nói quán này ngon.',
          english: 'I heard this restaurant is delicious.',
          type: 'main'
        },
        {
          japanese: '彼は来月結婚するそうです。',
          vietnamese: 'Nghe nói anh ấy kết hôn tháng sau.',
          english: 'I heard he\'s getting married next month.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～らしい',
      vietnamese: 'có vẻ ~, nghe nói ~',
      english: 'it seems, apparently',
      type: 'main',
      explanation: 'Diễn tả suy đoán dựa trên thông tin nghe được hoặc quan sát. Dùng với câu thể thường + らしい. い-adj: 高いらしい, な-adj: 便利らしい, Noun: 学生らしい. Mang ý không chắc chắn 100%.',
      examples: [
        {
          japanese: '明日は雨らしいです。',
          vietnamese: 'Có vẻ ngày mai trời mưa.',
          english: 'It seems it will rain tomorrow.',
          type: 'main'
        },
        {
          japanese: '彼は学生らしいです。',
          vietnamese: 'Có vẻ anh ấy là sinh viên.',
          english: 'He seems to be a student.',
          type: 'main'
        },
        {
          japanese: 'この店は美味しいらしいです。',
          vietnamese: 'Nghe nói quán này ngon.',
          english: 'I hear this restaurant is delicious.',
          type: 'main'
        },
        {
          japanese: '彼女は日本人らしいです。',
          vietnamese: 'Có vẻ cô ấy là người Nhật.',
          english: 'She appears to be Japanese.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～そうだ (様態)',
      vietnamese: 'trông có vẻ ~',
      english: 'to look, to seem',
      type: 'main',
      explanation: 'Diễn tả vẻ ngoài dựa trên quan sát trực tiếp. い-adj: bỏ い + そう (おいしそう), な-adj: bỏ な + そう (元気そう). Không dùng với いい (→よさそう), ない (→なさそう). Khác với そうだ truyền văn.',
      examples: [
        {
          japanese: 'このケーキは美味しそうです。',
          vietnamese: 'Chiếc bánh này trông ngon.',
          english: 'This cake looks delicious.',
          type: 'main'
        },
        {
          japanese: '雨が降りそうです。',
          vietnamese: 'Trời trông có vẻ sắp mưa.',
          english: 'It looks like it\'s going to rain.',
          type: 'main'
        },
        {
          japanese: '彼は忙しそうです。',
          vietnamese: 'Anh ấy trông có vẻ bận.',
          english: 'He looks busy.',
          type: 'main'
        },
        {
          japanese: 'この問題は難しそうです。',
          vietnamese: 'Bài toán này trông có vẻ khó.',
          english: 'This problem looks difficult.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～みたいだ',
      vietnamese: 'giống như ~, có vẻ ~',
      english: 'to be like, to seem',
      type: 'main',
      explanation: 'Dùng để so sánh hoặc suy đoán. Dùng với câu thể thường + みたいだ. Noun の + みたいだ. Thân mật hơn ようだ. Có thể diễn tả: 1) So sánh, 2) Suy đoán.',
      examples: [
        {
          japanese: '彼は学生みたいです。',
          vietnamese: 'Anh ấy có vẻ là sinh viên.',
          english: 'He seems to be a student.',
          type: 'main'
        },
        {
          japanese: '雨が降ったみたいです。',
          vietnamese: 'Có vẻ trời đã mưa rồi.',
          english: 'It seems it has rained.',
          type: 'main'
        },
        {
          japanese: '夢みたいです。',
          vietnamese: 'Giống như giấc mơ.',
          english: 'It\'s like a dream.',
          type: 'main'
        },
        {
          japanese: '彼女は怒っているみたいです。',
          vietnamese: 'Có vẻ cô ấy đang giận.',
          english: 'She seems to be angry.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～ようだ',
      vietnamese: 'có vẻ ~, dường như ~',
      english: 'to seem, to appear',
      type: 'main',
      explanation: 'Dùng để diễn tả suy đoán hoặc so sánh. Dùng với câu thể thường + ようだ. Noun の + ようだ. Lịch sự hơn みたいだ. Có thể diễn tả: 1) Suy đoán dựa trên quan sát, 2) So sánh.',
      examples: [
        {
          japanese: '彼は学生のようです。',
          vietnamese: 'Anh ấy có vẻ là sinh viên.',
          english: 'He appears to be a student.',
          type: 'main'
        },
        {
          japanese: '雨が降ったようです。',
          vietnamese: 'Có vẻ trời đã mưa.',
          english: 'It appears it has rained.',
          type: 'main'
        },
        {
          japanese: '夢のようです。',
          vietnamese: 'Như giấc mơ.',
          english: 'It\'s like a dream.',
          type: 'main'
        },
        {
          japanese: '彼女は疲れているようです。',
          vietnamese: 'Có vẻ cô ấy đang mệt.',
          english: 'She seems to be tired.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～かもしれない',
      vietnamese: 'có thể ~, có lẽ ~',
      english: 'might, may, perhaps',
      type: 'additional',
      explanation: 'Diễn tả khả năng không chắc chắn (khoảng 50%). Dùng với câu thể thường + かもしれない. な-adj/Noun có thể bỏ だ trước かもしれない. Lịch sự: かもしれません.',
      examples: [
        {
          japanese: '明日は雨かもしれません。',
          vietnamese: 'Ngày mai có thể trời mưa.',
          english: 'It might rain tomorrow.',
          type: 'main'
        },
        {
          japanese: '彼は来ないかもしれません。',
          vietnamese: 'Có lẽ anh ấy không đến.',
          english: 'He might not come.',
          type: 'main'
        },
        {
          japanese: 'これは間違いかもしれません。',
          vietnamese: 'Cái này có thể là sai.',
          english: 'This might be a mistake.',
          type: 'main'
        },
        {
          japanese: '彼女は学生かもしれません。',
          vietnamese: 'Có thể cô ấy là sinh viên.',
          english: 'She might be a student.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～と聞く',
      vietnamese: 'nghe nói ~',
      english: 'to hear that',
      type: 'additional',
      explanation: 'Dùng để truyền đạt thông tin đã nghe. Dùng với câu thể thường + と聞く/と聞いた/と聞いている. Tương tự そうだ nhưng rõ ràng hơn về nguồn thông tin.',
      examples: [
        {
          japanese: '田中さんは来月結婚すると聞きました。',
          vietnamese: 'Tôi nghe nói anh Tanaka kết hôn tháng sau.',
          english: 'I heard that Mr. Tanaka is getting married next month.',
          type: 'main'
        },
        {
          japanese: 'この店は美味しいと聞いています。',
          vietnamese: 'Tôi nghe nói quán này ngon.',
          english: 'I\'ve heard this restaurant is good.',
          type: 'main'
        },
        {
          japanese: '彼は優秀だと聞きました。',
          vietnamese: 'Tôi nghe nói anh ấy giỏi.',
          english: 'I heard he is excellent.',
          type: 'main'
        },
        {
          japanese: '明日は休みだと聞きました。',
          vietnamese: 'Tôi nghe nói ngày mai nghỉ.',
          english: 'I heard tomorrow is a holiday.',
          type: 'additional'
        }
      ]
    }
  ]
};

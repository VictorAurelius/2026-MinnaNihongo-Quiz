/**
 * N4 Core Lessons — Lesson 21
 * Focus: Keigo (Polite/Humble Language) and Business Expressions
 */

import type { LessonData } from '$lib/types';

export const LESSON_21_DATA: LessonData = {
  lessonNumber: 21,
  title: '敬語と丁寧な表現 (Ngôn ngữ lịch sự và khiêm nhường)',
  vocabulary: [
    // Honorific Verbs (尊敬語)
    {
      japanese: 'いらっしゃる',
      kana: 'いらっしゃる',
      vietnamese: 'đến, đi, ở (kính ngữ)',
      english: 'to come/go/be (honorific)',
      type: 'main',
      example: '先生はもういらっしゃいますか。'
    },
    {
      japanese: 'おっしゃる',
      kana: 'おっしゃる',
      vietnamese: 'nói (kính ngữ)',
      english: 'to say (honorific)',
      type: 'main',
      example: '田中先生がそうおっしゃいました。'
    },
    {
      japanese: 'なさる',
      kana: 'なさる',
      vietnamese: 'làm (kính ngữ)',
      english: 'to do (honorific)',
      type: 'main',
      example: 'どうなさいますか。'
    },
    {
      japanese: 'ご覧になる（ごらんになる）',
      kana: 'ごらんになる',
      vietnamese: 'xem (kính ngữ)',
      english: 'to look/watch (honorific)',
      type: 'main',
      example: 'この資料をご覧になりましたか。'
    },
    {
      japanese: '召し上がる（めしあがる）',
      kana: 'めしあがる',
      vietnamese: 'ăn, uống (kính ngữ)',
      english: 'to eat/drink (honorific)',
      type: 'main',
      example: 'コーヒーを召し上がりますか。'
    },
    // Humble Verbs (謙譲語)
    {
      japanese: '参る（まいる）',
      kana: 'まいる',
      vietnamese: 'đến, đi (khiêm ngữ)',
      english: 'to come/go (humble)',
      type: 'main',
      example: '明日伺います。'
    },
    {
      japanese: '申す（もうす）',
      kana: 'もうす',
      vietnamese: 'nói (khiêm ngữ)',
      english: 'to say (humble)',
      type: 'main',
      example: '田中と申します。'
    },
    {
      japanese: '申し上げる（もうしあげる）',
      kana: 'もうしあげる',
      vietnamese: 'nói (khiêm ngữ lịch sự hơn)',
      english: 'to say/tell (humble)',
      type: 'main',
      example: 'お礼を申し上げます。'
    },
    {
      japanese: 'いたす',
      kana: 'いたす',
      vietnamese: 'làm (khiêm ngữ)',
      english: 'to do (humble)',
      type: 'main',
      example: '私がいたします。'
    },
    {
      japanese: '伺う（うかがう）',
      kana: 'うかがう',
      vietnamese: 'hỏi, nghe, đến (khiêm ngữ)',
      english: 'to ask/hear/visit (humble)',
      type: 'main',
      example: '質問を伺ってもよろしいですか。'
    },
    {
      japanese: '拝見する（はいけんする）',
      kana: 'はいけんする',
      vietnamese: 'xem (khiêm ngữ)',
      english: 'to look at (humble)',
      type: 'main',
      example: '資料を拝見いたしました。'
    },
    {
      japanese: 'いただく',
      kana: 'いただく',
      vietnamese: 'nhận, ăn, uống (khiêm ngữ)',
      english: 'to receive/eat/drink (humble)',
      type: 'main',
      example: 'お茶をいただきます。'
    },
    {
      japanese: '存じる（ぞんじる）',
      kana: 'ぞんじる',
      vietnamese: 'biết (khiêm ngữ)',
      english: 'to know (humble)',
      type: 'main',
      example: '存じております。'
    },
    // Business Vocabulary
    {
      japanese: '会社（かいしゃ）',
      kana: 'かいしゃ',
      vietnamese: 'công ty',
      english: 'company',
      type: 'main',
      example: '会社は東京にあります。'
    },
    {
      japanese: '社長（しゃちょう）',
      kana: 'しゃちょう',
      vietnamese: 'giám đốc công ty',
      english: 'company president',
      type: 'main',
      example: '社長はただいま外出中です。'
    },
    {
      japanese: '部長（ぶちょう）',
      kana: 'ぶちょう',
      vietnamese: 'trưởng phòng',
      english: 'department manager',
      type: 'main',
      example: '部長にご相談ください。'
    },
    {
      japanese: '課長（かちょう）',
      kana: 'かちょう',
      vietnamese: 'trưởng bộ phận',
      english: 'section chief',
      type: 'main',
      example: '課長がお呼びです。'
    },
    {
      japanese: '同僚（どうりょう）',
      kana: 'どうりょう',
      vietnamese: 'đồng nghiệp',
      english: 'colleague',
      type: 'main',
      example: '同僚と昼食を食べました。'
    },
    {
      japanese: '上司（じょうし）',
      kana: 'じょうし',
      vietnamese: 'cấp trên',
      english: 'superior/boss',
      type: 'main',
      example: '上司に報告します。'
    },
    {
      japanese: '部下（ぶか）',
      kana: 'ぶか',
      vietnamese: 'cấp dưới',
      english: 'subordinate',
      type: 'main',
      example: '部下に指示を出しました。'
    },
    {
      japanese: '会議（かいぎ）',
      kana: 'かいぎ',
      vietnamese: 'cuộc họp',
      english: 'meeting/conference',
      type: 'main',
      example: '会議は3時からです。'
    },
    {
      japanese: '打ち合わせ（うちあわせ）',
      kana: 'うちあわせ',
      vietnamese: 'cuộc họp, thảo luận',
      english: 'meeting/discussion',
      type: 'main',
      example: '明日打ち合わせがあります。'
    },
    {
      japanese: '予定（よてい）',
      kana: 'よてい',
      vietnamese: 'kế hoạch, lịch trình',
      english: 'schedule/plan',
      type: 'main',
      example: '来週の予定を確認します。'
    },
    {
      japanese: '資料（しりょう）',
      kana: 'しりょう',
      vietnamese: 'tài liệu',
      english: 'materials/documents',
      type: 'main',
      example: '資料を準備してください。'
    },
    {
      japanese: '書類（しょるい）',
      kana: 'しょるい',
      vietnamese: 'giấy tờ, văn bản',
      english: 'documents/papers',
      type: 'main',
      example: 'この書類にサインしてください。'
    },
    {
      japanese: '報告（ほうこく）',
      kana: 'ほうこく',
      vietnamese: 'báo cáo',
      english: 'report',
      type: 'main',
      example: '報告書を提出しました。'
    },
    {
      japanese: '連絡（れんらく）',
      kana: 'れんらく',
      vietnamese: 'liên lạc',
      english: 'contact/communication',
      type: 'main',
      example: '後で連絡します。'
    },
    {
      japanese: '確認（かくにん）',
      kana: 'かくにん',
      vietnamese: 'xác nhận',
      english: 'confirmation',
      type: 'main',
      example: 'メールを確認してください。'
    },
    {
      japanese: '契約（けいやく）',
      kana: 'けいやく',
      vietnamese: 'hợp đồng',
      english: 'contract',
      type: 'main',
      example: '契約を結びました。'
    },
    {
      japanese: '取引（とりひき）',
      kana: 'とりひき',
      vietnamese: 'giao dịch',
      english: 'transaction/deal',
      type: 'main',
      example: '取引先と会います。'
    },
    // Polite Expressions
    {
      japanese: '恐れ入りますが（おそれいりますが）',
      kana: 'おそれいりますが',
      vietnamese: 'xin lỗi làm phiền nhưng',
      english: 'excuse me, but...',
      type: 'main',
      example: '恐れ入りますが、お名前をお聞かせください。'
    },
    {
      japanese: 'お待たせしました（おまたせしました）',
      kana: 'おまたせしました',
      vietnamese: 'xin lỗi đã làm bạn đợi',
      english: 'sorry to keep you waiting',
      type: 'main',
      example: 'お待たせしました。どうぞお入りください。'
    },
    {
      japanese: '失礼いたします（しつれいいたします）',
      kana: 'しつれいいたします',
      vietnamese: 'xin phép',
      english: 'excuse me (polite)',
      type: 'main',
      example: '失礼いたします。田中と申します。'
    },
    {
      japanese: 'よろしくお願いいたします（よろしくおねがいいたします）',
      kana: 'よろしくおねがいいたします',
      vietnamese: 'rất mong được giúp đỡ (rất lịch sự)',
      english: 'please treat me favorably (very polite)',
      type: 'main',
      example: '今後ともよろしくお願いいたします。'
    },
    {
      japanese: 'お疲れ様でした（おつかれさまでした）',
      kana: 'おつかれさまでした',
      vietnamese: 'cảm ơn vì công việc vất vả',
      english: 'thank you for your hard work',
      type: 'main',
      example: '今日はお疲れ様でした。'
    },
    {
      japanese: 'お先に失礼します（おさきにしつれいします）',
      kana: 'おさきにしつれいします',
      vietnamese: 'xin phép về trước',
      english: 'excuse me for leaving first',
      type: 'main',
      example: 'お先に失礼します。また明日。'
    },
    {
      japanese: 'お世話になっております（おせわになっております）',
      kana: 'おせわになっております',
      vietnamese: 'cảm ơn đã giúp đỡ (dùng trong email/điện thoại)',
      english: 'thank you for your support',
      type: 'main',
      example: 'いつもお世話になっております。'
    },
    // Additional Vocabulary
    {
      japanese: '承知しました（しょうちしました）',
      kana: 'しょうちしました',
      vietnamese: 'tôi đã hiểu',
      english: 'I understand (formal)',
      type: 'additional',
      example: '承知しました。すぐに確認いたします。'
    },
    {
      japanese: 'かしこまりました',
      kana: 'かしこまりました',
      vietnamese: 'vâng ạ (rất lịch sự)',
      english: 'certainly (very formal)',
      type: 'additional',
      example: 'かしこまりました。少々お待ちください。'
    },
    {
      japanese: 'お忙しいところ（おいそがしいところ）',
      kana: 'おいそがしいところ',
      vietnamese: 'trong lúc bận rộn',
      english: 'while you are busy',
      type: 'additional',
      example: 'お忙しいところ、ありがとうございます。'
    },
    {
      japanese: 'お手数ですが（おてすうですが）',
      kana: 'おてすうですが',
      vietnamese: 'xin lỗi làm phiền nhưng',
      english: 'sorry to trouble you, but',
      type: 'additional',
      example: 'お手数ですが、こちらの書類をお願いします。'
    },
    {
      japanese: 'ご都合（ごつごう）',
      kana: 'ごつごう',
      vietnamese: 'sự thuận tiện',
      english: 'convenience/circumstances',
      type: 'additional',
      example: 'ご都合はいかがですか。'
    },
    {
      japanese: 'ご無沙汰しております（ごぶさたしております）',
      kana: 'ごぶさたしております',
      vietnamese: 'lâu không gặp',
      english: 'it has been a long time',
      type: 'additional',
      example: 'ご無沙汰しております。お元気ですか。'
    },
    {
      japanese: '拝借する（はいしゃくする）',
      kana: 'はいしゃくする',
      vietnamese: 'mượn (khiêm ngữ)',
      english: 'to borrow (humble)',
      type: 'additional',
      example: 'ペンを拝借してもよろしいですか。'
    },
    {
      japanese: '差し上げる（さしあげる）',
      kana: 'さしあげる',
      vietnamese: 'tặng (khiêm ngữ)',
      english: 'to give (humble)',
      type: 'additional',
      example: 'これを差し上げます。'
    },
    {
      japanese: 'お目にかかる（おめにかかる）',
      kana: 'おめにかかる',
      vietnamese: 'gặp (khiêm ngữ)',
      english: 'to meet (humble)',
      type: 'additional',
      example: '来週お目にかかれますか。'
    },
    {
      japanese: 'お待ちする（おまちする）',
      kana: 'おまちする',
      vietnamese: 'chờ đợi (khiêm ngữ)',
      english: 'to wait (humble)',
      type: 'additional',
      example: 'ロビーでお待ちしております。'
    },
    {
      japanese: 'ご案内する（ごあんないする）',
      kana: 'ごあんないする',
      vietnamese: 'hướng dẫn (khiêm ngữ)',
      english: 'to guide (humble)',
      type: 'additional',
      example: '会議室へご案内いたします。'
    },
    {
      japanese: 'お送りする（おおくりする）',
      kana: 'おおくりする',
      vietnamese: 'gửi (khiêm ngữ)',
      english: 'to send (humble)',
      type: 'additional',
      example: 'メールでお送りします。'
    },
    {
      japanese: 'お持ちする（おもちする）',
      kana: 'おもちする',
      vietnamese: 'mang (khiêm ngữ)',
      english: 'to bring/hold (humble)',
      type: 'additional',
      example: 'お荷物をお持ちします。'
    },
    {
      japanese: '頂戴する（ちょうだいする）',
      kana: 'ちょうだいする',
      vietnamese: 'nhận (khiêm ngữ)',
      english: 'to receive (humble)',
      type: 'additional',
      example: 'お名刺を頂戴いたします。'
    },
    // Business Terms
    {
      japanese: '営業（えいぎょう）',
      kana: 'えいぎょう',
      vietnamese: 'kinh doanh, bán hàng',
      english: 'sales/business',
      type: 'additional',
      example: '営業部で働いています。'
    },
    {
      japanese: '経理（けいり）',
      kana: 'けいり',
      vietnamese: 'kế toán',
      english: 'accounting',
      type: 'additional',
      example: '経理の仕事は細かいです。'
    },
    {
      japanese: '人事（じんじ）',
      kana: 'じんじ',
      vietnamese: 'nhân sự',
      english: 'human resources',
      type: 'additional',
      example: '人事部に問い合わせてください。'
    },
    {
      japanese: '総務（そうむ）',
      kana: 'そうむ',
      vietnamese: 'hành chính tổng hợp',
      english: 'general affairs',
      type: 'additional',
      example: '総務部が管理しています。'
    },
    {
      japanese: '売上（うりあげ）',
      kana: 'うりあげ',
      vietnamese: 'doanh số',
      english: 'sales/revenue',
      type: 'additional',
      example: '今月の売上は好調です。'
    },
    {
      japanese: '利益（りえき）',
      kana: 'りえき',
      vietnamese: 'lợi nhuận',
      english: 'profit',
      type: 'additional',
      example: '利益が増えました。'
    },
    {
      japanese: '納期（のうき）',
      kana: 'のうき',
      vietnamese: 'thời hạn giao hàng',
      english: 'delivery date',
      type: 'additional',
      example: '納期を守ってください。'
    },
    {
      japanese: '見積もり（みつもり）',
      kana: 'みつもり',
      vietnamese: 'báo giá',
      english: 'estimate/quote',
      type: 'additional',
      example: '見積もりをお願いします。'
    },
    {
      japanese: '請求書（せいきゅうしょ）',
      kana: 'せいきゅうしょ',
      vietnamese: 'hóa đơn yêu cầu thanh toán',
      english: 'invoice',
      type: 'additional',
      example: '請求書を発行しました。'
    },
    {
      japanese: '領収書（りょうしゅうしょ）',
      kana: 'りょうしゅうしょ',
      vietnamese: 'biên lai',
      english: 'receipt',
      type: 'additional',
      example: '領収書をください。'
    },
    // Supplementary
    {
      japanese: '謹んで（つつしんで）',
      kana: 'つつしんで',
      vietnamese: 'cung kính',
      english: 'respectfully',
      type: 'supplementary',
      example: '謹んでお祝い申し上げます。'
    },
    {
      japanese: 'ご指導（ごしどう）',
      kana: 'ごしどう',
      vietnamese: 'sự chỉ đạo',
      english: 'guidance',
      type: 'supplementary',
      example: 'ご指導よろしくお願いします。'
    },
    {
      japanese: 'ご協力（ごきょうりょく）',
      kana: 'ごきょうりょく',
      vietnamese: 'sự hợp tác',
      english: 'cooperation',
      type: 'supplementary',
      example: 'ご協力ありがとうございます。'
    },
    {
      japanese: 'ご迷惑（ごめいわく）',
      kana: 'ごめいわく',
      vietnamese: 'sự phiền phức',
      english: 'trouble/inconvenience',
      type: 'supplementary',
      example: 'ご迷惑をおかけしました。'
    }
  ],
  grammar: [
    {
      pattern: 'お/ご～になる',
      vietnamese: 'kính ngữ cho động từ',
      english: 'honorific verb form',
      type: 'main',
      explanation: 'Dùng để tôn trọng người nghe hoặc người được nhắc đến. お dùng với từ Hán-Nhật, ご dùng với từ gốc Hán. Cấu trúc: お + động từ dạng masu (bỏ ます) + になる.',
      examples: [
        {
          japanese: '先生はもうお帰りになりましたか。',
          vietnamese: 'Thầy đã về chưa ạ?',
          english: 'Has the teacher already gone home?',
          type: 'main'
        },
        {
          japanese: '部長は資料をご覧になりました。',
          vietnamese: 'Trưởng phòng đã xem tài liệu.',
          english: 'The department manager looked at the documents.',
          type: 'main'
        },
        {
          japanese: '社長は何時にお着きになりますか。',
          vietnamese: 'Giám đốc sẽ đến lúc mấy giờ ạ?',
          english: 'What time will the president arrive?',
          type: 'main'
        }
      ]
    },
    {
      pattern: 'お/ご～する/いたす',
      vietnamese: 'khiêm ngữ cho động từ',
      english: 'humble verb form',
      type: 'main',
      explanation: 'Dùng để hạ thấp hành động của mình, thể hiện sự lịch sự với người nghe. いたす lịch sự hơn する. Cấu trúc: お + động từ dạng masu (bỏ ます) + する/いたす.',
      examples: [
        {
          japanese: '私がお送りいたします。',
          vietnamese: 'Tôi sẽ gửi (cho anh/chị).',
          english: 'I will send it (to you).',
          type: 'main'
        },
        {
          japanese: 'ご案内いたします。',
          vietnamese: 'Tôi sẽ hướng dẫn (anh/chị).',
          english: 'I will guide you.',
          type: 'main'
        },
        {
          japanese: '後ほどお電話いたします。',
          vietnamese: 'Tôi sẽ gọi điện sau.',
          english: 'I will call you later.',
          type: 'main'
        },
        {
          japanese: 'お待ちしております。',
          vietnamese: 'Tôi đang chờ (anh/chị).',
          english: 'I am waiting (for you).',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～ていらっしゃる',
      vietnamese: 'kính ngữ cho động từ ている',
      english: 'honorific form of ～ている',
      type: 'main',
      explanation: 'Dạng kính ngữ của ～ている, dùng để tôn trọng người đang thực hiện hành động. Cấu trúc: động từ て-form + いらっしゃる.',
      examples: [
        {
          japanese: '先生は今会議室にいらっしゃいます。',
          vietnamese: 'Hiện tại thầy đang ở phòng họp.',
          english: 'The teacher is in the meeting room now.',
          type: 'main'
        },
        {
          japanese: '部長はもうお帰りになっていらっしゃいます。',
          vietnamese: 'Trưởng phòng đã về rồi ạ.',
          english: 'The department manager has already gone home.',
          type: 'main'
        },
        {
          japanese: 'お客様がお待ちになっていらっしゃいます。',
          vietnamese: 'Khách hàng đang chờ ạ.',
          english: 'The customer is waiting.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～ております',
      vietnamese: 'khiêm ngữ cho động từ ている',
      english: 'humble form of ～ている',
      type: 'main',
      explanation: 'Dạng khiêm ngữ của ～ている, dùng để hạ thấp hành động của mình. Cấu trúc: động từ て-form + おります.',
      examples: [
        {
          japanese: '田中と申しております。',
          vietnamese: 'Tôi tên là Tanaka.',
          english: 'My name is Tanaka.',
          type: 'main'
        },
        {
          japanese: 'いつもお世話になっております。',
          vietnamese: 'Cảm ơn đã luôn giúp đỡ.',
          english: 'Thank you for your continued support.',
          type: 'main'
        },
        {
          japanese: 'ロビーでお待ちしております。',
          vietnamese: 'Tôi đang chờ ở sảnh.',
          english: 'I am waiting in the lobby.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～させていただく',
      vietnamese: 'cho phép tôi làm...',
      english: 'let me... / allow me to...',
      type: 'main',
      explanation: 'Dùng để xin phép một cách rất lịch sự khi muốn làm điều gì đó. Cấu trúc: động từ causative (させる) + ていただく.',
      examples: [
        {
          japanese: '説明させていただきます。',
          vietnamese: 'Cho phép tôi giải thích.',
          english: 'Allow me to explain.',
          type: 'main'
        },
        {
          japanese: '確認させていただいてもよろしいですか。',
          vietnamese: 'Tôi có thể xác nhận được không ạ?',
          english: 'May I confirm?',
          type: 'main'
        },
        {
          japanese: '休ませていただきます。',
          vietnamese: 'Cho phép tôi xin nghỉ.',
          english: 'Please let me take a day off.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: 'お/ご～ください',
      vietnamese: 'xin hãy... (lịch sự)',
      english: 'please... (polite)',
      type: 'additional',
      explanation: 'Cách nói lịch sự hơn của ～てください. お dùng với từ Hán-Nhật, ご dùng với từ gốc Hán.',
      examples: [
        {
          japanese: 'こちらでお待ちください。',
          vietnamese: 'Xin hãy đợi ở đây.',
          english: 'Please wait here.',
          type: 'main'
        },
        {
          japanese: 'ご確認ください。',
          vietnamese: 'Xin hãy xác nhận.',
          english: 'Please confirm.',
          type: 'main'
        },
        {
          japanese: 'お座りください。',
          vietnamese: 'Xin mời ngồi.',
          english: 'Please have a seat.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～ていただけますか',
      vietnamese: 'bạn có thể... được không? (rất lịch sự)',
      english: 'could you...? (very polite)',
      type: 'additional',
      explanation: 'Cách nhờ vả rất lịch sự. Lịch sự hơn ～てくれますか hoặc ～てもらえますか.',
      examples: [
        {
          japanese: 'ここにサインしていただけますか。',
          vietnamese: 'Anh/chị có thể ký tại đây được không ạ?',
          english: 'Could you sign here?',
          type: 'main'
        },
        {
          japanese: '明日までに提出していただけますか。',
          vietnamese: 'Anh/chị có thể nộp trước ngày mai được không ạ?',
          english: 'Could you submit it by tomorrow?',
          type: 'main'
        },
        {
          japanese: 'もう一度説明していただけますか。',
          vietnamese: 'Anh/chị có thể giải thích lại một lần nữa được không ạ?',
          english: 'Could you explain it again?',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～てくださいませんか',
      vietnamese: 'anh/chị có thể... không? (lịch sự)',
      english: 'would you...? (polite)',
      type: 'additional',
      explanation: 'Cách nhờ vả lịch sự, mềm mỏng hơn ～てください. Dạng phủ định của ～てくださいますか.',
      examples: [
        {
          japanese: 'ちょっと手伝ってくださいませんか。',
          vietnamese: 'Anh/chị có thể giúp một chút được không ạ?',
          english: 'Would you help me a little?',
          type: 'main'
        },
        {
          japanese: '資料を見せてくださいませんか。',
          vietnamese: 'Anh/chị có thể cho tôi xem tài liệu được không ạ?',
          english: 'Would you show me the documents?',
          type: 'main'
        }
      ]
    }
  ]
};

/**
 * N4 Core Lessons — Lesson 10: Honorific Expressions
 * Focus: 尊敬語・謙譲語 (honorific and humble language basics)
 */

import type { LessonData } from '$lib/types';

export const LESSON_10_DATA: LessonData = {
  lessonNumber: 10,
  title: '敬語 (Kính ngữ)',
  vocabulary: [
    // Special honorific verbs
    {
      japanese: 'いらっしゃる',
      kana: 'いらっしゃる',
      vietnamese: 'đến, đi, có mặt (tôn kính)',
      english: 'to come, to go, to be (honorific)',
      type: 'main',
      example: '先生はいらっしゃいますか。'
    },
    {
      japanese: 'おっしゃる',
      kana: 'おっしゃる',
      vietnamese: 'nói (tôn kính)',
      english: 'to say (honorific)',
      type: 'main',
      example: '社長がおっしゃいました。'
    },
    {
      japanese: 'なさる',
      kana: 'なさる',
      vietnamese: 'làm (tôn kính)',
      english: 'to do (honorific)',
      type: 'main',
      example: '何をなさいますか。'
    },
    {
      japanese: 'ご覧になる',
      kana: 'ごらんになる',
      vietnamese: 'xem (tôn kính)',
      english: 'to see, to look at (honorific)',
      type: 'main',
      example: 'もうご覧になりましたか。'
    },
    {
      japanese: '召し上がる',
      kana: 'めしあがる',
      vietnamese: 'ăn, uống (tôn kính)',
      english: 'to eat, to drink (honorific)',
      type: 'main',
      example: 'コーヒーを召し上がりますか。'
    },
    {
      japanese: 'お休みになる',
      kana: 'おやすみになる',
      vietnamese: 'nghỉ ngơi (tôn kính)',
      english: 'to rest (honorific)',
      type: 'main',
      example: 'もうお休みになりましたか。'
    },
    {
      japanese: 'ご存じ',
      kana: 'ごぞんじ',
      vietnamese: 'biết (tôn kính)',
      english: 'to know (honorific)',
      type: 'main',
      example: 'この件をご存じですか。'
    },
    {
      japanese: 'くださる',
      kana: 'くださる',
      vietnamese: 'cho (tôn kính)',
      english: 'to give (honorific)',
      type: 'main',
      example: '先生がくださいました。'
    },
    // Special humble verbs
    {
      japanese: '伺う',
      kana: 'うかがう',
      vietnamese: 'đến, hỏi (khiêm tốn)',
      english: 'to visit, to ask (humble)',
      type: 'main',
      example: '明日伺います。'
    },
    {
      japanese: '参る',
      kana: 'まいる',
      vietnamese: 'đi, đến (khiêm tốn)',
      english: 'to go, to come (humble)',
      type: 'main',
      example: '私が参ります。'
    },
    {
      japanese: '申す',
      kana: 'もうす',
      vietnamese: 'nói (khiêm tốn)',
      english: 'to say (humble)',
      type: 'main',
      example: '田中と申します。'
    },
    {
      japanese: '申し上げる',
      kana: 'もうしあげる',
      vietnamese: 'nói (khiêm tốn cao)',
      english: 'to say (humble, formal)',
      type: 'main',
      example: 'お礼を申し上げます。'
    },
    {
      japanese: 'いたす',
      kana: 'いたす',
      vietnamese: 'làm (khiêm tốn)',
      english: 'to do (humble)',
      type: 'main',
      example: 'お手伝いいたします。'
    },
    {
      japanese: '拝見する',
      kana: 'はいけんする',
      vietnamese: 'xem (khiêm tốn)',
      english: 'to see, to look at (humble)',
      type: 'main',
      example: '資料を拝見いたしました。'
    },
    {
      japanese: 'いただく',
      kana: 'いただく',
      vietnamese: 'nhận, ăn, uống (khiêm tốn)',
      english: 'to receive, to eat, to drink (humble)',
      type: 'main',
      example: 'お茶をいただきます。'
    },
    {
      japanese: '承る',
      kana: 'うけたまわる',
      vietnamese: 'nghe, nhận (khiêm tốn)',
      english: 'to hear, to receive (humble)',
      type: 'main',
      example: 'ご注文を承ります。'
    },
    {
      japanese: '存じる',
      kana: 'ぞんじる',
      vietnamese: 'biết (khiêm tốn)',
      english: 'to know (humble)',
      type: 'main',
      example: '存じております。'
    },
    {
      japanese: 'お目にかかる',
      kana: 'おめにかかる',
      vietnamese: 'gặp (khiêm tốn)',
      english: 'to meet (humble)',
      type: 'main',
      example: 'お目にかかれて光栄です。'
    },
    // Honorific prefixes and expressions
    {
      japanese: 'お〜になる',
      kana: 'お〜になる',
      vietnamese: '(tôn kính chung)',
      english: 'honorific form',
      type: 'main',
      example: 'お読みになりますか。'
    },
    {
      japanese: 'お〜する/いたす',
      kana: 'お〜する/いたす',
      vietnamese: '(khiêm tốn chung)',
      english: 'humble form',
      type: 'main',
      example: 'お送りいたします。'
    },
    {
      japanese: 'ご〜になる',
      kana: 'ご〜になる',
      vietnamese: '(tôn kính cho từ Hán)',
      english: 'honorific form (Sino-Japanese)',
      type: 'main',
      example: 'ご利用になりますか。'
    },
    {
      japanese: 'ご〜する/いたす',
      kana: 'ご〜する/いたす',
      vietnamese: '(khiêm tốn cho từ Hán)',
      english: 'humble form (Sino-Japanese)',
      type: 'main',
      example: 'ご案内いたします。'
    },
    // Business and formal nouns
    {
      japanese: 'お客様',
      kana: 'おきゃくさま',
      vietnamese: 'quý khách',
      english: 'customer, guest (honorific)',
      type: 'main',
      example: 'お客様がいらっしゃいました。'
    },
    {
      japanese: 'ご主人',
      kana: 'ごしゅじん',
      vietnamese: 'chủ nhà, chồng (của người khác)',
      english: 'master, husband (of others)',
      type: 'main',
      example: 'ご主人はいらっしゃいますか。'
    },
    {
      japanese: '奥様',
      kana: 'おくさま',
      vietnamese: 'phu nhân, vợ (của người khác)',
      english: 'wife (of others, formal)',
      type: 'main',
      example: '奥様によろしくお伝えください。'
    },
    {
      japanese: 'お嬢様',
      kana: 'おじょうさま',
      vietnamese: 'cô gái, con gái (tôn kính)',
      english: 'young lady, daughter (honorific)',
      type: 'main',
      example: 'お嬢様は元気ですか。'
    },
    {
      japanese: 'ご令息',
      kana: 'ごれいそく',
      vietnamese: 'quý tử (con trai)',
      english: 'son (honorific)',
      type: 'main',
      example: 'ご令息はおいくつですか。'
    },
    {
      japanese: 'お宅',
      kana: 'おたく',
      vietnamese: 'nhà bạn',
      english: 'your house',
      type: 'main',
      example: 'お宅はどちらですか。'
    },
    {
      japanese: 'お名前',
      kana: 'おなまえ',
      vietnamese: 'tên (tôn trọng)',
      english: 'name (respectful)',
      type: 'main',
      example: 'お名前を教えていただけますか。'
    },
    {
      japanese: 'ご住所',
      kana: 'ごじゅうしょ',
      vietnamese: 'địa chỉ (tôn trọng)',
      english: 'address (respectful)',
      type: 'main',
      example: 'ご住所をお願いします。'
    },
    {
      japanese: 'お電話',
      kana: 'おでんわ',
      vietnamese: 'điện thoại (tôn trọng)',
      english: 'telephone (respectful)',
      type: 'main',
      example: 'お電話番号をお願いします。'
    },
    {
      japanese: 'ご連絡',
      kana: 'ごれんらく',
      vietnamese: 'liên lạc (tôn trọng)',
      english: 'contact (respectful)',
      type: 'main',
      example: 'ご連絡をお待ちしております。'
    },
    // Humble forms for self
    {
      japanese: '私ども',
      kana: 'わたくしども',
      vietnamese: 'chúng tôi (khiêm tốn)',
      english: 'we (humble)',
      type: 'main',
      example: '私どもにお任せください。'
    },
    {
      japanese: '弊社',
      kana: 'へいしゃ',
      vietnamese: 'công ty chúng tôi (khiêm tốn)',
      english: 'our company (humble)',
      type: 'main',
      example: '弊社の製品をご覧ください。'
    },
    {
      japanese: '小社',
      kana: 'しょうしゃ',
      vietnamese: 'công ty nhỏ của chúng tôi',
      english: 'our small company (humble)',
      type: 'main',
      example: '小社の商品です。'
    },
    {
      japanese: '粗品',
      kana: 'そしな',
      vietnamese: 'quà nhỏ (khiêm tốn)',
      english: 'small gift (humble)',
      type: 'main',
      example: 'こちらは粗品でございます。'
    },
    {
      japanese: '愚見',
      kana: 'ぐけん',
      vietnamese: 'ý kiến ngu dốt của tôi',
      english: 'my humble opinion',
      type: 'main',
      example: '愚見ですが、申し上げます。'
    },
    // Honorific forms for others
    {
      japanese: '貴社',
      kana: 'きしゃ',
      vietnamese: 'quý công ty',
      english: 'your company (honorific)',
      type: 'main',
      example: '貴社の発展をお祈りします。'
    },
    {
      japanese: '御社',
      kana: 'おんしゃ',
      vietnamese: 'quý công ty (nói)',
      english: 'your company (spoken honorific)',
      type: 'main',
      example: '御社で働きたいです。'
    },
    {
      japanese: 'ご芳名',
      kana: 'ごほうめい',
      vietnamese: 'danh tánh quý',
      english: 'your name (very formal)',
      type: 'main',
      example: 'ご芳名をお書きください。'
    },
    // Additional polite expressions
    {
      japanese: 'でございます',
      kana: 'でございます',
      vietnamese: 'là (trang trọng)',
      english: 'to be (formal)',
      type: 'main',
      example: 'こちらは資料でございます。'
    },
    {
      japanese: 'お待ちしております',
      kana: 'おまちしております',
      vietnamese: 'đang chờ đợi',
      english: 'to be waiting (humble)',
      type: 'main',
      example: 'お返事をお待ちしております。'
    },
    {
      japanese: 'させていただく',
      kana: 'させていただく',
      vietnamese: 'xin phép làm',
      english: 'to humbly do (with permission)',
      type: 'main',
      example: '説明させていただきます。'
    },
    {
      japanese: '失礼いたします',
      kana: 'しつれいいたします',
      vietnamese: 'xin phép',
      english: 'excuse me (formal)',
      type: 'main',
      example: 'それでは失礼いたします。'
    },
    {
      japanese: 'お疲れ様でございます',
      kana: 'おつかれさまでございます',
      vietnamese: 'vất vả rồi (trang trọng)',
      english: 'thank you for your hard work (formal)',
      type: 'main',
      example: 'お疲れ様でございます。'
    },
    {
      japanese: 'ご苦労様です',
      kana: 'ごくろうさまです',
      vietnamese: 'vất vả rồi (dùng cho cấp dưới)',
      english: 'thank you for your trouble (to subordinates)',
      type: 'main',
      example: 'ご苦労様です。'
    },
    {
      japanese: 'お世話になっております',
      kana: 'おせわになっております',
      vietnamese: 'cảm ơn sự giúp đỡ',
      english: 'thank you for your continued support',
      type: 'main',
      example: 'いつもお世話になっております。'
    },
    {
      japanese: 'お忙しいところ',
      kana: 'おいそがしいところ',
      vietnamese: 'mặc dù bận',
      english: 'despite being busy',
      type: 'main',
      example: 'お忙しいところ、ありがとうございます。'
    },
    {
      japanese: 'お手数ですが',
      kana: 'おてすうですが',
      vietnamese: 'xin lỗi làm phiền',
      english: 'sorry to trouble you',
      type: 'main',
      example: 'お手数ですが、お願いします。'
    },
    {
      japanese: 'お手数をおかけします',
      kana: 'おてすうをおかけします',
      vietnamese: 'xin lỗi làm phiền',
      english: 'sorry to trouble you',
      type: 'main',
      example: 'お手数をおかけしますが、お願いします。'
    },
    {
      japanese: 'ご面倒をおかけします',
      kana: 'ごめんどうをおかけします',
      vietnamese: 'xin lỗi làm phiền nhiều',
      english: 'sorry to cause you trouble',
      type: 'main',
      example: 'ご面倒をおかけして申し訳ございません。'
    },
    // Additional expressions
    {
      japanese: 'おられる',
      kana: 'おられる',
      vietnamese: 'có (tôn kính)',
      english: 'to be (honorific)',
      type: 'additional',
      example: '先生はおられますか。'
    },
    {
      japanese: 'お越しになる',
      kana: 'おこしになる',
      vietnamese: 'đến (tôn kính)',
      english: 'to come (honorific)',
      type: 'additional',
      example: 'お越しいただきありがとうございます。'
    },
    {
      japanese: 'お帰りになる',
      kana: 'おかえりになる',
      vietnamese: 'về (tôn kính)',
      english: 'to go home (honorific)',
      type: 'additional',
      example: 'もうお帰りになりますか。'
    },
    {
      japanese: 'お出かけになる',
      kana: 'おでかけになる',
      vietnamese: 'ra ngoài (tôn kính)',
      english: 'to go out (honorific)',
      type: 'additional',
      example: 'どちらへお出かけになりますか。'
    },
    {
      japanese: 'お考えになる',
      kana: 'おかんがえになる',
      vietnamese: 'suy nghĩ (tôn kính)',
      english: 'to think (honorific)',
      type: 'additional',
      example: 'どうお考えになりますか。'
    },
    {
      japanese: 'お決めになる',
      kana: 'おきめになる',
      vietnamese: 'quyết định (tôn kính)',
      english: 'to decide (honorific)',
      type: 'additional',
      example: 'もうお決めになりましたか。'
    },
    {
      japanese: 'お求めになる',
      kana: 'おもとめになる',
      vietnamese: 'mua (tôn kính)',
      english: 'to buy (honorific)',
      type: 'additional',
      example: 'どちらでお求めになりましたか。'
    },
    // Supplementary business expressions
    {
      japanese: '恐れ入ります',
      kana: 'おそれいります',
      vietnamese: 'xin lỗi, cảm ơn (khiêm tốn)',
      english: 'thank you, excuse me (humble)',
      type: 'supplementary',
      example: '恐れ入りますが、お名前を。'
    },
    {
      japanese: '恐縮です',
      kana: 'きょうしゅくです',
      vietnamese: 'xin lỗi, cảm ơn (trang trọng)',
      english: 'thank you, sorry (formal)',
      type: 'supplementary',
      example: 'ご親切に恐縮です。'
    },
    {
      japanese: 'かしこまりました',
      kana: 'かしこまりました',
      vietnamese: 'vâng, tôi hiểu rồi',
      english: 'certainly, I understand (formal)',
      type: 'supplementary',
      example: 'かしこまりました。すぐにご用意いたします。'
    },
    {
      japanese: '承知いたしました',
      kana: 'しょうちいたしました',
      vietnamese: 'tôi đã biết',
      english: 'I understand (humble)',
      type: 'supplementary',
      example: '承知いたしました。'
    },
    {
      japanese: '存じ上げております',
      kana: 'ぞんじあげております',
      vietnamese: 'tôi biết (khiêm tốn cao)',
      english: 'I know (very humble)',
      type: 'supplementary',
      example: 'はい、存じ上げております。'
    },
    {
      japanese: 'よろしくお願いいたします',
      kana: 'よろしくおねがいいたします',
      vietnamese: 'rất mong được làm quen',
      english: 'pleased to meet you (formal)',
      type: 'supplementary',
      example: 'どうぞよろしくお願いいたします。'
    },
    {
      japanese: 'ありがとうございます',
      kana: 'ありがとうございます',
      vietnamese: 'cảm ơn (trang trọng)',
      english: 'thank you (formal)',
      type: 'supplementary',
      example: 'ご協力ありがとうございます。'
    },
    {
      japanese: '申し訳ございません',
      kana: 'もうしわけございません',
      vietnamese: 'xin lỗi (trang trọng)',
      english: 'I\'m sorry (formal)',
      type: 'supplementary',
      example: '申し訳ございません。'
    },
    {
      japanese: 'とんでもございません',
      kana: 'とんでもございません',
      vietnamese: 'không có gì (trang trọng)',
      english: 'not at all (formal)',
      type: 'supplementary',
      example: 'とんでもございません。'
    },
    {
      japanese: 'お待たせいたしました',
      kana: 'おまたせいたしました',
      vietnamese: 'xin lỗi để quý khách chờ đợi',
      english: 'sorry to have kept you waiting (formal)',
      type: 'supplementary',
      example: 'お待たせいたしました。'
    }
  ],
  grammar: [
    {
      pattern: '尊敬語（お〜になる）',
      vietnamese: 'tôn kính ngữ (お〜になる)',
      english: 'honorific form (お〜になる)',
      type: 'main',
      explanation: 'Dạng tôn kính chung cho động từ nhóm I và II. Cấu tạo: お + ます形 + になる. Dùng cho hành động của người có địa vị cao hơn. Với từ Hán Việt dùng ご thay vì お.',
      examples: [
        {
          japanese: '先生はもうお帰りになりましたか。',
          vietnamese: 'Thầy đã về chưa ạ?',
          english: 'Has the teacher already gone home?',
          type: 'main'
        },
        {
          japanese: '社長がお話しになります。',
          vietnamese: 'Giám đốc sẽ nói.',
          english: 'The president will speak.',
          type: 'main'
        },
        {
          japanese: 'どちらにお住まいになりますか。',
          vietnamese: 'Anh ở đâu ạ?',
          english: 'Where do you live?',
          type: 'main'
        },
        {
          japanese: 'ご利用になりますか。',
          vietnamese: 'Quý khách có sử dụng không ạ?',
          english: 'Will you use it?',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '尊敬語（〜れる/られる）',
      vietnamese: 'tôn kính ngữ (〜れる/られる)',
      english: 'honorific form (〜れる/られる)',
      type: 'main',
      explanation: 'Dạng tôn kính dùng thể bị động. Cấu tạo giống thể bị động: Nhóm I: a段 + れる, Nhóm II: る → られる. Ít trang trọng hơn お〜になる.',
      examples: [
        {
          japanese: '先生が書かれた本です。',
          vietnamese: 'Đây là sách thầy viết.',
          english: 'This is the book written by the teacher.',
          type: 'main'
        },
        {
          japanese: '社長は何時に来られますか。',
          vietnamese: 'Giám đốc đến lúc mấy giờ ạ?',
          english: 'What time will the president come?',
          type: 'main'
        },
        {
          japanese: 'お客様が待たれています。',
          vietnamese: 'Khách hàng đang chờ.',
          english: 'The customer is waiting.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '謙譲語（お〜する/いたす）',
      vietnamese: 'khiêm tốn ngữ (お〜する/いたす)',
      english: 'humble form (お〜する/いたす)',
      type: 'main',
      explanation: 'Dạng khiêm tốn chung cho động từ. Cấu tạo: お + ます形 + する/いたす. Dùng khi người nói làm điều gì cho người có địa vị cao hơn. いたす trang trọng hơn する.',
      examples: [
        {
          japanese: '私がお送りいたします。',
          vietnamese: 'Tôi sẽ đưa anh.',
          english: 'I will escort you.',
          type: 'main'
        },
        {
          japanese: 'お手伝いしましょうか。',
          vietnamese: 'Để tôi giúp anh nhé?',
          english: 'Shall I help you?',
          type: 'main'
        },
        {
          japanese: 'ご案内いたします。',
          vietnamese: 'Tôi sẽ hướng dẫn.',
          english: 'I will guide you.',
          type: 'main'
        },
        {
          japanese: 'ご説明いたします。',
          vietnamese: 'Tôi sẽ giải thích.',
          english: 'I will explain.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '特別な尊敬語',
      vietnamese: 'tôn kính ngữ đặc biệt',
      english: 'special honorific verbs',
      type: 'main',
      explanation: 'Một số động từ có dạng tôn kính đặc biệt riêng: いる→いらっしゃる、言う→おっしゃる、する→なさる、見る→ご覧になる、食べる/飲む→召し上がる、知っている→ご存じ、もらう→くださる.',
      examples: [
        {
          japanese: '先生はいらっしゃいますか。',
          vietnamese: 'Thầy có mặt không ạ?',
          english: 'Is the teacher here?',
          type: 'main'
        },
        {
          japanese: '何とおっしゃいましたか。',
          vietnamese: 'Anh nói gì ạ?',
          english: 'What did you say?',
          type: 'main'
        },
        {
          japanese: 'もう召し上がりましたか。',
          vietnamese: 'Anh đã dùng chưa ạ?',
          english: 'Have you eaten yet?',
          type: 'main'
        },
        {
          japanese: 'この件をご存じですか。',
          vietnamese: 'Anh có biết việc này không ạ?',
          english: 'Do you know about this matter?',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '特別な謙譲語',
      vietnamese: 'khiêm tốn ngữ đặc biệt',
      english: 'special humble verbs',
      type: 'main',
      explanation: 'Một số động từ có dạng khiêm tốn đặc biệt: 行く/来る→参る/伺う、言う→申す/申し上げる、する→いたす、見る→拝見する、もらう/食べる/飲む→いただく、知る→存じる、会う→お目にかかる、聞く→承る.',
      examples: [
        {
          japanese: '田中と申します。',
          vietnamese: 'Tôi tên là Tanaka.',
          english: 'My name is Tanaka.',
          type: 'main'
        },
        {
          japanese: '明日伺います。',
          vietnamese: 'Ngày mai tôi sẽ đến.',
          english: 'I will visit tomorrow.',
          type: 'main'
        },
        {
          japanese: '資料を拝見いたしました。',
          vietnamese: 'Tôi đã xem tài liệu.',
          english: 'I have looked at the documents.',
          type: 'main'
        },
        {
          japanese: 'お目にかかれて光栄です。',
          vietnamese: 'Tôi rất vinh dự được gặp anh.',
          english: 'It\'s an honor to meet you.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: 'でございます',
      vietnamese: 'でございます (trang trọng)',
      english: 'でございます (formal)',
      type: 'main',
      explanation: 'Dạng trang trọng của です. Dùng trong văn nói rất lịch sự, đặc biệt trong kinh doanh, dịch vụ khách hàng.',
      examples: [
        {
          japanese: 'こちらが資料でございます。',
          vietnamese: 'Đây là tài liệu ạ.',
          english: 'This is the document.',
          type: 'main'
        },
        {
          japanese: '私は田中でございます。',
          vietnamese: 'Tôi là Tanaka ạ.',
          english: 'I am Tanaka.',
          type: 'main'
        },
        {
          japanese: '本日は良いお天気でございます。',
          vietnamese: 'Hôm nay thời tiết đẹp ạ.',
          english: 'The weather is nice today.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: 'させていただく',
      vietnamese: 'させていただく (xin phép làm)',
      english: 'させていただく (humbly do with permission)',
      type: 'additional',
      explanation: 'Kết hợp thể sai khiến và いただく, biểu thị xin phép làm điều gì một cách khiêm tốn. Dùng khi muốn thể hiện sự tôn trọng và xin phép.',
      examples: [
        {
          japanese: '説明させていただきます。',
          vietnamese: 'Xin phép tôi được giải thích.',
          english: 'Allow me to explain.',
          type: 'main'
        },
        {
          japanese: '私がやらせていただきます。',
          vietnamese: 'Xin phép tôi làm.',
          english: 'Allow me to do it.',
          type: 'main'
        },
        {
          japanese: 'お休みさせていただきます。',
          vietnamese: 'Xin phép tôi được nghỉ.',
          english: 'Please allow me to take time off.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: 'お/ご〜ください',
      vietnamese: 'お/ご〜ください (xin mời)',
      english: 'お/ご〜ください (please do)',
      type: 'additional',
      explanation: 'Dạng yêu cầu lịch sự. Cấu tạo: お + ます形 + ください hoặc ご + từ Hán + ください.',
      examples: [
        {
          japanese: 'お座りください。',
          vietnamese: 'Xin mời ngồi.',
          english: 'Please sit down.',
          type: 'main'
        },
        {
          japanese: 'ご利用ください。',
          vietnamese: 'Xin mời sử dụng.',
          english: 'Please use it.',
          type: 'main'
        },
        {
          japanese: 'お待ちください。',
          vietnamese: 'Xin vui lòng đợi.',
          english: 'Please wait.',
          type: 'additional'
        }
      ]
    }
  ]
};

/**
 * N4 Core Lessons — Lesson 07: Giving and Receiving
 * Focus: あげる、くれる、もらう and their humble/honorific forms
 */

import type { LessonData } from '$lib/types';

export const LESSON_07_DATA: LessonData = {
  lessonNumber: 7,
  title: '授受表現 (Cách cho và nhận)',
  vocabulary: [
    // Giving and receiving verbs
    {
      japanese: 'あげる',
      kana: 'あげる',
      vietnamese: 'cho (tôi cho người khác)',
      english: 'to give',
      type: 'main',
      example: '友達に本をあげました。'
    },
    {
      japanese: 'くれる',
      kana: 'くれる',
      vietnamese: 'cho (người khác cho tôi)',
      english: 'to give (to me)',
      type: 'main',
      example: '友達が本をくれました。'
    },
    {
      japanese: 'もらう',
      kana: 'もらう',
      vietnamese: 'nhận',
      english: 'to receive',
      type: 'main',
      example: '友達に本をもらいました。'
    },
    {
      japanese: 'さしあげる',
      kana: 'さしあげる',
      vietnamese: 'cho (khiêm tốn)',
      english: 'to give (humble)',
      type: 'main',
      example: '先生に花をさしあげました。'
    },
    {
      japanese: 'くださる',
      kana: 'くださる',
      vietnamese: 'cho (tôn kính)',
      english: 'to give (honorific)',
      type: 'main',
      example: '先生が本をくださいました。'
    },
    {
      japanese: 'いただく',
      kana: 'いただく',
      vietnamese: 'nhận (khiêm tốn)',
      english: 'to receive (humble)',
      type: 'main',
      example: '先生に本をいただきました。'
    },
    {
      japanese: 'やる',
      kana: 'やる',
      vietnamese: 'cho (thân mật, cho động vật/cây)',
      english: 'to give (casual, for animals/plants)',
      type: 'main',
      example: '犬に餌をやります。'
    },
    // Related verbs
    {
      japanese: '送る',
      kana: 'おくる',
      vietnamese: 'gửi',
      english: 'to send',
      type: 'main',
      example: '友達にプレゼントを送りました。'
    },
    {
      japanese: '届ける',
      kana: 'とどける',
      vietnamese: 'chuyển đến',
      english: 'to deliver',
      type: 'main',
      example: '荷物を届けてもらいました。'
    },
    {
      japanese: '渡す',
      kana: 'わたす',
      vietnamese: 'trao, đưa',
      english: 'to hand over',
      type: 'main',
      example: 'メッセージを渡してください。'
    },
    {
      japanese: '受け取る',
      kana: 'うけとる',
      vietnamese: 'nhận lấy',
      english: 'to receive, to accept',
      type: 'main',
      example: '荷物を受け取りました。'
    },
    {
      japanese: '貸す',
      kana: 'かす',
      vietnamese: 'cho mượn',
      english: 'to lend',
      type: 'main',
      example: '友達に傘を貸してあげました。'
    },
    {
      japanese: '借りる',
      kana: 'かりる',
      vietnamese: 'mượn',
      english: 'to borrow',
      type: 'main',
      example: '友達に本を借りました。'
    },
    {
      japanese: '返す',
      kana: 'かえす',
      vietnamese: 'trả lại',
      english: 'to return',
      type: 'main',
      example: '来週本を返します。'
    },
    {
      japanese: '教える',
      kana: 'おしえる',
      vietnamese: 'dạy, chỉ dẫn',
      english: 'to teach, to tell',
      type: 'main',
      example: '道を教えてくれました。'
    },
    {
      japanese: '伝える',
      kana: 'つたえる',
      vietnamese: 'truyền đạt',
      english: 'to convey, to tell',
      type: 'main',
      example: 'メッセージを伝えてください。'
    },
    {
      japanese: '紹介する',
      kana: 'しょうかいする',
      vietnamese: 'giới thiệu',
      english: 'to introduce',
      type: 'main',
      example: '友達を紹介してくれました。'
    },
    {
      japanese: '案内する',
      kana: 'あんないする',
      vietnamese: 'hướng dẫn',
      english: 'to guide',
      type: 'main',
      example: '街を案内してもらいました。'
    },
    {
      japanese: '手伝う',
      kana: 'てつだう',
      vietnamese: 'giúp đỡ',
      english: 'to help',
      type: 'main',
      example: '引っ越しを手伝ってくれました。'
    },
    {
      japanese: '助ける',
      kana: 'たすける',
      vietnamese: 'cứu giúp',
      english: 'to save, to help',
      type: 'main',
      example: '困った時に助けてくれました。'
    },
    // Nouns related to giving and receiving
    {
      japanese: 'プレゼント',
      kana: 'プレゼント',
      vietnamese: 'quà tặng',
      english: 'present, gift',
      type: 'main',
      example: '誕生日にプレゼントをもらいました。'
    },
    {
      japanese: '贈り物',
      kana: 'おくりもの',
      vietnamese: 'quà biếu',
      english: 'gift',
      type: 'main',
      example: '結婚式に贈り物をあげました。'
    },
    {
      japanese: 'お土産',
      kana: 'おみやげ',
      vietnamese: 'quà lưu niệm',
      english: 'souvenir',
      type: 'main',
      example: '旅行でお土産を買ってきました。'
    },
    {
      japanese: 'お祝い',
      kana: 'おいわい',
      vietnamese: 'lời chúc mừng',
      english: 'celebration, congratulations',
      type: 'main',
      example: '誕生日のお祝いをもらいました。'
    },
    {
      japanese: 'お礼',
      kana: 'おれい',
      vietnamese: 'lời cảm ơn',
      english: 'thanks, gratitude',
      type: 'main',
      example: 'お礼に食事をおごりました。'
    },
    {
      japanese: '親切',
      kana: 'しんせつ',
      vietnamese: 'tử tế',
      english: 'kindness',
      type: 'main',
      example: '親切にしてくれました。'
    },
    {
      japanese: 'お世話',
      kana: 'おせわ',
      vietnamese: 'sự chăm sóc',
      english: 'care, assistance',
      type: 'main',
      example: 'いつもお世話になっています。'
    },
    {
      japanese: '恩',
      kana: 'おん',
      vietnamese: 'ơn huệ',
      english: 'favor, debt of gratitude',
      type: 'main',
      example: '先生の恩は忘れません。'
    },
    {
      japanese: '恩返し',
      kana: 'おんがえし',
      vietnamese: 'báo ơn',
      english: 'repaying a favor',
      type: 'main',
      example: '恩返しがしたいです。'
    },
    {
      japanese: '感謝',
      kana: 'かんしゃ',
      vietnamese: 'lòng biết ơn',
      english: 'gratitude',
      type: 'main',
      example: '感謝の気持ちを伝えました。'
    },
    // People and relationships
    {
      japanese: '恩人',
      kana: 'おんじん',
      vietnamese: 'ân nhân',
      english: 'benefactor',
      type: 'additional',
      example: '彼は私の恩人です。'
    },
    {
      japanese: '友人',
      kana: 'ゆうじん',
      vietnamese: 'bạn bè',
      english: 'friend (formal)',
      type: 'additional',
      example: '友人にプレゼントをあげました。'
    },
    {
      japanese: '知人',
      kana: 'ちじん',
      vietnamese: 'người quen',
      english: 'acquaintance',
      type: 'additional',
      example: '知人に会いました。'
    },
    {
      japanese: '先輩',
      kana: 'せんぱい',
      vietnamese: 'tiền bối',
      english: 'senior',
      type: 'main',
      example: '先輩にアドバイスをもらいました。'
    },
    {
      japanese: '後輩',
      kana: 'こうはい',
      vietnamese: 'hậu bối',
      english: 'junior',
      type: 'main',
      example: '後輩に仕事を教えてあげました。'
    },
    {
      japanese: '同僚',
      kana: 'どうりょう',
      vietnamese: 'đồng nghiệp',
      english: 'colleague',
      type: 'main',
      example: '同僚に手伝ってもらいました。'
    },
    {
      japanese: '上司',
      kana: 'じょうし',
      vietnamese: 'cấp trên',
      english: 'boss, superior',
      type: 'main',
      example: '上司にアドバイスをいただきました。'
    },
    {
      japanese: '部下',
      kana: 'ぶか',
      vietnamese: 'cấp dưới',
      english: 'subordinate',
      type: 'main',
      example: '部下に仕事を任せました。'
    },
    {
      japanese: '客',
      kana: 'きゃく',
      vietnamese: 'khách',
      english: 'guest, customer',
      type: 'main',
      example: 'お客様にお茶をさしあげました。'
    },
    {
      japanese: '近所',
      kana: 'きんじょ',
      vietnamese: 'hàng xóm',
      english: 'neighborhood',
      type: 'main',
      example: '近所の人にお土産をあげました。'
    },
    // Actions and expressions
    {
      japanese: 'おごる',
      kana: 'おごる',
      vietnamese: 'mời (trả tiền)',
      english: 'to treat (pay for someone)',
      type: 'additional',
      example: '友達にご飯をおごってもらいました。'
    },
    {
      japanese: '迷惑をかける',
      kana: 'めいわくをかける',
      vietnamese: 'làm phền',
      english: 'to cause trouble',
      type: 'additional',
      example: '迷惑をかけてすみません。'
    },
    {
      japanese: '世話をする',
      kana: 'せわをする',
      vietnamese: 'chăm sóc',
      english: 'to take care of',
      type: 'additional',
      example: '犬の世話をしてもらいました。'
    },
    {
      japanese: '面倒を見る',
      kana: 'めんどうをみる',
      vietnamese: 'chăm sóc, trông nom',
      english: 'to take care of',
      type: 'additional',
      example: '弟の面倒を見てくれました。'
    },
    {
      japanese: '迎えに来る',
      kana: 'むかえにくる',
      vietnamese: 'đến đón',
      english: 'to come to pick up',
      type: 'additional',
      example: '駅まで迎えに来てくれました。'
    },
    {
      japanese: '送る',
      kana: 'おくる',
      vietnamese: 'đưa đi',
      english: 'to see off',
      type: 'additional',
      example: '家まで送ってくれました。'
    },
    {
      japanese: '預かる',
      kana: 'あずかる',
      vietnamese: 'giữ hộ',
      english: 'to keep, to look after',
      type: 'additional',
      example: '荷物を預かってもらいました。'
    },
    {
      japanese: '預ける',
      kana: 'あずける',
      vietnamese: 'gửi, ký thác',
      english: 'to deposit, to entrust',
      type: 'additional',
      example: '荷物を預けました。'
    },
    // Supplementary expressions
    {
      japanese: 'どういたしまして',
      kana: 'どういたしまして',
      vietnamese: 'không có chi',
      english: 'you\'re welcome',
      type: 'supplementary',
      example: 'ありがとう。どういたしまして。'
    },
    {
      japanese: 'お世話になります',
      kana: 'おせわになります',
      vietnamese: 'nhờ sự giúp đỡ của bạn',
      english: 'thank you for your help',
      type: 'supplementary',
      example: 'いつもお世話になります。'
    },
    {
      japanese: 'お世話になりました',
      kana: 'おせわになりました',
      vietnamese: 'cảm ơn đã giúp đỡ',
      english: 'thank you for your help (past)',
      type: 'supplementary',
      example: '本当にお世話になりました。'
    },
    {
      japanese: 'お疲れ様でした',
      kana: 'おつかれさまでした',
      vietnamese: 'anh/chị vất vả rồi',
      english: 'thank you for your hard work',
      type: 'supplementary',
      example: 'お疲れ様でした。'
    },
    {
      japanese: 'ご苦労様でした',
      kana: 'ごくろうさまでした',
      vietnamese: 'anh/chị đã vất vả (dùng cho cấp dưới)',
      english: 'thank you for your trouble (to subordinates)',
      type: 'supplementary',
      example: 'ご苦労様でした。'
    },
    {
      japanese: 'いただきます',
      kana: 'いただきます',
      vietnamese: 'xin phép dùng (trước bữa ăn)',
      english: 'thank you for the meal (before eating)',
      type: 'supplementary',
      example: 'いただきます。'
    },
    {
      japanese: 'ごちそうさまでした',
      kana: 'ごちそうさまでした',
      vietnamese: 'cảm ơn bữa ăn',
      english: 'thank you for the meal (after eating)',
      type: 'supplementary',
      example: 'ごちそうさまでした。'
    },
    {
      japanese: 'お待たせしました',
      kana: 'おまたせしました',
      vietnamese: 'xin lỗi đã để bạn đợi',
      english: 'sorry to keep you waiting',
      type: 'supplementary',
      example: 'お待たせしました。'
    },
    {
      japanese: 'お邪魔しました',
      kana: 'おじゃましました',
      vietnamese: 'xin lỗi đã làm phền',
      english: 'sorry for intruding (when leaving)',
      type: 'supplementary',
      example: 'お邪魔しました。'
    },
    {
      japanese: 'お陰様で',
      kana: 'おかげさまで',
      vietnamese: 'nhờ ơn anh/chị',
      english: 'thanks to you',
      type: 'supplementary',
      example: 'お陰様で元気です。'
    }
  ],
  grammar: [
    {
      pattern: '〜てあげる',
      vietnamese: 'làm ~ cho (người khác)',
      english: 'to do ~ for (someone)',
      type: 'main',
      explanation: 'Biểu thị hành động mà người nói hoặc người trong nhóm của người nói làm cho người khác. Chủ ngữ là người làm. Người nhận lợi ích được đánh dấu bằng に.',
      examples: [
        {
          japanese: '友達に日本語を教えてあげました。',
          vietnamese: 'Tôi đã dạy tiếng Nhật cho bạn.',
          english: 'I taught Japanese to my friend.',
          type: 'main'
        },
        {
          japanese: '母に手紙を書いてあげました。',
          vietnamese: 'Tôi đã viết thư cho mẹ.',
          english: 'I wrote a letter for my mother.',
          type: 'main'
        },
        {
          japanese: '荷物を持ってあげましょうか。',
          vietnamese: 'Để tôi mang hành lý cho bạn nhé?',
          english: 'Shall I carry your luggage for you?',
          type: 'main'
        },
        {
          japanese: '弟に本を読んであげました。',
          vietnamese: 'Tôi đọc sách cho em trai.',
          english: 'I read a book to my younger brother.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '〜てくれる',
      vietnamese: 'làm ~ cho tôi',
      english: 'to do ~ for me',
      type: 'main',
      explanation: 'Biểu thị hành động mà người khác làm cho người nói hoặc người trong nhóm của người nói. Người nói là người nhận lợi ích. Chủ ngữ là người làm (được đánh dấu bằng が).',
      examples: [
        {
          japanese: '友達が日本語を教えてくれました。',
          vietnamese: 'Bạn tôi đã dạy tiếng Nhật cho tôi.',
          english: 'My friend taught me Japanese.',
          type: 'main'
        },
        {
          japanese: '母が手紙を書いてくれました。',
          vietnamese: 'Mẹ đã viết thư cho tôi.',
          english: 'My mother wrote a letter for me.',
          type: 'main'
        },
        {
          japanese: '手伝ってくれませんか。',
          vietnamese: 'Bạn có thể giúp tôi không?',
          english: 'Could you help me?',
          type: 'main'
        },
        {
          japanese: '駅まで送ってくれました。',
          vietnamese: 'Họ đã đưa tôi đến ga.',
          english: 'They took me to the station.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '〜てもらう',
      vietnamese: 'được người khác làm ~ cho',
      english: 'to have someone do ~ for me',
      type: 'main',
      explanation: 'Biểu thị người nói nhận được hành động từ người khác. Người nói là người nhận lợi ích. Người làm được đánh dấu bằng に.',
      examples: [
        {
          japanese: '友達に日本語を教えてもらいました。',
          vietnamese: 'Tôi được bạn dạy tiếng Nhật.',
          english: 'I had my friend teach me Japanese.',
          type: 'main'
        },
        {
          japanese: '先生に推薦状を書いてもらいました。',
          vietnamese: 'Tôi được thầy viết thư giới thiệu.',
          english: 'I had my teacher write a letter of recommendation.',
          type: 'main'
        },
        {
          japanese: '友達に駅まで送ってもらいました。',
          vietnamese: 'Tôi được bạn đưa đến ga.',
          english: 'I had my friend take me to the station.',
          type: 'main'
        },
        {
          japanese: '写真を撮ってもらえますか。',
          vietnamese: 'Bạn có thể chụp ảnh cho tôi được không?',
          english: 'Could you take a picture for me?',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '〜てさしあげる',
      vietnamese: 'làm ~ cho (khiêm tốn)',
      english: 'to do ~ for (humble)',
      type: 'main',
      explanation: 'Dạng khiêm tốn của 〜てあげる. Dùng khi người nói làm điều gì đó cho người có địa vị cao hơn (giáo viên, khách hàng, v.v.).',
      examples: [
        {
          japanese: '先生の荷物を持ってさしあげました。',
          vietnamese: 'Tôi đã mang hành lý cho thầy.',
          english: 'I carried my teacher\'s luggage.',
          type: 'main'
        },
        {
          japanese: 'お客様をご案内してさしあげます。',
          vietnamese: 'Tôi sẽ hướng dẫn quý khách.',
          english: 'I will guide the customer.',
          type: 'main'
        }
      ]
    },
    {
      pattern: '〜てくださる',
      vietnamese: 'làm ~ cho tôi (tôn kính)',
      english: 'to do ~ for me (honorific)',
      type: 'main',
      explanation: 'Dạng tôn kính của 〜てくれる. Dùng khi người có địa vị cao hơn làm điều gì đó cho người nói.',
      examples: [
        {
          japanese: '先生が推薦状を書いてくださいました。',
          vietnamese: 'Thầy đã viết thư giới thiệu cho tôi.',
          english: 'My teacher wrote a letter of recommendation for me.',
          type: 'main'
        },
        {
          japanese: '社長が説明してくださいました。',
          vietnamese: 'Giám đốc đã giải thích cho tôi.',
          english: 'The president explained to me.',
          type: 'main'
        },
        {
          japanese: '教えてくださいませんか。',
          vietnamese: 'Thầy có thể dạy cho em được không ạ?',
          english: 'Could you please teach me?',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '〜ていただく',
      vietnamese: 'được người khác làm ~ cho (khiêm tốn)',
      english: 'to have someone do ~ for me (humble)',
      type: 'main',
      explanation: 'Dạng khiêm tốn của 〜てもらう. Dùng khi người nói nhận được hành động từ người có địa vị cao hơn.',
      examples: [
        {
          japanese: '先生に推薦状を書いていただきました。',
          vietnamese: 'Tôi được thầy viết thư giới thiệu.',
          english: 'I had my teacher write a letter of recommendation.',
          type: 'main'
        },
        {
          japanese: '社長にアドバイスをいただきました。',
          vietnamese: 'Tôi được giám đốc cho lời khuyên.',
          english: 'I received advice from the president.',
          type: 'main'
        },
        {
          japanese: '見ていただけますか。',
          vietnamese: 'Anh có thể xem giúp tôi được không?',
          english: 'Could you please look at it for me?',
          type: 'additional'
        }
      ]
    },
    {
      pattern: 'あげる/くれる/もらう (物)',
      vietnamese: 'cho/nhận (đồ vật)',
      english: 'to give/receive (objects)',
      type: 'additional',
      explanation: 'Dùng trực tiếp với danh từ để biểu thị cho và nhận đồ vật.',
      examples: [
        {
          japanese: '友達に本をあげました。',
          vietnamese: 'Tôi cho bạn một quyển sách.',
          english: 'I gave my friend a book.',
          type: 'main'
        },
        {
          japanese: '友達が本をくれました。',
          vietnamese: 'Bạn tôi cho tôi một quyển sách.',
          english: 'My friend gave me a book.',
          type: 'main'
        },
        {
          japanese: '友達に本をもらいました。',
          vietnamese: 'Tôi nhận được sách từ bạn.',
          english: 'I received a book from my friend.',
          type: 'main'
        }
      ]
    }
  ]
};

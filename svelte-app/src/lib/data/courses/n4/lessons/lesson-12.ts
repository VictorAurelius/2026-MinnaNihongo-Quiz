/**
 * N4 Core Lessons — Lesson 12: Potential Form
 * Ability and possibility expressions
 */

import type { LessonData } from '$lib/types';

export const LESSON_12_DATA: LessonData = {
  lessonNumber: 12,
  title: '可能形 (Thể khả năng)',
  vocabulary: [
    // Ability verbs
    {
      japanese: 'できる',
      kana: 'できる',
      vietnamese: 'có thể làm được',
      english: 'can do, to be able to',
      type: 'main',
      example: '日本語ができます。'
    },
    {
      japanese: '泳げる',
      kana: 'およげる',
      vietnamese: 'có thể bơi',
      english: 'can swim',
      type: 'main',
      example: '私は泳げます。'
    },
    {
      japanese: '書ける',
      kana: 'かける',
      vietnamese: 'có thể viết',
      english: 'can write',
      type: 'main',
      example: '漢字が書けます。'
    },
    {
      japanese: '読める',
      kana: 'よめる',
      vietnamese: 'có thể đọc',
      english: 'can read',
      type: 'main',
      example: 'ひらがなが読めます。'
    },
    {
      japanese: '話せる',
      kana: 'はなせる',
      vietnamese: 'có thể nói',
      english: 'can speak',
      type: 'main',
      example: '英語が話せます。'
    },
    {
      japanese: '聞ける',
      kana: 'きける',
      vietnamese: 'có thể nghe',
      english: 'can hear, can listen',
      type: 'main',
      example: '音楽が聞けます。'
    },
    {
      japanese: '見られる',
      kana: 'みられる',
      vietnamese: 'có thể xem',
      english: 'can see, can watch',
      type: 'main',
      example: 'この映画は見られますか。'
    },
    {
      japanese: '食べられる',
      kana: 'たべられる',
      vietnamese: 'có thể ăn',
      english: 'can eat',
      type: 'main',
      example: '辛い物が食べられます。'
    },
    {
      japanese: '飲める',
      kana: 'のめる',
      vietnamese: 'có thể uống',
      english: 'can drink',
      type: 'main',
      example: 'お酒が飲めます。'
    },
    {
      japanese: '行ける',
      kana: 'いける',
      vietnamese: 'có thể đi',
      english: 'can go',
      type: 'main',
      example: '明日は行けません。'
    },
    {
      japanese: '来られる',
      kana: 'こられる',
      vietnamese: 'có thể đến',
      english: 'can come',
      type: 'main',
      example: 'パーティーに来られますか。'
    },
    {
      japanese: '使える',
      kana: 'つかえる',
      vietnamese: 'có thể sử dụng',
      english: 'can use',
      type: 'main',
      example: 'パソコンが使えます。'
    },

    // Skills and abilities
    {
      japanese: '運転',
      kana: 'うんてん',
      vietnamese: 'lái xe',
      english: 'driving',
      type: 'main',
      example: '車の運転ができます。'
    },
    {
      japanese: '料理',
      kana: 'りょうり',
      vietnamese: 'nấu ăn, món ăn',
      english: 'cooking, cuisine',
      type: 'main',
      example: '日本料理が作れます。'
    },
    {
      japanese: '楽器',
      kana: 'がっき',
      vietnamese: 'nhạc cụ',
      english: 'musical instrument',
      type: 'main',
      example: '楽器が弾けますか。'
    },
    {
      japanese: 'ピアノ',
      kana: 'ピアノ',
      vietnamese: 'đàn piano',
      english: 'piano',
      type: 'main',
      example: 'ピアノが弾けます。'
    },
    {
      japanese: 'ギター',
      kana: 'ギター',
      vietnamese: 'đàn guitar',
      english: 'guitar',
      type: 'main',
      example: 'ギターが弾けません。'
    },
    {
      japanese: 'スポーツ',
      kana: 'スポーツ',
      vietnamese: 'thể thao',
      english: 'sports',
      type: 'main',
      example: 'スポーツができますか。'
    },
    {
      japanese: 'サッカー',
      kana: 'サッカー',
      vietnamese: 'bóng đá',
      english: 'soccer, football',
      type: 'main',
      example: 'サッカーができます。'
    },
    {
      japanese: 'テニス',
      kana: 'テニス',
      vietnamese: 'tennis',
      english: 'tennis',
      type: 'main',
      example: 'テニスができません。'
    },
    {
      japanese: '野球',
      kana: 'やきゅう',
      vietnamese: 'bóng chày',
      english: 'baseball',
      type: 'main',
      example: '野球ができますか。'
    },

    // Languages
    {
      japanese: '日本語',
      kana: 'にほんご',
      vietnamese: 'tiếng Nhật',
      english: 'Japanese language',
      type: 'main',
      example: '日本語が話せます。'
    },
    {
      japanese: '英語',
      kana: 'えいご',
      vietnamese: 'tiếng Anh',
      english: 'English language',
      type: 'main',
      example: '英語が話せますか。'
    },
    {
      japanese: '中国語',
      kana: 'ちゅうごくご',
      vietnamese: 'tiếng Trung',
      english: 'Chinese language',
      type: 'main',
      example: '中国語が話せません。'
    },
    {
      japanese: '韓国語',
      kana: 'かんこくご',
      vietnamese: 'tiếng Hàn',
      english: 'Korean language',
      type: 'main',
      example: '韓国語が話せますか。'
    },
    {
      japanese: '外国語',
      kana: 'がいこくご',
      vietnamese: 'ngoại ngữ',
      english: 'foreign language',
      type: 'main',
      example: '外国語が話せます。'
    },

    // Possibility and conditions
    {
      japanese: '可能',
      kana: 'かのう',
      vietnamese: 'có thể, khả năng',
      english: 'possible, capability',
      type: 'main',
      example: 'それは可能です。'
    },
    {
      japanese: '不可能',
      kana: 'ふかのう',
      vietnamese: 'không thể',
      english: 'impossible',
      type: 'main',
      example: 'それは不可能です。'
    },
    {
      japanese: '能力',
      kana: 'のうりょく',
      vietnamese: 'năng lực',
      english: 'ability, capacity',
      type: 'main',
      example: '能力がありますか。'
    },
    {
      japanese: '上手',
      kana: 'じょうず',
      vietnamese: 'giỏi',
      english: 'skillful, good at',
      type: 'main',
      example: '料理が上手です。'
    },
    {
      japanese: '下手',
      kana: 'へた',
      vietnamese: 'kém',
      english: 'unskillful, poor at',
      type: 'main',
      example: '歌が下手です。'
    },
    {
      japanese: '得意',
      kana: 'とくい',
      vietnamese: 'giỏi, sở trường',
      english: 'strong point, good at',
      type: 'main',
      example: '数学が得意です。'
    },
    {
      japanese: '苦手',
      kana: 'にがて',
      vietnamese: 'yếu, không giỏi',
      english: 'weak point, poor at',
      type: 'main',
      example: '英語が苦手です。'
    },

    // Actions and activities
    {
      japanese: '習う',
      kana: 'ならう',
      vietnamese: 'học',
      english: 'to learn',
      type: 'main',
      example: 'ピアノを習っています。'
    },
    {
      japanese: '練習',
      kana: 'れんしゅう',
      vietnamese: 'luyện tập',
      english: 'practice',
      type: 'main',
      example: '毎日練習します。'
    },
    {
      japanese: '勉強',
      kana: 'べんきょう',
      vietnamese: 'học tập',
      english: 'study',
      type: 'main',
      example: '日本語を勉強しています。'
    },
    {
      japanese: '覚える',
      kana: 'おぼえる',
      vietnamese: 'nhớ, ghi nhớ',
      english: 'to memorize, to remember',
      type: 'main',
      example: '漢字を覚えます。'
    },
    {
      japanese: '忘れる',
      kana: 'わすれる',
      vietnamese: 'quên',
      english: 'to forget',
      type: 'main',
      example: '名前を忘れました。'
    },

    // Additional vocabulary
    {
      japanese: '試す',
      kana: 'ためす',
      vietnamese: 'thử',
      english: 'to try, to test',
      type: 'additional',
      example: 'やってみます。'
    },
    {
      japanese: '挑戦',
      kana: 'ちょうせん',
      vietnamese: 'thách thức',
      english: 'challenge',
      type: 'additional',
      example: '新しいことに挑戦します。'
    },
    {
      japanese: '努力',
      kana: 'どりょく',
      vietnamese: 'nỗ lực',
      english: 'effort',
      type: 'additional',
      example: '努力すれば、できます。'
    },
    {
      japanese: '頑張る',
      kana: 'がんばる',
      vietnamese: 'cố gắng',
      english: 'to do one\'s best',
      type: 'additional',
      example: '頑張ってください。'
    },
    {
      japanese: '諦める',
      kana: 'あきらめる',
      vietnamese: 'từ bỏ',
      english: 'to give up',
      type: 'additional',
      example: '諦めないでください。'
    },
    {
      japanese: '成功',
      kana: 'せいこう',
      vietnamese: 'thành công',
      english: 'success',
      type: 'additional',
      example: '成功しました。'
    },
    {
      japanese: '失敗',
      kana: 'しっぱい',
      vietnamese: 'thất bại',
      english: 'failure',
      type: 'additional',
      example: '失敗しても大丈夫です。'
    },
    {
      japanese: '経験',
      kana: 'けいけん',
      vietnamese: 'kinh nghiệm',
      english: 'experience',
      type: 'additional',
      example: '経験があります。'
    },
    {
      japanese: '資格',
      kana: 'しかく',
      vietnamese: 'bằng cấp, chứng chỉ',
      english: 'qualification, license',
      type: 'additional',
      example: '運転免許の資格があります。'
    },
    {
      japanese: '免許',
      kana: 'めんきょ',
      vietnamese: 'giấy phép',
      english: 'license',
      type: 'additional',
      example: '運転免許を持っています。'
    },
    {
      japanese: '技術',
      kana: 'ぎじゅつ',
      vietnamese: 'kỹ thuật',
      english: 'technique, technology',
      type: 'additional',
      example: '技術があります。'
    },
    {
      japanese: '才能',
      kana: 'さいのう',
      vietnamese: 'tài năng',
      english: 'talent',
      type: 'additional',
      example: '才能があります。'
    },
    {
      japanese: '趣味',
      kana: 'しゅみ',
      vietnamese: 'sở thích',
      english: 'hobby',
      type: 'additional',
      example: '趣味は何ですか。'
    },
    {
      japanese: '特技',
      kana: 'とくぎ',
      vietnamese: 'kỹ năng đặc biệt',
      english: 'special skill',
      type: 'additional',
      example: '特技は料理です。'
    },
    {
      japanese: '弾く',
      kana: 'ひく',
      vietnamese: 'chơi (nhạc cụ dây)',
      english: 'to play (string instrument)',
      type: 'additional',
      example: 'ピアノを弾きます。'
    },
    {
      japanese: '吹く',
      kana: 'ふく',
      vietnamese: 'thổi (nhạc cụ)',
      english: 'to blow, to play (wind instrument)',
      type: 'additional',
      example: 'フルートを吹きます。'
    },
    {
      japanese: '歌う',
      kana: 'うたう',
      vietnamese: 'hát',
      english: 'to sing',
      type: 'additional',
      example: '歌が歌えます。'
    },
    {
      japanese: '踊る',
      kana: 'おどる',
      vietnamese: 'nhảy múa',
      english: 'to dance',
      type: 'additional',
      example: 'ダンスが踊れます。'
    },
    {
      japanese: '描く',
      kana: 'かく',
      vietnamese: 'vẽ',
      english: 'to draw, to paint',
      type: 'additional',
      example: '絵が描けます。'
    },
    {
      japanese: '作る',
      kana: 'つくる',
      vietnamese: 'làm, chế tạo',
      english: 'to make, to create',
      type: 'additional',
      example: '料理が作れます。'
    },

    // Supplementary
    {
      japanese: '水泳',
      kana: 'すいえい',
      vietnamese: 'bơi lội',
      english: 'swimming',
      type: 'supplementary',
      example: '水泳ができます。'
    },
    {
      japanese: 'バスケットボール',
      kana: 'バスケットボール',
      vietnamese: 'bóng rổ',
      english: 'basketball',
      type: 'supplementary',
      example: 'バスケットボールができます。'
    },
    {
      japanese: 'バレーボール',
      kana: 'バレーボール',
      vietnamese: 'bóng chuyền',
      english: 'volleyball',
      type: 'supplementary',
      example: 'バレーボールができます。'
    },
    {
      japanese: '卓球',
      kana: 'たっきゅう',
      vietnamese: 'bóng bàn',
      english: 'table tennis',
      type: 'supplementary',
      example: '卓球ができます。'
    },
    {
      japanese: 'ヴァイオリン',
      kana: 'ヴァイオリン',
      vietnamese: 'đàn violin',
      english: 'violin',
      type: 'supplementary',
      example: 'ヴァイオリンが弾けます。'
    },
    {
      japanese: 'フルート',
      kana: 'フルート',
      vietnamese: 'sáo flute',
      english: 'flute',
      type: 'supplementary',
      example: 'フルートが吹けます。'
    }
  ],
  grammar: [
    {
      pattern: '可能形 (Potential form)',
      vietnamese: 'thể khả năng',
      english: 'can do, able to do',
      type: 'main',
      explanation: 'Diễn tả khả năng làm điều gì đó. Nhóm 1: ます→える. Nhóm 2: ます→られる. Nhóm 3: する→できる, 来る→来られる.',
      examples: [
        {
          japanese: '私は泳げます。',
          vietnamese: 'Tôi có thể bơi.',
          english: 'I can swim.',
          type: 'main'
        },
        {
          japanese: '漢字が書けます。',
          vietnamese: 'Tôi có thể viết kanji.',
          english: 'I can write kanji.',
          type: 'main'
        },
        {
          japanese: '日本語が話せます。',
          vietnamese: 'Tôi có thể nói tiếng Nhật.',
          english: 'I can speak Japanese.',
          type: 'main'
        },
        {
          japanese: '明日は来られません。',
          vietnamese: 'Ngày mai tôi không thể đến.',
          english: 'I can\'t come tomorrow.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '〜ことができる',
      vietnamese: 'có thể ~',
      english: 'can do ~, able to do ~',
      type: 'main',
      explanation: 'Cách diễn đạt khả năng lịch sự hơn. Dùng động từ thể từ điển + ことができる.',
      examples: [
        {
          japanese: '日本語を話すことができます。',
          vietnamese: 'Tôi có thể nói tiếng Nhật.',
          english: 'I can speak Japanese.',
          type: 'main'
        },
        {
          japanese: 'ピアノを弾くことができます。',
          vietnamese: 'Tôi có thể chơi piano.',
          english: 'I can play the piano.',
          type: 'main'
        },
        {
          japanese: 'ここで写真を撮ることができますか。',
          vietnamese: 'Ở đây có thể chụp ảnh không?',
          english: 'Can I take pictures here?',
          type: 'main'
        }
      ]
    },
    {
      pattern: '〜が + 可能形',
      vietnamese: '~ có thể (trợ từ が)',
      english: '~ can (particle が)',
      type: 'main',
      explanation: 'Với động từ khả năng, đối tượng thường dùng trợ từ が thay vì を. Có thể dùng cả hai nhưng が tự nhiên hơn.',
      examples: [
        {
          japanese: '英語が話せます。',
          vietnamese: 'Tôi có thể nói tiếng Anh.',
          english: 'I can speak English.',
          type: 'main'
        },
        {
          japanese: '辛い物が食べられません。',
          vietnamese: 'Tôi không thể ăn đồ cay.',
          english: 'I can\'t eat spicy food.',
          type: 'main'
        },
        {
          japanese: 'お酒が飲めますか。',
          vietnamese: 'Bạn có thể uống rượu không?',
          english: 'Can you drink alcohol?',
          type: 'main'
        }
      ]
    },
    {
      pattern: '〜上手/下手',
      vietnamese: 'giỏi / kém',
      english: 'good at / bad at',
      type: 'main',
      explanation: 'Diễn tả mức độ thành thạo. 上手だ: giỏi. 下手だ: kém. Dùng với danh từ + が.',
      examples: [
        {
          japanese: '料理が上手です。',
          vietnamese: 'Giỏi nấu ăn.',
          english: 'Good at cooking.',
          type: 'main'
        },
        {
          japanese: '日本語が上手ですね。',
          vietnamese: 'Bạn giỏi tiếng Nhật nhỉ.',
          english: 'You\'re good at Japanese.',
          type: 'main'
        },
        {
          japanese: '歌が下手です。',
          vietnamese: 'Hát kém.',
          english: 'Bad at singing.',
          type: 'main'
        }
      ]
    },
    {
      pattern: '〜得意/苦手',
      vietnamese: 'sở trường / yếu kém',
      english: 'strong point / weak point',
      type: 'main',
      explanation: 'Diễn tả khả năng chủ quan. 得意: giỏi, sở trường. 苦手: không giỏi, yếu.',
      examples: [
        {
          japanese: '数学が得意です。',
          vietnamese: 'Toán là sở trường của tôi.',
          english: 'I\'m good at math.',
          type: 'main'
        },
        {
          japanese: 'スポーツは苦手です。',
          vietnamese: 'Tôi không giỏi thể thao.',
          english: 'I\'m not good at sports.',
          type: 'main'
        },
        {
          japanese: '何が得意ですか。',
          vietnamese: 'Bạn giỏi gì?',
          english: 'What are you good at?',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '見える / 聞こえる',
      vietnamese: 'nhìn thấy / nghe thấy',
      english: 'can see / can hear (naturally)',
      type: 'additional',
      explanation: 'Khả năng tự nhiên, không phải học được. 見える: nhìn thấy. 聞こえる: nghe thấy.',
      examples: [
        {
          japanese: 'あそこに富士山が見えます。',
          vietnamese: 'Nhìn thấy núi Phú Sĩ ở đằng kia.',
          english: 'Mt. Fuji can be seen over there.',
          type: 'main'
        },
        {
          japanese: '音楽が聞こえます。',
          vietnamese: 'Nghe thấy âm nhạc.',
          english: 'Music can be heard.',
          type: 'main'
        },
        {
          japanese: '声が聞こえません。',
          vietnamese: 'Không nghe thấy giọng nói.',
          english: 'I can\'t hear your voice.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '〜やすい / 〜にくい',
      vietnamese: 'dễ ~ / khó ~',
      english: 'easy to ~ / hard to ~',
      type: 'additional',
      explanation: 'Diễn tả độ dễ/khó của hành động. Dùng với ます形 + やすい/にくい.',
      examples: [
        {
          japanese: 'この本は読みやすいです。',
          vietnamese: 'Quyển sách này dễ đọc.',
          english: 'This book is easy to read.',
          type: 'main'
        },
        {
          japanese: 'この字は読みにくいです。',
          vietnamese: 'Chữ này khó đọc.',
          english: 'This character is hard to read.',
          type: 'main'
        },
        {
          japanese: 'この靴は歩きやすいです。',
          vietnamese: 'Đôi giày này dễ đi.',
          english: 'These shoes are easy to walk in.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '〜ようになる',
      vietnamese: 'trở nên có thể ~',
      english: 'to become able to ~',
      type: 'additional',
      explanation: 'Diễn tả sự thay đổi khả năng theo thời gian. Dùng với động từ thể từ điển hoặc thể phủ định + ようになる.',
      examples: [
        {
          japanese: '日本語が話せるようになりました。',
          vietnamese: 'Tôi đã có thể nói tiếng Nhật rồi.',
          english: 'I became able to speak Japanese.',
          type: 'main'
        },
        {
          japanese: '泳げるようになりたいです。',
          vietnamese: 'Tôi muốn trở nên có thể bơi.',
          english: 'I want to become able to swim.',
          type: 'main'
        },
        {
          japanese: '漢字が読めるようになりました。',
          vietnamese: 'Tôi đã có thể đọc kanji rồi.',
          english: 'I became able to read kanji.',
          type: 'additional'
        }
      ]
    }
  ]
};

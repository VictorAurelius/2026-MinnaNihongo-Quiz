/**
 * N4 Core Lessons — Lesson 25
 * Focus: N4 Comprehensive Review
 */

import type { LessonData } from '$lib/types';

export const LESSON_25_DATA: LessonData = {
  lessonNumber: 25,
  title: 'N4総復習 (Tổng ôn tập N4)',
  vocabulary: [
    // Essential N4 verbs review
    {
      japanese: '頑張る（がんばる）',
      kana: 'がんばる',
      vietnamese: 'cố gắng',
      english: 'to do one\'s best',
      type: 'main',
      example: '試験に向けて頑張ります。'
    },
    {
      japanese: '諦める（あきらめる）',
      kana: 'あきらめる',
      vietnamese: 'từ bỏ',
      english: 'to give up',
      type: 'main',
      example: '諦めないでください。'
    },
    {
      japanese: '困る（こまる）',
      kana: 'こまる',
      vietnamese: 'gặp khó khăn',
      english: 'to be troubled',
      type: 'main',
      example: '質問がなくて困っています。'
    },
    {
      japanese: '助ける（たすける）',
      kana: 'たすける',
      vietnamese: 'giúp đỡ',
      english: 'to help/save',
      type: 'main',
      example: '友達を助けました。'
    },
    {
      japanese: '守る（まもる）',
      kana: 'まもる',
      vietnamese: 'bảo vệ, tuân thủ',
      english: 'to protect/obey',
      type: 'main',
      example: 'ルールを守ってください。'
    },
    {
      japanese: '破る（やぶる）',
      kana: 'やぶる',
      vietnamese: 'phá vỡ, xé',
      english: 'to break/tear',
      type: 'main',
      example: '約束を破りました。'
    },
    {
      japanese: '直す（なおす）',
      kana: 'なおす',
      vietnamese: 'sửa',
      english: 'to fix/correct',
      type: 'main',
      example: '間違いを直してください。'
    },
    {
      japanese: '壊す（こわす）',
      kana: 'こわす',
      vietnamese: 'phá hỏng',
      english: 'to break (something)',
      type: 'main',
      example: 'コップを壊してしまいました。'
    },
    {
      japanese: '壊れる（こわれる）',
      kana: 'こわれる',
      vietnamese: 'bị hỏng',
      english: 'to break (itself)',
      type: 'main',
      example: 'パソコンが壊れました。'
    },
    {
      japanese: '捨てる（すてる）',
      kana: 'すてる',
      vietnamese: 'vứt bỏ',
      english: 'to throw away',
      type: 'main',
      example: 'ゴミを捨ててください。'
    },
    {
      japanese: '拾う（ひろう）',
      kana: 'ひろう',
      vietnamese: 'nhặt',
      english: 'to pick up',
      type: 'main',
      example: '財布を拾いました。'
    },
    {
      japanese: '探す（さがす）',
      kana: 'さがす',
      vietnamese: 'tìm kiếm',
      english: 'to search/look for',
      type: 'main',
      example: '鍵を探しています。'
    },
    {
      japanese: '見つける（みつける）',
      kana: 'みつける',
      vietnamese: 'tìm thấy',
      english: 'to find',
      type: 'main',
      example: '鍵を見つけました。'
    },
    {
      japanese: '見つかる（みつかる）',
      kana: 'みつかる',
      vietnamese: 'được tìm thấy',
      english: 'to be found',
      type: 'main',
      example: '鍵が見つかりました。'
    },
    {
      japanese: '失くす（なくす）',
      kana: 'なくす',
      vietnamese: 'làm mất',
      english: 'to lose',
      type: 'main',
      example: '財布を失くしました。'
    },
    // Important N4 adjectives
    {
      japanese: '優しい（やさしい）',
      kana: 'やさしい',
      vietnamese: 'dịu dàng, dễ',
      english: 'kind/gentle/easy',
      type: 'main',
      example: '優しい先生です。'
    },
    {
      japanese: '厳しい（きびしい）',
      kana: 'きびしい',
      vietnamese: 'nghiêm khắc',
      english: 'strict/harsh',
      type: 'main',
      example: '厳しい先生です。'
    },
    {
      japanese: '正しい（ただしい）',
      kana: 'ただしい',
      vietnamese: 'đúng',
      english: 'correct/right',
      type: 'main',
      example: '正しい答えです。'
    },
    {
      japanese: '珍しい（めずらしい）',
      kana: 'めずらしい',
      vietnamese: 'hiếm',
      english: 'rare/unusual',
      type: 'main',
      example: '珍しい花ですね。'
    },
    {
      japanese: '恥ずかしい（はずかしい）',
      kana: 'はずかしい',
      vietnamese: 'xấu hổ',
      english: 'embarrassed/shy',
      type: 'main',
      example: '恥ずかしくて言えません。'
    },
    {
      japanese: '悔しい（くやしい）',
      kana: 'くやしい',
      vietnamese: 'tiếc nuối, ân hận',
      english: 'regrettable/vexing',
      type: 'main',
      example: '負けて悔しいです。'
    },
    {
      japanese: '嬉しい（うれしい）',
      kana: 'うれしい',
      vietnamese: 'vui',
      english: 'happy/glad',
      type: 'main',
      example: 'プレゼントをもらって嬉しいです。'
    },
    {
      japanese: '悲しい（かなしい）',
      kana: 'かなしい',
      vietnamese: 'buồn',
      english: 'sad',
      type: 'main',
      example: '悲しい知らせを聞きました。'
    },
    {
      japanese: '怖い（こわい）',
      kana: 'こわい',
      vietnamese: 'sợ',
      english: 'scary/frightening',
      type: 'main',
      example: 'ホラー映画は怖いです。'
    },
    {
      japanese: '可笑しい（おかしい）',
      kana: 'おかしい',
      vietnamese: 'buồn cười, kỳ lạ',
      english: 'funny/strange',
      type: 'main',
      example: 'おかしな話ですね。'
    },
    // Important N4 na-adjectives
    {
      japanese: '真面目（まじめ）',
      kana: 'まじめ',
      vietnamese: 'nghiêm túc',
      english: 'serious/earnest',
      type: 'main',
      example: '真面目な学生です。'
    },
    {
      japanese: '不真面目（ふまじめ）',
      kana: 'ふまじめ',
      vietnamese: 'không nghiêm túc',
      english: 'not serious',
      type: 'main',
      example: '不真面目な態度です。'
    },
    {
      japanese: '丁寧（ていねい）',
      kana: 'ていねい',
      vietnamese: 'lịch sự, cẩn thận',
      english: 'polite/careful',
      type: 'main',
      example: '丁寧な説明をありがとうございます。'
    },
    {
      japanese: '親切（しんせつ）',
      kana: 'しんせつ',
      vietnamese: 'tử tế',
      english: 'kind',
      type: 'main',
      example: '親切な人です。'
    },
    {
      japanese: '失礼（しつれい）',
      kana: 'しつれい',
      vietnamese: 'thất lễ',
      english: 'rude/impolite',
      type: 'main',
      example: '失礼な態度です。'
    },
    {
      japanese: '素直（すなお）',
      kana: 'すなお',
      vietnamese: 'ngay thẳng, ngoan',
      english: 'obedient/honest',
      type: 'main',
      example: '素直な子供です。'
    },
    {
      japanese: '正直（しょうじき）',
      kana: 'しょうじき',
      vietnamese: 'thành thật',
      english: 'honest',
      type: 'main',
      example: '正直に言ってください。'
    },
    {
      japanese: '自由（じゆう）',
      kana: 'じゆう',
      vietnamese: 'tự do',
      english: 'free/freedom',
      type: 'main',
      example: '自由な時間があります。'
    },
    {
      japanese: '平和（へいわ）',
      kana: 'へいわ',
      vietnamese: 'hòa bình',
      english: 'peace/peaceful',
      type: 'main',
      example: '平和な世界を願います。'
    },
    // Important N4 nouns
    {
      japanese: '将来（しょうらい）',
      kana: 'しょうらい',
      vietnamese: 'tương lai',
      english: 'future',
      type: 'main',
      example: '将来の夢は何ですか。'
    },
    {
      japanese: '過去（かこ）',
      kana: 'かこ',
      vietnamese: 'quá khứ',
      english: 'past',
      type: 'main',
      example: '過去のことは忘れましょう。'
    },
    {
      japanese: '現在（げんざい）',
      kana: 'げんざい',
      vietnamese: 'hiện tại',
      english: 'present',
      type: 'main',
      example: '現在の状況を説明します。'
    },
    {
      japanese: '最近（さいきん）',
      kana: 'さいきん',
      vietnamese: 'gần đây',
      english: 'recently',
      type: 'main',
      example: '最近忙しいです。'
    },
    {
      japanese: '以前（いぜん）',
      kana: 'いぜん',
      vietnamese: 'trước đây',
      english: 'before/previously',
      type: 'main',
      example: '以前住んでいた町です。'
    },
    {
      japanese: '以後（いご）',
      kana: 'いご',
      vietnamese: 'sau đó',
      english: 'after/since',
      type: 'main',
      example: 'それ以後会っていません。'
    },
    {
      japanese: '人生（じんせい）',
      kana: 'じんせい',
      vietnamese: 'cuộc đời',
      english: 'life',
      type: 'main',
      example: '人生は短いです。'
    },
    {
      japanese: '世界（せかい）',
      kana: 'せかい',
      vietnamese: 'thế giới',
      english: 'world',
      type: 'main',
      example: '世界中を旅行したいです。'
    },
    {
      japanese: '社会（しゃかい）',
      kana: 'しゃかい',
      vietnamese: 'xã hội',
      english: 'society',
      type: 'main',
      example: '社会に貢献したいです。'
    },
    // Additional important vocabulary
    {
      japanese: '態度（たいど）',
      kana: 'たいど',
      vietnamese: 'thái độ',
      english: 'attitude',
      type: 'additional',
      example: '良い態度で接します。'
    },
    {
      japanese: '表情（ひょうじょう）',
      kana: 'ひょうじょう',
      vietnamese: 'biểu cảm, nét mặt',
      english: 'facial expression',
      type: 'additional',
      example: '悲しい表情をしています。'
    },
    {
      japanese: '印象（いんしょう）',
      kana: 'いんしょう',
      vietnamese: 'ấn tượng',
      english: 'impression',
      type: 'additional',
      example: '良い印象を受けました。'
    },
    {
      japanese: '感想（かんそう）',
      kana: 'かんそう',
      vietnamese: 'cảm tưởng',
      english: 'impression/thoughts',
      type: 'additional',
      example: '映画の感想を聞かせてください。'
    },
    {
      japanese: '意識（いしき）',
      kana: 'いしき',
      vietnamese: 'ý thức',
      english: 'consciousness',
      type: 'additional',
      example: '環境意識を持ちましょう。'
    },
    {
      japanese: '無意識（むいしき）',
      kana: 'むいしき',
      vietnamese: 'vô thức',
      english: 'unconscious',
      type: 'additional',
      example: '無意識にやってしまいました。'
    },
    {
      japanese: '興味（きょうみ）',
      kana: 'きょうみ',
      vietnamese: 'sự quan tâm',
      english: 'interest',
      type: 'additional',
      example: '日本文化に興味があります。'
    },
    {
      japanese: '趣味（しゅみ）',
      kana: 'しゅみ',
      vietnamese: 'sở thích',
      english: 'hobby',
      type: 'additional',
      example: '趣味は写真を撮ることです。'
    },
    {
      japanese: '夢（ゆめ）',
      kana: 'ゆめ',
      vietnamese: 'giấc mơ, ước mơ',
      english: 'dream',
      type: 'additional',
      example: '将来の夢は医者になることです。'
    },
    {
      japanese: '希望（きぼう）',
      kana: 'きぼう',
      vietnamese: 'hy vọng',
      english: 'hope',
      type: 'additional',
      example: '希望を持ち続けます。'
    },
    {
      japanese: '失望（しつぼう）',
      kana: 'しつぼう',
      vietnamese: 'thất vọng',
      english: 'disappointment',
      type: 'additional',
      example: '結果に失望しました。'
    },
    {
      japanese: '努力（どりょく）',
      kana: 'どりょく',
      vietnamese: 'nỗ lực',
      english: 'effort',
      type: 'additional',
      example: '努力すれば成功します。'
    },
    {
      japanese: '苦労（くろう）',
      kana: 'くろう',
      vietnamese: 'vất vả',
      english: 'hardship/trouble',
      type: 'additional',
      example: '色々苦労しました。'
    },
    {
      japanese: '工夫（くふう）',
      kana: 'くふう',
      vietnamese: 'sáng kiến',
      english: 'device/ingenuity',
      type: 'additional',
      example: '工夫して問題を解決しました。'
    },
    {
      japanese: '才能（さいのう）',
      kana: 'さいのう',
      vietnamese: 'tài năng',
      english: 'talent/ability',
      type: 'additional',
      example: '音楽の才能があります。'
    },
    {
      japanese: '技術（ぎじゅつ）',
      kana: 'ぎじゅつ',
      vietnamese: 'kỹ thuật',
      english: 'technique/technology',
      type: 'additional',
      example: '新しい技術を学びます。'
    },
    {
      japanese: '技能（ぎのう）',
      kana: 'ぎのう',
      vietnamese: 'kỹ năng',
      english: 'skill',
      type: 'additional',
      example: '技能を向上させます。'
    },
    {
      japanese: '実力（じつりょく）',
      kana: 'じつりょく',
      vietnamese: 'thực lực',
      english: 'actual ability',
      type: 'additional',
      example: '実力を発揮します。'
    },
    {
      japanese: '性質（せいしつ）',
      kana: 'せいしつ',
      vietnamese: 'tính chất',
      english: 'nature/property',
      type: 'additional',
      example: 'この物質の性質を調べます。'
    },
    {
      japanese: '性格（せいかく）',
      kana: 'せいかく',
      vietnamese: 'tính cách',
      english: 'personality',
      type: 'additional',
      example: '明るい性格です。'
    },
    // Supplementary vocabulary
    {
      japanese: '幸せ（しあわせ）',
      kana: 'しあわせ',
      vietnamese: 'hạnh phúc',
      english: 'happiness',
      type: 'supplementary',
      example: '幸せな人生を送りたいです。'
    },
    {
      japanese: '不幸（ふこう）',
      kana: 'ふこう',
      vietnamese: 'bất hạnh',
      english: 'unhappiness/misfortune',
      type: 'supplementary',
      example: '不幸な出来事でした。'
    },
    {
      japanese: '運命（うんめい）',
      kana: 'うんめい',
      vietnamese: 'số phận',
      english: 'fate/destiny',
      type: 'supplementary',
      example: 'これは運命だと思います。'
    },
    {
      japanese: '奇跡（きせき）',
      kana: 'きせき',
      vietnamese: 'kỳ tích',
      english: 'miracle',
      type: 'supplementary',
      example: '奇跡が起こりました。'
    },
    {
      japanese: '感動（かんどう）',
      kana: 'かんどう',
      vietnamese: 'cảm động',
      english: 'impression/emotion',
      type: 'supplementary',
      example: '映画に感動しました。'
    },
    {
      japanese: '感謝（かんしゃ）',
      kana: 'かんしゃ',
      vietnamese: 'biết ơn',
      english: 'gratitude/thanks',
      type: 'supplementary',
      example: 'ご支援に感謝します。'
    },
    {
      japanese: '尊敬（そんけい）',
      kana: 'そんけい',
      vietnamese: 'tôn kính',
      english: 'respect',
      type: 'supplementary',
      example: '先生を尊敬しています。'
    },
    {
      japanese: '信頼（しんらい）',
      kana: 'しんらい',
      vietnamese: 'tin cậy',
      english: 'trust/confidence',
      type: 'supplementary',
      example: '信頼できる人です。'
    }
  ],
  grammar: [
    {
      pattern: '～ようになる',
      vietnamese: 'trở nên có thể..., dần dần...',
      english: 'to become able to...',
      type: 'main',
      explanation: 'Biểu thị sự thay đổi dần dần về khả năng hoặc thói quen. Cấu trúc: 動詞辞書形 + ようになる (khả năng), 動詞ない形 + ようになる (thôi làm).',
      examples: [
        {
          japanese: '日本語が話せるようになりました。',
          vietnamese: 'Tôi đã có thể nói tiếng Nhật.',
          english: 'I became able to speak Japanese.',
          type: 'main'
        },
        {
          japanese: 'タバコを吸わないようになりました。',
          vietnamese: 'Tôi đã không hút thuốc nữa.',
          english: 'I stopped smoking.',
          type: 'main'
        },
        {
          japanese: '早く起きられるようになりたいです。',
          vietnamese: 'Tôi muốn có thể dậy sớm.',
          english: 'I want to be able to wake up early.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～ようにする',
      vietnamese: 'cố gắng làm..., làm sao để...',
      english: 'to make sure to..., to try to...',
      type: 'main',
      explanation: 'Biểu thị nỗ lực có ý thức để làm gì đó hoặc đạt được một trạng thái. Cấu trúc: 動詞辞書形/ない形 + ようにする.',
      examples: [
        {
          japanese: '毎日運動するようにしています。',
          vietnamese: 'Tôi cố gắng tập thể dục mỗi ngày.',
          english: 'I make sure to exercise every day.',
          type: 'main'
        },
        {
          japanese: '遅刻しないようにします。',
          vietnamese: 'Tôi cố gắng không đến muộn.',
          english: 'I try not to be late.',
          type: 'main'
        },
        {
          japanese: '健康に気をつけるようにしてください。',
          vietnamese: 'Hãy cố gắng chăm sóc sức khỏe.',
          english: 'Please make sure to take care of your health.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～やすい／～にくい',
      vietnamese: 'dễ.../khó...',
      english: 'easy to.../hard to...',
      type: 'main',
      explanation: 'Biểu thị độ dễ hoặc khó của hành động. Cấu trúc: 動詞ます形(bỏます) + やすい (dễ) / にくい (khó).',
      examples: [
        {
          japanese: 'この本は読みやすいです。',
          vietnamese: 'Cuốn sách này dễ đọc.',
          english: 'This book is easy to read.',
          type: 'main'
        },
        {
          japanese: 'この漢字は覚えにくいです。',
          vietnamese: 'Chữ Hán này khó nhớ.',
          english: 'This kanji is hard to remember.',
          type: 'main'
        },
        {
          japanese: '使いやすい道具です。',
          vietnamese: 'Đây là công cụ dễ sử dụng.',
          english: 'This is an easy-to-use tool.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～すぎる',
      vietnamese: 'quá...',
      english: 'too...',
      type: 'main',
      explanation: 'Biểu thị mức độ quá mức. Cấu trúc: 動詞ます形(bỏます) + すぎる, い形容詞(bỏい) + すぎる, な形容詞 + すぎる.',
      examples: [
        {
          japanese: '食べすぎました。',
          vietnamese: 'Tôi đã ăn quá nhiều.',
          english: 'I ate too much.',
          type: 'main'
        },
        {
          japanese: 'この服は高すぎます。',
          vietnamese: 'Quần áo này quá đắt.',
          english: 'These clothes are too expensive.',
          type: 'main'
        },
        {
          japanese: '親切すぎる人です。',
          vietnamese: 'Người này tử tế quá mức.',
          english: 'This person is too kind.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～そうだ（様態）',
      vietnamese: 'có vẻ..., trông...',
      english: 'looks like..., seems...',
      type: 'main',
      explanation: 'Biểu thị dự đoán dựa trên quan sát. Cấu trúc: 動詞ます形(bỏます) + そうだ, い形容詞(bỏい) + そうだ, な形容詞 + そうだ.',
      examples: [
        {
          japanese: '雨が降りそうです。',
          vietnamese: 'Trời có vẻ sắp mưa.',
          english: 'It looks like it will rain.',
          type: 'main'
        },
        {
          japanese: 'この料理は美味しそうです。',
          vietnamese: 'Món ăn này trông ngon.',
          english: 'This dish looks delicious.',
          type: 'main'
        },
        {
          japanese: '彼は元気そうですね。',
          vietnamese: 'Anh ấy có vẻ khỏe nhỉ.',
          english: 'He seems well.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～そうだ（伝聞）',
      vietnamese: 'nghe nói...',
      english: 'I heard that...',
      type: 'main',
      explanation: 'Biểu thị thông tin được nghe từ người khác. Cấu trúc: 普通形 + そうだ.',
      examples: [
        {
          japanese: '明日は雨だそうです。',
          vietnamese: 'Nghe nói ngày mai sẽ mưa.',
          english: 'I heard it will rain tomorrow.',
          type: 'main'
        },
        {
          japanese: '田中さんは結婚するそうです。',
          vietnamese: 'Nghe nói anh Tanaka sẽ kết hôn.',
          english: 'I heard Mr. Tanaka will get married.',
          type: 'main'
        },
        {
          japanese: 'あの店は美味しいそうです。',
          vietnamese: 'Nghe nói quán đó ngon.',
          english: 'I heard that restaurant is delicious.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～らしい',
      vietnamese: 'có vẻ, nghe nói',
      english: 'it seems/apparently',
      type: 'main',
      explanation: 'Biểu thị suy đoán dựa trên thông tin không chắc chắn. Lịch sự hơn そうだ(伝聞). Cấu trúc: 普通形 + らしい.',
      examples: [
        {
          japanese: '彼は学生らしいです。',
          vietnamese: 'Có vẻ anh ấy là sinh viên.',
          english: 'He seems to be a student.',
          type: 'main'
        },
        {
          japanese: '明日は雨らしいです。',
          vietnamese: 'Có vẻ ngày mai sẽ mưa.',
          english: 'It seems it will rain tomorrow.',
          type: 'main'
        },
        {
          japanese: '忙しいらしくて、連絡がありません。',
          vietnamese: 'Có vẻ bận nên không liên lạc.',
          english: 'He seems busy and hasn\'t contacted me.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～はずだ',
      vietnamese: 'chắc hẳn, đáng lẽ',
      english: 'should be/must be',
      type: 'main',
      explanation: 'Biểu thị suy đoán mạnh dựa trên lý do hoặc bằng chứng. Cấu trúc: 普通形 + はずだ (ない形 + はずがない = không thể).',
      examples: [
        {
          japanese: '彼はもう着いたはずです。',
          vietnamese: 'Chắc hẳn anh ấy đã đến rồi.',
          english: 'He should have arrived already.',
          type: 'main'
        },
        {
          japanese: 'こんなに高いはずがありません。',
          vietnamese: 'Không thể đắt như vậy được.',
          english: 'It can\'t be this expensive.',
          type: 'main'
        },
        {
          japanese: '知っているはずです。',
          vietnamese: 'Chắc hẳn biết rồi.',
          english: 'He must know.',
          type: 'additional'
        }
      ]
    }
  ]
};

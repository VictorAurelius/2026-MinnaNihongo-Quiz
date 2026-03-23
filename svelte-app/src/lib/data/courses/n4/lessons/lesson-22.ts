/**
 * N4 Core Lessons — Lesson 22
 * Focus: Complex Sentence Structures and Nominalization
 */

import type { LessonData } from '$lib/types';

export const LESSON_22_DATA: LessonData = {
  lessonNumber: 22,
  title: '複文と名詞化 (Câu phức và danh từ hóa)',
  vocabulary: [
    // Verbs related to thinking and expression
    {
      japanese: '思う（おもう）',
      kana: 'おもう',
      vietnamese: 'nghĩ',
      english: 'to think',
      type: 'main',
      example: '明日は雨が降ると思います。'
    },
    {
      japanese: '考える（かんがえる）',
      kana: 'かんがえる',
      vietnamese: 'suy nghĩ',
      english: 'to consider/think',
      type: 'main',
      example: '将来のことを考えています。'
    },
    {
      japanese: '感じる（かんじる）',
      kana: 'かんじる',
      vietnamese: 'cảm thấy',
      english: 'to feel',
      type: 'main',
      example: '暑さを感じます。'
    },
    {
      japanese: '信じる（しんじる）',
      kana: 'しんじる',
      vietnamese: 'tin tưởng',
      english: 'to believe',
      type: 'main',
      example: '友達を信じています。'
    },
    {
      japanese: '期待する（きたいする）',
      kana: 'きたいする',
      vietnamese: 'kỳ vọng',
      english: 'to expect',
      type: 'main',
      example: '成功を期待しています。'
    },
    {
      japanese: '決める（きめる）',
      kana: 'きめる',
      vietnamese: 'quyết định',
      english: 'to decide',
      type: 'main',
      example: '留学することに決めました。'
    },
    {
      japanese: '選ぶ（えらぶ）',
      kana: 'えらぶ',
      vietnamese: 'lựa chọn',
      english: 'to choose/select',
      type: 'main',
      example: '好きな色を選んでください。'
    },
    {
      japanese: '約束する（やくそくする）',
      kana: 'やくそくする',
      vietnamese: 'hứa',
      english: 'to promise',
      type: 'main',
      example: '明日会うことを約束しました。'
    },
    {
      japanese: '願う（ねがう）',
      kana: 'ねがう',
      vietnamese: 'cầu nguyện, ước',
      english: 'to wish/pray',
      type: 'main',
      example: '幸せを願っています。'
    },
    {
      japanese: '予定する（よていする）',
      kana: 'よていする',
      vietnamese: 'dự định',
      english: 'to plan/schedule',
      type: 'main',
      example: '来週出張を予定しています。'
    },
    // Perception and knowledge verbs
    {
      japanese: '知る（しる）',
      kana: 'しる',
      vietnamese: 'biết',
      english: 'to know',
      type: 'main',
      example: '彼の住所を知っています。'
    },
    {
      japanese: '分かる（わかる）',
      kana: 'わかる',
      vietnamese: 'hiểu',
      english: 'to understand',
      type: 'main',
      example: '意味が分かりました。'
    },
    {
      japanese: '気づく（きづく）',
      kana: 'きづく',
      vietnamese: 'nhận ra',
      english: 'to notice',
      type: 'main',
      example: '間違いに気づきました。'
    },
    {
      japanese: '忘れる（わすれる）',
      kana: 'わすれる',
      vietnamese: 'quên',
      english: 'to forget',
      type: 'main',
      example: '宿題を忘れてしまいました。'
    },
    {
      japanese: '覚える（おぼえる）',
      kana: 'おぼえる',
      vietnamese: 'nhớ, học thuộc',
      english: 'to memorize/remember',
      type: 'main',
      example: '新しい単語を覚えます。'
    },
    {
      japanese: '思い出す（おもいだす）',
      kana: 'おもいだす',
      vietnamese: 'nhớ lại',
      english: 'to recall/remember',
      type: 'main',
      example: '子供の頃を思い出します。'
    },
    // Communication verbs
    {
      japanese: '伝える（つたえる）',
      kana: 'つたえる',
      vietnamese: 'truyền đạt',
      english: 'to convey/tell',
      type: 'main',
      example: '気持ちを伝えたいです。'
    },
    {
      japanese: '説明する（せつめいする）',
      kana: 'せつめいする',
      vietnamese: 'giải thích',
      english: 'to explain',
      type: 'main',
      example: '使い方を説明してください。'
    },
    {
      japanese: '表現する（ひょうげんする）',
      kana: 'ひょうげんする',
      vietnamese: 'biểu hiện',
      english: 'to express',
      type: 'main',
      example: '感情を表現するのは難しいです。'
    },
    {
      japanese: '相談する（そうだんする）',
      kana: 'そうだんする',
      vietnamese: 'trao đổi, bàn bạc',
      english: 'to consult/discuss',
      type: 'main',
      example: '先生に相談しました。'
    },
    {
      japanese: '議論する（ぎろんする）',
      kana: 'ぎろんする',
      vietnamese: 'tranh luận',
      english: 'to discuss/argue',
      type: 'main',
      example: '問題について議論しました。'
    },
    // Abstract nouns
    {
      japanese: '意見（いけん）',
      kana: 'いけん',
      vietnamese: 'ý kiến',
      english: 'opinion',
      type: 'main',
      example: 'あなたの意見を聞かせてください。'
    },
    {
      japanese: '考え（かんがえ）',
      kana: 'かんがえ',
      vietnamese: 'suy nghĩ',
      english: 'thought/idea',
      type: 'main',
      example: '面白い考えですね。'
    },
    {
      japanese: '気持ち（きもち）',
      kana: 'きもち',
      vietnamese: 'cảm xúc',
      english: 'feeling',
      type: 'main',
      example: '嬉しい気持ちです。'
    },
    {
      japanese: '経験（けいけん）',
      kana: 'けいけん',
      vietnamese: 'kinh nghiệm',
      english: 'experience',
      type: 'main',
      example: '海外での経験があります。'
    },
    {
      japanese: '知識（ちしき）',
      kana: 'ちしき',
      vietnamese: 'kiến thức',
      english: 'knowledge',
      type: 'main',
      example: '専門的な知識が必要です。'
    },
    {
      japanese: '能力（のうりょく）',
      kana: 'のうりょく',
      vietnamese: 'năng lực',
      english: 'ability/capability',
      type: 'main',
      example: '日本語能力を上げたいです。'
    },
    {
      japanese: '可能性（かのうせい）',
      kana: 'かのうせい',
      vietnamese: 'khả năng (có thể xảy ra)',
      english: 'possibility',
      type: 'main',
      example: '合格する可能性があります。'
    },
    {
      japanese: '必要（ひつよう）',
      kana: 'ひつよう',
      vietnamese: 'sự cần thiết',
      english: 'necessity',
      type: 'main',
      example: '休息が必要です。'
    },
    {
      japanese: '重要（じゅうよう）',
      kana: 'じゅうよう',
      vietnamese: 'quan trọng',
      english: 'important',
      type: 'main',
      example: '健康は重要です。'
    },
    {
      japanese: '大切（たいせつ）',
      kana: 'たいせつ',
      vietnamese: 'quý báu, quan trọng',
      english: 'important/precious',
      type: 'main',
      example: '時間が大切です。'
    },
    {
      japanese: '便利（べんり）',
      kana: 'べんり',
      vietnamese: 'tiện lợi',
      english: 'convenient',
      type: 'main',
      example: 'スマホは便利です。'
    },
    {
      japanese: '不便（ふべん）',
      kana: 'ふべん',
      vietnamese: 'bất tiện',
      english: 'inconvenient',
      type: 'main',
      example: '車がないと不便です。'
    },
    // Additional vocabulary
    {
      japanese: '理由（りゆう）',
      kana: 'りゆう',
      vietnamese: 'lý do',
      english: 'reason',
      type: 'additional',
      example: '遅れた理由を説明してください。'
    },
    {
      japanese: '原因（げんいん）',
      kana: 'げんいん',
      vietnamese: 'nguyên nhân',
      english: 'cause',
      type: 'additional',
      example: '事故の原因を調べています。'
    },
    {
      japanese: '結果（けっか）',
      kana: 'けっか',
      vietnamese: 'kết quả',
      english: 'result',
      type: 'additional',
      example: '試験の結果が出ました。'
    },
    {
      japanese: '目的（もくてき）',
      kana: 'もくてき',
      vietnamese: 'mục đích',
      english: 'purpose/goal',
      type: 'additional',
      example: '留学の目的は何ですか。'
    },
    {
      japanese: '方法（ほうほう）',
      kana: 'ほうほう',
      vietnamese: 'phương pháp',
      english: 'method',
      type: 'additional',
      example: '良い勉強方法を教えてください。'
    },
    {
      japanese: '手段（しゅだん）',
      kana: 'しゅだん',
      vietnamese: 'phương tiện',
      english: 'means/measure',
      type: 'additional',
      example: '交通手段は何ですか。'
    },
    {
      japanese: '状況（じょうきょう）',
      kana: 'じょうきょう',
      vietnamese: 'tình hình',
      english: 'situation',
      type: 'additional',
      example: '現在の状況を報告します。'
    },
    {
      japanese: '条件（じょうけん）',
      kana: 'じょうけん',
      vietnamese: 'điều kiện',
      english: 'condition',
      type: 'additional',
      example: '条件を満たせば合格です。'
    },
    {
      japanese: '関係（かんけい）',
      kana: 'かんけい',
      vietnamese: 'mối quan hệ',
      english: 'relationship/relation',
      type: 'additional',
      example: '二人は良い関係です。'
    },
    {
      japanese: '影響（えいきょう）',
      kana: 'えいきょう',
      vietnamese: 'ảnh hưởng',
      english: 'influence/effect',
      type: 'additional',
      example: '天気は気分に影響します。'
    },
    {
      japanese: '効果（こうか）',
      kana: 'こうか',
      vietnamese: 'hiệu quả',
      english: 'effect/effectiveness',
      type: 'additional',
      example: 'この薬は効果があります。'
    },
    {
      japanese: '問題（もんだい）',
      kana: 'もんだい',
      vietnamese: 'vấn đề',
      english: 'problem',
      type: 'additional',
      example: '大きな問題が起きました。'
    },
    {
      japanese: '解決（かいけつ）',
      kana: 'かいけつ',
      vietnamese: 'giải quyết',
      english: 'solution',
      type: 'additional',
      example: '問題を解決しました。'
    },
    {
      japanese: '困難（こんなん）',
      kana: 'こんなん',
      vietnamese: 'khó khăn',
      english: 'difficulty',
      type: 'additional',
      example: '困難な状況です。'
    },
    {
      japanese: '簡単（かんたん）',
      kana: 'かんたん',
      vietnamese: 'đơn giản',
      english: 'simple/easy',
      type: 'additional',
      example: 'この問題は簡単です。'
    },
    {
      japanese: '複雑（ふくざつ）',
      kana: 'ふくざつ',
      vietnamese: 'phức tạp',
      english: 'complex/complicated',
      type: 'additional',
      example: '複雑な仕組みです。'
    },
    {
      japanese: '具体的（ぐたいてき）',
      kana: 'ぐたいてき',
      vietnamese: 'cụ thể',
      english: 'concrete/specific',
      type: 'additional',
      example: '具体的な例を教えてください。'
    },
    {
      japanese: '抽象的（ちゅうしょうてき）',
      kana: 'ちゅうしょうてき',
      vietnamese: 'trừu tượng',
      english: 'abstract',
      type: 'additional',
      example: '抽象的な概念です。'
    },
    {
      japanese: '一般的（いっぱんてき）',
      kana: 'いっぱんてき',
      vietnamese: 'chung, phổ biến',
      english: 'general/common',
      type: 'additional',
      example: '一般的な考え方です。'
    },
    {
      japanese: '特別（とくべつ）',
      kana: 'とくべつ',
      vietnamese: 'đặc biệt',
      english: 'special',
      type: 'additional',
      example: '特別な日です。'
    },
    {
      japanese: '個人的（こじんてき）',
      kana: 'こじんてき',
      vietnamese: 'cá nhân',
      english: 'personal',
      type: 'additional',
      example: '個人的な意見です。'
    },
    {
      japanese: '客観的（きゃっかんてき）',
      kana: 'きゃっかんてき',
      vietnamese: 'khách quan',
      english: 'objective',
      type: 'additional',
      example: '客観的に見てください。'
    },
    {
      japanese: '主観的（しゅかんてき）',
      kana: 'しゅかんてき',
      vietnamese: 'chủ quan',
      english: 'subjective',
      type: 'additional',
      example: '主観的な判断です。'
    },
    // Supplementary
    {
      japanese: '傾向（けいこう）',
      kana: 'けいこう',
      vietnamese: 'xu hướng',
      english: 'tendency/trend',
      type: 'supplementary',
      example: '最近その傾向があります。'
    },
    {
      japanese: '特徴（とくちょう）',
      kana: 'とくちょう',
      vietnamese: 'đặc điểm',
      english: 'characteristic/feature',
      type: 'supplementary',
      example: 'この製品の特徴は何ですか。'
    },
    {
      japanese: '性格（せいかく）',
      kana: 'せいかく',
      vietnamese: 'tính cách',
      english: 'personality/character',
      type: 'supplementary',
      example: '彼は明るい性格です。'
    },
    {
      japanese: '習慣（しゅうかん）',
      kana: 'しゅうかん',
      vietnamese: 'thói quen',
      english: 'habit/custom',
      type: 'supplementary',
      example: '毎朝運動する習慣があります。'
    },
    {
      japanese: '文化（ぶんか）',
      kana: 'ぶんか',
      vietnamese: 'văn hóa',
      english: 'culture',
      type: 'supplementary',
      example: '日本の文化を学んでいます。'
    },
    {
      japanese: '伝統（でんとう）',
      kana: 'でんとう',
      vietnamese: 'truyền thống',
      english: 'tradition',
      type: 'supplementary',
      example: '伝統的な行事です。'
    },
    {
      japanese: '価値（かち）',
      kana: 'かち',
      vietnamese: 'giá trị',
      english: 'value',
      type: 'supplementary',
      example: 'この絵は価値があります。'
    },
    {
      japanese: '意味（いみ）',
      kana: 'いみ',
      vietnamese: 'ý nghĩa',
      english: 'meaning',
      type: 'supplementary',
      example: 'この言葉の意味は何ですか。'
    }
  ],
  grammar: [
    {
      pattern: '～のは～です',
      vietnamese: 'cái... là...',
      english: 'what... is...',
      type: 'main',
      explanation: 'Dùng để nhấn mạnh chủ đề. Danh từ hóa câu bằng の rồi dùng làm chủ ngữ. の danh từ hóa động từ hoặc tính từ.',
      examples: [
        {
          japanese: '私の趣味は映画を見るのです。',
          vietnamese: 'Sở thích của tôi là xem phim.',
          english: 'My hobby is watching movies.',
          type: 'main'
        },
        {
          japanese: '難しいのは漢字を覚えることです。',
          vietnamese: 'Cái khó là nhớ kanji.',
          english: 'What is difficult is memorizing kanji.',
          type: 'main'
        },
        {
          japanese: '大切なのは努力することです。',
          vietnamese: 'Điều quan trọng là cố gắng.',
          english: 'What is important is to make an effort.',
          type: 'main'
        },
        {
          japanese: '好きなのは読書をすることです。',
          vietnamese: 'Điều tôi thích là đọc sách.',
          english: 'What I like is reading books.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～のが～',
      vietnamese: 'việc... thì...',
      english: 'the act of... is...',
      type: 'main',
      explanation: 'Tương tự ～のは～ nhưng が nhấn mạnh thông tin mới hoặc tính từ/động từ đi sau. の danh từ hóa câu để làm chủ ngữ.',
      examples: [
        {
          japanese: '日本語を話すのが上手ですね。',
          vietnamese: 'Bạn nói tiếng Nhật giỏi nhỉ.',
          english: 'You are good at speaking Japanese.',
          type: 'main'
        },
        {
          japanese: '早く起きるのが苦手です。',
          vietnamese: 'Tôi không giỏi việc dậy sớm.',
          english: 'I am not good at waking up early.',
          type: 'main'
        },
        {
          japanese: '料理を作るのが好きです。',
          vietnamese: 'Tôi thích nấu ăn.',
          english: 'I like cooking.',
          type: 'main'
        },
        {
          japanese: '運動するのが大切です。',
          vietnamese: 'Việc tập thể dục rất quan trọng.',
          english: 'Exercising is important.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～のを～',
      vietnamese: 'việc... (làm tân ngữ)',
      english: 'the act of... (as object)',
      type: 'main',
      explanation: 'の danh từ hóa câu để làm tân ngữ (object). を đánh dấu tân ngữ của động từ.',
      examples: [
        {
          japanese: '友達が来るのを待っています。',
          vietnamese: 'Tôi đang đợi bạn đến.',
          english: 'I am waiting for my friend to come.',
          type: 'main'
        },
        {
          japanese: '彼女が歌うのを聞きました。',
          vietnamese: 'Tôi đã nghe cô ấy hát.',
          english: 'I heard her sing.',
          type: 'main'
        },
        {
          japanese: '桜が咲くのを見ました。',
          vietnamese: 'Tôi đã thấy hoa anh đào nở.',
          english: 'I saw the cherry blossoms bloom.',
          type: 'main'
        },
        {
          japanese: '宿題を忘れるのを防ぎます。',
          vietnamese: 'Tôi ngăn chặn việc quên bài tập.',
          english: 'I prevent forgetting homework.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～ことは～',
      vietnamese: 'việc... là...',
      english: 'the fact that... is...',
      type: 'main',
      explanation: 'こと cũng danh từ hóa câu như の nhưng mang tính trừu tượng, chung chung hơn. Dùng cho sự thật, kiến thức, khả năng.',
      examples: [
        {
          japanese: '日本語を話せることは便利です。',
          vietnamese: 'Việc có thể nói tiếng Nhật thì tiện lợi.',
          english: 'Being able to speak Japanese is convenient.',
          type: 'main'
        },
        {
          japanese: '健康であることは幸せです。',
          vietnamese: 'Việc khỏe mạnh là hạnh phúc.',
          english: 'Being healthy is happiness.',
          type: 'main'
        },
        {
          japanese: '彼が来ないことは分かっていました。',
          vietnamese: 'Tôi đã biết việc anh ấy không đến.',
          english: 'I knew that he would not come.',
          type: 'main'
        }
      ]
    },
    {
      pattern: '～ことができる',
      vietnamese: 'có thể...',
      english: 'can/be able to...',
      type: 'main',
      explanation: 'Biểu thị khả năng. こと danh từ hóa động từ, できる nghĩa là có thể làm được.',
      examples: [
        {
          japanese: '日本語を読むことができます。',
          vietnamese: 'Tôi có thể đọc tiếng Nhật.',
          english: 'I can read Japanese.',
          type: 'main'
        },
        {
          japanese: 'ここで写真を撮ることができますか。',
          vietnamese: 'Có thể chụp ảnh ở đây không?',
          english: 'Can I take pictures here?',
          type: 'main'
        },
        {
          japanese: '明日来ることができません。',
          vietnamese: 'Ngày mai tôi không thể đến.',
          english: 'I cannot come tomorrow.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～と思う',
      vietnamese: 'tôi nghĩ rằng...',
      english: 'I think that...',
      type: 'main',
      explanation: 'Biểu thị suy nghĩ, ý kiến của người nói. と đánh dấu nội dung câu trích dẫn hoặc suy nghĩ.',
      examples: [
        {
          japanese: '明日は雨が降ると思います。',
          vietnamese: 'Tôi nghĩ ngày mai sẽ mưa.',
          english: 'I think it will rain tomorrow.',
          type: 'main'
        },
        {
          japanese: '彼は来ないと思います。',
          vietnamese: 'Tôi nghĩ anh ấy sẽ không đến.',
          english: 'I think he will not come.',
          type: 'main'
        },
        {
          japanese: 'この本は面白いと思いました。',
          vietnamese: 'Tôi đã nghĩ cuốn sách này thú vị.',
          english: 'I thought this book was interesting.',
          type: 'main'
        },
        {
          japanese: '試験に合格できると思います。',
          vietnamese: 'Tôi nghĩ mình có thể đậu kỳ thi.',
          english: 'I think I can pass the exam.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～と言う/言った',
      vietnamese: 'nói rằng...',
      english: 'say that...',
      type: 'main',
      explanation: 'Trích dẫn lời nói của ai đó. と đánh dấu nội dung được trích dẫn.',
      examples: [
        {
          japanese: '先生は明日休みだと言いました。',
          vietnamese: 'Thầy nói ngày mai nghỉ.',
          english: 'The teacher said that tomorrow is a holiday.',
          type: 'main'
        },
        {
          japanese: '彼は来ると言っていました。',
          vietnamese: 'Anh ấy nói sẽ đến.',
          english: 'He said he would come.',
          type: 'main'
        },
        {
          japanese: '母は早く帰りなさいと言いました。',
          vietnamese: 'Mẹ nói hãy về sớm.',
          english: 'My mother said to come home early.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～と聞く/聞いた',
      vietnamese: 'nghe nói rằng...',
      english: 'hear that...',
      type: 'additional',
      explanation: 'Biểu thị thông tin được nghe từ người khác. と đánh dấu nội dung được nghe.',
      examples: [
        {
          japanese: '田中さんは結婚すると聞きました。',
          vietnamese: 'Tôi nghe nói anh Tanaka sẽ kết hôn.',
          english: 'I heard that Mr. Tanaka will get married.',
          type: 'main'
        },
        {
          japanese: 'あの店は美味しいと聞いています。',
          vietnamese: 'Tôi nghe nói quán đó ngon.',
          english: 'I hear that that restaurant is delicious.',
          type: 'main'
        },
        {
          japanese: '明日は雪だと聞きました。',
          vietnamese: 'Tôi nghe nói ngày mai sẽ có tuyết.',
          english: 'I heard it will snow tomorrow.',
          type: 'additional'
        }
      ]
    }
  ]
};

/**
 * N4 Core Lessons — Lesson 13: Volitional Form and Intentions
 * Expressing will, intentions, and suggestions
 */

import type { LessonData } from '$lib/types';

export const LESSON_13_DATA: LessonData = {
  lessonNumber: 13,
  title: '意向形 (Thể ý chí và dự định)',
  vocabulary: [
    // Future plans and intentions
    {
      japanese: 'つもり',
      kana: 'つもり',
      vietnamese: 'định, dự định',
      english: 'intention, plan',
      type: 'main',
      example: '明日行くつもりです。'
    },
    {
      japanese: '予定',
      kana: 'よてい',
      vietnamese: 'kế hoạch, dự định',
      english: 'plan, schedule',
      type: 'main',
      example: '明日の予定は何ですか。'
    },
    {
      japanese: '計画',
      kana: 'けいかく',
      vietnamese: 'kế hoạch',
      english: 'plan, project',
      type: 'main',
      example: '旅行の計画を立てます。'
    },
    {
      japanese: '予約',
      kana: 'よやく',
      vietnamese: 'đặt trước',
      english: 'reservation, booking',
      type: 'main',
      example: 'レストランを予約します。'
    },
    {
      japanese: '準備',
      kana: 'じゅんび',
      vietnamese: 'chuẩn bị',
      english: 'preparation',
      type: 'main',
      example: '旅行の準備をします。'
    },
    {
      japanese: '支度',
      kana: 'したく',
      vietnamese: 'chuẩn bị, sửa soạn',
      english: 'preparation, arrangement',
      type: 'main',
      example: '出かける支度をします。'
    },

    // Decisions and choices
    {
      japanese: '決める',
      kana: 'きめる',
      vietnamese: 'quyết định',
      english: 'to decide',
      type: 'main',
      example: '行くことに決めました。'
    },
    {
      japanese: '決まる',
      kana: 'きまる',
      vietnamese: 'được quyết định',
      english: 'to be decided',
      type: 'main',
      example: '日程が決まりました。'
    },
    {
      japanese: '選ぶ',
      kana: 'えらぶ',
      vietnamese: 'chọn',
      english: 'to choose, to select',
      type: 'main',
      example: 'これを選びます。'
    },
    {
      japanese: '迷う',
      kana: 'まよう',
      vietnamese: 'do dự, phân vân',
      english: 'to hesitate, to be confused',
      type: 'main',
      example: 'どちらにするか迷っています。'
    },
    {
      japanese: '考える',
      kana: 'かんがえる',
      vietnamese: 'suy nghĩ',
      english: 'to think, to consider',
      type: 'main',
      example: '少し考えます。'
    },

    // Suggestions and invitations
    {
      japanese: '誘う',
      kana: 'さそう',
      vietnamese: 'mời, rủ',
      english: 'to invite, to ask',
      type: 'main',
      example: '友達を誘います。'
    },
    {
      japanese: '誘い',
      kana: 'さそい',
      vietnamese: 'lời mời',
      english: 'invitation',
      type: 'main',
      example: '誘いを受けます。'
    },
    {
      japanese: '断る',
      kana: 'ことわる',
      vietnamese: 'từ chối',
      english: 'to refuse, to decline',
      type: 'main',
      example: '誘いを断りました。'
    },
    {
      japanese: '承る',
      kana: 'うけたまわる',
      vietnamese: 'nhận (khiêm tốn)',
      english: 'to receive, to accept (humble)',
      type: 'main',
      example: 'ご注文を承ります。'
    },
    {
      japanese: '相談',
      kana: 'そうだん',
      vietnamese: 'tham khảo, bàn bạc',
      english: 'consultation, discussion',
      type: 'main',
      example: '相談したいことがあります。'
    },

    // Actions and activities
    {
      japanese: '出発',
      kana: 'しゅっぱつ',
      vietnamese: 'xuất phát, khởi hành',
      english: 'departure',
      type: 'main',
      example: '朝7時に出発します。'
    },
    {
      japanese: '到着',
      kana: 'とうちゃく',
      vietnamese: 'đến nơi',
      english: 'arrival',
      type: 'main',
      example: '何時に到着しますか。'
    },
    {
      japanese: '集合',
      kana: 'しゅうごう',
      vietnamese: 'tập hợp',
      english: 'gathering, meeting',
      type: 'main',
      example: '駅で集合しましょう。'
    },
    {
      japanese: '集まる',
      kana: 'あつまる',
      vietnamese: 'tập trung',
      english: 'to gather',
      type: 'main',
      example: 'みんなで集まります。'
    },
    {
      japanese: '会議',
      kana: 'かいぎ',
      vietnamese: 'cuộc họp',
      english: 'meeting, conference',
      type: 'main',
      example: '会議に出席します。'
    },
    {
      japanese: 'ミーティング',
      kana: 'ミーティング',
      vietnamese: 'cuộc họp',
      english: 'meeting',
      type: 'main',
      example: 'ミーティングがあります。'
    },

    // Travel and outings
    {
      japanese: '旅行',
      kana: 'りょこう',
      vietnamese: 'du lịch',
      english: 'travel, trip',
      type: 'main',
      example: '来月旅行に行くつもりです。'
    },
    {
      japanese: '観光',
      kana: 'かんこう',
      vietnamese: 'tham quan',
      english: 'sightseeing',
      type: 'main',
      example: '京都を観光します。'
    },
    {
      japanese: '散歩',
      kana: 'さんぽ',
      vietnamese: 'đi dạo',
      english: 'walk, stroll',
      type: 'main',
      example: '公園を散歩しましょう。'
    },
    {
      japanese: 'ピクニック',
      kana: 'ピクニック',
      vietnamese: 'dã ngoại',
      english: 'picnic',
      type: 'main',
      example: 'ピクニックに行きませんか。'
    },
    {
      japanese: 'ドライブ',
      kana: 'ドライブ',
      vietnamese: 'lái xe đi chơi',
      english: 'drive',
      type: 'main',
      example: 'ドライブに行きましょう。'
    },
    {
      japanese: 'ハイキング',
      kana: 'ハイキング',
      vietnamese: 'đi bộ leo núi',
      english: 'hiking',
      type: 'main',
      example: 'ハイキングに行く予定です。'
    },

    // Weather and seasons
    {
      japanese: '春',
      kana: 'はる',
      vietnamese: 'mùa xuân',
      english: 'spring',
      type: 'main',
      example: '春になったら、花見に行きましょう。'
    },
    {
      japanese: '夏',
      kana: 'なつ',
      vietnamese: 'mùa hè',
      english: 'summer',
      type: 'main',
      example: '夏に海に行くつもりです。'
    },
    {
      japanese: '秋',
      kana: 'あき',
      vietnamese: 'mùa thu',
      english: 'autumn, fall',
      type: 'main',
      example: '秋になったら、紅葉を見に行きます。'
    },
    {
      japanese: '冬',
      kana: 'ふゆ',
      vietnamese: 'mùa đông',
      english: 'winter',
      type: 'main',
      example: '冬にスキーに行きましょう。'
    },
    {
      japanese: '季節',
      kana: 'きせつ',
      vietnamese: 'mùa',
      english: 'season',
      type: 'main',
      example: '好きな季節は何ですか。'
    },

    // Time expressions
    {
      japanese: '今後',
      kana: 'こんご',
      vietnamese: 'từ nay về sau',
      english: 'from now on, hereafter',
      type: 'main',
      example: '今後もよろしくお願いします。'
    },
    {
      japanese: '将来',
      kana: 'しょうらい',
      vietnamese: 'tương lai',
      english: 'future',
      type: 'main',
      example: '将来の夢は何ですか。'
    },
    {
      japanese: '未来',
      kana: 'みらい',
      vietnamese: 'tương lai',
      english: 'future',
      type: 'main',
      example: '明るい未来があります。'
    },
    {
      japanese: 'いつか',
      kana: 'いつか',
      vietnamese: 'một ngày nào đó',
      english: 'someday, sometime',
      type: 'main',
      example: 'いつか日本に住みたいです。'
    },
    {
      japanese: 'そのうち',
      kana: 'そのうち',
      vietnamese: 'sớm muộn, rồi sẽ',
      english: 'before long, sooner or later',
      type: 'main',
      example: 'そのうち会いましょう。'
    },
    {
      japanese: 'いずれ',
      kana: 'いずれ',
      vietnamese: 'rồi sẽ, cuối cùng',
      english: 'someday, eventually',
      type: 'main',
      example: 'いずれ分かります。'
    },

    // Additional vocabulary
    {
      japanese: '希望',
      kana: 'きぼう',
      vietnamese: 'hy vọng',
      english: 'hope, wish',
      type: 'additional',
      example: '希望があります。'
    },
    {
      japanese: '願い',
      kana: 'ねがい',
      vietnamese: 'nguyện vọng',
      english: 'wish, desire',
      type: 'additional',
      example: '願いが叶いました。'
    },
    {
      japanese: '夢',
      kana: 'ゆめ',
      vietnamese: 'giấc mơ, ước mơ',
      english: 'dream',
      type: 'additional',
      example: '夢を叶えたいです。'
    },
    {
      japanese: '目標',
      kana: 'もくひょう',
      vietnamese: 'mục tiêu',
      english: 'goal, objective',
      type: 'additional',
      example: '目標に向かって頑張ります。'
    },
    {
      japanese: '目的',
      kana: 'もくてき',
      vietnamese: 'mục đích',
      english: 'purpose, aim',
      type: 'additional',
      example: '旅行の目的は何ですか。'
    },
    {
      japanese: '約束',
      kana: 'やくそく',
      vietnamese: 'lời hứa',
      english: 'promise, appointment',
      type: 'additional',
      example: '約束を守ります。'
    },
    {
      japanese: '用事',
      kana: 'ようじ',
      vietnamese: 'việc bận, công việc',
      english: 'errand, business',
      type: 'additional',
      example: '用事があります。'
    },
    {
      japanese: '都合',
      kana: 'つごう',
      vietnamese: 'sự thuận tiện',
      english: 'convenience, circumstances',
      type: 'additional',
      example: '都合がいいです。'
    },
    {
      japanese: '提案',
      kana: 'ていあん',
      vietnamese: 'đề xuất',
      english: 'proposal, suggestion',
      type: 'additional',
      example: '提案があります。'
    },
    {
      japanese: '意見',
      kana: 'いけん',
      vietnamese: 'ý kiến',
      english: 'opinion',
      type: 'additional',
      example: 'ご意見をお聞かせください。'
    },
    {
      japanese: '意志',
      kana: 'いし',
      vietnamese: 'ý chí',
      english: 'will, intention',
      type: 'additional',
      example: '強い意志があります。'
    },
    {
      japanese: '気持ち',
      kana: 'きもち',
      vietnamese: 'tâm trạng, cảm xúc',
      english: 'feeling, mood',
      type: 'additional',
      example: '気持ちが分かります。'
    },
    {
      japanese: '態度',
      kana: 'たいど',
      vietnamese: 'thái độ',
      english: 'attitude',
      type: 'additional',
      example: '前向きな態度です。'
    },
    {
      japanese: '決心',
      kana: 'けっしん',
      vietnamese: 'quyết tâm',
      english: 'determination, resolution',
      type: 'additional',
      example: '決心しました。'
    },
    {
      japanese: '覚悟',
      kana: 'かくご',
      vietnamese: 'quyết tâm, chuẩn bị tinh thần',
      english: 'resolution, preparedness',
      type: 'additional',
      example: '覚悟ができました。'
    },
    {
      japanese: '実現',
      kana: 'じつげん',
      vietnamese: 'thực hiện',
      english: 'realization',
      type: 'additional',
      example: '夢を実現します。'
    },

    // Supplementary
    {
      japanese: '企画',
      kana: 'きかく',
      vietnamese: 'kế hoạch, dự án',
      english: 'plan, project',
      type: 'supplementary',
      example: 'イベントを企画します。'
    },
    {
      japanese: '方針',
      kana: 'ほうしん',
      vietnamese: 'phương châm',
      english: 'policy, course',
      type: 'supplementary',
      example: '新しい方針を決めます。'
    },
    {
      japanese: '作戦',
      kana: 'さくせん',
      vietnamese: 'chiến lược',
      english: 'strategy, tactics',
      type: 'supplementary',
      example: '作戦を立てます。'
    },
    {
      japanese: '段取り',
      kana: 'だんどり',
      vietnamese: 'sắp xếp, chuẩn bị',
      english: 'arrangement, preparation',
      type: 'supplementary',
      example: '段取りを確認します。'
    },
    {
      japanese: '手配',
      kana: 'てはい',
      vietnamese: 'sắp xếp, thu xếp',
      english: 'arrangement, preparation',
      type: 'supplementary',
      example: 'チケットを手配します。'
    }
  ],
  grammar: [
    {
      pattern: '意向形 (Volitional form)',
      vietnamese: 'thể ý chí',
      english: 'let\'s ~, shall we ~',
      type: 'main',
      explanation: 'Diễn tả ý chí, rủ rê. Nhóm 1: う→おう. Nhóm 2: る→よう. Nhóm 3: する→しよう, 来る→来よう.',
      examples: [
        {
          japanese: '一緒に行きましょう。',
          vietnamese: 'Cùng đi nhé.',
          english: 'Let\'s go together.',
          type: 'main'
        },
        {
          japanese: '映画を見ましょうか。',
          vietnamese: 'Xem phim nhé?',
          english: 'Shall we watch a movie?',
          type: 'main'
        },
        {
          japanese: '休みましょう。',
          vietnamese: 'Nghỉ ngơi thôi.',
          english: 'Let\'s take a break.',
          type: 'main'
        },
        {
          japanese: 'さあ、始めましょう。',
          vietnamese: 'Nào, bắt đầu thôi.',
          english: 'Now, let\'s begin.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '〜つもりだ',
      vietnamese: 'định ~, dự định ~',
      english: 'intend to ~, plan to ~',
      type: 'main',
      explanation: 'Diễn tả dự định, kế hoạch của người nói. Dùng với động từ thể từ điển + つもりだ.',
      examples: [
        {
          japanese: '明日早く起きるつもりです。',
          vietnamese: 'Tôi định dậy sớm ngày mai.',
          english: 'I intend to wake up early tomorrow.',
          type: 'main'
        },
        {
          japanese: '来年日本に留学するつもりです。',
          vietnamese: 'Tôi dự định du học Nhật năm sau.',
          english: 'I plan to study in Japan next year.',
          type: 'main'
        },
        {
          japanese: 'タバコをやめるつもりです。',
          vietnamese: 'Tôi định bỏ thuốc.',
          english: 'I intend to quit smoking.',
          type: 'main'
        }
      ]
    },
    {
      pattern: '〜予定だ',
      vietnamese: 'dự định ~',
      english: 'plan to ~, scheduled to ~',
      type: 'main',
      explanation: 'Diễn tả kế hoạch đã được quyết định. Dùng với động từ thể từ điển + 予定だ.',
      examples: [
        {
          japanese: '明日東京へ行く予定です。',
          vietnamese: 'Tôi dự định đi Tokyo ngày mai.',
          english: 'I plan to go to Tokyo tomorrow.',
          type: 'main'
        },
        {
          japanese: '来週試験がある予定です。',
          vietnamese: 'Tuần sau dự định có thi.',
          english: 'There is supposed to be an exam next week.',
          type: 'main'
        },
        {
          japanese: '午後3時に到着する予定です。',
          vietnamese: 'Dự định đến lúc 3 giờ chiều.',
          english: 'We are scheduled to arrive at 3 PM.',
          type: 'main'
        }
      ]
    },
    {
      pattern: '〜と思う',
      vietnamese: 'nghĩ rằng ~',
      english: 'think that ~',
      type: 'main',
      explanation: 'Diễn tả suy nghĩ, ý kiến chủ quan. Có thể dùng với câu thông thường + と思う.',
      examples: [
        {
          japanese: '明日は雨が降ると思います。',
          vietnamese: 'Tôi nghĩ ngày mai sẽ mưa.',
          english: 'I think it will rain tomorrow.',
          type: 'main'
        },
        {
          japanese: 'この映画はおもしろいと思います。',
          vietnamese: 'Tôi nghĩ phim này hay.',
          english: 'I think this movie is interesting.',
          type: 'main'
        },
        {
          japanese: '彼は来ないと思います。',
          vietnamese: 'Tôi nghĩ anh ấy sẽ không đến.',
          english: 'I don\'t think he will come.',
          type: 'main'
        }
      ]
    },
    {
      pattern: '〜ませんか',
      vietnamese: 'không ~?',
      english: 'won\'t you ~? (invitation)',
      type: 'main',
      explanation: 'Cách mời lịch sự hơn ましょう. Dùng để rủ rê người khác.',
      examples: [
        {
          japanese: '一緒に映画を見ませんか。',
          vietnamese: 'Cùng xem phim không?',
          english: 'Won\'t you watch a movie together?',
          type: 'main'
        },
        {
          japanese: 'お茶を飲みませんか。',
          vietnamese: 'Uống trà không?',
          english: 'Won\'t you have some tea?',
          type: 'main'
        },
        {
          japanese: '今度遊びに来ませんか。',
          vietnamese: 'Lần sau đến chơi không?',
          english: 'Won\'t you come visit next time?',
          type: 'main'
        }
      ]
    },
    {
      pattern: '〜ましょうか',
      vietnamese: 'nhé?, có phải không?',
      english: 'shall we ~?',
      type: 'main',
      explanation: 'Dùng để đề nghị hoặc hỏi ý kiến người khác.',
      examples: [
        {
          japanese: '窓を開けましょうか。',
          vietnamese: 'Tôi mở cửa sổ nhé?',
          english: 'Shall I open the window?',
          type: 'main'
        },
        {
          japanese: '手伝いましょうか。',
          vietnamese: 'Tôi giúp nhé?',
          english: 'Shall I help?',
          type: 'main'
        },
        {
          japanese: 'コーヒーを入れましょうか。',
          vietnamese: 'Tôi pha cà phê nhé?',
          english: 'Shall I make coffee?',
          type: 'main'
        }
      ]
    },
    {
      pattern: '〜ようと思う',
      vietnamese: 'nghĩ sẽ ~',
      english: 'think about doing ~',
      type: 'additional',
      explanation: 'Diễn tả ý định tạm thời, chưa quyết định chắc chắn. Dùng với thể ý chí + と思う.',
      examples: [
        {
          japanese: '日本語を勉強しようと思います。',
          vietnamese: 'Tôi nghĩ sẽ học tiếng Nhật.',
          english: 'I think I\'ll study Japanese.',
          type: 'main'
        },
        {
          japanese: '明日早く起きようと思います。',
          vietnamese: 'Tôi nghĩ sẽ dậy sớm ngày mai.',
          english: 'I think I\'ll wake up early tomorrow.',
          type: 'main'
        },
        {
          japanese: '髪を切ろうと思います。',
          vietnamese: 'Tôi nghĩ sẽ cắt tóc.',
          english: 'I think I\'ll cut my hair.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '〜ことにする',
      vietnamese: 'quyết định ~',
      english: 'decide to ~',
      type: 'additional',
      explanation: 'Diễn tả quyết định của bản thân. Dùng với động từ thể từ điển + ことにする.',
      examples: [
        {
          japanese: '日本に留学することにしました。',
          vietnamese: 'Tôi đã quyết định du học Nhật.',
          english: 'I decided to study in Japan.',
          type: 'main'
        },
        {
          japanese: 'タバコをやめることにしました。',
          vietnamese: 'Tôi đã quyết định bỏ thuốc.',
          english: 'I decided to quit smoking.',
          type: 'main'
        },
        {
          japanese: '毎日運動することにします。',
          vietnamese: 'Tôi quyết định tập thể dục mỗi ngày.',
          english: 'I\'ll decide to exercise every day.',
          type: 'additional'
        }
      ]
    }
  ]
};

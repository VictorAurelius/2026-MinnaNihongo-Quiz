/**
 * N4 Core Lessons — Lesson 09: Causative Form
 * Focus: 使役形 (causative form) - making/letting someone do something
 */

import type { LessonData } from '$lib/types';

export const LESSON_09_DATA: LessonData = {
  lessonNumber: 9,
  title: '使役形 (Thể sai khiến)',
  vocabulary: [
    // Verbs commonly used in causative
    {
      japanese: '行かせる',
      kana: 'いかせる',
      vietnamese: 'bắt/cho đi',
      english: 'to make/let go',
      type: 'main',
      example: '子供を学校に行かせます。'
    },
    {
      japanese: '来させる',
      kana: 'こさせる',
      vietnamese: 'bắt/cho đến',
      english: 'to make/let come',
      type: 'main',
      example: '部下を会議に来させました。'
    },
    {
      japanese: '食べさせる',
      kana: 'たべさせる',
      vietnamese: 'cho ăn',
      english: 'to feed, to let eat',
      type: 'main',
      example: '赤ちゃんに離乳食を食べさせます。'
    },
    {
      japanese: '飲ませる',
      kana: 'のませる',
      vietnamese: 'cho uống',
      english: 'to give a drink',
      type: 'main',
      example: '子供に薬を飲ませました。'
    },
    {
      japanese: '休ませる',
      kana: 'やすませる',
      vietnamese: 'cho nghỉ',
      english: 'to let rest',
      type: 'main',
      example: '病気の社員を休ませました。'
    },
    {
      japanese: '待たせる',
      kana: 'またせる',
      vietnamese: 'bắt đợi',
      english: 'to make wait',
      type: 'main',
      example: 'お客様を待たせてしまいました。'
    },
    {
      japanese: '泣かせる',
      kana: 'なかせる',
      vietnamese: 'làm khóc',
      english: 'to make cry',
      type: 'main',
      example: '子供を泣かせてしまいました。'
    },
    {
      japanese: '笑わせる',
      kana: 'わらわせる',
      vietnamese: 'làm cười',
      english: 'to make laugh',
      type: 'main',
      example: '友達を笑わせました。'
    },
    {
      japanese: '喜ばせる',
      kana: 'よろこばせる',
      vietnamese: 'làm vui',
      english: 'to please, to make happy',
      type: 'main',
      example: '母を喜ばせたいです。'
    },
    {
      japanese: '怒らせる',
      kana: 'おこらせる',
      vietnamese: 'làm tức giận',
      english: 'to make angry',
      type: 'main',
      example: '先生を怒らせてしまいました。'
    },
    {
      japanese: '心配させる',
      kana: 'しんぱいさせる',
      vietnamese: 'làm lo lắng',
      english: 'to make worry',
      type: 'main',
      example: '親を心配させてしまいました。'
    },
    {
      japanese: '困らせる',
      kana: 'こまらせる',
      vietnamese: 'làm khó',
      english: 'to trouble',
      type: 'main',
      example: '質問で先生を困らせました。'
    },
    {
      japanese: '驚かせる',
      kana: 'おどろかせる',
      vietnamese: 'làm ngạc nhiên',
      english: 'to surprise',
      type: 'main',
      example: '友達を驚かせました。'
    },
    {
      japanese: '感動させる',
      kana: 'かんどうさせる',
      vietnamese: 'làm cảm động',
      english: 'to move emotionally',
      type: 'main',
      example: 'あの映画は人を感動させます。'
    },
    {
      japanese: '勉強させる',
      kana: 'べんきょうさせる',
      vietnamese: 'bắt học',
      english: 'to make study',
      type: 'main',
      example: '子供に英語を勉強させています。'
    },
    {
      japanese: '働かせる',
      kana: 'はたらかせる',
      vietnamese: 'bắt làm việc',
      english: 'to make work',
      type: 'main',
      example: '社員を残業させました。'
    },
    {
      japanese: '手伝わせる',
      kana: 'てつだわせる',
      vietnamese: 'bắt giúp',
      english: 'to make help',
      type: 'main',
      example: '息子に料理を手伝わせました。'
    },
    {
      japanese: '掃除させる',
      kana: 'そうじさせる',
      vietnamese: 'bắt dọn dẹp',
      english: 'to make clean',
      type: 'main',
      example: '子供に部屋を掃除させます。'
    },
    {
      japanese: '覚えさせる',
      kana: 'おぼえさせる',
      vietnamese: 'bắt nhớ',
      english: 'to make remember',
      type: 'main',
      example: '学生に単語を覚えさせました。'
    },
    {
      japanese: '考えさせる',
      kana: 'かんがえさせる',
      vietnamese: 'bắt suy nghĩ',
      english: 'to make think',
      type: 'main',
      example: '生徒に自分で考えさせます。'
    },
    // Permission and allowing
    {
      japanese: '許す',
      kana: 'ゆるす',
      vietnamese: 'cho phép',
      english: 'to permit, to forgive',
      type: 'main',
      example: '外出を許しました。'
    },
    {
      japanese: '許可する',
      kana: 'きょかする',
      vietnamese: 'cho phép (chính thức)',
      english: 'to permit (formal)',
      type: 'main',
      example: '上司が許可してくれました。'
    },
    {
      japanese: '禁止する',
      kana: 'きんしする',
      vietnamese: 'cấm',
      english: 'to prohibit',
      type: 'main',
      example: 'ここでの喫煙は禁止されています。'
    },
    {
      japanese: '命令する',
      kana: 'めいれいする',
      vietnamese: 'ra lệnh',
      english: 'to order',
      type: 'main',
      example: '上司が残業を命令しました。'
    },
    {
      japanese: '強制する',
      kana: 'きょうせいする',
      vietnamese: 'ép buộc',
      english: 'to force',
      type: 'main',
      example: '無理に強制するのは良くないです。'
    },
    {
      japanese: '義務',
      kana: 'ぎむ',
      vietnamese: 'nghĩa vụ',
      english: 'duty, obligation',
      type: 'main',
      example: '税金を払うのは国民の義務です。'
    },
    {
      japanese: '責任',
      kana: 'せきにん',
      vietnamese: 'trách nhiệm',
      english: 'responsibility',
      type: 'main',
      example: 'リーダーには責任があります。'
    },
    {
      japanese: '権利',
      kana: 'けんり',
      vietnamese: 'quyền lợi',
      english: 'right',
      type: 'main',
      example: '誰でも教育を受ける権利があります。'
    },
    {
      japanese: '自由',
      kana: 'じゆう',
      vietnamese: 'tự do',
      english: 'freedom',
      type: 'main',
      example: '子供に自由にさせています。'
    },
    // Related nouns
    {
      japanese: '親',
      kana: 'おや',
      vietnamese: 'cha mẹ',
      english: 'parent',
      type: 'main',
      example: '親は子供に勉強させます。'
    },
    {
      japanese: '上司',
      kana: 'じょうし',
      vietnamese: 'cấp trên',
      english: 'boss',
      type: 'main',
      example: '上司が部下を働かせます。'
    },
    {
      japanese: '部下',
      kana: 'ぶか',
      vietnamese: 'cấp dưới',
      english: 'subordinate',
      type: 'main',
      example: '部下に資料を作らせました。'
    },
    {
      japanese: '先生',
      kana: 'せんせい',
      vietnamese: 'giáo viên',
      english: 'teacher',
      type: 'main',
      example: '先生は生徒に宿題をさせます。'
    },
    {
      japanese: '生徒',
      kana: 'せいと',
      vietnamese: 'học sinh',
      english: 'student',
      type: 'main',
      example: '生徒に作文を書かせました。'
    },
    {
      japanese: '監督',
      kana: 'かんとく',
      vietnamese: 'huấn luyện viên',
      english: 'coach, director',
      type: 'main',
      example: '監督が選手を走らせました。'
    },
    {
      japanese: '選手',
      kana: 'せんしゅ',
      vietnamese: 'vận động viên',
      english: 'athlete, player',
      type: 'main',
      example: '選手に練習させました。'
    },
    // Actions and states
    {
      japanese: '残業',
      kana: 'ざんぎょう',
      vietnamese: 'làm thêm giờ',
      english: 'overtime work',
      type: 'main',
      example: '部下を残業させました。'
    },
    {
      japanese: '出張',
      kana: 'しゅっちょう',
      vietnamese: 'công tác',
      english: 'business trip',
      type: 'main',
      example: '社員を出張させました。'
    },
    {
      japanese: '留学',
      kana: 'りゅうがく',
      vietnamese: 'du học',
      english: 'study abroad',
      type: 'main',
      example: '娘を留学させたいです。'
    },
    {
      japanese: '練習',
      kana: 'れんしゅう',
      vietnamese: 'luyện tập',
      english: 'practice',
      type: 'main',
      example: '選手に練習させました。'
    },
    {
      japanese: '経験',
      kana: 'けいけん',
      vietnamese: 'kinh nghiệm',
      english: 'experience',
      type: 'main',
      example: '若い人にいろいろ経験させたいです。'
    },
    {
      japanese: '体験',
      kana: 'たいけん',
      vietnamese: 'trải nghiệm',
      english: 'personal experience',
      type: 'main',
      example: '子供に色々なことを体験させます。'
    },
    {
      japanese: '挑戦',
      kana: 'ちょうせん',
      vietnamese: 'thử thách',
      english: 'challenge',
      type: 'main',
      example: '新しいことに挑戦させました。'
    },
    // Additional verbs
    {
      japanese: '育てる',
      kana: 'そだてる',
      vietnamese: 'nuôi dưỡng',
      english: 'to raise, to bring up',
      type: 'additional',
      example: '子供を大切に育てます。'
    },
    {
      japanese: '教育する',
      kana: 'きょういくする',
      vietnamese: 'giáo dục',
      english: 'to educate',
      type: 'additional',
      example: '子供を教育するのは大切です。'
    },
    {
      japanese: '指導する',
      kana: 'しどうする',
      vietnamese: 'chỉ đạo',
      english: 'to guide, to coach',
      type: 'additional',
      example: '若い社員を指導します。'
    },
    {
      japanese: '訓練する',
      kana: 'くんれんする',
      vietnamese: 'huấn luyện',
      english: 'to train',
      type: 'additional',
      example: '新入社員を訓練します。'
    },
    {
      japanese: '鍛える',
      kana: 'きたえる',
      vietnamese: 'rèn luyện',
      english: 'to train, to strengthen',
      type: 'additional',
      example: '体を鍛えています。'
    },
    // Supplementary expressions
    {
      japanese: '仕方がない',
      kana: 'しかたがない',
      vietnamese: 'không còn cách nào',
      english: 'it can\'t be helped',
      type: 'supplementary',
      example: '仕方がないから行かせます。'
    },
    {
      japanese: 'わがまま',
      kana: 'わがまま',
      vietnamese: 'ích kỷ, muốn gì được nấy',
      english: 'selfish, willful',
      type: 'supplementary',
      example: '子供をわがままにさせないでください。'
    },
    {
      japanese: '自立する',
      kana: 'じりつする',
      vietnamese: 'tự lập',
      english: 'to be independent',
      type: 'supplementary',
      example: '子供を自立させたいです。'
    },
    {
      japanese: '成長する',
      kana: 'せいちょうする',
      vietnamese: 'trưởng thành',
      english: 'to grow',
      type: 'supplementary',
      example: '子供を成長させたいです。'
    },
    {
      japanese: '発展する',
      kana: 'はってんする',
      vietnamese: 'phát triển',
      english: 'to develop',
      type: 'supplementary',
      example: '会社を発展させたいです。'
    },
    {
      japanese: '安心する',
      kana: 'あんしんする',
      vietnamese: 'yên tâm',
      english: 'to feel relieved',
      type: 'supplementary',
      example: '親を安心させたいです。'
    },
    {
      japanese: '満足する',
      kana: 'まんぞくする',
      vietnamese: 'hài lòng',
      english: 'to be satisfied',
      type: 'supplementary',
      example: 'お客様を満足させるのが目標です。'
    },
    {
      japanese: '反省する',
      kana: 'はんせいする',
      vietnamese: 'phản tỉnh',
      english: 'to reflect, to regret',
      type: 'supplementary',
      example: '生徒に反省させました。'
    },
    {
      japanese: '理解する',
      kana: 'りかいする',
      vietnamese: 'hiểu',
      english: 'to understand',
      type: 'supplementary',
      example: '学生に理解させるのが難しいです。'
    },
    {
      japanese: '納得する',
      kana: 'なっとくする',
      vietnamese: 'thuyết phục',
      english: 'to be convinced',
      type: 'supplementary',
      example: '相手を納得させました。'
    }
  ],
  grammar: [
    {
      pattern: '使役形（基本）',
      vietnamese: 'thể sai khiến (cơ bản)',
      english: 'causative form (basic)',
      type: 'main',
      explanation: 'Biểu thị hành động bắt hoặc cho phép ai đó làm gì. Cấu tạo: Nhóm I: a段 + せる (書く→書かせる), Nhóm II: る → させる (食べる→食べさせる), Nhóm III: する→させる, くる→こさせる. Người được bắt/cho phép dùng を (nhóm I tự động từ) hoặc に (nhóm II/III và nhóm I tha động từ).',
      examples: [
        {
          japanese: '母は子供に野菜を食べさせました。',
          vietnamese: 'Mẹ bắt con ăn rau.',
          english: 'The mother made her child eat vegetables.',
          type: 'main'
        },
        {
          japanese: '先生は学生を立たせました。',
          vietnamese: 'Thầy bắt học sinh đứng.',
          english: 'The teacher made the student stand.',
          type: 'main'
        },
        {
          japanese: '上司は部下に資料を作らせました。',
          vietnamese: 'Sếp bắt cấp dưới làm tài liệu.',
          english: 'The boss made the subordinate prepare documents.',
          type: 'main'
        },
        {
          japanese: '親は子供を学校に行かせます。',
          vietnamese: 'Cha mẹ bắt con đi học.',
          english: 'Parents make their children go to school.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '使役形（許可）',
      vietnamese: 'thể sai khiến (cho phép)',
      english: 'causative form (permission)',
      type: 'main',
      explanation: 'Biểu thị cho phép ai đó làm gì. Thường đi kèm với 自由に、好きに、v.v. hoặc trong ngữ cảnh xin phép.',
      examples: [
        {
          japanese: '親は子供を自由に遊ばせました。',
          vietnamese: 'Cha mẹ để con tự do chơi.',
          english: 'The parents let their child play freely.',
          type: 'main'
        },
        {
          japanese: '私に考えさせてください。',
          vietnamese: 'Hãy để tôi suy nghĩ.',
          english: 'Please let me think about it.',
          type: 'main'
        },
        {
          japanese: '先生は学生に好きなテーマを選ばせました。',
          vietnamese: 'Thầy để học sinh chọn chủ đề mình thích.',
          english: 'The teacher let students choose their favorite topic.',
          type: 'main'
        },
        {
          japanese: '私を行かせてください。',
          vietnamese: 'Hãy để tôi đi.',
          english: 'Please let me go.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '使役受身形',
      vietnamese: 'thể bị động sai khiến',
      english: 'causative-passive form',
      type: 'main',
      explanation: 'Kết hợp thể sai khiến và thể bị động, biểu thị bị bắt làm gì. Cấu tạo: 使役形 + られる → させられる (nhóm I có thể rút gọn thành さされる→される). Thường mang nghĩa tiêu cực.',
      examples: [
        {
          japanese: '私は上司に残業させられました。',
          vietnamese: 'Tôi bị sếp bắt làm thêm giờ.',
          english: 'I was made to work overtime by my boss.',
          type: 'main'
        },
        {
          japanese: '子供の時、毎日ピアノを練習させられました。',
          vietnamese: 'Hồi bé, tôi bị bắt luyện piano mỗi ngày.',
          english: 'When I was a child, I was made to practice piano every day.',
          type: 'main'
        },
        {
          japanese: '長時間待たされました。',
          vietnamese: 'Tôi bị bắt đợi lâu.',
          english: 'I was made to wait a long time.',
          type: 'main'
        },
        {
          japanese: '先生に作文を書かせられました。',
          vietnamese: 'Tôi bị thầy bắt viết bài văn.',
          english: 'I was made to write an essay by my teacher.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '〜てもらう vs 〜させる',
      vietnamese: '〜てもらう (nhờ) vs 〜させる (bắt)',
      english: '〜てもらう (request) vs 〜させる (make)',
      type: 'main',
      explanation: '〜てもらう biểu thị nhờ người khác làm giúp (người khác tự nguyện). 〜させる biểu thị bắt hoặc cho phép người khác làm (có quyền lực).',
      examples: [
        {
          japanese: '友達に手伝ってもらいました。',
          vietnamese: 'Tôi nhờ bạn giúp.',
          english: 'I had my friend help me.',
          type: 'main'
        },
        {
          japanese: '子供に部屋を掃除させました。',
          vietnamese: 'Tôi bắt con dọn phòng.',
          english: 'I made my child clean the room.',
          type: 'main'
        },
        {
          japanese: '先生に説明してもらいました。',
          vietnamese: 'Tôi nhờ thầy giải thích.',
          english: 'I had my teacher explain it.',
          type: 'additional'
        },
        {
          japanese: '学生に発表させました。',
          vietnamese: 'Tôi bắt học sinh phát biểu.',
          english: 'I made the student present.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: 'を vs に（使役）',
      vietnamese: 'を vs に (thể sai khiến)',
      english: 'を vs に (causative)',
      type: 'additional',
      explanation: 'Tự động từ nhóm I dùng を. Tha động từ và các động từ khác dùng に. Ví dụ: 行く (tự động) → 行かせる dùng を, 食べる (tha động) → 食べさせる dùng に.',
      examples: [
        {
          japanese: '子供を学校に行かせます。',
          vietnamese: 'Bắt con đi học (tự động từ).',
          english: 'I make my child go to school.',
          type: 'main'
        },
        {
          japanese: '子供に野菜を食べさせます。',
          vietnamese: 'Bắt con ăn rau (tha động từ).',
          english: 'I make my child eat vegetables.',
          type: 'main'
        }
      ]
    },
    {
      pattern: '使役形の感情表現',
      vietnamese: 'biểu hiện cảm xúc với thể sai khiến',
      english: 'expressing emotions with causative',
      type: 'additional',
      explanation: 'Dùng thể sai khiến với động từ biểu thị cảm xúc để nói về việc làm người khác có cảm xúc đó.',
      examples: [
        {
          japanese: '母を喜ばせたいです。',
          vietnamese: 'Tôi muốn làm mẹ vui.',
          english: 'I want to make my mother happy.',
          type: 'main'
        },
        {
          japanese: '先生を怒らせてしまいました。',
          vietnamese: 'Tôi đã làm thầy tức giận.',
          english: 'I made my teacher angry.',
          type: 'main'
        },
        {
          japanese: '親を心配させたくないです。',
          vietnamese: 'Tôi không muốn làm cha mẹ lo lắng.',
          english: 'I don\'t want to make my parents worry.',
          type: 'additional'
        }
      ]
    }
  ]
};

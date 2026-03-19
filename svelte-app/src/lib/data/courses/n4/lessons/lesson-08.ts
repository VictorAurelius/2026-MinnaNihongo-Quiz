/**
 * N4 Core Lessons — Lesson 08: Passive Form
 * Focus: 受身形 (passive form) - expressing receiving actions
 */

import type { LessonData } from '$lib/types';

export const LESSON_08_DATA: LessonData = {
  lessonNumber: 8,
  title: '受身形 (Thể bị động)',
  vocabulary: [
    // Verbs commonly used in passive
    {
      japanese: '褒める',
      kana: 'ほめる',
      vietnamese: 'khen ngợi',
      english: 'to praise',
      type: 'main',
      example: '先生に褒められました。'
    },
    {
      japanese: '叱る',
      kana: 'しかる',
      vietnamese: 'mắng',
      english: 'to scold',
      type: 'main',
      example: '母に叱られました。'
    },
    {
      japanese: '怒る',
      kana: 'おこる',
      vietnamese: 'tức giận',
      english: 'to get angry',
      type: 'main',
      example: '先生に怒られました。'
    },
    {
      japanese: '笑う',
      kana: 'わらう',
      vietnamese: 'cười',
      english: 'to laugh',
      type: 'main',
      example: 'みんなに笑われました。'
    },
    {
      japanese: '見る',
      kana: 'みる',
      vietnamese: 'nhìn',
      english: 'to see, to look at',
      type: 'main',
      example: 'じろじろ見られて嫌でした。'
    },
    {
      japanese: '呼ぶ',
      kana: 'よぶ',
      vietnamese: 'gọi',
      english: 'to call',
      type: 'main',
      example: '先生に呼ばれました。'
    },
    {
      japanese: '誘う',
      kana: 'さそう',
      vietnamese: 'rủ, mời',
      english: 'to invite',
      type: 'main',
      example: '友達にパーティーに誘われました。'
    },
    {
      japanese: '頼む',
      kana: 'たのむ',
      vietnamese: 'nhờ vả',
      english: 'to request',
      type: 'main',
      example: '上司に仕事を頼まれました。'
    },
    {
      japanese: '命じる',
      kana: 'めいじる',
      vietnamese: 'ra lệnh',
      english: 'to order, to command',
      type: 'main',
      example: '出張を命じられました。'
    },
    {
      japanese: '注意する',
      kana: 'ちゅういする',
      vietnamese: 'chú ý, nhắc nhở',
      english: 'to caution, to warn',
      type: 'main',
      example: '先生に注意されました。'
    },
    {
      japanese: '批判する',
      kana: 'ひはんする',
      vietnamese: 'phê bình',
      english: 'to criticize',
      type: 'main',
      example: '計画を批判されました。'
    },
    {
      japanese: '邪魔する',
      kana: 'じゃまする',
      vietnamese: 'làm phá, cản trở',
      english: 'to disturb, to interfere',
      type: 'main',
      example: '勉強を邪魔されました。'
    },
    {
      japanese: '盗む',
      kana: 'ぬすむ',
      vietnamese: 'ăn cắp',
      english: 'to steal',
      type: 'main',
      example: '財布を盗まれました。'
    },
    {
      japanese: '壊す',
      kana: 'こわす',
      vietnamese: 'phá hủy',
      english: 'to break, to destroy',
      type: 'main',
      example: 'カメラを壊されました。'
    },
    {
      japanese: '踏む',
      kana: 'ふむ',
      vietnamese: 'giẫm',
      english: 'to step on',
      type: 'main',
      example: '足を踏まれました。'
    },
    {
      japanese: '押す',
      kana: 'おす',
      vietnamese: 'đẩy',
      english: 'to push',
      type: 'main',
      example: '電車で押されました。'
    },
    {
      japanese: 'ぶつかる',
      kana: 'ぶつかる',
      vietnamese: 'va chạm',
      english: 'to bump into',
      type: 'main',
      example: '自転車にぶつかられました。'
    },
    {
      japanese: '噛む',
      kana: 'かむ',
      vietnamese: 'cắn',
      english: 'to bite',
      type: 'main',
      example: '犬に噛まれました。'
    },
    {
      japanese: '刺す',
      kana: 'さす',
      vietnamese: 'đâm, chích',
      english: 'to sting, to stab',
      type: 'main',
      example: '蚊に刺されました。'
    },
    {
      japanese: '殺す',
      kana: 'ころす',
      vietnamese: 'giết',
      english: 'to kill',
      type: 'main',
      example: '昆虫に殺されました。'
    },
    // Verbs for beneficial passive
    {
      japanese: '生まれる',
      kana: 'うまれる',
      vietnamese: 'sinh ra',
      english: 'to be born',
      type: 'main',
      example: '東京で生まれました。'
    },
    {
      japanese: '建てる',
      kana: 'たてる',
      vietnamese: 'xây dựng',
      english: 'to build',
      type: 'main',
      example: 'この建物は100年前に建てられました。'
    },
    {
      japanese: '作る',
      kana: 'つくる',
      vietnamese: 'làm, chế tạo',
      english: 'to make',
      type: 'main',
      example: 'この時計は日本で作られました。'
    },
    {
      japanese: '書く',
      kana: 'かく',
      vietnamese: 'viết',
      english: 'to write',
      type: 'main',
      example: 'この本は夏目漱石に書かれました。'
    },
    {
      japanese: '発明する',
      kana: 'はつめいする',
      vietnamese: 'phát minh',
      english: 'to invent',
      type: 'main',
      example: '電話はベルによって発明されました。'
    },
    {
      japanese: '発見する',
      kana: 'はっけんする',
      vietnamese: 'phát hiện',
      english: 'to discover',
      type: 'main',
      example: '新しい星が発見されました。'
    },
    {
      japanese: '選ぶ',
      kana: 'えらぶ',
      vietnamese: 'chọn',
      english: 'to choose, to elect',
      type: 'main',
      example: '社長に選ばれました。'
    },
    {
      japanese: '招待する',
      kana: 'しょうたいする',
      vietnamese: 'mời (chính thức)',
      english: 'to invite (formal)',
      type: 'main',
      example: '結婚式に招待されました。'
    },
    {
      japanese: '尊敬する',
      kana: 'そんけいする',
      vietnamese: 'tôn kính',
      english: 'to respect',
      type: 'main',
      example: 'みんなに尊敬されています。'
    },
    {
      japanese: '愛する',
      kana: 'あいする',
      vietnamese: 'yêu thương',
      english: 'to love',
      type: 'main',
      example: '家族に愛されています。'
    },
    // Related nouns and adjectives
    {
      japanese: '被害',
      kana: 'ひがい',
      vietnamese: 'thiệt hại',
      english: 'damage, harm',
      type: 'main',
      example: '台風の被害を受けました。'
    },
    {
      japanese: '迷惑',
      kana: 'めいわく',
      vietnamese: 'phiền toái',
      english: 'trouble, nuisance',
      type: 'main',
      example: '迷惑をかけられました。'
    },
    {
      japanese: '影響',
      kana: 'えいきょう',
      vietnamese: 'ảnh hưởng',
      english: 'influence',
      type: 'main',
      example: '先生に大きな影響を受けました。'
    },
    {
      japanese: '評価',
      kana: 'ひょうか',
      vietnamese: 'đánh giá',
      english: 'evaluation',
      type: 'main',
      example: '高く評価されました。'
    },
    {
      japanese: '批評',
      kana: 'ひひょう',
      vietnamese: 'phê bình',
      english: 'criticism, review',
      type: 'main',
      example: '作品が批評されました。'
    },
    {
      japanese: '感動',
      kana: 'かんどう',
      vietnamese: 'cảm động',
      english: 'emotion, impression',
      type: 'main',
      example: '映画に感動しました。'
    },
    {
      japanese: '印象',
      kana: 'いんしょう',
      vietnamese: 'ấn tượng',
      english: 'impression',
      type: 'main',
      example: '良い印象を持たれました。'
    },
    {
      japanese: '恥ずかしい',
      kana: 'はずかしい',
      vietnamese: 'xấu hổ',
      english: 'embarrassed',
      type: 'main',
      example: '間違いを指摘されて恥ずかしかったです。'
    },
    {
      japanese: '悲しい',
      kana: 'かなしい',
      vietnamese: 'buồn',
      english: 'sad',
      type: 'main',
      example: 'ペットが死んで悲しかったです。'
    },
    {
      japanese: '悔しい',
      kana: 'くやしい',
      vietnamese: 'tức tối',
      english: 'vexing, regrettable',
      type: 'main',
      example: '試合に負けて悔しかったです。'
    },
    // Additional expressions
    {
      japanese: '迷惑をかける',
      kana: 'めいわくをかける',
      vietnamese: 'gây phiền phức',
      english: 'to cause trouble',
      type: 'additional',
      example: '迷惑をかけてすみません。'
    },
    {
      japanese: '被害を受ける',
      kana: 'ひがいをうける',
      vietnamese: 'chịu thiệt hại',
      english: 'to suffer damage',
      type: 'additional',
      example: '地震で被害を受けました。'
    },
    {
      japanese: '影響を受ける',
      kana: 'えいきょうをうける',
      vietnamese: 'chịu ảnh hưởng',
      english: 'to be influenced',
      type: 'additional',
      example: '先生に大きな影響を受けました。'
    },
    {
      japanese: 'びっくりする',
      kana: 'びっくりする',
      vietnamese: 'ngạc nhiên',
      english: 'to be surprised',
      type: 'additional',
      example: '突然呼ばれてびっくりしました。'
    },
    {
      japanese: 'がっかりする',
      kana: 'がっかりする',
      vietnamese: 'thất vọng',
      english: 'to be disappointed',
      type: 'additional',
      example: '結果を見てがっかりしました。'
    },
    {
      japanese: 'むかつく',
      kana: 'むかつく',
      vietnamese: 'khó chịu',
      english: 'to be irritated',
      type: 'additional',
      example: '嘘をつかれてむかつきました。'
    },
    // Supplementary vocabulary
    {
      japanese: '犯人',
      kana: 'はんにん',
      vietnamese: 'phạm nhân',
      english: 'criminal',
      type: 'supplementary',
      example: '犯人が捕まりました。'
    },
    {
      japanese: '泥棒',
      kana: 'どろぼう',
      vietnamese: 'kẻ trộm',
      english: 'thief',
      type: 'supplementary',
      example: '泥棒に入られました。'
    },
    {
      japanese: '詐欺',
      kana: 'さぎ',
      vietnamese: 'lừa đảo',
      english: 'fraud',
      type: 'supplementary',
      example: '詐欺に遭いました。'
    },
    {
      japanese: '事故',
      kana: 'じこ',
      vietnamese: 'tai nạn',
      english: 'accident',
      type: 'supplementary',
      example: '事故に遭いました。'
    },
    {
      japanese: '災害',
      kana: 'さいがい',
      vietnamese: 'thảm họa',
      english: 'disaster',
      type: 'supplementary',
      example: '災害の被害を受けました。'
    },
    {
      japanese: '台風',
      kana: 'たいふう',
      vietnamese: 'bão',
      english: 'typhoon',
      type: 'supplementary',
      example: '台風で家が壊されました。'
    },
    {
      japanese: '地震',
      kana: 'じしん',
      vietnamese: 'động đất',
      english: 'earthquake',
      type: 'supplementary',
      example: '地震で建物が倒れました。'
    },
    {
      japanese: '火事',
      kana: 'かじ',
      vietnamese: 'hỏa hoạn',
      english: 'fire',
      type: 'supplementary',
      example: '火事で家を失いました。'
    },
    {
      japanese: '洪水',
      kana: 'こうずい',
      vietnamese: 'lũ lụt',
      english: 'flood',
      type: 'supplementary',
      example: '洪水で道路が使えません。'
    },
    {
      japanese: '嵐',
      kana: 'あらし',
      vietnamese: 'bão táp',
      english: 'storm',
      type: 'supplementary',
      example: '嵐で木が倒れました。'
    }
  ],
  grammar: [
    {
      pattern: '受身形（直接受身）',
      vietnamese: 'thể bị động (trực tiếp)',
      english: 'passive form (direct passive)',
      type: 'main',
      explanation: 'Biểu thị hành động mà chủ ngữ bị tác động trực tiếp. Cấu tạo: Nhóm I: a段 + れる (書く→書かれる), Nhóm II: る → られる (食べる→食べられる), Nhóm III: する→される, くる→こられる. Người thực hiện được đánh dấu bằng に.',
      examples: [
        {
          japanese: '先生に褒められました。',
          vietnamese: 'Tôi được thầy khen.',
          english: 'I was praised by my teacher.',
          type: 'main'
        },
        {
          japanese: '母に叱られました。',
          vietnamese: 'Tôi bị mẹ mắng.',
          english: 'I was scolded by my mother.',
          type: 'main'
        },
        {
          japanese: 'この本は夏目漱石によって書かれました。',
          vietnamese: 'Quyển sách này được viết bởi Natsume Soseki.',
          english: 'This book was written by Natsume Soseki.',
          type: 'main'
        },
        {
          japanese: '財布を盗まれました。',
          vietnamese: 'Ví của tôi bị mất trộm.',
          english: 'My wallet was stolen.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '間接受身（迷惑の受身）',
      vietnamese: 'thể bị động gián tiếp (bị động phiền toái)',
      english: 'indirect passive (adversative passive)',
      type: 'main',
      explanation: 'Biểu thị hành động của người khác gây ảnh hưởng tiêu cực đến chủ ngữ. Đặc trưng của tiếng Nhật, không có trong tiếng Anh. Chủ ngữ là người bị ảnh hưởng.',
      examples: [
        {
          japanese: '雨に降られました。',
          vietnamese: 'Tôi bị mưa.',
          english: 'I got rained on.',
          type: 'main'
        },
        {
          japanese: '電車の中で足を踏まれました。',
          vietnamese: 'Tôi bị dẫm lên chân trong tàu điện.',
          english: 'I had my foot stepped on in the train.',
          type: 'main'
        },
        {
          japanese: '夜中に友達に電話されました。',
          vietnamese: 'Tôi bị bạn gọi điện giữa đêm.',
          english: 'I had a friend call me in the middle of the night.',
          type: 'main'
        },
        {
          japanese: '赤ちゃんに泣かれて困りました。',
          vietnamese: 'Tôi bị em bé khóc làm phiền.',
          english: 'I was troubled by the baby crying.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '持ち主の受身',
      vietnamese: 'thể bị động sở hữu',
      english: 'possessive passive',
      type: 'main',
      explanation: 'Biểu thị một phần của cơ thể hoặc đồ vật thuộc về chủ ngữ bị tác động. Đồ vật được đánh dấu bằng を.',
      examples: [
        {
          japanese: '足を踏まれました。',
          vietnamese: 'Chân tôi bị dẫm.',
          english: 'My foot was stepped on.',
          type: 'main'
        },
        {
          japanese: '財布を盗まれました。',
          vietnamese: 'Ví của tôi bị mất trộm.',
          english: 'My wallet was stolen.',
          type: 'main'
        },
        {
          japanese: 'カメラを壊されました。',
          vietnamese: 'Máy ảnh của tôi bị làm hỏng.',
          english: 'My camera was broken.',
          type: 'main'
        },
        {
          japanese: '犬に手を噛まれました。',
          vietnamese: 'Tay tôi bị chó cắn.',
          english: 'My hand was bitten by a dog.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: 'に vs によって',
      vietnamese: 'に (người) vs によって (người nổi tiếng/sự vật)',
      english: 'に (person) vs によって (famous person/thing)',
      type: 'main',
      explanation: 'に dùng cho người thực hiện thông thường. によって dùng cho người nổi tiếng, tổ chức, hoặc nguyên nhân tự nhiên. によって mang tính trang trọng hơn.',
      examples: [
        {
          japanese: '先生に褒められました。',
          vietnamese: 'Tôi được thầy khen.',
          english: 'I was praised by my teacher.',
          type: 'main'
        },
        {
          japanese: 'この小説は夏目漱石によって書かれました。',
          vietnamese: 'Tiểu thuyết này được viết bởi Natsume Soseki.',
          english: 'This novel was written by Natsume Soseki.',
          type: 'main'
        },
        {
          japanese: '地震によって建物が壊されました。',
          vietnamese: 'Tòa nhà bị phá hủy bởi động đất.',
          english: 'The building was destroyed by an earthquake.',
          type: 'main'
        }
      ]
    },
    {
      pattern: '受身形の感情表現',
      vietnamese: 'biểu hiện cảm xúc với thể bị động',
      english: 'expressing emotions with passive',
      type: 'additional',
      explanation: 'Dùng thể bị động để biểu thị cảm xúc của chủ ngữ về hành động mà họ bị tác động.',
      examples: [
        {
          japanese: '先生に褒められて嬉しかったです。',
          vietnamese: 'Tôi vui vì được thầy khen.',
          english: 'I was happy to be praised by my teacher.',
          type: 'main'
        },
        {
          japanese: 'みんなに笑われて恥ずかしかったです。',
          vietnamese: 'Tôi xấu hổ vì bị mọi người cười.',
          english: 'I was embarrassed to be laughed at by everyone.',
          type: 'main'
        },
        {
          japanese: '友達に裏切られて悲しかったです。',
          vietnamese: 'Tôi buồn vì bị bạn phản bội.',
          english: 'I was sad to be betrayed by my friend.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '受身形の肯定的な使い方',
      vietnamese: 'cách dùng tích cực của thể bị động',
      english: 'positive use of passive form',
      type: 'additional',
      explanation: 'Không phải tất cả các câu bị động đều mang nghĩa tiêu cực. Có thể biểu thị ý nghĩa tích cực như được tôn kính, được yêu mến.',
      examples: [
        {
          japanese: 'みんなに尊敬されています。',
          vietnamese: 'Được mọi người tôn kính.',
          english: 'He is respected by everyone.',
          type: 'main'
        },
        {
          japanese: '結婚式に招待されました。',
          vietnamese: 'Tôi được mời đến đám cưới.',
          english: 'I was invited to the wedding.',
          type: 'main'
        },
        {
          japanese: '家族に愛されています。',
          vietnamese: 'Được gia đình yêu thương.',
          english: 'I am loved by my family.',
          type: 'additional'
        }
      ]
    }
  ]
};

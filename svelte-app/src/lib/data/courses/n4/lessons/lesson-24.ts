/**
 * N4 Core Lessons — Lesson 24
 * Focus: Transition and Sequence Expressions
 */

import type { LessonData } from '$lib/types';

export const LESSON_24_DATA: LessonData = {
  lessonNumber: 24,
  title: '時間の前後関係 (Quan hệ trước sau về thời gian)',
  vocabulary: [
    // Time-related verbs
    {
      japanese: '始まる（はじまる）',
      kana: 'はじまる',
      vietnamese: 'bắt đầu',
      english: 'to begin/start',
      type: 'main',
      example: '授業が始まりました。'
    },
    {
      japanese: '始める（はじめる）',
      kana: 'はじめる',
      vietnamese: 'bắt đầu (làm gì)',
      english: 'to begin (doing)',
      type: 'main',
      example: '勉強を始めます。'
    },
    {
      japanese: '終わる（おわる）',
      kana: 'おわる',
      vietnamese: 'kết thúc',
      english: 'to end/finish',
      type: 'main',
      example: '会議が終わりました。'
    },
    {
      japanese: '終える（おえる）',
      kana: 'おえる',
      vietnamese: 'hoàn thành',
      english: 'to finish (something)',
      type: 'main',
      example: '仕事を終えました。'
    },
    {
      japanese: '続ける（つづける）',
      kana: 'つづける',
      vietnamese: 'tiếp tục',
      english: 'to continue',
      type: 'main',
      example: '話を続けてください。'
    },
    {
      japanese: '中断する（ちゅうだんする）',
      kana: 'ちゅうだんする',
      vietnamese: 'tạm dừng, gián đoạn',
      english: 'to interrupt/suspend',
      type: 'main',
      example: '作業を中断しました。'
    },
    {
      japanese: '進む（すすむ）',
      kana: 'すすむ',
      vietnamese: 'tiến tới',
      english: 'to advance/proceed',
      type: 'main',
      example: '仕事が進んでいます。'
    },
    {
      japanese: '進める（すすめる）',
      kana: 'すすめる',
      vietnamese: 'thúc đẩy, tiến hành',
      english: 'to advance (something)',
      type: 'main',
      example: '計画を進めます。'
    },
    {
      japanese: '遅れる（おくれる）',
      kana: 'おくれる',
      vietnamese: 'trễ',
      english: 'to be late',
      type: 'main',
      example: '電車が遅れました。'
    },
    {
      japanese: '間に合う（まにあう）',
      kana: 'まにあう',
      vietnamese: 'kịp giờ',
      english: 'to be in time',
      type: 'main',
      example: '会議に間に合いました。'
    },
    {
      japanese: '急ぐ（いそぐ）',
      kana: 'いそぐ',
      vietnamese: 'vội vàng',
      english: 'to hurry',
      type: 'main',
      example: '急いでください。'
    },
    {
      japanese: '焦る（あせる）',
      kana: 'あせる',
      vietnamese: 'lo lắng, vội vã',
      english: 'to be impatient/rushed',
      type: 'main',
      example: '焦らないでください。'
    },
    // Daily routine verbs
    {
      japanese: '起きる（おきる）',
      kana: 'おきる',
      vietnamese: 'thức dậy',
      english: 'to wake up',
      type: 'main',
      example: '毎朝6時に起きます。'
    },
    {
      japanese: '寝る（ねる）',
      kana: 'ねる',
      vietnamese: 'ngủ',
      english: 'to sleep',
      type: 'main',
      example: '11時に寝ます。'
    },
    {
      japanese: '着る（きる）',
      kana: 'きる',
      vietnamese: 'mặc (quần áo)',
      english: 'to wear/put on (clothes)',
      type: 'main',
      example: '服を着てから出かけます。'
    },
    {
      japanese: '脱ぐ（ぬぐ）',
      kana: 'ぬぐ',
      vietnamese: 'cởi (quần áo)',
      english: 'to take off (clothes)',
      type: 'main',
      example: '靴を脱いでください。'
    },
    {
      japanese: '洗う（あらう）',
      kana: 'あらう',
      vietnamese: 'rửa',
      english: 'to wash',
      type: 'main',
      example: '手を洗ってから食べます。'
    },
    {
      japanese: '磨く（みがく）',
      kana: 'みがく',
      vietnamese: 'đánh răng, mài',
      english: 'to brush/polish',
      type: 'main',
      example: '歯を磨きます。'
    },
    {
      japanese: '出かける（でかける）',
      kana: 'でかける',
      vietnamese: 'ra ngoài',
      english: 'to go out',
      type: 'main',
      example: '朝8時に出かけます。'
    },
    {
      japanese: '帰る（かえる）',
      kana: 'かえる',
      vietnamese: 'về',
      english: 'to return/go home',
      type: 'main',
      example: '夜7時に帰ります。'
    },
    {
      japanese: '入る（はいる）',
      kana: 'はいる',
      vietnamese: 'vào',
      english: 'to enter',
      type: 'main',
      example: '部屋に入ります。'
    },
    {
      japanese: '出る（でる）',
      kana: 'でる',
      vietnamese: 'ra, xuất hiện',
      english: 'to exit/leave',
      type: 'main',
      example: '家を出ます。'
    },
    // Time expressions
    {
      japanese: '前（まえ）',
      kana: 'まえ',
      vietnamese: 'trước',
      english: 'before',
      type: 'main',
      example: '食事の前に手を洗います。'
    },
    {
      japanese: '後（あと）',
      kana: 'あと',
      vietnamese: 'sau',
      english: 'after',
      type: 'main',
      example: '授業の後で会いましょう。'
    },
    {
      japanese: '間（あいだ）',
      kana: 'あいだ',
      vietnamese: 'trong khi, khoảng',
      english: 'while/during/between',
      type: 'main',
      example: '休みの間に旅行します。'
    },
    {
      japanese: '最中（さいちゅう）',
      kana: 'さいちゅう',
      vietnamese: 'đang trong lúc',
      english: 'in the middle of',
      type: 'main',
      example: '食事の最中に電話が来ました。'
    },
    {
      japanese: '途中（とちゅう）',
      kana: 'とちゅう',
      vietnamese: 'giữa chừng, trên đường',
      english: 'on the way/midway',
      type: 'main',
      example: '途中で友達に会いました。'
    },
    {
      japanese: '直前（ちょくぜん）',
      kana: 'ちょくぜん',
      vietnamese: 'ngay trước',
      english: 'just before',
      type: 'main',
      example: '試験の直前に復習します。'
    },
    {
      japanese: '直後（ちょくご）',
      kana: 'ちょくご',
      vietnamese: 'ngay sau',
      english: 'right after',
      type: 'main',
      example: '地震の直後に停電しました。'
    },
    {
      japanese: '同時（どうじ）',
      kana: 'どうじ',
      vietnamese: 'cùng lúc',
      english: 'at the same time',
      type: 'main',
      example: '二つの仕事を同時にできません。'
    },
    // Sequence markers
    {
      japanese: 'まず',
      kana: 'まず',
      vietnamese: 'trước tiên',
      english: 'first',
      type: 'main',
      example: 'まず手を洗ってください。'
    },
    {
      japanese: '次に（つぎに）',
      kana: 'つぎに',
      vietnamese: 'tiếp theo',
      english: 'next',
      type: 'main',
      example: '次に野菜を切ります。'
    },
    {
      japanese: 'それから',
      kana: 'それから',
      vietnamese: 'sau đó',
      english: 'and then',
      type: 'main',
      example: 'それから炒めます。'
    },
    {
      japanese: '最後に（さいごに）',
      kana: 'さいごに',
      vietnamese: 'cuối cùng',
      english: 'finally/lastly',
      type: 'main',
      example: '最後に塩を入れます。'
    },
    {
      japanese: 'その後（そのご）',
      kana: 'そのご',
      vietnamese: 'sau đó',
      english: 'after that',
      type: 'main',
      example: 'その後どうしましたか。'
    },
    {
      japanese: 'すぐに',
      kana: 'すぐに',
      vietnamese: 'ngay lập tức',
      english: 'immediately',
      type: 'main',
      example: 'すぐに来てください。'
    },
    // Additional vocabulary
    {
      japanese: '準備（じゅんび）',
      kana: 'じゅんび',
      vietnamese: 'chuẩn bị',
      english: 'preparation',
      type: 'additional',
      example: '出発の準備をします。'
    },
    {
      japanese: '用意（ようい）',
      kana: 'ようい',
      vietnamese: 'chuẩn bị, sẵn sàng',
      english: 'preparation/readiness',
      type: 'additional',
      example: '夕食の用意ができました。'
    },
    {
      japanese: '片付ける（かたづける）',
      kana: 'かたづける',
      vietnamese: 'dọn dẹp',
      english: 'to tidy up',
      type: 'additional',
      example: '部屋を片付けます。'
    },
    {
      japanese: '掃除する（そうじする）',
      kana: 'そうじする',
      vietnamese: 'dọn dẹp, vệ sinh',
      english: 'to clean',
      type: 'additional',
      example: '毎週末掃除します。'
    },
    {
      japanese: '洗濯する（せんたくする）',
      kana: 'せんたくする',
      vietnamese: 'giặt giũ',
      english: 'to do laundry',
      type: 'additional',
      example: '週に一度洗濯します。'
    },
    {
      japanese: '料理する（りょうりする）',
      kana: 'りょうりする',
      vietnamese: 'nấu ăn',
      english: 'to cook',
      type: 'additional',
      example: '晩ご飯を料理します。'
    },
    {
      japanese: '買い物する（かいものする）',
      kana: 'かいものする',
      vietnamese: 'mua sắm',
      english: 'to shop',
      type: 'additional',
      example: 'スーパーで買い物します。'
    },
    {
      japanese: '出発する（しゅっぱつする）',
      kana: 'しゅっぱつする',
      vietnamese: 'khởi hành',
      english: 'to depart',
      type: 'additional',
      example: '明日の朝出発します。'
    },
    {
      japanese: '到着する（とうちゃくする）',
      kana: 'とうちゃくする',
      vietnamese: 'đến nơi',
      english: 'to arrive',
      type: 'additional',
      example: '夜9時に到着しました。'
    },
    {
      japanese: '経験する（けいけんする）',
      kana: 'けいけんする',
      vietnamese: 'trải nghiệm',
      english: 'to experience',
      type: 'additional',
      example: '日本で色々経験しました。'
    },
    {
      japanese: '完成する（かんせいする）',
      kana: 'かんせいする',
      vietnamese: 'hoàn thành',
      english: 'to complete',
      type: 'additional',
      example: 'プロジェクトが完成しました。'
    },
    {
      japanese: '中止する（ちゅうしする）',
      kana: 'ちゅうしする',
      vietnamese: 'hủy bỏ',
      english: 'to cancel',
      type: 'additional',
      example: '雨で中止になりました。'
    },
    {
      japanese: '延期する（えんきする）',
      kana: 'えんきする',
      vietnamese: 'hoãn lại',
      english: 'to postpone',
      type: 'additional',
      example: '会議を延期しました。'
    },
    {
      japanese: '予約する（よやくする）',
      kana: 'よやくする',
      vietnamese: 'đặt trước',
      english: 'to reserve/book',
      type: 'additional',
      example: 'レストランを予約しました。'
    },
    {
      japanese: 'キャンセルする',
      kana: 'キャンセルする',
      vietnamese: 'hủy',
      english: 'to cancel',
      type: 'additional',
      example: '予約をキャンセルしました。'
    },
    {
      japanese: '順番（じゅんばん）',
      kana: 'じゅんばん',
      vietnamese: 'thứ tự, lượt',
      english: 'order/turn',
      type: 'additional',
      example: '順番に並んでください。'
    },
    {
      japanese: '手順（てじゅん）',
      kana: 'てじゅん',
      vietnamese: 'quy trình, các bước',
      english: 'procedure/steps',
      type: 'additional',
      example: '手順を説明します。'
    },
    {
      japanese: '過程（かてい）',
      kana: 'かてい',
      vietnamese: 'quá trình',
      english: 'process',
      type: 'additional',
      example: '大切な過程です。'
    },
    {
      japanese: '段階（だんかい）',
      kana: 'だんかい',
      vietnamese: 'giai đoạn, bước',
      english: 'stage/phase',
      type: 'additional',
      example: '第一段階が終わりました。'
    },
    // Supplementary
    {
      japanese: '瞬間（しゅんかん）',
      kana: 'しゅんかん',
      vietnamese: 'khoảnh khắc',
      english: 'moment/instant',
      type: 'supplementary',
      example: 'その瞬間に気づきました。'
    },
    {
      japanese: '期間（きかん）',
      kana: 'きかん',
      vietnamese: 'thời gian, kỳ hạn',
      english: 'period/term',
      type: 'supplementary',
      example: '期間は3ヶ月です。'
    },
    {
      japanese: '一時的（いちじてき）',
      kana: 'いちじてき',
      vietnamese: 'tạm thời',
      english: 'temporary',
      type: 'supplementary',
      example: '一時的な問題です。'
    },
    {
      japanese: '永久（えいきゅう）',
      kana: 'えいきゅう',
      vietnamese: 'vĩnh viễn',
      english: 'permanent/eternal',
      type: 'supplementary',
      example: '永久に続きます。'
    },
    {
      japanese: '常に（つねに）',
      kana: 'つねに',
      vietnamese: 'luôn luôn',
      english: 'always/constantly',
      type: 'supplementary',
      example: '常に努力します。'
    },
    {
      japanese: '時々（ときどき）',
      kana: 'ときどき',
      vietnamese: 'thỉnh thoảng',
      english: 'sometimes',
      type: 'supplementary',
      example: '時々映画を見ます。'
    },
    {
      japanese: 'たまに',
      kana: 'たまに',
      vietnamese: 'đôi khi',
      english: 'occasionally',
      type: 'supplementary',
      example: 'たまに外食します。'
    }
  ],
  grammar: [
    {
      pattern: '～てから',
      vietnamese: 'sau khi...',
      english: 'after doing...',
      type: 'main',
      explanation: 'Biểu thị trình tự hành động: làm A xong rồi mới làm B. Cấu trúc: động từ て-form + から.',
      examples: [
        {
          japanese: '朝ご飯を食べてから、学校に行きます。',
          vietnamese: 'Sau khi ăn sáng, tôi đi học.',
          english: 'After eating breakfast, I go to school.',
          type: 'main'
        },
        {
          japanese: '手を洗ってから、食事をします。',
          vietnamese: 'Sau khi rửa tay, tôi ăn cơm.',
          english: 'After washing my hands, I eat.',
          type: 'main'
        },
        {
          japanese: '宿題をしてから、遊びます。',
          vietnamese: 'Sau khi làm bài tập, tôi chơi.',
          english: 'After doing homework, I play.',
          type: 'main'
        },
        {
          japanese: '日本に来てから、3年になります。',
          vietnamese: 'Đã 3 năm kể từ khi đến Nhật.',
          english: 'It\'s been 3 years since I came to Japan.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～た後で',
      vietnamese: 'sau khi...',
      english: 'after...',
      type: 'main',
      explanation: 'Biểu thị thời gian sau khi hoàn thành hành động. Tương tự ～てから nhưng nhấn mạnh thời điểm hơn. Cấu trúc: động từ た-form + 後で.',
      examples: [
        {
          japanese: '授業が終わった後で、買い物に行きます。',
          vietnamese: 'Sau khi kết thúc lớp học, tôi đi mua sắm.',
          english: 'After class ends, I go shopping.',
          type: 'main'
        },
        {
          japanese: '映画を見た後で、食事をしました。',
          vietnamese: 'Sau khi xem phim, tôi đã ăn cơm.',
          english: 'After watching the movie, I ate.',
          type: 'main'
        },
        {
          japanese: '仕事が終わった後で、連絡します。',
          vietnamese: 'Sau khi xong việc, tôi sẽ liên lạc.',
          english: 'After I finish work, I\'ll contact you.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～前に',
      vietnamese: 'trước khi...',
      english: 'before...',
      type: 'main',
      explanation: 'Biểu thị thời gian trước khi làm việc gì. Cấu trúc: động từ từ điển-form + 前に hoặc danh từ + の前に.',
      examples: [
        {
          japanese: '寝る前に、歯を磨きます。',
          vietnamese: 'Trước khi ngủ, tôi đánh răng.',
          english: 'Before sleeping, I brush my teeth.',
          type: 'main'
        },
        {
          japanese: '出かける前に、天気を確認します。',
          vietnamese: 'Trước khi ra ngoài, tôi kiểm tra thời tiết.',
          english: 'Before going out, I check the weather.',
          type: 'main'
        },
        {
          japanese: '試験の前に、復習しました。',
          vietnamese: 'Trước kỳ thi, tôi đã ôn tập.',
          english: 'Before the exam, I reviewed.',
          type: 'main'
        },
        {
          japanese: '日本へ来る前に、日本語を勉強しました。',
          vietnamese: 'Trước khi đến Nhật, tôi đã học tiếng Nhật.',
          english: 'Before coming to Japan, I studied Japanese.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～ながら',
      vietnamese: 'trong khi...',
      english: 'while...',
      type: 'main',
      explanation: 'Biểu thị hai hành động xảy ra đồng thời. Cấu trúc: động từ dạng masu (bỏ ます) + ながら. Hành động chính ở sau ながら.',
      examples: [
        {
          japanese: '音楽を聞きながら、勉強します。',
          vietnamese: 'Tôi học trong khi nghe nhạc.',
          english: 'I study while listening to music.',
          type: 'main'
        },
        {
          japanese: 'コーヒーを飲みながら、話しましょう。',
          vietnamese: 'Hãy nói chuyện trong khi uống cà phê.',
          english: 'Let\'s talk while drinking coffee.',
          type: 'main'
        },
        {
          japanese: '歩きながら、電話で話しています。',
          vietnamese: 'Tôi đang nói chuyện điện thoại trong khi đi bộ.',
          english: 'I\'m talking on the phone while walking.',
          type: 'main'
        },
        {
          japanese: 'テレビを見ながら、夕食を食べました。',
          vietnamese: 'Tôi đã ăn tối trong khi xem TV.',
          english: 'I ate dinner while watching TV.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～間に',
      vietnamese: 'trong khi..., trong lúc...',
      english: 'while/during...',
      type: 'main',
      explanation: 'Biểu thị khoảng thời gian xảy ra hành động. Cấu trúc: động từ て-form + いる + 間に hoặc danh từ + の間に.',
      examples: [
        {
          japanese: '寝ている間に、雨が降りました。',
          vietnamese: 'Trong khi tôi ngủ, trời đã mưa.',
          english: 'While I was sleeping, it rained.',
          type: 'main'
        },
        {
          japanese: '留守の間に、友達が来ました。',
          vietnamese: 'Trong lúc tôi vắng nhà, bạn tôi đã đến.',
          english: 'While I was away, my friend came.',
          type: 'main'
        },
        {
          japanese: '夏休みの間に、旅行します。',
          vietnamese: 'Trong kỳ nghỉ hè, tôi sẽ đi du lịch.',
          english: 'During summer vacation, I will travel.',
          type: 'main'
        },
        {
          japanese: '若い間に、色々経験したいです。',
          vietnamese: 'Trong khi còn trẻ, tôi muốn trải nghiệm nhiều thứ.',
          english: 'While I\'m young, I want to experience various things.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～うちに',
      vietnamese: 'trong khi, trước khi (quá muộn)',
      english: 'while/before it\'s too late',
      type: 'main',
      explanation: 'Biểu thị làm gì đó trong khi tình trạng còn như vậy, hoặc trước khi thay đổi. Cấu trúc: 普通形 + うちに (ない-form + うちに cho phủ định).',
      examples: [
        {
          japanese: '暖かいうちに、食べてください。',
          vietnamese: 'Hãy ăn trong khi còn nóng.',
          english: 'Please eat it while it\'s warm.',
          type: 'main'
        },
        {
          japanese: '忘れないうちに、メモしました。',
          vietnamese: 'Tôi đã ghi chú trước khi quên.',
          english: 'I took notes before I forgot.',
          type: 'main'
        },
        {
          japanese: '若いうちに、色々勉強したいです。',
          vietnamese: 'Tôi muốn học nhiều thứ trong khi còn trẻ.',
          english: 'I want to study various things while I\'m young.',
          type: 'main'
        },
        {
          japanese: '雨が降らないうちに、帰りましょう。',
          vietnamese: 'Hãy về trước khi trời mưa.',
          english: 'Let\'s go home before it rains.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～とき',
      vietnamese: 'khi...',
      english: 'when...',
      type: 'main',
      explanation: 'Biểu thị thời điểm xảy ra hành động. Cấu trúc: 普通形 + とき. Dùng る-form (chưa xảy ra) hoặc た-form (đã xảy ra).',
      examples: [
        {
          japanese: '日本に行くとき、カメラを持って行きます。',
          vietnamese: 'Khi đi Nhật, tôi sẽ mang máy ảnh.',
          english: 'When I go to Japan, I\'ll bring a camera.',
          type: 'main'
        },
        {
          japanese: '家に帰ったとき、電話してください。',
          vietnamese: 'Khi về đến nhà, hãy gọi điện.',
          english: 'When you get home, please call.',
          type: 'main'
        },
        {
          japanese: '暇なとき、遊びに来てください。',
          vietnamese: 'Khi rảnh, hãy đến chơi.',
          english: 'When you\'re free, please come visit.',
          type: 'main'
        },
        {
          japanese: '子供のとき、よくここで遊びました。',
          vietnamese: 'Khi còn nhỏ, tôi thường chơi ở đây.',
          english: 'When I was a child, I often played here.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～たばかり',
      vietnamese: 'vừa mới...',
      english: 'just did...',
      type: 'additional',
      explanation: 'Biểu thị hành động vừa mới hoàn thành. Cấu trúc: động từ た-form + ばかり.',
      examples: [
        {
          japanese: '今起きたばかりです。',
          vietnamese: 'Tôi vừa mới thức dậy.',
          english: 'I just woke up.',
          type: 'main'
        },
        {
          japanese: '日本に来たばかりで、まだ慣れていません。',
          vietnamese: 'Tôi vừa mới đến Nhật nên chưa quen.',
          english: 'I just came to Japan, so I\'m not used to it yet.',
          type: 'main'
        },
        {
          japanese: '卒業したばかりです。',
          vietnamese: 'Tôi vừa mới tốt nghiệp.',
          english: 'I just graduated.',
          type: 'additional'
        }
      ]
    }
  ]
};

/**
 * N4 Core Lessons — Lesson 19: 決定と変化 (Decision & Change Expressions)
 * Focus: ~ことにする、~ことになる、decision and change expressions
 */

import type { LessonData } from '$lib/types';

export const LESSON_19_DATA: LessonData = {
  lessonNumber: 19,
  title: '決定と変化 (Quyết định và Thay đổi)',
  vocabulary: [
    // Main Vocabulary - Decisions & Changes
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
      japanese: '変える',
      kana: 'かえる',
      vietnamese: 'thay đổi (tác động)',
      english: 'to change (transitive)',
      type: 'main',
      example: '予定を変えました。'
    },
    {
      japanese: '変わる',
      kana: 'かわる',
      vietnamese: 'thay đổi (tự nhiên)',
      english: 'to change (intransitive)',
      type: 'main',
      example: '天気が変わりました。'
    },
    {
      japanese: '選ぶ',
      kana: 'えらぶ',
      vietnamese: 'chọn',
      english: 'to choose, to select',
      type: 'main',
      example: 'この服を選びました。'
    },
    {
      japanese: '選択',
      kana: 'せんたく',
      vietnamese: 'sự lựa chọn',
      english: 'choice, selection',
      type: 'main',
      example: '選択を間違えました。'
    },
    {
      japanese: '決定',
      kana: 'けってい',
      vietnamese: 'quyết định',
      english: 'decision',
      type: 'main',
      example: '重要な決定です。'
    },
    {
      japanese: '判断',
      kana: 'はんだん',
      vietnamese: 'phán đoán',
      english: 'judgment, decision',
      type: 'main',
      example: '正しい判断をしました。'
    },
    {
      japanese: '選択肢',
      kana: 'せんたくし',
      vietnamese: 'lựa chọn',
      english: 'option, choice',
      type: 'main',
      example: '三つの選択肢があります。'
    },
    {
      japanese: '可能性',
      kana: 'かのうせい',
      vietnamese: 'khả năng',
      english: 'possibility',
      type: 'main',
      example: '成功の可能性があります。'
    },

    // Main Vocabulary - Plans & Arrangements
    {
      japanese: '予定',
      kana: 'よてい',
      vietnamese: 'dự định',
      english: 'plan, schedule',
      type: 'main',
      example: '明日の予定は何ですか。'
    },
    {
      japanese: '計画',
      kana: 'けいかく',
      vietnamese: 'kế hoạch',
      english: 'plan',
      type: 'main',
      example: '旅行の計画を立てます。'
    },
    {
      japanese: '予約',
      kana: 'よやく',
      vietnamese: 'đặt trước',
      english: 'reservation',
      type: 'main',
      example: 'ホテルを予約しました。'
    },
    {
      japanese: '準備',
      kana: 'じゅんび',
      vietnamese: 'chuẩn bị',
      english: 'preparation',
      type: 'main',
      example: '準備ができました。'
    },
    {
      japanese: '延期',
      kana: 'えんき',
      vietnamese: 'hoãn lại',
      english: 'postponement',
      type: 'main',
      example: '会議を延期しました。'
    },
    {
      japanese: '中止',
      kana: 'ちゅうし',
      vietnamese: 'hủy bỏ',
      english: 'cancellation',
      type: 'main',
      example: 'イベントが中止になりました。'
    },
    {
      japanese: '変更',
      kana: 'へんこう',
      vietnamese: 'thay đổi',
      english: 'change, modification',
      type: 'main',
      example: '予定を変更しました。'
    },
    {
      japanese: '取り消し',
      kana: 'とりけし',
      vietnamese: 'hủy bỏ',
      english: 'cancellation',
      type: 'main',
      example: '予約を取り消しました。'
    },
    {
      japanese: '日程',
      kana: 'にってい',
      vietnamese: 'lịch trình',
      english: 'schedule',
      type: 'main',
      example: '日程が変わりました。'
    },
    {
      japanese: '都合',
      kana: 'つごう',
      vietnamese: 'sự thuận tiện',
      english: 'convenience',
      type: 'main',
      example: '都合が悪いです。'
    },

    // Main Vocabulary - Actions & States
    {
      japanese: '迷う',
      kana: 'まよう',
      vietnamese: 'lưỡng lự, lạc đường',
      english: 'to hesitate, to get lost',
      type: 'main',
      example: 'どちらにするか迷っています。'
    },
    {
      japanese: '悩む',
      kana: 'なやむ',
      vietnamese: 'lo lắng, băn khoăn',
      english: 'to worry, to be troubled',
      type: 'main',
      example: '進路について悩んでいます。'
    },
    {
      japanese: '考える',
      kana: 'かんがえる',
      vietnamese: 'suy nghĩ',
      english: 'to think',
      type: 'main',
      example: 'よく考えてください。'
    },
    {
      japanese: '思う',
      kana: 'おもう',
      vietnamese: 'nghĩ',
      english: 'to think',
      type: 'main',
      example: '行かないことにしようと思います。'
    },
    {
      japanese: '賛成',
      kana: 'さんせい',
      vietnamese: 'tán thành',
      english: 'agreement',
      type: 'main',
      example: '賛成します。'
    },
    {
      japanese: '反対',
      kana: 'はんたい',
      vietnamese: 'phản đối',
      english: 'opposition',
      type: 'main',
      example: '反対する人はいますか。'
    },
    {
      japanese: '受け入れる',
      kana: 'うけいれる',
      vietnamese: 'chấp nhận',
      english: 'to accept',
      type: 'main',
      example: '提案を受け入れました。'
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
      japanese: '承諾',
      kana: 'しょうだく',
      vietnamese: 'chấp thuận',
      english: 'consent, acceptance',
      type: 'main',
      example: '承諾を得ました。'
    },
    {
      japanese: '拒否',
      kana: 'きょひ',
      vietnamese: 'từ chối',
      english: 'refusal, rejection',
      type: 'main',
      example: '要求を拒否しました。'
    },

    // Additional Vocabulary - More Verbs
    {
      japanese: '辞める',
      kana: 'やめる',
      vietnamese: 'thôi, nghỉ việc',
      english: 'to quit, to resign',
      type: 'additional',
      example: '会社を辞めることにしました。'
    },
    {
      japanese: '止める',
      kana: 'やめる',
      vietnamese: 'dừng lại',
      english: 'to stop',
      type: 'additional',
      example: 'タバコを止めました。'
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
      japanese: '続ける',
      kana: 'つづける',
      vietnamese: 'tiếp tục',
      english: 'to continue',
      type: 'additional',
      example: '勉強を続けることにしました。'
    },
    {
      japanese: '始める',
      kana: 'はじめる',
      vietnamese: 'bắt đầu',
      english: 'to begin',
      type: 'additional',
      example: '新しい仕事を始めます。'
    },
    {
      japanese: '検討する',
      kana: 'けんとうする',
      vietnamese: 'xem xét',
      english: 'to consider',
      type: 'additional',
      example: '提案を検討します。'
    },
    {
      japanese: '相談する',
      kana: 'そうだんする',
      vietnamese: 'tham khảo',
      english: 'to consult',
      type: 'additional',
      example: '友達に相談しました。'
    },
    {
      japanese: '提案する',
      kana: 'ていあんする',
      vietnamese: 'đề xuất',
      english: 'to propose',
      type: 'additional',
      example: '新しい方法を提案しました。'
    },
    {
      japanese: '承認する',
      kana: 'しょうにんする',
      vietnamese: 'phê duyệt',
      english: 'to approve',
      type: 'additional',
      example: '計画が承認されました。'
    },
    {
      japanese: '却下する',
      kana: 'きゃっかする',
      vietnamese: 'bác bỏ',
      english: 'to reject',
      type: 'additional',
      example: '提案が却下されました。'
    },

    // Additional Vocabulary - States & Conditions
    {
      japanese: '確定',
      kana: 'かくてい',
      vietnamese: 'xác định',
      english: 'confirmation, decision',
      type: 'additional',
      example: '日程が確定しました。'
    },
    {
      japanese: '確認',
      kana: 'かくにん',
      vietnamese: 'xác nhận',
      english: 'confirmation',
      type: 'additional',
      example: '予約を確認してください。'
    },
    {
      japanese: '決心',
      kana: 'けっしん',
      vietnamese: 'quyết tâm',
      english: 'determination',
      type: 'additional',
      example: '決心がつきました。'
    },
    {
      japanese: '意思',
      kana: 'いし',
      vietnamese: 'ý chí',
      english: 'will, intention',
      type: 'additional',
      example: '強い意思が必要です。'
    },
    {
      japanese: '意見',
      kana: 'いけん',
      vietnamese: 'ý kiến',
      english: 'opinion',
      type: 'additional',
      example: 'あなたの意見を聞かせてください。'
    },
    {
      japanese: '意図',
      kana: 'いと',
      vietnamese: 'ý định',
      english: 'intention',
      type: 'additional',
      example: '意図が分かりません。'
    },
    {
      japanese: '結論',
      kana: 'けつろん',
      vietnamese: 'kết luận',
      english: 'conclusion',
      type: 'additional',
      example: '結論を出しました。'
    },
    {
      japanese: '結果',
      kana: 'けっか',
      vietnamese: 'kết quả',
      english: 'result',
      type: 'additional',
      example: '結果を待っています。'
    },
    {
      japanese: '成果',
      kana: 'せいか',
      vietnamese: 'thành quả',
      english: 'result, achievement',
      type: 'additional',
      example: 'いい成果が出ました。'
    },
    {
      japanese: '効果',
      kana: 'こうか',
      vietnamese: 'hiệu quả',
      english: 'effect',
      type: 'additional',
      example: '効果がありました。'
    },

    // Supplementary Vocabulary - Transitions
    {
      japanese: '移る',
      kana: 'うつる',
      vietnamese: 'chuyển đến',
      english: 'to move to',
      type: 'supplementary',
      example: '別の会社に移ることになりました。'
    },
    {
      japanese: '移す',
      kana: 'うつす',
      vietnamese: 'chuyển (tác động)',
      english: 'to transfer',
      type: 'supplementary',
      example: '荷物を移しました。'
    },
    {
      japanese: '転職',
      kana: 'てんしょく',
      vietnamese: 'chuyển việc',
      english: 'job change',
      type: 'supplementary',
      example: '転職を考えています。'
    },
    {
      japanese: '異動',
      kana: 'いどう',
      vietnamese: 'thuyên chuyển',
      english: 'transfer',
      type: 'supplementary',
      example: '大阪に異動になりました。'
    },
    {
      japanese: '引っ越し',
      kana: 'ひっこし',
      vietnamese: 'chuyển nhà',
      english: 'moving',
      type: 'supplementary',
      example: '来月引っ越します。'
    },
    {
      japanese: '進学',
      kana: 'しんがく',
      vietnamese: 'tiến học',
      english: 'advancing to higher education',
      type: 'supplementary',
      example: '大学に進学することになりました。'
    },
    {
      japanese: '就職',
      kana: 'しゅうしょく',
      vietnamese: 'xin việc',
      english: 'getting a job',
      type: 'supplementary',
      example: '来年就職します。'
    },
    {
      japanese: '退職',
      kana: 'たいしょく',
      vietnamese: 'nghỉ việc',
      english: 'retirement, resignation',
      type: 'supplementary',
      example: '来月退職することになりました。'
    },
    {
      japanese: '卒業',
      kana: 'そつぎょう',
      vietnamese: 'tốt nghiệp',
      english: 'graduation',
      type: 'supplementary',
      example: '来年卒業します。'
    },
    {
      japanese: '入学',
      kana: 'にゅうがく',
      vietnamese: 'nhập học',
      english: 'entrance, enrollment',
      type: 'supplementary',
      example: '4月に入学しました。'
    },

    // Supplementary Vocabulary - Adjectives
    {
      japanese: '適切',
      kana: 'てきせつ',
      vietnamese: 'thích hợp',
      english: 'appropriate',
      type: 'supplementary',
      example: '適切な判断です。'
    },
    {
      japanese: '妥当',
      kana: 'だとう',
      vietnamese: 'hợp lý',
      english: 'appropriate, reasonable',
      type: 'supplementary',
      example: '妥当な決定です。'
    },
    {
      japanese: '正しい',
      kana: 'たださい',
      vietnamese: 'đúng',
      english: 'correct',
      type: 'supplementary',
      example: '正しい選択をしました。'
    },
    {
      japanese: '間違い',
      kana: 'まちがい',
      vietnamese: 'sai lầm',
      english: 'mistake',
      type: 'supplementary',
      example: '間違った決定でした。'
    },
    {
      japanese: '最適',
      kana: 'さいてき',
      vietnamese: 'tối ưu',
      english: 'optimal',
      type: 'supplementary',
      example: '最適な方法を選びました。'
    },
    {
      japanese: '最善',
      kana: 'さいぜん',
      vietnamese: 'tốt nhất',
      english: 'best',
      type: 'supplementary',
      example: '最善を尽くしました。'
    },
    {
      japanese: '慎重',
      kana: 'しんちょう',
      vietnamese: 'thận trọng',
      english: 'careful, cautious',
      type: 'supplementary',
      example: '慎重に考えてください。'
    },
    {
      japanese: '急',
      kana: 'きゅう',
      vietnamese: 'gấp',
      english: 'urgent',
      type: 'supplementary',
      example: '急な変更です。'
    },
    {
      japanese: '重要',
      kana: 'じゅうよう',
      vietnamese: 'quan trọng',
      english: 'important',
      type: 'supplementary',
      example: '重要な決定です。'
    },
    {
      japanese: '必要',
      kana: 'ひつよう',
      vietnamese: 'cần thiết',
      english: 'necessary',
      type: 'supplementary',
      example: '変更が必要です。'
    }
  ],
  grammar: [
    {
      pattern: '～ことにする',
      vietnamese: 'quyết định ~',
      english: 'to decide to do',
      type: 'main',
      explanation: 'Diễn tả quyết định chủ động của chính mình. Dùng với động từ (thể từ điển/ない) + ことにする. Nhấn mạnh ý chí và quyết định cá nhân. Phủ định: ～ないことにする (quyết định không làm).',
      examples: [
        {
          japanese: '日本に留学することにしました。',
          vietnamese: 'Tôi đã quyết định đi du học Nhật Bản.',
          english: 'I decided to study abroad in Japan.',
          type: 'main'
        },
        {
          japanese: '毎日運動することにしました。',
          vietnamese: 'Tôi đã quyết định tập thể dục mỗi ngày.',
          english: 'I decided to exercise every day.',
          type: 'main'
        },
        {
          japanese: 'タバコを吸わないことにしました。',
          vietnamese: 'Tôi đã quyết định không hút thuốc.',
          english: 'I decided not to smoke.',
          type: 'main'
        },
        {
          japanese: '会社を辞めることにしました。',
          vietnamese: 'Tôi đã quyết định nghỉ việc.',
          english: 'I decided to quit the company.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～ことになる',
      vietnamese: 'được quyết định ~, trở thành ~',
      english: 'to be decided, to turn out',
      type: 'main',
      explanation: 'Diễn tả quyết định khách quan hoặc do người khác đưa ra, hoặc tình huống tự nhiên diễn ra. Dùng với động từ (thể từ điển/ない) + ことになる. Không phải quyết định của bản thân. Phủ định: ～ないことになる.',
      examples: [
        {
          japanese: '来月から大阪で働くことになりました。',
          vietnamese: 'Từ tháng sau tôi sẽ làm việc ở Osaka. (Được quyết định)',
          english: 'It\'s been decided that I\'ll work in Osaka from next month.',
          type: 'main'
        },
        {
          japanese: '会議が中止になることになりました。',
          vietnamese: 'Cuộc họp đã được quyết định hủy bỏ.',
          english: 'It was decided that the meeting would be canceled.',
          type: 'main'
        },
        {
          japanese: '結婚しないことになりました。',
          vietnamese: 'Cuối cùng không kết hôn.',
          english: 'It turned out that we won\'t get married.',
          type: 'main'
        },
        {
          japanese: '試験の日が変わることになりました。',
          vietnamese: 'Ngày thi đã được thay đổi.',
          english: 'The exam date has been changed.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～ことにしている',
      vietnamese: 'thường làm ~, có thói quen ~',
      english: 'to make it a rule to do',
      type: 'main',
      explanation: 'Diễn tả thói quen hoặc quy tắc cá nhân đã được quyết định và duy trì. Là dạng tiếp diễn của ～ことにする. Nhấn mạnh việc thực hiện thường xuyên theo quyết định đã đưa ra.',
      examples: [
        {
          japanese: '毎朝ジョギングをすることにしています。',
          vietnamese: 'Tôi thường chạy bộ mỗi sáng.',
          english: 'I make it a rule to jog every morning.',
          type: 'main'
        },
        {
          japanese: '寝る前に本を読むことにしています。',
          vietnamese: 'Tôi thường đọc sách trước khi ngủ.',
          english: 'I make it a rule to read books before bed.',
          type: 'main'
        },
        {
          japanese: 'お酒を飲まないことにしています。',
          vietnamese: 'Tôi không uống rượu (theo quy tắc của mình).',
          english: 'I make it a rule not to drink alcohol.',
          type: 'main'
        },
        {
          japanese: '週末は必ず家族と過ごすことにしています。',
          vietnamese: 'Cuối tuần tôi nhất định dành thời gian với gia đình.',
          english: 'I make it a rule to spend weekends with my family.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～ことになっている',
      vietnamese: 'được quy định ~, theo như ~',
      english: 'it is decided that, it is arranged that',
      type: 'main',
      explanation: 'Diễn tả quy định, lịch trình hoặc thỏa thuận đã được thiết lập. Là dạng tiếp diễn của ～ことになる. Dùng để nói về quy tắc, lịch trình hoặc thỏa thuận cố định.',
      examples: [
        {
          japanese: '授業は9時に始まることになっています。',
          vietnamese: 'Theo quy định thì lớp học bắt đầu lúc 9 giờ.',
          english: 'Classes are scheduled to start at 9 o\'clock.',
          type: 'main'
        },
        {
          japanese: 'ここでタバコを吸ってはいけないことになっています。',
          vietnamese: 'Theo quy định thì không được hút thuốc ở đây.',
          english: 'It\'s stipulated that smoking is not allowed here.',
          type: 'main'
        },
        {
          japanese: '来月結婚することになっています。',
          vietnamese: 'Theo dự định thì tháng sau tôi sẽ kết hôn.',
          english: 'It\'s arranged that I\'ll get married next month.',
          type: 'main'
        },
        {
          japanese: 'この書類は明日までに提出することになっています。',
          vietnamese: 'Theo quy định thì tài liệu này phải nộp trước ngày mai.',
          english: 'This document is to be submitted by tomorrow.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～ようと思う',
      vietnamese: 'định ~, nghĩ sẽ ~',
      english: 'to think of doing, to intend to',
      type: 'main',
      explanation: 'Diễn tả ý định hoặc kế hoạch của bản thân. Dùng với động từ thể ý chí (volitional) + と思う. Nhẹ nhàng hơn ～ことにする và có thể thay đổi.',
      examples: [
        {
          japanese: '明日早く起きようと思います。',
          vietnamese: 'Tôi định dậy sớm vào ngày mai.',
          english: 'I\'m thinking of getting up early tomorrow.',
          type: 'main'
        },
        {
          japanese: '日本語の勉強を続けようと思っています。',
          vietnamese: 'Tôi định tiếp tục học tiếng Nhật.',
          english: 'I\'m thinking of continuing to study Japanese.',
          type: 'main'
        },
        {
          japanese: '新しい仕事を探そうと思います。',
          vietnamese: 'Tôi định tìm việc mới.',
          english: 'I\'m thinking of looking for a new job.',
          type: 'main'
        },
        {
          japanese: '今日は早く帰ろうと思います。',
          vietnamese: 'Hôm nay tôi định về sớm.',
          english: 'I\'m thinking of going home early today.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～ようとする',
      vietnamese: 'cố gắng ~, sắp ~',
      english: 'to try to do, to be about to',
      type: 'additional',
      explanation: 'Diễn tả việc cố gắng làm điều gì hoặc hành động sắp xảy ra. Dùng với động từ thể ý chí (volitional) + とする. Có 2 nghĩa: 1) Cố gắng làm, 2) Sắp sửa làm.',
      examples: [
        {
          japanese: '彼は窓を開けようとしました。',
          vietnamese: 'Anh ấy đã cố gắng mở cửa sổ.',
          english: 'He tried to open the window.',
          type: 'main'
        },
        {
          japanese: '出かけようとしたとき、電話がかかってきました。',
          vietnamese: 'Khi sắp ra ngoài thì có điện thoại.',
          english: 'Just as I was about to go out, the phone rang.',
          type: 'main'
        },
        {
          japanese: '何度も説明しようとしましたが、分かってくれませんでした。',
          vietnamese: 'Tôi đã cố giải thích nhiều lần nhưng họ không hiểu.',
          english: 'I tried to explain many times but they didn\'t understand.',
          type: 'main'
        },
        {
          japanese: '雨が降ろうとしています。',
          vietnamese: 'Trời sắp mưa.',
          english: 'It\'s about to rain.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～つもりだ',
      vietnamese: 'định ~, có ý định ~',
      english: 'to intend to, to plan to',
      type: 'additional',
      explanation: 'Diễn tả ý định hoặc kế hoạch. Dùng với động từ (thể từ điển/ない) + つもりだ. Mạnh hơn ～ようと思う và yếu hơn ～ことにする. Phủ định: ～ないつもりだ (không có ý định).',
      examples: [
        {
          japanese: '来年日本に行くつもりです。',
          vietnamese: 'Năm sau tôi định đi Nhật.',
          english: 'I plan to go to Japan next year.',
          type: 'main'
        },
        {
          japanese: '今日は早く帰るつもりです。',
          vietnamese: 'Hôm nay tôi định về sớm.',
          english: 'I intend to go home early today.',
          type: 'main'
        },
        {
          japanese: 'もう二度とそんなことはしないつもりです。',
          vietnamese: 'Tôi không có ý định làm như vậy nữa.',
          english: 'I don\'t intend to do such a thing again.',
          type: 'main'
        },
        {
          japanese: '大学院に進学するつもりです。',
          vietnamese: 'Tôi có ý định học cao học.',
          english: 'I plan to go to graduate school.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～予定だ',
      vietnamese: 'dự định ~, theo kế hoạch ~',
      english: 'to be scheduled to, to plan to',
      type: 'additional',
      explanation: 'Diễn tả kế hoạch hoặc lịch trình đã được sắp xếp. Dùng với động từ (thể từ điển/ない) + 予定だ、hoặc Noun の予定だ. Mang tính xác định cao hơn つもり.',
      examples: [
        {
          japanese: '来月日本に行く予定です。',
          vietnamese: 'Tháng sau tôi dự định đi Nhật.',
          english: 'I\'m scheduled to go to Japan next month.',
          type: 'main'
        },
        {
          japanese: '会議は3時に終わる予定です。',
          vietnamese: 'Cuộc họp dự kiến kết thúc lúc 3 giờ.',
          english: 'The meeting is scheduled to end at 3 o\'clock.',
          type: 'main'
        },
        {
          japanese: '明日は雨の予定です。',
          vietnamese: 'Ngày mai dự báo sẽ mưa.',
          english: 'It\'s expected to rain tomorrow.',
          type: 'main'
        },
        {
          japanese: '来週試験がある予定です。',
          vietnamese: 'Tuần sau có dự định thi.',
          english: 'There\'s a test scheduled for next week.',
          type: 'additional'
        }
      ]
    }
  ]
};

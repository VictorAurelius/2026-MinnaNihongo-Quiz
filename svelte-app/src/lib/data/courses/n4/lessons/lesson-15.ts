/**
 * N4 Core Lessons — Lesson 15: Conjunctions and Transitions
 * Connecting sentences and expressing relationships
 */

import type { LessonData } from '$lib/types';

export const LESSON_15_DATA: LessonData = {
  lessonNumber: 15,
  title: '接続表現 (Liên từ và chuyển tiếp)',
  vocabulary: [
    // Conjunctions - reason
    {
      japanese: 'だから',
      kana: 'だから',
      vietnamese: 'vì vậy, cho nên',
      english: 'so, therefore',
      type: 'main',
      example: '雨が降っています。だから、傘を持って行きます。'
    },
    {
      japanese: 'それで',
      kana: 'それで',
      vietnamese: 'vì vậy, do đó',
      english: 'so, and then',
      type: 'main',
      example: '財布を忘れました。それで、お金が払えませんでした。'
    },
    {
      japanese: 'ですから',
      kana: 'ですから',
      vietnamese: 'vì vậy (lịch sự)',
      english: 'therefore, so (formal)',
      type: 'main',
      example: '明日は休みです。ですから、ゆっくり休めます。'
    },
    {
      japanese: 'そのため',
      kana: 'そのため',
      vietnamese: 'vì lý do đó',
      english: 'for that reason',
      type: 'main',
      example: '台風が来ました。そのため、電車が止まりました。'
    },

    // Conjunctions - contrast
    {
      japanese: 'しかし',
      kana: 'しかし',
      vietnamese: 'tuy nhiên',
      english: 'however, but',
      type: 'main',
      example: '勉強しました。しかし、試験に落ちました。'
    },
    {
      japanese: 'でも',
      kana: 'でも',
      vietnamese: 'nhưng',
      english: 'but, however',
      type: 'main',
      example: '疲れています。でも、頑張ります。'
    },
    {
      japanese: 'ところが',
      kana: 'ところが',
      vietnamese: 'nhưng mà',
      english: 'however, but (contrary to expectation)',
      type: 'main',
      example: '早く出ました。ところが、遅刻しました。'
    },
    {
      japanese: 'けれども',
      kana: 'けれども',
      vietnamese: 'nhưng, tuy nhiên',
      english: 'but, however',
      type: 'main',
      example: '日本語は難しいです。けれども、面白いです。'
    },
    {
      japanese: 'が',
      kana: 'が',
      vietnamese: 'nhưng',
      english: 'but',
      type: 'main',
      example: '行きたいですが、時間がありません。'
    },

    // Conjunctions - addition
    {
      japanese: 'それに',
      kana: 'それに',
      vietnamese: 'hơn nữa',
      english: 'besides, moreover',
      type: 'main',
      example: '彼は親切です。それに、頭もいいです。'
    },
    {
      japanese: 'そして',
      kana: 'そして',
      vietnamese: 'và rồi',
      english: 'and, and then',
      type: 'main',
      example: '駅に行きました。そして、電車に乗りました。'
    },
    {
      japanese: 'また',
      kana: 'また',
      vietnamese: 'thêm nữa, lại',
      english: 'also, again',
      type: 'main',
      example: 'これは安いです。また、品質もいいです。'
    },
    {
      japanese: 'その上',
      kana: 'そのうえ',
      vietnamese: 'hơn nữa',
      english: 'moreover, furthermore',
      type: 'main',
      example: '仕事が多いです。その上、難しいです。'
    },

    // Conjunctions - condition
    {
      japanese: 'では',
      kana: 'では',
      vietnamese: 'vậy thì',
      english: 'then, in that case',
      type: 'main',
      example: '時間がありませんか。では、また今度。'
    },
    {
      japanese: 'それなら',
      kana: 'それなら',
      vietnamese: 'nếu vậy thì',
      english: 'if so, in that case',
      type: 'main',
      example: '雨が降りますか。それなら、行きません。'
    },
    {
      japanese: 'じゃあ',
      kana: 'じゃあ',
      vietnamese: 'vậy thì',
      english: 'then, well then',
      type: 'main',
      example: '準備ができましたか。じゃあ、行きましょう。'
    },
    {
      japanese: 'そうすると',
      kana: 'そうすると',
      vietnamese: 'nếu làm vậy thì',
      english: 'if you do so, then',
      type: 'main',
      example: 'ここを押します。そうすると、ドアが開きます。'
    },

    // Conjunctions - example
    {
      japanese: 'たとえば',
      kana: 'たとえば',
      vietnamese: 'ví dụ',
      english: 'for example',
      type: 'main',
      example: 'たとえば、リンゴやバナナが好きです。'
    },
    {
      japanese: 'つまり',
      kana: 'つまり',
      vietnamese: 'nghĩa là, tóm lại',
      english: 'in other words, that is',
      type: 'main',
      example: '彼は来ません。つまり、一人で行きます。'
    },
    {
      japanese: 'すなわち',
      kana: 'すなわち',
      vietnamese: 'tức là',
      english: 'namely, that is to say',
      type: 'main',
      example: '明日は休日です。すなわち、仕事はありません。'
    },

    // Time sequence
    {
      japanese: 'まず',
      kana: 'まず',
      vietnamese: 'trước tiên',
      english: 'first, to begin with',
      type: 'main',
      example: 'まず、手を洗ってください。'
    },
    {
      japanese: '次に',
      kana: 'つぎに',
      vietnamese: 'tiếp theo',
      english: 'next, then',
      type: 'main',
      example: '次に、野菜を切ります。'
    },
    {
      japanese: 'それから',
      kana: 'それから',
      vietnamese: 'sau đó',
      english: 'after that, and then',
      type: 'main',
      example: '朝ごはんを食べました。それから、学校へ行きました。'
    },
    {
      japanese: '最後に',
      kana: 'さいごに',
      vietnamese: 'cuối cùng',
      english: 'finally, lastly',
      type: 'main',
      example: '最後に、塩を入れます。'
    },
    {
      japanese: '終わりに',
      kana: 'おわりに',
      vietnamese: 'kết thúc',
      english: 'in conclusion',
      type: 'main',
      example: '終わりに、質問はありますか。'
    },

    // Transition words
    {
      japanese: 'ところで',
      kana: 'ところで',
      vietnamese: 'nhân tiện, nhân đây',
      english: 'by the way',
      type: 'main',
      example: 'ところで、明日は何をしますか。'
    },
    {
      japanese: 'さて',
      kana: 'さて',
      vietnamese: 'nào, giờ thì',
      english: 'well, now',
      type: 'main',
      example: 'さて、始めましょうか。'
    },
    {
      japanese: 'では',
      kana: 'では',
      vietnamese: 'vậy thì',
      english: 'well then',
      type: 'main',
      example: 'では、失礼します。'
    },
    {
      japanese: 'ちなみに',
      kana: 'ちなみに',
      vietnamese: 'nhân tiện',
      english: 'by the way, incidentally',
      type: 'main',
      example: 'ちなみに、あなたの年齢は？'
    },

    // Reasons and causes
    {
      japanese: '理由',
      kana: 'りゆう',
      vietnamese: 'lý do',
      english: 'reason',
      type: 'main',
      example: '理由を教えてください。'
    },
    {
      japanese: '原因',
      kana: 'げんいん',
      vietnamese: 'nguyên nhân',
      english: 'cause',
      type: 'main',
      example: '事故の原因は何ですか。'
    },
    {
      japanese: '結果',
      kana: 'けっか',
      vietnamese: 'kết quả',
      english: 'result',
      type: 'main',
      example: '試験の結果はどうでしたか。'
    },
    {
      japanese: '影響',
      kana: 'えいきょう',
      vietnamese: 'ảnh hưởng',
      english: 'influence, effect',
      type: 'main',
      example: '天気の影響で遅れました。'
    },

    // Contrast and opposition
    {
      japanese: '反対',
      kana: 'はんたい',
      vietnamese: 'phản đối',
      english: 'opposite, opposition',
      type: 'main',
      example: '私は反対です。'
    },
    {
      japanese: '逆',
      kana: 'ぎゃく',
      vietnamese: 'ngược lại',
      english: 'opposite, reverse',
      type: 'main',
      example: '逆の意味です。'
    },
    {
      japanese: '一方',
      kana: 'いっぽう',
      vietnamese: 'mặt khác',
      english: 'on the other hand',
      type: 'main',
      example: '彼は優しいです。一方、厳しい面もあります。'
    },
    {
      japanese: '対照的',
      kana: 'たいしょうてき',
      vietnamese: 'tương phản',
      english: 'contrasting',
      type: 'main',
      example: '対照的な性格です。'
    },

    // Additional vocabulary
    {
      japanese: '関係',
      kana: 'かんけい',
      vietnamese: 'mối quan hệ',
      english: 'relationship, connection',
      type: 'additional',
      example: 'どんな関係ですか。'
    },
    {
      japanese: '条件',
      kana: 'じょうけん',
      vietnamese: 'điều kiện',
      english: 'condition',
      type: 'additional',
      example: '条件があります。'
    },
    {
      japanese: '場合',
      kana: 'ばあい',
      vietnamese: 'trường hợp',
      english: 'case, situation',
      type: 'additional',
      example: 'その場合は連絡してください。'
    },
    {
      japanese: '状況',
      kana: 'じょうきょう',
      vietnamese: 'tình huống',
      english: 'situation, circumstances',
      type: 'additional',
      example: '状況を説明してください。'
    },
    {
      japanese: '事情',
      kana: 'じじょう',
      vietnamese: 'hoàn cảnh',
      english: 'circumstances',
      type: 'additional',
      example: '事情が分かりました。'
    },
    {
      japanese: '理解',
      kana: 'りかい',
      vietnamese: 'hiểu biết',
      english: 'understanding',
      type: 'additional',
      example: 'ご理解ください。'
    },
    {
      japanese: '説明',
      kana: 'せつめい',
      vietnamese: 'giải thích',
      english: 'explanation',
      type: 'additional',
      example: '説明してください。'
    },
    {
      japanese: '主張',
      kana: 'しゅちょう',
      vietnamese: 'khẳng định, chủ trương',
      english: 'assertion, claim',
      type: 'additional',
      example: '自分の主張を言います。'
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
      japanese: '反論',
      kana: 'はんろん',
      vietnamese: 'phản bác',
      english: 'objection, counterargument',
      type: 'additional',
      example: '反論があります。'
    },
    {
      japanese: '賛成',
      kana: 'さんせい',
      vietnamese: 'tán thành',
      english: 'agreement, approval',
      type: 'additional',
      example: '賛成です。'
    },
    {
      japanese: '同意',
      kana: 'どうい',
      vietnamese: 'đồng ý',
      english: 'agreement, consent',
      type: 'additional',
      example: '同意します。'
    },
    {
      japanese: '結論',
      kana: 'けつろん',
      vietnamese: 'kết luận',
      english: 'conclusion',
      type: 'additional',
      example: '結論を出します。'
    },
    {
      japanese: '要約',
      kana: 'ようやく',
      vietnamese: 'tóm tắt',
      english: 'summary',
      type: 'additional',
      example: '要約してください。'
    },
    {
      japanese: '内容',
      kana: 'ないよう',
      vietnamese: 'nội dung',
      english: 'contents, substance',
      type: 'additional',
      example: '内容を確認します。'
    },

    // Supplementary
    {
      japanese: 'なぜなら',
      kana: 'なぜなら',
      vietnamese: 'bởi vì',
      english: 'because',
      type: 'supplementary',
      example: '行きません。なぜなら、忙しいからです。'
    },
    {
      japanese: 'というのは',
      kana: 'というのは',
      vietnamese: 'lý do là',
      english: 'the reason is',
      type: 'supplementary',
      example: '遅れました。というのは、電車が遅れたからです。'
    },
    {
      japanese: 'にもかかわらず',
      kana: 'にもかかわらず',
      vietnamese: 'mặc dù, bất chấp',
      english: 'despite, in spite of',
      type: 'supplementary',
      example: '雨にもかかわらず、行きました。'
    },
    {
      japanese: 'とはいえ',
      kana: 'とはいえ',
      vietnamese: 'tuy nhiên',
      english: 'however, nevertheless',
      type: 'supplementary',
      example: '便利です。とはいえ、高いです。'
    },
    {
      japanese: 'ただし',
      kana: 'ただし',
      vietnamese: 'tuy nhiên',
      english: 'however, provided that',
      type: 'supplementary',
      example: '参加できます。ただし、条件があります。'
    }
  ],
  grammar: [
    {
      pattern: 'だから / ですから',
      vietnamese: 'vì vậy, cho nên',
      english: 'so, therefore',
      type: 'main',
      explanation: 'Diễn tả kết quả từ lý do trước đó. だから thân mật hơn ですから.',
      examples: [
        {
          japanese: '雨が降っています。だから、傘を持って行きます。',
          vietnamese: 'Trời đang mưa. Vì vậy tôi mang theo ô.',
          english: 'It\'s raining. So I\'ll take an umbrella.',
          type: 'main'
        },
        {
          japanese: '明日は休みです。ですから、ゆっくり休めます。',
          vietnamese: 'Ngày mai nghỉ. Cho nên tôi có thể nghỉ ngơi thoải mái.',
          english: 'Tomorrow is a holiday. Therefore, I can rest well.',
          type: 'main'
        },
        {
          japanese: '時間がありません。だから、急いでください。',
          vietnamese: 'Không có thời gian. Vì vậy hãy nhanh lên.',
          english: 'There\'s no time. So please hurry.',
          type: 'main'
        }
      ]
    },
    {
      pattern: 'しかし / でも',
      vietnamese: 'tuy nhiên, nhưng',
      english: 'however, but',
      type: 'main',
      explanation: 'Diễn tả sự tương phản. しかし lịch sự hơn でも.',
      examples: [
        {
          japanese: '一生懸命勉強しました。しかし、試験に落ちました。',
          vietnamese: 'Tôi đã học chăm chỉ. Tuy nhiên, tôi đã trượt kỳ thi.',
          english: 'I studied hard. However, I failed the exam.',
          type: 'main'
        },
        {
          japanese: '疲れています。でも、頑張ります。',
          vietnamese: 'Tôi mệt. Nhưng tôi sẽ cố gắng.',
          english: 'I\'m tired. But I\'ll do my best.',
          type: 'main'
        },
        {
          japanese: '安いです。しかし、品質がよくありません。',
          vietnamese: 'Rẻ. Tuy nhiên chất lượng không tốt.',
          english: 'It\'s cheap. However, the quality is not good.',
          type: 'main'
        }
      ]
    },
    {
      pattern: 'それで',
      vietnamese: 'vì vậy, và rồi',
      english: 'so, and then',
      type: 'main',
      explanation: 'Diễn tả kết quả hoặc hành động tiếp theo từ tình huống trước.',
      examples: [
        {
          japanese: '財布を忘れました。それで、お金が払えませんでした。',
          vietnamese: 'Tôi quên ví. Vì vậy không thể trả tiền.',
          english: 'I forgot my wallet. So I couldn\'t pay.',
          type: 'main'
        },
        {
          japanese: '電車が止まりました。それで、遅刻しました。',
          vietnamese: 'Tàu điện dừng. Vì vậy tôi đã đến muộn.',
          english: 'The train stopped. So I was late.',
          type: 'main'
        },
        {
          japanese: '道に迷いました。それで、警察に聞きました。',
          vietnamese: 'Tôi lạc đường. Vì vậy đã hỏi cảnh sát.',
          english: 'I got lost. So I asked the police.',
          type: 'main'
        }
      ]
    },
    {
      pattern: 'それに',
      vietnamese: 'hơn nữa, thêm vào đó',
      english: 'besides, moreover',
      type: 'main',
      explanation: 'Thêm thông tin bổ sung theo hướng tích cực hoặc tiêu cực.',
      examples: [
        {
          japanese: '彼は親切です。それに、頭もいいです。',
          vietnamese: 'Anh ấy tốt bụng. Hơn nữa còn thông minh.',
          english: 'He\'s kind. Besides, he\'s smart too.',
          type: 'main'
        },
        {
          japanese: 'この店は安いです。それに、美味しいです。',
          vietnamese: 'Quán này rẻ. Hơn nữa còn ngon.',
          english: 'This restaurant is cheap. Moreover, it\'s delicious.',
          type: 'main'
        },
        {
          japanese: '日本語は難しいです。それに、漢字も覚えなければなりません。',
          vietnamese: 'Tiếng Nhật khó. Hơn nữa còn phải nhớ kanji.',
          english: 'Japanese is difficult. Besides, you have to memorize kanji.',
          type: 'main'
        }
      ]
    },
    {
      pattern: 'それから',
      vietnamese: 'sau đó, rồi',
      english: 'after that, and then',
      type: 'main',
      explanation: 'Diễn tả hành động tiếp theo theo trình tự thời gian.',
      examples: [
        {
          japanese: '朝ごはんを食べました。それから、学校へ行きました。',
          vietnamese: 'Tôi đã ăn sáng. Sau đó đi đến trường.',
          english: 'I ate breakfast. After that, I went to school.',
          type: 'main'
        },
        {
          japanese: '宿題をします。それから、テレビを見ます。',
          vietnamese: 'Tôi làm bài tập. Sau đó xem TV.',
          english: 'I do homework. And then watch TV.',
          type: 'main'
        },
        {
          japanese: 'シャワーを浴びました。それから、寝ました。',
          vietnamese: 'Tôi đã tắm. Sau đó đi ngủ.',
          english: 'I took a shower. After that, I went to bed.',
          type: 'main'
        }
      ]
    },
    {
      pattern: 'まず〜、次に〜、最後に〜',
      vietnamese: 'trước tiên ~, tiếp theo ~, cuối cùng ~',
      english: 'first ~, next ~, finally ~',
      type: 'main',
      explanation: 'Diễn tả trình tự các bước hoặc hành động.',
      examples: [
        {
          japanese: 'まず、手を洗います。次に、野菜を切ります。最後に、炒めます。',
          vietnamese: 'Trước tiên rửa tay. Tiếp theo cắt rau. Cuối cùng xào.',
          english: 'First, wash your hands. Next, cut vegetables. Finally, stir-fry.',
          type: 'main'
        },
        {
          japanese: 'まず、予約します。次に、準備します。最後に、出発します。',
          vietnamese: 'Trước tiên đặt chỗ. Tiếp theo chuẩn bị. Cuối cùng khởi hành.',
          english: 'First, make a reservation. Next, prepare. Finally, depart.',
          type: 'main'
        },
        {
          japanese: 'まず、説明を聞きます。次に、質問します。',
          vietnamese: 'Trước tiên nghe giải thích. Tiếp theo hỏi.',
          english: 'First, listen to the explanation. Next, ask questions.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: 'ところで',
      vietnamese: 'nhân tiện, nhân đây',
      english: 'by the way',
      type: 'additional',
      explanation: 'Chuyển sang chủ đề mới trong cuộc hội thoại.',
      examples: [
        {
          japanese: 'ところで、明日は何をしますか。',
          vietnamese: 'Nhân tiện, ngày mai bạn làm gì?',
          english: 'By the way, what will you do tomorrow?',
          type: 'main'
        },
        {
          japanese: 'ところで、週末は暇ですか。',
          vietnamese: 'Nhân đây, cuối tuần bạn rảnh không?',
          english: 'By the way, are you free this weekend?',
          type: 'main'
        },
        {
          japanese: 'ところで、彼は元気ですか。',
          vietnamese: 'Nhân tiện, anh ấy có khỏe không?',
          english: 'By the way, is he well?',
          type: 'additional'
        }
      ]
    },
    {
      pattern: 'たとえば',
      vietnamese: 'ví dụ',
      english: 'for example',
      type: 'additional',
      explanation: 'Đưa ra ví dụ cụ thể để minh họa.',
      examples: [
        {
          japanese: '果物が好きです。たとえば、リンゴやバナナです。',
          vietnamese: 'Tôi thích hoa quả. Ví dụ như táo và chuối.',
          english: 'I like fruits. For example, apples and bananas.',
          type: 'main'
        },
        {
          japanese: 'スポーツをします。たとえば、サッカーやテニスです。',
          vietnamese: 'Tôi chơi thể thao. Ví dụ như bóng đá và tennis.',
          english: 'I play sports. For example, soccer and tennis.',
          type: 'main'
        },
        {
          japanese: '日本の食べ物はおいしいです。たとえば、寿司やラーメンです。',
          vietnamese: 'Đồ ăn Nhật ngon. Ví dụ như sushi và ramen.',
          english: 'Japanese food is delicious. For example, sushi and ramen.',
          type: 'additional'
        }
      ]
    }
  ]
};

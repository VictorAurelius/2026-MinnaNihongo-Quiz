/**
 * N4 Core Lessons — Lesson 23
 * Focus: Hypothetical and Contrary-to-Fact Conditions
 */

import type { LessonData } from '$lib/types';

export const LESSON_23_DATA: LessonData = {
  lessonNumber: 23,
  title: '仮定と条件 (Giả định và điều kiện)',
  vocabulary: [
    // Condition-related verbs
    {
      japanese: '起こる（おこる）',
      kana: 'おこる',
      vietnamese: 'xảy ra',
      english: 'to occur/happen',
      type: 'main',
      example: '地震が起こりました。'
    },
    {
      japanese: '変わる（かわる）',
      kana: 'かわる',
      vietnamese: 'thay đổi',
      english: 'to change',
      type: 'main',
      example: '天気が変わりました。'
    },
    {
      japanese: '変える（かえる）',
      kana: 'かえる',
      vietnamese: 'làm thay đổi',
      english: 'to change (something)',
      type: 'main',
      example: '予定を変えました。'
    },
    {
      japanese: '増える（ふえる）',
      kana: 'ふえる',
      vietnamese: 'tăng',
      english: 'to increase',
      type: 'main',
      example: '人口が増えています。'
    },
    {
      japanese: '増やす（ふやす）',
      kana: 'ふやす',
      vietnamese: 'làm tăng',
      english: 'to increase (something)',
      type: 'main',
      example: '売上を増やしたいです。'
    },
    {
      japanese: '減る（へる）',
      kana: 'へる',
      vietnamese: 'giảm',
      english: 'to decrease',
      type: 'main',
      example: '体重が減りました。'
    },
    {
      japanese: '減らす（へらす）',
      kana: 'へらす',
      vietnamese: 'làm giảm',
      english: 'to reduce (something)',
      type: 'main',
      example: '無駄を減らします。'
    },
    {
      japanese: '続く（つづく）',
      kana: 'つづく',
      vietnamese: 'tiếp tục',
      english: 'to continue',
      type: 'main',
      example: '雨が続いています。'
    },
    {
      japanese: '続ける（つづける）',
      kana: 'つづける',
      vietnamese: 'tiếp tục (làm gì)',
      english: 'to continue (doing)',
      type: 'main',
      example: '勉強を続けます。'
    },
    {
      japanese: '止まる（とまる）',
      kana: 'とまる',
      vietnamese: 'dừng lại',
      english: 'to stop',
      type: 'main',
      example: '雨が止まりました。'
    },
    {
      japanese: '止める（とめる）',
      kana: 'とめる',
      vietnamese: 'làm dừng lại',
      english: 'to stop (something)',
      type: 'main',
      example: '車を止めてください。'
    },
    {
      japanese: '成功する（せいこうする）',
      kana: 'せいこうする',
      vietnamese: 'thành công',
      english: 'to succeed',
      type: 'main',
      example: '計画が成功しました。'
    },
    {
      japanese: '失敗する（しっぱいする）',
      kana: 'しっぱいする',
      vietnamese: 'thất bại',
      english: 'to fail',
      type: 'main',
      example: '試験に失敗しました。'
    },
    {
      japanese: '合格する（ごうかくする）',
      kana: 'ごうかくする',
      vietnamese: 'đậu, đỗ',
      english: 'to pass (exam)',
      type: 'main',
      example: '試験に合格しました。'
    },
    {
      japanese: '不合格（ふごうかく）',
      kana: 'ふごうかく',
      vietnamese: 'trượt',
      english: 'to fail (exam)',
      type: 'main',
      example: '残念ながら不合格でした。'
    },
    // Weather and environment
    {
      japanese: '天気（てんき）',
      kana: 'てんき',
      vietnamese: 'thời tiết',
      english: 'weather',
      type: 'main',
      example: '明日の天気はどうですか。'
    },
    {
      japanese: '晴れ（はれ）',
      kana: 'はれ',
      vietnamese: 'trời nắng',
      english: 'sunny weather',
      type: 'main',
      example: '明日は晴れです。'
    },
    {
      japanese: '曇り（くもり）',
      kana: 'くもり',
      vietnamese: 'trời có mây',
      english: 'cloudy weather',
      type: 'main',
      example: '今日は曇りです。'
    },
    {
      japanese: '雨（あめ）',
      kana: 'あめ',
      vietnamese: 'mưa',
      english: 'rain',
      type: 'main',
      example: '雨が降っています。'
    },
    {
      japanese: '雪（ゆき）',
      kana: 'ゆき',
      vietnamese: 'tuyết',
      english: 'snow',
      type: 'main',
      example: '雪が降りました。'
    },
    {
      japanese: '台風（たいふう）',
      kana: 'たいふう',
      vietnamese: 'bão',
      english: 'typhoon',
      type: 'main',
      example: '台風が来ています。'
    },
    {
      japanese: '地震（じしん）',
      kana: 'じしん',
      vietnamese: 'động đất',
      english: 'earthquake',
      type: 'main',
      example: '地震が起こりました。'
    },
    {
      japanese: '環境（かんきょう）',
      kana: 'かんきょう',
      vietnamese: 'môi trường',
      english: 'environment',
      type: 'main',
      example: '環境を守りましょう。'
    },
    {
      japanese: '自然（しぜん）',
      kana: 'しぜん',
      vietnamese: 'tự nhiên',
      english: 'nature',
      type: 'main',
      example: '自然が豊かです。'
    },
    {
      japanese: '温暖化（おんだんか）',
      kana: 'おんだんか',
      vietnamese: 'sự nóng lên (toàn cầu)',
      english: 'global warming',
      type: 'main',
      example: '地球温暖化が心配です。'
    },
    // Possibility and assumption
    {
      japanese: '場合（ばあい）',
      kana: 'ばあい',
      vietnamese: 'trường hợp',
      english: 'case/situation',
      type: 'main',
      example: '雨の場合は中止です。'
    },
    {
      japanese: '〜次第（〜しだい）',
      kana: '〜しだい',
      vietnamese: 'tùy thuộc vào',
      english: 'depending on',
      type: 'main',
      example: '天気次第で決めます。'
    },
    {
      japanese: 'もし',
      kana: 'もし',
      vietnamese: 'nếu',
      english: 'if',
      type: 'main',
      example: 'もし時間があれば、行きます。'
    },
    {
      japanese: 'もしかしたら',
      kana: 'もしかしたら',
      vietnamese: 'có lẽ, có thể',
      english: 'perhaps/maybe',
      type: 'main',
      example: 'もしかしたら雨かもしれません。'
    },
    {
      japanese: '万一（まんいち）',
      kana: 'まんいち',
      vietnamese: 'vạn nhất, phòng khi',
      english: 'in the unlikely event',
      type: 'main',
      example: '万一の場合に備えます。'
    },
    {
      japanese: '仮に（かりに）',
      kana: 'かりに',
      vietnamese: 'giả sử',
      english: 'supposing/assuming',
      type: 'main',
      example: '仮に失敗しても大丈夫です。'
    },
    // Additional vocabulary
    {
      japanese: '条件（じょうけん）',
      kana: 'じょうけん',
      vietnamese: 'điều kiện',
      english: 'condition',
      type: 'additional',
      example: '条件を満たせば合格です。'
    },
    {
      japanese: '前提（ぜんてい）',
      kana: 'ぜんてい',
      vietnamese: 'tiền đề',
      english: 'premise/assumption',
      type: 'additional',
      example: 'それを前提として話します。'
    },
    {
      japanese: '結論（けつろん）',
      kana: 'けつろん',
      vietnamese: 'kết luận',
      english: 'conclusion',
      type: 'additional',
      example: '結論を出しましょう。'
    },
    {
      japanese: '推測する（すいそくする）',
      kana: 'すいそくする',
      vietnamese: 'suy đoán',
      english: 'to guess/estimate',
      type: 'additional',
      example: '原因を推測します。'
    },
    {
      japanese: '予想する（よそうする）',
      kana: 'よそうする',
      vietnamese: 'dự đoán',
      english: 'to predict/expect',
      type: 'additional',
      example: '結果を予想しました。'
    },
    {
      japanese: '想像する（そうぞうする）',
      kana: 'そうぞうする',
      vietnamese: 'tưởng tượng',
      english: 'to imagine',
      type: 'additional',
      example: '未来を想像します。'
    },
    {
      japanese: '仮定する（かていする）',
      kana: 'かていする',
      vietnamese: 'giả định',
      english: 'to assume',
      type: 'additional',
      example: 'AとBを仮定します。'
    },
    {
      japanese: '実現する（じつげんする）',
      kana: 'じつげんする',
      vietnamese: 'thực hiện',
      english: 'to realize/achieve',
      type: 'additional',
      example: '夢を実現しました。'
    },
    {
      japanese: '達成する（たっせいする）',
      kana: 'たっせいする',
      vietnamese: 'đạt được',
      english: 'to achieve/accomplish',
      type: 'additional',
      example: '目標を達成しました。'
    },
    {
      japanese: '実際（じっさい）',
      kana: 'じっさい',
      vietnamese: 'thực tế',
      english: 'actually/in reality',
      type: 'additional',
      example: '実際に見てください。'
    },
    {
      japanese: '本当（ほんとう）',
      kana: 'ほんとう',
      vietnamese: 'thật',
      english: 'true/real',
      type: 'additional',
      example: '本当ですか。'
    },
    {
      japanese: '嘘（うそ）',
      kana: 'うそ',
      vietnamese: 'nói dối',
      english: 'lie',
      type: 'additional',
      example: '嘘をつかないでください。'
    },
    {
      japanese: '正しい（ただしい）',
      kana: 'ただしい',
      vietnamese: 'đúng',
      english: 'correct/right',
      type: 'additional',
      example: '正しい答えです。'
    },
    {
      japanese: '間違い（まちがい）',
      kana: 'まちがい',
      vietnamese: 'sai lầm',
      english: 'mistake/error',
      type: 'additional',
      example: '間違いがあります。'
    },
    {
      japanese: '確実（かくじつ）',
      kana: 'かくじつ',
      vietnamese: 'chắc chắn',
      english: 'certain/sure',
      type: 'additional',
      example: '確実な方法です。'
    },
    {
      japanese: '不確実（ふかくじつ）',
      kana: 'ふかくじつ',
      vietnamese: 'không chắc chắn',
      english: 'uncertain',
      type: 'additional',
      example: '未来は不確実です。'
    },
    {
      japanese: '絶対（ぜったい）',
      kana: 'ぜったい',
      vietnamese: 'tuyệt đối',
      english: 'absolutely',
      type: 'additional',
      example: '絶対に行きます。'
    },
    {
      japanese: '多分（たぶん）',
      kana: 'たぶん',
      vietnamese: 'có lẽ',
      english: 'probably',
      type: 'additional',
      example: '多分行けると思います。'
    },
    {
      japanese: 'きっと',
      kana: 'きっと',
      vietnamese: 'chắc chắn',
      english: 'surely/certainly',
      type: 'additional',
      example: 'きっと成功します。'
    },
    {
      japanese: '恐らく（おそらく）',
      kana: 'おそらく',
      vietnamese: 'có lẽ',
      english: 'probably/perhaps',
      type: 'additional',
      example: '恐らく大丈夫でしょう。'
    },
    // Supplementary
    {
      japanese: '偶然（ぐうぜん）',
      kana: 'ぐうぜん',
      vietnamese: 'ngẫu nhiên',
      english: 'coincidence/by chance',
      type: 'supplementary',
      example: '偶然会いました。'
    },
    {
      japanese: '必然（ひつぜん）',
      kana: 'ひつぜん',
      vietnamese: 'tất yếu',
      english: 'inevitable/necessary',
      type: 'supplementary',
      example: '必然的な結果です。'
    },
    {
      japanese: '運（うん）',
      kana: 'うん',
      vietnamese: 'vận may',
      english: 'luck/fortune',
      type: 'supplementary',
      example: '運が良かったです。'
    },
    {
      japanese: 'チャンス',
      kana: 'チャンス',
      vietnamese: 'cơ hội',
      english: 'chance/opportunity',
      type: 'supplementary',
      example: 'チャンスを逃しました。'
    },
    {
      japanese: '危険（きけん）',
      kana: 'きけん',
      vietnamese: 'nguy hiểm',
      english: 'danger',
      type: 'supplementary',
      example: '危険な場所です。'
    },
    {
      japanese: '安全（あんぜん）',
      kana: 'あんぜん',
      vietnamese: 'an toàn',
      english: 'safe/safety',
      type: 'supplementary',
      example: '安全な方法です。'
    },
    {
      japanese: '注意（ちゅうい）',
      kana: 'ちゅうい',
      vietnamese: 'chú ý, cẩn thận',
      english: 'caution/attention',
      type: 'supplementary',
      example: '注意してください。'
    },
    {
      japanese: '警告（けいこく）',
      kana: 'けいこく',
      vietnamese: 'cảnh báo',
      english: 'warning',
      type: 'supplementary',
      example: '警告が出ました。'
    }
  ],
  grammar: [
    {
      pattern: '～たら',
      vietnamese: 'nếu..., khi...',
      english: 'if/when...',
      type: 'main',
      explanation: 'Biểu thị điều kiện hoặc thời gian. Dùng với động từ, tính từ, danh từ. Cấu trúc: động từ た-form + ら. たら có thể dùng cho điều kiện giả định, sự việc đã xảy ra, hoặc phát hiện bất ngờ.',
      examples: [
        {
          japanese: '春になったら、桜が咲きます。',
          vietnamese: 'Khi mùa xuân đến, hoa anh đào nở.',
          english: 'When spring comes, cherry blossoms bloom.',
          type: 'main'
        },
        {
          japanese: '時間があったら、映画を見に行きましょう。',
          vietnamese: 'Nếu có thời gian, hãy đi xem phim.',
          english: 'If we have time, let\'s go see a movie.',
          type: 'main'
        },
        {
          japanese: '家に帰ったら、すぐ寝ました。',
          vietnamese: 'Khi về nhà, tôi ngủ ngay.',
          english: 'When I got home, I went to bed immediately.',
          type: 'main'
        },
        {
          japanese: 'ドアを開けたら、猫がいました。',
          vietnamese: 'Khi mở cửa, có một con mèo.',
          english: 'When I opened the door, there was a cat.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～ば',
      vietnamese: 'nếu...',
      english: 'if...',
      type: 'main',
      explanation: 'Biểu thị điều kiện. Động từ: ます → ば (例: 行きます → 行けば), い-adj: い → ければ, な-adj/noun: だ → なら/であれば. Dùng cho điều kiện chung, khách quan.',
      examples: [
        {
          japanese: '安ければ、買います。',
          vietnamese: 'Nếu rẻ thì tôi sẽ mua.',
          english: 'If it\'s cheap, I\'ll buy it.',
          type: 'main'
        },
        {
          japanese: '頑張れば、成功します。',
          vietnamese: 'Nếu cố gắng thì sẽ thành công.',
          english: 'If you try hard, you will succeed.',
          type: 'main'
        },
        {
          japanese: '雨が降れば、行きません。',
          vietnamese: 'Nếu mưa thì tôi sẽ không đi.',
          english: 'If it rains, I won\'t go.',
          type: 'main'
        },
        {
          japanese: '静かであれば、勉強できます。',
          vietnamese: 'Nếu yên tĩnh thì có thể học.',
          english: 'If it\'s quiet, I can study.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～なら',
      vietnamese: 'nếu..., nếu là...',
      english: 'if... (as for...)',
      type: 'main',
      explanation: 'Biểu thị điều kiện dựa trên chủ đề hoặc tình huống. Dùng với danh từ, な-adj, động từ (普通形 + なら). なら nhấn mạnh chủ đề/tình huống làm điều kiện.',
      examples: [
        {
          japanese: '日本へ行くなら、京都がおすすめです。',
          vietnamese: 'Nếu đi Nhật thì tôi khuyên bạn nên đến Kyoto.',
          english: 'If you go to Japan, I recommend Kyoto.',
          type: 'main'
        },
        {
          japanese: '学生なら、割引があります。',
          vietnamese: 'Nếu là sinh viên thì có giảm giá.',
          english: 'If you\'re a student, there\'s a discount.',
          type: 'main'
        },
        {
          japanese: '暇なら、手伝ってください。',
          vietnamese: 'Nếu rảnh thì hãy giúp tôi.',
          english: 'If you\'re free, please help me.',
          type: 'main'
        },
        {
          japanese: '明日なら、会えます。',
          vietnamese: 'Nếu là ngày mai thì có thể gặp.',
          english: 'If it\'s tomorrow, I can meet.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～と',
      vietnamese: 'khi..., nếu... thì...',
      english: 'when/if... (natural consequence)',
      type: 'main',
      explanation: 'Biểu thị kết quả tự nhiên, chắc chắn xảy ra khi có điều kiện. Dùng cho quy luật tự nhiên, thói quen, hoặc phát hiện. Cấu trúc: 普通形 + と.',
      examples: [
        {
          japanese: '春になると、暖かくなります。',
          vietnamese: 'Khi mùa xuân đến thì trời ấm lên.',
          english: 'When spring comes, it gets warm.',
          type: 'main'
        },
        {
          japanese: 'このボタンを押すと、電気がつきます。',
          vietnamese: 'Khi nhấn nút này thì đèn sáng.',
          english: 'When you press this button, the light turns on.',
          type: 'main'
        },
        {
          japanese: '右に曲がると、銀行があります。',
          vietnamese: 'Khi rẽ phải thì có ngân hàng.',
          english: 'When you turn right, there\'s a bank.',
          type: 'main'
        },
        {
          japanese: '窓を開けると、涼しい風が入ってきます。',
          vietnamese: 'Khi mở cửa sổ thì gió mát thổi vào.',
          english: 'When you open the window, cool air comes in.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: 'もし～たら/ば',
      vietnamese: 'nếu... (nhấn mạnh giả định)',
      english: 'if... (emphasizing hypothesis)',
      type: 'main',
      explanation: 'もし kết hợp với たら hoặc ば để nhấn mạnh tính giả định của điều kiện. もし có thể bỏ nhưng làm câu rõ ràng hơn.',
      examples: [
        {
          japanese: 'もし時間があったら、遊びに来てください。',
          vietnamese: 'Nếu có thời gian thì hãy đến chơi.',
          english: 'If you have time, please come visit.',
          type: 'main'
        },
        {
          japanese: 'もし雨が降れば、中止します。',
          vietnamese: 'Nếu mưa thì sẽ hủy.',
          english: 'If it rains, we will cancel.',
          type: 'main'
        },
        {
          japanese: 'もし分からなかったら、聞いてください。',
          vietnamese: 'Nếu không hiểu thì hãy hỏi.',
          english: 'If you don\'t understand, please ask.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～ても',
      vietnamese: 'dù cho..., mặc dù...',
      english: 'even if/though...',
      type: 'main',
      explanation: 'Biểu thị sự tương phản: dù có điều kiện nhưng kết quả không đổi. Cấu trúc: động từ て-form + も.',
      examples: [
        {
          japanese: '雨が降っても、行きます。',
          vietnamese: 'Dù mưa tôi vẫn đi.',
          english: 'Even if it rains, I will go.',
          type: 'main'
        },
        {
          japanese: '高くても、買いたいです。',
          vietnamese: 'Dù đắt tôi vẫn muốn mua.',
          english: 'Even if it\'s expensive, I want to buy it.',
          type: 'main'
        },
        {
          japanese: '忙しくても、手伝います。',
          vietnamese: 'Dù bận tôi vẫn giúp.',
          english: 'Even if I\'m busy, I\'ll help.',
          type: 'main'
        },
        {
          japanese: '失敗しても、諦めません。',
          vietnamese: 'Dù thất bại tôi cũng không bỏ cuộc.',
          english: 'Even if I fail, I won\'t give up.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～場合は',
      vietnamese: 'trong trường hợp...',
      english: 'in case of...',
      type: 'additional',
      explanation: 'Biểu thị trường hợp cụ thể. Dùng trong ngữ cảnh trang trọng hơn. Cấu trúc: 普通形 + 場合は hoặc danh từ + の場合は.',
      examples: [
        {
          japanese: '雨の場合は中止です。',
          vietnamese: 'Trong trường hợp mưa thì hủy.',
          english: 'In case of rain, it will be canceled.',
          type: 'main'
        },
        {
          japanese: '分からない場合は、質問してください。',
          vietnamese: 'Trong trường hợp không hiểu, hãy hỏi.',
          english: 'In case you don\'t understand, please ask.',
          type: 'main'
        },
        {
          japanese: '緊急の場合は、この番号に電話してください。',
          vietnamese: 'Trong trường hợp khẩn cấp, hãy gọi số này.',
          english: 'In case of emergency, call this number.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '～かもしれない',
      vietnamese: 'có thể..., có lẽ...',
      english: 'might/may...',
      type: 'additional',
      explanation: 'Biểu thị khả năng không chắc chắn. Cấu trúc: 普通形 + かもしれない (lịch sự: かもしれません).',
      examples: [
        {
          japanese: '明日は雨かもしれません。',
          vietnamese: 'Ngày mai có thể mưa.',
          english: 'It might rain tomorrow.',
          type: 'main'
        },
        {
          japanese: '彼は来ないかもしれません。',
          vietnamese: 'Có lẽ anh ấy không đến.',
          english: 'He might not come.',
          type: 'main'
        },
        {
          japanese: '間違っているかもしれません。',
          vietnamese: 'Có thể sai.',
          english: 'It might be wrong.',
          type: 'additional'
        }
      ]
    }
  ]
};

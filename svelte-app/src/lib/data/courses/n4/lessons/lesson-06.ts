/**
 * N4 Core Lessons — Lesson 06: Conditionals
 * Focus: 〜たら、〜ば、〜と、〜なら conditional forms
 */

import type { LessonData } from '$lib/types';

export const LESSON_06_DATA: LessonData = {
  lessonNumber: 6,
  title: '条件形 (Các dạng điều kiện)',
  vocabulary: [
    // Verbs related to conditions and outcomes
    {
      japanese: '困る',
      kana: 'こまる',
      vietnamese: 'gặp khó khăn, rắc rối',
      english: 'to be troubled,困る',
      type: 'main',
      example: '雨が降ったら困ります。'
    },
    {
      japanese: '決める',
      kana: 'きめる',
      vietnamese: 'quyết định',
      english: 'to decide',
      type: 'main',
      example: '旅行先を決めます。'
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
      japanese: '急ぐ',
      kana: 'いそぐ',
      vietnamese: 'vội vàng',
      english: 'to hurry',
      type: 'main',
      example: '急げば間に合います。'
    },
    {
      japanese: '間に合う',
      kana: 'まにあう',
      vietnamese: 'kịp giờ',
      english: 'to be in time',
      type: 'main',
      example: '走れば間に合うでしょう。'
    },
    {
      japanese: '遅れる',
      kana: 'おくれる',
      vietnamese: 'trễ, chậm trễ',
      english: 'to be late',
      type: 'main',
      example: '電車が遅れたら連絡します。'
    },
    {
      japanese: '続く',
      kana: 'つづく',
      vietnamese: 'tiếp tục',
      english: 'to continue',
      type: 'main',
      example: '雨が続くと困ります。'
    },
    {
      japanese: '続ける',
      kana: 'つづける',
      vietnamese: 'tiếp tục làm',
      english: 'to continue doing',
      type: 'main',
      example: '勉強を続ければ上手になります。'
    },
    {
      japanese: '済む',
      kana: 'すむ',
      vietnamese: 'xong, hoàn thành',
      english: 'to finish, to be settled',
      type: 'main',
      example: '仕事が済んだら帰ります。'
    },
    {
      japanese: '慣れる',
      kana: 'なれる',
      vietnamese: 'quen thuộc',
      english: 'to get used to',
      type: 'main',
      example: '日本に来たら、すぐ慣れますよ。'
    },
    {
      japanese: '増える',
      kana: 'ふえる',
      vietnamese: 'tăng lên',
      english: 'to increase',
      type: 'main',
      example: '人口が増えると問題が起こります。'
    },
    {
      japanese: '減る',
      kana: 'へる',
      vietnamese: 'giảm đi',
      english: 'to decrease',
      type: 'main',
      example: '食べる量を減らせば痩せます。'
    },
    {
      japanese: '変わる',
      kana: 'かわる',
      vietnamese: 'thay đổi',
      english: 'to change',
      type: 'main',
      example: '季節が変わると天気も変わります。'
    },
    {
      japanese: '変える',
      kana: 'かえる',
      vietnamese: 'thay đổi (tác động)',
      english: 'to change something',
      type: 'main',
      example: '予定を変えたら教えてください。'
    },
    {
      japanese: '直す',
      kana: 'なおす',
      vietnamese: 'sửa chữa',
      english: 'to fix, to correct',
      type: 'main',
      example: '間違いがあれば直してください。'
    },
    {
      japanese: '直る',
      kana: 'なおる',
      vietnamese: 'được sửa',
      english: 'to be fixed',
      type: 'main',
      example: '暖かくなったら風邪が直ります。'
    },
    {
      japanese: '間違える',
      kana: 'まちがえる',
      vietnamese: 'làm sai',
      english: 'to make a mistake',
      type: 'main',
      example: '間違えたらやり直します。'
    },
    {
      japanese: '失敗する',
      kana: 'しっぱいする',
      vietnamese: 'thất bại',
      english: 'to fail',
      type: 'main',
      example: '失敗しても諦めないでください。'
    },
    {
      japanese: '成功する',
      kana: 'せいこうする',
      vietnamese: 'thành công',
      english: 'to succeed',
      type: 'main',
      example: '頑張れば成功します。'
    },
    {
      japanese: '諦める',
      kana: 'あきらめる',
      vietnamese: 'từ bỏ',
      english: 'to give up',
      type: 'main',
      example: '諦めなければ夢は叶います。'
    },
    // Nouns and adjectives
    {
      japanese: '条件',
      kana: 'じょうけん',
      vietnamese: 'điều kiện',
      english: 'condition',
      type: 'main',
      example: '条件が良ければ参加します。'
    },
    {
      japanese: '場合',
      kana: 'ばあい',
      vietnamese: 'trường hợp',
      english: 'case, situation',
      type: 'main',
      example: '雨の場合は中止します。'
    },
    {
      japanese: '結果',
      kana: 'けっか',
      vietnamese: 'kết quả',
      english: 'result',
      type: 'main',
      example: '結果が出たら連絡します。'
    },
    {
      japanese: '予定',
      kana: 'よてい',
      vietnamese: 'kế hoạch, lịch trình',
      english: 'schedule, plan',
      type: 'main',
      example: '予定が決まったら教えてください。'
    },
    {
      japanese: '予約',
      kana: 'よやく',
      vietnamese: 'đặt trước',
      english: 'reservation',
      type: 'main',
      example: '予約したらすぐ確認メールが来ます。'
    },
    {
      japanese: '連絡',
      kana: 'れんらく',
      vietnamese: 'liên lạc',
      english: 'contact',
      type: 'main',
      example: '到着したら連絡してください。'
    },
    {
      japanese: '相談',
      kana: 'そうだん',
      vietnamese: 'tham khảo ý kiến, thảo luận',
      english: 'consultation',
      type: 'main',
      example: '困ったら相談してください。'
    },
    {
      japanese: '準備',
      kana: 'じゅんび',
      vietnamese: 'chuẩn bị',
      english: 'preparation',
      type: 'main',
      example: '準備ができたら出発します。'
    },
    {
      japanese: '用意',
      kana: 'ようい',
      vietnamese: 'sự chuẩn bị sẵn sàng',
      english: 'preparation, arrangement',
      type: 'main',
      example: '用意が済んだら始めましょう。'
    },
    {
      japanese: '確認',
      kana: 'かくにん',
      vietnamese: 'xác nhận',
      english: 'confirmation',
      type: 'main',
      example: 'メールを確認したら返事をください。'
    },
    {
      japanese: '約束',
      kana: 'やくそく',
      vietnamese: 'lời hứa, hẹn',
      english: 'promise, appointment',
      type: 'main',
      example: '約束を破ったら信用されません。'
    },
    {
      japanese: '機会',
      kana: 'きかい',
      vietnamese: 'cơ hội',
      english: 'opportunity',
      type: 'main',
      example: '機会があれば日本に行きたいです。'
    },
    {
      japanese: '可能',
      kana: 'かのう',
      vietnamese: 'có thể',
      english: 'possible',
      type: 'main',
      example: '可能なら手伝ってください。'
    },
    {
      japanese: '不可能',
      kana: 'ふかのう',
      vietnamese: 'không thể',
      english: 'impossible',
      type: 'main',
      example: '今日中は不可能です。'
    },
    {
      japanese: '必要',
      kana: 'ひつよう',
      vietnamese: 'cần thiết',
      english: 'necessary',
      type: 'main',
      example: '必要なら買っておきます。'
    },
    {
      japanese: '十分',
      kana: 'じゅうぶん',
      vietnamese: 'đủ',
      english: 'enough, sufficient',
      type: 'main',
      example: '時間が十分あれば完成します。'
    },
    {
      japanese: '不十分',
      kana: 'ふじゅうぶん',
      vietnamese: 'không đủ',
      english: 'insufficient',
      type: 'main',
      example: '準備が不十分だと失敗します。'
    },
    {
      japanese: '無理',
      kana: 'むり',
      vietnamese: 'không thể, quá sức',
      english: 'impossible, unreasonable',
      type: 'main',
      example: '無理なら断ってもいいですよ。'
    },
    {
      japanese: '都合',
      kana: 'つごう',
      vietnamese: 'sự thuận tiện',
      english: 'convenience, circumstances',
      type: 'main',
      example: '都合が悪ければ別の日にしましょう。'
    },
    {
      japanese: '便利',
      kana: 'べんり',
      vietnamese: 'tiện lợi',
      english: 'convenient',
      type: 'main',
      example: 'スマホがあれば便利です。'
    },
    // Additional expressions
    {
      japanese: 'もし',
      kana: 'もし',
      vietnamese: 'nếu, giả sử',
      english: 'if (hypothetical)',
      type: 'additional',
      example: 'もし暇なら遊びに来てください。'
    },
    {
      japanese: 'もしも',
      kana: 'もしも',
      vietnamese: 'nếu như (nhấn mạnh)',
      english: 'if (emphatic)',
      type: 'additional',
      example: 'もしもの時は連絡してください。'
    },
    {
      japanese: '万が一',
      kana: 'まんがいち',
      vietnamese: 'vạn một, trong trường hợp hiếm',
      english: 'by any chance, just in case',
      type: 'additional',
      example: '万が一遅れたら電話します。'
    },
    {
      japanese: 'いつでも',
      kana: 'いつでも',
      vietnamese: 'bất cứ khi nào',
      english: 'anytime',
      type: 'additional',
      example: '困ったらいつでも連絡してください。'
    },
    {
      japanese: '必ず',
      kana: 'かならず',
      vietnamese: 'nhất định',
      english: 'without fail, certainly',
      type: 'additional',
      example: '帰ったら必ず電話します。'
    },
    {
      japanese: 'きっと',
      kana: 'きっと',
      vietnamese: 'chắc chắn',
      english: 'surely, certainly',
      type: 'additional',
      example: '頑張ればきっと成功します。'
    },
    {
      japanese: '多分',
      kana: 'たぶん',
      vietnamese: 'có lẽ',
      english: 'probably',
      type: 'additional',
      example: '天気が良ければ多分行きます。'
    },
    {
      japanese: 'もちろん',
      kana: 'もちろん',
      vietnamese: 'dĩ nhiên',
      english: 'of course',
      type: 'additional',
      example: 'もちろん手伝いますよ。'
    },
    {
      japanese: 'とにかく',
      kana: 'とにかく',
      vietnamese: 'dù sao đi nữa',
      english: 'anyway, in any case',
      type: 'additional',
      example: 'とにかくやってみましょう。'
    },
    {
      japanese: 'それで',
      kana: 'それで',
      vietnamese: 'vì vậy, rồi sao',
      english: 'and then, so',
      type: 'additional',
      example: 'それで、どうしますか。'
    },
    {
      japanese: 'それなら',
      kana: 'それなら',
      vietnamese: 'nếu thế thì',
      english: 'if that is the case',
      type: 'additional',
      example: 'それなら私が行きます。'
    },
    {
      japanese: 'そうすると',
      kana: 'そうすると',
      vietnamese: 'nếu làm như vậy',
      english: 'if you do so',
      type: 'additional',
      example: 'そうすると、うまくいきます。'
    },
    // Supplementary vocabulary
    {
      japanese: '晴れる',
      kana: 'はれる',
      vietnamese: 'nắng, quang đãng',
      english: 'to clear up (weather)',
      type: 'supplementary',
      example: '明日晴れたらピクニックに行きます。'
    },
    {
      japanese: '曇る',
      kana: 'くもる',
      vietnamese: 'nhiều mây',
      english: 'to be cloudy',
      type: 'supplementary',
      example: '曇っても出かけます。'
    },
    {
      japanese: '寒い',
      kana: 'さむい',
      vietnamese: 'lạnh',
      english: 'cold',
      type: 'supplementary',
      example: '寒かったら暖房をつけてください。'
    },
    {
      japanese: '暖かい',
      kana: 'あたたかい',
      vietnamese: 'ấm áp',
      english: 'warm',
      type: 'supplementary',
      example: '暖かくなったら花見に行きましょう。'
    },
    {
      japanese: '涼しい',
      kana: 'すずしい',
      vietnamese: 'mát mẻ',
      english: 'cool',
      type: 'supplementary',
      example: '涼しければ散歩しましょう。'
    },
    {
      japanese: '暑い',
      kana: 'あつい',
      vietnamese: 'nóng',
      english: 'hot',
      type: 'supplementary',
      example: '暑かったらエアコンをつけます。'
    },
    {
      japanese: '忙しい',
      kana: 'いそがしい',
      vietnamese: 'bận rộn',
      english: 'busy',
      type: 'supplementary',
      example: '忙しくなければ手伝ってください。'
    },
    {
      japanese: '暇',
      kana: 'ひま',
      vietnamese: 'rảnh rỗi',
      english: 'free time',
      type: 'supplementary',
      example: '暇なら映画を見ませんか。'
    }
  ],
  grammar: [
    {
      pattern: '〜たら',
      vietnamese: 'nếu/khi ~',
      english: 'if/when ~',
      type: 'main',
      explanation: 'Dạng điều kiện phổ biến nhất, dùng cho cả điều kiện giả định và thời điểm cụ thể. Cấu tạo: động từ た形 + ら, い形容詞かった + ら, な形容詞/danh từ + だったら. Thường dùng khi hành động sau xảy ra sau khi điều kiện được thỏa mãn.',
      examples: [
        {
          japanese: '雨が降ったら、行きません。',
          vietnamese: 'Nếu trời mưa thì tôi sẽ không đi.',
          english: 'If it rains, I won\'t go.',
          type: 'main'
        },
        {
          japanese: '春になったら、桜が咲きます。',
          vietnamese: 'Khi đến mùa xuân thì hoa anh đào nở.',
          english: 'When spring comes, cherry blossoms bloom.',
          type: 'main'
        },
        {
          japanese: '駅に着いたら、電話してください。',
          vietnamese: 'Khi đến ga thì gọi điện cho tôi nhé.',
          english: 'When you arrive at the station, please call me.',
          type: 'main'
        },
        {
          japanese: '安かったら買います。',
          vietnamese: 'Nếu rẻ thì tôi sẽ mua.',
          english: 'If it\'s cheap, I\'ll buy it.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '〜ば',
      vietnamese: 'nếu ~ (điều kiện chung)',
      english: 'if ~ (general condition)',
      type: 'main',
      explanation: 'Dạng điều kiện mang tính chung chung, thường dùng cho điều kiện luôn đúng hoặc quy luật tự nhiên. Cấu tạo: động từ ば形 (ます→ば), い形容詞ければ, な形容詞/danh từ + ならば/なら. Không dùng cho lời khuyên, yêu cầu, ý chí ở vế sau.',
      examples: [
        {
          japanese: '春が来れば、暖かくなります。',
          vietnamese: 'Nếu mùa xuân đến thì sẽ ấm áp.',
          english: 'If spring comes, it becomes warm.',
          type: 'main'
        },
        {
          japanese: '勉強すれば、わかります。',
          vietnamese: 'Nếu học thì sẽ hiểu.',
          english: 'If you study, you\'ll understand.',
          type: 'main'
        },
        {
          japanese: '急げば間に合います。',
          vietnamese: 'Nếu vội thì sẽ kịp.',
          english: 'If you hurry, you\'ll make it in time.',
          type: 'main'
        },
        {
          japanese: '安ければ買います。',
          vietnamese: 'Nếu rẻ thì sẽ mua.',
          english: 'If it\'s cheap, I\'ll buy it.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '〜と',
      vietnamese: '~ thì (kết quả tự nhiên)',
      english: '~ (natural consequence)',
      type: 'main',
      explanation: 'Biểu thị mối quan hệ nhân quả tự nhiên, quy luật khách quan hoặc thói quen. Cấu tạo: động từ る形 + と, い形容詞 + と, な形容詞/danh từ + だと. Vế sau không thể là ý chí, mệnh lệnh, yêu cầu.',
      examples: [
        {
          japanese: '春になると、花が咲きます。',
          vietnamese: 'Khi đến mùa xuân thì hoa nở.',
          english: 'When spring comes, flowers bloom.',
          type: 'main'
        },
        {
          japanese: 'このボタンを押すと、電気がつきます。',
          vietnamese: 'Khi nhấn nút này thì đèn sáng.',
          english: 'When you press this button, the light turns on.',
          type: 'main'
        },
        {
          japanese: '右に曲がると、郵便局があります。',
          vietnamese: 'Khi rẽ phải thì có bưu điện.',
          english: 'When you turn right, there\'s a post office.',
          type: 'main'
        },
        {
          japanese: '暑いと、アイスが食べたくなります。',
          vietnamese: 'Khi nóng thì muốn ăn kem.',
          english: 'When it\'s hot, I feel like eating ice cream.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '〜なら',
      vietnamese: 'nếu ~ (giả định chủ quan)',
      english: 'if ~ (subjective supposition)',
      type: 'main',
      explanation: 'Dùng khi người nói đưa ra giả định dựa trên thông tin từ người khác hoặc tình huống đã biết. Thường dùng để đưa ra lời khuyên, gợi ý. Cấu tạo: động từ る形/た形 + なら, い形容詞 + なら, な形容詞/danh từ + なら.',
      examples: [
        {
          japanese: '日本へ行くなら、京都がいいですよ。',
          vietnamese: 'Nếu đi Nhật thì Kyoto hay đấy.',
          english: 'If you go to Japan, Kyoto is good.',
          type: 'main'
        },
        {
          japanese: '暇なら、手伝ってください。',
          vietnamese: 'Nếu rảnh thì giúp tôi nhé.',
          english: 'If you\'re free, please help me.',
          type: 'main'
        },
        {
          japanese: '明日なら大丈夫です。',
          vietnamese: 'Nếu là ngày mai thì được.',
          english: 'If it\'s tomorrow, it\'s fine.',
          type: 'main'
        },
        {
          japanese: '彼なら知っていると思います。',
          vietnamese: 'Nếu là anh ấy thì tôi nghĩ anh ấy biết.',
          english: 'If it\'s him, I think he knows.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: 'もし〜たら/ば',
      vietnamese: 'nếu (giả sử) ~',
      english: 'if (supposing) ~',
      type: 'additional',
      explanation: 'Thêm "もし" vào đầu câu để nhấn mạnh tính giả định của điều kiện. Thường dùng với 〜たら hoặc 〜ば.',
      examples: [
        {
          japanese: 'もし時間があったら、映画を見ませんか。',
          vietnamese: 'Nếu có thời gian thì xem phim không?',
          english: 'If you have time, shall we watch a movie?',
          type: 'main'
        },
        {
          japanese: 'もし100万円あれば、何を買いますか。',
          vietnamese: 'Nếu có 1 triệu yên thì bạn sẽ mua gì?',
          english: 'If you had 1 million yen, what would you buy?',
          type: 'main'
        }
      ]
    },
    {
      pattern: '〜ても/でも',
      vietnamese: 'dù ~ đi nữa',
      english: 'even if ~',
      type: 'additional',
      explanation: 'Biểu thị điều kiện nhượng bộ. Cấu tạo: động từ て形 + も, い形容詞くて + も, な形容詞/danh từ + でも.',
      examples: [
        {
          japanese: '雨が降っても行きます。',
          vietnamese: 'Dù trời mưa tôi vẫn đi.',
          english: 'Even if it rains, I\'ll go.',
          type: 'main'
        },
        {
          japanese: '高くても買います。',
          vietnamese: 'Dù đắt tôi vẫn mua.',
          english: 'Even if it\'s expensive, I\'ll buy it.',
          type: 'main'
        },
        {
          japanese: '忙しくても手伝ってください。',
          vietnamese: 'Dù bận vẫn giúp tôi nhé.',
          english: 'Even if you\'re busy, please help me.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '〜なければならない',
      vietnamese: 'phải ~',
      english: 'must ~',
      type: 'additional',
      explanation: 'Biểu thị nghĩa vụ, sự bắt buộc. Có thể rút gọn thành 〜なきゃ trong lời nói thân mật.',
      examples: [
        {
          japanese: '宿題をしなければなりません。',
          vietnamese: 'Tôi phải làm bài tập về nhà.',
          english: 'I must do my homework.',
          type: 'main'
        },
        {
          japanese: '早く起きなければなりません。',
          vietnamese: 'Tôi phải dậy sớm.',
          english: 'I must wake up early.',
          type: 'main'
        }
      ]
    }
  ]
};

/**
 * N4 Core Lessons — Lesson 14: Comparisons and Degree
 * Comparative expressions and degree
 */

import type { LessonData } from '$lib/types';

export const LESSON_14_DATA: LessonData = {
  lessonNumber: 14,
  title: '比較表現 (So sánh và mức độ)',
  vocabulary: [
    // Comparison words
    {
      japanese: 'より',
      kana: 'より',
      vietnamese: 'hơn',
      english: 'than, more than',
      type: 'main',
      example: '東京は大阪より大きいです。'
    },
    {
      japanese: 'ほど',
      kana: 'ほど',
      vietnamese: 'bằng (phủ định)',
      english: 'as ~ as (negative)',
      type: 'main',
      example: '東京ほど大きくないです。'
    },
    {
      japanese: 'ぐらい / くらい',
      kana: 'ぐらい / くらい',
      vietnamese: 'khoảng, độ',
      english: 'about, approximately',
      type: 'main',
      example: '1時間ぐらいかかります。'
    },
    {
      japanese: '一番',
      kana: 'いちばん',
      vietnamese: 'nhất',
      english: 'most, best, number one',
      type: 'main',
      example: '日本で一番高い山は富士山です。'
    },
    {
      japanese: '最も',
      kana: 'もっとも',
      vietnamese: 'nhất',
      english: 'most, extremely',
      type: 'main',
      example: '最も重要なことです。'
    },

    // Degree and extent
    {
      japanese: 'とても',
      kana: 'とても',
      vietnamese: 'rất',
      english: 'very',
      type: 'main',
      example: 'とても美味しいです。'
    },
    {
      japanese: 'すごく',
      kana: 'すごく',
      vietnamese: 'rất, cực kỳ',
      english: 'very, extremely',
      type: 'main',
      example: 'すごく面白いです。'
    },
    {
      japanese: '非常に',
      kana: 'ひじょうに',
      vietnamese: 'cực kỳ',
      english: 'extremely, very',
      type: 'main',
      example: '非常に難しいです。'
    },
    {
      japanese: '大変',
      kana: 'たいへん',
      vietnamese: 'rất, vất vả',
      english: 'very, tough',
      type: 'main',
      example: '大変忙しいです。'
    },
    {
      japanese: 'かなり',
      kana: 'かなり',
      vietnamese: 'khá',
      english: 'considerably, fairly',
      type: 'main',
      example: 'かなり難しいです。'
    },
    {
      japanese: 'だいぶ',
      kana: 'だいぶ',
      vietnamese: 'khá, đáng kể',
      english: 'considerably, quite',
      type: 'main',
      example: 'だいぶ涼しくなりました。'
    },
    {
      japanese: 'ずっと',
      kana: 'ずっと',
      vietnamese: 'hơn nhiều',
      english: 'much more, far more',
      type: 'main',
      example: 'ずっと大きいです。'
    },
    {
      japanese: 'もっと',
      kana: 'もっと',
      vietnamese: 'hơn nữa',
      english: 'more',
      type: 'main',
      example: 'もっと勉強します。'
    },
    {
      japanese: 'あまり',
      kana: 'あまり',
      vietnamese: 'không... lắm',
      english: 'not very (with negative)',
      type: 'main',
      example: 'あまり好きじゃないです。'
    },
    {
      japanese: 'それほど',
      kana: 'それほど',
      vietnamese: 'không đến mức đó',
      english: 'not so much (with negative)',
      type: 'main',
      example: 'それほど高くないです。'
    },

    // Similarity and difference
    {
      japanese: '同じ',
      kana: 'おなじ',
      vietnamese: 'giống nhau',
      english: 'same',
      type: 'main',
      example: '同じ学校です。'
    },
    {
      japanese: '違う',
      kana: 'ちがう',
      vietnamese: 'khác',
      english: 'different',
      type: 'main',
      example: '日本とベトナムは違います。'
    },
    {
      japanese: '違い',
      kana: 'ちがい',
      vietnamese: 'sự khác biệt',
      english: 'difference',
      type: 'main',
      example: '違いは何ですか。'
    },
    {
      japanese: '差',
      kana: 'さ',
      vietnamese: 'sự chênh lệch',
      english: 'difference, gap',
      type: 'main',
      example: '価格の差があります。'
    },
    {
      japanese: '似ている',
      kana: 'にている',
      vietnamese: 'giống nhau',
      english: 'similar, alike',
      type: 'main',
      example: '二人は似ています。'
    },

    // Size and dimensions
    {
      japanese: '大きい',
      kana: 'おおきい',
      vietnamese: 'to, lớn',
      english: 'big, large',
      type: 'main',
      example: '東京は大きい都市です。'
    },
    {
      japanese: '小さい',
      kana: 'ちいさい',
      vietnamese: 'nhỏ',
      english: 'small, little',
      type: 'main',
      example: '小さい部屋です。'
    },
    {
      japanese: '高い',
      kana: 'たかい',
      vietnamese: 'cao, đắt',
      english: 'high, tall, expensive',
      type: 'main',
      example: '富士山は高いです。'
    },
    {
      japanese: '低い',
      kana: 'ひくい',
      vietnamese: 'thấp',
      english: 'low, short',
      type: 'main',
      example: '声が低いです。'
    },
    {
      japanese: '広い',
      kana: 'ひろい',
      vietnamese: 'rộng',
      english: 'wide, spacious',
      type: 'main',
      example: '広い部屋です。'
    },
    {
      japanese: '狭い',
      kana: 'せまい',
      vietnamese: 'hẹp',
      english: 'narrow, small',
      type: 'main',
      example: '狭い道です。'
    },
    {
      japanese: '長い',
      kana: 'ながい',
      vietnamese: 'dài',
      english: 'long',
      type: 'main',
      example: '長い髪です。'
    },
    {
      japanese: '短い',
      kana: 'みじかい',
      vietnamese: 'ngắn',
      english: 'short',
      type: 'main',
      example: '短い時間です。'
    },
    {
      japanese: '太い',
      kana: 'ふとい',
      vietnamese: 'to, béo',
      english: 'thick, fat',
      type: 'main',
      example: '太い木です。'
    },
    {
      japanese: '細い',
      kana: 'ほそい',
      vietnamese: 'mỏng, gầy',
      english: 'thin, slender',
      type: 'main',
      example: '細い道です。'
    },

    // Quantity and amount
    {
      japanese: '多い',
      kana: 'おおい',
      vietnamese: 'nhiều',
      english: 'many, much',
      type: 'main',
      example: '人が多いです。'
    },
    {
      japanese: '少ない',
      kana: 'すくない',
      vietnamese: 'ít',
      english: 'few, little',
      type: 'main',
      example: '時間が少ないです。'
    },
    {
      japanese: 'たくさん',
      kana: 'たくさん',
      vietnamese: 'nhiều',
      english: 'many, a lot',
      type: 'main',
      example: 'たくさん食べました。'
    },
    {
      japanese: '少し',
      kana: 'すこし',
      vietnamese: 'một ít',
      english: 'a little',
      type: 'main',
      example: '少し待ってください。'
    },
    {
      japanese: 'ちょっと',
      kana: 'ちょっと',
      vietnamese: 'một chút',
      english: 'a little bit',
      type: 'main',
      example: 'ちょっと疲れました。'
    },

    // Speed and time
    {
      japanese: '速い',
      kana: 'はやい',
      vietnamese: 'nhanh',
      english: 'fast, quick',
      type: 'main',
      example: '新幹線は速いです。'
    },
    {
      japanese: '早い',
      kana: 'はやい',
      vietnamese: 'sớm',
      english: 'early',
      type: 'main',
      example: '朝早く起きます。'
    },
    {
      japanese: '遅い',
      kana: 'おそい',
      vietnamese: 'chậm, muộn',
      english: 'slow, late',
      type: 'main',
      example: '遅くなりました。'
    },

    // Quality and condition
    {
      japanese: 'いい / 良い',
      kana: 'いい / よい',
      vietnamese: 'tốt',
      english: 'good',
      type: 'main',
      example: 'いい天気です。'
    },
    {
      japanese: '悪い',
      kana: 'わるい',
      vietnamese: 'xấu',
      english: 'bad',
      type: 'main',
      example: '天気が悪いです。'
    },
    {
      japanese: '新しい',
      kana: 'あたらしい',
      vietnamese: 'mới',
      english: 'new',
      type: 'main',
      example: '新しい車です。'
    },
    {
      japanese: '古い',
      kana: 'ふるい',
      vietnamese: 'cũ',
      english: 'old',
      type: 'main',
      example: '古い建物です。'
    },
    {
      japanese: '若い',
      kana: 'わかい',
      vietnamese: 'trẻ',
      english: 'young',
      type: 'main',
      example: 'まだ若いです。'
    },

    // Additional vocabulary
    {
      japanese: '比べる',
      kana: 'くらべる',
      vietnamese: 'so sánh',
      english: 'to compare',
      type: 'additional',
      example: '日本とベトナムを比べます。'
    },
    {
      japanese: '比較',
      kana: 'ひかく',
      vietnamese: 'so sánh',
      english: 'comparison',
      type: 'additional',
      example: '比較してみましょう。'
    },
    {
      japanese: '以上',
      kana: 'いじょう',
      vietnamese: 'trên, hơn (bằng hoặc hơn)',
      english: 'more than, over',
      type: 'additional',
      example: '18歳以上です。'
    },
    {
      japanese: '以下',
      kana: 'いか',
      vietnamese: 'dưới (bằng hoặc dưới)',
      english: 'less than, under',
      type: 'additional',
      example: '18歳以下です。'
    },
    {
      japanese: '以内',
      kana: 'いない',
      vietnamese: 'trong vòng',
      english: 'within',
      type: 'additional',
      example: '1時間以内に終わります。'
    },
    {
      japanese: '程度',
      kana: 'ていど',
      vietnamese: 'mức độ',
      english: 'degree, extent',
      type: 'additional',
      example: 'どの程度分かりますか。'
    },
    {
      japanese: 'レベル',
      kana: 'レベル',
      vietnamese: 'trình độ',
      english: 'level',
      type: 'additional',
      example: '日本語のレベルは？'
    },
    {
      japanese: '平均',
      kana: 'へいきん',
      vietnamese: 'trung bình',
      english: 'average',
      type: 'additional',
      example: '平均より高いです。'
    },
    {
      japanese: '普通',
      kana: 'ふつう',
      vietnamese: 'bình thường',
      english: 'normal, ordinary',
      type: 'additional',
      example: '普通のサイズです。'
    },
    {
      japanese: '特別',
      kana: 'とくべつ',
      vietnamese: 'đặc biệt',
      english: 'special',
      type: 'additional',
      example: '特別な日です。'
    },
    {
      japanese: '例外',
      kana: 'れいがい',
      vietnamese: 'ngoại lệ',
      english: 'exception',
      type: 'additional',
      example: '例外はありません。'
    },
    {
      japanese: '標準',
      kana: 'ひょうじゅん',
      vietnamese: 'tiêu chuẩn',
      english: 'standard',
      type: 'additional',
      example: '標準的なサイズです。'
    },

    // Supplementary
    {
      japanese: '優れる',
      kana: 'すぐれる',
      vietnamese: 'xuất sắc',
      english: 'to excel, to be superior',
      type: 'supplementary',
      example: '優れた技術です。'
    },
    {
      japanese: '劣る',
      kana: 'おとる',
      vietnamese: 'kém hơn',
      english: 'to be inferior',
      type: 'supplementary',
      example: '品質が劣ります。'
    },
    {
      japanese: '上回る',
      kana: 'うわまわる',
      vietnamese: 'vượt qua',
      english: 'to exceed, to surpass',
      type: 'supplementary',
      example: '予想を上回りました。'
    },
    {
      japanese: '下回る',
      kana: 'したまわる',
      vietnamese: 'dưới mức',
      english: 'to fall below',
      type: 'supplementary',
      example: '基準を下回ります。'
    },
    {
      japanese: '匹敵',
      kana: 'ひってき',
      vietnamese: 'sánh bằng',
      english: 'to rival, to match',
      type: 'supplementary',
      example: '彼に匹敵する人はいません。'
    }
  ],
  grammar: [
    {
      pattern: 'AはBより〜',
      vietnamese: 'A ~ hơn B',
      english: 'A is more ~ than B',
      type: 'main',
      explanation: 'Dùng để so sánh hai đối tượng. A có tính chất hơn B.',
      examples: [
        {
          japanese: '東京は大阪より大きいです。',
          vietnamese: 'Tokyo lớn hơn Osaka.',
          english: 'Tokyo is bigger than Osaka.',
          type: 'main'
        },
        {
          japanese: '夏は冬より暑いです。',
          vietnamese: 'Mùa hè nóng hơn mùa đông.',
          english: 'Summer is hotter than winter.',
          type: 'main'
        },
        {
          japanese: '新幹線は車より速いです。',
          vietnamese: 'Tàu cao tốc nhanh hơn ô tô.',
          english: 'Shinkansen is faster than cars.',
          type: 'main'
        }
      ]
    },
    {
      pattern: 'AはBほど〜ない',
      vietnamese: 'A không ~ bằng B',
      english: 'A is not as ~ as B',
      type: 'main',
      explanation: 'So sánh phủ định. A không có tính chất bằng B.',
      examples: [
        {
          japanese: '大阪は東京ほど大きくないです。',
          vietnamese: 'Osaka không lớn bằng Tokyo.',
          english: 'Osaka is not as big as Tokyo.',
          type: 'main'
        },
        {
          japanese: '今日は昨日ほど暑くないです。',
          vietnamese: 'Hôm nay không nóng bằng hôm qua.',
          english: 'Today is not as hot as yesterday.',
          type: 'main'
        },
        {
          japanese: '車は新幹線ほど速くないです。',
          vietnamese: 'Ô tô không nhanh bằng tàu cao tốc.',
          english: 'Cars are not as fast as Shinkansen.',
          type: 'main'
        }
      ]
    },
    {
      pattern: '〜で一番〜',
      vietnamese: '~ nhất trong ~',
      english: 'the most ~ in/of ~',
      type: 'main',
      explanation: 'So sánh tuyệt đối. Chỉ đối tượng có tính chất nhất trong một phạm vi.',
      examples: [
        {
          japanese: '日本で一番高い山は富士山です。',
          vietnamese: 'Núi cao nhất ở Nhật là núi Phú Sĩ.',
          english: 'The highest mountain in Japan is Mt. Fuji.',
          type: 'main'
        },
        {
          japanese: 'クラスで一番背が高いです。',
          vietnamese: 'Cao nhất trong lớp.',
          english: 'The tallest in the class.',
          type: 'main'
        },
        {
          japanese: '一年で一番暑い月は8月です。',
          vietnamese: 'Tháng nóng nhất trong năm là tháng 8.',
          english: 'The hottest month of the year is August.',
          type: 'main'
        }
      ]
    },
    {
      pattern: 'AとBと、どちらが〜ですか',
      vietnamese: 'A và B, cái nào ~?',
      english: 'Which is more ~, A or B?',
      type: 'main',
      explanation: 'Câu hỏi so sánh giữa hai đối tượng.',
      examples: [
        {
          japanese: '日本語と英語と、どちらが難しいですか。',
          vietnamese: 'Tiếng Nhật và tiếng Anh, cái nào khó hơn?',
          english: 'Which is more difficult, Japanese or English?',
          type: 'main'
        },
        {
          japanese: 'コーヒーと紅茶と、どちらが好きですか。',
          vietnamese: 'Cà phê và trà, bạn thích cái nào hơn?',
          english: 'Which do you like better, coffee or tea?',
          type: 'main'
        },
        {
          japanese: '東京と大阪と、どちらが大きいですか。',
          vietnamese: 'Tokyo và Osaka, cái nào lớn hơn?',
          english: 'Which is bigger, Tokyo or Osaka?',
          type: 'main'
        }
      ]
    },
    {
      pattern: '〜の中で〜が一番〜',
      vietnamese: 'trong ~ thì ~ nhất',
      english: 'among ~, ~ is the most ~',
      type: 'main',
      explanation: 'So sánh tuyệt đối trong một nhóm.',
      examples: [
        {
          japanese: 'スポーツの中でサッカーが一番好きです。',
          vietnamese: 'Trong các môn thể thao, tôi thích bóng đá nhất.',
          english: 'Among sports, I like soccer the best.',
          type: 'main'
        },
        {
          japanese: '家族の中で誰が一番背が高いですか。',
          vietnamese: 'Trong gia đình, ai cao nhất?',
          english: 'Who is the tallest in your family?',
          type: 'main'
        },
        {
          japanese: '季節の中で春が一番好きです。',
          vietnamese: 'Trong các mùa, tôi thích mùa xuân nhất.',
          english: 'Among seasons, I like spring the best.',
          type: 'main'
        }
      ]
    },
    {
      pattern: '〜と同じ〜',
      vietnamese: 'giống ~ với ~',
      english: 'the same ~ as ~',
      type: 'additional',
      explanation: 'Diễn tả hai đối tượng giống nhau.',
      examples: [
        {
          japanese: '私の車は田中さんと同じです。',
          vietnamese: 'Xe của tôi giống xe của anh Tanaka.',
          english: 'My car is the same as Tanaka\'s.',
          type: 'main'
        },
        {
          japanese: 'あなたと同じ意見です。',
          vietnamese: 'Ý kiến giống bạn.',
          english: 'I have the same opinion as you.',
          type: 'main'
        },
        {
          japanese: '彼女と同じ学校に通っています。',
          vietnamese: 'Tôi học cùng trường với cô ấy.',
          english: 'I go to the same school as her.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: 'ずっと〜',
      vietnamese: 'hơn nhiều',
      english: 'much more ~, far more ~',
      type: 'additional',
      explanation: 'Nhấn mạnh mức độ chênh lệch lớn trong so sánh.',
      examples: [
        {
          japanese: '今日は昨日よりずっと暑いです。',
          vietnamese: 'Hôm nay nóng hơn hôm qua nhiều.',
          english: 'Today is much hotter than yesterday.',
          type: 'main'
        },
        {
          japanese: '東京は私の町よりずっと大きいです。',
          vietnamese: 'Tokyo lớn hơn thị trấn của tôi nhiều.',
          english: 'Tokyo is much bigger than my town.',
          type: 'main'
        },
        {
          japanese: '新幹線は車よりずっと速いです。',
          vietnamese: 'Tàu cao tốc nhanh hơn ô tô nhiều.',
          english: 'Shinkansen is much faster than cars.',
          type: 'additional'
        }
      ]
    },
    {
      pattern: '〜ぐらい/くらい',
      vietnamese: 'khoảng ~, độ ~',
      english: 'about ~, approximately ~',
      type: 'additional',
      explanation: 'Diễn tả số lượng, thời gian gần đúng hoặc mức độ.',
      examples: [
        {
          japanese: '1時間ぐらいかかります。',
          vietnamese: 'Mất khoảng 1 tiếng.',
          english: 'It takes about an hour.',
          type: 'main'
        },
        {
          japanese: '10人ぐらい来ました。',
          vietnamese: 'Khoảng 10 người đã đến.',
          english: 'About 10 people came.',
          type: 'main'
        },
        {
          japanese: 'これくらいの大きさです。',
          vietnamese: 'Kích thước khoảng thế này.',
          english: 'It\'s about this size.',
          type: 'additional'
        }
      ]
    }
  ]
};

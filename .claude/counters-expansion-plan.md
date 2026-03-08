# Plan: Mở rộng hệ thống đếm số & Trợ số từ (Counters)

## 📋 Tổng quan

**Mục tiêu:** Bổ sung đầy đủ hệ thống số lớn (trăm nghìn → tỷ) và các trợ số từ còn thiếu trong Minna no Nihongo.

**File cần cập nhật:** `src/js/data/minna/counters.js`

## 🔍 Khảo sát hiện trạng

### ✅ Đã có (NUMBERS_DATA)
```javascript
// 0-10: ✅ Đầy đủ
// 11, 20: ✅ Có
// 100, 300, 600, 800: ✅ Có (bao gồm bất quy tắc)
// 1,000, 3,000, 8,000: ✅ Có (bao gồm bất quy tắc)
// 10,000 (万): ✅ Có
```

### ❌ Thiếu (NUMBERS_DATA)
```javascript
// Hàng chục nghìn: 20,000-90,000
// Hàng trăm nghìn: 100,000-900,000
// Hàng triệu: 1,000,000-9,000,000
// Hàng chục triệu: 10,000,000-90,000,000
// Hàng trăm triệu/tỷ: 100,000,000 (億)
```

### ✅ Đã có (COUNTERS_DATA) - 14 items
1. **個 (こ)** - Vật nhỏ ✅
2. **枚 (まい)** - Vật phẳng ✅
3. **本 (ほん)** - Vật dài hình trụ ✅
4. **冊 (さつ)** - Sách ✅
5. **台 (だい)** - Máy móc, xe ✅
6. **杯 (はい)** - Cốc, ly ✅
7. **匹 (ひき)** - Thú nhỏ ✅
8. **頭 (とう)** - Thú lớn ✅
9. **羽 (わ)** - Chim ✅
10. **人 (にん)** - Người ✅
11. **歳 (さい)** - Tuổi ✅
12. **階 (かい)** - Tầng ✅
13. **時 (じ)** - Giờ ✅
14. **分 (ふん)** - Phút ✅
15. **月 (がつ)** - Tháng ✅
16. **日 (にち)** - Ngày ✅
17. **番 (ばん)** - Số thứ tự ✅

### ❌ Thiếu (COUNTERS_DATA) - Cần thêm

#### Priority 1 - Essential (Minna no Nihongo có)
1. **回 (かい)** - Lần (Lesson 13)
2. **度 (ど)** - Lần, độ (nhiệt độ)
3. **泊 (はく)** - Đêm (ở khách sạn) (Lesson 16)
4. **つ** - Counter chung (1-10, dùng với vật không đặc thù)
5. **ヶ月 (かげつ)** - Tháng (thời lượng) (Lesson 18)
6. **週間 (しゅうかん)** - Tuần (thời lượng)
7. **年間 (ねんかん)** - Năm (thời lượng)

#### Priority 2 - Common (Thường gặp)
8. **軒 (けん)** - Nhà, cửa hàng
9. **足 (そく)** - Đôi (giày, tất)
10. **組 (くみ)** - Bộ, tập hợp
11. **着 (ちゃく)** - Bộ quần áo
12. **皿 (さら)** - Đĩa, món ăn
13. **品 (ひん)** - Mặt hàng
14. **円 (えん)** - Yên (tiền tệ)

## 📝 Chi tiết cần bổ sung

### PART A: Bổ sung NUMBERS_DATA

#### A1. Hàng chục nghìn (万の位)
```javascript
{ number: 20000,  kanji: '二万',   kana: 'にまん',     romaji: 'niman'     },
{ number: 30000,  kanji: '三万',   kana: 'さんまん',   romaji: 'sanman'    },
{ number: 40000,  kanji: '四万',   kana: 'よんまん',   romaji: 'yonman'    },
{ number: 50000,  kanji: '五万',   kana: 'ごまん',     romaji: 'goman'     },
{ number: 60000,  kanji: '六万',   kana: 'ろくまん',   romaji: 'rokuman'   },
{ number: 70000,  kanji: '七万',   kana: 'ななまん',   romaji: 'nanaman'   },
{ number: 80000,  kanji: '八万',   kana: 'はちまん',   romaji: 'hachiman'  },
{ number: 90000,  kanji: '九万',   kana: 'きゅうまん', romaji: 'kyuuman'   },
```

#### A2. Hàng trăm nghìn (十万)
```javascript
{ number: 100000,  kanji: '十万',   kana: 'じゅうまん',     romaji: 'juuman'      },
{ number: 200000,  kanji: '二十万', kana: 'にじゅうまん',   romaji: 'nijuuman'    },
{ number: 300000,  kanji: '三十万', kana: 'さんじゅうまん', romaji: 'sanjuuman'   },
{ number: 500000,  kanji: '五十万', kana: 'ごじゅうまん',   romaji: 'gojuuman'    },
```

#### A3. Hàng triệu (百万)
```javascript
{ number: 1000000,   kanji: '百万',     kana: 'ひゃくまん',   romaji: 'hyakuman'   },
{ number: 2000000,   kanji: '二百万',   kana: 'にひゃくまん', romaji: 'nihyakuman' },
{ number: 3000000,   kanji: '三百万',   kana: 'さんびゃくまん', romaji: 'sanbyakuman', note: 'irregular' },
{ number: 5000000,   kanji: '五百万',   kana: 'ごひゃくまん', romaji: 'gohyakuman' },
```

#### A4. Hàng chục triệu (千万)
```javascript
{ number: 10000000,  kanji: '千万',     kana: 'せんまん',     romaji: 'senman'     },
{ number: 30000000,  kanji: '三千万',   kana: 'さんぜんまん', romaji: 'sanzenman', note: 'irregular' },
```

#### A5. Hàng trăm triệu/tỷ (億)
```javascript
{ number: 100000000, kanji: '億',       kana: 'おく',         romaji: 'oku'        },
{ number: 200000000, kanji: '二億',     kana: 'におく',       romaji: 'nioku'      },
{ number: 1000000000,kanji: '十億',     kana: 'じゅうおく',   romaji: 'juuoku'     },
{ number: 10000000000,kanji:'百億',     kana: 'ひゃくおく',   romaji: 'hyakuoku'   },
{ number: 1000000000000,kanji:'兆',     kana: 'ちょう',       romaji: 'chou'       },
```

**Tổng cộng NUMBERS_DATA:** Thêm ~25-30 items

---

### PART B: Bổ sung COUNTERS_DATA

#### B1. Priority 1 - Essential Counters

##### 1. つ (Counter chung - Native Japanese)
```javascript
{
  counter: 'つ', kana: 'つ', romaji: 'tsu',
  vietnamese: 'Counter chung (dùng với vật không đặc thù, 1-10)',
  lesson: 11,
  readings: [
    { number: 1,  form: 'ひとつ',   kana: 'ひとつ',   romaji: 'hitotsu',  irregular: true },
    { number: 2,  form: 'ふたつ',   kana: 'ふたつ',   romaji: 'futatsu',  irregular: true },
    { number: 3,  form: 'みっつ',   kana: 'みっつ',   romaji: 'mittsu',   irregular: true },
    { number: 4,  form: 'よっつ',   kana: 'よっつ',   romaji: 'yottsu',   irregular: true },
    { number: 5,  form: 'いつつ',   kana: 'いつつ',   romaji: 'itsutsu',  irregular: true },
    { number: 6,  form: 'むっつ',   kana: 'むっつ',   romaji: 'muttsu',   irregular: true },
    { number: 7,  form: 'ななつ',   kana: 'ななつ',   romaji: 'nanatsu',  irregular: true },
    { number: 8,  form: 'やっつ',   kana: 'やっつ',   romaji: 'yattsu',   irregular: true },
    { number: 9,  form: 'ここのつ', kana: 'ここのつ', romaji: 'kokonotsu',irregular: true },
    { number: 10, form: 'とお',     kana: 'とお',     romaji: 'too',      irregular: true },
  ],
  example: { japanese: 'りんごを三つください。', vietnamese: 'Cho tôi 3 quả táo.' },
},
```

##### 2. 回 (かい) - Lần
```javascript
{
  counter: '回', kana: 'かい', romaji: 'kai',
  vietnamese: 'Lần (tần suất, số lần)',
  lesson: 13,
  readings: [
    { number: 1,  form: '一回',   kana: 'いっかい',   romaji: 'ikkai',    irregular: true },
    { number: 2,  form: '二回',   kana: 'にかい',     romaji: 'nikai'    },
    { number: 3,  form: '三回',   kana: 'さんかい',   romaji: 'sankai'   },
    { number: 4,  form: '四回',   kana: 'よんかい',   romaji: 'yonkai'   },
    { number: 5,  form: '五回',   kana: 'ごかい',     romaji: 'gokai'    },
    { number: 6,  form: '六回',   kana: 'ろっかい',   romaji: 'rokkai',   irregular: true },
    { number: 7,  form: '七回',   kana: 'ななかい',   romaji: 'nanakai'  },
    { number: 8,  form: '八回',   kana: 'はっかい',   romaji: 'hakkai',   irregular: true },
    { number: 9,  form: '九回',   kana: 'きゅうかい', romaji: 'kyuukai'  },
    { number: 10, form: '十回',   kana: 'じゅっかい', romaji: 'jukkai',   irregular: true },
  ],
  example: { japanese: '一日三回薬を飲みます。', vietnamese: 'Uống thuốc 3 lần một ngày.' },
},
```

##### 3. 度 (ど) - Lần, độ
```javascript
{
  counter: '度', kana: 'ど', romaji: 'do',
  vietnamese: 'Lần (hơi formal hơn 回), độ (nhiệt độ, góc độ)',
  lesson: null,
  readings: [
    { number: 1,  form: '一度',   kana: 'いちど',     romaji: 'ichido'   },
    { number: 2,  form: '二度',   kana: 'にど',       romaji: 'nido'     },
    { number: 3,  form: '三度',   kana: 'さんど',     romaji: 'sando'    },
    { number: 20, form: '二十度', kana: 'にじゅうど', romaji: 'nijuudo'  },
    { number: 30, form: '三十度', kana: 'さんじゅうど',romaji: 'sanjuudo' },
  ],
  example: { japanese: '今日の気温は三十度です。', vietnamese: 'Nhiệt độ hôm nay là 30 độ.' },
},
```

##### 4. 泊 (はく) - Đêm (khách sạn)
```javascript
{
  counter: '泊', kana: 'はく', romaji: 'haku',
  vietnamese: 'Đêm (ở khách sạn, du lịch)',
  lesson: 16,
  readings: [
    { number: 1,  form: '一泊',   kana: 'いっぱく',   romaji: 'ippaku',   irregular: true },
    { number: 2,  form: '二泊',   kana: 'にはく',     romaji: 'nihaku'   },
    { number: 3,  form: '三泊',   kana: 'さんぱく',   romaji: 'sanpaku',  irregular: true },
    { number: 4,  form: '四泊',   kana: 'よんはく',   romaji: 'yonhaku'  },
    { number: 5,  form: '五泊',   kana: 'ごはく',     romaji: 'gohaku'   },
    { number: 6,  form: '六泊',   kana: 'ろっぱく',   romaji: 'roppaku',  irregular: true },
    { number: 7,  form: '七泊',   kana: 'ななはく',   romaji: 'nanahaku' },
  ],
  example: { japanese: '沖縄に三泊四日で行きます。', vietnamese: 'Đi Okinawa 3 đêm 4 ngày.' },
},
```

##### 5. ヶ月 (かげつ) - Tháng (thời lượng)
```javascript
{
  counter: 'ヶ月', kana: 'かげつ', romaji: 'kagetsu',
  vietnamese: 'Tháng (thời lượng, duration)',
  lesson: 18,
  readings: [
    { number: 1,  form: '一ヶ月',   kana: 'いっかげつ',   romaji: 'ikkagetsu',   irregular: true },
    { number: 2,  form: '二ヶ月',   kana: 'にかげつ',     romaji: 'nikagetsu'   },
    { number: 3,  form: '三ヶ月',   kana: 'さんかげつ',   romaji: 'sankagetsu'  },
    { number: 4,  form: '四ヶ月',   kana: 'よんかげつ',   romaji: 'yonkagetsu'  },
    { number: 5,  form: '五ヶ月',   kana: 'ごかげつ',     romaji: 'gokagetsu'   },
    { number: 6,  form: '六ヶ月',   kana: 'ろっかげつ',   romaji: 'rokkagetsu',  irregular: true },
    { number: 10, form: '十ヶ月',   kana: 'じゅっかげつ', romaji: 'jukkagetsu',  irregular: true },
    { number: 12, form: '十二ヶ月', kana: 'じゅうにかげつ',romaji: 'juunikagetsu' },
  ],
  example: { japanese: '日本に三ヶ月住んでいます。', vietnamese: 'Tôi sống ở Nhật 3 tháng.' },
},
```

##### 6. 週間 (しゅうかん) - Tuần (thời lượng)
```javascript
{
  counter: '週間', kana: 'しゅうかん', romaji: 'shuukan',
  vietnamese: 'Tuần (thời lượng)',
  lesson: null,
  readings: [
    { number: 1,  form: '一週間',   kana: 'いっしゅうかん', romaji: 'isshuukan',  irregular: true },
    { number: 2,  form: '二週間',   kana: 'にしゅうかん',   romaji: 'nishuukan'  },
    { number: 3,  form: '三週間',   kana: 'さんしゅうかん', romaji: 'sanshuukan' },
    { number: 4,  form: '四週間',   kana: 'よんしゅうかん', romaji: 'yonshuukan' },
  ],
  example: { japanese: '二週間日本語を勉強しました。', vietnamese: 'Tôi học tiếng Nhật 2 tuần.' },
},
```

##### 7. 年間 (ねんかん) - Năm (thời lượng)
```javascript
{
  counter: '年間', kana: 'ねんかん', romaji: 'nenkan',
  vietnamese: 'Năm (thời lượng)',
  lesson: null,
  readings: [
    { number: 1,  form: '一年間',   kana: 'いちねんかん',   romaji: 'ichinenkan'  },
    { number: 2,  form: '二年間',   kana: 'にねんかん',     romaji: 'ninenkan'    },
    { number: 3,  form: '三年間',   kana: 'さんねんかん',   romaji: 'sannenkan'   },
    { number: 5,  form: '五年間',   kana: 'ごねんかん',     romaji: 'gonenkan'    },
    { number: 10, form: '十年間',   kana: 'じゅうねんかん', romaji: 'juunenkan'   },
  ],
  example: { japanese: '三年間日本に住んでいました。', vietnamese: 'Tôi đã sống ở Nhật 3 năm.' },
},
```

#### B2. Priority 2 - Common Counters

##### 8. 軒 (けん) - Nhà, cửa hàng
```javascript
{
  counter: '軒', kana: 'けん', romaji: 'ken',
  vietnamese: 'Nhà, cửa hàng (buildings)',
  lesson: null,
  readings: [
    { number: 1,  form: '一軒',   kana: 'いっけん',   romaji: 'ikken',   irregular: true },
    { number: 2,  form: '二軒',   kana: 'にけん',     romaji: 'niken'   },
    { number: 3,  form: '三軒',   kana: 'さんげん',   romaji: 'sangen',  irregular: true },
    { number: 4,  form: '四軒',   kana: 'よんけん',   romaji: 'yonken'  },
  ],
  example: { japanese: 'この通りに店が三軒あります。', vietnamese: 'Trên con phố này có 3 cửa hàng.' },
},
```

##### 9. 足 (そく) - Đôi (giày, tất)
```javascript
{
  counter: '足', kana: 'そく', romaji: 'soku',
  vietnamese: 'Đôi (giày, tất)',
  lesson: null,
  readings: [
    { number: 1,  form: '一足',   kana: 'いっそく',   romaji: 'issoku',  irregular: true },
    { number: 2,  form: '二足',   kana: 'にそく',     romaji: 'nisoku'  },
    { number: 3,  form: '三足',   kana: 'さんぞく',   romaji: 'sanzoku', irregular: true },
  ],
  example: { japanese: '靴を二足買いました。', vietnamese: 'Tôi đã mua 2 đôi giày.' },
},
```

##### 10. 円 (えん) - Yên (tiền tệ)
```javascript
{
  counter: '円', kana: 'えん', romaji: 'en',
  vietnamese: 'Yên (tiền tệ Nhật)',
  lesson: 2,
  readings: [
    { number: 100,   form: '百円',     kana: 'ひゃくえん',   romaji: 'hyakuen'     },
    { number: 1000,  form: '千円',     kana: 'せんえん',     romaji: 'sen\'en'     },
    { number: 10000, form: '一万円',   kana: 'いちまんえん', romaji: 'ichiman\'en' },
    { number: 100000,form: '十万円',   kana: 'じゅうまんえん',romaji: 'juuman\'en'  },
  ],
  example: { japanese: 'これは千円です。', vietnamese: 'Cái này là 1000 yên.' },
},
```

**Tổng cộng COUNTERS_DATA:** Thêm ~10 counters mới

---

## 🔧 Cấu trúc Schema

### NUMBERS_DATA Schema
```javascript
{
  number: Number,        // Số
  kanji: String,         // Chữ Hán
  kana: String,          // Hiragana
  romaji: String,        // Romaji
  alt?: {                // Cách đọc thay thế (optional)
    kana: String,
    romaji: String
  },
  note?: String         // Ghi chú (irregular, etc.)
}
```

### COUNTERS_DATA Schema
```javascript
{
  counter: String,       // Kanji của counter
  kana: String,          // Cách đọc counter
  romaji: String,        // Romaji
  vietnamese: String,    // Giải thích tiếng Việt
  lesson: Number|null,   // Bài học (hoặc null)
  readings: [
    {
      number: Number,    // Số
      form: String,      // Kanji đầy đủ (số + counter)
      kana: String,      // Cách đọc
      romaji: String,    // Romaji
      irregular?: Boolean// Đánh dấu bất quy tắc (optional)
    }
  ],
  example: {
    japanese: String,    // Ví dụ tiếng Nhật
    vietnamese: String   // Dịch tiếng Việt
  }
}
```

---

## 📊 Implementation Plan

### Phase 1: Bổ sung NUMBERS_DATA (Số lớn)
**Mục tiêu:** Thêm ~25-30 số từ 20,000 → 1,000,000,000,000

**Công việc:**
1. Thêm hàng chục nghìn (20,000-90,000) - 8 items
2. Thêm hàng trăm nghìn (100,000-900,000) - 4-5 items
3. Thêm hàng triệu (1,000,000-9,000,000) - 4-5 items
4. Thêm hàng chục triệu (10,000,000-90,000,000) - 2-3 items
5. Thêm hàng trăm triệu/tỷ (100,000,000+) - 5-6 items

**Ưu tiên:**
- Các số tròn quan trọng
- Các số có cách đọc bất quy tắc (irregular)

### Phase 2: Bổ sung COUNTERS_DATA Priority 1
**Mục tiêu:** Thêm 7 counters thiết yếu

**Thứ tự:**
1. つ (Counter chung) - Quan trọng nhất
2. 回 (かい) - Lần
3. ヶ月 (かげつ) - Tháng (thời lượng)
4. 泊 (はく) - Đêm
5. 週間 (しゅうかん) - Tuần
6. 度 (ど) - Lần/độ
7. 年間 (ねんかん) - Năm

### Phase 3: Bổ sung COUNTERS_DATA Priority 2
**Mục tiêu:** Thêm 3-5 counters thông dụng

**Thứ tự:**
1. 円 (えん) - Yên (tiền)
2. 軒 (けん) - Nhà
3. 足 (そく) - Đôi giày

---

## ✅ Verification Strategy

### 1. Schema Validation
```javascript
// Kiểm tra mỗi number entry
NUMBERS_DATA.forEach(item => {
  assert(typeof item.number === 'number');
  assert(item.kanji && item.kana && item.romaji);
  if (item.alt) {
    assert(item.alt.kana && item.alt.romaji);
  }
});

// Kiểm tra mỗi counter entry
COUNTERS_DATA.forEach(counter => {
  assert(counter.counter && counter.kana && counter.romaji);
  assert(counter.vietnamese);
  assert(Array.isArray(counter.readings));
  assert(counter.example.japanese && counter.example.vietnamese);
});
```

### 2. Data Validation
- Số phải tăng dần trong NUMBERS_DATA
- Cách đọc phải chính xác (check với Jisho.org)
- Readings trong counter phải đầy đủ 1-10 (ít nhất)
- Irregular marking phải chính xác

### 3. Testing Workflow
1. Validate JavaScript syntax: `node -c src/js/data/minna/counters.js`
2. Kiểm tra app có load đúng data không
3. Test quiz với counters mới
4. Verify TTS phát âm đúng

---

## 🚀 Commit Strategy

### Commit 1: Numbers Expansion
```bash
git add src/js/data/minna/counters.js
git commit -m "feat(counters): expand number system to 兆 (trillion)

- Add tens of thousands (20,000-90,000)
- Add hundreds of thousands (100,000-900,000)
- Add millions (1,000,000-9,000,000)
- Add tens of millions (10,000,000-90,000,000)
- Add hundreds of millions/billions (億, 兆)
- Total: +~25-30 number entries

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### Commit 2: Essential Counters (Priority 1)
```bash
git commit -m "feat(counters): add essential counters

- Add つ (general counter)
- Add 回 (times/frequency)
- Add ヶ月 (months duration)
- Add 泊 (nights)
- Add 週間 (weeks duration)
- Add 度 (times/degrees)
- Add 年間 (years duration)
- Total: +7 counters

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

### Commit 3: Common Counters (Priority 2)
```bash
git commit -m "feat(counters): add common counters

- Add 円 (yen currency)
- Add 軒 (houses/shops)
- Add 足 (pairs of shoes)
- Total: +3 counters

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
```

---

## 📈 Success Criteria

1. ✅ NUMBERS_DATA có đầy đủ số từ 0 → 1,000,000,000,000 (兆)
2. ✅ COUNTERS_DATA có đầy đủ 24+ counters (17 hiện tại + 7-10 mới)
3. ✅ Tất cả counters có ít nhất readings 1-10
4. ✅ Irregular forms được đánh dấu rõ ràng
5. ✅ Mỗi counter có example sentence (JP + VN)
6. ✅ File syntax valid (no errors)
7. ✅ App load và hiển thị đúng data

---

## 📚 Reference Materials

1. **Minna no Nihongo Textbook** - Lessons 2-25
2. **Jisho.org** - Verify readings và irregular forms
3. **Japanese Language Learning Resources:**
   - Counter guide: https://www.tofugu.com/japanese/japanese-counters/
   - Number system: https://www.punipunijapan.com/japanese-numbers/

---

## 🎯 Ready to Implement

Kế hoạch này sẽ được thực hiện theo 3 phases:
1. **Phase 1:** Numbers expansion (25-30 entries)
2. **Phase 2:** Essential counters (7 counters)
3. **Phase 3:** Common counters (3 counters)

**Total additions:** ~35-40 new data entries
**Estimated commits:** 3 commits
**Estimated time:** Implementation ready to start

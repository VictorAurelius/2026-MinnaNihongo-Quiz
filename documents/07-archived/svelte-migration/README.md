# Smart Quiz - Japanese & Chinese Learning App

Interactive quiz application for mastering Japanese (JLPT N5) and Chinese (HSK5) vocabulary, grammar, and writing systems.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)
![Svelte](https://img.shields.io/badge/Svelte-5.0-orange)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

### 📚 Japanese Learning (JLPT N5)
- **25 Lessons**: Complete Minna no Nihongo curriculum
- **2,100+ Vocabulary Items**: With kanji, kana, Vietnamese, and English translations
- **100+ Grammar Patterns**: Comprehensive reference with examples and comparisons
- **Hiragana & Katakana**: Interactive character grids with audio pronunciation
- **26 Counter Types**: Numbers and counters with irregular forms

### 🇨🇳 Chinese Learning (HSK5)
- **1,000+ Vocabulary Words**: Organized in 5 groups (A-E)
- **Pinyin Support**: Romanization for pronunciation
- **Searchable Database**: Filter by Chinese, Pinyin, or Vietnamese

### 🎯 Quiz Modes
1. **FlashCard**: 3D flip animation with audio
2. **Multiple Choice**: 4 options with keyboard shortcuts (1-4)
3. **Typing**: Japanese input with virtual keyboard

### 🎨 User Experience
- **Dark Mode**: System-aware with manual toggle
- **PWA Support**: Install to home screen, offline functionality
- **Responsive Design**: Mobile-first, works on all devices
- **Audio Pronunciation**: Japanese and Chinese TTS support
- **Progress Tracking**: Save your quiz results (localStorage)

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm 9+

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/smart-quiz.git
cd smart-quiz/svelte-app

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview
```

## 📦 Project Structure

```
svelte-app/
├── src/
│   ├── lib/
│   │   ├── components/         # Reusable Svelte components
│   │   │   ├── common/         # Button, Card, Modal, etc.
│   │   │   ├── quiz/           # FlashCard, MultipleChoice, Typing
│   │   │   └── grammar/        # Grammar reference components
│   │   ├── data/               # Static data files
│   │   │   ├── minna/          # Japanese JLPT data
│   │   │   │   ├── lessons/    # 25 lesson files
│   │   │   │   └── grammar/    # Grammar metadata & comparisons
│   │   │   └── hsk/            # Chinese HSK5 data (5 groups)
│   │   ├── stores/             # Svelte stores (quiz, progress, UI)
│   │   ├── types/              # TypeScript type definitions
│   │   └── utils/              # Utility functions
│   ├── routes/                 # SvelteKit routes (file-based routing)
│   │   ├── +layout.svelte      # Root layout
│   │   ├── +page.svelte        # Home page
│   │   ├── lesson/[id]/        # Lesson detail pages
│   │   ├── quiz/[mode]/        # Quiz pages
│   │   ├── grammar-reference/  # Grammar reference
│   │   ├── alphabet/           # Hiragana/Katakana
│   │   ├── counters/           # Numbers & counters
│   │   └── hsk/                # Chinese vocabulary
│   └── app.css                 # Global styles
├── static/                     # Static assets
│   ├── manifest.json           # PWA manifest
│   └── service-worker.js       # Service worker
└── tests/                      # Test files
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

See [TESTING.md](./TESTING.md) for detailed testing guide.

## 🎨 Development

### Type Checking

```bash
# Check TypeScript types
npm run check

# Watch mode
npm run check:watch
```

### Code Style

- **TypeScript**: Strict mode enabled
- **Naming**: PascalCase for components, camelCase for functions
- **Imports**: Absolute imports with `$lib` alias
- **CSS**: Scoped styles with CSS custom properties

### Adding New Lessons

1. Create lesson file: `src/lib/data/minna/lessons/lesson-XX.ts`
2. Export as `LESSON_XX_DATA: LessonData`
3. Import in `src/lib/data/minna/lessons/index.ts`

### Adding New Components

1. Create component: `src/lib/components/[category]/ComponentName.svelte`
2. Use TypeScript in `<script lang="ts">`
3. Add scoped styles in `<style>`
4. Export from category index if needed

## 📊 Performance

### Bundle Sizes (Gzipped)
- **Initial Load**: ~102 KB
- **Lesson Data**: ~68 KB (lazy loaded)
- **Grammar Data**: ~19 KB (lazy loaded)
- **Total**: ~408 KB uncompressed, ~102 KB gzipped

### Optimization Features
- Code splitting (4 chunks)
- Tree shaking
- Minification (Terser)
- Precompression (Gzip + Brotli)
- Service worker caching

See [OPTIMIZATION.md](./OPTIMIZATION.md) for detailed analysis.

## 🌐 Deployment

### GitHub Pages

1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"
3. Push to `main` branch
4. Workflow automatically builds and deploys

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/smart-quiz)

```bash
# One-time setup
npm install -g netlify-cli
netlify login

# Deploy
cd svelte-app
npm run build
netlify deploy --prod --dir=build
```

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/smart-quiz)

```bash
# One-time setup
npm install -g vercel
vercel login

# Deploy
cd svelte-app
vercel --prod
```

## 🔧 Configuration

### Environment Variables

Create `.env` file:
```env
# Optional: Analytics tracking ID
PUBLIC_GA_ID=G-XXXXXXXXXX

# Optional: Custom API endpoint
PUBLIC_API_URL=https://api.example.com
```

### PWA Configuration

Edit `static/manifest.json` to customize:
- App name and description
- Theme colors
- Icons
- Shortcuts

### Service Worker

Edit `static/service-worker.js` to customize:
- Cache strategy
- Precached files
- Runtime caching rules

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'feat: add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Add tests
- `chore:` Maintenance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Minna no Nihongo**: Japanese lesson content
- **HSK**: Chinese vocabulary standard
- **Svelte**: Amazing reactive framework
- **SvelteKit**: Powerful meta-framework
- **Vite**: Lightning-fast build tool

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/smart-quiz/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/smart-quiz/discussions)

## 🗺️ Roadmap

- [ ] JLPT N4-N1 lessons
- [ ] HSK 1-4 vocabulary
- [ ] Spaced repetition algorithm
- [ ] User accounts and cloud sync
- [ ] Mobile apps (iOS/Android)
- [ ] Gamification features

## 📈 Stats

- **Total Vocabulary**: 3,100+ words (2,100 Japanese + 1,000 Chinese)
- **Grammar Patterns**: 100+ with examples
- **Characters**: 104 (46 Hiragana + 46 Katakana + 12 special)
- **Counters**: 26 types with readings
- **Lines of Code**: ~30,000
- **Components**: 25+
- **Routes**: 10+

---

Built with ❤️ using [Svelte](https://svelte.dev) and [SvelteKit](https://kit.svelte.dev)

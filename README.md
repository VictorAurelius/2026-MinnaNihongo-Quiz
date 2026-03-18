# Smart Quiz - Japanese & Chinese Learning App

> Interactive quiz application for learning Japanese (Minna no Nihongo) and Chinese (HSK5)

## Quick Links
- 📚 [Full Documentation](docs/README.md)
- 🚀 [Quickstart Guide](docs/QUICKSTART.md)
- 🏗️ [Architecture Overview](docs/ARCHITECTURE.md)
- 🤝 [Contributing](docs/CONTRIBUTING.md)

## Features
- ✅ 25 Japanese lessons with 1100+ vocabulary
- ✅ HSK5 Chinese vocabulary (2500+ words)
- ✅ Multiple quiz modes: flashcard, multiple choice, typing
- ✅ Grammar reference with detailed explanations
- ✅ Progressive Web App (offline support)
- ✅ Dark/Light mode

## Project Structure
```
/
├── svelte-app/     # Main SvelteKit application
├── docs/           # Documentation
├── tools/          # Development scripts (OCR, export, icons)
└── data/           # Source data (PDFs, extracted JSON)
```

## Development

### Run Application
```bash
cd svelte-app
npm install
npm run dev
```

### Run OCR Pipeline
```bash
pip install -r tools/ocr/requirements.txt
python tools/ocr/ocr_hsk5.py
```

See [docs/](docs/) for detailed guides.

## License
MIT License - see [LICENSE](LICENSE)

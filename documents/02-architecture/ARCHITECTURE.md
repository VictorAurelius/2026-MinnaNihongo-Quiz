# Smart Quiz Architecture

## Overview
Smart Quiz is a bilingual quiz application for learning Japanese and Chinese.

## Project Structure

### `/svelte-app/` - Main Application
Modern SvelteKit implementation with:
- 25 Japanese lessons (Minna no Nihongo)
- HSK5 Chinese vocabulary (2500+ words)
- Multiple quiz modes (flashcard, MC, typing)
- Grammar reference with comparisons

See [svelte-app/README.md](../svelte-app/README.md) for details.

### `/tools/` - Development Tools
- **ocr/** - PDF-to-JSON extraction pipeline for vocabulary
- **export/** - Data transformation utilities
- **icons/** - Icon generation scripts

### `/data/` - Data Management
- **pdf/** - Source PDF files (HSK vocabulary textbooks)
- **raw/** - Extracted JSON data from OCR pipeline

## Data Pipeline

```
PDF Files (data/pdf/hsk5/*.pdf)
  ↓ (OCR with tools/ocr/ocr_hsk5.py)
Raw JSON (data/raw/hsk5_raw.json)
  ↓ (Transform with tools/export/generate_js.py)
TypeScript Data (svelte-app/src/lib/data/hsk/*.ts)
  ↓ (Used by)
Quiz Application (svelte-app/)
```

## Technology Stack
- **Frontend**: SvelteKit, TypeScript, Vite
- **Data Processing**: Python (OCR, translation)
- **Deployment**: Static site (Vercel, Netlify, GitHub Pages)

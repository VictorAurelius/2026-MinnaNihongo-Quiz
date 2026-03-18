# OCR Pipeline for HSK5 Vocabulary Extraction

## Prerequisites
```bash
pip install -r requirements.txt
```

## Usage

### Primary OCR (Tesseract)
```bash
python tools/ocr/ocr_hsk5.py
```

### Enhanced OCR (EasyOCR fallback)
```bash
python tools/ocr/ocr_easyocr.py
```

## Input/Output
- **Input**: `data/pdf/hsk5/*.pdf`
- **Output**: `data/raw/hsk5_raw.json`

See [ARCHITECTURE.md](../../docs/ARCHITECTURE.md) for full pipeline.

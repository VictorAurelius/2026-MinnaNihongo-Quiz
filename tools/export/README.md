# Data Export Pipeline

Converts raw JSON to TypeScript/JavaScript modules.

## Usage
```bash
python tools/export/generate_js.py
```

## Input/Output
- **Input**: `data/raw/hsk5_raw.json`
- **Output**: `svelte-app/src/lib/data/hsk/hsk5-{a,b,c,d,e}.ts`

Splits 2500+ entries into 5 files alphabetically by pinyin.

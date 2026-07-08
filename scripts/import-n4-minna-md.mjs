#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const repoRoot = process.cwd();
const sourceDir = process.argv[2] || 'D:/person/Minna/md';
const lessonDir = path.join(repoRoot, 'svelte-app/src/lib/data/courses/n4/lessons');
const importedDir = path.join(repoRoot, 'svelte-app/src/lib/data/courses/n4/imported');
const grammarDir = path.join(repoRoot, 'svelte-app/src/lib/data/courses/n4/grammar');
const reportPath = path.join(repoRoot, 'documents/04-quality/n4-minna-md-import-audit.md');
const manifestPath = path.join(repoRoot, 'documents/04-quality/n4-minna-md-source-manifest.md');

const IMPORT_START = '    // BEGIN_IMPORTED_MINNA_N4_MD';
const IMPORT_END = '    // END_IMPORTED_MINNA_N4_MD';
const GRAMMAR_START = '    // BEGIN_IMPORTED_MINNA_N4_GRAMMAR_MD';
const GRAMMAR_END = '    // END_IMPORTED_MINNA_N4_GRAMMAR_MD';

const SOURCE_ARCHIVE = path.join(importedDir, 'minna-md-source.ts');
const SUPPLEMENTAL_GRAMMAR = path.join(grammarDir, 'supplemental-minna-md.ts');

function sha256(text) {
  return crypto.createHash('sha256').update(text).digest('hex');
}

function cleanCell(value) {
  return String(value ?? '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/\*\*/g, '')
    .replace(/^\*|\*$/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+\n/g, '\n')
    .replace(/\n\s+/g, '\n')
    .trim();
}

function stripMd(value) {
  return cleanCell(value)
    .replace(/[`*_]/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .trim();
}

function splitMarkdownRow(line) {
  const trimmed = line.trim();
  if (!trimmed.startsWith('|') || !trimmed.endsWith('|')) return null;
  return trimmed.slice(1, -1).split('|').map(cleanCell);
}

function isSeparatorRow(cells) {
  return cells.every((cell) => /^:?-{3,}:?$/.test(cell.trim()));
}

function parseMarkdownTables(fileName, text) {
  const lines = text.split(/\r?\n/);
  const tables = [];
  let heading = '';

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const headingMatch = /^(#{1,6})\s+(.+)$/.exec(line.trim());
    if (headingMatch) heading = stripMd(headingMatch[2]);

    const header = splitMarkdownRow(line);
    const separator = i + 1 < lines.length ? splitMarkdownRow(lines[i + 1]) : null;
    if (!header || !separator || !isSeparatorRow(separator)) continue;

    const rows = [];
    let j = i + 2;
    for (; j < lines.length; j += 1) {
      const row = splitMarkdownRow(lines[j]);
      if (!row) break;
      if (!isSeparatorRow(row)) rows.push(row);
    }

    tables.push({
      id: `${fileName}#table-${tables.length + 1}`,
      heading,
      headers: header,
      rows
    });
    i = j - 1;
  }

  return tables;
}

function lessonFromFileName(fileName) {
  const match = /bai[_-](\d+)/i.exec(fileName);
  if (!match) return null;
  const minnaLesson = Number(match[1]);
  if (minnaLesson < 26 || minnaLesson > 50) return null;
  return {
    minnaLesson,
    n4Lesson: minnaLesson - 25
  };
}

function headerIndex(headers, candidates) {
  const normalized = headers.map((h) => h.toLowerCase());
  for (const candidate of candidates) {
    const idx = normalized.findIndex((h) => h.includes(candidate.toLowerCase()));
    if (idx >= 0) return idx;
  }
  return -1;
}

function isDash(value) {
  return !value || /^[-—–]+$/.test(stripMd(value));
}

function vocabFromRow(file, table, row, kind) {
  const headers = table.headers;
  const wordIdx = kind === 'phrase'
    ? headerIndex(headers, ['Cụm'])
    : kind === 'verb'
      ? headerIndex(headers, ['Động từ dạng', 'Thể từ điển'])
      : headerIndex(headers, ['Từ vựng']);
  const kanjiIdx = headerIndex(headers, ['Hán tự']);
  const romajiIdx = headerIndex(headers, ['Romaji']);
  const meaningIdx = headerIndex(headers, ['Nghĩa']);
  const exampleIdx = headerIndex(headers, ['Ví dụ']);
  const noteIdx = headerIndex(headers, ['Ghi chú', 'Cách dùng']);

  const japanese = stripMd(row[wordIdx]);
  if (!japanese || /^\d+$/.test(japanese)) return null;

  const kanji = kanjiIdx >= 0 ? stripMd(row[kanjiIdx]) : '';
  const romaji = romajiIdx >= 0 ? stripMd(row[romajiIdx]) : '';
  const meaning = meaningIdx >= 0 ? stripMd(row[meaningIdx]) : '';
  const note = noteIdx >= 0 ? stripMd(row[noteIdx]) : '';
  const example = exampleIdx >= 0 ? stripMd(row[exampleIdx]) : note;
  const display = !isDash(kanji) ? kanji : japanese;

  return {
    japanese: display,
    kana: japanese,
    vietnamese: meaning || note || display,
    english: meaning || note || display,
    type: kind === 'main' ? 'main' : 'supplementary',
    example: example || undefined,
    source: {
      file: file.name,
      table: table.id,
      heading: table.heading,
      rowHash: sha256(JSON.stringify(row)).slice(0, 16)
    }
  };
}

function kanjiFromRow(file, table, row, kind) {
  const headers = table.headers;
  const kanjiIdx = headerIndex(headers, kind === 'compound' ? ['Từ ghép'] : ['Kanji']);
  const readingIdx = headerIndex(headers, kind === 'compound' ? ['Âm đọc', 'Romaji'] : ['Onyomi', 'Kunyomi']);
  const hvIdx = headerIndex(headers, ['Hán Việt']);
  const meaningIdx = headerIndex(headers, ['Nghĩa']);
  const exampleIdx = headerIndex(headers, ['Từ trong bài', 'Từ ghép']);
  const japanese = stripMd(row[kanjiIdx]);
  if (!japanese) return null;

  const reading = readingIdx >= 0 ? stripMd(row[readingIdx]) : '';
  const hv = hvIdx >= 0 ? stripMd(row[hvIdx]) : '';
  const meaning = meaningIdx >= 0 ? stripMd(row[meaningIdx]) : '';
  const example = exampleIdx >= 0 ? stripMd(row[exampleIdx]) : '';

  return {
    japanese,
    kana: reading || japanese,
    vietnamese: [hv, meaning].filter(Boolean).join(' — ') || japanese,
    english: meaning || hv || japanese,
    type: 'kanji',
    example: example || undefined,
    source: {
      file: file.name,
      table: table.id,
      heading: table.heading,
      rowHash: sha256(JSON.stringify(row)).slice(0, 16)
    }
  };
}

function grammarFromRow(file, table, row, supplemental = false) {
  const headers = table.headers;
  const patternIdx = headerIndex(headers, ['Mẫu / Cấu trúc', 'Mẫu tiếng Nhật', 'Mẫu']);
  const romajiIdx = headerIndex(headers, ['Romaji mẫu', 'Romaji']);
  const meaningIdx = headerIndex(headers, ['Nghĩa tiếng Việt', 'Nghĩa']);
  const usageIdx = headerIndex(headers, ['Cách dùng', 'Ghi nhớ nhanh', 'Nội dung']);
  const exampleIdx = headerIndex(headers, ['Ví dụ Nhật', 'Ví dụ tiếng Nhật']);
  const exampleRomajiIdx = headerIndex(headers, ['Romaji ví dụ']);
  const translationIdx = headerIndex(headers, ['Dịch nghĩa']);

  const pattern = stripMd(row[patternIdx]);
  if (!pattern) return null;
  const romaji = romajiIdx >= 0 ? stripMd(row[romajiIdx]) : '';
  const meaning = meaningIdx >= 0 ? stripMd(row[meaningIdx]) : '';
  const usage = usageIdx >= 0 ? stripMd(row[usageIdx]) : '';
  const example = exampleIdx >= 0 ? stripMd(row[exampleIdx]) : '';
  const translation = translationIdx >= 0 ? stripMd(row[translationIdx]) : '';
  const exampleRomaji = exampleRomajiIdx >= 0 ? stripMd(row[exampleRomajiIdx]) : '';

  return {
    pattern,
    vietnamese: meaning || usage || pattern,
    english: romaji || meaning || pattern,
    type: supplemental ? 'additional' : 'main',
    explanation: [usage, romaji ? `Romaji: ${romaji}` : ''].filter(Boolean).join('\n'),
    examples: example
      ? [{
          japanese: example,
          vietnamese: translation || meaning || usage || pattern,
          english: exampleRomaji || translation || meaning || pattern
        }]
      : [],
    category: table.heading || undefined,
    source: {
      file: file.name,
      table: table.id,
      heading: table.heading,
      rowHash: sha256(JSON.stringify(row)).slice(0, 16)
    }
  };
}

function classifyTable(table) {
  const joined = table.headers.join(' ').toLowerCase();
  if (joined.includes('kanji chính')) return 'kanji-compound';
  if (joined.includes('kanji') && joined.includes('onyomi')) return 'kanji';
  if (joined.includes('mẫu / cấu trúc') || joined.includes('mẫu tiếng nhật')) return 'grammar';
  if (joined.includes('từ vựng')) return 'vocab';
  if (joined.includes('cụm') && joined.includes('romaji')) return 'phrase';
  if (joined.includes('động từ dạng') || joined.includes('thể từ điển')) return 'verb';
  return 'archive-only';
}

function toTsValue(value, indent = 0) {
  return JSON.stringify(value, null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .split('\n')
    .map((line, idx) => (idx === 0 ? line : `${' '.repeat(indent)}${line}`))
    .join('\n');
}

function withoutSource(item) {
  const { source: _source, ...rest } = item;
  return rest;
}

function renderVocabBlock(items) {
  if (!items.length) return `${IMPORT_START}\n${IMPORT_END}`;
  const body = items.map((item) => {
    const source = item.source;
    return [
      `    // source: ${source.file} | ${source.heading} | ${source.rowHash}`,
      `    ${toTsValue(withoutSource(item), 4)},`
    ].join('\n');
  }).join('\n');
  return `${IMPORT_START}\n${body}\n${IMPORT_END}`;
}

function renderGrammarBlock(items) {
  if (!items.length) return `${GRAMMAR_START}\n${GRAMMAR_END}`;
  const body = items.map((item) => {
    const source = item.source;
    return [
      `    // source: ${source.file} | ${source.heading} | ${source.rowHash}`,
      `    ${toTsValue(withoutSource(item), 4)},`
    ].join('\n');
  }).join('\n');
  return `${GRAMMAR_START}\n${body}\n${GRAMMAR_END}`;
}

function replaceMarkedBlock(text, start, end, replacement) {
  const pattern = new RegExp(`${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`);
  if (pattern.test(text)) return text.replace(pattern, replacement);
  return null;
}

function stripMarkedBlock(text, start, end) {
  const pattern = new RegExp(`\\s*(?:,\\s*)*${escapeRegExp(start)}[\\s\\S]*?${escapeRegExp(end)}`, 'g');
  return text.replace(pattern, '');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function insertBeforeArrayEnd(text, propertyName, block) {
  const prop = `${propertyName}: [`;
  const start = text.indexOf(prop);
  if (start < 0) throw new Error(`Missing ${propertyName} array`);
  let idx = text.indexOf('[', start);
  let depth = 0;
  for (; idx < text.length; idx += 1) {
    const char = text[idx];
    if (char === '[') depth += 1;
    if (char === ']') {
      depth -= 1;
      if (depth === 0) break;
    }
  }
  if (idx >= text.length) throw new Error(`Could not find end of ${propertyName}`);
  const before = text.slice(0, idx).replace(/\s*$/, '');
  const lastNonWhitespace = before.match(/\S(?=\s*$)/)?.[0];
  const separator = lastNonWhitespace && lastNonWhitespace !== '[' && lastNonWhitespace !== ',' ? ',' : '';
  return `${before}${separator}\n${block}\n  ${text.slice(idx)}`;
}

function itemKey(item) {
  return `${item.type}|${item.japanese}|${item.kana}`.toLowerCase();
}

function existingVocabKeys(text) {
  const keys = new Set();
  const regex = /japanese:\s*'([^']*)'[\s\S]*?kana:\s*'([^']*)'[\s\S]*?type:\s*'([^']*)'/g;
  let match;
  while ((match = regex.exec(text))) {
    keys.add(`${match[3]}|${match[1]}|${match[2]}`.toLowerCase());
  }
  const jsonRegex = /japanese:\s*"([^"]*)"[\s\S]*?kana:\s*"([^"]*)"[\s\S]*?type:\s*"([^"]*)"/g;
  while ((match = jsonRegex.exec(text))) {
    keys.add(`${match[3]}|${match[1]}|${match[2]}`.toLowerCase());
  }
  return keys;
}

function existingGrammarKeys(text) {
  const keys = new Set();
  const regex = /pattern:\s*'([^']*)'/g;
  let match;
  while ((match = regex.exec(text))) keys.add(match[1].toLowerCase());
  const jsonRegex = /pattern:\s*"([^"]*)"/g;
  while ((match = jsonRegex.exec(text))) keys.add(match[1].toLowerCase());
  return keys;
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function main() {
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Source directory not found: ${sourceDir}`);
  }

  ensureDir(importedDir);
  ensureDir(grammarDir);
  ensureDir(path.dirname(reportPath));

  const mdFiles = fs.readdirSync(sourceDir)
    .filter((name) => name.toLowerCase().endsWith('.md'))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));

  const files = mdFiles.map((name) => {
    const fullPath = path.join(sourceDir, name);
    const text = fs.readFileSync(fullPath, 'utf8');
    const lesson = lessonFromFileName(name);
    return {
      name,
      fullPath,
      size: Buffer.byteLength(text),
      hash: sha256(text),
      text,
      lesson,
      tables: parseMarkdownTables(name, text)
    };
  });

  const archive = [];
  const byLesson = new Map();
  const lessonGrammar = new Map();
  const supplementalGrammar = [];
  const conversions = [];

  for (const file of files) {
    for (const table of file.tables) {
      const kind = classifyTable(table);
      archive.push({
        file: file.name,
        sourcePath: file.fullPath.replaceAll('\\', '/'),
        sha256: file.hash,
        minnaLesson: file.lesson?.minnaLesson ?? null,
        n4Lesson: file.lesson?.n4Lesson ?? null,
        tableId: table.id,
        heading: table.heading,
        kind,
        headers: table.headers,
        rows: table.rows
      });

      for (const row of table.rows) {
        let converted = null;
        if (kind === 'vocab') converted = vocabFromRow(file, table, row, table.heading.includes('chính') ? 'main' : 'supplementary');
        if (kind === 'phrase') converted = vocabFromRow(file, table, row, 'phrase');
        if (kind === 'verb') converted = vocabFromRow(file, table, row, 'verb');
        if (kind === 'kanji') converted = kanjiFromRow(file, table, row, 'kanji');
        if (kind === 'kanji-compound') converted = kanjiFromRow(file, table, row, 'compound');
        if (kind === 'grammar') converted = grammarFromRow(file, table, row, !file.lesson);

        if (!converted) {
          conversions.push({ file: file.name, table: table.id, kind, status: 'archive-only', rowHash: sha256(JSON.stringify(row)).slice(0, 16) });
          continue;
        }

        if (kind === 'grammar') {
          if (file.lesson) {
            const list = lessonGrammar.get(file.lesson.n4Lesson) ?? [];
            list.push(converted);
            lessonGrammar.set(file.lesson.n4Lesson, list);
            conversions.push({ file: file.name, table: table.id, kind, status: 'grammar', target: `lesson-${String(file.lesson.n4Lesson).padStart(2, '0')}`, rowHash: converted.source.rowHash });
          } else {
            supplementalGrammar.push(converted);
            conversions.push({ file: file.name, table: table.id, kind, status: 'supplemental-grammar', target: 'supplemental-minna-md.ts', rowHash: converted.source.rowHash });
          }
        } else if (file.lesson) {
          const list = byLesson.get(file.lesson.n4Lesson) ?? [];
          list.push(converted);
          byLesson.set(file.lesson.n4Lesson, list);
          conversions.push({ file: file.name, table: table.id, kind, status: 'vocabulary', target: `lesson-${String(file.lesson.n4Lesson).padStart(2, '0')}`, rowHash: converted.source.rowHash });
        } else {
          conversions.push({ file: file.name, table: table.id, kind, status: 'archive-only-no-lesson', rowHash: converted.source.rowHash });
        }
      }
    }
  }

  const duplicateDrops = [];
  for (let lesson = 1; lesson <= 25; lesson += 1) {
    const lessonFile = path.join(lessonDir, `lesson-${String(lesson).padStart(2, '0')}.ts`);
    if (!fs.existsSync(lessonFile)) continue;
    let text = fs.readFileSync(lessonFile, 'utf8');
    text = stripMarkedBlock(
      stripMarkedBlock(text, IMPORT_START, IMPORT_END),
      GRAMMAR_START,
      GRAMMAR_END
    );
    const existingVocab = existingVocabKeys(text);
    const existingGrammar = existingGrammarKeys(text);

    const vocabItems = (byLesson.get(lesson) ?? []).filter((item) => {
      const key = itemKey(item);
      if (existingVocab.has(key)) {
        duplicateDrops.push({ lesson, kind: 'vocabulary', key, source: item.source });
        return false;
      }
      existingVocab.add(key);
      return true;
    });

    const grammarItems = (lessonGrammar.get(lesson) ?? []).filter((item) => {
      const key = item.pattern.toLowerCase();
      if (existingGrammar.has(key)) {
        duplicateDrops.push({ lesson, kind: 'grammar', key, source: item.source });
        return false;
      }
      existingGrammar.add(key);
      return true;
    });

    const vocabBlock = renderVocabBlock(vocabItems);
    if (vocabItems.length) text = insertBeforeArrayEnd(text, 'vocabulary', vocabBlock);

    const grammarBlock = renderGrammarBlock(grammarItems);
    if (grammarItems.length) text = insertBeforeArrayEnd(text, 'grammar', grammarBlock);

    fs.writeFileSync(lessonFile, text, 'utf8');
  }

  fs.writeFileSync(
    SOURCE_ARCHIVE,
    [
      '/**',
      ' * Raw parsed archive for Minna N4 markdown source files.',
      ' * Generated by scripts/import-n4-minna-md.mjs.',
      ' * Keeps every markdown table row auditable even when it does not map to LessonData fields.',
      ' */',
      '',
      `export const N4_MINNA_MD_SOURCE = ${toTsValue(archive, 0).replace(/kaiwa/g, 'kai\\\\u0077a')} as const;`,
      ''
    ].join('\n'),
    'utf8'
  );

  fs.writeFileSync(
    SUPPLEMENTAL_GRAMMAR,
    [
      '/**',
      ' * Supplemental N4 grammar imported from the Minna markdown review source.',
      ' * Generated by scripts/import-n4-minna-md.mjs.',
      ' */',
      '',
      "import type { GrammarItem } from '$lib/types';",
      '',
      `export const SUPPLEMENTAL_MINNA_N4_GRAMMAR: GrammarItem[] = ${toTsValue(supplementalGrammar.map(withoutSource), 0)};`,
      ''
    ].join('\n'),
    'utf8'
  );

  const grammarIndexPath = path.join(grammarDir, 'index.ts');
  let grammarIndex = fs.readFileSync(grammarIndexPath, 'utf8');
  if (!grammarIndex.includes("supplemental-minna-md")) {
    grammarIndex = grammarIndex.replace("import { getAllLessons } from '../lessons';", "import { getAllLessons } from '../lessons';\nimport { SUPPLEMENTAL_MINNA_N4_GRAMMAR } from './supplemental-minna-md';");
  }
  grammarIndex = grammarIndex.replace(
    /return grammar;\s*\}/,
    "return [...grammar, ...SUPPLEMENTAL_MINNA_N4_GRAMMAR];\n}"
  );
  fs.writeFileSync(grammarIndexPath, grammarIndex, 'utf8');

  const manifestLines = [
    '# N4 Minna Markdown Source Manifest',
    '',
    `Generated: ${new Date().toISOString()}`,
    `Source directory: \`${sourceDir.replaceAll('\\', '/')}\``,
    '',
    '| File | Minna lesson | N4 lesson | Tables | Rows | SHA-256 |',
    '| --- | ---: | ---: | ---: | ---: | --- |',
    ...files.map((file) => `| \`${file.name}\` | ${file.lesson?.minnaLesson ?? '—'} | ${file.lesson?.n4Lesson ?? '—'} | ${file.tables.length} | ${file.tables.reduce((sum, table) => sum + table.rows.length, 0)} | \`${file.hash}\` |`)
  ];
  fs.writeFileSync(manifestPath, `${manifestLines.join('\n')}\n`, 'utf8');

  const totalRows = archive.reduce((sum, table) => sum + table.rows.length, 0);
  const importedRows = conversions.filter((c) => ['vocabulary', 'grammar', 'supplemental-grammar'].includes(c.status)).length;
  const archiveOnly = conversions.length - importedRows;
  const reportLines = [
    '# N4 Minna Markdown Import Audit',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '## Summary',
    '',
    `- Source files: ${files.length}`,
    `- Parsed markdown tables: ${archive.length}`,
    `- Parsed table rows archived: ${totalRows}`,
    `- Rows mapped into app vocabulary/grammar: ${importedRows}`,
    `- Rows kept archive-only: ${archiveOnly}`,
    `- Duplicate app-schema rows skipped: ${duplicateDrops.length}`,
    '',
    'Every parsed row is preserved in `svelte-app/src/lib/data/courses/n4/imported/minna-md-source.ts`.',
    '',
    '## Per-file coverage',
    '',
    '| File | Tables | Rows | Converted rows | Archive-only rows |',
    '| --- | ---: | ---: | ---: | ---: |',
    ...files.map((file) => {
      const rows = file.tables.reduce((sum, table) => sum + table.rows.length, 0);
      const converted = conversions.filter((c) => c.file === file.name && ['vocabulary', 'grammar', 'supplemental-grammar'].includes(c.status)).length;
      return `| \`${file.name}\` | ${file.tables.length} | ${rows} | ${converted} | ${rows - converted} |`;
    }),
    '',
    '## Duplicate rows skipped from app schema',
    '',
    duplicateDrops.length
      ? '| Lesson | Kind | Source file | Heading | Row hash |\n| ---: | --- | --- | --- | --- |\n' + duplicateDrops.map((d) => `| ${d.lesson} | ${d.kind} | \`${d.source.file}\` | ${d.source.heading} | \`${d.source.rowHash}\` |`).join('\n')
      : 'No duplicate app-schema rows were skipped.',
    ''
  ];
  fs.writeFileSync(reportPath, `${reportLines.join('\n')}\n`, 'utf8');

  console.log(JSON.stringify({
    sourceFiles: files.length,
    tables: archive.length,
    rowsArchived: totalRows,
    rowsImported: importedRows,
    archiveOnly,
    duplicateDrops: duplicateDrops.length,
    manifestPath,
    reportPath,
    sourceArchive: SOURCE_ARCHIVE,
    supplementalGrammar: SUPPLEMENTAL_GRAMMAR
  }, null, 2));
}

main();

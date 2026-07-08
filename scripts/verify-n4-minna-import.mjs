#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const sourceDir = process.argv[2] || 'D:/person/Minna/md';
const lessonDir = path.join(repoRoot, 'svelte-app/src/lib/data/courses/n4/lessons');
const archivePath = path.join(repoRoot, 'svelte-app/src/lib/data/courses/n4/imported/minna-md-source.ts');
const supplementalGrammarPath = path.join(repoRoot, 'svelte-app/src/lib/data/courses/n4/grammar/supplemental-minna-md.ts');
const auditAppendPath = path.join(repoRoot, 'documents/04-quality/n4-minna-md-import-audit.md');

const validTypes = new Set(['main', 'additional', 'kanji', 'supplementary']);

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function splitMarkdownRow(line) {
  const trimmed = line.trim();
  if (!trimmed.startsWith('|') || !trimmed.endsWith('|')) return null;
  return trimmed.slice(1, -1).split('|');
}

function isSeparatorRow(cells) {
  return cells.every((cell) => /^:?-{3,}:?$/.test(cell.trim()));
}

function countSourceRows(text) {
  const lines = text.split(/\r?\n/);
  let rows = 0;
  for (let i = 0; i < lines.length; i += 1) {
    const header = splitMarkdownRow(lines[i]);
    const separator = i + 1 < lines.length ? splitMarkdownRow(lines[i + 1]) : null;
    if (!header || !separator || !isSeparatorRow(separator)) continue;
    let j = i + 2;
    for (; j < lines.length; j += 1) {
      const row = splitMarkdownRow(lines[j]);
      if (!row) break;
      if (!isSeparatorRow(row)) rows += 1;
    }
    i = j - 1;
  }
  return rows;
}

function countArchiveRows(text) {
  return (text.match(/\n\s{6}\[\n\s{8}"/g) ?? []).length;
}

function extractImportedObjects(text, startMarker, endMarker) {
  const start = text.indexOf(startMarker);
  const end = text.indexOf(endMarker);
  if (start < 0 || end < 0 || end <= start) return [];
  const block = text.slice(start, end);
  const objects = [];
  const objectRegex = /\{\s*[\s\S]*?\n\s*\},/g;
  let match;
  while ((match = objectRegex.exec(block))) {
    objects.push(match[0]);
  }
  return objects;
}

function getProp(objectText, prop) {
  const double = new RegExp(`${prop}:\\s*"([\\s\\S]*?)"[,\\n]`).exec(objectText);
  if (double) return double[1];
  const single = new RegExp(`${prop}:\\s*'([\\s\\S]*?)'[,\\n]`).exec(objectText);
  if (single) return single[1];
  return '';
}

function main() {
  const mdFiles = fs.readdirSync(sourceDir)
    .filter((name) => name.toLowerCase().endsWith('.md'))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }));
  const sourceRows = mdFiles.reduce((sum, name) => sum + countSourceRows(read(path.join(sourceDir, name))), 0);
  const archiveRows = countArchiveRows(read(archivePath));

  const lessonStats = [];
  const issues = [];
  let importedVocab = 0;
  let importedGrammar = 0;
  const supplementalGrammar = (read(supplementalGrammarPath).match(/\n\s{2}\{\n\s{4}pattern:/g) ?? []).length;

  for (let lesson = 6; lesson <= 25; lesson += 1) {
    const lessonFile = path.join(lessonDir, `lesson-${String(lesson).padStart(2, '0')}.ts`);
    const text = read(lessonFile);
    const vocabObjects = extractImportedObjects(text, 'BEGIN_IMPORTED_MINNA_N4_MD', 'END_IMPORTED_MINNA_N4_MD');
    const grammarObjects = extractImportedObjects(text, 'BEGIN_IMPORTED_MINNA_N4_GRAMMAR_MD', 'END_IMPORTED_MINNA_N4_GRAMMAR_MD');
    importedVocab += vocabObjects.length;
    importedGrammar += grammarObjects.length;
    lessonStats.push({ lesson, vocab: vocabObjects.length, grammar: grammarObjects.length });

    for (const [idx, objectText] of vocabObjects.entries()) {
      for (const prop of ['japanese', 'kana', 'vietnamese', 'english', 'type']) {
        if (!getProp(objectText, prop)) issues.push(`lesson-${lesson}: vocab ${idx + 1} missing ${prop}`);
      }
      const type = getProp(objectText, 'type');
      if (type && !validTypes.has(type)) issues.push(`lesson-${lesson}: vocab ${idx + 1} invalid type ${type}`);
    }

    for (const [idx, objectText] of grammarObjects.entries()) {
      for (const prop of ['pattern', 'vietnamese', 'english', 'type', 'explanation']) {
        if (!getProp(objectText, prop)) issues.push(`lesson-${lesson}: grammar ${idx + 1} missing ${prop}`);
      }
    }
  }

  if (sourceRows !== archiveRows) {
    issues.push(`source/archive row mismatch: source=${sourceRows}, archive=${archiveRows}`);
  }

  const missingLessons = lessonStats.filter((item) => item.vocab === 0);
  for (const item of missingLessons) {
    issues.push(`lesson-${item.lesson} has no imported vocabulary`);
  }

  const summary = {
    sourceFiles: mdFiles.length,
    sourceRows,
    archiveRows,
    importedVocab,
    importedGrammar,
    supplementalGrammar,
    lessonsWithImportedVocab: lessonStats.filter((item) => item.vocab > 0).length,
    lessonsWithImportedGrammar: lessonStats.filter((item) => item.grammar > 0).length,
    issues
  };

  const auditBlock = [
    '',
    '## Verification run',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    `- Source markdown rows counted independently: ${sourceRows}`,
    `- Archived rows counted from generated source archive: ${archiveRows}`,
    `- Imported vocabulary/kanji items in lessons 06–25: ${importedVocab}`,
    `- Imported lesson grammar items: ${importedGrammar}`,
    `- Imported supplemental N4 grammar items: ${supplementalGrammar}`,
    `- Lessons with imported vocabulary: ${summary.lessonsWithImportedVocab}/20`,
    `- Lessons with imported grammar: ${summary.lessonsWithImportedGrammar}/20`,
    `- Verification issues: ${issues.length}`,
    '',
    issues.length ? issues.map((issue) => `- ${issue}`).join('\n') : 'No verification issues found.',
    ''
  ].join('\n');
  fs.appendFileSync(auditAppendPath, auditBlock, 'utf8');

  console.log(JSON.stringify(summary, null, 2));
  if (issues.length) process.exit(1);
}

main();

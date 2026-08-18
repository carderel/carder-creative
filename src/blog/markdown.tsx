// Minimal markdown-subset renderer for blog posts. Zero dependencies.
// Supports: frontmatter block, # / ## / ### headings, paragraphs, - and 1. lists,
// | tables, --- rules, **bold**, *em*, and [links](...). It is a pure function of
// the source string (no Date.now(), no randomness), so the SSR prerender and
// client hydration always produce identical markup.

import type { ReactNode } from 'react';

// Draft copy uses spaced-hyphen dashes ("word  -  word"); normalize them to a
// real em dash. List markers are safe: they sit at line start (preceded by \n,
// not a space), so / +- +/ never matches them.
function normalizeDashes(text: string): string {
  return text.replace(/ +- +/g, ' — ');
}

// Strips the leading `---\n...\n---` frontmatter block, returning the body.
export function stripFrontmatter(raw: string): string {
  const match = raw.match(/^---\n[\s\S]*?\n---\n/);
  return match ? raw.slice(match[0].length) : raw;
}

const LINK_CLASS =
  'text-neon-cyan underline decoration-neon-cyan/40 underline-offset-4 hover:text-white transition-colors';

// Inline markdown: **bold**, *em*, [text](url). Bold/em/link text is parsed
// recursively so combinations like **[link](...)** render correctly.
const INLINE_TOKEN = /\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;

// Exported so non-blog copy (e.g. the service pages' AI-connection paragraph) can
// carry [text](url) links without a second link-rendering implementation.
export function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(INLINE_TOKEN)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const key = `${keyPrefix}-${i++}`;
    if (m[1] !== undefined) {
      out.push(
        <strong key={key} className="text-white font-bold">
          {renderInline(m[1], key)}
        </strong>
      );
    } else if (m[2] !== undefined) {
      out.push(
        <em key={key}>{renderInline(m[2], key)}</em>
      );
    } else {
      const href = m[4];
      const external = /^https?:/.test(href);
      out.push(
        <a
          key={key}
          href={href}
          className={LINK_CLASS}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {renderInline(m[3], key)}
        </a>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function isTableSeparator(line: string): boolean {
  return /^\|[\s|:-]+\|$/.test(line);
}

function splitTableRow(line: string): string[] {
  return line.replace(/^\|/, '').replace(/\|$/, '').split('|').map((cell) => cell.trim());
}

export interface ParsedArticle {
  /** Text of the article's first `# ` heading (rendered by the page as its single H1). */
  title: string;
  /** The rendered article body (everything after the H1). */
  nodes: ReactNode[];
}

// Parses a raw .md source (frontmatter + body) into the H1 title and the
// rendered body. Pure: same string in, same tree out, on server and client.
export function parseArticle(raw: string): ParsedArticle {
  const body = normalizeDashes(stripFrontmatter(raw));
  const lines = body.split('\n');

  let title = '';
  const nodes: ReactNode[] = [];
  let para: string[] = [];
  let list: string[] | null = null;
  let listOrdered = false;
  let table: string[][] | null = null;
  let key = 0;

  const flushPara = () => {
    if (para.length === 0) return;
    const text = para.join(' ');
    para = [];
    const k = `p-${key++}`;
    nodes.push(
      <p key={k} className="text-slate-300 text-base font-medium leading-relaxed mb-6">
        {renderInline(text, k)}
      </p>
    );
  };

  const flushList = () => {
    if (!list) return;
    const items = list;
    const ordered = listOrdered;
    list = null;
    const k = `l-${key++}`;
    const itemNodes = items.map((item, idx) => (
      <li key={`${k}-${idx}`}>{renderInline(item, `${k}-${idx}`)}</li>
    ));
    const listClass =
      'pl-6 space-y-3 mb-6 text-slate-300 text-base font-medium leading-relaxed marker:text-neon-cyan';
    nodes.push(
      ordered ? (
        <ol key={k} className={`list-decimal ${listClass} marker:font-bold`}>{itemNodes}</ol>
      ) : (
        <ul key={k} className={`list-disc ${listClass}`}>{itemNodes}</ul>
      )
    );
  };

  const flushTable = () => {
    if (!table || table.length === 0) {
      table = null;
      return;
    }
    const [header, ...rows] = table;
    table = null;
    const k = `t-${key++}`;
    nodes.push(
      <div key={k} className="overflow-x-auto mb-6 border border-white/10">
        <table className="w-full text-left text-sm border-collapse">
          <thead>
            <tr>
              {header.map((cell, idx) => (
                <th
                  key={`${k}-h-${idx}`}
                  scope="col"
                  className="p-4 font-black text-white uppercase tracking-tight text-xs bg-white/5 border border-white/10"
                >
                  {renderInline(cell, `${k}-h-${idx}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rIdx) => (
              <tr key={`${k}-r-${rIdx}`}>
                {row.map((cell, cIdx) => (
                  <td
                    key={`${k}-r-${rIdx}-${cIdx}`}
                    className="p-4 text-slate-400 font-medium align-top border border-white/10"
                  >
                    {renderInline(cell, `${k}-r-${rIdx}-${cIdx}`)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const flushAll = () => {
    flushPara();
    flushList();
    flushTable();
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line === '') {
      flushAll();
      continue;
    }
    if (line.startsWith('|')) {
      flushPara();
      flushList();
      if (isTableSeparator(line)) continue;
      table = table ?? [];
      table.push(splitTableRow(line));
      continue;
    }
    flushTable();
    if (line === '---') {
      flushPara();
      flushList();
      nodes.push(<hr key={`hr-${key++}`} className="border-white/10 my-12" />);
      continue;
    }
    if (line.startsWith('### ')) {
      flushAll();
      const k = `h3-${key++}`;
      nodes.push(
        <h3 key={k} className="text-xl font-black text-white uppercase tracking-tight mt-10 mb-4">
          {renderInline(line.slice(4), k)}
        </h3>
      );
      continue;
    }
    if (line.startsWith('## ')) {
      flushAll();
      const k = `h2-${key++}`;
      nodes.push(
        <h2 key={k} className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tighter mt-14 mb-6">
          {renderInline(line.slice(3), k)}
        </h2>
      );
      continue;
    }
    if (line.startsWith('# ')) {
      flushAll();
      // First H1 becomes the page title; the page renders it as its single <h1>.
      if (title === '') {
        title = line.slice(2);
      }
      continue;
    }
    if (line.startsWith('- ')) {
      flushPara();
      flushTable();
      if (list && listOrdered) flushList();
      list = list ?? [];
      listOrdered = false;
      list.push(line.slice(2));
      continue;
    }
    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      flushPara();
      flushTable();
      if (list && !listOrdered) flushList();
      list = list ?? [];
      listOrdered = true;
      list.push(orderedMatch[1]);
      continue;
    }
    flushList();
    para.push(line);
  }
  flushAll();

  return { title, nodes };
}

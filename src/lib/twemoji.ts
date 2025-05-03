/**
 * Modified version of https://unpkg.com/twemoji@13.1.0/dist/twemoji.esm.js.
 */

/*! Copyright Twitter Inc. and other contributors. Licensed under MIT */

const U200D = String.fromCharCode(8205);
const UFE0Fg = /\uFE0F/g;

export function getIconCode(char: string): string {
  return toCodePoint(char.indexOf(U200D) < 0 ? char.replace(UFE0Fg, '') : char);
}

function toCodePoint(unicodeSurrogates: string): string {
  const r = [];
  let c = 0,
    p = 0,
    i = 0;

  while (i < unicodeSurrogates.length) {
    c = unicodeSurrogates.charCodeAt(i++);
    if (p) {
      r.push((65536 + ((p - 55296) << 10) + (c - 56320)).toString(16));
      p = 0;
    } else if (55296 <= c && c <= 56319) {
      p = c;
    } else {
      r.push(c.toString(16));
    }
  }
  return r.join('-');
}

export const apis = {
  twemoji: (code: string) =>
    'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/' +
    code.toLowerCase() +
    '.svg',
  openmoji: 'https://cdn.jsdelivr.net/npm/@svgmoji/openmoji@2.0.0/svg/',
  blobmoji: 'https://cdn.jsdelivr.net/npm/@svgmoji/blob@2.0.0/svg/',
  noto: 'https://cdn.jsdelivr.net/gh/svgmoji/svgmoji/packages/svgmoji__noto/svg/',
  fluent: (code: string) =>
    'https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/' +
    code.toLowerCase() +
    '_color.svg',
  fluentFlat: (code: string) =>
    'https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/' +
    code.toLowerCase() +
    '_flat.svg',
};

// Simple in-memory cache for fetched emoji SVGs
const emojiCache: Record<string, Promise<string>> = {};

export async function loadEmoji(type: keyof typeof apis, code: string): Promise<string> {
  const key = type + ':' + code;
  if (key in emojiCache) {
    return emojiCache[key];
  }

  if (!type || !apis[type]) {
    type = 'twemoji'; // Default to twemoji
  }

  const api = apis[type];
  let url: string;
  if (typeof api === 'function') {
    url = api(code);
  } else {
    url = `${api}${code.toUpperCase()}.svg`;
  }

  // Fetch and cache the promise
  emojiCache[key] = fetch(url)
    .then(async (r) => {
      if (!r.ok) {
        throw new Error(`Failed to fetch emoji: ${r.status} ${r.statusText}`);
      }
      const svgText = await r.text();
      // Return as base64 data URI
      return `data:image/svg+xml;base64,${Buffer.from(svgText).toString('base64')}`;
    })
    .catch(error => {
      console.error(`Error loading emoji ${key}:`, error);
      delete emojiCache[key]; // Remove failed promise from cache
      throw error; // Re-throw error
    });

  return emojiCache[key];
} 
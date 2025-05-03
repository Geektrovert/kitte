import { getIconCode, loadEmoji } from "./twemoji";

// From Vercel OG examples
// @TODO: Add more languages as needed
export const languageFontMap: Record<string, string | string[]> = {
  "ja-JP": "Noto Sans JP",
  "ko-KR": "Noto Sans KR",
  "zh-CN": "Noto Sans SC",
  "zh-TW": "Noto Sans TC",
  "zh-HK": "Noto Sans HK",
  "th-TH": "Noto Sans Thai",
  "bn-IN": "Noto Sans Bengali",
  "ar-AR": "Noto Sans Arabic",
  "ta-IN": "Noto Sans Tamil",
  "ml-IN": "Noto Sans Malayalam",
  "he-IL": "Noto Sans Hebrew",
  "te-IN": "Noto Sans Telugu",
  devanagari: "Noto Sans Devanagari",
  kannada: "Noto Sans Kannada",
  symbol: ["Noto Sans Symbols", "Noto Sans Symbols 2"],
  math: "Noto Sans Math",
  unknown: "Noto Sans", // Default fallback
};

// Simple cache for font fetches
const assetCache: Map<string, Promise<ArrayBuffer | string>> = new Map();

async function fetchFontSubset(
  text: string,
  fontFamily: string
): Promise<ArrayBuffer | undefined> {
  const key = `font:${fontFamily}:${text}`;
  if (assetCache.has(key)) {
    return assetCache.get(key) as Promise<ArrayBuffer>;
  }

  const API = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    fontFamily
  )}&text=${encodeURIComponent(text)}`;

  const fetchPromise = fetch(API, {
    headers: {
      // Use a user agent that requests TTF/OTF
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    },
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch font CSS: ${response.statusText}`);
      }
      const css = await response.text();

      // Extract the font URL from the CSS
      const resource = css.match(/src: url\((.+?)\)/);
      if (!resource || !resource[1]) {
        throw new Error("Could not find font URL in Google Fonts CSS");
      }
      const url = resource[1];
      return fetch(url);
    })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch font file: ${response.statusText}`);
      }
      return response.arrayBuffer();
    })
    .catch(error => {
      console.error(`Error fetching font subset ${key}:`, error);
      assetCache.delete(key); // Remove failed promise from cache
      // Return undefined or throw, depending on desired behavior
      return undefined;
    });

  assetCache.set(key, fetchPromise as Promise<ArrayBuffer | string>);
  return fetchPromise;
}

export async function loadAdditionalAsset(
  code: string,
  text: string
): Promise<ArrayBuffer | string | undefined> {
  // Handle Emoji
  if (code === "emoji") {
    const key = `emoji:${text}`;
    if (assetCache.has(key)) {
      return assetCache.get(key) as Promise<string>;
    }
    try {
      const iconCode = getIconCode(text);
      // Use twemoji by default, could make this configurable
      const emojiPromise = loadEmoji('twemoji', iconCode);
      assetCache.set(key, emojiPromise);
      return emojiPromise;
    } catch (error) {
      console.error(`Failed to load emoji for text "${text}":`, error);
      assetCache.delete(key);
      return undefined;
    }
  }

  // Handle Font
  const fontFamily = languageFontMap[code];
  if (fontFamily) {
    // Google Fonts expects '+' instead of spaces for family names
    const googleFontFamily = Array.isArray(fontFamily)
      ? fontFamily[0].replace(/ /g, "+")
      : fontFamily.replace(/ /g, "+");
    return fetchFontSubset(text, googleFontFamily);
  }

  console.warn(`Unsupported language code for Satori asset loading: ${code}`);
  return undefined;
} 
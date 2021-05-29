import { Extractor } from "./extractor";
import VibeExtractor from "./vibe-extractor";

enum ProviderType {
  INVALID = "No provider",
  VIBE = "Naver Vibe",
}

const urlToProvider = new Map<string, ProviderType>([
  ["https://vibe.naver.com/library/tracks", ProviderType.VIBE], // 보관함 -> 노래
  ["https://vibe.naver.com/mylist", ProviderType.VIBE], // 보관함 -> 플레이리스트 -> custom list
  ["https://vibe.naver.com/playlist", ProviderType.VIBE], // 보관함 -> 플레이리스트 -> vibe list
]);

function detectProvider(url: string): ProviderType {
  for (const [whitelist, type] of urlToProvider) {
    if (url.match(whitelist)) {
      return type;
    }
  }
  return ProviderType.INVALID;
}

function createExtractor(type: ProviderType): Extractor {
  switch (type) {
    case ProviderType.VIBE:
      return new VibeExtractor();
    case ProviderType.INVALID:
      throw new Error("Unsupported provider type " + type);
  }
}

export {ProviderType, detectProvider, createExtractor};
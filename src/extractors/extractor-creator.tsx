import { Extractor, ProviderType } from "../models";

import { VibeExtractor, vibeWhiteList } from "./vibe-extractor";

const vibeList: Array<[string, ProviderType]> = vibeWhiteList.map(it => [it, ProviderType.VIBE]);

const urlToProvider = new Map<string, ProviderType>([
  ...vibeList,
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

export { detectProvider, createExtractor };
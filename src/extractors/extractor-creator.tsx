import { Extractor, ProviderType } from "../models";

import { vibeWhiteList, VibeExtractor } from "./vibe";

const vibeList: Array<[string, ProviderType]> = vibeWhiteList.map(it => [it, ProviderType.VIBE]);
const whiteListToProvider = new Map<string, ProviderType>([
  ...vibeList,
]);

function detectProvider(url: string): ProviderType {
  for (const [whitelist, type] of whiteListToProvider) {
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
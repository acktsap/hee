import { Song, Extractor } from '../../models';

import { customListTargetUrl, CustomListExtractor } from './custom-list-extractor';
import { likedListTargetUrl, LikedListExtractor } from './liked-list-extractor';
import { vibeProvidedListTargetUrl, VibeProvidedListExtractor  }from './vibe-provided-list-extractor';

const extractors = new Map<string, Extractor>(
  [
    [ customListTargetUrl, new CustomListExtractor() ],
    [ likedListTargetUrl, new LikedListExtractor() ],
    [ vibeProvidedListTargetUrl, new VibeProvidedListExtractor() ],
  ]
);

class VibeExtractor implements Extractor {

  async extract(url: string): Promise<Song[]> {
    for (const [whiteList, extractor] of extractors) {
      if (url.match(whiteList.toString())) {
        return extractor.extract(url);
      }
    }

    throw new Error(`Extract for ${url} is not supported`);
  }
}

const vibeWhiteList = Array.from(extractors.keys());

export { VibeExtractor, vibeWhiteList };
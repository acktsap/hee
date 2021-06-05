import { Song, Extractor } from '../../models';

// 보관함 -> 플레이리스트 -> vibe list
const targetUrl = "https://vibe.naver.com/playlist";

class VibeProvidedListExtractor implements Extractor {

  async extract(url: string): Promise<Song[]> {
    console.log("VibeProvidedListExtractor " + url);

    return [];
  }
}

export { targetUrl as vibeProvidedListTargetUrl, VibeProvidedListExtractor };
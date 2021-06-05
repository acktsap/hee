import { Song, Extractor } from '../../models';

// 보관함 -> 플레이리스트 -> custom list
const targetUrl = "https://vibe.naver.com/mylist";

class CustomListExtractor implements Extractor {

  async extract(url: string): Promise<Song[]> {
    console.log("CustomListExtractor " + url);

    return [];
  }
}

export { targetUrl as customListTargetUrl, CustomListExtractor };
import { Song, Extractor } from '../models';

enum WhiteList {
  LIKED_LISTS = "https://vibe.naver.com/library/tracks", // 보관함 -> 노래
  CUSTOM_LIST = "https://vibe.naver.com/mylist", // 보관함 -> 플레이리스트 -> custom list
  VIBE_LIST = "https://vibe.naver.com/playlist", // 보관함 -> 플레이리스트 -> vibe list
}

class VibeExtractor implements Extractor {
  extract(url: string): Array<Song> {
    console.log("VibeExtractor extract " + url);

    // TODO

    return [];
  }
}

const vibeWhiteList = Object.values(WhiteList);

export { VibeExtractor, vibeWhiteList };
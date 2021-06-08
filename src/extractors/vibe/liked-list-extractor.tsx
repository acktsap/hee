import { Song, Extractor } from '../../models';

import { parseResponse } from './decoder';
import type { VibeResponse } from './vibe-model';

// 보관함 -> 노래
const targetUrl = "https://vibe.naver.com/library/tracks";
const apiBaseUrl = "https://apis.naver.com/vibeWeb/musicapiweb/myMusic/myLike/tracks";
const displaySize = 100;

class LikedListExtractor implements Extractor {

  async extract(url: string): Promise<Song[]> {
    if (!url.match(targetUrl)) {
      throw new Error(`Url is not match (expected: ${targetUrl}, actual: ${url}`);
    }

    const allSongs: Song[] = [];

    let start = 1;
    while (true) {
      const response = await this.request(start);

      const body = response.body ?? (() => { throw new Error(`No body (response code: ${response.status})`); })();

      const reader = body.getReader();
      const result = await parseResponse(reader);
      const vibeResponse: VibeResponse = JSON.parse(result);

      const tracks = vibeResponse.response.result.tracks;
      if (tracks.length === 0) {
        break;
      }

      start += tracks.length;

      const songs: Song[] = tracks.map(it => {
        return {
          title: it.trackTitle,
          artist: it.artists[0].artistName,
          album: it.album.albumTitle,
        };
      });
      allSongs.push(...songs);
    }

    return allSongs;
  }

  private async request(start: number): Promise<globalThis.Response> {
    const params = new URLSearchParams([
      ["start", start.toString()],
      ["display", displaySize.toString()],
    ]);

    const requestUrl = `${apiBaseUrl}?${params}`;
    const response = await fetch(requestUrl, {
        credentials: "include",
        headers: {
          "Accept": "application/json",
        },
        method: "GET",
        mode: "cors",
      }
    );

    return response;
  }

}

export { targetUrl as likedListTargetUrl, LikedListExtractor };
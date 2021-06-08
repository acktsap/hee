import { Song, Extractor } from '../../models';

import { parseResponse } from './decoder';
import type { CustomListAllResponse } from './vibe-model';

// 보관함 -> 플레이리스트 -> custom list
const targetUrl = "https://vibe.naver.com/mylist";
const apiBaseUrl = "https://apis.naver.com/vibeWeb/musicapiweb/myMusic/myAlbum";
const displaySize = 100;

class CustomListExtractor implements Extractor {

  async extract(url: string): Promise<Song[]> {
    if (!url.match(targetUrl)) {
      throw new Error(`Url is not match (expected: ${targetUrl}, actual: ${url}`);
    }

    const allSongs: Song[] = [];

    // TODO: elegant parsing
    const listId = url.substring(targetUrl.length);
    let start = 1;
    while (true) {
      const response = await this.request(listId, start);

      const body = response.body ?? (() => { throw new Error(`No body (response code: ${response.status})`); })();

      const reader = body.getReader();
      const result = await parseResponse(reader);
      const vibeResponse: CustomListAllResponse = JSON.parse(result);

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

  private async request(listId: string, start: number): Promise<globalThis.Response> {
    const params = new URLSearchParams([
      ["start", start.toString()],
      ["display", displaySize.toString()],
    ]);

    const requestUrl = `${apiBaseUrl}/${listId}/tracks?${params}`;
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

export { targetUrl as customListTargetUrl, CustomListExtractor };
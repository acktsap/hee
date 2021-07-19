import { Song, Extractor } from '../../models';

import { parseResponse } from './decoder';
import type { VibeListAllResponse } from './vibe-model';

// 보관함 -> 플레이리스트 -> custom list
const targetUrl = "https://vibe.naver.com/playlist";
const apiBaseUrl = "https://apis.naver.com/vibeWeb/musicapiweb/vibe/v3/playlist";
const displaySize = 100;

class VibeProvidedListExtractor implements Extractor {

  async extract(url: string): Promise<Song[]> {
    if (!url.match(targetUrl)) {
      throw new Error(`Url is not match (expected: ${targetUrl}, actual: ${url}`);
    }

    const allSongs: Song[] = [];

    // TODO: elegant parsing
    const listId = url.substring(targetUrl.length);

    const response = await this.request(listId);

    const body = response.body ?? (() => { throw new Error(`No body (response code: ${response.status})`); })();

    const reader = body.getReader();
    const result = await parseResponse(reader);
    const vibeResponse: VibeListAllResponse = JSON.parse(result);
    const tracks = vibeResponse.response.result.playlist.tracks;

    const songs: Song[] = tracks.map(it => {
      return {
        title: it.trackTitle,
        artist: it.artists[0].artistName,
        album: it.album.albumTitle,
      };
    });
    allSongs.push(...songs);

    return allSongs;
  }

  private async request(listId: string): Promise<globalThis.Response> {
    const requestUrl = `${apiBaseUrl}/${listId}`;
    const response = await fetch(requestUrl, {
        credentials: "include",
        headers: {
          "Accept": "application/json; charset=utf-8"
        },
        method: "GET",
        mode: "cors",
      }
    );

    return response;
  }

}

export { targetUrl as vibeProvidedListTargetUrl, VibeProvidedListExtractor };
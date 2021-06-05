import { Song, Extractor } from '../../models';

import type { VibeResponse } from './vibe-model';

// 보관함 -> 노래
const targetUrl = "https://vibe.naver.com/library/tracks"; 
const apiUrl = "https://apis.naver.com/vibeWeb/musicapiweb/myMusic/myLike/tracks";
const displaySize = 100;

class LikedListExtractor implements Extractor {

  async extract(url: string): Promise<Song[]> {
    const allSongs: Song[] = [];

    let start = 1;
    while (true) {
      const response = await this.request(start);

      const body = response.body ?? (() => { throw new Error(`No body (response code: ${response.status})`); })();

      const reader = body.getReader();
      const result = await this.parseResponse(reader);
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
    const fullUrl = apiUrl + "?" + new URLSearchParams([
      ["start", start.toString()],
      ["display", displaySize.toString()],
    ]);

    const response = await fetch(fullUrl, {
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

  private async parseResponse(reader: ReadableStreamDefaultReader): Promise<string> {
    let result = "";

    const decoder = new TextDecoder();
    while (true) {
      const rawResponse = await reader.read();
      if (rawResponse.done) {
        break;
      }

      const decoded = decoder.decode(rawResponse.value);
      result += decoded;
    }

    return result;
  }
}

export { targetUrl as likedListTargetUrl, LikedListExtractor };
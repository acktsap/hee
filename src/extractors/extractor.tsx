interface Song {
  title: string;
  artist: string;
  album: string;
}

interface Extractor {
  extract(url: string): Array<Song>
}

export type {Song, Extractor};
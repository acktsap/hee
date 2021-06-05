interface Song {
  title: string;
  artist: string;
  album: string;
}

interface Extractor {
  extract(url: string): Promise<Song[]>
}

export type { Song, Extractor };
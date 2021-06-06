import { Song } from './song';

interface Extractor {
  extract(url: string): Promise<Song[]>
}

export type { Extractor };
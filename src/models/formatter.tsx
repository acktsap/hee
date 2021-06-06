import { Song } from './song';

interface Formatter {
  format(songs: Song[]): Blob
}

export type { Formatter };
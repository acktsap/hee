import { Formatter, Song } from '../models';

class CsvFormatter implements Formatter {

  format(songs: Song[]): Blob {
    const category = [ "title", "artist", "album" ];
    const items = songs
      .map(song => [ song["title"], song["artist"], song["album"] ])
      .map(item => item.map(it => `"${it}"`)); // to prevent ',' in item from recognizing as a seperator

    const csv = [ category, ...items ]
      .map(item => item.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });

    return blob;
  }

}

export { CsvFormatter };
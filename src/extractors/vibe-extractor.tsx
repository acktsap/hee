import {Song, Extractor} from './extractor';

class VibeExtractor implements Extractor {
  extract(url: string): Array<Song> {
    console.log("VibeExtractor extract " + url);

    // TODO

    return [];
  }
}

export default VibeExtractor;
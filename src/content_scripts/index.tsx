import { detectProvider, createExtractor } from '../extractors';

// FIXME: 이렇게 하는게 최선은 아닌거 같음
browser.runtime.onMessage.addListener((request: any, sender: any, response: any) => {
  if (request.command === "detect") {
    const url = request.url;
    const providerType = detectProvider(url);

    response(providerType);
  } else if (request.command === "extract") {
    const type = request.type;
    const url = request.url;

    const extractor = createExtractor(type);
    const songs = extractor.extract(url);

    response(songs);
  } else {
    console.error("Invalid command " + request.command);
  }

});
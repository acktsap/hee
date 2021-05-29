import {Song, Extractor, ProviderType, detectProvider, createExtractor} from '../extractors';

// FIXME: 이렇게 하는게 최선은 아닌거 같음
browser.runtime.onMessage.addListener((request: any, sender: any, response: any) => {
  let result;
  if (request.command === "detect") {
    const url = request.url;
    result = detectProvider(url);
  } else if (request.command === "extract") {
    const type = request.type;
    const url = request.url;

    const extractor = createExtractor(type);
    result = extractor.extract(url);
  } else {
    console.error("Invalid command " + request.command);
  }

  response(result);
});
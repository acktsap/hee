import { detectProvider, createExtractor } from '../extractors';

// FIXME: remove any

async function dispatchRequest(request: any): Promise<any> {
  let result;

  if (request.command === "detect") {
    result = detectProvider(request.url);
  } else if (request.command === "extract") {
    const extractor = createExtractor(request.type);
    result = await extractor.extract(request.url);
  } else {
    throw new Error("Invalid command " + request.command);
  }

  return result;
}

browser.runtime.onMessage.addListener((request: any, sender: any, response: any) => {
  const result = (async () => await dispatchRequest(request))();
  response(result);
});
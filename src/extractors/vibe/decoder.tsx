async function parseResponse(reader: ReadableStreamDefaultReader): Promise<string> {
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

export { parseResponse };
import { parseDefinition } from "./parseDefinition";

export async function lookup(word, queue) {
    const url = new URL("api/v1/search/words", "https://jisho.org");
    url.searchParams.append("keyword", word);
    const data = await queue.add(url);
    return parseDefinition(data);
};
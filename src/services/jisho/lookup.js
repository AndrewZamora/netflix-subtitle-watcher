export async function lookup(word) {
    const url = new URL("api/v1/search/words", "https://jisho.org");
    url.searchParams.append("keyword", word);
    const response = await fetch(url.toString());
    if (response.ok) {
        return await response.json();
    } else {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
};
export function tokenizeText(text) {
    const segmenter = new Intl.Segmenter("ja-JP", { granularity: "word" });
    const segments = segmenter.segment(text);
    return Array.from(segments);
}
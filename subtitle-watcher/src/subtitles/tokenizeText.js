export function tokenizeText(text) {
    const segmenter = new Intl.Segmenter("ja", { granularity: "word" });
    return [...segmenter.segment(text)].map(segment => segment.segment);
}
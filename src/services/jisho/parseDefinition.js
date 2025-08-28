export function parseDefinition(data) {
    const definition = { reading: '', english: '' };
    if (data.data && data.data[0]) {
        const { japanese, senses } = data.data[0];
        definition.reading = japanese[0]["reading"];
        definition.english = senses[0]['english_definitions'].join(";") + ';';
    }
    console.log({ definition })
    return definition;
}
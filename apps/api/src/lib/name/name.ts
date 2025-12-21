interface NameObject {
    firstName: {
        legal: string,
        preferred?: string | null
    },
    middleName?: string | null,
    lastName: string
}

export function getShortName(
    name: NameObject
): string {
    const initial = (value?: string | null) => value?.charAt(0) ?? ""

    return `${initial(name.firstName.legal)}${initial(name.middleName)} ${name.lastName}`
}

export function getSlug(
    name: string
): string {
    const segmenter = new Intl.Segmenter([], { granularity: 'word' });
    const segmentedText = segmenter.segment(name);
    const words = [...segmentedText].filter(s => s.isWordLike).map(s => s.segment);

    return words.join("-")
}
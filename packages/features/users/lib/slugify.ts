export function slugify(
    text: string
): string {
    const slug = text.split(' ').join("-").toLowerCase();
    return slug;
}
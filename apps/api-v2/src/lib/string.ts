export const slugify = (originalString: string) =>
  originalString
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

export const removeSpecialCharacters = (originalString: string) =>
  originalString
    .trim()
    .replace(/[^a-zA-Z0-9\s+]/g, '')
    .replace(/\s+/g, ' ');

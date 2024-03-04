export function uniqueSortedList(items) {
    return [...new Set(items)].sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base', ignorePunctuation: true }));
}

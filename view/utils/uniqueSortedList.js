// Retourne une liste triée sans doublons des éléments fournis
export function uniqueSortedList(items) {
    let uniqueItems = [];
    for (let i = 0; i < items.length; i++) {
        if (!uniqueItems.includes(items[i])) {
            uniqueItems.push(items[i]);
        }
    }
    uniqueItems.sort((a, b) => a.localeCompare(b, "fr", { sensitivity: "base", ignorePunctuation: true }));
    return uniqueItems;
}

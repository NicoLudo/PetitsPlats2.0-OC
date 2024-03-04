// Fonction pour capitaliser la première lettre d'un texte et mettre le reste en minuscules
export function capitalizeText(text) {
    let result = "";

    for (let i = 0; i < text.length; i++) {
        if (i === 0) {
            result += text[i].toUpperCase();
        } else {
            result += text[i].toLowerCase();
        }
    }

    return result;
}

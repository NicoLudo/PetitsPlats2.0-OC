class SearchBar {
    constructor(placeholder, oFilterManager) {
        this.placeholder = placeholder;
        this.oFilterManager = oFilterManager;
        this.DOMElement = this.createSearchBar(); // Création de l'élément DOM de la barre de recherche
    }

    // Méthode pour créer la barre de recherche et ses composants
    createSearchBar() {
        const searchBarDiv = document.createElement("div");
        searchBarDiv.className = "search-bar";

        const searchInput = this.createInput();

        const searchButton = this.createButton();

        searchBarDiv.appendChild(searchInput);
        searchBarDiv.appendChild(searchButton);

        return searchBarDiv;
    }

    // Méthode pour créer l'input de recherche
    createInput() {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = this.placeholder;
        input.className = "search-input";
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                this.oFilterManager.filter();
            }
        });
        return input;
    }

    // Méthode pour créer le bouton de recherche
    createButton() {
        const button = document.createElement("button");
        button.className = "search-button";
        button.innerHTML = "&#128269;"; // Symbole de loupe
        button.addEventListener("click", () => {
            this.oFilterManager.filter();
        });
        return button;
    }
}

export default SearchBar;

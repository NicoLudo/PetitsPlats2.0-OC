class SearchBar {
    constructor(placeholder, oFilterManager) {
        this.placeholder = placeholder;
        this.oFilterManager = oFilterManager;
        this.DOMElement = this.createSearchBar(); // Création de l'élément DOM de la barre de recherche
        this.addListeners(); // Active les écouteurs d'événements
    }

    // Méthode pour créer la barre de recherche et ses composants
    createSearchBar() {
        const searchBarDiv = document.createElement("div");
        searchBarDiv.className = "search-bar";

        const searchInput = this.createInput();
        const searchButton = this.createButton();
        const clearButton = this.createClearButton();

        searchBarDiv.appendChild(searchInput);
        searchBarDiv.appendChild(searchButton);
        searchBarDiv.appendChild(clearButton);

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
        button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>`; // Symbole de loupe
        button.addEventListener("click", () => {
            this.oFilterManager.filter();
        });
        return button;
    }

    // Méthode pour le bouton d'effacement
    createClearButton() {
        const clearButton = document.createElement("button");
        clearButton.className = "search-bar-clear";
        clearButton.innerHTML = "&times;"; // Symbole de croix
        clearButton.addEventListener("click", () => {
            const input = this.DOMElement.querySelector(".search-input");
            input.value = "";
            input.focus();
            this.oFilterManager.filter();
        });
        return clearButton;
    }

    // Écouteurs d'événements pour le fonctionnement interactif
    addListeners() {
        const input = this.DOMElement.querySelector(".search-input");
        const clearButton = this.DOMElement.querySelector(".search-bar-clear");

        input.addEventListener("input", () => {
            clearButton.classList.toggle("search-clear--active", input.value.length > 0);
        });
    }
}

export default SearchBar;

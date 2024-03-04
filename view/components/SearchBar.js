class SearchBar {
    constructor(placeholder, oFilterManager) {
        this.placeholder = placeholder;
        this.oFilterManager = oFilterManager;
        this.DOMElement = this.createSearchBar(); // Création de l'élément DOM de la barre de recherche
        this.addListeners(); // Activation des écouteurs d'événements
    }

    // Méthode pour créer la barre de recherche et ses composants
    createSearchBar() {
        const searchBarDiv = document.createElement("div");
        searchBarDiv.className = "search-bar";

        // Création et ajout des composants de la barre de recherche
        const components = [this.createInput(), this.createButton(), this.createClearButton()];
        for (let i = 0; i < components.length; i++) {
            searchBarDiv.appendChild(components[i]);
        }

        return searchBarDiv;
    }

    // Méthode pour créer l'input de recherche
    createInput() {
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = this.placeholder;
        input.className = "search-input";
        return input;
    }

    // Méthode pour créer le bouton de recherche
    createButton() {
        return this.createButtonWithIcon("search-button", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>`);
    }

    // Méthode pour créer le bouton d'effacement
    createClearButton() {
        return this.createButtonWithIcon("search-bar-clear", "&times;");
    }

    // Méthode pour créer un bouton avec un icône (utilisée pour éviter la répétition de code)
    createButtonWithIcon(className, innerHTML) {
        const button = document.createElement("button");
        button.className = className;
        button.innerHTML = innerHTML;
        return button;
    }

    // Écouteurs d'événements pour le fonctionnement interactif
    addListeners() {
        const input = this.DOMElement.querySelector(".search-input");
        const clearButton = this.DOMElement.querySelector(".search-bar-clear");

        clearButton.addEventListener("click", () => {
            input.value = "";
            input.focus();
            clearButton.classList.remove("search-clear--active");
            this.oFilterManager.filter();
        });

        input.addEventListener("input", () => {
            const isActive = input.value.length > 0;
            clearButton.classList.toggle("search-clear--active", isActive);
            this.oFilterManager.filter();
        });
    }
}

export default SearchBar;

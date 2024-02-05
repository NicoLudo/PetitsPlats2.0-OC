class SearchBar {
    constructor(placeholder, oFilterManager) {
        this.placeholder = placeholder;
        this.oFilterManager = oFilterManager;
        this.DOMElement = this.createSearchBar();
    }

    // Crée la barre de recherche
    createSearchBar() {
        const searchBarDiv = document.createElement("div");
        searchBarDiv.className = "search-bar";

        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.placeholder = this.placeholder;
        searchInput.className = "search-input";

        const searchButton = document.createElement("button");
        searchButton.className = "search-button";
        searchButton.innerHTML = "&#128269;";

        searchBarDiv.appendChild(searchInput);
        searchBarDiv.appendChild(searchButton);

        return searchBarDiv;
    }
}

export default SearchBar;

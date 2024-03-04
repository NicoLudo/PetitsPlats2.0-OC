class Dropdown {
    static currentOpenDropdown = null; // Suivi du dropdown actuellement ouvert

    constructor(label, contents, oFilterManager) {
        this.label = label;
        this.contents = contents;
        this.selectedItems = [];
        this.DOMElement = this.createDropdown(); // Création du dropdown
        this.oFilterManager = oFilterManager;
        this.initializeDropdown();
        this.addListeners();
    }

    // Prépare le dropdown pour l'affichage
    initializeDropdown() {
        this.updateDropdownItems();
    }

    // Crée le bouton du dropdown
    createDropdownButton(label) {
        const dropbtnDiv = document.createElement("div");
        dropbtnDiv.className = "dropbtn";

        const span = document.createElement("span");
        span.textContent = label;
        dropbtnDiv.appendChild(span);

        const arrowIcon = document.createElement("i");
        arrowIcon.className = "arrow";
        dropbtnDiv.appendChild(arrowIcon);

        return dropbtnDiv;
    }

    // Crée la boîte de recherche
    createSearchBox() {
        const searchBoxDiv = document.createElement("div");
        searchBoxDiv.className = "search-box";

        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.className = "dropdown-search";
        searchBoxDiv.appendChild(searchInput);

        const clearButton = document.createElement("button");
        clearButton.className = "search-clear";
        clearButton.textContent = "×";
        searchBoxDiv.appendChild(clearButton);

        return searchBoxDiv;
    }

    // Crée et retourne les éléments de la liste déroulante initiale
    createDropdownItems(contents) {
        const dropdownItemsDiv = document.createElement("div");
        dropdownItemsDiv.className = "dropdown-items";

        contents.forEach(content => {
            if (!this.selectedItems.includes(content)) {
                const itemSpan = document.createElement("span");
                itemSpan.textContent = content;
                itemSpan.className = "dropdown-item";
                itemSpan.addEventListener("click", () => this.addItemsToSelected(content));
                dropdownItemsDiv.appendChild(itemSpan);
            }
        });

        return dropdownItemsDiv;
    }

    // Crée la div pour les éléments sélectionnés
    createDropdownSelectedItems() {
        const selectedItemsDiv = document.createElement("div");
        selectedItemsDiv.className = "selected-items";
        return selectedItemsDiv;
    }

    // Ajoute un élément aux éléments sélectionnés
    addItemsToSelected(item) {
        if (!this.selectedItems.includes(item)) {
            this.selectedItems.push(item);
            this.refresh();
        }
    }

    // Supprime un élément des éléments sélectionnés
    removeItemFromSelected(item) {
        const index = this.selectedItems.indexOf(item);
        if (index > -1) {
            this.selectedItems.splice(index, 1);
            this.refresh();
        }
    }

    // Rafraîchit le dropdown
    refresh() {
        this.updateSelectedItemsDiv();
        this.updateDropdownItems();
        this.oFilterManager.filter();
    }

    // Rafraîchit uniquement le contenu
    updateContents() {
        this.updateDropdownItems();
    }

    // Met à jour l'affichage des éléments sélectionnés
    updateSelectedItemsDiv() {
        const updateDiv = (div) => {
            div.textContent = "";
            this.selectedItems.forEach(item => {
                const selectedItem = document.createElement("span");
                selectedItem.textContent = item;
                selectedItem.className = "selected-item";

                const deleteIcon = document.createElement("span");
                deleteIcon.textContent = "×";
                deleteIcon.className = "selecteditems-delete-icon";
                deleteIcon.onclick = () => this.removeItemFromSelected(item);
                selectedItem.appendChild(deleteIcon);

                div.appendChild(selectedItem);
            });
        };

        const selectedItemsDiv = this.DOMElement.querySelector(".selected-items");
        const selectedItemsParentDiv = this.DOMElement.closest(".parent-dropdown").querySelector(".selected-items-parent");
        updateDiv(selectedItemsDiv);
        updateDiv(selectedItemsParentDiv);
    }

    // Met à jour les items du dropdown
    updateDropdownItems() {
        const dropdownItemsDiv = this.DOMElement.querySelector(".dropdown-items") || document.createElement("div");
        dropdownItemsDiv.className = "dropdown-items";
        if (!dropdownItemsDiv.parentNode) {
            this.DOMElement.appendChild(dropdownItemsDiv);
        }
        dropdownItemsDiv.textContent = "";

        this.contents.forEach(content => {
            if (!this.selectedItems.includes(content)) {
                const span = document.createElement("span");
                span.textContent = content;
                span.className = "dropdown-item";
                span.addEventListener("click", () => this.addItemsToSelected(content));
                dropdownItemsDiv.appendChild(span);
            }
        });
    }

    // Assemble le dropdown complet
    createDropdown() {
        const dropdownParentDiv = document.createElement("div");
        dropdownParentDiv.className = "parent-dropdown";

        const dropdownDiv = document.createElement("div");
        dropdownDiv.className = "dropdown";

        dropdownDiv.appendChild(this.createDropdownButton(this.label));
        const dropdownContentDiv = document.createElement("div");
        dropdownContentDiv.className = "dropdown-content";
        dropdownContentDiv.appendChild(this.createSearchBox());
        dropdownContentDiv.appendChild(this.createDropdownSelectedItems());
        const dropdownItemsDiv = this.createDropdownItems(this.contents);
        dropdownContentDiv.appendChild(dropdownItemsDiv);

        dropdownDiv.appendChild(dropdownContentDiv);
        dropdownParentDiv.appendChild(dropdownDiv);

        const selectedItemsParentDiv = document.createElement("div");
        selectedItemsParentDiv.className = "selected-items-parent";
        dropdownParentDiv.appendChild(selectedItemsParentDiv);

        return dropdownParentDiv;
    }

    // Ajoute les écouteurs pour la dynamique du dropdown
    addListeners() {
        const dropdownButton = this.DOMElement.querySelector(".dropbtn");
        const dropdownContent = this.DOMElement.querySelector(".dropdown-content");
        const searchInput = this.DOMElement.querySelector(".dropdown-search");
        const clearButton = this.DOMElement.querySelector(".search-clear");

        // Change l'état d'affichage du dropdown
        dropdownButton.addEventListener("click", function (event) {
            event.stopPropagation();
            Dropdown.toggleDropdown(this, dropdownContent);
        });

        // Empêche la fermeture du dropdown lors d'un clic à l'intérieur
        dropdownContent.addEventListener("click", function (event) {
            event.stopPropagation();
        });

        // Filtre les éléments du dropdown basé sur la saisie
        searchInput.addEventListener("input", () => {
            Dropdown.filterDropdownItems(this, searchInput, clearButton);
        });

        // Efface le contenu de la recherche et rafraîchit les éléments affichés
        clearButton.addEventListener("click", () => {
            searchInput.value = "";
            searchInput.dispatchEvent(new Event("input"));
        });

        // Ferme le dropdown si un clic est détecté en dehors
        window.addEventListener("click", () => Dropdown.closeOpenDropdown(dropdownButton, dropdownContent));
    }

    // Méthodes statiques pour la gestion des interactions

    // Bascule l'affichage du contenu du dropdown
    static toggleDropdown(button, content) {
        if (Dropdown.currentOpenDropdown && Dropdown.currentOpenDropdown !== button) {
            Dropdown.currentOpenDropdown.classList.remove("dropdown-active");
            Dropdown.currentOpenDropdown.nextElementSibling.classList.remove("show-dropdown-content");
        }
        button.classList.toggle("dropdown-active");
        content.classList.toggle("show-dropdown-content");
        Dropdown.currentOpenDropdown = button.classList.contains("dropdown-active") ? button : null;
    }

    // Filtre les éléments du dropdown en fonction de la saisie
    static filterDropdownItems(instance, input, clearButton) {
        clearButton.classList.toggle("search-clear--active", input.value.length > 0);
        let contentToShow = instance.contents.filter(content => content.toLowerCase().includes(input.value.toLowerCase()));
        instance.DOMElement.querySelectorAll(".dropdown-item").forEach(item => {
            item.classList.toggle("dropdown-item--active", !contentToShow.includes(item.textContent));
        });
    }

    // Ferme le dropdown ouvert lors d'un clic en dehors de celui-ci
    static closeOpenDropdown(button, content) {
        if (button.classList.contains("dropdown-active")) {
            button.classList.remove("dropdown-active");
            content.classList.remove("show-dropdown-content");
        }
    }
}

export default Dropdown;

class Dropdown {
    constructor(label, contents, oFilterManager) {
        this.label = label;
        this.contents = contents;
        this.selectedItems = [];
        this.DOMElement = this.createDropdown(); // Création de l'élément DOM 
        this.oFilterManager = oFilterManager;
        this.inittializeDropdown();
        this.addListeners();
    }

    // Initialise le dropdown 
    inittializeDropdown() {
        this.updateDropdownItems();
    }

    // Crée les boutons dropdowns
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

    // Crée les boîtes de recherches dans les dropdowns
    createSearchBox() {
        const searchBoxDiv = document.createElement("div");
        searchBoxDiv.className = "search-box";

        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.className = "dropdown-search";
        searchBoxDiv.appendChild(searchInput);

        const clearButton = document.createElement("button");
        clearButton.className = "search-clear";
        clearButton.innerHTML = "&times;"; // Symbole de croix
        searchBoxDiv.appendChild(clearButton);

        return searchBoxDiv;
    }

    // Crée une div pour mettre les éléments sélectionnés sous la barre de recheche
    createDropdownSelectedItems() {
        const selectedItemsDiv = document.createElement("div");
        selectedItemsDiv.className = "selected-items";

        return selectedItemsDiv;
    }

    // Ajoute les éléments sélectionnés
    addItemsToSelected(item) {
        if (!this.selectedItems.includes(item)) {
            this.selectedItems.push(item);
            this.refresh();
        }
    }

    // Enlève un élément de la liste des éléments sélectionnés
    removeItemFromSelected(item) {
        const index = this.selectedItems.indexOf(item);
        if (index > -1) {
            this.selectedItems.splice(index, 1);
            this.refresh();
        }
    }

    // Met à jour après l'ajout ou la suppression
    refresh() {
        this.updateSelectedItemsDiv();
        this.updateDropdownItems();
        this.oFilterManager.filter()
    }

    // Met à jour les éléments sélectionnés dans l'UI
    updateSelectedItemsDiv() {
        const selectedItemsDiv = this.DOMElement.querySelector(".selected-items");
        const selectedItemsParentDiv = this.DOMElement.closest('.parent-dropdown').querySelector('.selected-items-parent');

        // Fonction pour mettre à jour les éléments sélectionnés
        const updateDiv = (div) => {
            div.innerHTML = "";
            this.selectedItems.forEach(item => {
                const selectedItem = document.createElement("span");
                selectedItem.textContent = item;
                selectedItem.className = "selected-item";

                const deleteIcon = document.createElement("span");
                deleteIcon.innerHTML = "&times;";
                deleteIcon.className = "selecteditems-delete-icon";
                deleteIcon.onclick = () => this.removeItemFromSelected(item);
                selectedItem.appendChild(deleteIcon);

                div.appendChild(selectedItem);
            });
        };

        updateDiv(selectedItemsDiv);
        updateDiv(selectedItemsParentDiv);
    }

    // Met à jour les éléments de la liste déroulante
    updateDropdownItems() {
        const dropdownItemsDiv = this.DOMElement.querySelector(".dropdown-items") || document.createElement("div");
        if (!dropdownItemsDiv.className) {
            dropdownItemsDiv.className = "dropdown-items";
            this.DOMElement.appendChild(dropdownItemsDiv);
        }
        dropdownItemsDiv.innerHTML = "";

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

    // Crée les éléments des dropdowns
    createDropdownItems(contents) {
        const dropdownItemsDiv = document.createElement("div");
        dropdownItemsDiv.className = "dropdown-items";

        const fragment = document.createDocumentFragment();
        contents.forEach(content => {
            const span = document.createElement("span");
            span.textContent = content;
            span.addEventListener("click", () => {
                this.addItemsToSelected(content);
            });
            fragment.appendChild(span);
        });
        dropdownItemsDiv.appendChild(fragment);

        return dropdownItemsDiv;
    }

    // Assemble les dropdowns complet
    createDropdown() {
        const dropdownParentDiv = document.createElement("div");
        dropdownParentDiv.className = "parent-dropdown";

        const dropdownDiv = document.createElement("div");
        dropdownDiv.className = "dropdown";

        const dropbtnDiv = this.createDropdownButton(this.label);
        dropdownDiv.appendChild(dropbtnDiv);

        const dropdownContentDiv = document.createElement("div");
        dropdownContentDiv.className = "dropdown-content";

        const searchBoxDiv = this.createSearchBox();
        dropdownContentDiv.appendChild(searchBoxDiv);

        const selectedItemsDiv = this.createDropdownSelectedItems();
        dropdownContentDiv.appendChild(selectedItemsDiv);

        const selectedItemsParentDiv = document.createElement("div");
        selectedItemsParentDiv.className = "selected-items-parent";

        const dropdownItemsDiv = this.createDropdownItems(this.contents);
        dropdownContentDiv.appendChild(dropdownItemsDiv);

        dropdownDiv.appendChild(dropdownContentDiv);
        dropdownParentDiv.appendChild(dropdownDiv);
        dropdownParentDiv.appendChild(selectedItemsParentDiv);

        return dropdownParentDiv;
    }

    // Les écouteurs d'événements pour le fonctionnement interactif des dropdowns
    addListeners() {
        const dropdownButton = this.DOMElement.querySelector(".dropbtn");
        const dropdownContent = this.DOMElement.querySelector(".dropdown-content");
        const searchInput = this.DOMElement.querySelector(".dropdown-search");
        const clearButton = this.DOMElement.querySelector(".search-clear");

        dropdownButton.addEventListener("click", function (event) {
            event.stopPropagation();
            this.classList.toggle("dropdown-active");
            dropdownContent.classList.toggle("show-dropdown-content");
        });

        dropdownContent.addEventListener("click", function (event) {
            event.stopPropagation();
        });

        window.addEventListener("click", () => {
            if (dropdownButton.classList.contains("dropdown-active")) {
                dropdownButton.classList.remove("dropdown-active");
                dropdownContent.classList.remove("show-dropdown-content");
            }
        });

        searchInput.addEventListener("input", () => {
            clearButton.classList.toggle("search-clear--active", searchInput.value.length > 0);
            let contentToShow = this.contents.filter(content => content.toLowerCase().includes(searchInput.value.toLowerCase()))
            this.DOMElement.querySelectorAll('.dropdown-item').forEach(item => {
                if (contentToShow.includes(item.textContent)) {
                    item.classList.remove('dropdown-item--active')
                } else {
                    item.classList.add('dropdown-item--active')
                }
            });
        });

        clearButton.addEventListener("click", () => {
            searchInput.value = "";
            searchInput.dispatchEvent(new Event("input"));
        });
    }
}

export default Dropdown;

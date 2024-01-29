class Dropdown {
    constructor(label, contents) {
        this.label = label
        this.contents = contents
        this.DOMElement = this.createDropdown()
        this.addListeners()
    }

    createDropdown() {

        // Créer le div principal 'dropdown'
        var dropdownDiv = document.createElement('div');
        dropdownDiv.className = 'dropdown';

        // Créer le div 'dropbtn'
        var dropbtnDiv = document.createElement('div');
        dropbtnDiv.className = 'dropbtn';

        // Ajouter le span 'Ingrédients' au 'dropbtn'
        var span = document.createElement('span');
        span.textContent = this.label;
        dropbtnDiv.appendChild(span);

        // Ajouter l'icône de flèche (i) au 'dropbtn'
        var arrowIcon = document.createElement('i');
        arrowIcon.className = 'arrow';
        dropbtnDiv.appendChild(arrowIcon);

        // Ajouter 'dropbtn' à 'dropdown'
        dropdownDiv.appendChild(dropbtnDiv);

        // Créer le div 'dropdown-content'
        var dropdownContentDiv = document.createElement('div');
        dropdownContentDiv.className = 'dropdown-content';

        // Créer le div 'search-box'
        var searchBoxDiv = document.createElement('div');
        searchBoxDiv.className = 'search-box';

        // Créer l'input de recherche
        var searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.className = 'dropdown-search';
        searchBoxDiv.appendChild(searchInput);

        // Créer le bouton pour effacer la recherche
        var clearButton = document.createElement('button');
        clearButton.className = 'search-clear';
        clearButton.innerHTML = '&times;';
        searchBoxDiv.appendChild(clearButton);

        // Ajouter 'search-box' à 'dropdown-content'
        dropdownContentDiv.appendChild(searchBoxDiv);

        // Créer le div pour les éléments déroulants
        var dropdownItemsDiv = document.createElement('div');
        dropdownItemsDiv.className = 'dropdown-items';

        const fragment = document.createDocumentFragment();
        this.contents.forEach(content => {
            const span = document.createElement("span");
            span.textContent = content;
            fragment.appendChild(span);
        });
        dropdownItemsDiv.appendChild(fragment)

        // Ajouter 'dropdown-items' à 'dropdown-content'
        dropdownContentDiv.appendChild(dropdownItemsDiv);

        // Ajouter 'dropdown-content' à 'dropdown'
        dropdownDiv.appendChild(dropdownContentDiv);

        return dropdownDiv
    }

    addListeners() {
        const dropdownButton = this.DOMElement.querySelector(".dropbtn");
        const dropdownContent = this.DOMElement.querySelector(".dropdown-content");
        const searchInput = this.DOMElement.querySelector(".dropdown-search");
        const clearButton = this.DOMElement.querySelector(".search-clear");

        // Ajoute un gestionnaire d'événement pour chaque bouton dropdown
        dropdownButton.addEventListener("click", function (event) {
            event.stopPropagation();
            this.classList.toggle("dropdown-active");
            this.nextElementSibling.classList.toggle("show-dropdown-content");
        });

        // Empêche la propagation du clic à l'intérieur du contenu du dropdown
        dropdownContent.addEventListener("click", function (event) {
            event.stopPropagation();
        });

        // Gestionnaire d'événement pour fermer tous les dropdowns quand on clique ailleurs
        window.addEventListener("click", function () {
            if (dropdownButton.classList.contains("dropdown-active")) {
                dropdownButton.classList.remove("dropdown-active");
                dropdownButton.nextElementSibling.classList.remove("show-dropdown-content");
            }
        });

        // Affiche ou supprime la croix dans le champs de recherche
        searchInput.addEventListener('input', () => {
            if (searchInput.value.length >= 0 && !clearButton.classList.contains('search-clear--active')) {
                clearButton.classList.add('search-clear--active')
            } else if (searchInput.value.length === 0 && clearButton.classList.contains('search-clear--active')) {
                clearButton.classList.remove('search-clear--active')
            }
        })

        // Gestion du clic sur la croix
        clearButton.addEventListener('click', function () {
            const input = clearButton.previousElementSibling;
            input.value = ''; // Efface le contenu de l'input
            input.dispatchEvent(new Event('input'));
        });

    }
}

export default Dropdown
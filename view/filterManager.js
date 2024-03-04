import { capitalizeText } from "./utils/capitalizeText.js";
import { uniqueSortedList } from "./utils/uniqueSortedList.js";

export default class FilterManager {
    constructor(oControllerRecipe) {
        this.oControllerRecipe = oControllerRecipe;
        this.oSearchbar = this.oIngredients = this.oAppliances = this.oUstensils = this.oRecipeCards = null;
    }

    // Fonction pour filtrer les recettes basées sur les critères de recherche et de sélection
    filter() {
        // Récupérer toutes les recettes
        let filteredRecipes = this.oControllerRecipe.getRecipes();

        // Filtrer par texte de recherche
        const searchText = this.oSearchbar?.DOMElement.querySelector(".search-input")?.value?.toLowerCase();
        if (searchText?.length >= 3) {
            filteredRecipes = filteredRecipes.filter(recipe =>
                recipe.name.toLowerCase().includes(searchText) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchText)) ||
                recipe.description.toLowerCase().includes(searchText)
            );
        }

        // Filtrer par ingrédients sélectionnés
        if (this.oIngredients?.selectedItems?.length) {
            const selectedIngredients = new Set(this.oIngredients.selectedItems.map(item => item.toLowerCase()));
            filteredRecipes = filteredRecipes.filter(recipe =>
                recipe.ingredients.some(ingredient => selectedIngredients.has(ingredient.ingredient.toLowerCase()))
            );
        }

        // Filtrer par appareils sélectionnés
        if (this.oAppliances?.selectedItems?.length) {
            const selectedAppliances = new Set(this.oAppliances.selectedItems.map(item => item.toLowerCase()));
            filteredRecipes = filteredRecipes.filter(recipe => selectedAppliances.has(recipe.appliance.toLowerCase()));
        }

        // Filtrer par ustensiles sélectionnés
        if (this.oUstensils?.selectedItems?.length) {
            const selectedUstensils = new Set(this.oUstensils.selectedItems.map(item => item.toLowerCase()));
            filteredRecipes = filteredRecipes.filter(recipe =>
                recipe.ustensils.some(ustensil => selectedUstensils.has(ustensil.toLowerCase()))
            );
        }

        // Mise à jour de l'affichage des recettes et des dropdowns
        this.updateRecipeDisplay(filteredRecipes);
        this.updateDropdownContents(filteredRecipes);
        this.updateCounter(filteredRecipes);
    }

    // Mise à jour de l'affichage des recettes filtrées
    updateRecipeDisplay(filteredRecipes) {
        const filteredIds = new Set(filteredRecipes.map(recipe => recipe.id));
        this.oRecipeCards.forEach(card => {
            const id = Number(card.getAttribute("data-id"));
            card.classList.toggle("recipe-card--active", filteredIds.has(id));
        });
    }

    // Mise à jour des dropdowns basés sur les recettes filtrées
    updateDropdownContents(filteredRecipes) {
        // Auxiliaire pour sécuriser la transformation en minuscules et appliquer la capitalisation
        const safeToLowerAndCapitalize = (item) => capitalizeText(item.toLowerCase());

        // Fonction pour mettre à jour les sets
        const updateSet = (recipes, key) => {
            switch (key) {
                case "ingredients":
                    return new Set(recipes.flatMap(recipe => recipe[key].map(ingredient => safeToLowerAndCapitalize(ingredient.ingredient))));
                case "appliance":
                    return new Set(recipes.map(recipe => safeToLowerAndCapitalize(recipe[key])));
                case "ustensils":
                    return new Set(recipes.flatMap(recipe => recipe[key].map(ustensil => safeToLowerAndCapitalize(ustensil))));
                default:
                    return new Set();
            }
        };

        // Mettre à jour et trier les listes
        this.oIngredients.contents = uniqueSortedList([...updateSet(filteredRecipes, "ingredients")]);
        this.oAppliances.contents = uniqueSortedList([...updateSet(filteredRecipes, "appliance")]);
        this.oUstensils.contents = uniqueSortedList([...updateSet(filteredRecipes, "ustensils")]);

        // Rafraîchir les dropdowns
        [this.oIngredients, this.oAppliances, this.oUstensils].forEach(dropdown => dropdown.updateContents());
    }

    // Rafraîchit le total des recettes
    updateCounter(filteredRecipes) {
        const counterNumber = document.querySelector("#counter-number");
        const counterLabel = document.querySelector("#counter-label");

        counterNumber.textContent = filteredRecipes.length;
        counterLabel.textContent = filteredRecipes.length <= 1 ? "recette" : "recettes";
    }
}

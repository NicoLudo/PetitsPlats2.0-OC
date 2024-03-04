import { capitalizeText } from "./utils/capitalizeText.js";
import { uniqueSortedList } from "./utils/uniqueSortedList.js";

export default class FilterManager {
    constructor(oControllerRecipe) {
        this.oControllerRecipe = oControllerRecipe;
        this.oSearchbar = this.oIngredients = this.oAppliances = this.oUstensils = this.oRecipeCards = null;
    }

    // Fonction pour filtrer les recettes basées sur les critères de recherche et de sélection
    filter() {
        let filteredRecipes = this.oControllerRecipe.getRecipes();

        const searchText = this.oSearchbar?.DOMElement.querySelector(".search-input")?.value?.toLowerCase();
        if (searchText?.length >= 3) {
            filteredRecipes = this.filterByText(filteredRecipes, searchText);
        }

        filteredRecipes = this.filterBySelection(filteredRecipes, this.oIngredients, "ingredient");
        filteredRecipes = this.filterBySelection(filteredRecipes, this.oAppliances, "appliance");
        filteredRecipes = this.filterBySelection(filteredRecipes, this.oUstensils, "ustensil");

        this.updateRecipeDisplay(filteredRecipes);
        this.updateDropdownContents(filteredRecipes);
        this.updateCounter(filteredRecipes);
    }

    // Fonction pour filtrer les recettes par texte
    filterByText(recipes, searchText) {
        return recipes.filter(recipe =>
            recipe.name.toLowerCase().includes(searchText) ||
            recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchText)) ||
            recipe.description.toLowerCase().includes(searchText)
        );
    }

    // Fonction pour filtrer les recettes par sélection (ingrédients, appareils, ustensiles)
    filterBySelection(recipes, selection, type) {
        if (!selection?.selectedItems?.length) return recipes;

        const selectedItems = new Set(selection.selectedItems.map(item => item.toLowerCase()));
        return recipes.filter(recipe => {
            if (type === "ingredient") {
                return recipe.ingredients.some(ingredient => selectedItems.has(ingredient.ingredient.toLowerCase()));
            } else if (type === "appliance") {
                return selectedItems.has(recipe.appliance.toLowerCase());
            } else if (type === "ustensil") {
                return recipe.ustensils.some(ustensil => selectedItems.has(ustensil.toLowerCase()));
            }
        });
    }

    // Mise à jour de l'affichage des recettes filtrées
    updateRecipeDisplay(filteredRecipes) {
        const filteredIds = new Set(filteredRecipes.map(recipe => recipe.id));
        for (const card of this.oRecipeCards) {
            const id = Number(card.getAttribute("data-id"));
            card.classList.toggle("recipe-card--active", filteredIds.has(id));
        }
    }

    // Mise à jour des dropdowns basés sur les recettes filtrées
    updateDropdownContents(filteredRecipes) {
        const safeToLowerAndCapitalize = (item) => capitalizeText(item.toLowerCase());

        const updateSet = (recipes, key) => {
            const items = new Set();
            for (const recipe of recipes) {
                if (key === "ingredients") {
                    recipe[key].forEach(ingredient => items.add(safeToLowerAndCapitalize(ingredient.ingredient)));
                } else if (key === "appliance" || key === "ustensils") {
                    if (key === "appliance") {
                        items.add(safeToLowerAndCapitalize(recipe[key]));
                    } else {
                        recipe[key].forEach(ustensil => items.add(safeToLowerAndCapitalize(ustensil)));
                    }
                }
            }
            return items;
        };

        this.oIngredients.contents = uniqueSortedList([...updateSet(filteredRecipes, "ingredients")]);
        this.oAppliances.contents = uniqueSortedList([...updateSet(filteredRecipes, "appliance")]);
        this.oUstensils.contents = uniqueSortedList([...updateSet(filteredRecipes, "ustensils")]);

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

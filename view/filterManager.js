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
        this.displayNoRecipesMessage(filteredRecipes);
    }

    // Fonction pour filtrer les recettes par texte
    filterByText(recipes, searchText) {
        const filteredRecipes = [];
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const nameMatch = recipe.name.toLowerCase().includes(searchText);
            let ingredientMatch = false;
            for (let j = 0; j < recipe.ingredients.length; j++) {
                if (recipe.ingredients[j].ingredient.toLowerCase().includes(searchText)) {
                    ingredientMatch = true;
                    break; // Sort de la boucle si un ingrédient correspond
                }
            }
            const descriptionMatch = recipe.description.toLowerCase().includes(searchText);
            if (nameMatch || ingredientMatch || descriptionMatch) {
                filteredRecipes.push(recipe);
            }
        }
        return filteredRecipes;
    }

    // Fonction pour filtrer les recettes par sélection (ingrédients, appareils, ustensiles)
    filterBySelection(recipes, selection, type) {
        if (!selection?.selectedItems?.length) return recipes;
        const selectedItems = new Set(selection.selectedItems.map(item => item.toLowerCase()));
        const filteredRecipes = [];
        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            let matchesSelection = false;
            if (type === "ingredient") {
                let matchCount = 0;
                for (let j = 0; j < recipe.ingredients.length; j++) {
                    if (selectedItems.has(recipe.ingredients[j].ingredient.toLowerCase())) {
                        matchCount++;
                    }
                }
                matchesSelection = matchCount === selectedItems.size;
            } else if (type === "appliance") {
                matchesSelection = selectedItems.has(recipe.appliance.toLowerCase());
            } else if (type === "ustensil") {
                let matchCount = 0;
                for (let j = 0; j < recipe.ustensils.length; j++) {
                    if (selectedItems.has(recipe.ustensils[j].toLowerCase())) {
                        matchCount++;
                    }
                }
                matchesSelection = matchCount === selectedItems.size;
            }
            if (matchesSelection) {
                filteredRecipes.push(recipe);
            }
        }
        return filteredRecipes;
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

    // Affiche un message si aucune recette n'est trouvée
    displayNoRecipesMessage(filteredRecipes) {
        const recipeContainer = document.querySelector("#rC-Recipes");

        let noRecipesMessage = recipeContainer.querySelector("p.no-recipes");
        if (noRecipesMessage) {
            recipeContainer.removeChild(noRecipesMessage);
        }

        if (filteredRecipes.length === 0) {
            noRecipesMessage = document.createElement("p");
            noRecipesMessage.classList.add("no-recipes");
            noRecipesMessage.textContent = "Aucune recettes trouvées.";
            recipeContainer.appendChild(noRecipesMessage);
        }
    }
}

import RecipeCard from "./components/RecipeCard.js";

export default class FilterManager {
    constructor(oControllerRecipe) {
        this.oControllerRecipe = oControllerRecipe;
        this.oSearchbar = null;
        this.oIngredients = null;
        this.oAppliances = null;
        this.oUstensils = null;
        this.oRecipeCards = null;
    }

    filter() {
        // Récupère toutes les recettes
        let filteredRecipes = this.oControllerRecipe.getRecipes();

        // Filtre par la barre de recherche si du texte est entré
        if (this.oSearchbar && this.oSearchbar.DOMElement.querySelector(".search-input").value.length > 0) {
            const searchText = this.oSearchbar.DOMElement.querySelector(".search-input").value.toLowerCase();
            filteredRecipes = filteredRecipes.filter(recipe =>
                recipe.name.toLowerCase().includes(searchText) ||
                recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase().includes(searchText)) ||
                recipe.description.toLowerCase().includes(searchText) ||
                recipe.appliance.toLowerCase().includes(searchText) ||
                recipe.ustensils.some(ustensil => ustensil.toLowerCase().includes(searchText))
            );
        }

        // Filtre par les ingrédients sélectionnés
        if (this.oIngredients && this.oIngredients.selectedItems.length > 0) {
            filteredRecipes = filteredRecipes.filter(recipe =>
                this.oIngredients.selectedItems.every(selectedItem =>
                    recipe.ingredients.some(ingredient => ingredient.ingredient.toLowerCase() === selectedItem.toLowerCase())
                )
            );
        }

        // Filtre par les appareils sélectionnés
        if (this.oAppliances && this.oAppliances.selectedItems.length > 0) {
            filteredRecipes = filteredRecipes.filter(recipe =>
                this.oAppliances.selectedItems.some(selectedAppliance =>
                    recipe.appliance.toLowerCase() === selectedAppliance.toLowerCase())
            );
        }

        // Filtre par les ustensiles sélectionnés
        if (this.oUstensils && this.oUstensils.selectedItems.length > 0) {
            filteredRecipes = filteredRecipes.filter(recipe =>
                this.oUstensils.selectedItems.every(selectedUstensil =>
                    recipe.ustensils.some(ustensil => ustensil.toLowerCase() === selectedUstensil.toLowerCase())
                )
            );
        }

        this.updateRecipeDisplay(filteredRecipes);
    }

    // Crée et ajoute les cartes de recettes filtrées
    updateRecipeDisplay(filteredRecipes) {
        const rCRecipes = document.querySelector("#rC-Recipes");
        rCRecipes.innerHTML = "";

        const fragment = document.createDocumentFragment();
        filteredRecipes.forEach(recipe => {
            const oCard = new RecipeCard(
                recipe.name,
                recipe.image,
                recipe.time,
                recipe.description,
                recipe.ingredients,
                recipe.appliance
            );
            fragment.appendChild(oCard.DOMElement);
        });
        rCRecipes.appendChild(fragment);
    }
}

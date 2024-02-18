import recipes from "../database/recipes.json" assert {type: "json"};

class ModelRecipe {
    constructor() {
        this.recipes = null;
        this.ingredients = null;
        this.appliances = null;
        this.ustensils = null;

        this.refreshAll();
    }

    refreshAll() {
        this.refreshRecipes();
        this.refreshIngredients();
        this.refreshAppliances();
        this.refreshUstensils();
    }

    refreshRecipes() {
        this.recipes = recipes.recipes;
    }

    capitalizeText(text) {
        return text.toLowerCase().split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    }

    uniqueSortedList(items) {
        return [...new Set(items)].sort((a, b) => a.localeCompare(b, 'fr', { sensitivity: 'base', ignorePunctuation: true }));
    }

    refreshIngredients() {
        let allIngredients = [];

        recipes.recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                let ingredientName = this.capitalizeText(ingredient.ingredient);
                allIngredients.push(ingredientName);
            });
        });

        this.ingredients = this.uniqueSortedList(allIngredients);
    }

    refreshAppliances() {
        let allAppliances = [];

        recipes.recipes.forEach(recipe => {
            let applianceName = this.capitalizeText(recipe.appliance);
            allAppliances.push(applianceName);
        });

        this.appliances = this.uniqueSortedList(allAppliances);
    }

    refreshUstensils() {
        let allUstensils = [];

        recipes.recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
                let ustensilName = this.capitalizeText(ustensil);
                allUstensils.push(ustensilName);
            });
        });

        this.ustensils = this.uniqueSortedList(allUstensils);
    }
}

export default ModelRecipe;

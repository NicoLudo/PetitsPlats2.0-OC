import recipes from "../database/recipes.json" assert {type: "json"};
import { capitalizeText } from "../view/utils/capitalizeText.js";
import { uniqueSortedList } from "../view/utils/uniqueSortedList.js";

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

    refreshIngredients() {
        let allIngredients = [];

        recipes.recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                let ingredientName = capitalizeText(ingredient.ingredient);
                allIngredients.push(ingredientName);
            });
        });

        this.ingredients = uniqueSortedList(allIngredients);
    }

    refreshAppliances() {
        let allAppliances = [];

        recipes.recipes.forEach(recipe => {
            let applianceName = capitalizeText(recipe.appliance);
            allAppliances.push(applianceName);
        });

        this.appliances = uniqueSortedList(allAppliances);
    }

    refreshUstensils() {
        let allUstensils = [];

        recipes.recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
                let ustensilName = capitalizeText(ustensil);
                allUstensils.push(ustensilName);
            });
        });

        this.ustensils = uniqueSortedList(allUstensils);
    }
}

export default ModelRecipe;

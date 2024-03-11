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

    // Rafraîchit toutes les données
    refreshAll() {
        this.refreshRecipes();
        this.refreshIngredients();
        this.refreshAppliances();
        this.refreshUstensils();
    }

    // Met à jour la liste des recettes
    refreshRecipes() {
        this.recipes = recipes.recipes;
    }

    // Met à jour la liste des ingrédients en évitant les répétitions
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

    // Met à jour la liste des appareils en évitant les répétitions
    refreshAppliances() {
        let allAppliances = [];

        recipes.recipes.forEach(recipe => {
            let applianceName = capitalizeText(recipe.appliance);
            allAppliances.push(applianceName);
        });

        this.appliances = uniqueSortedList(allAppliances);
    }

    // Met à jour la liste des ustensiles en évitant les répétitions
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

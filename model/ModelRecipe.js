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

    refreshIngredients() {
        let allIngredients = [];

        recipes.recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                allIngredients.push(ingredient.ingredient);
            });
        });

        allIngredients = [...new Set(allIngredients)];
        allIngredients.sort();

        this.ingredients = allIngredients;
    }

    refreshAppliances() {
        let allAppliancesSet = new Set();

        recipes.recipes.forEach(recipe => {
            allAppliancesSet.add(recipe.appliance);
        });

        this.appliances = Array.from(allAppliancesSet).sort();
    }

    refreshUstensils() {
        let allUstensils = [];

        recipes.recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
                allUstensils.push(ustensil);
            });
        });

        allUstensils = [...new Set(allUstensils)];
        allUstensils.sort();

        this.ustensils = allUstensils;
    }
}

export default ModelRecipe;

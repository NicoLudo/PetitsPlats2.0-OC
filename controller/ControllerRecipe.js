import ModelRecipes from "../model/ModelRecipe.js";

class ControllerRecipe {
    constructor() {
        // Création d'une instance de ModelRecipes à la construction du contrôleur pour éviter la répétition de la création de l'instance dans chaque méthode
        this.oRecipes = new ModelRecipes();
    }

    // Méthode pour obtenir les recettes
    getRecipes() {
        return this.oRecipes.recipes;
    }

    // Méthode pour obtenir les ingrédients
    getIngredients() {
        return this.oRecipes.ingredients;
    }

    // Méthode pour obtenir les appareils
    getAppliances() {
        return this.oRecipes.appliances;
    }

    // Méthode pour obtenir les ustensiles
    getUstensils() {
        return this.oRecipes.ustensils;
    }
}

export default ControllerRecipe;

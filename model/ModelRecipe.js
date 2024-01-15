import recipes from "../database/recipes.json"

class ModelRecipe {

    constructor() {
        this.recipes = []
        this.ingredients = []
        this.appliances = []
        this.ustensils = []

        this.refreshAll()
    }

    refreshAll() {
        this.refreshRecipes()
        this.refreshIngredients()
        this.refreshAppliances()
        this.refreshUstensils()
    }

    refreshRecipes() {
        this.recipes = recipes
    }

    refreshIngredients() {
        this.ingredients = recipes.ingredients
    }

    refreshAppliances() {
        this.appliances = recipes.appliances
    }

    refreshUstensils() {
        this.ustensils = recipes.ustensils
    }

}
import ModelRecipes from "./model/ModelRecipe.js"

class ControllerRecipe {

    getRecipes() {
        let oRecipes = new ModelRecipes()
        return oRecipes.recipes
    }

    getIngredients() {
        let oRecipes = new ModelRecipes()
        return oRecipes.ingredients
    }

    getAppliances() {
        let oRecipes = new ModelRecipes()
        return oRecipes.appliances
    }

    getUstensils() {
        let oRecipes = new ModelRecipes()
        return oRecipes.ustensils
    }

}
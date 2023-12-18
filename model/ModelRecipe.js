class ModelRecipe {
    constructor() {
        this.recipes = [];
    }

    async loadRecipes() {
        try {
            const response = await fetch("./database/recipes.json");
            const data = await response.json();
            this.recipes = data.recipes;
        } catch (error) {
            console.error("Erreur lors du chargement des recettes: ", error);
        }
    }

    getAllRecipes() {
        return this.recipes;
    }
}

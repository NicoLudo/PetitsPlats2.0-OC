class ControllerRecipe {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    async initialize() {
        await this.model.loadRecipes();
        this.view.displayRecipes(this.model.getAllRecipes());
    }
}

class ViewRecipe {
    constructor() {
        this.container = document.getElementById('recipeContainer');
    }

    displayRecipes(recipes) {
        this.container.innerHTML = '';
        const fragment = document.createDocumentFragment();
        recipes.forEach(recipe => {
            const recipeEl = document.createElement('div');
            recipeEl.innerHTML = `<h2>${recipe.name}</h2><p>${recipe.description}</p>`;
            fragment.appendChild(recipeEl);
        });
        this.container.appendChild(fragment);
    }
}

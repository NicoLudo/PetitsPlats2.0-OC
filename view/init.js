import ControllerRecipe from "../controller/ControllerRecipe.js";
import RecipeCard from "./components/RecipeCard.js";
import Dropdown from "./components/Dropdown.js";

export default function () {
    let oControllerRecipe = new ControllerRecipe();

    /* RECIPE DISPLAY */
    let allRecipes = oControllerRecipe.getRecipes();
    const rCRecipes = document.querySelector("#rC-Recipes");

    const fragment = document.createDocumentFragment();
    allRecipes.forEach(recipe => {
        const oCard = new RecipeCard(
            recipe.name,
            recipe.image,
            recipe.time,
            recipe.description,
            recipe.ingredients
        );
        fragment.appendChild(oCard.DOMElement);
    });
    rCRecipes.appendChild(fragment);

    /* FILTERS DISPLAY */
    const dropdownIngredients = new Dropdown('Ingrédients', oControllerRecipe.getIngredients())
    const dropdownAppliances = new Dropdown('Appareils', oControllerRecipe.getAppliances())
    const dropdownUstensils = new Dropdown('Ustensils', oControllerRecipe.getUstensils())

    document.querySelector('#rC-Sorting').appendChild(dropdownIngredients.DOMElement)
    document.querySelector('#rC-Sorting').appendChild(dropdownAppliances.DOMElement)
    document.querySelector('#rC-Sorting').appendChild(dropdownUstensils.DOMElement)

}
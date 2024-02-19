import ControllerRecipe from "../controller/ControllerRecipe.js";
import RecipeCard from "./components/RecipeCard.js";
import Dropdown from "./components/Dropdown.js";
import SearchBar from "./components/SearchBar.js";
import FilterManager from "./filterManager.js";

let oControllerRecipe = new ControllerRecipe();
let oFilterManager = new FilterManager(oControllerRecipe);

/* RECIPE DISPLAY */
let allRecipes = oControllerRecipe.getRecipes();
const rCRecipes = document.querySelector("#rC-Recipes");

let recipes = []
allRecipes.forEach(recipe => {
    const oCard = new RecipeCard(
        recipe.id,
        recipe.name,
        recipe.image,
        recipe.time,
        recipe.description,
        recipe.ingredients
    );
    rCRecipes.appendChild(oCard.DOMElement);
    recipes.push(oCard.DOMElement);
});
oFilterManager.oRecipeCards = recipes;

/* FILTERS DISPLAY */
const dropdownIngredients = new Dropdown('Ingrédients', oControllerRecipe.getIngredients(), oFilterManager);
const dropdownAppliances = new Dropdown('Appareils', oControllerRecipe.getAppliances(), oFilterManager);
const dropdownUstensils = new Dropdown('Ustensils', oControllerRecipe.getUstensils(), oFilterManager);

document.querySelector('#rC-Sorting').appendChild(dropdownIngredients.DOMElement);
document.querySelector('#rC-Sorting').appendChild(dropdownAppliances.DOMElement);
document.querySelector('#rC-Sorting').appendChild(dropdownUstensils.DOMElement);

oFilterManager.oIngredients = dropdownIngredients;
oFilterManager.oAppliances = dropdownAppliances;
oFilterManager.oUstensils = dropdownUstensils;

/* SEARCH BAR DISPLAY */
const searchBar = new SearchBar("Rechercher une recette, un ingrédient, etc...", oFilterManager);
document.querySelector("#hC-SB-SearchBar").appendChild(searchBar.DOMElement);

oFilterManager.oSearchbar = searchBar;

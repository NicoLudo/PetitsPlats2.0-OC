import ControllerRecipe from "../controller/ControllerRecipe.js";
import RecipeCard from "./components/RecipeCard.js";
import Dropdown from "./components/Dropdown.js";
import SearchBar from "./components/SearchBar.js";
import FilterManager from "./filterManager.js";

// Initialisation du contrôleur de recettes et du gestionnaire de filtres
let oControllerRecipe = new ControllerRecipe();
let oFilterManager = new FilterManager(oControllerRecipe);

/* AFFICHAGE DES RECETTES */
let allRecipes = oControllerRecipe.getRecipes();
const rCRecipes = document.querySelector("#rC-Recipes");

// Boucle pour créer et afficher chaque carte de recette
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
// Stockage des cartes de recettes dans le gestionnaire de filtres
oFilterManager.oRecipeCards = recipes;

/* AFFICHAGE DES FILTRES */
// Fonction pour ajouter un Dropdown au DOM
function addDropdownToDOM(type, getter, oFilterManager, selector) {
    const dropdown = new Dropdown(type, getter.call(oControllerRecipe), oFilterManager);
    document.querySelector(selector).appendChild(dropdown.DOMElement);
    return dropdown;
}

// Ajout des Dropdowns pour les ingrédients, appareils et ustensiles
const dropdownIngredients = addDropdownToDOM("Ingrédients", oControllerRecipe.getIngredients, oFilterManager, "#rC-Sorting");
const dropdownAppliances = addDropdownToDOM("Appareils", oControllerRecipe.getAppliances, oFilterManager, "#rC-Sorting");
const dropdownUstensils = addDropdownToDOM("Ustensils", oControllerRecipe.getUstensils, oFilterManager, "#rC-Sorting");

// Stockage des Dropdowns dans le gestionnaire de filtres
oFilterManager.oIngredients = dropdownIngredients;
oFilterManager.oAppliances = dropdownAppliances;
oFilterManager.oUstensils = dropdownUstensils;

/* AFFICHAGE DE LA BARRE DE RECHERCHE */
// Création et ajout de la barre de recherche au DOM
const searchBar = new SearchBar("Rechercher une recette, un ingrédient, etc...", oFilterManager);
document.querySelector("#hC-SB-SearchBar").appendChild(searchBar.DOMElement);

// Stockage de la barre de recherche dans le gestionnaire de filtres
oFilterManager.oSearchbar = searchBar;

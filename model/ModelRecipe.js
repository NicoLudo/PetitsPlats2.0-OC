import recipes from "../database/recipes.json" assert {type: "json"};
import { capitalizeText } from "../view/utils/capitalizeText.js";
import { uniqueSortedList } from "../view/utils/uniqueSortedList.js";

class ModelRecipe {
    constructor() {
        this.recipes = null;
        this.ingredients = null;
        this.appliances = null;
        this.ustensils = null;

        this.refreshAll();
    }

    // Rafraîchit toutes les données
    refreshAll() {
        this.refreshRecipes();
        this.refreshIngredients();
        this.refreshAppliances();
        this.refreshUstensils();
    }

    // Met à jour la liste des recettes
    refreshRecipes() {
        this.recipes = recipes.recipes;
    }

    // Met à jour la liste des ingrédients en évitant les répétitions
    refreshIngredients() {
        this.ingredients = this.getUniqueItems("ingredients", item => item.ingredient);
    }

    // Met à jour la liste des appareils en évitant les répétitions
    refreshAppliances() {
        this.appliances = this.getUniqueItems("appliance", item => item.appliance);
    }

    // Met à jour la liste des ustensiles en évitant les répétitions
    refreshUstensils() {
        this.ustensils = this.getUniqueItems("ustensils", item => item);
    }

    // Fonction générique pour obtenir une liste triée et unique d'éléments à partir des recettes, en fonction du type d'élément spécifié
    getUniqueItems(property, accessor) {
        let allItems = [];
        for (let i = 0; i < recipes.recipes.length; i++) {
            const recipe = recipes.recipes[i];
            if (property === "ingredients" || property === "ustensils") {
                for (let j = 0; j < recipe[property].length; j++) {
                    const item = recipe[property][j];
                    allItems.push(capitalizeText(accessor(item)));
                }
            } else {
                allItems.push(capitalizeText(accessor(recipe)));
            }
        }
        return uniqueSortedList(allItems);
    }
}

export default ModelRecipe;

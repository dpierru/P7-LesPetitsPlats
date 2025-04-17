// Import de la constante recipe du fichier recipes.js
import { recipes } from '../data/recipes.js';

/**
 * Cette classe a pour but de récupérer les infos. 
 */
export default class Model {
    constructor() {
        this.recipes = recipes;
    }

    /**
     * Récupère la liste des recettes
     * @returns {Array} La liste des recettes
     */
    getRecipes() {
        return this.recipes;
    }

    getUstensil(recipeList) {
        let ustensils = [];
        for (let recipe of recipeList) {
            for (let ustensil of recipe.ustensils) {
                // On met tout en minuscule pour éviter les doublons, 
                let currentUstensil = ustensil.toLowerCase();
                // On met la première lettre en majuscule
                currentUstensil = currentUstensil.charAt(0).toUpperCase() + currentUstensil.slice(1);
                if (!ustensils.includes(currentUstensil)) {
                    ustensils.push(currentUstensil);
                }
            }
        }
        return ustensils;
    }

    getIngredient(recipeList) {
        let ingredients = [];
        for (let recipe of recipeList) {
            for (let ingredient of recipe.ingredients) {
                let currentIngredient = ingredient.ingredient.toLowerCase();
                currentIngredient = currentIngredient.charAt(0).toUpperCase() + currentIngredient.slice(1);
                if (!ingredients.includes(currentIngredient)) {
                    ingredients.push(currentIngredient);
                }
            }
        }
        return ingredients;
    }

    getAppliance(recipeList) {
        let appliances = [];
        for (let recipe of recipeList) {
            let currentAppliance = recipe.appliance.toLowerCase();
            currentAppliance = currentAppliance.charAt(0).toUpperCase() + currentAppliance.slice(1);
            if (!appliances.includes(currentAppliance)) {
                appliances.push(currentAppliance);
            }
        }
        return appliances;
    }

    
}
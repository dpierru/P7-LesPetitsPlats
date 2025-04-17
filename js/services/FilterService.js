export default class FilterService {

    /**
     * Cette méthode prend une liste de recette et une liste d'ingrédients et vérifie que tous les
     * ingrédients sont dans la liste de recette.
     * Elle retourne une liste de recettes filtrée.
     * @param {Array} recipes
     * @param {Array} ingredients
     * @returns array 
     */
    static filterByIngredient(recipes, ingredients) {
        console.log('filterByIngredient', recipes, ingredients);
        let finalRecipes = [];
        for (let recipe of recipes) {
            // Pour chaque recette, on vériie si tous les ingrédients sont dans la liste
            let allIngredientsInList = true;
            for (let ingredient of ingredients) {
                let ingredientInList = recipe.ingredients.find(i => i.ingredient.toLowerCase() === ingredient.toLowerCase());
                if (!ingredientInList) {
                    allIngredientsInList = false;
                    break;
                }
            }
            if (allIngredientsInList) {
                finalRecipes.push(recipe);
            }
        }
        return finalRecipes;

    }

    /**
     * Cette méthode prend une liste de recette et une liste d'appareils et vérifie que tous les
     * appareils sont dans la liste de recette.
     * Elle retourne une liste de recettes filtrée.
     * @param {Array} recipes
     * @param {Array} appliances
     * @returns array
     */
    static filterByAppliance(recipes, appliances) {
        console.log('filterByAppliance', recipes, appliances);
        let finalRecipes = [];
        for (let recipe of recipes) {
            // Pour chaque recette, on vérifie que tous les appareils sont dans la liste
            let allAppliancesInList = true;
            for (let appliance of appliances) {
                if (recipe.appliance.toLowerCase() !== appliance.toLowerCase()) {
                    allAppliancesInList = false;
                    break;
                }
            }
            if (allAppliancesInList) {
                finalRecipes.push(recipe);
            }
        }
        return finalRecipes;
    }

    /**
     * Cette méthode prend une liste de recette et une liste d'ustensiles et vérifie que tous les
     * ustensiles sont dans la liste de recette.
     * Elle retourne une liste de recettes filtrée.
     * @param {Array} recipes 
     * @param {Array} ustensils 
     * @returns array
     */
    static filterByUstensil(recipes, ustensils) {
        let finalRecipes = [];
        for (let recipe of recipes) {
            let allUstensilsInList = true;
            for (let ustensil of ustensils) {
                let ustensilInList = recipe.ustensils.find(u => u.toLowerCase() === ustensil.toLowerCase());
                if (!ustensilInList) {
                    allUstensilsInList = false;
                    break;
                }
            }
            if (allUstensilsInList) {
                finalRecipes.push(recipe);
            }
        }
        return finalRecipes;
    }

    /**
     * Cette méthode prend une liste de recette et un texte de recherche et vérifie que le texte est dans
     * le nom ou la description de la recette ou la liste des ingrédients.
     * @param {Array} recipes 
     * @param {string} searchText 
     * @returns array
     */
    static filterByText(recipes, searchText) {
        let finalRecipes = [];
        for (let recipe of recipes) {
            if (recipe.name.toLowerCase().includes(searchText.toLowerCase()) || recipe.description.toLowerCase().includes(searchText.toLowerCase())) {
                finalRecipes.push(recipe);
            } else {
                let ingredientInList = recipe.ingredients.find(i => i.ingredient.toLowerCase().includes(searchText.toLowerCase()));
                if (ingredientInList) {
                    finalRecipes.push(recipe);
                }
            }
        }
        return finalRecipes;
    }

    /**
     * Second exemple de méthode filter par texte, mais cette fois en utilisant la méthode filter de Array 
     * plutôt que de boucler sur les éléments "à la main"
     * @param {array} recipes 
     * @param {string} searchText 
     */
    static filterByText2(recipes, searchText) {
        let finalRecipes = recipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(searchText.toLowerCase()) ||
                recipe.description.toLowerCase().includes(searchText.toLowerCase()) ||
                recipe.ingredients.find(i => i.ingredient.toLowerCase().includes(searchText.toLowerCase()));
        });
        return finalRecipes;
    }
}
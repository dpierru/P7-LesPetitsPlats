export default class View {

    /**
     * Constructeur de la vue.
     */
    constructor() {
        this.recipesContainer = document.querySelector('.recipeList');    
        this.selectedItemsContainer = document.querySelector('.selectedItems');
    }

    /**
     * Cette méthode affiche une liste de recettes. 
     * @param {array} recipes 
     */
    displayRecipes(recipes) {
        console.log('displayRecipes', recipes);
        let html = '';

        if (recipes.length > 0) {
            for (let recipe of recipes) {
                html += `
                    <div class="recipe">
                        <img src="../data/photos/${recipe.image}" alt="${recipe.name}" class="recipeImage">
                        <h3 class="recipeTitle">${recipe.name}</h2>
                        <p class="recipeDescription">${recipe.description}</p>
                    </div>
                `
            }
        } else {
            html = '<p>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc.</p>'
        }
        this.recipesContainer.innerHTML = html
    }

    /**
     * SelectedItem est un tableau de la forme 
     * Object { ingredient: (1) […], appliance: (1) […], ustensil: (2) […] }
     * 
     * On affiche chaque élément de chaque type dans le même container "this.selectedItemsContainer" . 
     * @param {object} selectedItems 
     * @param {function} callbackFunction
     */
    displaySelectedItems(selectedItems, callbackFunction) {
        this.selectedItemsContainer.innerHTML = "";

        for (let type in selectedItems) {
            for (let item of selectedItems[type]) {
                // On crée la div selectedItem et son contenu. 
                // Puis on lui ajoute un event listener pour supprimer l'élément de la liste.
                let div = document.createElement('div');
                div.classList.add('selectedItem');
                div.innerText = item;
                let span = document.createElement('span');
                span.innerText = 'X';
                span.classList.add('removeItem');
                span.addEventListener('click', () => {
                    // On crée une nouvelle liste sans l'élément cliqué
                    let newList = {};
                    for (let type in selectedItems) {
                        newList[type] = selectedItems[type].filter(i => i !== item);
                    }
                    // On appelle la fonction callback pour mettre à jour la liste des éléments sélectionnés
                    callbackFunction(newList);
                });

                div.appendChild(span);
                this.selectedItemsContainer.appendChild(div);
            }
        } 
    }
    
}
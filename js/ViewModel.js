import Dropdown from './components/Dropdown.js';
import FilterService from './services/FilterService.js';

export default class ViewModel {
    /**
     * Constructeur de la ViewModel. 
     * On utilise l'injection de dépendance pour lui fournir le modèle et la vue.
     * @param {object} model 
     * @param {object} view 
     */
    constructor(model, view) {
        this.model = model;
        this.view = view; 

        // Initialisation des propriétés de la ViewModel qui vont être utilisées pour la recherche. 
        this.selectedItems = {};
        this.searchText = '';
    }

    /**
     * Cette méthode initialise la ViewModel.
     * Elle demande à la vue d'afficher les recettes.
     * Elle crée les dropdowns et les associe à des méthodes de filtre.
     * Elle crée également un event listener sur le champ de recherche.
     */
    init() {
        this.displayRecipes();

        let ustensilList = this.model.getUstensil(this.model.getRecipes());
        let ingredientList = this.model.getIngredient(this.model.getRecipes());
        let applianceList = this.model.getAppliance(this.model.getRecipes());

        
        this.ingredientDropdown = new Dropdown('ingredient', 'Ingrédients', ingredientList, (clickedElem, type) => {
            this.dropdownElemSelected(clickedElem, type);
        });

        this.applianceDropdown = new Dropdown('appliance', 'Appareils', applianceList, (clickedElem, type) => {
            this.dropdownElemSelected(clickedElem, type);
        });

        this.ustensilDropdown = new Dropdown('ustensil', 'Ustensiles', ustensilList, (clickedElem, type) => {
             this.dropdownElemSelected(clickedElem, type);
        }); 
        
        this.searchInput = document.querySelector('#searchText');
        this.searchInput.addEventListener('input', () => {
            this.searchInputChanged();
        });
    }

    /**
     * Cette méthode est appelée quand le champ de recherche est modifié.
     * Elle met à jour le texte de recherche et lance le filtre.
     */
    searchInputChanged() {
        this.searchText = this.searchInput.value;
        this.filter();
    }

    /**
     * Cette méthode est appelée quand on clique sur un élément de dropdown, c'est une méthode 
     * "CallBack", c'est à dire qu'elle est directement appelée par le dropdown parce qu'elle lui a 
     * été passée en paramètre.
     * Elle met à jour la liste des éléments sélectionnés et lance le filtre.
     * @param {string} item 
     * @param {string} type 
     */
    dropdownElemSelected(item, type) {
        console.log(`On a cliqué sur ${item} de type ${type}`);
        // On met à jour la liste des éléments sélectionnés
        // Si l'élément n'existe pas déjà dans la lsite, on l'ajoute
        if (!this.selectedItems[type]) {
            this.selectedItems[type] = [];
        }
        if (!this.selectedItems[type].includes(item)) {
            this.selectedItems[type].push(item);
        }
        this.displaySelectedItems();
        // Et on lance le filtre
        this.filter();
    }

    /**
     * Cette méthode demande à la vue d'afficher les recettes.
     */
    displayRecipes() {
        this.view.displayRecipes(this.model.getRecipes());
    }

    /**
     * Cette méthode demande à la vue d'afficher les éléments sélectionnés.
     */
    displaySelectedItems() {
        this.view.displaySelectedItems(this.selectedItems, (newList) => { this.updateSelectedItems(newList) });
    }

    /**
     * Cette méthode met à jour la liste des éléments sélectionnés et lance le filtre.
     * @param {object} newList
     */
    updateSelectedItems(newList) {
        this.selectedItems = newList;
        this.displaySelectedItems();
        this.filter();
    }

    /**
     * Le but de cette fonction est de filtrer par rapport aux éléments sélectionnés ainsi qu'au champs de recherche.
     * Pour ca, elle va faire appel a des méthodes filterByXXX de ViewModel. 
     */
    filter() {
        // On part de l'ensemble des recettes
        let filteredRecipes = this.model.getRecipes();
        // On filtre par ustensil
        if (this.selectedItems.ustensil) {
            filteredRecipes = FilterService.filterByUstensil(filteredRecipes, this.selectedItems.ustensil);
        }

        // On filtre par ingrédient
        if (this.selectedItems.ingredient) {
            filteredRecipes = FilterService.filterByIngredient(filteredRecipes, this.selectedItems.ingredient);
        }

        // On filtre par appareil
        if (this.selectedItems.appliance) {
            filteredRecipes = FilterService.filterByAppliance(filteredRecipes, this.selectedItems.appliance);
        }

        // On filtre par texte
        if (this.searchText.length >= 3) {
            filteredRecipes = FilterService.filterByText(filteredRecipes, this.searchText);
        }

        // On affiche le résultat
        this.view.displayRecipes(filteredRecipes);
        // Et on met à jour les dropdowns
        this.updateDropdowns(filteredRecipes);
    }

    /**
     * Cette méthode met à jour les dropdowns en fonction des recettes filtrées.
     * @param {array} filteredRecipes 
     */
    updateDropdowns(filteredRecipes) {
        console.log('updateDropdowns', filteredRecipes);
        let ustensilList = this.model.getUstensil(filteredRecipes);
        let ingredientList = this.model.getIngredient(filteredRecipes);
        let applianceList = this.model.getAppliance(filteredRecipes);

        console.log('ustensilList', ustensilList);
        console.log('ingredientList', ingredientList);
        console.log('applianceList', applianceList);

        this.ingredientDropdown.update(ingredientList);
        this.applianceDropdown.update(applianceList);
        this.ustensilDropdown.update(ustensilList);
    }



}

/**
 * Fichier principal de l'application et point d'entrée. 
 * Projet réalisé en "MVVM" (Model View ViewModel). 
 * 
 * Durée totale du projet 4h "en l'état" : il manque des éléments css pour coller à la maquette. 
 */
import Model from './Model.js';
import View from './View.js';
import ViewModel from './ViewModel.js';

let viewModel = new ViewModel(new Model(), new View());
viewModel.init();

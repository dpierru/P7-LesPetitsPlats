/**
 * Composant dropdown. 
 * Ce composant est comme une liste déroulante. 
 * Replié il affiche juste le type de la liste.
 * Quand on clique dessus, il se déplie et affiche la liste.
 * Lorsqu'on clique sur un des éléments de la liste, il appelle une fonction "callbackOnClick" qui est passée au constructeur. 
 */
export default class Dropdown {
    /**
     * Constructeur. 
     * @param {String} type Le type de la liste
     * @param {String} label Le label à afficher
     * @param {Array} list Le contenu de la dropdown
     * @param {Function} callbackOnClick La fonction à appeler quand on clique sur un élément de la liste
     */
    constructor(type, label, list, callbackOnClick) {
        this.type = type;
        this.label = label;
        this.list = list;
        this.state = 'closed';
        this.callbackOnClick = callbackOnClick;
        this.dropdownFilterContainer = document.querySelector(`.dropdownFilter`);
        this.dropdownDiv = null;
        this.dropdownContent = null;
        if (!this.dropdownFilterContainer) {
            console.error(`Le dropdown "${this.type}Dropdown" n'existe pas`);
            return;
        }
        this.createDropdown();
        this.update(list)
    }

    /**
     * Cette méthode crée l'intérieur du dropdown mais sans les items de la liste.
     * Ces éléments sont créés une seule fois par dropdown et ne changent pas.
     * Les addEventsListeners sont également ajoutés. 
     */
    createDropdown() {
        this.dropdownDiv = document.createElement('div');
        this.dropdownDiv.classList.add('dropdown', `${this.type}Dropdown`, 'closed');
        this.dropdownDiv.innerHTML = `
            <div class="dropdownClosed">
                <span>${this.label}</span>
                <span class="fleche">▼</span>
            </div>
            <div class="dropdownOpen">
                <input type="text" id="search" placeholder="Recherche" class="search">
                <ul class="dropdownContent">
                </ul>
            </div>
        `;
        this.dropdownFilterContainer.appendChild(this.dropdownDiv);
        this.dropdownContent = this.dropdownDiv.querySelector('.dropdownContent');
        this.addDropdownEventListeners();
    }

    /**
     * Cette méthode est appelée quand on update la liste avec de nouveaux éléments. 
     * Les éléments sont supprimés puis recrée avec de nouveaux écouteurs. 
     * @param {array[string]} list 
     */
    update(list) {
        this.list = list;
        this.render();
    }

    /**
     * Cette méthode ajoute les event listeners sur le dropdown lui même. Ces évents ne changent plus par la suite.
     */
    addDropdownEventListeners() {
        let dropdownClosed = this.dropdownDiv.querySelector('.dropdownClosed');
        dropdownClosed.addEventListener('click', () => {
            this.toggleDropdown();
        });

        // On ajoute l'event listener sur le champ de recherche
        let search = this.dropdownDiv.querySelector('.search');
        search.addEventListener('input', () => {
            this.filterList(search.value);
        });
    }

    /**
     * Cette méthode ferme le dropdown si il est ouvert et l'ouvre s'il est fermé.
     */
    toggleDropdown() {
        let dropdownClosed = this.dropdownDiv.querySelector('.dropdownClosed');
        let dropdownOpen = this.dropdownDiv.querySelector('.dropdownOpen');

        if (this.state == 'closed') {
            this.state = 'open';
            this.dropdownDiv.classList.remove('closed');
        } else {
            this.state = 'closed';
            this.dropdownDiv.classList.add('closed');
        }
    }

    /**
     * Ce filtre est interne à chaque dropdown et va filtrer les li de la liste en fonction de la recherche.
     * S'ils en correspondent pas, ils sont masqués.
     * Si search est vide ou inférieur à 3, on affiche tout. 
     * @param {string} search 
     */
    filterList(search) {
        let items = this.dropdownContent.querySelectorAll('li');
        if (search.length >= 3) { 
            console.log('items', items);
            for (let item of items) {
                console.log('item', item.innerText, search, item.innerText.toLowerCase().includes(search.toLowerCase()));
                if (!item.innerText.toLowerCase().includes(search.toLowerCase())) {
                    item.classList.add('hidden');
                } else {
                    item.classList.remove('hidden');
                }
            }
        } else {
            for (let item of items) {
                item.classList.remove('hidden');
            }
        }
        console.log('filterList', search);
    }
    
    /**
     * Cette méthode met à jour le contenu de la liste : elle supprime les éléments existants et les recrée.
     * Elle ajoute également les event listeners sur les éléments de la liste.
     * Quand on clique sur un élément de la liste, on appelle la fonction callbackOnClick et on referme le dropdown.
     */
    render() {
        // On met à jour le contenu de la liste
        this.dropdownContent.innerHTML = '';
        for (let item of this.list) {
            let li = document.createElement('li');
            li.classList.add('dropdownItem');
            li.innerText = item;
            this.dropdownContent.appendChild(li);

            li.addEventListener('click', () => {
                console.log('click on', item, this.type);
                this.callbackOnClick(item, this.type);
                this.toggleDropdown();
            })
        }
    }
    
}
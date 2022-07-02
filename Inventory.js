class Item {
    constructor(name, usecase, weight){
        this.name = name;
        this.usecase = usecase;
        this.weight = weight;
    }

    about(){
        return (`
        ${this.name}   Weight: ${this.weight}
        --------------------------
        ${this.usecase}
        `)
    }

    getWeight(){
        return this.weight;
    }

}

class Container {
    constructor(name){
        this.name = name;
        this.items = [];
    }

    contents(){
        console.log(`${this.name} contains ${this.items.length} items`);
    }
}

class Inventory {
    constructor(){
        this.container = [];
        this.items = []
        this.selectedcontainer = null;
        this.selecteditem = null;
    }

    open(){
        let selection = this.showInventoryMenu();

        while(selection != 0){
            switch (selection){
                case '1':
                    this.addContainer();
                    break;
                case '2':
                    this.selectContainer();
                    break;
                case '3': 
                    this.removeContainer();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showInventoryMenu();
        }
        alert('Closing Inventory');
    }

    showInventoryMenu(){

        let string = '';
        for(let i = 0; i < this.container.length; i++){
            string += '(' + this.container[i].name + ')    ';
            if((i + 1) % 4 === 0){
                string += '\n' + '        ';
            }
        }
        return prompt(`
        Inventory
        ------------------------------------------
        ${string}

        1: Add a container
        2: Select a container
        3: Remove a Container
        0: Close Inventory
        `)
    }

    showContainerMenu(name){
        
        let itemsString = '';
        for(let i = 0; i < this.selectedcontainer.items.length; i++){
            itemsString += i + ': (' + this.selectedcontainer.items[i].name + ')    ';
            if((i + 1) % 4 === 0){
                string += '\n' + '        ';
            }
        }

        return prompt(`
        ${name}                     
        ----------------------------------------------------
        ${itemsString}

        1: Add an item
        2: Select an item
        3: Move an item
        4: Remove an item
        0: Back
        `)
    }

    addContainer(){
        let name = prompt('What would you like to name the container');

        this.container.push(new Container(name));
    }

    selectContainer(){
        let index = prompt('What container would you like to select?');
        let matchFound = false;

        for(let i = 0; i < this.container.length; i++){
            if (index.toLowerCase() === this.container[i].name.toLowerCase()){
                matchFound = true;
                this.selectedcontainer = this.container[i];
                let containerName = this.selectedcontainer.name;

                let itemSelection = this.showContainerMenu(containerName);
                while (itemSelection != 0){
                    switch (itemSelection){
                        case '1':
                            this.addItem();
                            break;
                        case '2':
                            this.selectItem();
                            break;
                        case '3':
                            this.moveItem();
                            break;
                        case '4':
                            this.removeItem();
                            break;
                        default:
                            itemSelection = 0;
                    }
                    itemSelection = this.showContainerMenu(containerName);
                }
            }
        }
        if (!matchFound){
            alert(`${index} is not a container`);
        }
    }

    addItem(){
        let itemName = prompt(`What is the item's name?`);
        let itemUsecase = prompt(`What does the ${itemName} do?`);
        let itemWeight = prompt(`How much does the ${itemName} weigh`);

        this.selectedcontainer.items.push(new Item(itemName, itemUsecase, itemWeight));
    }

    selectItem(){
        let itemIndex = prompt(`What is the index of the item you wish to see?`);
        prompt(this.selectedcontainer.items[itemIndex].about());
    }

    moveItem(){
        let matchFound = false;
        let toMoveContainer = null;
        let itemIndex = prompt(`What is the index of the item you wish to move?`);
        let otherContainer = prompt(`What is the name of the container you wish to move it to?`);
        let selecteditem = (this.selectedcontainer.items[itemIndex]);
        for(let i = 0; i < this.container.length; i++){
            if(this.container[i].name.toLowerCase() === otherContainer.toLowerCase()){
                matchFound = true;
                toMoveContainer = this.container[i];
                toMoveContainer.items.push(selecteditem);
                this.selectedcontainer.items.splice(itemIndex, 1);
                alert(`${selecteditem.name} has been moved to ${toMoveContainer.name}`);
            }
        }

        if (!matchFound){
            alert(`${otherContainer} is not a container`);
        }
    }

    removeItem(){
        let itemIndex = prompt('Select the index of the item you wish to remove');
        this.selectedcontainer.items.splice(itemIndex, 1);
    }

    removeContainer(){
        let containerIndex = prompt('Select the index of the container you wish to remove');
        this.container.splice(containerIndex, 1);
    }
}

let myInventory = new Inventory();
myInventory.open();

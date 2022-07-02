class Player {
    constructor(name, position){
        this.name = name;
        this.position = position;
    }

    describe() {
        return `${this.name} plays ${this.position}.`;
    }
}

class Team {
    constructor(name) {
        this.name = name;
        this.players = [];
    }

    addPlayer(player) {
        if (player instanceof Player) {
            this.players.push(player);
        } else {
            throw new Error(`You can only add an instance of Player. Argument is not a player: ${player}`); 
        }
    }

    describe(){
        return `${this.name} has ${this.players.length} players`;
    }
}

class Menu {
    constructor(){
        this.teams = [];
        this.selectedTeam = null;
    }

    start(){
        let selection = this.showMainMenuOptions();

        while (selection != 0) {
            switch (selection){
                case '1':
                    this.createTeam();
                    break;
                case '2':
                    this.viewTeam();
                    break;
                case '3':
                    this.deleteTeam();
                    break;
                case '4':
                    this.displayTeams();
                    break;
                default:
                    selection = 0;
            }
            selection = this.showMainMenuOptions();
        }

        alert(`Goodbye!`);
    }

    showMainMenuOptions(){
        return prompt(`
        0: Exit
        1: Create a Team
        2: View a Team
        3: Delete a Team
        4: Display Teams
        `)
    }

    showTeamMenuOptions(teaminfo){
        return prompt(`
            0: back
            1: create player
            2: delete player
            ----------------
            ${teaminfo}
        `)
    }

    createTeam(){
        let teamName = prompt(`Enter name for new team:`)
        this.teams.push(new Team(teamName));
    }

    displayTeams() {
        let teamString = '';
        for(let i = 0; i < this.teams.length; i++){
            teamString += i + ") " + this.teams[i].name + "\n";
        }
        alert(teamString);
    }

    viewTeam(){
        let index = prompt(`Enter the index of the team you wish to view:`);
        
        let smallSelection = 1;
        while (smallSelection != 0){
            if (index > -1 && index < this.teams.length){
                this.selectedTeam = this.teams[index];
                let description = 'Team Name: ' + this.selectedTeam.name + '\n';
    
                for(let i = 0; i < this.selectedTeam.players.length; i++){
                    description += i + ') ' + this.selectedTeam.players[i].name + ' - ' +
                    this.selectedTeam.players[i].position + '\n';
                }
    
                let selection = this.showTeamMenuOptions(description);
                switch (selection){
                    case '1':
                        this.createPlayer();
                        break;
                    case '2':
                        this.deletePlayer();
                        break;
                    default:
                        smallSelection = 0;
                }
            }
        }
    }

    createPlayer(){
        let playerName = prompt('Enter Name of the player: ');
        let playerPosition = prompt('Enter position of the Player: ');
        this.selectedTeam.players.push(new Player(playerName, playerPosition));
    }

    deletePlayer(){
        let index = prompt('Enter the index of the player you wish to delete:')
        if (index > -1 && index < this.selectedTeam.players.length){
            this.selectedTeam.players.splice(index, 1);
        }
    }

    deleteTeam(){
        let index = prompt('Enter the index of the team you wish to delete:')
        if (index > -1 && index < this.teams.length){
            this.teams.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();
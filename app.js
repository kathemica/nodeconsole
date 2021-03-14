import _ from 'lodash';
import { inquirerMenu, pause, readInput, deleteTaskListing, confirmQuestion, checkTaskListing} from './helper/inquirer.js';
import { Tasks } from './models/Tasks.js';
import { readData, saveDB } from './helper/dbMethods.js';

console.clear();

//usamos una funcion asincrona
const main = async () => {
    let opt = '';
    let tasks = new Tasks(readData());
    let lista = [];

    do{                
        opt = await inquirerMenu();    

        switch(opt){
            case '1': //create                                        
                    tasks.createTask(
                        await readInput('Description:')
                    );                    
                break;                
            case '2': //list                    
                    console.log(tasks.allTaskListed());                    
                break;
            case '3': //List completed tasks
                    console.log(tasks.getfilteredList());
                break;
            case '4': //List pending tasks
                    console.log(tasks.getfilteredList(false));                     
                break;
            case '5': //Complete task
                    lista = tasks.listTasksAsArray();
                    if (_.size(lista) > 0){
                        const ids= await checkTaskListing(lista);                            
                        tasks.toggleCompleteTasks(ids);
                    }else{
                        console.log(`There's nothing to update here`.red);
                    }                    
                break;
            case '6': //Delete task
                    lista = tasks.listTasksAsArray();                    
                    
                    if (_.size(lista) > 0){
                        const id = await deleteTaskListing(lista);
                        
                        if (id !== '0'){
                            const confirm = await confirmQuestion('Sure?');
                        
                            if (confirm){
                                console.log(tasks.deleteElementOnList(id));
                            };
                        }                            
                    }else{
                        console.log(`There's nothing to delete here`.red);
                    }
                break;
        }
        
        saveDB(tasks.listTasksAsArray());

        if (!_.isEqual(opt, '0')) await pause();
    } while ( opt != '0')    
};

main();
import _ from 'lodash';
import { inquirerMenu, pause, readInput, taskListing, confirmQuestion} from './helper/inquirer.js';
import { Tasks } from './models/Tasks.js';
import { readData, saveDB } from './helper/dbMethods.js';

console.clear();

//usamos una funcion asincrona
const main = async () => {
    let opt = '';
    let tasks = new Tasks(readData());

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
                break;
            case '6': //Delete task
                    const id = await taskListing(tasks.listTasksAsArray());
                    const confirm = await confirmQuestion('Sure?');
                    if (confirm){
                        console.log(tasks.deleteElementOnList(id));   
                    };
                    await pause();             
                break;
        }
        console.log(tasks.listTasksAsArray());
        saveDB(tasks.listTasksAsArray());

        if (!_.isEqual(opt, '0')) await pause();
    } while ( opt != '0')    
};

main();
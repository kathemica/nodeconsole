import { inquirerMenu, pause} from './helper/inquirer.js';
import _ from 'lodash';
import { Task } from './models/Task.js';
import { Tasks } from './models/Tasks.js';

console.clear();

//usamos una funcion asincrona
const main = async () => {
    let opt = '';
    let tasks = new Tasks();

    do{
        const task = new Task('test');        
        tasks._list[task.id] = task;
        opt = await inquirerMenu();       
        console.log(tasks);

        if (!_.isEqual(opt, '0')) await pause();
    } while ( opt != '0')    
};

main();
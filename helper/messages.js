import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import {} from 'colors';
import { resolve } from 'path';
const readline = require('readline');

const showMenu = () => {

    return new Promise( resolve => {
        console.log ('Menu'.red);
        console.log ('========================');
        console.log (' Choose an option'.green);
        console.log ('========================\n');

        console.log(`${'1.'.green} Create task`);
        console.log(`${'2.'.green} List task`);
        console.log(`${'3.'.green} List completed tasks`);
        console.log(`${'4.'.green} List pending tasks`);
        console.log(`${'5.'.green} Complete task`);
        console.log(`${'6.'.green} Delete task`);
        console.log(`${'0.'.green} Exit`);

        console.log ('========================\n');
        
        //aca creamos la interfaz que leera los datos de la consola
        //esta clase es parte de node, la usamos asi para poder usar otros metodos
        const rlp = readline.createInterface({
            input: process.stdin,
            output: process.stdout,      
        });    

        rlp.question('Choose one option ', (answer) => {     
            // console.log(answer);
            rlp.close();
            console.clear();
            resolve(answer);
        });
    });    
};

const pause = () => {     
    return new Promise( resolve => {
        const rlp = readline.createInterface({
            input: process.stdin,
            output: process.stdout,      
          });    
    
        rlp.question(`\nPress ${'Enter'.green} to follow up.`, (answer) => { 
            rlp.close();
            resolve();
        });
    });    
};

export  {
    showMenu,
    pause
}
import inquirer from 'inquirer';
import colors from 'colors';

const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: '1',
                name: 'Create task'
            },
            {
                value: '2',
                name: 'List task'
            },
            {
                value: '3',
                name: 'List completed tasks'
            },
            {
                value: '4',
                name: 'List pending tasks'
            },
            {
                value: '5',
                name: 'Complete task'
            },
            {
                value: '6',
                name: 'Delete task'
            },
            {
                value: '0',
                name: 'Exit'
            },
        ]
    }
];

const pauseOptions = [
    {
        type: 'input',
        name: 'option',
        message: `\nPress ${'Enter'.green} to continue...`
    }
];

const inquirerMenu = async () =>{
    console.clear();
    console.log ('Menu'.red);
    console.log ('========================');
    console.log (' Choose an option'.green);
    console.log ('========================\n');

    const { option } = await inquirer.prompt(menuOptions);
    return option;
}

const pause = async () =>{
    await inquirer.prompt(pauseOptions);    
}

export  {
    inquirerMenu,
    pause
}
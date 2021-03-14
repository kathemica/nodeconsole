import inquirer from 'inquirer';
import colors from 'colors';
import _ from 'lodash';

const menuOptions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: '1',
                name: `${'1'.green} Create task`
            },
            {
                value: '2',
                name: `${'2'.green} List task`
            },
            {
                value: '3',
                name: `${'3'.green} List completed tasks`
            },
            {
                value: '4',
                name: `${'4'.green} List pending tasks`
            },
            {
                value: '5',
                name: `${'5'.green} Update task`
            },
            {
                value: '6',
                name: `${'6'.green} Delete task`
            },
            {
                value: '0',
                name: `${'0'.green} Exit`
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

const question = [
    {
        type: 'input',
        name: 'desc',
        message: '',
        validate( value ){
            return  !_.size(value) ? 'Null values not allowed' : true;
        }
    }
];

const inquirerMenu = async () =>{
    console.clear();
    console.log ('Menu'.red);
    console.log ('========================');
    console.log (' Choose an option'.white);
    console.log ('========================\n');

    const { option } = await inquirer.prompt(menuOptions);
    return option;
}

const pause = async () =>{
    await inquirer.prompt(pauseOptions);    
}

const readInput = async (message) => {    
    question[0].message = message;
    
    const { desc } = await inquirer.prompt(question);
    return desc;
}

const deleteTaskListing = async(taskArray = []) =>{    
    const choices= taskArray.map( (task, i) => {                                
                return {
                    value: task.id,
                    name: `${(i+1).toString().green} ${task.description}`
                }
            });

    //for canceling purposes
    choices.unshift({
        value: '0',
        name: '0'.red + ' Cancel'.red
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete'.blue,
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions);
    return id ;
}

const checkTaskListing = async(taskArray = []) =>{    
    const choices= taskArray.map( (task, i) => {                                
                return {
                    value: task.id,
                    name: `${(i+1).toString().green} ${task.description}`,
                    checked: (task.completedOn) ? true: false
                }
            });    

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select'.blue,
            choices
        }
    ]

    const { ids } = await inquirer.prompt(questions);
    return ids ;
}

const confirmQuestion = async (message) => {    
    const choices = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];
    
    const { ok }  = await inquirer.prompt(choices);    
    return ok;
}

export  {
    inquirerMenu,
    pause,
    readInput,
    deleteTaskListing, 
    confirmQuestion,
    checkTaskListing
}
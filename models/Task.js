import {v4} from 'uuid';

class Task {
    id = '';
    description = '';
    completedOn = null;

    constructor( description ){
        this.description = description;
        this.id = v4();
    };     
}

export {
    Task
}
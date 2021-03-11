import {v4 as uuidV4} from 'uuid';

class Task {
    id = '';
    description = '';
    completedOn = null;

    constructor( description ){
        this.description = description;
        this.id = uuidV4();
    };     
}

export {
    Task
}
import { Task } from './Task.js';
import _ from 'lodash';

class Tasks {
    #list = {}; // '#' it gives private property to field

    constructor( list = {}){
        //if list param is assigned directly to #list it give us an error
        //so we have to use Object.assing and that's it
        Object.assign(this.#list, list)        
    }

    /** Private Zone*/
    #isEmpty(){
        return _.isNil(this.#list)? true : false;
    }
    
    #getFormattedText(data, i){
        return `${(i).toString().green} ${data.description} | ${!_.isNil(data.completedOn) ? data.completedOn.toString().green : 'Pendiente'.red }\n`;
    }

    #isValidId(id){                
       try{
            return _.isNil(this.#list.filter((task) => (task.id === id) ))            
       }catch (e) {
            console.log('Error'.red, e);
            return false;
        }       
    }

    /** Public Zone */
    createTask(desc = ''){
        const task = new Task(desc);        

        this.#list[task.id] = task;        
    }

    listTasksAsArray(listToShow = null){
        if (this.#isEmpty()) return [];   
        
        return _.map((!_.isNil(listToShow)? listToShow : this.#list), (value) => {
            return(value);
        });               
    }
    
    allTaskListed(listToShow = null){
        return (_.isEmpty(this.#list))? 
            'empty'.yellow.bgRed.bold :            
            '\n' + this.listTasksAsArray(!_.isNil(listToShow)? listToShow : this.#list)
                .map((task, i) => {                    
                     return this.#getFormattedText(task, ++i);
                }).join('')            
    }

    getfilteredList(completed = true){
        return this.allTaskListed(
            this.listTasksAsArray()
                .filter(task => !_.isEqual(completed, _.isNil(task.completedOn))));        
    }

    deleteElementOnList(taskId = ''){
        // if (this.#isValidId(id)){            
            try{          
                // console.log(taskId);
                // const newList = Object.values(this.#list).filter((id) => taskId.trim() === id);
                if (this.#list[taskId]){
                    delete this.#list[taskId];
                    return 'Success'.green;
                }else{
                    return 'Fail'.red;
                }                    
            }catch (e) {                
                return 'Error: '.red + e;
            }
        // }else{
        //     return 'Fail'.red;
        // }
    };    
};

export {
    Tasks
}
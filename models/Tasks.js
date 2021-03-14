import { Task } from './Task.js';
import _ from 'lodash';

class Tasks {
    #list = { }; // '#' it gives private property to field

    constructor( list = {}){        
        list.forEach( task => {
            this.#list[task.id] = task;
        });                
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

        const lista =  _.map((!_.isNil(listToShow)? listToShow : this.#list), (value) => {
            return(value);            
        });                       

        return lista;
    }
    
    allTaskListed(listToShow = null){
        return (_.isEmpty(this.#list))? 
            'empty'.yellow.bgRed.bold :            
             this.listTasksAsArray(!_.isNil(listToShow)? listToShow : this.#list)
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
        return (this.#list[taskId])? (delete this.#list[taskId])? 'Success'.green : 'Fail'.red
         :  `Task [${taskId}] does not exists`.red;        
    };    

    toggleCompleteTasks(ids = []){
        //First: update all listed ids as completed
        ids.forEach( id => {         
            //it remains linked to original list due pointer in memory
            //if you want to copy and don't change it use spread operator 
            //{...  this.#list[id]}   
            const task = this.#list[id]; 

            if ( !task.completedOn ) {
                task.completedOn = new Date().toISOString()
            }
        });

        //Second: update all NOT listed ids as not completed
        this.listTasksAsArray().forEach( task => {
            if ( !ids.includes(task.id) ) {
                this.#list[task.id].completedOn = null;
            }
        });
    }
};

export {
    Tasks
}
import fs from 'fs';

const file = './db/data.json';

const saveData = (data) => {

    fs.writeFileSync(file, JSON.stringify(data));
}

const readData = () => {
    try{
        return fs.existsSync(file)? 
            JSON.parse(fs.readFileSync(file, {encoding: 'utf-8'}))
            : null;
    }catch(e){
        return null;
    }  
}

export  {
    saveData as saveDB,
    readData as readData

}
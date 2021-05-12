const args = process.argv;

const [_,__,action,todo]= args;

const fs =require('fs');

let todos=[];
const path ="./todos.json";
let id=0;

const { program } = require('commander');
program.version('0.0.1');


switch(action){
    case "add":
        file = readFile(path);
        todos=JSON.parse(file || "[]");
        if(todos.length==0){
            id=0;
        }else{
            id=todos[todos.length-1].id;
        }
        program.requiredOption('-t, --title');
        program.parse(process.argv);

        let todoObj={
            id:id+1,
            title:process.argv[4]
        }
        addToDo(path,todoObj);
        console.log("your note created sucessfully")
        break;

    case "list":
      listToDo()  
      break;

    case "delete":
       let toDoId =process.argv[3]; 
       if(deleteToDo(toDoId)){
        console.log("your note deleted sucessfully");
       }else{
        console.log("your note not found") ;
       }
       break;
       
    case "edit":
        program.requiredOption('-t, --title');
        program.requiredOption('-i, --id');
        program.parse(process.argv);  
        let editId =process.argv[6]; 
        let toDotitle =process.argv[4]; 
        if(editToDo(editId,toDotitle)){
            console.log("your note updated sucessfully"); 
        }else{
            console.log("your note not found") ;
        }

    default:
        break;    
}


function readFile(filepath,encoding="utf-8"){
    const file=fs.readFileSync(filepath,{encoding});
   return file;
}

function writeFile(filepath,data){
    fs.writeFileSync(filepath,JSON.stringify(data));
}

function addToDo(filepath,todoobj){
    file = readFile(filepath)
    todos=JSON.parse(file || "[]");
    todos.push(todoobj);
    writeFile(filepath,todos);
}

function listToDo(){
    const myToDos= readFile(path);  
    console.log(myToDos);  
}

function deleteToDo(id){
    file = readFile(path);
    todos=JSON.parse(file || "[]");
    let obj = todos.find(obj => obj.id == id);
    if(obj){
        todos=todos.filter((val)=>{
            return val!==obj	
        });
        writeFile(path,todos);
        return true;
    }return false;  
}

function editToDo(id,title){
    file = readFile(path);
    todos=JSON.parse(file || "[]");
    let obj = todos.find(obj => obj.id == id);
    if(obj){
       obj.title=title;
       writeFile(path,todos);
       return true;
    }return false;
}
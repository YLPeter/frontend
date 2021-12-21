import React,{useState} from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo' 
const axios = require('axios');
function TodoList() {
    const [todos,setTodos] = useState([])
    const [externalServerResponse, setExternalServerResponse] = useState(
        "no response"
      );
    const findIfExistNum = todoId => [...todos].find(todo => todo.id === todoId)

    const getExternalAPI = async () => {
        console.log("calling external api from client");
        const result = await fetch("/api/tasks");
        console.log("result", result);
        const data = await result.json();
        console.log("data", data);
        setExternalServerResponse(JSON.stringify(data[0]));
      };
    const getAlltasks = async (callbackfunction) => await axios({
        method: 'get',
        url: "/api/tasks",
    }).then((res)=>{
            callbackfunction(res)
        }
    );

    const valuetodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)){
            console.log("not empty")
            return false

        }
        if(!todo.id || isNaN(Number(todo.id))){
            
            console.log("id not number")
            return false
        }
        if(findIfExistNum(todo.id)){
            console.log("id already exist")
            return false
        }
        return true
    }
    
    const addTodo = todo =>{
        if (!valuetodo(todo)){
            return 
        }
        console.log("check pass")
        const newTodos = [todo,...todos];
        setTodos(newTodos);
        console.log(...todos);
        getExternalAPI()
        console.log("getAlltasks", getAlltasks())
    }

    const updateTodo = (todoId,newValue) => {
        if (!valuetodo(newValue)){
            return 
        }
        setTodos(prev => prev.map(item=>(item.id===todoId ? newValue:item)))
    }


    const removeTodo = id =>{
        
        const removeArr = [...todos].filter(todo=> todo.id !== id)
        setTodos(removeArr);
    }

    


    const completeTodo = id => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id){
                todo.isComplete = !todo.isComplete;
            }
            return todo
        });
        setTodos(updatedTodos);
    }
    return (
        <div>
        <h1>What's the plan for today?</h1>
        <TodoForm onSubmit={addTodo}/>
        <Todo 
            todos = {todos} 
            completeTodo={completeTodo} 
            removeTodo = {removeTodo}
            updateTodo = {updateTodo}/>
        </div>
    )
}

export default TodoList

import React,{useState,useEffect} from 'react'
import TodoList from './TodoList';
const axios = require('axios');
async function getTasks(){
    try {
        const res = await axios.get('/api/tasks')
        let result = res.data.sort((a,b) => a.sequenceNo-b.sequenceNo)
        console.log("result",result)
        result.map(task => {
            task._id = task.id
            task.text = task.title
            task.id = task.sequenceNo
            if (task.status === "DONE"){
                task.isComplete = true;
            }else{
                task.isComplete = false;
            }
        })
        // console.log("result",result)
        return result;
    } catch (error) {
        throw new Error(error)
    }
}
async function delTasks(todo){
    try {
        const res = await axios.delete('/api/tasks/'+todo._id)
        return res;
    } catch (error) {
        throw new Error(error)
    }
}
async function createTasks(todo){
    try {
        const params = new URLSearchParams()
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        params.append('title', todo.text)
        params.append('sequenceNo', todo.id)
        const res = await axios.post('/api/tasks', params, config)
        return res.data;
    } catch (error) {
        throw new Error(error)
    }
}
async function completeTasks(todo){
    try {
        const params = new URLSearchParams()
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        params.append('status',"DONE")
        const res = await axios.patch('/api/tasks/'+todo._id+'/update', params, config)
        return res.data;
    } catch (error) {
        throw new Error(error)
    }
}

async function updateTask(todo){
    try {
        const params = new URLSearchParams()
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        params.append('sequenceNo',todo.id)
        params.append('title',todo.text)
        const res = await axios.patch('/api/tasks/'+todo._id+'/update', params, config)
        return res.data;
    } catch (error) {
        throw new Error(error)
    }
}


function TodoTwoList() {
    const [todos,setTodos] = useState([])
    
    const findIfExistNum = todoId => [...todos].find(todo => todo.id === todoId)
    const refresh = async () =>{
        let newTodos = await getTasks();
        console.log("getTasks()",newTodos)
        setTodos(newTodos);
    }
    const getNonComplete = () => [...todos].filter(todo => !todo.isComplete)
    const getComplete = () => [...todos].filter(todo => todo.isComplete)

    
    const valuetodo = todo => {
        if(!todo.text || /^\s*$/.test(todo.text)){
            window.confirm("It should not be empty")
            console.log("It should not be empty")
            return false
        }
        if(!todo.id || isNaN(Number(todo.id))){
            window.confirm("SeqNo not number")
            console.log("SeqNo not number")
            return false
        }
        if(findIfExistNum(todo.id)){
            window.confirm("id already exist")
            console.log("id already exist")
            return false
        }
        return true
    }
    
    async function addTodo(todo){
        if (!valuetodo(todo)){
            return 
        }
        const newTodos = [todo,...todos];
        console.log("createTasks",createTasks)
        let resp = await createTasks(todo);
        setTodos(newTodos,refresh());
        
    }

    const updateTodo = async (todoId,newValue) => {
        if (!valuetodo(newValue)){
            return 
        }
        let todo = [...todos].find(todo => todo.id === todoId)
        console.log("find todo",todo)
        todo.sequenceNo = newValue.id
        todo.id = newValue.id
        todo.text = newValue.text
        todo.title = newValue.text

        await updateTask(todo);
        setTodos(prev => prev.map(item=>(item.id===todoId ? newValue:item)),refresh());
        
    }


    const removeTodo =async (todo) =>{
        let resp = await delTasks(todo)
        console.log(resp)
        const removeArr = [...todos].filter(todoEachEle=> todo.id !== todoEachEle.id)
        setTodos(removeArr,refresh());
    }
    const completeTodo = async(id) => {
        let updatedTodos = await todos.map(todo => {
            if (todo.id === id){
                todo.isComplete = !todo.isComplete;
                completeTasks(todo);
            }
            
            return todo
        });
        setTodos(updatedTodos,refresh());
        
    }

    return (<>
    <div className="todo-app">
        <TodoList 
            text={"Non Complete Task"} 
            todoData={getNonComplete()}
            removeTodo = {removeTodo}
            addTodo = {addTodo}
            completeTodo = {completeTodo}
            updateTodo = {updateTodo}
            />
    </div>
    <div className="todo-app">
        <TodoList 
            text={"Complete Task"} 
            todoData={getComplete()} 
            removeTodo = {removeTodo}
            addTodo = {addTodo}
            completeTodo = {completeTodo}
            updateTodo = {updateTodo}/>
    </div>
    </>
    );
}

export default TodoTwoList;
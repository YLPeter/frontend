import React,{useState,useEffect} from 'react'
import TodoList from './TodoList';
import {getTasks, delTasks, createTasks,completeTasks,updateTask,delAllTasks} from './apiInterface';
import {RiCloseCircleFill} from 'react-icons/ri';



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
    const removeTodoAll =async () =>{
        let resp = await delAllTasks()
        console.log(resp)
        const removeArr = [];
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
    <h1 style={{ color: 'red' }}>Remove All
    <RiCloseCircleFill
        onClick={() => {
          const confirmBox = window.confirm("Do you really want to delete all?");
          if (confirmBox === true) {
            removeTodoAll();
          }
        }}
        className="delete-icon"
    /></h1>
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
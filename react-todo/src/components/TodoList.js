import React,{useState,useEffect} from 'react'
import TodoForm from './TodoForm'
import Todo from './Todo' 

function TodoList({todoData,text, removeTodo ,addTodo,completeTodo,updateTodo}) {
    // const [todoData, setTodoData] = useState(props.todoData? props.todoData:'')
    // const [text, setText] = useState(props.text? props.text:'')
    const [todos,setTodos] = useState([])
    const findIfExistNum = todoId => [...todos].find(todo => todo.id === todoId)
    const refresh = async () =>{
        let newTodos = todoData
        console.log("todoData",todoData)
        setTodos(newTodos);
    }
    useEffect(() => {
        refresh();
      }, []);
    
    return (
        <div>
        
        <h1>{text}</h1>
        <TodoForm onSubmit={addTodo}/>
        <Todo 
            todos = {todoData} 
            completeTodo={completeTodo} 
            removeTodo = {removeTodo}
            updateTodo = {updateTodo}/>
        </div>
    )
}

export default TodoList

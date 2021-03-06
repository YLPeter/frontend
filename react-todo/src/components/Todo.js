import React,{useState} from 'react'
import {RiCloseCircleLine} from 'react-icons/ri';
import {TiEdit} from 'react-icons/ti';

import TodoForm from './TodoForm';
function Todo({todos,completeTodo,removeTodo,updateTodo}) {
    const [edit,setEdit] = useState({
        id:null,
        value:''
    })

    const submitUPdate = value =>{
        updateTodo(edit.id,value)
        setEdit({
            id:null,
            value:''
        })
    }
    if (edit.id){
        return <TodoForm edit={edit} onSubmit={submitUPdate}/>;
    }

    return todos.map((todo,index) => (

            <div className = { todo.isComplete ? 'todo-row complete': 'todo-row'}
            key={(index)}
            >
                <div key={todo.id}
                    onClick={() => completeTodo(todo.id)}>
                    {todo.id}{".\t"}
                    {todo.text}
                </div>
                <div className="icons">
                    <RiCloseCircleLine 
                        onClick={() => {
                            const confirmBox = window.confirm(
                            "Do you really want to delete?"
                            )
                            if (confirmBox === true) {
                                removeTodo(todo)
                            }
                        }
                    }
                        className= 'delete-icon'
                    />


                    <TiEdit 
                        onClick={()=>setEdit({id:todo.id,value:todo.text})}
                        className='edit-icon'
                    />
                </div>
            </div>
        ))

}

export default Todo

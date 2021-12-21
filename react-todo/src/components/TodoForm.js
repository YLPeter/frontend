import React,{useState,useEffect,useRef} from 'react'

function TodoForm(props) {
    const [input, setInput] = useState(props.edit? props.edit.value:'')
    const [todoData, settodoData] = useState({no:"",name:""})
    const inputRef = useRef(null)
    useEffect(() => {
        // inputRef.current.focus()
    });

    function handleChange(evt) {
        const value = evt.target.value;
        settodoData({
          ...todoData,
          [evt.target.name]: value
        });
      }
    const handleSubmit = e =>{
        e.preventDefault();

        props.onSubmit({
            id:todoData.no,
            text:todoData.name
        });

        setInput('');
    }
    
    return (
        <form className = "todo-form" onSubmit={handleSubmit}>
            {props.edit ? (
                <><input 
                type= 'test'
                placeholder= 'Update Your Item'
                value= {input} 
                name='text'
                className='todo-input'
                onChange = {handleChange}
                ref={inputRef}
                />
                <button className='Update-button'>
                    Update
                </button></>):(
                    <>
                    <input 
                        type= 'test'
                        placeholder= 'Add a todo'
                        value= {todoData.no} 
                        name='no'
                        className='todo-input-number'
                        onChange = {handleChange}
                        ref={inputRef}
                    />
                    <input 
                        type= 'test'
                        placeholder= 'Add a todo'
                        value= {todoData.name} 
                        name='name'
                        className='todo-input'
                        onChange = {handleChange}
                        ref={inputRef}
                    />
                <button className='todo-button'>
                    Add todo
                </button></>)
            }
            
        </form>
        
    )
}

export default TodoForm

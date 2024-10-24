import React, { useEffect, useState } from 'react'
import "./Todo.css"
import { useSelector, useDispatch } from 'react-redux'
import { add, remove, update } from '../actions/actions'




const Todo = () => {
    const [input, setInput] = useState("")
    const [editid,setEditid] = useState(null)
    const [edit , setEdit] = useState("")
    const todos = useSelector(state => state)
    const dispatch = useDispatch()

    
       useEffect(()=>{
         const storedTasks = JSON.parse(localStorage.getItem("task")) || []
            if(storedTasks.length > 0){
                storedTasks.forEach(task => dispatch(add(task.text)));
            }
        
       },[dispatch])

       useEffect(()=>{
        localStorage.setItem("task",JSON.stringify(todos))
       },[todos])

    const addToDo = () => {
        if (input.trim()) {
            dispatch(add(input))
            setInput("")
        }
    }
    const DeleToDo = (id) => {
        dispatch(remove(id))
    }

    const editing = (id,text) =>{
        setEditid(id)
        setEdit(text)
    }
    const updateTodo = () => {
        if(edit.trim()){
            dispatch(update(editid,edit))
            setEditid(null)
            setEdit("")
        }
    }
   
useEffect(()=>{
    const getDate = () => {
        const date = new Date()
        let houre = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()
        // spacifie the time 
        const ampm = houre >= 12 ? "PM" : "AM"
        // turn time form 24 to 12
        houre = houre % 12
        houre = houre ? houre : 12;
        const formatedDate = `${houre.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`
        document.querySelector(".date").innerHTML = formatedDate
    }
    setInterval(getDate, 1000)
},[])
    return (
        <div className='container' >
            <div className='date' style={{
                background: "linear-gradient(90deg, #74EBD5 0%, #9FACE6 100%)",
                padding: "10px", width: "120px", marginLeft: "10px", borderRadius: "10px", color: "#333"
            }}>
            </div>
            <div className='todo-container'>
                <input value={input} placeholder='Enter Thing To Do' type='text' className='input' onChange={(e) => setInput(e.target.value)} />
                <button className='btnadd' onClick={() => addToDo()}>Add</button>
            </div>
            <div className='tasks-container'>
                {todos.map(todo => {
                    return (
                       <div>
                        {editid === todo.id ? ( 
                            <div style={{display:"flex"}} key={todo.id}>
                            <input id={todo.id} value={edit} onChange={(e)=>setEdit(e.target.value)} className='task' placeholder={todo.text} type='text'/>
                             <button className='updatebtn' onClick={updateTodo}>update</button>
                            </div>
                            ): (
                    <h3 key={todo.id} className='task' id={todo.id}>▲ {todo.text}
                        <span className='mother'>
                            <span className='spanup' onClick={() => editing(todo.id,todo.text)}>
                                <i className='bx bxs-pencil update'></i>
                            </span>
                            <span className='spandel' onClick={() => DeleToDo(todo.id)}>
                                <i className='bx bxs-x-circle delete'></i>
                            </span>
                        </span>
                    </h3>
                )}
                </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Todo
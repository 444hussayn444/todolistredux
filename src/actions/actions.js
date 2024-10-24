export const ADD_TODO = "ADD_TODO"
export const UPDATE_TODO = "UPDATE_TODO"
export const REMOVE_TODO = "REMOVE_TODO"


export const add = (text) =>({
     type :ADD_TODO,
     payload : {text}
})
export const update = (id , text) =>({
   type :UPDATE_TODO,
   payload : {id ,text}
})
export const remove = (id) =>({
   type:REMOVE_TODO,
   payload : {id}
})
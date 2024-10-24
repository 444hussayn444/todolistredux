import { ADD_TODO, UPDATE_TODO, REMOVE_TODO } from "../actions/actions"
import { v4 as uuidv4 } from 'uuid'
const initialState = []
export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, { id: uuidv4(), text: action.payload.text }]
        case UPDATE_TODO:
            return state.map(todo=>{
               return todo.id === action.payload.id  ? { ...todo, text: action.payload.text } : todo
            })
        case REMOVE_TODO:
            return state.filter(t => t.id !== action.payload.id)
        default:
            return state
    }
}
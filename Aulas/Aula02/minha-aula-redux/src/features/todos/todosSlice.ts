import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Todo, Priority} from "./todoTypes"

const initialState: Todo[] = []

const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<{text: string; priority?: Priority}>) => {
            const { text, priority = "low"} = action.payload
            state.push({
                id: Date.now().toLocaleString() + Math.random().toString(36).slice(2,9),
                text,
                completed: false,
                priority
            })
        },
        toggleTodo: (state, action: PayloadAction<string>) => {
            const todo = state.find((t) => t.id === action.payload)
            if (todo) todo.completed = !todo.completed
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            return state.filter((t) => t.id !== action.payload)
        },
        editTodo: (state, action: PayloadAction<{ id: string; text: string; priority?: Priority}>) => {
            const todo = state.find((t) => t.id === action.payload.id)
            if(todo){
                todo.text = action.payload.text
                if(action.payload.priority) todo.priority = action.payload.priority
            }
        },
        clearCompleted: (state) => state.filter((t) => !t.completed)
    }
})

export const { addTodo, toggleTodo, deleteTodo, editTodo, clearCompleted} = todosSlice.actions
export default todosSlice.reducer
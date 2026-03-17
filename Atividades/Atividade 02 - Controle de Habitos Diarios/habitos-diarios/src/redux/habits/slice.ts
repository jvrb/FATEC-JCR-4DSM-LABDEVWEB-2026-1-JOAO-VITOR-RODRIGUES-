import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Habit } from "./habit-types";

const initialState = [] as Habit[]

const habitsSlice = createSlice({
    name: "habits",
    initialState,
    reducers: {
        addHabit: (state, action: PayloadAction<{name: string, category: string}>) => {
            const generetedId = Date.now().toLocaleString() + Math.random().toString(36).slice(2,9)
            const { name, category} = action.payload
            state.push({
                id: generetedId,
                name: name,
                category: category,
                completed: false
            })
        },
        removeHabit:(state, action: PayloadAction<{id: string}>) => {
            return state.filter((h) => h.id !== action.payload.id)
        },
        editHabit: (state, action) => {
            const habit = state.find((h) => h.id === action.payload.id)
            if(habit) {
                habit.name = action.payload.name
                habit.category = action.payload.category
                if(action.payload.category) habit.category = action.payload.category
            }
        },
        toggleHabit: (state, action) => {
            const habit = state.find((h) => h.id === action.payload.id)
            if(habit) habit.completed = !habit.completed
        },
    }
})

export const { addHabit, removeHabit, editHabit, toggleHabit} = habitsSlice.actions
export default habitsSlice.reducer
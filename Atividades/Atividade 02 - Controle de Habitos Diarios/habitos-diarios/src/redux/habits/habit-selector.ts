export const selectExcludeHabitCompleted = (habitsReducer: any) => {
    return habitsReducer.filter((h:any) => !h.completed)
}
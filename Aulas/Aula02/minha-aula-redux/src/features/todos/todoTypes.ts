export type Priority = "low" | "medium" | "high"

export type Todo = {
    id: string,
    text: string,
    completed: boolean,
    priority: Priority
}
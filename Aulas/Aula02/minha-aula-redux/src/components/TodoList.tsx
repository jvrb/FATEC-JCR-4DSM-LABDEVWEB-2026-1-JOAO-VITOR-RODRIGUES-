import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { clearCompleted} from "../features/todos/todosSlice"
import TodoItem from "./TodoItem";
import { store } from "../app/store";

export default function TodoList() {
    const todos = useAppSelector((state) => state.todos)
    const [filter, setFilter ]= useState<"all" | "active" | "completed">("all")

    const filtered = todos.filter((t: any) => {
        if(filter === "all") return true;
        if(filter === "active") return !t.completed
        return t.completed
    })

    return (
        <div>
            <div style={{ marginBottom: 8}}>
                <label>Filtrar: </label>
                <select value={filter} onChange={(e) => setFilter(e.target.value as any)}>
                    <option value="all">Todas</option>
                    <option value="active">Ativas</option>
                    <option value="completed">Concluidas</option>
                </select>
            </div>

            <div style={{ border: "1px solid #ddd", borderRadius: 6}}>
                {
                    filtered.length === 0 ? (
                        <div style={{ padding: 12 }}>Nenhuma tarefa.</div>
                    ) : (
                        filtered.map((t) => <TodoItem key={t.id} todo={t}/>)
                    )
                }
            </div>

            <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between"}}>
                <small>Total: {todos.length}</small>
                <button onClick={() => store.dispatch(clearCompleted())}>Limpar Concluidas</button>
            </div>
        </div>
    )
}
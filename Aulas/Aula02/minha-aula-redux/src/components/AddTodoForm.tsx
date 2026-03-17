import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addTodo } from "../features/todos/todosSlice"
import type { Priority } from "../features/todos/todoTypes"

export default function AddTodoForm() {
    const dispatch = useAppDispatch()
    const [text, setText] = useState("")
    const [priority, setPriority] = useState<Priority>("low")

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if(!text.trim()) return;
        dispatch(addTodo({ text: text.trim(), priority }))
        setText("")
        setPriority("low")
    }

    return (
        <form onSubmit={handleSubmit} style={{marginBottom: 12}}>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="O que quer fazer?"
                style={{ padding: 8, width: "60%", marginRight: 8 }}
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                style={{ padding: 8, marginRight: 8 }}
            >
                <option value={"low"}>Baixa</option>
                <option value={"medium"}>Média</option>
                <option value={"high"}>Alta</option>
            </select>
            <button type="submit" style={{ padding: "8px 12px"}}>
                Adicionar
            </button>
        </form>
    )
}
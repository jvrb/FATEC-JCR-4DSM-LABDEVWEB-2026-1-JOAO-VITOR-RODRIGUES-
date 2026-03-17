import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { toggleTodo, deleteTodo, editTodo } from "../features/todos/todosSlice"
import type { Todo, Priority } from "../features/todos/todoTypes"

export default function TodoItem({ todo }: { todo: Todo}){
    const dispatch = useAppDispatch()
    const [editing, setEditing] = useState(false)
    const [text, setText] = useState(todo.text)
    const [priority, setPriority] = useState<Priority>(todo.priority)

    function saveEdit(){
        if(!text.trim()) return
        dispatch(editTodo({id: todo.id, text: text.trim(), priority }))
        setEditing(false)
    }

    return(
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 8,
                borderBottom: "1px solid #eee"
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 8}}>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => dispatch(toggleTodo(todo.id))}
                />

                {
                    !editing ? (
                        <div style={{ display: "flex", flexDirection: "column"}}>
                            <span style={{ textDecoration: todo.completed ? "line-through" : "none"}}>
                                {todo.text}
                            </span>
                            <small>Prioridade: {todo.priority}</small>
                        </div>    
                    ) : (
                        <div style={{ display: "flex", gap: 8, alignItems: "center"}}>
                            <input value={text} onChange={(e) => setText(e.target.value)}/>
                            <select value={priority} onChange={(e) => setPriority(e.target.value as Priority)}>
                                <option value="low">Baixa</option>
                                <option value="medium">Média</option>
                                <option value="high">Alta</option>
                            </select>
                            <button onClick={saveEdit}>Salvar</button>
                            <button onClick={()=> setEditing(false)}>Cancelar</button>
                        </div>    
                    )
                }
            </div>

            {
                !editing && (
                    <div style={{ display: "flex", gap: 8}}>
                        <button onClick={() => setEditing(true)}>Alterar</button>
                        <button onClick={() => dispatch(deleteTodo(todo.id))}>Excluir</button>
                    </div>
                )
            }
        </div>
    )
}
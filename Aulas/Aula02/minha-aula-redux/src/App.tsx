import { Provider } from "react-redux"
import { store } from "./app/store"
import TodoList from "./components/TodoList"
import AddTodoForm from "./components/AddTodoForm"

export default function App(){
  return(
    <Provider store={store}>
      <div style={{maxWidth: 10245, margin: "24px auto", padding: 16}}>
        <h1 style={{ textAlign: "center"}}>Aula 2 - Exemplo de React + Redux Toolkit + Typescript</h1>

        <section style={{marginTop: 16}}>
          <h2>Adicionar Tarefa</h2>
          <AddTodoForm />
        </section>

        <section style={{marginTop: 16}}>
          <h2>Lista</h2>
          <TodoList />
        </section>

        <footer style={{marginTop: 24, textAlign: "center", color: "#666"}}>
          App utilizando o slices, store, Provider e hooks tipados
        </footer>

      </div>
    </Provider>
  )
}

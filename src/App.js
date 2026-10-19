// Importamos React para poder usar sus hooks (useState, etc.).
import React from "react";

// Importamos cada componente desde su propio archivo. Cada uno vive aparte
// y se encarga de una sola cosa (contador, lista, item, buscador, botón).
import { TodoCounter } from "./TodoCounter";
import { TodoItem } from "./TodoItem";
import { TodoList } from "./TodoList";
import { TodoSearch } from "./TodoSearch";
import { CreateTodoButton } from "./CreateTodoButton";

// Lista inicial de tareas que se muestra la primera vez que se abre la app.
// Cada tarea es un objeto con dos propiedades:
//   - text: el texto que verá el usuario.
//   - completed: true si ya está hecha, false si está pendiente.
const defaultTodos = [
  { text: "Prepare Development React JS Environment", completed: true },
  { text: "Take React.js Introductory Course", completed: false },
  { text: "Execute npm start command on console", completed: false },
  { text: "Check the App on Browser", completed: false },
  { text: "Use derived states", completed: true },
];

// Componente principal de la aplicación. Devuelve toda la interfaz
// y maneja el estado global (lista de tareas y texto del buscador).
function App() {
  // El estado en React es inmutable: nunca se modifica directamente.
  // Siempre se cambia llamando al setter (setTodos, setSearchValue),
  // que es lo que hace que React vuelva a dibujar el componente.

  // ESTADO 1: la lista de tareas.
  //   - todos: la lista actual (arranca en defaultTodos).
  //   - setTodos: función para reemplazar la lista.
  const [todos, setTodos] = React.useState(defaultTodos);

  // ESTADO 2: el texto escrito en el buscador.
  //   - searchValue: lo que hay escrito ahora en el input (arranca vacío).
  //   - setSearchValue: función para actualizarlo cuando el usuario teclea.
  const [searchValue, setSearchValue] = React.useState("");

  // ESTADOS DERIVADOS: no se guardan con useState, se calculan a partir
  // del estado "todos" en cada render. Si "todos" cambia, estos valores
  // se recalculan solos y nunca pueden quedar desincronizados.
  const completedTodos = todos.filter((todo) => todo.completed).length; // cuántas completadas
  const totalTodos = todos.length;                                      // cuántas en total

  // Estado derivado del buscador: a partir de "todos" y "searchValue",
  // devuelve solo las tareas cuyo texto contiene lo que el usuario escribió.
  // Pasamos ambos textos a minúsculas con toLowerCase() para que la búsqueda
  // no distinga entre mayúsculas y minúsculas.
  const searchedTodos = todos.filter((todo) => {
    const todoText = todo.text.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return todoText.includes(searchText);
  });

  // Log de depuración: imprime en la consola del navegador lo que se busca.
  // Útil durante el curso para ver cómo cambia searchValue en cada render.
  console.log("Users find all of " + searchValue);

  // JSX que describe la interfaz. React lo convierte en elementos del DOM.
  // El fragmento <> </> permite devolver varios elementos sin envolverlos
  // en un <div> innecesario.
  return (
    <>
      {/* Contador: muestra "X de Y completadas". Recibe los valores derivados. */}
      <TodoCounter completed={completedTodos} total={totalTodos} />

      {/* Buscador: le pasamos el estado y su setter para que sea un input
          controlado (quien manda el valor del input es App, no el navegador). */}
      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />

      {/* Lista: contenedor <ul>. Recorremos searchedTodos (NO todos) con .map()
          para que solo se vean las tareas que coinciden con la búsqueda.
          - key={todo.text}: React necesita una clave única por elemento
            para saber cuáles cambian; aquí usamos el texto de la tarea. */}
      <TodoList>
        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
          />
        ))}
      </TodoList>

      {/* Botón flotante "+" para crear tareas nuevas (sin lógica todavía). */}
      <CreateTodoButton />
    </>
  );
}

// Exportamos App como default para que index.js lo importe y lo renderice.
export default App;

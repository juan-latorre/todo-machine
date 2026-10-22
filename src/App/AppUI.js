// Import each UI component from its own file. Each one lives in its own
// module and has a single responsibility (counter, list, item, search, button).
import { TodoCounter } from "../TodoCounter";
import { TodoItem } from "../TodoItem";
import { TodoList } from "../TodoList";
import { TodoSearch } from "../TodoSearch";
import { CreateTodoButton } from "../CreateTodoButton";

function AppUI({
  completedTodos,
  totalTodos,
  searchValue,
  setSearchValue,
  searchedTodos,
  completeTodo,
  deleteTodo,
}) {
  // JSX that describes the UI. React turns it into DOM elements. The fragment
  // <> </> lets us return several siblings without an extra wrapping <div>.
  return (
    <>
      {/* Counter: shows "X of Y completed". Receives the derived values. */}
      <TodoCounter completed={completedTodos} total={totalTodos} />

      {/* Search box: we pass both the state and its setter so the input is
          controlled (App owns the value, not the browser). */}
      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue} />

      {/* List: a <ul> container. We iterate over searchedTodos (NOT todos)
          with .map() so only matching tasks are rendered.
          - key={todo.text}: React needs a unique key per element to track
            which items change; here we use the TODO's text.
          - onComplete/onDelete: callbacks that call completeTodo/deleteTodo
            with this TODO's text. */}
      <TodoList>
        {searchedTodos.map((todo) => (
          <TodoItem
            key={todo.text}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => completeTodo(todo.text)}
            onDelete={() => deleteTodo(todo.text)}
          />
        ))}
      </TodoList>

      {/* Floating "+" button to create new TODOs (no logic yet). */}
      <CreateTodoButton />
    </>
  );
}

export { AppUI };


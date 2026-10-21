// Import React so we can use its hooks (useState, etc.).
import React from "react";

// Import each UI component from its own file. Each one lives in its own
// module and has a single responsibility (counter, list, item, search, button).
import { TodoCounter } from "./TodoCounter";
import { TodoItem } from "./TodoItem";
import { TodoList } from "./TodoList";
import { TodoSearch } from "./TodoSearch";
import { CreateTodoButton } from "./CreateTodoButton";

// Initial list of TODOs used before we moved the data to localStorage.
// Each TODO is an object with two properties:
//   - text: the text shown to the user.
//   - completed: true if the task is done, false if it is still pending.
// Left here as a reference; the app now starts from an empty list and
// loads whatever is stored under the "TODOS_V1" key in localStorage.
// const defaultTodos = [
//  { text: "Prepare Development React JS Environment", completed: true },
//  { text: "Take React.js Introductory Course", completed: false },
//  { text: "Execute npm start command on console", completed: false },
//  { text: "Check the App on Browser", completed: false },
//  { text: "Use derived states", completed: true },
// ];

// Custom hook: persists any piece of state in the browser's localStorage.
// Behaves like React.useState, but also reads from and writes to localStorage
// so the value survives page reloads.
//
// Parameters:
//   - itemName: the key under which the value is stored in localStorage.
//   - initialValue: the value to use the first time (when nothing is stored yet).
//
// Returns [item, saveItem]:
//   - item: the current value.
//   - saveItem: a setter that updates both the React state and localStorage.
function useLocalStorage(itemName, initialValue) {
  // Read whatever is stored under itemName. Returns null if nothing is stored.
  const localStorageItem = localStorage.getItem(itemName);

  let parsedItem;

  if (!localStorageItem) {
    // First run (or key was cleared): seed localStorage with the initial value
    // serialized as JSON, and use the initial value for the state.
    localStorage.setItem(itemName, JSON.stringify(initialValue));
    parsedItem = initialValue;
  } else {
    // There was something stored. Parse the JSON string back into a JS value.
    parsedItem = JSON.parse(localStorageItem);
  }

  // Local React state seeded with whatever we loaded (or just stored).
  const [item, setItem] = React.useState(parsedItem);

  // Setter wrapper: writes the new value to localStorage AND updates the state
  // so the component re-renders. Always use this instead of setItem directly.
  const saveItem = (newItem) => {
    localStorage.setItem(itemName, JSON.stringify(newItem));
    setItem(newItem);
  };

  return [item, saveItem];
}

// Main application component. Returns the whole UI and holds the global state
// (the list of TODOs and the current search text).
function App() {
  // State in React is immutable: never mutate it directly.
  // Always update it by calling its setter (saveTodos, setSearchValue),
  // which is what triggers a re-render.

  // STATE 1: the list of TODOs.
  //   - todos: the current list (loaded from localStorage; starts as [] the
  //     first time the app runs).
  //   - saveTodos: setter that writes the new list to localStorage and updates
  //     the React state in one step.
  // const [todos, setTodos] = React.useState(parsedTodos); // previous version
  const [todos, saveTodos] = useLocalStorage("TODOS_V1", []);

  // STATE 2: the text typed in the search box.
  //   - searchValue: the current input value (starts empty).
  //   - setSearchValue: setter called on every keystroke.
  // const [searchValue, setSearchValue] = React.useState(""); // previous version
  const [searchValue, setSearchValue] = React.useState("");

  // DERIVED STATE: not stored with useState. Recomputed from "todos" on every
  // render. If "todos" changes, these values are recalculated automatically
  // and can never fall out of sync with the real list.
  const completedTodos = todos.filter((todo) => todo.completed).length; // how many are done
  const totalTodos = todos.length;                                      // how many in total

  // Search-derived state: from "todos" and "searchValue", return only the
  // TODOs whose text contains what the user typed. Both strings are lowercased
  // with toLowerCase() so the match is case-insensitive.
  const searchedTodos = todos.filter((todo) => {
    const todoText = todo.text.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return todoText.includes(searchText);
  });

  // Debug log kept from an earlier class: prints what the user is searching.
  // Useful to see how searchValue changes on every render. Enable if needed.
  //console.log("Users find all of " + searchValue);

  // Mark a TODO as completed. Takes the TODO's text as identifier, makes a
  // shallow copy of the list (React state must not be mutated), finds the item
  // by text, sets its "completed" flag and persists the new list.
  const completeTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text == text);
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  // Delete a TODO. Same pattern: copy the list, find the item by text, remove
  // it with splice, and persist the new list.
  const deleteTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text == text);
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

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

// Default export: index.js imports App from here and renders it.
export default App;

import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider({ children }) {
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);
  const [searchValue, setSearchValue] = React.useState("");

  // DERIVED STATE: not stored with useState. Recomputed from "todos" on every
  // render. If "todos" changes, these values are recalculated automatically
  // and can never fall out of sync with the real list.
  const completedTodos = todos.filter((todo) => todo.completed).length; // how many are done
  const totalTodos = todos.length; // how many in total

  // Search-derived state: from "todos" and "searchValue", return only the
  // TODOs whose text contains what the user typed. Both strings are lowercased
  // with toLowerCase() so the match is case-insensitive.
  const searchedTodos = todos.filter((todo) => {
    const todoText = todo.text.toLowerCase();
    const searchText = searchValue.toLowerCase();
    return todoText.includes(searchText);
  });

  const completeTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  // Delete a TODO. Same pattern: copy the list, find the item by text, remove
  // it with splice, and persist the new list.
  const deleteTodo = (text) => {
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo) => todo.text === text);
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        loading,
        error,
        completedTodos,
        totalTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };

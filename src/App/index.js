import { TodoProvider } from "../TodoContext";
import { AppUI } from "./AppUI";

// Main application component. Returns the whole UI and holds the global state
// (the list of TODOs and the current search text).
function App() {
  return (
    <TodoProvider>
      <AppUI />
    </TodoProvider>
  );
}

// Default export: index.js imports App from here and renders it.
export default App;

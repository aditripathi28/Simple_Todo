import { useEffect, useState } from "react";
import { MdCheck, MdDeleteForever } from "react-icons/md";
import "./Todo.css";
import TodoList from "./TodoList.jsx";


export default function Todo() {

  const [inputValue, setInputValue] = useState({
    id: "",
    content: "",
    checked: false
  });

  const [todos, setTodos] = useState(() => {
  try {
    const rawTodos = localStorage.getItem("localTodos");

    if (!rawTodos || rawTodos === "undefined") {
      return [];
    }

    return JSON.parse(rawTodos);
  } catch (error) {
    return [];
  }
});

  const [dateTime, setDateTime] = useState("");

  // Handle input change
  const handleInputChange = (value) => {
    setInputValue({
      id: Date.now(),
      content: value,
      checked: false
    });
  };

  // Submit todo
  const handleOnSubmit = (event) => {
    event.preventDefault();

    const { id, content, checked } = inputValue;

    if (!content.trim()) return;

    const ifTodoContentMatched = todos.find(
      (currTask) => currTask.content === content
    );

    if (ifTodoContentMatched) return;

    setTodos((prevTask) => [...prevTask, { id, content, checked }]);

    setInputValue({
      id: "",
      content: "",
      checked: false
    });
  };

  // Date and Time
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const formattedDate = now.toLocaleDateString();
      const formattedTime = now.toLocaleTimeString();

      setDateTime(`${formattedDate} - ${formattedTime}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Delete todo
  const handleDelete = (todo) => {
    const updatedDelete = todos.filter(
      (currTodo) => currTodo.id !== todo.id
    );

    setTodos(updatedDelete);
  };

  // Clear all
  const handleClearAll = () => {
    setTodos([]);
  };

  // Toggle check
  const handleCheck = (todo) => {
    const updatedTodos = todos.map((currTodo) => {
      if (currTodo.id === todo.id) {
        return { ...currTodo, checked: !currTodo.checked };
      }
      return currTodo;
    });

    setTodos(updatedTodos);
  };
// save to local storaghe for refresh 
   useEffect(() => {
    localStorage.setItem("localTodos", JSON.stringify(todos));
  }, [todos]);


  return (
    <section className="Todo-container">

      <header>
        <h1>Todo List</h1>
        <h2 className="date-time">{dateTime}</h2>
      </header>

      <section className="Form">
        <form onSubmit={handleOnSubmit}>

          <div>
            <input
              type="text"
              className="Todo-input"
              autoComplete="off"
              value={inputValue.content}
              onChange={(event) =>
                handleInputChange(event.target.value)
              }
            />
          </div>

          <div>
            <button type="submit" className="Todo-button">
              Add Task
            </button>
          </div>

        </form>
      </section>

      <TodoList
      todos={todos}
      onDelete={handleDelete}
      onCheck={handleCheck}
    />

      <section className="Clear-all" onClick={handleClearAll}>
        Clear All
      </section>

    </section>
  );
}
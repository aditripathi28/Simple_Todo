import { MdCheck, MdDeleteForever } from "react-icons/md";

export default function TodoList({ todos, onDelete, onCheck }) {

  return (
    <section className="myUnOrderedList">
      <ul>
        {todos.map((currTodo) => {
          return (
            <li key={currTodo.id} className="Todo-item">

              <span
                style={{
                  textDecoration: currTodo.checked
                    ? "line-through"
                    : "none"
                }}
              >
                {currTodo.content}
              </span>

              <button
                className="Check-button"
                onClick={() => onCheck(currTodo)}
              >
                <MdCheck />
              </button>

              <button
                className="Delete-button"
                onClick={() => onDelete(currTodo)}
              >
                <MdDeleteForever />
              </button>

            </li>
          );
        })}
      </ul>
    </section>
  );
}
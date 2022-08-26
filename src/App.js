import React, { useState } from "react";
import { BsTrash } from "react-icons/bs";
import "./App.css";

function App() {
  const [newTask, setNewTask] = useState({ title: "", message: "" });

  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <td>Id</td>
            <td>Title</td>
            <td>Message</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {!loading &&
            data.tasks.map(({ id, title, message }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{title}</td>
                <td>{message}</td>
                <td
                  className="trash"
                  onClick={() =>
                    deleteTaskMutation({ variables: { taskId: id } }).then(() =>
                      refetch({})
                    )
                  }
                >
                  <BsTrash />
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          createTaskMutation({ variables: newTask })
            .then(() => setNewTask({ title: "", message: "" }))
            .then(() => refetch({}));
        }}
      >
        <h1>Create Task</h1>

        <input
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          placeholder="Message"
          value={newTask.message}
          onChange={(e) => setNewTask({ ...newTask, message: e.target.value })}
        />
        <button type="submit"> Create Task</button>
      </form>
    </div>
  );
}

export default App;

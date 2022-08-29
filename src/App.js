import React, {useEffect, useState} from "react";
import {BsTrash} from "react-icons/bs";
import "./App.css";

function App() {
    const [newTask, setNewTask] = useState({title: "", message: ""});
    const [tasks, setTasks] = useState([]);

    function createTask() {
        return fetch(`http://localhost:3001/tasks`, {
            method: 'POST', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, body: JSON.stringify(newTask)
        })
    }

    function deleteTask(taskId) {
        return fetch(`http://localhost:3001/tasks/${taskId}`, {method: 'DELETE'})
    }

    function getAllTasks() {
        return fetch(`http://localhost:3001/tasks`)
            .then((response) => response.json())
            .then((response) => setTasks(response));
    }

    useEffect(() => {
        getAllTasks()
    }, []);

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
                {tasks.map(({taskid, title, message}) => (
                    <tr key={taskid}>
                        <td>{taskid}</td>
                        <td>{title}</td>
                        <td>{message}</td>
                        <td
                            className="trash"
                            onClick={() =>
                                deleteTask(taskid).then(getAllTasks)
                            }
                        >
                            <BsTrash/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createTask({variables: newTask})
                        .then(() => setNewTask({title: "", message: ""}))
                        .then(getAllTasks);
                }}
            >
                <h1>Create Task</h1>

                <input
                    placeholder="Title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                />
                <input
                    placeholder="Message"
                    value={newTask.message}
                    onChange={(e) => setNewTask({...newTask, message: e.target.value})}
                />
                <button type="submit"> Create Task</button>
            </form>
        </div>
    );
}

export default App;

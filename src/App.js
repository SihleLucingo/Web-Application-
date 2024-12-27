import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [editTaskId, setEditTaskId] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editTaskId) {
            await axios.put(`http://localhost:5000/api/tasks/${editTaskId}`, { title: taskTitle });
        } else {
            await axios.post('http://localhost:5000/api/tasks', { title: taskTitle });
        }
        setTaskTitle('');
        setEditTaskId(null);
        fetchTasks();
    };

    const handleEdit = (task) => {
        setTaskTitle(task.title);
        setEditTaskId(task._id);
    };

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/api/tasks/${id}`);
        fetchTasks();
    };

    return (
        <div className="App">
            <h1>Task Manager</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    placeholder="Enter task title"
                />
                <button type="submit">{editTaskId ? 'Update' : 'Add'} Task</button>
            </form>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        {task.title}
                        <button onClick={() => handleEdit(task)}>Edit</button>
                        <button onClick={() => handleDelete(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;

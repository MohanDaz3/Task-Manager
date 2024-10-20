import { useEffect, useState } from 'react';
import axios from 'axios';
import './TaskList.css';
import TaskEditForm from './TaskEditForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]); // Initially store all tasks
    const [statusFilter, setStatusFilter] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [categories, setCategories] = useState([]); // State for categories
    const [editingTask, setEditingTask] = useState(null);
    const token = localStorage.getItem('token');

    // Hardcoded statuses
    const statuses = ['pending', 'In Progress', 'Completed'];

    // Fetch all tasks when the component mounts
    const fetchAllTasks = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_TASK_API_URL}/allTasks`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the header
                },
            });
            setTasks(response.data); // Set all tasks in state
        } catch (err) {
            console.error('Failed to fetch tasks', err);
        }
    };

    // Fetch filtered tasks based on status and category
    const fetchFilteredTasks = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_TASK_API_URL}/filteredTasks`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the header
                },
                params: {
                    status: statusFilter,
                    category: categoryFilter,
                },
            });
            setTasks(response.data); // Set filtered tasks in state
        } catch (err) {
            console.error('Failed to fetch filtered tasks', err);
        }
    };

    useEffect(() => {
        if (token) { // Ensure the token exists before making the request
            fetchAllTasks(); // Load all tasks on mount
        }
    }, [token]);

    // Fetch categories from the database
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_CATEGORY_API_URL}/categories`);
                setCategories(response.data); // Assume the response is an array of categories
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    // Refetch filtered tasks when the filters change
    useEffect(() => {
        if (statusFilter || categoryFilter) {
            fetchFilteredTasks(); // Fetch tasks based on filters
        } else {
            fetchAllTasks(); // Fetch all tasks if no filters are applied
        }
    }, [statusFilter, categoryFilter]);

    const handleDelete = async (taskId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_TASK_API_URL}/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the header
                },
            });
            setTasks(tasks.filter(task => task._id !== taskId)); // Update the task list after deletion
            alert('Task deleted successfully');
        } catch (err) {
            console.error('Failed to delete task', err);
            alert('Error deleting task. Please try again.'); // Notify user in case of an error
        }
    };

    const handleEdit = (task) => {
        setEditingTask(task); // Set the task to be edited
    };

    const handleCloseForm = async () => {
        setEditingTask(null); // Close the form
        await fetchAllTasks(); // Refresh task list after editing
    };

    return (
        <div>
            <h2>Task List</h2>

            {/* Dropdown filters */}
            <div className="filters">
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="">All Statuses</option>
                    {statuses.map((status, index) => (
                        <option key={index} value={status}>
                            {status}
                        </option>
                    ))}
                </select>

                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Tasks Table */}
            <table className="task-list-table">
                <thead>
                    <tr>
                        <th>Task Name</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task._id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                            <td>{task.status}</td>
                            <td>
                                {typeof task.category === "object"
                                    ? task.category.name
                                    : task.category}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(task)}>Edit</button>
                                <button onClick={() => handleDelete(task._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Conditionally render TaskEditForm for editing */}
            {editingTask && (
                <TaskEditForm task={editingTask} onClose={handleCloseForm} />
            )}
        </div>
    );
};

export default TaskList;

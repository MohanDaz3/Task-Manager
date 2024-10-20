import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TaskEditForm.css'; // CSS file for styling

const TaskEditForm = ({ task, onClose }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const [status, setStatus] = useState(''); // State for task status
    const token = localStorage.getItem('token');

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

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setDueDate(new Date(task.dueDate));
            setSelectedCategoryId(task.category); // Set the category from the task
            setStatus(task.status); // Set the status from the task
        }
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (task) {
                // Update existing task
                const response = await axios.put(`${import.meta.env.VITE_TASK_API_URL}/${task._id}`, {
                    title,
                    description,
                    category: selectedCategoryId,
                    dueDate,
                    status, // Include status in update
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adding token to Authorization header
                    }
                });
                console.log('Task updated:', response.data); // Log the response data for debugging
            } else {
                console.log("task not found");
            }
            onClose(); // Close form after submission
        } catch (err) {
            console.error('Failed to create/update task', err.response ? err.response.data : err.message);
        }
    };
    

    return (
        <div className="task-form-container">
            <h2>{task ? 'Edit Task' : 'Create Task'}</h2>
            <form onSubmit={handleSubmit} className="task-form">
                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="task-input"
                />
                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="task-textarea"
                />

                {/* Category Dropdown */}
                <select
                    value={selectedCategoryId || ''}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    className="task-select"
                >
                    <option value="" disabled>Select Category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                {/* Date Picker */}
                <DatePicker
                    selected={dueDate}
                    onChange={(date) => setDueDate(date)}
                    className="task-datepicker"
                />

                {/* Radio buttons for status */}
                <div className="task-status">
                    <label>
                        <input
                            type="radio"
                            value="Pending"
                            checked={status === 'Pending'}
                            onChange={() => setStatus('pending')}
                        />
                        Pending
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="In Progress"
                            checked={status === 'In Progress'}
                            onChange={() => setStatus('In Progress')}
                        />
                        In Progress
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Completed"
                            checked={status === 'Completed'}
                            onChange={() => setStatus('Completed')}
                        />
                        Completed
                    </label>
                </div>

                <div className="task-buttons">
                    <button type="submit" className="task-button">
                        {task ? 'Update Task' : 'Create Task'}
                    </button>
                    <button type="button" onClick={onClose} className="task-button cancel-button">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default TaskEditForm;

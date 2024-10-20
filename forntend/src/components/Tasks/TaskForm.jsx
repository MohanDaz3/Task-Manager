import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TaskForm.css'; // CSS file for styling

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState(new Date()); // Default to current date
    const [categories, setCategories] = useState([]);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate()

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_TASK_API_URL}/create`, {
                title,
                description,
                category: selectedCategoryId, // Use selectedCategoryId here
                dueDate,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Adding token to Authorization header
                }
            });
            if(response){
                alert("Task created successfully")
                console.log('Task created:', response.data);
                setTitle('')
                setDescription('')
            }
            
        } catch (err) {
            console.error('Failed to create task', err);
        }
    };

    return (
        <div className="task-form-container">
            <h2>Create Task</h2>
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

                <button type="submit" className="task-button">Create Task</button>
            </form>
        </div>
    );
};

export default TaskForm;

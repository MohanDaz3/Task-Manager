import React, { useState } from 'react';
import axios from 'axios';
import './CategoryForm.css'; // Import your CSS file for styling

const CategoryForm = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear any previous errors

        try {
            const response = await axios.post(`${import.meta.env.VITE_CATEGORY_API_URL}/create`, {
                name,
                
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // Adding token to Authorization header
                }
            });
            if(response){
                alert("Category created successfully")
                console.log('category created:', response.data);
                setName('');
            }
        } catch (err) {
            console.error('Failed to create task', err);
        }
    };

    return (
        <div className="category-form-container">
            <h2>Create New Category</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="category-form">
                <div className="form-group">
                    <label htmlFor="categoryName">Category Name</label>
                    <input
                        type="text"
                        id="categoryName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Enter category name"
                    />
                </div>
                <button type="submit" className="submit-button">Create Category</button>
            </form>
        </div>
    );
};

export default CategoryForm;

import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios for making API calls
import './CategoryList.css'; // Import your CSS file for styling

const CategoryList = ({ setView }) => { // Accept setView as a prop
    const [categories, setCategories] = useState([]);
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

    const handleDelete = async (categoryId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_CATEGORY_API_URL}/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the header
                },
            });
            setCategories(categories.filter(category => category._id !== categoryId)); // Update the task list after deletion
            alert('Task deleted successfully');
        } catch (err) {
            console.error('Failed to delete task', err);
            alert('Error deleting task. Please try again.'); // Notify user in case of an error
        }
    };

    const handleCreateCategory = () => {
        setView('category'); // Change the view to show the CategoryForm
    };

    return (
        <div className="category-list-container">
            <h2>Category List</h2>

            {/* Create Category Button */}
            <button className="create-category-button" onClick={handleCreateCategory}>
                Create Category
            </button>

            {/* Categories Table */}
            <table className="category-table">
                <thead>
                    <tr>
                        <th>Category Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>
                                <button className="delete-button" onClick={() => handleDelete(category._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;

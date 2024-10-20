import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/Tasks/TaskList';
import TaskForm from '../components/Tasks/TaskForm';
import Category from '../components/Category/CategoryForm';
import CategoryList from '../components/Category/CategoryList';
import './Dashboard.css'; // Import the CSS for styling and animations

const Dashboard = () => {
    const [view, setView] = useState('taskForm'); // State to manage which component to show
    const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogout = () => {
        // Clear the token from local storage
        localStorage.removeItem('token');
        alert('Logging out...'); // Optional alert
        navigate('/'); // Redirect to home
    };

    return (
        <div className="dashboard-container">
            {/* Header with title and profile icon */}
            <div className="dashboard-header">
                <h1 className="dashboard-title">Dashboard</h1>

                {/* Profile holder */}
                <div className="profile-holder">
                    <div
                        className="profile-icon"
                        onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown on click
                    >
                        <img src="/head.png" alt="Profile" />
                    </div>

                    {/* Dropdown menu */}
                    {showDropdown && (
                        <div className="dropdown-menu">
                            <button className="logout-button" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Task Form, Task List, and Category toggle buttons */}
            <div className="button-container">
                <button
                    className={`toggle-button ${view === 'taskForm' ? 'active' : ''}`}
                    onClick={() => setView('taskForm')}
                >
                    Show Task Form
                </button>
                <button
                    className={`toggle-button ${view === 'taskList' ? 'active' : ''}`}
                    onClick={() => setView('taskList')}
                >
                    Show Task List
                </button>
                <button
                    className={`toggle-button ${view === 'categoryList' ? 'active' : ''}`}
                    onClick={() => setView('categoryList')}
                >
                    Category List
                </button>
            </div>

            {/* Content area */}
            <div className="content-container">
                {view === 'taskForm' && <TaskForm />}
                {view === 'taskList' && <TaskList />}
                {view === 'category' && <Category />} {/* Show CategoryForm */}
                {view === 'categoryList' && <CategoryList setView={setView} />}
            </div>
        </div>
    );
};

export default Dashboard;

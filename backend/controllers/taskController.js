const Task = require('../models/task');
const Category = require('../models/category');
// const mongoose = require('mongoose');

// Get all tasks for a user
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user }).populate('category');
        res.json(tasks);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Get filtered tasks by status or category
exports.getFilteredTasks = async (req, res) => {
    const { status, category } = req.query; // Retrieve filters from query params
    const validStatuses = ['pending', 'In Progress', 'Completed']; // Example of valid statuses
    

    // Validate status
    if (status && !validStatuses.includes(status)) {
        return res.status(400).json({ msg: 'Invalid status filter' });
    }

    // Build a query object
    let query = { user: req.user }; // Base query to filter tasks for the authenticated user

    if (status) {
        query.status = status; // Add status filter if present
    }

    // If category is provided, convert it to an ObjectId
    if (category) {
        const categoryId = await Category.findOne({ name: category }); // Adjust the query to match your Category model
        if (categoryId) {
            query.category = categoryId._id; // Add category filter using ObjectId
        } else {
            return res.status(400).json({ msg: 'Invalid category filter' }); // Return error if category not found
        }
    }

    try {
        const tasks = await Task.find(query).populate('category'); // Execute query with filters
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ msg: 'Server error', error: error.message }); // Include error message for debugging
    }
};

// Create a new task
exports.createTask = async (req, res) => {
    const { title, description, category, status = 'pending', dueDate } = req.body;

    try {
        
        const task = new Task({
            title,
            description,
            category,
            status,
            dueDate,
            user: req.user // Ensure req.user is available
        });
        await task.save();
        res.json(task);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).send('Server error');
    }
};


// Update a task
exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        // Check if the task exists and if the user has permission to update it
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }
        if (task.user.toString() !== req.user._id.toString()) { // Ensure req.user.id is being used
            return res.status(403).json({ msg: 'Not authorized' }); // Return forbidden if unauthorized
        }

        // Update the task
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send('Server error');
    }
};


// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        
        const task = await Task.findById(req.params.id);
    
        // Check if the task exists and if the logged-in user is the owner
        if (!task || task.user.toString() !== req.user._id.toString()) {
            
            return res.status(404).json({ msg: 'Task not found or not authorized' });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Task removed successfully' });
    } catch (error) {
        console.error("Error while deleting task:", error);
        res.status(500).send('Server error');
    }
};



const Category = require('../models/category');

// Get all categories for a user
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).send('Server error');
    }
};

// Create a new category
exports.createCategory = async (req, res) => {
    const { name } = req.body;

    try {
        const category = new Category({
            name,
            user: req.user // Ensure you have the user attached to the category
        });
        await category.save();
        res.status(201).json(category); // Return a 201 status with the created category
    } catch (error) {
        console.error('Error creating category:', error); // Log the error for debugging
        res.status(500).send('Server error');
    }
};


// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id; // Store the category ID
        console.log('Attempting to delete category with ID:', categoryId); // Log the ID for debugging

        // Find the category by ID
        const category = await Category.findById(categoryId);

        // Check if the category exists and if it belongs to the authenticated user
        if (!category || category.user.toString() !== req.user._id.toString()) {
            return res.status(404).json({ msg: 'Category not found or you do not have permission to delete it' });
        }

        // Remove the category
        await Category.findByIdAndDelete(categoryId);
        res.json({ msg: 'Category removed' });
    } catch (error) {
        console.error('Error deleting category:', error); // Log the error for debugging
        res.status(500).send('Server error');
    }
};


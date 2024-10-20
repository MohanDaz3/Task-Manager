const express = require('express');
const { getCategories, createCategory, deleteCategory } = require('../controllers/categoryController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/categories', getCategories);
router.post('/create', auth, createCategory);
router.delete('/:id', auth, deleteCategory);

module.exports = router;

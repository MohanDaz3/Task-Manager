const express = require('express');
const { getTasks, getFilteredTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/allTasks', auth, getTasks);
router.get('/filteredTasks', auth, getFilteredTasks);
router.post('/create',auth, createTask);
router.put('/:id', auth, updateTask);
router.delete('/:id', auth, deleteTask);

module.exports = router;

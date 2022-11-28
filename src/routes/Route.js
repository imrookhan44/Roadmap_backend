const express = require('express')
const router = express.Router();
const BoardController = require('../controllers/BoardControllers.js');
router.post('/user/data', BoardController.createBoard);
router.get('/user/data', BoardController.getBoards);
router.put('/user/data/:_id', BoardController.updateRoadmap);
router.delete('/user/data/:_id', BoardController.deleteRoadmap);
module.exports = router;


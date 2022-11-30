const express = require('express')
const router = express.Router();
const BoardController = require('../controllers/BoardControllers.js');
const AuthControllers = require('../controllers/AuthControllers.js');
router.post('/register', AuthControllers.signupUser);
router.post('/login', AuthControllers.loginUser);
router.post('/user/data', BoardController.createBoard);
router.get('/user/alldata', BoardController.getBoards);
router.put('/user/data/:_id', BoardController.updateRoadmap);
router.delete('/user/data/:_id', BoardController.deleteRoadmap);
router.get('/user/data/:_id', BoardController.GetById);
module.exports = router;

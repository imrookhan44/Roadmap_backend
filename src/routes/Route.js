const express = require('express')
const router = express.Router();
const BoardController = require('../controllers/BoardControllers.js');
// const praccontroller = require('../controllers/praccontroller.js')
const contentController = require('../controllers/content.js');
router.post('/user/data', BoardController.createBoard);
router.get('user/data', BoardController.getBoards)
router.post('/content/data', contentController.createContent)
router.get('/content/data', contentController.getContent)
router.put('/content/data/:_id', contentController.updateId)
router.delete('/content/data/:_id', contentController.DeleteByID )
// router.post('/prac/data', praccontroller.createForm)
// router.get('/prac/data', praccontroller.getForm)
// router.put('/prac/data/:_id', praccontroller.updatePrac)
module.exports = router;


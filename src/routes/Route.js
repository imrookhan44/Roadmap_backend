import express from 'express';
const router = express.Router();
import  BoardController from '../controllers/BoardControllers.js';
import AuthControllers from '../controllers/AuthControllers.js';
import { upload } from '../../helpers/upload.js';
import fs from 'fs';

router.get('/', ((req, res) => {
  res.send("welcome to roadmap");
}));
router.post('/register', AuthControllers.signupUser);
router.post('/login', AuthControllers.loginUser);
router.get('/verify', AuthControllers.verifyMail);
router.put('/forgetPassword', AuthControllers.forgetPassword);
router.post('/user/data', BoardController.createBoard);
router.get('/user/alldata', BoardController.getBoards);
router.put('/user/data/:_id', BoardController.updateRoadmap);
router.delete('/user/data/:_id', BoardController.deleteRoadmap);
router.get('/user/data/:_id', BoardController.GetById);
router.post('/sendEmail/:_id', BoardController.sendEmailAndSave);
router.post('/upload', upload.single("myFile") ,function(req, res) {
if (req.file){
    return res.status(200).json({
        message:'success'
    })
}
else{
    return res.status(404).json({
        message:'error'
    })
}
})


export default router;



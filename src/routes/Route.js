import express from "express";
const router = express.Router();
import BoardController from '../controllers/BoardControllers.js';
import AuthControllers from '../controllers/AuthControllers.js';
import TodoController from '../controllers/TodoController.js';
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
router.get('/user/alldata/:userIdd', BoardController.getBoards);
router.put('/user/data/:_id', BoardController.updateRoadmap);
router.delete('/user/data/:_id', BoardController.deleteRoadmap);
router.get('/user/data/:_id', BoardController.GetById);
router.post('/sendEmail/:_id', BoardController.sendEmailAndSave);
router.post('/upload', upload.single("myFile"), function (req, res) {
  // console.log('req',req.body);
  if (req.file) {
    // console.log(req.file);
    return res.status(200).json({
      message: "success",
    });
  } else {
    return res.status(404).json({
      message: 'error'
    })
  }
})

router.get('/getAllData', BoardController.getData);
router.post('/createTask', TodoController.createTask);
router.put('/updateTask', TodoController.updateTask);
router.post('/getTask', TodoController.getTask)
router.post('/deleteTask', TodoController.deleteTask);
router.get("/getAllUsers/:email", BoardController.getAllUsers)
router.get("/dashboard", BoardController.dashBoard);
router.put("/updateSignup", AuthControllers.updateSignup);
router.post("/userData", AuthControllers.userData)
export default router;

                                  

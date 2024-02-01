import express from 'express';
import userAuth from '../middelwares/authMiddleware.js';
import { getUserController, updateUserController } from '../controllers/userController.js';

//router object
const router = express.Router();

//routes

// GET USER DATA || POST
router.post("/get-user", userAuth, getUserController);

// UPDATE USER || PUT
router.put('/update-user', userAuth, updateUserController);


export default router;
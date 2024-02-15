import express from "express";
import userAuth from "../middelwares/authMiddleware.js";
import {
  getUserController,
  updateUserController,
  getAllUsersController,
  setAvatar,
  getAllUsers
} from "../controllers/userController.js";

//router object
const router = express.Router();

//routes

// GET USER DATA || POST
router.post("/get-user", userAuth, getUserController);

// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUserController);

//GET all USERS || GET
router.get("/get-all-users", userAuth, getAllUsersController);

router.post("/setavatar/:id", setAvatar);

router.get("/allusers", userAuth, getAllUsers);
export default router;

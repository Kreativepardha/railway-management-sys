import express from 'express';

import {  createUser, getUser, getAllUsers, returnCurrentUser, deleteUser  } from '../controllers/userController'
import {  isAuthenticated, isAdmin  } from '../middlewares/auth'
const router = express.Router();


router.post("/",createUser);
router.get("/:id", isAuthenticated,  getUser);
router.get("/", isAdmin, getAllUsers);
router.delete("/:id", isAuthenticated , deleteUser)
router.get("/return/current", isAuthenticated, returnCurrentUser);





module.exports = router;
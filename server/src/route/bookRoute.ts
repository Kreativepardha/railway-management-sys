import express from 'express';
import { isAuthenticated } from '../middlewares/auth';
import { createBook, deleteBook, getBook, getBooks } from '../controllers/bookController';


const router = express.Router();

router.post("/", isAuthenticated,createBook)
router.get("/", isAuthenticated, getBooks)
router.get("/:id",isAuthenticated,getBook)
router.delete("/:id", isAuthenticated,deleteBook)


module.exports = router;
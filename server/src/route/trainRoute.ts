import express from 'express';
import { isAdmin } from '../middlewares/auth';
import { deleteTrain, getTrain, getTrains, postTrain } from '../controllers/trainController';


const router = express.Router();

router.get("/", getTrains);
router.post("/",isAdmin,postTrain)
router.get("/:id",getTrain);
router.delete("/",isAdmin,deleteTrain);




module.exports = router;
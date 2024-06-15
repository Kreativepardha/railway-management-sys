import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();



const app = express()
const dbUrl = process.env.MONGO_URL as string;


//middlewares ///////////////////////////////////////////////////////////
app.use(cors({
    origin:"http://localhost:3000",
    methods: ["GET","POST","DELETE"],
    credentials:true,
})
);
app.use(express.json());
app.use(cookieParser());

//  routes    ////////////////////////////////////////////////////////

app.use("/api/train", require("./route/trainRoute") )
app.use("/api/user",require("./route/userRoute"))
app.use("/api/book",require("./route/bookRoute"))
app.use("/api/auth",require("./route/authRoute"))


//connections ///////////////////////////////////////////////////////////
mongoose.connect(dbUrl)
.then(() => console.log(`Database connected ${dbUrl}`))
.catch((err) => console.log(err))

const PORT = process.env.PORT || 5000;
app.listen(PORT , () => console.log(`serve started at ${PORT}`));
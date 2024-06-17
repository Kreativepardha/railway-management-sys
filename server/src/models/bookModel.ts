import mongoose, { Schema } from "mongoose";

const bookSchema = new mongoose.Schema({
    train :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"train"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
    },
})

const Book = mongoose.model("book", bookSchema);

export default Book;
import exp from "constants";
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        maxlength:50,
    },
    email: {
        type:String,
        unique:true,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    is_admin: {
        type:Boolean,
    }
})

const User = mongoose.model("user", userSchema);

export default User;
import mongoose, { mongo } from "mongoose";



const balanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const Balance = mongoose.model("Balance", balanceSchema);

export default Balance;
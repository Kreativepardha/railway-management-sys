import mongoose from "mongoose";

const TrainSchema = new mongoose.Schema({
        name: {
            trim:true,
            type:String,
            unique:true,
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"user",
                required: false
            }
        ],
        destination: {
            type:String,
            maxlength:100
        },
        source: {
            type: String,
            maxlength: 100,
          },
        startTime:{
            type: Date
        },
        reachTime: {
            type:Date
        },
        price:{
            type:Number,
        },
})


const Train = mongoose.model("train", TrainSchema );

export default Train;
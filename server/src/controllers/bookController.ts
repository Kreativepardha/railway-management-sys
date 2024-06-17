import Book from "../models/bookModel";
import User from "../models/userModel";
import Train from "../models/trainsModel";


//post create booking
export const createBook = async (req:any,res:any) => {
    const { train_id, user_id} = req.body;

    if(!train_id || !user_id ){
        return res.status(400).json({
            msg:"Please enter all the fields"
        })
    }

    try {
        const train = await Train.findOne({_id: train_id})
        const user =  await User.findOne({_id: user_id})

        if(!train) return res.status(404).json({msg:"Train not valid"})
        if(!user) return res.status(404).json({msg:"User not valid"})

            const newBook = new Book({
                user: user._id,
                train: train._id,
            })

           const  booking = await newBook.save()
           await train.updateOne({
            users: [...train.users, user._id],
           })

           return res.status(200).json({ booking })
    } catch (err) {
        console.error(err)
        return res.status(500).json({msg:"Server Error"})
    }
}

//get all bookings
export const getBooks = async (req:any,res:any) => {
    try {
        const books = await Book.find().sort({ startTime: -1 })
        res.json({books})
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

//delete book
export const deleteBook = async (req:any,res:any) => {
const { id } = req.params;

try {
        const bookExist = await Book.findOne({_id: id})

        if(!bookExist){
            return res.status(404).json({msg:"Book does not exists"})
        }
        const { user, train} = bookExist;

        const trainExist = await Train.findOne({_id: train});

        if(trainExist) {
            trainExist.users = trainExist.users.filter(userId => String(userId) !== String(user))
            await trainExist.save()
        }
        await bookExist.deleteOne();
        res.json({ msg: "Booking deleted successfully" });
        
} catch (err) {
    
}

}

//get single book
export const getBook = async (req:any,res:any) => {
    const {id} = req.params;
    
    try {
        const bookExist = await Book.findOne({_id : id});
    if(!bookExist){
         return res.status(404).json({msg:"Booking does not exist"})
}
        res.json({
            booking_id: bookExist._id,
            train_id:bookExist.train,
            user_id: bookExist.user,
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" });
    }
    
    }

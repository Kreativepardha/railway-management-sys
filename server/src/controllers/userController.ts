import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../models/userModel';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
import Balance from '../models/balanceModel';
dotenv.config();


// postmethod .api.user

export const createUser = async(req: any,res: any) => {
        const { name, email, password, is_admin } = req.body;

        //validation
        if(!name || !email || !password ){
                return res.status(400).json({
                    msg:"Please enter all fields"
                })
        }
      try{  
        const existingUser = await User.findOne({
            email,
        })

        if(existingUser) return res.json({msg: "User with same Email already exist"})

          
           
            //hashing pass
            const salt = 10;
            const hashedpassword = await bcrypt.hash(password, salt) 
        
            //creating new user
         const newUser = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:hashedpassword,
            is_admin: is_admin ?? false
           
         })
         const userId = newUser._id;
        const balance =  await Balance.create({
            userId,
            balance: 1 + Math.random()*1000
         }) 
         
         
         

         const token = jwt.sign(  
            {id: newUser._id, is_admin: newUser.is_admin },
            process.env.JWT_SECRET as string,
        {  expiresIn: "1h" }
           );

           res.status(201).json({
            email: newUser.email,
            name: newUser.name,
            id:newUser._id,
            is_admin: newUser.is_admin,
            balance:balance.balance,
            token:token    
           }
    )

      }catch(err){
        console.error(err);
        res.status(500).json({ msg: "Server Error" });
      }
};

// get single user by id
export const getUser = async (req:any,res:any) => {
        const { id } = req.params;

        if (!id) return res.json({msg:"id not found"});

        const existingUser = await User.findOne({
            _id: id,
        })
        if(!existingUser) return res.json({msg:"User not available"});
        const balance = await Balance.findOne({userId: id})

        return res.json({
            id: existingUser._id,
            email: existingUser.email,
            name: existingUser.name,
            is_admin:existingUser.is_admin,
            balance: balance ? balance.balance : 0
        })
}
 //get all users
export const getAllUsers = async (req:any,res:any)=>{
    await User
    .find({})
    .then((users) => {
        return res.status(200).json({
            users,
            
        })
    })
    .catch((err) => res.json({ err }));
}
//delete user by id
export const deleteUser = async (req:any,res:any) => {  
        const { id } = req.params;


        try {
            const deletedUser = await User.findByIdAndDelete(id);
            if(!deletedUser) {
                return res.status(404).json( { msg: "User not found" });
            }
            res.status(200).json({
                user: {
                    id: deletedUser._id,
                    name: deletedUser.name,
                    email: deletedUser.email,
                    is_admin: deletedUser.is_admin,
                },
            })
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: "Server Error"});
        }
}   

//
export const returnCurrentUser = async(req:any,res:any) => {
    const authHeader = req.headers.authorization;
   
    if (!authHeader) {
        return res.status(401).json({ msg: "User is not authenticated" });
    }
    const token = authHeader;  
    console.log(token)

            try {
                let decoded =  jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
                    // console.log(decoded)
                const userExist = await User.findById(decoded.id)
                // console.log(userExist)
                if(!userExist) return res.json({msg :"USer does not exist"});
    
                return res.json({
                    name:userExist.name,
                    email:userExist.email,
                    is_admin: userExist.is_admin,
                    id: userExist._id,
                })
            } catch (err) {
                console.log(err)
                return res.status(401).json({ msg: "Invalid or expired token" });
            }
          
        }


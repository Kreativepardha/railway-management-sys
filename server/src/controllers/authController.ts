import User from "../models/userModel";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv'
dotenv.config();

export const loginUser = async (req:any,res:any) => {
    try {
        

    const {email,password} = req.body;

    if(!email || !password){
            return res.status(400).json({msg:" Please enter all the credentials"})
    }
    const userExist = await User.findOne({email})

    if(!userExist){
        return res.status(404).json({msg:"User does not exist . Please Signup"})
    }

    const isPassValid = await bcrypt.compare(password, userExist.password)

    if(!isPassValid){
        return res.status(401).json({msg:"Invalid password"})
    }
    const token = jwt.sign({email:userExist.email}, process.env.JWT_SECRET as string)
 
    res.set("Authorization",`{token}`);

    res.json({
        email:userExist.email,
        name:userExist.name,
        is_admin: userExist.is_admin,
        token: token,
        id: userExist._id
    });

} catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server Error" });
}


}

 export const logoutUser = async(req:any,res:any) => {
    try {
        res.removeHeader("Authorization")
        res.json({msg:"Logout Successfull"})
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server Error" }); 
    }

 }
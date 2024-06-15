import User from '../models/userModel';
import jwt, { JwtPayload } from 'jsonwebtoken'

export const isAuthenticated = async (req:any,res:any,next:any) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ msg: "User is not authenticated" });
    }
    const token = authHeader;  
    console.log(token)
    if(!token) return res.json({ msg: "User is not authenticated"});
    next();
}

export const isAdmin =  async(req:any,res:any,next:any) =>{
    const authHeader = req.headers.authorization;
   
    if (!authHeader) {
        return res.status(401).json({ msg: "User is not authenticated" });
    }
    const token = authHeader;  
    // console.log(token)
   

        try {
            let decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
            // console.log(decoded)
            const user = await User.findOne({ _id: decoded.id})  ;
            // console.log(user)

            if(!user) {
                return res.status(401).json({msg: "Useraaaa does not exist"})
            }
               if(!user.is_admin) {
                return res.status(403).json({msg: "User is not admin"});
            }
            req.user = decoded;
            next();
            
        } catch (err) {
            return res.status(401).json({ msg: "Invalid Token"});
        }
     
};

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NmQ4Y2RkMTE4YWQ2OTE2NDhkODc0NiIsImlhdCI6MTcxODQ1NTUxNywiZXhwIjoxNzE4NDU5MTE3fQ.wu2q1xmI_0r8Pb8IiZTxtImOgAUXWm90RBADWZ1FnoQ

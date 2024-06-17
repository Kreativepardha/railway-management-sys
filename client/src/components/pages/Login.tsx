import { ChangeEvent, FormEvent, useState } from "react"
import InputBox from "../ui/InputBox";
import { Button } from "../ui/Button";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { useNavigate } from "react-router";






export const Login = ({type} : {type: "Signup" | "Login"}) => {
        const [email,setEmail] = useState("");
        const [password,setPassword] = useState("");
        const [error,setError] = useState("");
        const [emailError,setEmaiError] = useState(false);
        const [passError,setPassError] = useState(false);

        const navigate = useNavigate();

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value);
        setEmaiError(false)
    }
  
    const handlePassChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setPassword(e.target.value);
        setPassError(false)
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
            let isValid = true;
                
            if(email.length < 5) {
                    setEmaiError(true)
                    isValid = false
                }
               
                if(password.length < 5) {
                    setPassError(true)
                    isValid = false
                }

                if(!isValid) {
                    setError("Please fill out all fields correctly");
                }

                try {

                    const response = await axios.post(`${BACKEND_URL}/api/auth/login`,{
                            email,password
                    });
                   
                    
                    if(response.status === 200) {
                        const {token} = response.data;
                        // console.log(token);  
                        
                        if(token) {
                            localStorage.setItem("token", JSON.stringify(token))
                            navigate('/dashboard')
                        } else {
                            setError("Token not found in response");
                        }
                    } else {
                        setError("An error occurred during login. Please try again.");
                    }
                   
            
                } catch (err) {
                    console.error(err);
                                    setError("An error occurred during registration. Please try again.");
                }
            

    }




    return (
        <div className="h-screen flex flex-col justify-center items-center">
            <h1  className="font-extrabold text-center w-80"   >Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80 p-4 shadow-lg shadow-gray-">
                    {error &&  <p className="text-red-500 text-center mb-4">{error}</p>}
           
                     <InputBox
                        placeholder="email"
                        name="email"
                        label="Enter Your Email"
                        type="email"
                        onChange={handleEmailChange}
                        error={emailError}
                        value={email}
                        classname=""
                    />

                <InputBox
                        placeholder="password"
                        name="password"
                        label="Enter Your Password"
                        type="password"
                        onChange={handlePassChange}
                        error={passError}
                        value={password}
                        classname=""
                    />

                <Button variant="secondary">Submit</Button>
                <span   className="text-left text-black-300 cursor-pointer"  >Don't have an account? 
                                     <a    href="/signup" className="underline p-1 hover:text-yellow-400">{type === "Login" ? "Create an account":"Signup"}</a>  
                                 </span>
            </form>
            
        </div>
    )
}
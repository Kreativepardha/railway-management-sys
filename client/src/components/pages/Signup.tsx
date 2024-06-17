import { ChangeEvent, FormEvent, useState } from "react"
import InputBox from "../ui/InputBox";
import { Button } from "../ui/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { MdOutlineCancel } from "react-icons/md";





export const Signup = ({type} : {type: "Signup" | "Login"}) => {
        const [email,setEmail] = useState("");
        const [password,setPassword] = useState("");
        const [name,setName] = useState("");
        const [error,setError] = useState("");
        const [nameError,setNameError] = useState(false);
        const [emailError,setEmaiError] = useState(false);
        const [passError,setPassError] = useState(false);

        const [msg,setMsg] = useState("");


        const navigate = useNavigate();

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setEmail(e.target.value);
        setEmaiError(false)
    }
    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setName(e.target.value);
        setNameError(false)
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
                if(name.length < 5) {
                    setNameError(true)
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
        const response = await axios.post(`${BACKEND_URL}/api/user/`,{
                name,email,password
        });
        if(response.status === 200) {

            setMsg("Signup Successfull. Now Login") 
            setError("")
            setEmail("");
            setPassword("");
            setName("");
        }else {
            setMsg("")
            setError("An error occurred during registration. Please try again.");
        }
       
       
    } catch (err) {
        console.error(err);
                        setError("An error occurred during registration. Please try again.");
    }

    }

    const handleCloseMsg = () => {
        setMsg("")
    }

    return (<div>
                    {
                    msg
                     && (
                        <div className="absolute right-48 top-28 border-2 border-gray-200 shadow-lg p-4 rounded-lg flex justify-between items-center ">
                      <p className="text-green-500 text-center  ">
                        {msg}
                        </p>
                            <p  onClick={handleCloseMsg} className="text-red-500 mb-4 text-xs p-2 absolute top-0 right-0 ">
                                <MdOutlineCancel     />
                            </p>
                        </div>
                     ) }
        <div className="h-screen flex flex-col justify-center items-center">
            <h1  className="font-extrabold text-center w-80"   >Signup</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80 p-4 shadow-lg shadow-gray-">
                    {error &&  <p className="text-red-500 text-center mb-4">{error}</p>}
                    <InputBox
                        placeholder="name"
                        name="name"
                        label="Enter Your Name"
                        type="text"
                        onChange={handleNameChange}
                        error={nameError}
                        value={name}
                        classname=""
                        />
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
                                     <a    href="/login" className="underline p-1 hover:text-yellow-400">{type === "Signup" ? "Create an account":"Login"}</a>  
                                 </span>
            </form>
            
        </div>
                        </div>
    )
}
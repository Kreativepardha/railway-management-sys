import { useNavigate } from "react-router";
import { Heroes } from "../_comp/Heroes";
import { Button } from "../ui/Button";
import { FaArrowRight } from "react-icons/fa";

export const Landing = () => {
    const navigate = useNavigate();
    const handleLoginButtonClick = () => {
      navigate('/login'); 
  };


    return <div  className=" h-screen flex flex-col justify-center items-center">
        <Heroes />
        <div   onClick={handleLoginButtonClick} className="bg-black text-white text-primary-foreground h-11 rounded-md px-8 w-76 text-center flex flex-row justify-between cursor-pointer  items-center hover:bg-yellow-400 relative top-10">      
                        Login to Enter System
                        <FaArrowRight className="h-4 w-4 ml-2"/>
                    </div>
        </div>
   
}

export default Landing;
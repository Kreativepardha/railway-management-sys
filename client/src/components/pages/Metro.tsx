import { useParams } from "react-router"
import { useMetro } from "../../hooks";
import { Button } from "../ui/Button";



export const Metro = () => {
    const { id } = useParams();
    const {loading,metro} = useMetro({
        id:id || "667013538e85b5a6f38aa4b8" 
    })
    console.log(id)

        if(loading || !metro) {
            return <div>
                Loading ... 
            </div>
        }
        return <div className="h-screen flex justify-center items-center">
            <div className=" p-6 bg-teal-200 rounded-lg shadow-md border-b-2 border-blue-50 hover:bg-yellow-200 cursor-pointer absolute">
                <h1 className="font-extrabold text-center pb-2 ">METRO CARD</h1>
                <div className="font-semibold">
              name: <span className="font-bold">{metro.name}</span> 
                </div>
                <div className="font-semibold">
              email: <span className="font-bold">{metro.email}</span> 
                </div>
                <div className="font-semibold">
                balance: <span className="font-bold">{metro.balance}</span> 
                </div>
            </div>
        </div>
}
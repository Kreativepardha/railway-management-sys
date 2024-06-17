import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";



export interface Metro {
    "email":string;
    "name":string;
    "id": string;
    "balance": number

}

export const useMetro = ({id}:{id:string}) => {
    const [loading,setLoading] = useState(true);
    const [metro,setMetro] = useState<Metro>();


        useEffect(() => {

            const storedTokenString = localStorage.getItem("token");
            const token = storedTokenString ? JSON.parse(storedTokenString).jwt : "";

            axios.get(`${BACKEND_URL}/api/user/${id}`,{
                headers:{ 
                    Authorization: token
                }
            })
            .then(response => {
                setMetro(response.data)
                setLoading(false)
            })
            .catch(err=>{
                console.error("Error while fetching metro info",err);
                setLoading(false)
                
            })

            // fetch(`${BACKEND_URL}/api/user/${id}`,{
            //     headers: {
            //         Authorization: `${token}`
            //     }
            // })
            // .then((res) => {
            //     if(!res.ok) {
            //         throw new Error(`HTTTP ERROOOOR ${res.status}`)
            //     }
            //     return res.json();
            // })
            // .then((data) => {
            //     setMetro(data);
            //     setLoading(false);
            //   })
            //   .catch((error) => {
            //     console.error("Error while fetching metro info", error);
            //     setLoading(false);
            //   });

        },[id])
        return {
            loading,
            metro
        }
    



}
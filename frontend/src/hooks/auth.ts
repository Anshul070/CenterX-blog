import axios from "../utils/axios"
import { useEffect, useState } from "react"

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    useEffect(()=>{
        axios.get("/user/isAuthenticated", {
            headers : {
                Authorization: localStorage.getItem("token")
            }
        }).then(res => {
            if(res.status === 200){
                setIsAuthenticated(true);
                console.log("authenticated")
            }
        }).catch((e)=>{
            
            setIsError(e);
        }).finally(()=>{
            setIsLoading(false);
        });
    });

    return {isAuthenticated, isError, isLoading}
}
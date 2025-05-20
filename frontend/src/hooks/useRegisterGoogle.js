import {useAuthContext} from "../context/useAuthContext";
import {useState} from "react";

const useRegisterGoogle = () => {
    const {setAuthUser} = useAuthContext();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const registerGoogle =async (token) => {
        setLoading(true);
        try{
            const response = await fetch('/auth/register/google', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({token}),
            });

            const json = await response.json();
            console.log(json);
            if (json.error){
                setError(json.error);
            }
            if (response.ok){
                localStorage.setItem('user', JSON.stringify({
                    user:json.user,
                    token: json.token,
                    workouts: json.workouts,
                }));
                setAuthUser({
                    user:json.user,
                    token: json.token,
                    workouts: json.workouts,
                })

            }
        }catch (e) {
            console.log(e)
        }finally {
            setLoading(false);
        }
    }
    return {registerGoogle,loading,error}
}
export  default useRegisterGoogle;
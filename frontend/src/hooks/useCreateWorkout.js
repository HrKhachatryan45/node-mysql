import {useAuthContext} from "../context/useAuthContext";
import {useState} from "react";

const useCreateWorkout = () => {
    const {authUser,setAuthUser} = useAuthContext();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const createWorkout = async (data) => {
        const response = await fetch('/workout/create',{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authUser.token}`,
            },
            body: JSON.stringify(data),
        })
        const json = await response.json();

        console.log(json);

        if (json.error){
            setError(json.error);
        }

        if (response.ok){
            localStorage.setItem('user', JSON.stringify(json));
            setAuthUser({
                ...authUser,
                user: json.user,
                workouts: json.workouts,
            })
            setError(null);
        }

    }
    return {createWorkout,error,loading}
}
export default useCreateWorkout;
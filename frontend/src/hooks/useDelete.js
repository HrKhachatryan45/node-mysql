import {useAuthContext} from "../context/useAuthContext";

const useDelete = () => {
    const {authUser,setAuthUser} = useAuthContext()
    const deletej = async (id) => {
       const  response =  await fetch(`/workout/delete/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${authUser.token}`
            },
        })
        const json = await response.json();

        if (response.ok){
            setAuthUser({
                ...authUser,
                workouts: json,
            })
        }
    }
    return {deletej}
}
export default useDelete;
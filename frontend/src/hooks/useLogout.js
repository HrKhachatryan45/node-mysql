import {useAuthContext} from "../context/useAuthContext";

const useLogout = () => {
    const {setAuthUser} = useAuthContext()
    const logout =async () => {
        await fetch('/auth/logout',{
            method: 'POST',
        })
        setAuthUser(null)
        localStorage.removeItem('user')

    }
    return {logout};
}
export default useLogout;
import {createContext, useContext, useState} from "react";


export const AuthContext = createContext();

export const  useAuthContext = () => {
    return useContext(AuthContext);
}

export const AuthContextProvider = ({children}) => {
    const [authUser, setAuthUser] = useState(null || JSON.parse(localStorage.getItem("user")));

    return <AuthContext.Provider value={{authUser,setAuthUser}}>{children}</AuthContext.Provider>
}
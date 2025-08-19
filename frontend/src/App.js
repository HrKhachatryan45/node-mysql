import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import {useAuthContext} from "./context/useAuthContext";
function App(props) {
    const {authUser} = useAuthContext()
    return (
       <BrowserRouter>
         <Routes>
            <Route element={authUser?<Home/>:<Navigate to={'/login'}/>} path={'/'}/>
            <Route element={!authUser?<Login/>:<Navigate to={'/'}/> } path={'/login'}/>
            <Route element={!authUser?<Register/>:<Navigate to={'/'}/> } path={'/register'}/>
            <Route element={<Users/>} path={'/users'}/>
         </Routes>
       </BrowserRouter>
    );
}

export default App;
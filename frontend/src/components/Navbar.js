import React from 'react';
import {useAuthContext} from "../context/useAuthContext";
import useLogout from "../hooks/useLogout";
import { Link } from 'react-router-dom';

function Navbar(props) {
    const {authUser} = useAuthContext()
    const {logout} = useLogout()
    const handleLogOut =async () => {
        await logout()
    }
    return (
        <div className={'w-full h-16 bg-amber-100 flex items-center justify-between px-6 text-gray-500'}>

                <img src={'https://cdn-icons-png.freepik.com/512/6479/6479559.png'} className={'w-16 h-14'}/>

            <ul className={'w-[30%] h-full flex items-center justify-between pr-10'}>
                <li>
                    <a href={'/'}>Workouts</a></li>
                {!authUser ? <div className={'flex items-center justify-between'}>
                        <li className={'mr-5'}><a href={'/register'}>Register</a></li>
                        <li><a href={'/login'}>Login</a></li>
                    </div>:
                    <div className={'flex items-center justify-between'}>
                        <img src={authUser.user.profile_image || 'https://cdn-icons-png.flaticon.com/512/5951/5951752.png'} className={'w-10 h-10 mr-3'}/>
                        <li className={'mr-5'}  >{authUser?.user?.username}</li>
                        <button className={'w-fit px-3 py-1 bg-gray-500 text-white rounded-lg'} onClick={handleLogOut}>Log Out</button>
                    </div>}
                    <div>
                        <Link to={'/users'}>Users</Link>
                    </div>
            </ul>
        </div>
    );
}

export default Navbar;
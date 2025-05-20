import React from "react";
import Navbar from "../components/Navbar";
import { GoogleLogin } from "@react-oauth/google";
import useRegisterGoogle from "../hooks/useRegisterGoogle";
import useRegister from "../hooks/useRegister";
import {Link} from "react-router-dom";

function Register() {
    const [formData, setFormData] = React.useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const {register,loading,error} = useRegister()


    const handleSubmit = async (e) => {
        e.preventDefault();
        await register(formData)
    };

    const {registerGoogle,loading:loadingGoogle,error:errorG} = useRegisterGoogle()
    const handleGoogleSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;

      await  registerGoogle(token)

    };


    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border p-2 rounded bg-white"
                    />
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border p-2 rounded bg-white"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border p-2 rounded bg-white"
                    />
                    <div className="w-full flex items-center justify-center mt-4 text-gray-500">
                        <p>Have an account already? <Link className={'text-blue-600 underline'} to={'/login'}>Login</Link></p>
                    </div>
                    {error && <div className={'w-full p-2 border-red-500 border-[1px] text-red-500 flex items-center justify-center rounded-lg'}>
                        {error}
                    </div>}
                    {errorG && <div className={'w-full p-2 border-red-500 border-[1px] text-red-500 flex items-center justify-center rounded-lg'}>
                        {errorG}
                    </div>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        {!loading?"Register":<span className={'loading loading-sm'}></span>}
                    </button>
                </form>

                <div className="my-6 text-center text-gray-500">or</div>

                <div className="flex justify-center">
                    <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => console.log("Google Signup Failed")} />
                </div>
            </div>
        </div>
    );
}

export default Register;

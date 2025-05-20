import React from "react";
import Navbar from "../components/Navbar";
import { GoogleLogin } from "@react-oauth/google";
import useLoginGoogle from "../hooks/useLoginGoogle";
import useLogin from "../hooks/useLogin";
import {Link} from "react-router-dom";

function Login() {
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const {login,loading,error} = useLogin()


    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData)
    };

    const {loginGoogle,loading:loadingGoogle,error:errorG} = useLoginGoogle()
    const handleGoogleSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential;

        await  loginGoogle(token)

    };


    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        <p>Don't have an account yet? <Link className={'text-blue-600 underline'} to={'/register'}>Register</Link></p>
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
                        {!loading?"Login":<span className={'loading loading-sm'}></span>}
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

export default Login;

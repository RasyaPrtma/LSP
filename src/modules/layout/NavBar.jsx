import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const NavBar = () => {

    const { doLogin } = useAuth();

    const name = useRef();
    const email = useRef();
    const username = useRef();
    const password = useRef();

    const [loginClick, setLoginClick] = useState(false);
    const [registClick, setRegistClick] = useState(false);

    const handleLoginClick = () => {
        setLoginClick(true);
        setRegistClick(false);
    }

    const handleRegisterClick = () => {
        setRegistClick(true);
        setLoginClick(false);
    }

    const handleClose = () => {
        setLoginClick(false);
        setRegistClick(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        doLogin(email.current.value, password.current.value, handleClear);

    }

    const handleClear = () => {
        if (loginClick) {
            email.current.value = '';
            password.current.value = '';
        } else if (registClick) {
            email.current.value = '';
            password.current.value = '';
            name.current.value = '';
            username.current.value = '';
        }
    }

    return (
        <>
            <header className="w-[100%] py-[1.8em] fixed top-[0] z-10 left-0 right-0">
                <nav className="flex justify-between items-center mx-[2.5em]">
                    <NavLink to={"/"} className=" text-[1.5em] font-bold text-[#F8F8F8]">ARTICULATE</NavLink>
                    <div>
                        <NavLink onClick={handleLoginClick} className="font-bold text-[#F8F8F8]">LOGIN</NavLink>
                        <span className="font-bold text-[#F8F8F8]"> | </span>
                        <NavLink onClick={handleRegisterClick} className="font-bold text-[#F8F8F8]">SIGN UP</NavLink>
                    </div>
                </nav>
            </header>

            {
                loginClick ?
                    <form onSubmit={(e) => handleSubmit(e)} className="absolute top-[5vw] right-[5vw] z-[20] bg-[rgba(255,255,255,0.5)] w-[300px] h-[300px] rounded-md flex justify-center flex-col items-center">
                        <span className=" cursor-pointer absolute top-[20px] left-[25px] text-[14px] text-[rgba(255,255,255,0.8)]" onClick={handleClose}><i className="fa-solid fa-x"></i></span>
                        <h1 className="text-[1.4em] font-bold text-[rgba(255,255,255,0.8)]">Login</h1>
                        <div className="flex flex-col mb-[1em]">
                            <label htmlFor="email" className="text-[14px] text-[rgba(255,255,255,0.8)]">Email</label>
                            <input ref={email} type="email" id="email" className=" w-[250px] rounded-sm border-[none] outline-none pl-2 text-[14px] py-[5px] text-[rgba(0,0,0,0.5)]" required />
                        </div>
                        <div className="flex flex-col mb-[1em]">
                            <label htmlFor="password" className="text-[14px] text-[rgba(255,255,255,0.8)]">Password</label>
                            <input ref={password} type="password" className="w-[250px] rounded-sm border-[none] outline-none pl-2 text-[14px] py-[5px] text-[rgba(0,0,0,0.5)]" id="password" required />
                        </div>
                        <button type="submit" className="bg-[rgba(0,0,0,0.2)] text-[rgba(255,255,255,0.8)] text-[14px] px-[15px] py-[6px] rounded-md">Submit</button>
                    </form> : null
            }

            {
                registClick ?
                    <div className="absolute top-[5vw] right-[5vw] z-[20] bg-[rgba(255,255,255,0.5)] w-[350px] h-[400px] rounded-md flex justify-center flex-col items-center">
                        <span className=" cursor-pointer absolute top-[20px] left-[25px] text-[14px] text-[rgba(255,255,255,0.8)]" onClick={handleClose}><i className="fa-solid fa-x"></i></span>
                        <h1 className="text-[1.4em] font-bold text-[rgba(255,255,255,0.8)]">Registrasi</h1>
                        <div className="flex flex-col mb-[1em]">
                            <label htmlFor="name" className="text-[14px] text-[rgba(255,255,255,0.8)]">Name</label>
                            <input ref={name} type="text" id="name" className=" w-[250px] rounded-sm border-[none] outline-none pl-2 text-[14px] py-[5px] text-[rgba(0,0,0,0.5)]" required />
                        </div>
                        <div className="flex flex-col mb-[1em]">
                            <label htmlFor="username" className="text-[14px] text-[rgba(255,255,255,0.8)]">Username</label>
                            <input ref={username} type="text" className="w-[250px] rounded-sm border-[none] outline-none pl-2 text-[14px] py-[5px] text-[rgba(0,0,0,0.5)]" id="username" required />
                        </div>
                        <div className="flex flex-col mb-[1em]">
                            <label htmlFor="email" className="text-[14px] text-[rgba(255,255,255,0.8)]">Email</label>
                            <input ref={email} type="email" className="w-[250px] rounded-sm border-[none] outline-none pl-2 text-[14px] py-[5px] text-[rgba(0,0,0,0.5)]" id="email" required />
                        </div>
                        <div className="flex flex-col mb-[1em]">
                            <label htmlFor="password" className="text-[14px] text-[rgba(255,255,255,0.8)]">Password</label>
                            <input ref={password} type="password" className="w-[250px] rounded-sm border-[none] outline-none pl-2 text-[14px] py-[5px] text-[rgba(0,0,0,0.5)]" id="password" required />
                        </div>
                        <button className="bg-[rgba(0,0,0,0.2)] text-[rgba(255,255,255,0.8)] text-[14px] px-[15px] py-[6px] rounded-md">Submit</button>
                    </div> : null
            }
        </>
    );
}

export default NavBar;
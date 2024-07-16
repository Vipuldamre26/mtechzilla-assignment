
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';


const Signup = () => {

    const navigate = useNavigate();
    const isLogin = useSelector(state => state.userInfo)
    let isUser = JSON.parse(localStorage.getItem('user'))


    const [isFormFill, setIsFormFill] = useState(false);
    const [type, setType] = useState(true);

    const emailRef = useRef('');
    const nameRef = useRef('');
    const passwordRef = useRef('');


    // *************************************************************

    const submitData = async (e) => {
        e.preventDefault()

        let email = emailRef.current.value;
        let name = nameRef.current.value;
        let password = passwordRef.current.value;



        if (email && password && name) {

            setIsFormFill(false);
            try {
                const userData = await createUserWithEmailAndPassword(auth, email, password);
                // await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(userData.user, {
                    displayName: name,
                })

                setTimeout(() => {
                    navigate('/login', { replace: true })
                }, 100);
                toast('Redirecting to login');
            }
            catch (error) {
                console.log(error);
            }

        }
        else {
            toast('Please fill all fields');
        }

    }

    // ************************************************************




    return (
        <div className='form w-full flex items-center justify-center font-sans bg-red-500/60 min-h-screen text-black'>
            {

                !isUser && <div className="form-main flex flex-col items-center justify-center relative w-2/5 h-4/5 rounded-2xl border-2 border-white/60 py-8">

                    <h1 className='text-5xl my-6'>Signup</h1>

                    <form action='' >

                        <div className="inputbox relative w-82 mx-auto my-7 border-b-2 border-white">

                            <input className='password w-full h-12 text-base bg-transparent border-none outline-none px-5 py-0' ref={nameRef} type="text" required />

                            <label className='absolute top-1/2 left-1 pointer-events-none transform translate-y-1/2 transition duration-500'>Name</label>

                        </div>

                        <div className="inputbox relative w-82 mx-auto my-7 border-b-2 border-white">

                            <input className='password w-full h-12 text-base bg-transparent border-none outline-none px-5 py-0' ref={emailRef} type="email" required />

                            <label className='absolute top-1/2 left-1 pointer-events-none transform translate-y-1/2 transition duration-500'>Email</label>

                        </div>

                        <div className="inputbox relative w-82 mx-auto my-7 border-b-2 border-white">

                            <input className='password w-full h-12 text-base bg-transparent border-none outline-none px-5 py-0' ref={passwordRef} type={type ? 'password' : 'text'} required />

                            <label className='absolute top-1/2 left-1 pointer-events-none transform translate-y-1/2 transition duration-500'>Password</label>

                            {type ? <IoIosEyeOff onClick={() => setType(false)} className='icon absolute right-7 bottom-4 text-xl cursor-pointer' /> : <IoIosEye onClick={() => setType(true)} className='icon absolute right-7 bottom-4 text-xl cursor-pointer' />}

                        </div>

                        <button className='m-4 w-40 h-10 text-lg bg-black rounded-full text-white cursor-pointer transition duration-400 ease-in-out my-10' type='submit' onClick={(e) => submitData(e)}>Signup</button>

                        <button className='m-4 w-40 h-10 text-lg bg-black rounded-full text-white cursor-pointer transition duration-400 ease-in-out my-10' onClick={() => navigate('/login')}>Login</button>

                    </form>
                </div>
            }
            <ToastContainer />

            {
                isUser &&
                <div className='flex items-center justify-center h-1/2 text-3xl font-normal'>
                    <h2>Already Login</h2>
                </div>

            }
        </div>
    )
}

export default Signup;
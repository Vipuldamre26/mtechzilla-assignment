
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { setValue } from '../../redux/slices/LoginSlice';



const LoginPage = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.userInfo);
    let isUser = JSON.parse(localStorage.getItem('user'))

    // console.log(submitedData);


    const [isFormFill, setIsFormFill] = useState(false);
    const [type, setType] = useState(true);

    const emailRef = useRef('');
    const passwordRef = useRef('');


    // *************************************************************

    const submitData = async (e) => {
        e.preventDefault()

        let email = emailRef.current.value;
        let password = passwordRef.current.value;

        console.log(email);
        console.log(password);


        if (password && email) {

            setIsFormFill(false);
            try {
                await signInWithEmailAndPassword(auth, email, password);

                dispatch(setValue(true));
                setTimeout(() => {
                    navigate('/homepage', { replace: true })
                }, 100);

                localStorage.setItem('user', JSON.stringify('newuser'))
                toast('Redirecting to Dashboard');
            }
            catch (error) {
                console.log(error);
                toast(`${error}`);
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

                !isUser && <div className="form-main flex flex-col items-center justify-center relative  w-2/5 h-96 rounded-2xl border-2 border-white/60 py-8">

                    <h1>Login</h1>

                    <form action='' >

                        <div className="inputbox relative w-82 mx-auto my-7 border-b-2 border-white">
                            <input className='password w-full h-12 text-base bg-transparent border-none outline-none px-5 py-0' ref={emailRef} type="email" required />

                            <label className='absolute top-1/2 left-1 pointer-events-none transform translate-y-1/2 transition duration-500'>Email</label>

                        </div>

                        <div className="inputbox relative w-82 mx-auto my-7 border-b-2 border-white">

                            <input className='password w-full h-12 text-base bg-transparent border-none outline-none px-5 py-0' ref={passwordRef} type={type ? 'password' : 'text'} required />

                            <label className='absolute top-1/2 left-1 pointer-events-none transform translate-y-1/2 transition duration-500'>Password</label>

                            {type ? <IoIosEyeOff onClick={() => setType(false)} className='icon absolute right-7 bottom-4 text-xl cursor-pointer' /> : <IoIosEye onClick={() => setType(true)} className='icon absolute right-7 bottom-4 text-xl cursor-pointer' />}

                        </div>

                        <button className='w-40 h-10 text-lg bg-black rounded-full text-white cursor-pointer transition duration-400 ease-in-out m-4' onClick={() => navigate('/signup')}>Signup</button>

                        <button className='w-40 h-10 text-lg bg-black rounded-full text-white cursor-pointer transition duration-400 ease-in-out m-4' type='submit' onClick={(e) => submitData(e)}>Login</button>

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

export default LoginPage;
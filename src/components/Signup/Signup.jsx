
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
        <div className='form'>
            {

                !isUser && <div className="form-main">
                    <h1>Signup</h1>
                    <form action='' >
                        <div className="inputbox">
                            <input ref={nameRef} type="text" required />
                            <label>Name</label>
                        </div>
                        <div className="inputbox">
                            <input ref={emailRef} type="email" required />
                            <label>Email</label>
                        </div>
                        <div className="inputbox">
                            <input className='password' ref={passwordRef} type={type ? 'password' : 'text'} required />
                            <label>Password</label>
                            {type ? <IoIosEyeOff onClick={() => setType(false)} className='icon' /> : <IoIosEye onClick={() => setType(true)} className='icon' />}
                        </div>
                        <button type='submit' onClick={(e) => submitData(e)}>Signup</button>
                        <button onClick={() => navigate('/login')}>Login</button>
                    </form>
                </div>
            }
            <ToastContainer />

            {
                isUser &&
                <div className='logedin'>
                    <h2>Already Login</h2>
                </div>

            }
        </div>
    )
}

export default Signup;
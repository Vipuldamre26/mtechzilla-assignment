
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
        <div className='form'>
            {

                !isUser && <div className="form-main">
                    <h1>Login</h1>
                    <form action='' >
                        <div className="inputbox">
                            <input ref={emailRef} type="email" required />
                            <label>Email</label>
                        </div>
                        <div className="inputbox">
                            <input className='password' ref={passwordRef} type={type ? 'password' : 'text'} required />
                            <label>Password</label>
                            {type ? <IoIosEyeOff onClick={() => setType(false)} className='icon' /> : <IoIosEye onClick={() => setType(true)} className='icon' />}
                        </div>
                        <button onClick={() => navigate('/signup')}>Signup</button>
                        <button type='submit' onClick={(e) => submitData(e)}>Login</button>

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

export default LoginPage;
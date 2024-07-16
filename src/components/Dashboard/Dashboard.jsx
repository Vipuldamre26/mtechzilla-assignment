import React, { useState, useEffect, useRef } from 'react';
import './Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import { setValue } from '../../redux/slices/LoginSlice';
import { useNavigate } from 'react-router';


const Dashboard = () => {


  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isbreak, setIsBreak] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef(null);



  useEffect(() => {
    setIsBreak(false);
    setIsActive(false);
    timerRef.current = null;
    setTimeLeft(25 * 60);
  }, []);


  const isLogin = useSelector(state => state.userInfo)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(isLogin);


  let isUser = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {

    if (isActive && timeLeft > 0) {

      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

    }
    else if (timeLeft === 0) {
      clearInterval(timerRef.current);
      setIsBreak(!isbreak);

      if (isbreak) {
        setTimeLeft(25 * 60);
        setIsActive(false);
      } else {
        setTimeLeft(5 * 60);
      }
    }

    return () => clearInterval(timerRef.current);

  }, [isActive, timeLeft]);

  const startTimer = () => {
    if (timeLeft > 0) {
      setIsActive(true);
    }
  };

  const stopTimer = () => {
    setIsActive(false);
    clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    setIsActive(false);
    clearInterval(timerRef.current);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const logout = () => {
    dispatch(setValue(false));
    localStorage.clear();
    navigate('/');
  }

  return (

    <>


      <div className='dashboard flex justify-center items-center h-screen w-full flex-col bg-red-200'>
        {
          isUser && <div className="dashboard-main w-screen h-screen rounded-xl shadow-md">
            <div className=" w-screen flex items-center justify-end h-16 p-12">
              <button onClick={logout} className=' w-24 h-8 rounded-full cursor-pointer bg-slate-900 text-white'>Logout</button>
            </div>

            <div className="timer w-2/4 h-80 rounded-xl shadow-2xl my-16 mx-auto flex items-center justify-evenly flex-col">
              {isbreak && <p className='text-2xl font-bold'>Break time</p>}
              <h1 className='text-6xl font-bold'>{formatTime(timeLeft)}</h1>

              {!isbreak && <div className="btns">

                <button className='w-32 h-10 rounded-lg border-0 bg-slate-950 text-white m-2 curser-pointer shadow-md' onClick={startTimer} >Start</button>
                <button className='w-32 h-10 rounded-lg border-0 bg-slate-950 text-white m-2 curser-pointer shadow-md' onClick={stopTimer} >Stop</button>
                <button className='w-32 h-10 rounded-lg border-0 bg-slate-950 text-white m-2 curser-pointer shadow-md' onClick={resetTimer}>Reset</button>
              </div>
              }
            </div>
          </div>
        }

        {
          !isUser && <div className='login-fst flex items-center justify-center text-4xl h-1/2 fontw'>
            <h3>Please login first</h3>
          </div>
        }


      </div>
    </>

  );
};

export default Dashboard;

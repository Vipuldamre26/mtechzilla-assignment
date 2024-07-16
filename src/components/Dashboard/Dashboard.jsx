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


      <div className='dashboard'>
        {
          isUser && <div className="dashboard-main">
            <div className="nav">
              <button onClick={logout}>Logout</button>
            </div>

            <div className="timer">
              {isbreak && <p>Break time</p>}
              <h1>{formatTime(timeLeft)}</h1>
              
              {!isbreak && <div className="btns">

                <button onClick={startTimer} >Start</button>
                <button onClick={stopTimer} >Stop</button>
                <button onClick={resetTimer}>Reset</button>
              </div>
              }
            </div>
          </div>
        }

        {
          !isUser && <div className='login-fst'>
            <h3>Please login first</h3>
          </div>
        }


      </div>
    </>

  );
};

export default Dashboard;

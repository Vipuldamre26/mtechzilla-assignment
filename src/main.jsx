import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard/Dashboard.jsx';
import { Provider } from 'react-redux'
import store from './redux/store.js'
import LoginPage from './components/LoginPage/LoginPage.jsx'
import Signup from './components/Signup/Signup.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/homepage' element={<Dashboard />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>,
)

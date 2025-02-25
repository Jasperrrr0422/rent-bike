import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from './Pages/loginRegisterPage/RegisterPage';
import LoginPage from './Pages/loginRegisterPage/LoginPage';
import Layout from './Components/Layout';
import HomePage from './Pages/homePage/HomePage';
import RecoveryPage from './Pages/RecoveryPage';
import LoginVerification from './Pages/loginRegisterPage/LoginVerification';
import Map from './Pages/map';
import ManagerPage from './Pages/administratorPage/managerPage';
import VehicleManagementSystem from './Pages/operatorPage/VehicleManagementSystem';
import VehicleState from './Pages/operatorPage/VehicleState';
import React from 'react';
import PaymentButton from './Components/PaymentButton';
import Customer2 from './Pages/customerPage/example1'
import { UserProvider } from "./Components/useContext";


function App() {
  const [count, setCount] = useState(0)



  return (

    <BrowserRouter>
      <Layout>
 
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signUp' element={<RegisterPage />} />
          <Route path='/Login' element={<LoginPage />} />
          <Route path='/Recovery' element={<RecoveryPage />} />
          <Route path='/login-verification/:userId' element={<LoginVerification/>}/>
          <Route path='/Customer' element={<Map/>}/>
          <Route path='/Manager' element={<ManagerPage/>}/>
          <Route path='/Operator' element={<VehicleManagementSystem/>}/>
          <Route path='/Operator2' element={<VehicleState/>}/>
          <Route path="/payment" element={<PaymentButton />} />
          <Route path="/cus" element={<Customer2 />} />
        </Routes>

      </Layout>

    </BrowserRouter>



  )
}

export default App

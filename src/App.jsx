import React from "react";
import Mainpg from "./Components/MainNav/Mainpg.js";
import Login from "./Components/Login/Login.js";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/DashBoardUser/Dashboard.js";
import Forgot from './Components/Login/Forgotpass.js';
import Register from "./Components/UserRegister/Register";
import Profile from "./Components/Cars/Profile.js";
import Reservation from "./Components/Reservations/Reservation.js";
import Payment from "./Components/Payment/Payment.js";
import ErrorPage from "./Components/ErrorPage/ErrorPage.js";
import AdminProfile from "./Components/Admin/AdminProfile.js";
import UserBookings from "./Components/UserBooking/UserBooking.js";
import AdminRegister from "./Components/Admin/AdminRegister.js";
import AdminDashboard from "./Components/Admin/AdminDashboard.js";
import AdminDetails from "./Components/AdminDetails/AdminDetails.js";
import CarDetailsPage from "./Components/CarDetailsPage/CarDetailsPage.js";
import UserDetails from "./Components/UserDetails/UserDetails.js";
import ReservationDetails from "./Components/ReservationDetails/ReservationDetails.js";
import PaymentDetails from "./Components/PaymentDetails/PaymentDetails.js";
import HelpSupport from "./Components/Cars/HelpSupport.js"
import ReservationList from "./Components/Cars/ReservationList.js";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Mainpg />} />
        <Route path="userlogin" element={<Login />} />
        <Route path="/forgot_password" element={<Forgot forgotpd={true}/>}/>
        <Route path="/register" element={<Register newuser={true}/>}/>
        <Route path="admin" element = {<Login isadmin={true}/>}/>
        <Route path="/dashboard" element = {<Dashboard />}/>
        <Route path="/profile" element = {<Profile/>}/>
        <Route path="/reservation" element={<Reservation/>}/>
        <Route path="/payment" element={<Payment/>}/>
        <Route path="/AdminProfile" element={<AdminProfile />} />
        <Route path='*' element={<ErrorPage />} />
        <Route path="/userbookings" element={<UserBookings />} />
        <Route path="/adminRegister" element={<AdminRegister />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/adminDetails" element={<AdminDetails />} />
        <Route path="/carDetailsPage" element={<CarDetailsPage />} />
        <Route path="/userDetails" element={<UserDetails />} />
        <Route path="/reservationDetails" element={<ReservationDetails />} />
        <Route path="/paymentDetails" element={<PaymentDetails />} />
        <Route path="/help&support" element={<HelpSupport />} />
        <Route path="/reservationList/:userId" element={<ReservationList />} />
      </Routes>
  );
}

export default App;
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import NotificationPage from "./pages/NotificationPage";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorPage from "./pages/doctor/DoctorPage";
import { setUser } from "./redux/features/userSlice";
import baseUrl from "./baseUrl";

function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/user`, {
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        dispatch(setUser(data));
      } catch (error) {
        console.error('Failed to fetch user', error);
        // Optionally handle errors (e.g., show an error message)
      }
    };

    fetchUser();
  }, [dispatch]);

  const { loading } = useSelector((state) => state.alerts);

  return (
    <BrowserRouter>
      {loading ? (
        <Spinner /> // Show spinner while fetching user data
      ) : (
        <Routes>
          <Route path="/apply-doctor" element={<ProtectedRoute><ApplyDoctor /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
          <Route path="/admin/doctors" element={<ProtectedRoute><Doctors /></ProtectedRoute>} />
          <Route path="/doctor/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/doctor/book-appointment/:doctorId" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
          <Route path="/notification" element={<ProtectedRoute><NotificationPage /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/appointments" element={<ProtectedRoute><Appointments /></ProtectedRoute>} />
          <Route path="/doctor-appointments" element={<ProtectedRoute><DoctorAppointments /></ProtectedRoute>} />
          <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/doctors" element={<ProtectedRoute><DoctorPage /></ProtectedRoute>} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;

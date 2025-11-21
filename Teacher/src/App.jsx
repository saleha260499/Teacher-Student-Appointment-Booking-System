import { useAuth } from "./context/AuthContext.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from './components/Layout/Footer/Footer.jsx';
import Navbar from './components/Layout/Navbar/Navbar.jsx';
import About from './pages/About.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import Contact from './pages/Contact.jsx';
import Home from './pages/Home.jsx';
import Allteachers from './pages/Teachers/Allteachers.jsx';
import Appointment from './pages/Teachers/Appointment.jsx';
import UserProfile from './pages/User/UserProfile.jsx';
import RegisterTeacher from './pages/Teachers/RegisterTeacher.jsx';
import ViewAppointment from './pages/User/ViewAppointment.jsx';
import ViewAppointmentsTeacher from './pages/Teachers/ViewAppTeacher.jsx';
import AdminDashboard from "./pages/Auth/Admin/AdminDash.jsx";
import AdminNavbar from "./pages/Auth/Admin/AdminNavbar.jsx";
import TeacherNavbar from "./pages/Teachers/TeacherNavbar.jsx";
import AdminTeachers from "./pages/Auth/Admin/AdminTeachers.jsx";
import AdminStudents from './pages/Auth/Admin/AdminStudents.jsx';
import AdminAppointments from './pages/Auth/Admin/AdminAppointments.jsx';
import AdminLogin from './pages/Auth/Admin/AdminLogin.jsx';
import ProtectedRoute from '../src/context/ProtectedRoute.jsx';
import TeacherLogin from "./pages/Teachers/teacherLogin.jsx";


function App() {
  const location = useLocation();
  const { isAdmin } = useAuth();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>

      {isAdminRoute && isAdmin
        ? <AdminNavbar />
        : location.pathname.startsWith("/tPanel") && <TeacherNavbar />
          ? <TeacherNavbar />
          : <Navbar />
      }

      <Toaster />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teacher" element={<Allteachers />} />
        <Route path="/teacher/:id" element={<Appointment />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/view-appointments" element={<ViewAppointment />} />
        <Route path="/tPanel-view-appointments" element={<ViewAppointmentsTeacher />} />
        <Route path="/tPanel-login" element={<TeacherLogin />} />




        {/* Admin login page */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/teachers"
          element={
            <ProtectedRoute>
              <AdminTeachers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute>
              <AdminStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/appointments"
          element={
            <ProtectedRoute>
              <AdminAppointments />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/register" element={<RegisterTeacher />} />
      </Routes>

      {/* Footer only for non-admin */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;

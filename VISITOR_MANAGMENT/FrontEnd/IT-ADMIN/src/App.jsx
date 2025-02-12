import './App.css'
import LoginForm from './Views/Login'
import { Route, Routes } from 'react-router-dom';
import Cookies from 'js-cookie'
import { Outlet, Navigate } from 'react-router-dom'
import { UserProvider } from './Services/AuthContext'
import Dashboard from './Views/Dashboard';
import Student from './Views/Student';
import OtherUsers from './Views/OtherUsers';
import ResetPasssword from './Views/ResetPassword';
import Staff from './Views/Staff';
import AddStaff from './Views/Staff/AddStaff';
import AddUser from './Views/OtherUsers/AddUser';
import RegisterFace from './Views/Student/RegisterFace';


const PrivateRoutes = () => {
    // const token = Cookies.get('token') || "";
    const token = Cookies.get('token')
    if (token) {
        return <Outlet />
    }
    else {
        return <Navigate to='/login' />
    }
}

function App() {
    return (
        <>
            <UserProvider>
                <div className="App h-screen">
                    <Routes>
                        <Route path="/" element={<LoginForm />} />
                        <Route path="/login" element={<LoginForm />} />

                        <Route element={<PrivateRoutes />}>
                            <Route path="/dashboard" element={<Dashboard />} />
                            
                            <Route path='/add-student' element={<Student />} />
                            <Route path='/add-batch' element={<Student />} />
                            <Route path='/delete-student' element={<Student />} />
                            <Route path='/delete-batch' element={<Student />} />
                            <Route path='/register-face' element={<RegisterFace />} />

                            <Route path='/registrar' element={<OtherUsers />} />
                            <Route path='/hostel-warden' element={<OtherUsers />} />
                            <Route path='/security-admin' element={<OtherUsers />} />
                            <Route path='/faculty-adminblock' element={<OtherUsers />} />
                            <Route path='/add-user' element={<AddUser />} />

                            <Route path='/staff' element={<Staff />} />
                            <Route path='/add-staff' element={<AddStaff />} />
                        </Route>
                        <Route path='/reset-password' element={<ResetPasssword />} />   
                        <Route path='*' element={<Navigate to='/' />} />
                    </Routes>
                </div>
            </UserProvider>
        </>
    )
}

export default App

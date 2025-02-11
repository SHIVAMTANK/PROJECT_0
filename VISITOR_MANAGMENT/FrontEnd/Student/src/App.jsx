import { Navigate, Outlet } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom';
import QrCode from './Views/QrCode';
import Login from './Views/Login';
import { UserProvider } from './Services/AuthContext'
import Cookies from 'js-cookie'
import Profile from './Views/Profile';
import ResetPasssword from './Views/ResetPassword'
import { BrowserRouter as Router } from "react-router-dom";

const PrivateRoutes = () => {
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
        <Router>
              <UserProvider>
                <div className="App h-screen">
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/login' element={<Login />} />
                        <Route element={<PrivateRoutes />}>
                            <Route path='/qr-code' element={<QrCode />} />
                            <Route path='/profile' element={<Profile />} />
                        </Route>
                        <Route path='/reset-password' element={<ResetPasssword />} />
                        <Route path='*' element={<Navigate to='/' />} />
                    </Routes>
                </div>
            </UserProvider>
            </Router>
        </>
    )
}

export default App

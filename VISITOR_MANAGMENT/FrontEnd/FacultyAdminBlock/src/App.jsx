import { Navigate, Outlet } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom';
import Login from './Views/Login';
import Cookies from 'js-cookie'
import ResetPasssword from './Views/ResetPasssword';
import Dashboard from './Views/Dashboard';
import ScheduleVisit from './Views/ScheduleVisit';
import MyVisitorRecords from './Views/Visitors';

const PrivateRoutes = () => {
    const token = Cookies.get('token')
    if (token) {
        return <Outlet />
    }
    else {
        alert('Please Login First')
        return <Navigate to='/login' />
    }
}

function App() {



    return (
        <>
                <div className="App h-screen">
                    <Routes>
                        <Route path='/' element={<Login />} />
                        <Route path='/login' element={<Login />} />
                        <Route element={<PrivateRoutes />}>
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path='/schedule-visit' element={<ScheduleVisit />} />
                            <Route path='/view-visits' element={<MyVisitorRecords />} />
                        </Route>
                        <Route path='/reset-password' element={<ResetPasssword />} />
                        <Route path='*' element={
                            <div>
                                <h1>404 Not Found</h1>
                                <button className='bg-blue-500 text-white p-2 rounded-md'
                                    onClick={() => window.location.href = '/login'}>Go to Login</button>
                            </div>
                        } />
                    </Routes>
                </div>
        </>
    )
}

export default App

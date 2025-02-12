import { Navigate, Outlet } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom';
import Login from './Views/Login';
import { UserProvider } from './Services/AuthContext'
import Cookies from 'js-cookie'
import ResetPasssword from './Views/ResetPassword';
import RecordsDashBoard from './Views/Records';
import StudentRecords from './Views/Records/Student';
import VisitorRecords from './Views/Records/Visitors';
import StaffRecords from './Views/Records/Staff';
import ParentRecords from './Views/Records/Parent';


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
            <div className="App h-screen">
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/login' element={<Login />} />
                    <Route element={<PrivateRoutes />}>
                        <Route path='/dashboard' element={<RecordsDashBoard />} />
                        <Route path='/records/student' element={<StudentRecords />}  ></Route>
                        <Route path='/records/visitor' element={<VisitorRecords />}  ></Route>
                        <Route path='/records/staff' element={<StaffRecords />}  ></Route>
                        <Route path='/records/parent' element={<ParentRecords />}  ></Route>
                    </Route>
                    <Route path='/reset-password' element={<ResetPasssword />} />
                    <Route path='*' element={
                        <>
                            <h1>404 Not Found</h1>
                            <button className='bg-blue-500 text-white p-2 rounded-md' onClick={() => window.location.href = '/login'}>Go to Login</button>
                        </>
                    } />
                </Routes>
            </div>
        </>
    )
}

export default App

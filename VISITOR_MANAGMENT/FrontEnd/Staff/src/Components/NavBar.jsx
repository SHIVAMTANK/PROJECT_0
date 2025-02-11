import Logo from './../Assets/Logo.png'
import Cookies from 'js-cookie'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Navbar = ({ signout = true }) => {
    // const history = useHistory()
    const navigate = useNavigate()
    return (
        <>
            < nav className='hidden w-screen md:flex justify-between items-center py-4 px-10 bg-white shadow-md sticky top-0 z-50' >
                <div className='flex items-center space-x-2 cursor-pointer' onClick={
                    () => {
                        navigate('/profile')
                    }
                }>
                    <img src={Logo} alt='logo' className='w-10 h-10' />
                    <h1 className='text-xl text-blue6 font-bold'>DAIICT</h1>
                </div>

                {
                    signout &&
                    <div className='flex items-center space-x-4' onClick={
                        () => {
                            Cookies.remove('token')
                            window.location.reload()
                            navigate('/login')
                        }
                    }>

                        <p className='text-blue6 font-medium cursor-pointer'>Sign Out</p>
                    </div>
                }


            </nav >
        </>
    )
}
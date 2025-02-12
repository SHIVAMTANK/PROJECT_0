import React from 'react'
import { Navbar } from '../../Components/Navbar'
import { StickyFooterMobile } from '../../Components/StickyFooterMobile'
import StaffList from './StaffList'
import { useNavigate } from 'react-router-dom'

const index = () => {

    const navigate = useNavigate()

    return (
        <div className='h-screen'>
            <Navbar />

            {/* add staff button */}
            <div className='w-screen mx-auto mt-5 flex items-center justify-end top-0 sticky px-8' >
                <button className="bg-blue3 text-white px-6 py-3  rounded-xl cursor-pointer focus:outline-none" onClick={() => navigate('/add-staff')}>
                    Add Staff
                </button>
            </div>

            <StaffList />
            <StickyFooterMobile />
        </div>
    )
}

export default index

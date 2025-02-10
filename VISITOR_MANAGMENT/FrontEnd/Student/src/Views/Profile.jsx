import React from 'react'
import ProfileCard from '../Components/ProfileCard'
import { Navbar } from '../Components/Navbar'
import { StickyFooterMobile } from '../Components/StickyFooterMobile'


const Profile = () => {
    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-center items-center h-screen w-screen">
                <ProfileCard />
            </div>
            <StickyFooterMobile />
        </>
    )
}

export default Profile

import React from 'react'
import { Navbar } from '../Components/Navbar'
import { StickyFooterMobile } from '../Components/StickyFooterMobile'
import QrCodeComponent from '../Components/QrCodeComponent'

const QrCode = () => {
    return (
        <>
            <Navbar />

            {/* box with name, email and qr code, qr code is on another div,  and back button at the below*/}

            <div className='flex flex-col justify-center items-center h-screen w-screen '>
                <div className='bg-white p-10 rounded-2xl shadow-2xl w-[400px] space-y-5'>

                    <div className=' flex flex-col items-center justify-center'>
                        <h1 className='text-2xl font-bold text-blue5 '>Shubham Patel</h1>
                        <p className='text-blue5 font-light'>202101064</p>
                    </div>

                    {/* another div with qr coponent on it */}

                    <div className='flex justify-center items-center bg-gray-200 p-8 rounded-2xl'>
                        <QrCodeComponent />
                    </div>

                    <div className='flex justify-center items-center'>
                        <button className='bg-blue2 text-white px-6 py-3 rounded-2xl'>Go Back</button>
                    </div>


                </div>
            </div>

            <StickyFooterMobile />
        </>
    )
}

export default QrCode

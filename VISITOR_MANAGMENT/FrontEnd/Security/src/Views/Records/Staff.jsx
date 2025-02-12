import React from 'react'
import { Navbar } from '../../Components/Navbar'
import { StickyFooterMobile } from '../../Components/StickyFooterMobile'
import StaffRecordList from './StaffRecordsList'

const StaffRecords = () => {
    return (
        <>
            <Navbar />
                {/* heading */}
                <div className="flex justify-center items-center mt-10">
                    <h1 className="text-3xl font-bold">Staff Records</h1>
                </div>
                <StaffRecordList />
            <StickyFooterMobile />
        </>
    )
}

export default StaffRecords

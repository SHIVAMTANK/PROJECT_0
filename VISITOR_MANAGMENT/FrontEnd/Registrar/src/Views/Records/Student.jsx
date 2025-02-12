import React from 'react'
import { Navbar } from '../../Components/Navbar'
import { StickyFooterMobile } from '../../Components/StickyFooterMobile'
import StudentRecordList from './StudentRecordsList'
const StudentRecords = () => {
    return (
        <>
            <Navbar />
                {/* heading */}
                <div className="flex justify-center items-center mt-10">
                    <h1 className="text-3xl font-bold">Student Records</h1>
                </div>
                <StudentRecordList />
            <StickyFooterMobile />
        </>
    )
}

export default StudentRecords

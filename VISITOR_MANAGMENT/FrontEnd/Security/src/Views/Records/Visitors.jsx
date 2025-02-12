import React from 'react'
import { Navbar } from '../../Components/Navbar'
import { StickyFooterMobile } from '../../Components/StickyFooterMobile'
import VisitorRecordList from './VisitorsRecordsList'

const VisitorRecords = () => {
    return (
        <>
            <Navbar />
                {/* heading */}
                <div className="flex justify-center items-center mt-10">
                    <h1 className="text-3xl font-bold">General Visitor Records</h1>
                </div>
                <VisitorRecordList />
            <StickyFooterMobile />
        </>
    )
}

export default VisitorRecords

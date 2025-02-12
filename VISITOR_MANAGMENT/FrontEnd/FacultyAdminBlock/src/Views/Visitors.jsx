import React from 'react'
import { Navbar } from '../Components/Navbar'
import { StickyFooterMobile } from '../Components/StickyFooterMobile'
import VisitorRecordList from './VisitorsRecordsList'

const MyVisitorRecords = () => {
    return (
        <>
            <Navbar />
                {/* heading */}
                <div className="flex justify-center items-center mt-10">
                    <h1 className="text-3xl font-bold">Visitor's List</h1>
                </div>
                <VisitorRecordList />
            <StickyFooterMobile />
        </>
    )
}

export default MyVisitorRecords

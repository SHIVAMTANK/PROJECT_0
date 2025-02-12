import ParentRecordsList from "./ParentRecordsList"
import {Navbar} from "../../Components/Navbar"
import {StickyFooterMobile} from "../../Components/StickyFooterMobile"

const ParentRecords = () => {
    return (
        <>
            <Navbar />
                {/* heading */}
                <div className="flex justify-center items-center mt-10">
                    <h1 className="text-3xl font-bold">Parent Records</h1>
                </div>
                <ParentRecordsList />
            <StickyFooterMobile />
        </>
    )
}

export default ParentRecords

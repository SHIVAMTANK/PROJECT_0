import React, { useRef, forwardRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './VisitorPass.css';
import QRCodeSVG from 'qrcode.react';
// import profilephoto from './profile-pic.png'
import Logo from './../Assets/Logo.png'


const VisitorPass = React.forwardRef(({ data }, ref) => {
    return (
        <div className="visitor-pass" ref={ref}>
            <div className="header">
                <div className="company-logo">
                    <img src={Logo} alt="Company Logo" />
                </div>
                <div className="company-info">
                    <h1>DAIICT</h1>
                    <p>Gandhinagar</p>
                </div>
            </div>
            <div className="details">
                {/* <p><span>Sr.No.:</span> {data.serialNo}</p> */}
                <p><span>Date:</span> {data.arrival_date}</p>
                <div className="section-title">PARTICULARS OF THE PARENTS</div>
                <div className="visitor-info">

                    <div className="visitor-details">
                        <p><span>Entry Time : </span>{data.entryTime}</p>
                        <p><span>Student ID: </span> {data.student_id}</p>
                        <p><span>Mobile: </span> {data.mobile}</p>
                        <p><span>Purpose:</span> {data.purpose}</p>
                    </div>
                </div>
                {/* <div className="section-title"></div> */}
                <div className='photo-container'>

                    <div className='visitor-info1'>
                        <span>Name 1:</span>
                        <p>{data.name1}</p>
                        <div className="visitor-photo">
                            <img src={data.entry_photo1} alt="parent1" height={180} />
                        </div>
                    </div>

                    {
                        data.name2 && (
                            <div className="visitor-info1">
                                <span>Name 2:</span>
                                <p> {data.name2}</p>
                                <div className="visitor-photo">
                                    <img src={data.entry_photo2} alt="parent2" height={180} />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>

            <div className="footer">
                {/* <div className="initials">Initials</div> */}
                {/* <div className="timeout">Time Out</div> */}
            </div>
            <div className="qr-code">
                <QRCodeSVG value={data.uuid} size={128} />
            </div>
            <p className="validity">Validity: From {data.validityFrom} To {data.validityTo}</p>
        </div>
    );
});

const VisiorPassForTwo = ({
    visitorData
}) => {
    const componentRef = useRef();

    // const visitorData = {
    // arrival_date: '21/01/2012',
    // student_id: '201801001',
    // name1: 'Dharmel Parmar',
    // name2: 'Dharmel Parmar2',
    // purpose: 'For VMS Installation ffsdfdfds dsfdsfds',
    // entry_photo1: 'https://example.com',
    // entry_photo2: 'https://example.com',
    // entryTime: '10:00 AM',
    // mobile: '1234567890',
    // uuid: 'https://example.com',
    // validityFrom: '21/01/2012',
    // validityTo: '22/01/2012',
    // };

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="ForTwo">
            <button onClick={handlePrint} className="print-button bg-blue3 hover:bg-blue4 text-white font-bold py-2 px-4 rounded my-6 ">Print Visitor Pass</button>
            <VisitorPass ref={componentRef} data={visitorData} />
        </div>
    );
}

export default VisiorPassForTwo;
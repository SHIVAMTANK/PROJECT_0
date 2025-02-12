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
                <p><span>Date:</span> {data.date}</p>
                <div className="section-title">PARTICULARS OF THE VISITOR</div>
                <div className="visitor-info">

                    <div className="visitor-details">
                        <p><span>Name:</span> {data.name}</p>
                        <p><span>Entry Time : </span>{data.entryTime}</p>
                        <p><span>Mobile: </span> {data.mobile}</p>
                        {data.email && <p><span>Email:</span> {data.email}</p>}
                        {data.sheduled_by && <p><span>Scheduled By:</span> {data.sheduled_by}</p>}
                        <p><span>Purpose:</span> {data.purpose}</p>
                    </div>
                    <div className="visitor-photo">
                        <img src={data.visitorPhoto} alt="Visitor" height={180} />
                    </div>
                </div>
                <div className="footer">
                    {/* <div className="initials">Initials</div> */}
                    {/* <div className="timeout">Time Out</div> */}
                </div>
                <div className="qr-code">
                    <QRCodeSVG value={data.qrCodeValue} size={128} />
                </div>
                <p className="validity">Validity: From {data.validityFrom} To {data.validityTo}</p>
            </div>
        </div>
    );
});


const VisiorPass = ({visitorData}) => {
    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="VisiorPass">
            <button onClick={handlePrint} className="print-button bg-blue3 hover:bg-blue4 text-white font-bold py-2 px-4 rounded my-6 ">Print Visitor Pass</button>
            <VisitorPass ref={componentRef} data={visitorData} />
        </div>
    );
}

export default VisiorPass;
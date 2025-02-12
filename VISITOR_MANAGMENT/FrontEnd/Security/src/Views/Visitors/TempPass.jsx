import React from 'react'
import VisiorPass from '../../Components/VisitorPass'
import { useLocation } from 'react-router-dom'
import { Button } from '../../Components/Button'

// const visitorData = {
//     date: '21/01/2012',
//     name: 'Dharmel Parmar',
//     purpose: 'For VMS Installation ffsdfdfds dsfdsfds',
//     entryTime: '10:00 AM',
//     mobile: '1234567890',
//     qrCodeValue: 'https://example.com',
//     validityFrom: '21/01/2012',
//     validityTo: '22/01/2012',
// };

const TempPass = () => {

    const data = useLocation().state
    // console.log(data);

    // const visitorData = {
    //     date: new Date().toLocaleDateString(),
    //     name: data.name,
    //     purpose: data.purpose,
    //     entryTime: data.entryTime,
    //     mobile: data.mobile,
    //     qrCodeValue: data.data.uuid,
    //     validityFrom: data.validityFrom,
    //     validityTo: data.validityTo,
    // };


    return (
        <>
        <VisiorPass visitorData={data} />
        <Button onClick={() => window.location.href='/dashboard'}>Back</Button>
        </>
    )
}

export default TempPass

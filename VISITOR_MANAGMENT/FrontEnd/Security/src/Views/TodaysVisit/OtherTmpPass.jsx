import React from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from '../../Components/Button'
import VisitorPass from '../../Components/VisitorPass'



const OtherTempPass = () => {

    const data = useLocation().state
    // console.log(data);

    // const visitorData = {
    //     "_id": "6672d7423394f9b4fc20d1d5",
    //     "uuid": "8ee287e8-f6d1-477f-afa2-af5eba270d4cvisitor",
    //     "name": "Jainil_Rushi",
    //     "mobile": "9924590036",
    //     "email": "shubhampatel1293@gmail.com",
    //     "date": "2024-06-19T00:00:00.000Z",
    //     "purpose": "Meeting",
    //     "scheduled_by": "Shubham",
    // }


    return (
        <>
            <VisitorPass visitorData={data} />
            <Button onClick={() => window.location.href = '/dashboard'}>Back</Button>
        </>
    )
}

export default OtherTempPass

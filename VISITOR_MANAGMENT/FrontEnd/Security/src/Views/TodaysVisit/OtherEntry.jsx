import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Navbar } from '../../Components/Navbar'
import { StickyFooterMobile } from '../../Components/StickyFooterMobile'
import WebcamDemo from '../../Components/FaceDetection'
import { Button } from '../../Components/Button'
import { base64ToFile } from '../../Services/Helpers'
import { postRequest, postRequestWithToken } from '../../Services/Api'

// {
//         "_id": "666aca82ad4fd664fbb0c9bc",
//         "uuid": "2ed79cb6-b480-4b71-8e0a-6c5b82eade9cparent",
//         "student_id": 20210464,
//         "name1": "Pushpaben",
//         "name2": "",
//         "mobile": 9898767657,
//         "arrival_date": "2024-06-13T10:31:30.000Z",
//         "purpose": "visit",
//         "__v": 0
//     }

const OtherEntry = () => {

    const navigate = useNavigate()
    const data = useLocation().state

    const [otherVisitorsData, setOtherVisitorsData] = useState([])
    const [imgsrc, setImgSrc] = useState('')
    const [faceDetected, setFaceDetected] = useState(false)
    const [faceCount, setFaceCount] = useState(0)



    useEffect(() => {
        const getData = async () => {
            if (!data || !data.hasOwnProperty('otherVisitorData') || !data.otherVisitorData.hasOwnProperty('uuid')) {
                alert('Select a Visit to add visit.')
                if (entry) {
                    navigate('/other-visit-list-today')
                }
                else {
                    navigate('/dashboard')
                }
                return;
            }
            else {
                setOtherVisitorsData(data.otherVisitorData)
                // console.log(data.otherVisitorData)
            }
        }
        getData()
    }, [])

    const handleSubmit = async () => {
        if (!faceDetected) {
            alert('Face not detected. Please try again.')
            return;
        }

        try {

            const file1 = base64ToFile(imgsrc, 'capture1.png');
            const formData = new FormData();
            formData.append('photo', file1);
            formData.append('uuid', otherVisitorsData.uuid);

            const response = await postRequestWithToken('security/visitorEntry', formData, {
                'Content-Type': 'multipart/form-data'
            }, {})
            // console.log(response.data.uuid)
            if (response.status === 200) {
                alert('Visitor Entry Successful.')
                const data = {

                    date: new Date().toLocaleDateString(),
                    name: otherVisitorsData.name,
                    entryTime: new Date().toLocaleTimeString(),
                    mobile: otherVisitorsData.mobile,
                    email: otherVisitorsData.email,
                    sheduled_by: otherVisitorsData.scheduled_by,
                    purpose: otherVisitorsData.purpose,
                    visitorPhoto: imgsrc,
                    qrCodeValue: response.data.uuid,
                    validityFrom: new Date().toLocaleDateString(),
                    validityTo: new Date().toLocaleDateString()
                }

                navigate('/other-visit-pass', { state: data })
            }
            else {
                alert('Something went wrong. Please try again.')
            }
        }
        catch (error) {
            alert('Something went wrong. Please try again.')
            console.log(error)
            navigate('/other-visit-list-today')
        }
    }

    return (
        <>
            <Navbar />
            {/* if both name1 and name2 are present then show both names and capture 2 photos step by step, 
                 else only capture 1 photo */}
            <div className=' h-screen w-screen'>

                <div className="flex justify-center items-center mt-10">
                    <h1 className="text-3xl font-bold">Scheduled Visitors Entry</h1>
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <div className='bg-white p-10 rounded-2xl shadow-2xl w-[400px] space-y-5'>

                        <div className=' flex flex-col items-center justify-center'>
                            <h1 className='text-2xl font-bold text-blue5 '>Place your Face in Box.</h1>

                            {
                                !faceDetected &&
                                <WebcamDemo setFaceDetected={setFaceDetected} SetFaceCount={setFaceCount} setImgSrc={setImgSrc} />

                            }

                            {
                                faceDetected &&
                                <>
                                    <img src={imgsrc} alt
                                        ="face" className='w-[300px] h-[300px]' />
                                    <div className='flex items-center justify-evenly'>
                                        <button className=' mt-3 bg-blue2 text-white px-6 py-2 rounded-2xl' onClick={() => {
                                            setFaceDetected(false);
                                            setFaceCount(0);
                                        }}>Retake</button>
                                        <button className=' mt-3 bg-blue2 text-white px-6 py-2 rounded-2xl' onClick={() => navigate('/other-visit-list-today')}>Back</button>
                                    </div>
                                    <Button onClick={handleSubmit}>Submit</Button>
                                </>

                            }


                        </div>
                    </div>
                </div>

            </div>

            <StickyFooterMobile />
        </>
    )
}

export default OtherEntry

import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Navbar } from '../../Components/Navbar'
import { StickyFooterMobile } from '../../Components/StickyFooterMobile'
import WebcamDemo from '../../Components/FaceDetection'
import { Button } from '../../Components/Button'
import { base64ToFile } from '../../Services/Helpers'
import {  postRequestWithToken } from '../../Services/Api'

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

const ParentEntry = () => {

    const navigate = useNavigate()
    const data = useLocation().state
    const entry = window.location.pathname == '/parent/entry' ? true : false
    // console.log(data.parentdata)

    const [parentData, setParentData] = useState(null)
    const [imgsrc1, setImgSrc1] = useState(null)
    const [imgsrc2, setImgSrc2] = useState(null)
    const [face1detected, setFace1Detected] = useState(false)
    const [face2detected, setFace2Detected] = useState(false)
    const [face1count, setFace1Count] = useState(0)
    const [face2count, setFace2Count] = useState(0)
    const [canShowNext, setCanShowNext] = useState(false)

    useEffect(() => {
        const getData = async () => {
            if (!data || !data.hasOwnProperty('parentdata') || !data.parentdata.hasOwnProperty('uuid')) {
                alert('Select a parent to add visit.')
                if (entry) {
                    navigate('/parent/list-today')
                }
                else {
                    navigate('/dashboard')
                }
                return;
            }
            else {
                // console.log(data.parentdata)
                setParentData(data.parentdata)
            }
        }
        getData()
    }, [])

    const handleSubmit = async () => {
        // console.log(parentData.uuid)
        // console.log(imgsrc1)
        // console.log(imgsrc2)

        if (parentData && parentData.name1 && parentData.name2) {
            if (imgsrc1 && imgsrc2) {
                const file1 = base64ToFile(imgsrc1, 'capture1.png');
                const file2 = base64ToFile(imgsrc2, 'capture2.png');

                const formData = new FormData();
                formData.append('photo1', file1);
                formData.append('uuid', parentData.uuid);
                formData.append('photo2', file2);

                try {
                    const response = await postRequestWithToken('security/parentEntryExit', formData, {
                        'Content-Type': 'multipart/form-data'
                    }, {})
                    // console.log(response)
                    if (response.status === 200) {
                        alert(response.data.message)
                        if (entry) {
                            const data = {
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

                                arrival_date: new Date().toLocaleDateString(),
                                student_id: parentData.student_id,
                                name1: parentData.name1,
                                name2: parentData.name2,
                                purpose: parentData.purpose,
                                entry_photo1: imgsrc1,
                                entry_photo2: imgsrc2,
                                entryTime: new Date().toLocaleTimeString(),
                                mobile: parentData.mobile,
                                uuid: parentData.uuid,
                                validityFrom: new Date().toLocaleDateString(),
                                validityTo: new Date().toLocaleDateString()
                            }
                            navigate('/parent-pass', { state: data })
                        }
                        else {
                            navigate('/dashboard')
                        }
                    }
                    else {
                        alert('Something went wrong. Please try again.')
                    }
                }
                catch (error) {
                    alert('Something went wrong. Please try again.')
                    console.log(error)
                    navigate('/parent/list-today')
                }
            }
        }
        else if (parentData && parentData.name1) {
            if (imgsrc1) {

                const file1 = base64ToFile(imgsrc1, 'capture1.png');
                const formData = new FormData();
                formData.append('photo1', file1);
                formData.append('uuid', parentData.uuid);
                formData.append('photo2', '');
                // console.log(formData)

                try {
                    const response = await postRequestWithToken('security/parentEntryExit', formData, {
                        'Content-Type': 'multipart/form-data'
                    }, {})
                    // console.log(response)
                    if (response.status === 200) {
                        alert(response.data.message)
                        if (entry) {
                            const data = {
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

                                arrival_date: new Date().toLocaleDateString(),
                                student_id: parentData.student_id,
                                name1: parentData.name1,
                                name2: '',
                                purpose: parentData.purpose,
                                entry_photo1: imgsrc1,
                                entry_photo2: '',
                                entryTime: new Date().toLocaleTimeString(),
                                mobile: parentData.mobile,
                                uuid: parentData.uuid,
                                validityFrom: new Date().toLocaleDateString(),
                                validityTo: new Date().toLocaleDateString()
                            }
                            navigate('/parent-pass', { state: data })
                        }
                        else {
                            navigate('/dashboard')
                        }
                    }
                    else {
                        alert('Something went wrong. Please try again.')
                    }
                }
                catch (error) {
                    alert('Something went wrong. Please try again.')
                    console.log(error)
                    navigate('/parent/list-today')
                }
            }
        }
        else {
            alert('Something went wrong')
        }
    }



    // console.log(parentData)
    return (
        <>
            <Navbar />
            {/* if both name1 and name2 are present then show both names and capture 2 photos step by step, 
                 else only capture 1 photo */}
            <div className=' h-screen w-screen'>

                <div className="flex justify-center items-center mt-10">
                    <h1 className="text-3xl font-bold">Parent Entry</h1>
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <div className='bg-white p-10 rounded-2xl shadow-2xl w-[400px] space-y-5'>

                        <div className=' flex flex-col items-center justify-center'>
                            <h1 className='text-2xl font-bold text-blue5 '>Place your Face in Box.</h1>
                            {
                                !canShowNext && !face2detected && parentData && parentData.name1 &&
                                <p className='text-blue5 font-light'> Name : {parentData.name1}</p>
                            }
                        </div>

                        <div className='flex flex-col justify-center items-center bg-gray-200 p-8 rounded-2xl'>
                            {
                                !canShowNext && !face1detected && !face2detected &&
                                <WebcamDemo setFaceDetected={setFace1Detected} SetFaceCount={setFace1Count} setImgSrc={setImgSrc1} />
                            }
                            {
                                !canShowNext && face1detected && !face2detected &&
                                <>
                                    <img src={imgsrc1} alt="face" className='w-[300px] h-[300px]' />
                                    <div className='flex items-center justify-evenly'>
                                        <button className=' mt-3 bg-blue2 text-white px-6 py-2 rounded-2xl' onClick={() => navigate('/parent/list-today')}>Back</button>
                                        <button className=' mt-3 bg-blue2 text-white px-6 py-2 rounded-2xl' onClick={() => {
                                            setFace1Detected(false);
                                            setFace2Detected(false);
                                            setFace1Count(0);
                                            setFace2Count(0);
                                            setImgSrc1(null)
                                        }}>Retake</button>
                                    </div>
                                </>
                            }

                            {
                                !canShowNext && face1detected && !face2detected && parentData && parentData.name2 &&
                                <Button onClick={() => setCanShowNext(true)}>Next</Button>
                            }

                            {
                                // submit if name1 is present and name2 is not present
                                !canShowNext && face1detected && !face2detected && parentData && !parentData.name2 &&
                                <>
                                    <Button onClick={handleSubmit}>Submit</Button>
                                </>
                            }

                            {
                                canShowNext && face1detected && !face2detected && parentData && parentData.name2 &&
                                <>
                                    <h1 className='text-2xl font-bold text-blue5 '>Place your Face in Box.</h1>
                                    <p className='text-blue5 font-light'> Name : {parentData.name2}</p>
                                </>
                            }

                            {
                                canShowNext && face1detected && !face2detected &&
                                <WebcamDemo setFaceDetected={setFace2Detected} SetFaceCount={setFace2Count} setImgSrc={setImgSrc2} />

                            }

                            {
                                canShowNext && face1detected && face2detected &&
                                <>
                                    <img src={imgsrc2} alt
                                        ="face" className='w-[300px] h-[300px]' />
                                    <div className='flex items-center justify-evenly'>
                                        <button className=' mt-3 bg-blue2 text-white px-6 py-2 rounded-2xl' onClick={() => {
                                            setFace1Detected(false);
                                            setFace2Detected(false);
                                            setFace1Count(0);
                                            setFace2Count(0);
                                            setCanShowNext(false)
                                        }}>Retake</button>
                                        <button className=' mt-3 bg-blue2 text-white px-6 py-2 rounded-2xl' onClick={() => navigate('/parent/list-today')}>Back</button>
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

export default ParentEntry

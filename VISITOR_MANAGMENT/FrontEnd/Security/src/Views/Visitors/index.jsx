import React from 'react'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Navbar } from '../../Components/Navbar';
import { StickyFooterMobile } from '../../Components/StickyFooterMobile';
import { useForm } from 'react-hook-form';
import { InputField } from '../../Components/InputField';
import { Button } from '../../Components/Button';
import { useNavigate } from 'react-router-dom';
import WebcamDemo from '../../Components/FaceDetection';
import { postRequest, postRequestWithToken } from '../../Services/Api';
import { base64ToFile } from '../../Services/Helpers';
import CurrentList from './CurrentList';
import { useLocation, Link } from 'react-router-dom';

const Visitors = () => {

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const location = useLocation();

    const getTabIndex = (pathname) => {
        switch (pathname) {
            case '/current-visitor-list':
                return 1;
            case '/add-visitor':
            default:
                return 0;
        }
    };

    const [isOtpSent, setIsOtpSent] = React.useState(false)
    const [isOtpVerified, setIsOtpVerified] = React.useState(false)
    const [isVisitorAdded, setIsVisitorAdded] = React.useState(false)
    const [isPhotoCaptured, setIsPhotoCaptured] = React.useState(false)
    const [isDetailsFilled, setIsDetailsFilled] = React.useState(false)
    const [faceDetected, setFaceDetected] = React.useState(false)
    const [faceCount, setFaceCount] = React.useState(0)
    const [imgSrc, setImgSrc] = React.useState(null);

    const [visitorData, setVisitorData] = React.useState({
        Name: '',
        Reason: '',
        Mobile: '',
        OTP: '',
        Photo: '',
        Details: ''
    })

    const navigate = useNavigate()

    // This will contain all form data once submit button is clicked.
    const onSubmit1 = (data, e) => {

        if (data.Name == '' || data.Reason == '') {
            alert('Please fill all fields')
            return
        }
        else if (data.Name.length < 3) {
            alert('Name should be atleast 3 characters long')
            return
        }
        else if (data.Reason.length < 3) {
            alert('Reason should be atleast 3 characters long')
            return
        }

        // console.log(data)
        setVisitorData({ ...visitorData, Name: data.Name, Reason: data.Reason })
        setIsDetailsFilled(true)
    }

    const onSubmit2 = (data, e) => {

        if (data.Mobile == '') {
            alert('Please fill all fields')
            return
        }
        else if (data.Mobile.length != 10) {
            alert('Mobile number should be of 10 digits')
            return
        }

        // console.log(data)
        setVisitorData({ ...visitorData, Mobile: data.Mobile })
        setIsVisitorAdded(true)
        setIsOtpSent(true)
    }

    const onSubmit3 = (data, e) => {

        if (data.OTP == '') {
            alert('Please fill all fields')
            return
        }
        else if (data.OTP.length != 6) {
            alert('OTP should be of 6 digits')
            return
        }

        // console.log(data)
        setVisitorData({ ...visitorData, OTP: data.OTP })

        // send data to backend
        const sendVisitorData = async () => {
            const formData = new FormData()

            const file = base64ToFile(imgSrc, 'capture.png');

            formData.append('name', visitorData.Name)
            formData.append('mobile', visitorData.Mobile)
            formData.append('purpose', visitorData.Reason)
            formData.append('photo', file)

            // console.log(formData)

            const response = await postRequestWithToken('security/visitorEntry', formData, {
                'Content-Type': 'multipart/form-data'
            }, {})
            // console.log(response)

            if (response.status == 200) {
                alert('Visitor Added Successfully')
                completeReset()
                navigate('/visitor-pass', { state: {
                    name: visitorData.Name, 
                    purpose: visitorData.Reason, 
                    mobile: visitorData.Mobile, 
                    entryTime: new Date().toLocaleTimeString(), 
                    validityFrom: new Date().toLocaleDateString(), 
                    validityTo: new Date().toLocaleDateString(),
                    qrCodeValue: response.data.uuid,
                    date: new Date().toLocaleDateString(),
                    visitorPhoto: imgSrc
                } })
            }
            else {
                alert('Error Occured')
                completeReset()
                navigate('/visitors')
            }
        }

        sendVisitorData()


    }

    const completeReset = () => {
        reset()
        setIsOtpSent(false)
        setIsOtpVerified(false)
        setIsVisitorAdded(false)
        setIsPhotoCaptured(false)
        setIsDetailsFilled(false)
        setFaceDetected(false)
        setFaceCount(0)
        setImgSrc(null)
    }

    return (
        <>
            <Navbar />
            {/* <h1 className="text-2xl font-bold text-center mt-5">Visitors</h1> */}
            <div className='w-screen md:w-1/2 mx-auto mt-5 flex items-center justify-center top-0 sticky' >
                <Tabs selectedIndex={getTabIndex(location.pathname)} onSelect={(index) => {
                    switch (index) {
                        case 1:
                            window.history.pushState(null, '', '/current-visitor-list');
                            break;
                        case 0:
                        default:
                            window.history.pushState(null, '', '/add-visitor');
                            break;
                    }
                }}>
                    <TabList className="flex p-1 bg-gray-100 rounded-full mx-auto mb-4" style={{ width: 'fit-content' }}>
                        <Tab className="px-4 py-2 rounded-full cursor-pointer focus:outline-none" selectedClassName="bg-blue3 text-white">
                            <Link to="/add-visitor">Add New Visitor</Link>
                        </Tab>
                        <Tab className="px-4 py-2 rounded-full cursor-pointer focus:outline-none" selectedClassName="bg-blue3 text-white">
                        <Link to="/current-visitor-list">Current Visitor Inside</Link>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <div>
                            {/* form  containing multisteps, 
                            in 1st step, get name, reason, 
                            in 2nd step, campture photo,
                            in 3rd step, get mobile number, 
                            in 4th step, get otp,
                            in 5th step, get visitor details */}

                            {/* 1st step */}
                            {
                                !isDetailsFilled &&

                                <form className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[400px] space-y-5 ' autoComplete='off'
                                    id='loginForm' onSubmit={handleSubmit(onSubmit1)}>

                                    <h1 className='text-2xl font-bold'>Add Visitor</h1>
                                    <p className='text-gray-500'>Please fill the form to add visitor.</p>

                                    {/* email and password input fields */}
                                    <InputField
                                        placeholder='John Doe'
                                        label='Name'
                                        type='text'
                                        register={register}
                                        error={errors.Name?.message}
                                    />
                                    <InputField
                                        label='Reason'
                                        type='text'
                                        register={register}
                                        error={errors.Reason?.message}
                                    />
                                    <Button type='submit'>Next</Button>
                                    <Button onClick={() => {
                                        completeReset()
                                        navigate('/dashboard')
                                    }}>Cancel</Button>
                                </form>
                            }

                            {/* 2nd step :  */}
                            {
                                !isPhotoCaptured && isDetailsFilled && !faceDetected &&
                                <div className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[400px] space-y-5 '>
                                    <h1 className='text-2xl font-bold'>Capture Photo</h1>
                                    <p className='text-gray-500'>Please allow camera access to capture photo.</p>
                                    <WebcamDemo setFaceDetected={setFaceDetected} SetFaceCount={setFaceCount} setImgSrc={setImgSrc} />
                                </div>
                            }

                            {
                                !isPhotoCaptured && isDetailsFilled && faceDetected &&
                                <div className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[400px] space-y-5 '>
                                    <h1 className='text-2xl font-bold'>Capture Photo</h1>
                                    <p className='text-gray-500'>Please allow camera access to capture photo.</p>
                                    <img src={imgSrc} alt="face" />
                                    <Button onClick={() => setIsPhotoCaptured(true)}>Capture</Button>
                                    <Button onClick={() => setFaceDetected(false)}>Retake</Button>
                                    <Button onClick={() => {
                                        completeReset()
                                        navigate('/dashboard')
                                    }}>Cancel</Button>
                                </div>
                            }

                            {/* 3rd step */}
                            {
                                !isVisitorAdded && isPhotoCaptured &&

                                <form className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[400px] space-y-5 ' autoComplete='off'
                                    id='loginForm' onSubmit={handleSubmit(onSubmit2)}>
                                    <h1 className='text-2xl font-bold'>Add Visitor</h1>
                                    <p className='text-gray-500'>Please fill the form to add visitor.</p>

                                    <InputField
                                        placeholder='9876543210'
                                        label='Mobile'
                                        type='text'
                                        register={register}
                                        error={errors.Mobile?.message}
                                    />
                                    <Button type='submit'>Next</Button>
                                    <Button onClick={() => {
                                        completeReset()
                                        navigate('/dashboard')
                                    }
                                    }>Cancel</Button>
                                </form>
                            }
                        </div>

                        {/* 4th step */}
                        {
                            isOtpSent && !isOtpVerified &&
                            <form className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[400px] space-y-5 ' autoComplete='off'
                                id='loginForm' onSubmit={handleSubmit(onSubmit3)}>
                                <h1 className='text-2xl font-bold'>Add Visitor</h1>
                                <p className='text-gray-500'>Please fill the form to add visitor.</p>
                                <InputField
                                    placeholder='Enter OTP'
                                    label='OTP'
                                    type='text'
                                    register={register}
                                    error={errors.OTP?.message}
                                />
                                <Button type='submit'>Submit</Button>
                                <Button onClick={() => {
                                    completeReset()
                                    navigate('/dashboard')
                                }}>Cancel</Button>
                            </form>
                        }
                    </TabPanel>
                    <TabPanel>
                        <div>
                            {/* Content for List */}
                            <div className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl space-y-5 w-screen h-screen '>
                                {/* <h1 className='text-2xl font-bold'>Current Visitors Inside Campus</h1> */}
                                <CurrentList />
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
            <StickyFooterMobile />
        </>
    )
}

export default Visitors
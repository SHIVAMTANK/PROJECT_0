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

    const onSubmit2 = async (data, e) => {
        if (!data.Email) {
            alert('Please enter an email address');
            return;
        }
        if (!data.Email.includes('@')) {
            alert('Please enter a valid email address');
            return;
        }
        if (!data.Mobile) {
            alert('Please enter a mobile number');
            return;
        }
        if (data.Mobile.length !== 10) {
            alert('Mobile number should be 10 digits');
            return;
        }

        try {
            // Send OTP to email
            const response = await postRequestWithToken('security/visitor/send-otp', {
                name: visitorData.Name,
                email: data.Email
            });

            if (response.status === 200) {
                setVisitorData(prev => ({
                    ...prev,
                    Email: data.Email,
                    Mobile: data.Mobile
                }));
                setIsOtpSent(true);
                alert('OTP sent to your email');
            } else {
                alert('Failed to send OTP');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send OTP');
        }
    };

    const onSubmit3 = async (data, e) => {
        if (!data.OTP) {
            alert('Please enter OTP');
            return;
        }

        try {
            const verifyResponse = await postRequestWithToken('security/visitor/verify-otp', {
                email: visitorData.Email,
                otp: data.OTP
            });

            if (verifyResponse.status === 200) {
                setIsOtpVerified(true);
            } else {
                alert('Invalid OTP');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to verify OTP');
        }
    };

    const onSubmit4 = async (data, e) => {
        if (!data.Mobile) {
            alert('Please enter a mobile number');
            return;
        }
        if (data.Mobile.length !== 10) {
            alert('Mobile number should be 10 digits');
            return;
        }

        try {
            // Create visitor with all data
            const visitorDataToSend = {
                name: visitorData.Name,
                email: visitorData.Email,
                mobile: data.Mobile,
                purpose: visitorData.Reason
            };

            const response = await postRequestWithToken('security/visitor/create', visitorDataToSend);

            if (response.status === 200) {
                alert('Visitor Added Successfully');
                completeReset();
                navigate('/visitor-pass', {
                    state: {
                        name: visitorData.Name,
                        purpose: visitorData.Reason,
                        email: visitorData.Email,
                        mobile: data.Mobile,
                        entryTime: new Date().toLocaleTimeString(),
                        validityFrom: new Date().toLocaleDateString(),
                        validityTo: new Date().toLocaleDateString(),
                        qrCodeValue: response.data.uuid,
                        date: new Date().toLocaleDateString(),
                        visitorPhoto: imgSrc
                    }
                });
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error occurred: ' + error.message);
        }
    };

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

                                <form className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[400px] space-y-5' 
                                    onSubmit={handleSubmit(onSubmit2)}>
                                    <h1 className='text-2xl font-bold'>Contact Information</h1>
                                    <InputField
                                        placeholder='example@email.com'
                                        label='Email'
                                        type='email'
                                        register={register}
                                        error={errors.Email?.message}
                                    />
                                    <InputField
                                        placeholder='Enter 10-digit mobile number'
                                        label='Mobile'
                                        type='text'
                                        register={register}
                                        error={errors.Mobile?.message}
                                    />
                                    <Button type='submit'>Send OTP</Button>
                                    <Button onClick={() => {
                                        completeReset();
                                        navigate('/dashboard');
                                    }}>Cancel</Button>
                                </form>
                            }

                            {/* 4th step */}
                            {
                                isOtpSent && !isOtpVerified &&
                                <form className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[400px] space-y-5'
                                    onSubmit={handleSubmit(onSubmit3)}>
                                    <h1 className='text-2xl font-bold'>Verify OTP</h1>
                                    <p className='text-gray-500'>Enter the OTP sent to your email</p>
                                    <InputField
                                        placeholder='Enter OTP'
                                        label='OTP'
                                        type='text'
                                        register={register}
                                        error={errors.OTP?.message}
                                    />
                                    <Button type='submit'>Verify OTP</Button>
                                    <Button onClick={() => {
                                        completeReset();
                                        navigate('/dashboard');
                                    }}>Cancel</Button>
                                </form>
                            }

                            {/* 5th step */}
                            {
                                isOtpVerified &&
                                <form className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[400px] space-y-5 ' autoComplete='off'
                                    id='loginForm' onSubmit={handleSubmit(onSubmit4)}>
                                    <h1 className='text-2xl font-bold'>Enter Mobile Number</h1>
                                    <InputField
                                        placeholder='Enter 10-digit mobile number'
                                        label='Mobile'
                                        type='text'
                                        register={register}
                                        error={errors.Mobile?.message}
                                    />
                                    <Button type='submit'>Submit</Button>
                                    <Button onClick={() => {
                                        completeReset()
                                        navigate('/dashboard')
                                    }}>Cancel</Button>
                                </form>
                            }
                        </div>
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
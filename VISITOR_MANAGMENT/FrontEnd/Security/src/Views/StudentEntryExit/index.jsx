import React, { useState, useRef } from 'react';
import { Navbar } from '../../Components/Navbar';
import { StickyFooterMobile } from '../../Components/StickyFooterMobile';
import { postRequestWithToken } from '../../Services/Api';
import Webcam from "react-webcam";
import { useNavigate } from 'react-router-dom';

const StudentEntryExit = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        student_id: '',
        isLongLeave: false,
        reason: '',
    });
    const [showCamera, setShowCamera] = useState(false);
    const [loading, setLoading] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const webcamRef = useRef(null);

    const capture = () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            setCapturedImage(imageSrc);
        }
    };

    const retake = () => {
        setCapturedImage(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('1. Form Data:', formData);
        console.log('2. Student ID before conversion:', formData.student_id);
        
        const student_id = Number(formData.student_id);
        console.log('3. Converted Student ID:', student_id);

        if (!student_id || isNaN(student_id)) {
            alert('Please enter a valid Student ID');
            return;
        }

        if (!capturedImage) {
            alert('Please capture photo first');
            return;
        }

        try {
            setLoading(true);

            // Convert base64 to file
            const base64Data = capturedImage.split(',')[1];
            const byteCharacters = atob(base64Data);
            const byteNumbers = new Array(byteCharacters.length);
            
            for (let i = 0; i < byteCharacters.length; i++) {
                byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });
            const photoFile = new File([blob], `student-${Date.now()}.jpg`, { type: 'image/jpeg' });

            const submitData = new FormData();
            submitData.append('student_id', student_id.toString());
            submitData.append('photo', photoFile);
            submitData.append('isLongLeave', formData.isLongLeave);
            submitData.append('reason', formData.reason);

            // Log FormData contents
            for (let pair of submitData.entries()) {
                console.log('4. FormData entry:', pair[0], pair[1]);
            }

            console.log('Sending data:', {
                student_id: student_id,
                isLongLeave: formData.isLongLeave,
                reason: formData.reason
            });

            // Log the URL being called
            console.log('Calling API endpoint:', 'security/studentEntryExit');

            const apiResponse = await postRequestWithToken(
                'security/studentEntryExit',
                submitData
            );

            console.log('API Response:', apiResponse);

            if (apiResponse?.status === 200) {
                const message = apiResponse.data.entry ? 
                    'Student entry recorded successfully' : 
                    'Student exit recorded successfully';
                alert(message);
                
                // Reset form
                setFormData({
                    student_id: '',
                    isLongLeave: false,
                    reason: '',
                });
                setCapturedImage(null);
                setShowCamera(false);
                navigate('/records/student');
            } else {
                throw new Error(apiResponse?.data?.message || 'Failed to record entry/exit');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error: ' + (error.message || 'Failed to record entry/exit. Please try again.'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className='flex flex-col items-center w-screen py-6'>
                <h1 className='text-3xl font-bold text-blue5 mb-6'>Student Entry/Exit Record</h1>

                <div className='w-full max-w-md px-4'>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className='rounded-lg shadow-xl p-6 bg-white'>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Student ID *
                                </label>
                                <input 
                                    type="number" 
                                    value={formData.student_id}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        student_id: e.target.value
                                    })}
                                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                    required
                                    placeholder="Enter Student ID"
                                    disabled={loading}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Leave Type
                                </label>
                                <select 
                                    value={formData.isLongLeave}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        isLongLeave: e.target.value === 'true'
                                    })}
                                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                    disabled={loading}
                                >
                                    <option value={false}>Short Leave</option>
                                    <option value={true}>Long Leave</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Reason *
                                </label>
                                <input 
                                    type="text"
                                    value={formData.reason}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        reason: e.target.value
                                    })}
                                    className="w-full p-2 border rounded focus:ring-blue-500 focus:border-blue-500"
                                    required
                                    placeholder="Enter reason"
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-2">
                                <button 
                                    type="button"
                                    onClick={() => setShowCamera(!showCamera)}
                                    className="w-full bg-blue3 hover:bg-blue4 text-white px-4 py-2 rounded"
                                    disabled={loading}
                                >
                                    {showCamera ? 'Hide Camera' : 'Show Camera'}
                                </button>

                                {showCamera && !capturedImage && (
                                    <div className="mt-2">
                                        <Webcam
                                            ref={webcamRef}
                                            audio={false}
                                            screenshotFormat="image/jpeg"
                                            className="w-full rounded"
                                            mirrored={false}
                                        />
                                        <button 
                                            type="button"
                                            onClick={capture}
                                            className="w-full mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                                            disabled={loading}
                                        >
                                            Capture Photo
                                        </button>
                                    </div>
                                )}

                                {capturedImage && (
                                    <div className="mt-2">
                                        <img 
                                            src={capturedImage} 
                                            alt="captured" 
                                            className="w-full rounded"
                                        />
                                        <button 
                                            type="button"
                                            onClick={retake}
                                            className="w-full mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                                            disabled={loading}
                                        >
                                            Retake Photo
                                        </button>
                                    </div>
                                )}
                            </div>

                            <button 
                                type="submit"
                                className="w-full mt-4 bg-blue3 hover:bg-blue4 text-white px-6 py-2 rounded disabled:opacity-50"
                                disabled={loading || !capturedImage}
                            >
                                {loading ? 'Processing...' : 'Submit'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <StickyFooterMobile />
        </>
    );
};

export default StudentEntryExit;

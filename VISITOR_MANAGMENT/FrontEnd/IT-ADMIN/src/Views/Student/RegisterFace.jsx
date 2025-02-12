import React from 'react';
import Webcam from 'react-webcam';
import { useFaceDetection } from 'react-use-face-detection';
import FaceDetection from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';
import { Navbar } from '../../Components/Navbar';
import { InputField } from '../../Components/InputField';
import { Button } from '../../Components/Button';

const RegisterFace = () => {
    const [imgSrcs, setImgSrcs] = React.useState([]); // Store captured images
    const [faceDetected, setFaceDetected] = React.useState(false);
    const [faceCount, setFaceCount] = React.useState(0);
    const [capturing, setCapturing] = React.useState(false); // Track if capturing is ongoing
    const [uploaded, setUploaded] = React.useState(false); // Track if photos have been uploaded

    const { webcamRef, boundingBox, detected, facesDetected } = useFaceDetection({
        faceDetectionOptions: {
            model: 'short',
        },
        faceDetection: new FaceDetection.FaceDetection({
            locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
        }),
        camera: ({ mediaSrc, onFrame, width, height }) =>
            new Camera(mediaSrc, {
                onFrame,
                width,
                height,
            }),
    });

    React.useEffect(() => {
        if (detected) {
            setFaceDetected(true);
            setFaceCount(facesDetected);
        } else {
            setFaceDetected(false);
            setFaceCount(0);
        }
    }, [detected, facesDetected]);

    // Capture photo periodically
    React.useEffect(() => {
        if (capturing && imgSrcs.length < 8) {
            const captureInterval = setInterval(() => {
                if (faceDetected && imgSrcs.length < 8) {
                    capture();
                }
            }, 1000); // Capture every 1 second while face is detected

            return () => clearInterval(captureInterval); // Cleanup interval on component unmount or stop capturing
        }
    }, [capturing, faceDetected, imgSrcs, faceCount]);

    const capture = React.useCallback(() => {
        if (imgSrcs.length < 8) {
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrcs((prevImages) => [...prevImages, imageSrc]);
        }
    }, [webcamRef, imgSrcs]);

    const uploadPhotos = async () => {
        const formData = new FormData();

        imgSrcs.forEach((src, index) => {

            const byteString = atob(src.split(',')[1]);
            const mimeString = src.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);

            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }

            const blob = new Blob([ab], { type: mimeString });
            formData.append('photos', blob, `photo_${index + 1}.jpg`);
        });

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                setUploaded(true); // Mark as uploaded
                console.log('Photos uploaded successfully');
            } else {
                console.error('Failed to upload photos');
            }
        } catch (error) {
            console.error('Error uploading photos:', error);
        }
    };

    React.useEffect(() => {
        if (imgSrcs.length === 8) {
            setCapturing(false);
        }
    }, [imgSrcs]);

    const startCapturing = () => {
        setCapturing(true);
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <Navbar />

            <div className='mt-4'>
                <form className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[900px] space-y-5 ' autoComplete='off'
                    id='loginForm' onSubmit={uploadPhotos}>

                    <h1 className='text-2xl font-bold'>Add Student</h1>
                    <p className='text-gray-500'>Please fill the form to add Vehicle.</p>

                    <label className="mt-4 block text-sm font-medium text-gray-700">Student ID</label>
                    <input className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue3 focus:border-blue3 sm:text-sm"
                        placeholder='Student ID'
                        label='StudentID'
                        type='text'
                    />


                    <div className='border-4 flex flex-col items-center justify-center py-10 gap-8'>
                        <div style={{ width: '70%', height: '280px', position: 'relative' }}>
                            {boundingBox.map((box, index) => (
                                <div
                                    key={`${index + 1}`}
                                    style={{
                                        border: '4px solid red',
                                        position: 'absolute',
                                        top: `${box.yCenter * 100}%`,
                                        left: `${box.xCenter * 100}%`,
                                        width: `${box.width * 100}%`,
                                        height: `${box.height * 100}%`,
                                        zIndex: 5,
                                    }}
                                />
                            ))}
                            <Webcam
                                ref={webcamRef}
                                forceScreenshotSourceSize
                                screenshotFormat="image/jpeg"
                                screenshotQuality={0.5}
                                width={640}
                                height={480}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                }}
                            />

                        </div>

                        <div>
                            {!capturing && faceDetected && imgSrcs.length == 0 && (
                                <Button
                                    onClick={startCapturing}
                                >
                                    Start Capturing Photos
                                </Button>
                            )}

                            {imgSrcs.length > 0 && (
                                <div>
                                    <h3>Captured Photos:</h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                        {imgSrcs.map((src, index) => (
                                            <img key={index} src={src} alt={`captured-${index + 1}`} style={{ width: '80px', margin: '5px' }} />
                                        ))}
                                    </div>
                                </div>
                            )}

                            {uploaded && (
                                <div className='mt-4 text-green-500'>
                                    Photos have been uploaded successfully!
                                </div>
                            )}

                            {imgSrcs.length === 8 && !uploaded && (
                                <Button
                                    onClick={uploadPhotos}
                                >
                                    Upload Photos
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* <Button type='submit'> Add Student </Button> */}
                </form>
            </div>

        </div>



    );
};

export default RegisterFace;

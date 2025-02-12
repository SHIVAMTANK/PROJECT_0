import React from 'react';
import Webcam from 'react-webcam';
import { useFaceDetection } from 'react-use-face-detection';
import FaceDetection from '@mediapipe/face_detection';
import { Camera } from '@mediapipe/camera_utils';

const WebcamDemo = ({ setFaceDetected, SetFaceCount, setImgSrc }) => {

    // add time delay of 2 sec before capturing the image
    React.useEffect(() => {
        const timer = setTimeout(() => {
            capture();
        }, 8000);
        return () => clearTimeout(timer);
    }, []);


    const { webcamRef, boundingBox, isLoading, detected, facesDetected } = useFaceDetection({
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
            capture();
            setFaceDetected(true)
            SetFaceCount(facesDetected)
        } else {
            setFaceDetected(false)
            SetFaceCount(0)
        }
    }
        , [detected])


    const capture = React.useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setImgSrc(imageSrc)
            // console.log(imageSrc);
        },
        [webcamRef, setImgSrc]
    );

    return (
        <div>
            {
                <div style={{ width: '100%', height: '400px', position: 'relative' }}>
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
                        style={{
                            height: '100%',
                            width: '100%',
                        }}
                    />

                    {
                        // show button to capture the image, if face is detected
                        // detected && <button className='bg-blue2 text-white px-6 py-3 rounded-2xl' onClick={capture}>Capture</button>
                    }
                </div>
            }
        </div>
    );
};

export default WebcamDemo;

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

// Styles
import "./QrStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "./../Assets/qr-frame.svg";
import { getRequest, getRequestWithToken } from "../Services/Api";

const QrReader = () => {
    // QR States
    const navigate = useNavigate();
    const scanner = useRef(null);
    const videoEl = useRef(null);
    const qrBoxEl = useRef(null);
    const [qrOn, setQrOn] = useState(true);
    const [flag, setFlag] = useState(true);

    // Result
    const [scannedResult, setScannedResult] = useState("");

    // Success
    const onScanSuccess = async (result) => {
        console.log(result);
        scanner.current.stop();
        const response = await getRequestWithToken(`security/getData?uuid=${result?.data}`);
        console.log(response)
        if (response.status === 200) {
            const sending = {
                uuid: result?.data,
            }
            if (response.data.hasOwnProperty('entry')) {
                sending.entry = response?.data?.entry;
            }

            if (response.data.hasOwnProperty('isParent')) {
                sending.isParent = response?.data?.isParent;

                sending.parentdata = response?.data?.data;

                // console.log(sending)
                navigate('/parent/exit', { state: sending });

            }
            else {
                navigate("/face-detection", { state: sending });
            }
        }
        else {

            alert("Invalid QR Code");
            scanner.current.start();
        }



    };

    // Fail
    const onScanFail = (err) => {
        console.log(err);
        // navigate("/dashboard");
        return;
    };

    if (flag) {


    }


    useEffect(() => {
        if (videoEl?.current && !scanner.current) {
            // 👉 Instantiate the QR Scanner
            scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
                onDecodeError: onScanFail,
                // 📷 This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
                preferredCamera: "environment",
                // 🖼 This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
                highlightScanRegion: true,
                // 🔥 This will produce a yellow (default color) outline around the qr code that we scan, showing a proof that our qr-scanner is scanning that qr code.
                highlightCodeOutline: true,
                // 📦 A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
                overlay: qrBoxEl?.current || undefined,
            });

            // 🚀 Start QR Scanner
            scanner?.current
                ?.start()
                .then(() => setQrOn(true))
                .catch((err) => {
                    if (err) setQrOn(false);
                });
        }

        // Clean up on unmount.
        // This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
        return () => {
            if (!videoEl?.current) {
                scanner?.current?.stop();
            }
        };
    }, []);

    // If "camera" is not allowed in browser permissions, show an alert.
    useEffect(() => {
        if (!qrOn)
            alert(
                "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
            );
    }, [qrOn]);

    return (
        <div className="qr-reader">
            {/* QR */}
            <video ref={videoEl}></video>
            <div ref={qrBoxEl} className="qr-box">
                <img
                    src={QrFrame}
                    alt="Qr Frame"
                    width={256}
                    height={256}
                    className="qr-frame"
                />
            </div>

            {/* Show Data Result if scan is success */}
            {scannedResult && (
                <p
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 99999,
                        color: "white",
                    }}
                >
                    Scanned Result: {scannedResult}
                </p>
            )}
        </div>
    );
};

export default QrReader;

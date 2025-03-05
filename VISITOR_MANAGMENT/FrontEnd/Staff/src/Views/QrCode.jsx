import React, { useEffect, useState } from 'react';
import { Navbar } from '../Components/NavBar';
import { StickyFooterMobile } from '../Components/StickyFooterMobile';
import QrCodeComponent from '../Components/QrCodeComponent';
import { getRequestWithToken } from '../Services/Api';
import { useNavigate } from 'react-router-dom';

const QrCode = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetching data from backend
    useEffect(() => {
        getRequestWithToken('staff/getData')
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
                navigate('/login');
            })
            .finally(() => setLoading(false));
    }, [navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
            </div>
        );
    }

    if (!data) return <div className="text-center mt-10">No data available</div>;

    return (
        <>
            <Navbar />

            {/* Container for QR and User Info */}
            <div className="flex flex-col justify-center items-center min-h-screen w-full px-4">
                <div className="bg-white p-8 rounded-2xl shadow-lg w-[400px] space-y-5">
                    
                    {/* User Information */}
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl font-bold text-blue-600">{data.name}</h1>
                        <p className="text-gray-600">{data.student_id}</p>
                    </div>

                    {/* QR Code Section */}
                    <div className="flex justify-center items-center bg-gray-200 p-6 rounded-2xl">
                        <QrCodeComponent value={data.uuid} />
                    </div>

                    {/* Back Button */}
                    <button 
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-2xl transition-all duration-300"
                        onClick={() => navigate('/profile')}
                    >
                        Go Back
                    </button>

                </div>
            </div>

            <StickyFooterMobile />
        </>
    );
};

export default QrCode;

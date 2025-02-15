import React, { useEffect, useState } from 'react';
import { getRequestWithToken } from '../Services/Api';
import { useNavigate } from 'react-router-dom';

const ProfileCard = () => {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetching data from backend
    useEffect(() => {
        getRequestWithToken('student/getData')
            .then((res) => {
                if (res.status === 401) {
                    alert('Session expired. Please login again.');
                    navigate('/login');
                } else {
                    setData(res.data);
                }
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                navigate('/login');
            });
    }, [navigate]);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {loading ? (
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-75"></div>
            ) : (
                <div className="w-[400px] bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Header with gradient background */}
                    <div className="bg-gradient-to-b from-blue-500 to-blue-700 h-36"></div>

                    {/* Profile Picture */}
                    <div className="flex justify-center -mt-16">
                        <div className="w-32 h-32 bg-white p-1 rounded-full overflow-hidden border border-gray-300">
                            <img
                                className="w-full h-full object-cover rounded-full"
                                src={data.photo || "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
                                alt="Avatar"
                            />
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="text-center px-6 py-4">
                        <h2 className="text-2xl font-semibold text-gray-800">{data.name}</h2>
                        <p className="text-sm text-gray-600">{data.student_id}</p>

                        <div className="flex justify-between mt-6 text-gray-600 text-sm">
                            {/* Mobile Number */}
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.75 21 3 13.25 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.27 1.11l-2.2 2.2z"></path>
                                </svg>
                                {data.mobile || "N/A"}
                            </div>

                            {/* Room Number */}
                            <div className="flex items-center">
                                <svg className="w-5 h-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"></path>
                                </svg>
                                {data.room || "N/A"}
                            </div>
                        </div>

                        {/* QR Code Button */}
                        <button
                            className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition"
                            onClick={() => navigate('/qr-code')}
                        >
                            Show QR Code
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileCard;

import React, { useEffect, useState } from 'react';
import { StickyFooterMobile } from './StickyFooterMobile';
import { getRequestWithToken } from '../Services/Api';
import { useNavigate } from 'react-router-dom';
import building from '../Assets/building.svg';

const ProfileCard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch user data
    useEffect(() => {
        getRequestWithToken('staff/getData')
            .then((res) => {
                if (res.status === 401) {
                    alert('Session expired. Please login again.');
                    navigate('/login');
                    return;
                }
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
        <div className="flex justify-center mt-10">
            <div className="w-[400px] mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-gradient-to-b from-blue-400 to-blue-800 h-36"></div>
                <div className="flex justify-center -mt-16">
                    <div className="w-32 h-32 bg-white p-1 rounded-full overflow-hidden">
                        <img
                            className="w-full h-full object-cover rounded-full"
                            src={data.photo || "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
                            alt="Avatar"
                        />
                    </div>
                </div>
                <div className="text-center px-6 py-4">
                    <h2 className="text-2xl font-semibold text-gray-800">{data.name}</h2>
                    <p className="text-sm text-gray-600">{data.email}</p>

                    <div className="flex justify-between mt-4 text-gray-600">
                        <div className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.21.49 2.53.76 3.88.76a1 1 0 011 1V20a1 1 0 01-1 1C10.75 21 3 13.25 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.35.27 2.67.76 3.88a1 1 0 01-.27 1.11l-2.2 2.2z"></path>
                            </svg>
                            {data.mobile}
                        </div>
                        <div className="flex items-center">
                            <img className="w-5 h-5 mr-2" src={building} alt="department" />
                            {data.department}
                        </div>
                    </div>

                    <button
                        className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition-all duration-300"
                        onClick={() => navigate('/qr-code')}
                    >
                        Show QR Code
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;

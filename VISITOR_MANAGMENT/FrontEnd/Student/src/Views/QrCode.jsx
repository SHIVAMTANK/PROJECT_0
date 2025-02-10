import React, {useEffect} from 'react'
import { Navbar } from '../Components/Navbar'
import { StickyFooterMobile } from '../Components/StickyFooterMobile'
import QrCodeComponent from '../Components/QrCodeComponent'
import { getRequestWithToken } from '../Services/Api';
import { useNavigate } from 'react-router-dom';

const QrCode = () => {

    const [data, setData] = React.useState({});
    const navigate = useNavigate(); // For navigation
    const [loading, setLoading] = React.useState(true);

    // Fetching data from backend
    useEffect(() => {
        getRequestWithToken('student/getData')
            .then((res) => {
                setData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                navigate('/login');
            });
    }
        , []);

    // console.log(data);

    return (
        loading ? <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue3"></div>
        </div> :
        <>
            <Navbar />

            {/* box with name, email and qr code, qr code is on another div,  and back button at the below*/}

            <div className='flex flex-col justify-center items-center h-screen w-screen '>
                <div className='bg-white p-10 rounded-2xl shadow-2xl w-[400px] space-y-5'>

                    <div className=' flex flex-col items-center justify-center'>
                        <h1 className='text-2xl font-bold text-blue5 '>{data.name}</h1>
                        <p className='text-blue5 font-light'>{data.student_id}</p>
                    </div>

                    {/* another div with qr coponent on it */}

                    <div className='flex justify-center items-center bg-gray-200 p-8 rounded-2xl'>
                        <QrCodeComponent value={data.uuid} />
                    </div>

                    <div className='flex justify-center items-center' onClick={()=> navigate('/profile')} >
                        <button className='bg-blue2 text-white px-6 py-3 rounded-2xl'>Go Back</button>
                    </div>
                </div>
            </div>

            <StickyFooterMobile />
        </>
    )
}

export default QrCode

import React, { useState, useEffect } from 'react';
import { Button } from '../Components/Button';
import { Navbar } from '../Components/Navbar';
import { StickyFooterMobile } from '../Components/StickyFooterMobile';
import { postRequestWithToken, getRequestWithToken } from '../Services/Api';
import { useNavigate } from 'react-router-dom';

// const guardsList = [
//     { id: "qasdasa", name: "Guard 1" },
//     { id: "qasdweqwasd", name: "Guard 2" },
//     { id: "qasdweaasaswasd", name: "Guard 3" },
//     { id: "qaswewdasd", name: "Guard 4" },
//     { id: "qasdwewasd", name: "Guard 5" },
//     { id: "qasdweweasd", name: "Guard 6" },
//     { id: "qasdjknjnjkqewqasd", name: "Guard 7" },
//     { id: "qasdqweqwasd", name: "Guard 8" },
//     { id: "qaswqewqdasd", name: "Guard 9" },
//     { id: "qasdqwsseqwasd", name: "Guard 10" },
//     { id: "qasqweqdasd", name: "Guard 11" },
// ];

const GuardScheduler = () => {
    const [guards, setGuards] = useState([]);
    const [shift1, setShift1] = useState(["", "", ""]);
    const [shift2, setShift2] = useState(["", "", ""]);
    const [shift3, setShift3] = useState(["", "", ""]);

    // console.log(shift1, shift2, shift3)

    const [date, setDate] = useState(null);

    const navigate = useNavigate();

    const handleDateChange = (date) => {
        setDate(date);
    };

    useEffect(() => {
        // Fetch guards from the backend
        fetchGuards();
    }, []);

    const fetchGuards = async () => {
        // setGuards(guardsList);
        try {
            const response = await getRequestWithToken("securityManager/getAllSecurities");

            if (response.status === 200) {
                const data = response.data.map(guard => ({
                    id: guard.uuid,
                    name: guard.name
                }));
                setGuards(data);
            }
            else {
                alert("Failed to fetch guards. Please Try Again.")
                navigate('/dashboard')
                console.error("Failed to fetch guards. Please Try Again.");
            }
        } catch (error) {
            alert('Failed to fetch guards. Please Try Again.');
            navigate('/dashboard')
            console.error('Error fetching guards:', error);
        }
    };

    const onGuardChange = (event, shift, index) => {
        const newGuard = event.target.value;
        if (shift === 'shift1') {
            const newShift1 = [...shift1];
            newShift1[index] = newGuard;
            setShift1(newShift1);
        }
        if (shift === 'shift2') {
            const newShift2 = [...shift2];
            newShift2[index] = newGuard;
            setShift2(newShift2);
        }
        if (shift === 'shift3') {
            const newShift3 = [...shift3];
            newShift3[index] = newGuard;
            setShift3(newShift3);
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        // Send schedule to backend

        const schedule = {
            shift1: shift1,
            shift2: shift2,
            shift3: shift3,
            date: date
        };

        // console.log(schedule);

        try {
            const response = await postRequestWithToken("securityManager/addShift", schedule);
            if (response.status == 200) {
                alert('Schedule submitted successfully');
                setShift1(["", "", ""]);
                setShift2(["", "", ""]);
                setShift3(["", "", ""]);
                navigate('/dashboard');
            }
            else if (response.status == 403) {
                alert("The date you selected is already scheduled. Please select another date.")
                setDate(null);
            }
            else if (response.status == 401) {
                alert('Please login to access this page');
                navigate('/login');
            }
            else {
                alert('Failed to submit schedule');
            }
        } catch (error) {
            console.error('Error submitting schedule:', error);
        }
    };

    // same guard can not be selected again in any shift
    const getGuardOptionsForShift = (shift, guardIndex) => {
        const options = guards.filter(guard => {
            if (shift === 'shift1') {
                return (guard.id == shift1[guardIndex] || !shift1.includes(guard.id)) && !shift2.includes(guard.id) && !shift3.includes(guard.id);
            }
            if (shift === 'shift2') {
                return (guard.id == shift2[guardIndex] || !shift2.includes(guard.id)) && !shift1.includes(guard.id) && !shift3.includes(guard.id);
            }
            if (shift === 'shift3') {
                return (guard.id == shift3[guardIndex] || !shift3.includes(guard.id)) && !shift1.includes(guard.id) && !shift2.includes(guard.id);
            }
        }
        );

        // console.log(options)

        return options;
    };


    return (
        <>
            <Navbar />
            <div className='w-screen px-20 py-28'>
                <form className='md:bg-white md:rounded-2xl md:shadow-2xl px-12 py-8 space-y-5'
                    autoComplete='off'
                    id='loginForm'
                    onSubmit={handleSubmit}
                >

                    <h2 className='text-2xl font-bold'>Guard Scheduler</h2>

                    <div className='flex justify-center items-center gap-12'>
                        <label className='block text-lg font-medium text-gray-700' htmlFor='date'>Date</label>
                        <input
                            required
                            type='date'
                            className='block w-[300px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue3 focus:border-blue3 sm:text-sm'
                            id='date'
                            name='date'
                            value={date}
                            onChange={(event) => handleDateChange(event.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div className='flex justify-evenly flex-wrap gap-'>

                        <div className=' border p-8 rounded-md'>
                            <h2 className='text-lg font-bold'>Shift 1: 7:00 AM to 3:00 PM</h2>
                            <div className=''>
                                <div className='w-full'>
                                    <label className='mt-4 block text-sm font-medium text-gray-700' htmlFor='guard1'>Guard 1</label>
                                    {
                                        <select
                                            required
                                            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue3 focus:border-blue3 sm:text-sm'
                                            id='guard1'
                                            name='guard1'
                                            value={shift1[0]}
                                            onChange={(event) => onGuardChange(event, 'shift1', 0)}
                                        >
                                            <option value=''>Select Guard</option>
                                            {getGuardOptionsForShift('shift1', 0).map(guard => (
                                                <option key={guard.id} value={guard.id}>{guard.name}</option>
                                            ))}
                                        </select>
                                    }

                                </div>

                                <div className='w-full'>
                                    <label className='mt-4 block text-sm font-medium text-gray-700' htmlFor='guard2'>Guard 2</label>
                                    {
                                        <select
                                            required
                                            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue3 focus:border-blue3 sm:text-sm'
                                            id='guard2'
                                            name='guard2'
                                            value={shift1[1]}
                                            onChange={(event) => onGuardChange(event, 'shift1', 1)}
                                        >
                                            <option value=''>Select Guard</option>
                                            {getGuardOptionsForShift('shift1', 1).map(guard => (
                                                <option key={guard.id} value={guard.id}>{guard.name}</option>
                                            ))}
                                        </select>
                                    }
                                </div>

                                <div className='w-full'>
                                    <label className='mt-4 block text-sm font-medium text-gray-700' htmlFor='guard3'>Guard 3</label>
                                    {
                                        <select
                                            required
                                            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue3 focus:border-blue3 sm:text-sm'
                                            id='guard3'
                                            name='guard3'
                                            value={shift1[2]}
                                            onChange={(event) => onGuardChange(event, 'shift1', 2)}
                                        >
                                            <option value=''>Select Guard</option>
                                            {getGuardOptionsForShift('shift1', 2).map(guard => (
                                                <option key={guard.id} value={guard.id}>{guard.name}</option>
                                            ))}
                                        </select>
                                    }
                                </div>
                            </div>
                        </div>

                        <div className=' border p-8 rounded-md'>
                            <h2 className='text-lg font-bold'>Shift 2: 3:00 PM to 11:00 PM</h2>
                            <div className=''>
                                <div className='w-full'>
                                    <label className='mt-4 block text-sm font-medium text-gray-700' htmlFor='guard4'>Guard 4</label>
                                    {
                                        <select
                                            required
                                            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue3 focus:border-blue3 sm:text-sm'
                                            id='guard4'
                                            name='guard4'
                                            value={shift2[0]}
                                            onChange={(event) => onGuardChange(event, 'shift2', 0)}
                                        >
                                            <option value=''>Select Guard</option>
                                            {getGuardOptionsForShift('shift2', 0).map(guard => (
                                                <option key={guard.id} value={guard.id}>{guard.name}</option>
                                            ))}
                                        </select>
                                    }

                                </div>

                                <div className='w-full'>
                                    <label className='mt-4 block text-sm font-medium text-gray-700' htmlFor='guard5'>Guard 5</label>
                                    {
                                        <select
                                            required
                                            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue3 focus:border-blue3 sm:text-sm'
                                            id='guard5'
                                            name='guard5'
                                            value={shift2[1]}
                                            onChange={(event) => onGuardChange(event, 'shift2', 1)}
                                        >
                                            <option value=''>Select Guard</option>
                                            {getGuardOptionsForShift('shift2', 1).map(guard => (
                                                <option key={guard.id} value={guard.id}>{guard.name}</option>
                                            ))}
                                        </select>
                                    }
                                </div>

                                <div className='w-full'>
                                    <label className='mt-4 block text-sm font-medium text-gray-700' htmlFor='guard6'>Guard 6</label>
                                    {
                                        <select
                                            required
                                            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue3 focus:border-blue3 sm:text-sm'
                                            id='guard6'
                                            name='guard6'
                                            value={shift2[2]}
                                            onChange={(event) => onGuardChange(event, 'shift2', 2)}
                                        >
                                            <option value=''>Select Guard</option>
                                            {getGuardOptionsForShift('shift2', 2).map(guard => (
                                                <option key={guard.id} value={guard.id}>{guard.name}</option>
                                            ))}
                                        </select>
                                    }
                                </div>
                            </div>

                        </div>

                        <div className=' border p-8 rounded-md'>
                            <h2 className='text-lg font-bold'>Shift 3: 11:00 PM to 7:00 AM</h2>
                            <div className=''>
                                <div className='w-full'>
                                    <label className='mt-4 block text-sm font-medium text-gray-700' htmlFor='guard7'>Guard 7</label>
                                    {
                                        <select
                                            required
                                            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue3 focus:border-blue3 sm:text-sm'
                                            id='guard7'
                                            name='guard7'
                                            value={shift3[0]}
                                            onChange={(event) => onGuardChange(event, 'shift3', 0)}
                                        >
                                            <option value=''>Select Guard</option>
                                            {getGuardOptionsForShift('shift3', 0).map(guard => (
                                                <option key={guard.id} value={guard.id}>{guard.name}</option>
                                            ))}
                                        </select>
                                    }

                                </div>

                                <div className='w-full'>
                                    <label className='mt-4 block text-sm font-medium text-gray-700' htmlFor='guard8'>Guard 8</label>
                                    {
                                        <select
                                            required
                                            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue3 focus:border-blue3 sm:text-sm'
                                            id='guard8'
                                            name='guard8'
                                            value={shift3[1]}
                                            onChange={(event) => onGuardChange(event, 'shift3', 1)}
                                        >
                                            <option value=''>Select Guard</option>
                                            {getGuardOptionsForShift('shift3', 1).map(guard => (
                                                <option key={guard.id} value={guard.id}>{guard.name}</option>
                                            ))}
                                        </select>
                                    }
                                </div>

                                <div className='w-full'>
                                    <label className='mt-4 block text-sm font-medium text-gray-700' htmlFor='guard9'>Guard 9</label>
                                    {
                                        <select
                                            required
                                            className='block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue3 focus:border-blue3 sm:text-sm'
                                            id='guard9'
                                            name='guard9'
                                            value={shift3[2]}
                                            onChange={(event) => onGuardChange(event, 'shift3', 2)}
                                        >
                                            <option value=''>Select Guard</option>
                                            {getGuardOptionsForShift('shift3', 2).map(guard => (
                                                <option key={guard.id} value={guard.id}>{guard.name}</option>
                                            ))}
                                        </select>
                                    }
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className='w-full flex justify-center'>
                        <button className='text-lg bg-blue3 hover:bg-blue4 text-white font-bold py-3 px-32 rounded mt-6'
                            type="submit">Submit Schedule</button>
                    </div>
                </form >
            </div>
            <StickyFooterMobile />
        </>
    );
};

export default GuardScheduler;
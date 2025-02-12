import React from 'react'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Navbar } from '../../Components/Navbar';
import { StickyFooterMobile } from '../../Components/StickyFooterMobile';
import { useForm } from 'react-hook-form';
import { InputField } from '../../Components/InputField';
import { Button } from '../../Components/Button';
import { getRequest, getRequestWithToken, postRequest, postRequestWithToken } from '../../Services/Api';
import { useLocation, Link } from 'react-router-dom';
import VechicleList from './VehicleList';

const Vehicle = () => {

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const location = useLocation();

    const getTabIndex = (pathname) => {
        switch (pathname) {
            case '/vehicle/records':
                return 1;
            case '/vehicle/add-vehicle':
            default:
                return 0;
        }
    };

    register('StudentID', { required: 'Student ID is required' })
    register('VehicleNumber', { required: 'Vehicle Number is required' })

    const verifyStudent = async (studentID) => {
        try {
            const res = await getRequestWithToken('hostelWarden/getStudentData?student_id=' + studentID, {})
            // console.log(res)
            if (res.status == 200) {
                return res.data.studentData
            }
            else if (res.status == 400) {
                return false
            }
            else {
                return false
            }
        } catch (error) {
            return false
        }
    }

    const onSubmit = async (data) => {
        try {

            const isStudent = await verifyStudent(data.StudentID)
            if (!isStudent) {
                alert('Student not found')
                return
            }
            else {

                const msg = "Student Name : " + isStudent.name + "\nStudent ID : " + isStudent.student_id + "\nVehicle Number : " + data.VehicleNumber + "\n\nAre you sure you want to add this vehicle?"
                // console.log(msg)
                // take confirmation from user
                const confirmation = window.confirm(msg, { title: 'Confirm Vehicle Addition'})
                if (!confirmation) {
                    return
                }
            }

            // console.log(data)
            const dataToSend = {
                student_id: data.StudentID,
                vehicle: data.VehicleNumber
            }

            const res = await postRequestWithToken('hostelWarden/addVehicle', dataToSend)
            // console.log(res)

            if (res.status == 200) {
                alert('Vehicle Added Successfully')
                reset()
            }
            else if (res.status == 400) {
                alert('Student not found')
            }
            else if (res.status == 401) {
                alert('Vehicle already added')
            }
            else {
                alert('Failed to add vehicle. Please try again later.')
            }
        } catch (error) {
            alert('Failed to add vehicle')
        }
    }


    return (
        <div className='h-screen'>
            <Navbar />
            {/* <h1 className="text-2xl font-bold text-center mt-5">Visitors</h1> */}
            <div className='w-screen md:w-1/2 mx-auto mt-5 flex items-center justify-center top-0 sticky' >
                <Tabs selectedIndex={getTabIndex(location.pathname)} onSelect={(index) => {
                    switch (index) {
                        case 1:
                            window.history.pushState(null, '', '/vehicle/records');
                            break;
                        case 0:
                        default:
                            window.history.pushState(null, '', '/vehicle/add-vehicle');
                            break;
                    }
                }}>
                    <TabList className="flex p-1 bg-gray-100 rounded-full mx-auto mb-4" style={{ width: 'fit-content' }}>
                        <Tab className="px-4 py-2 rounded-full cursor-pointer focus:outline-none" selectedClassName="bg-blue3 text-white">
                            <Link to="/vehicle/add-vehicle">Add New Vehicle</Link>
                        </Tab>
                        <Tab className="px-4 py-2 rounded-full cursor-pointer focus:outline-none" selectedClassName="bg-blue3 text-white">
                            <Link to="/vehicle/records">Vehicle Records</Link>
                        </Tab>
                    </TabList>
                    <TabPanel>
                        <div className='mt-32'>
                            <form className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[400px] space-y-5 ' autoComplete='off'
                                id='loginForm' onSubmit={handleSubmit(onSubmit)}>

                                <h1 className='text-2xl font-bold'>Add Vehicle</h1>
                                <p className='text-gray-500'>Please fill the form to add Vehicle.</p>

                                {/* student id, vechile number */}
                                <InputField
                                    placeholder='Student ID'
                                    label='StudentID'
                                    type='text'
                                    register={register}
                                    error={errors.StudentID?.message}
                                />

                                <InputField
                                    placeholder='XX-XX-YY-XXXX'
                                    label='VehicleNumber'
                                    type='text'
                                    register={register}
                                    error={errors.VehicleNumber?.message}
                                />

                                <Button type='submit'> Add Vehicle </Button>
                            </form>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div>
                            {/* Content for List */}
                            <div className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl space-y-5 w-screen h-screen '>
                                {/* <h1 className='text-2xl font-bold'>Current Visitors Inside Campus</h1> */}
                                <VechicleList />
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>
            </div>
            <StickyFooterMobile />
        </div>
    )
}

export default Vehicle

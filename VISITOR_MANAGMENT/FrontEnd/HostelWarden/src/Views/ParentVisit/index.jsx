import React from 'react'
import { Navbar } from '../../Components/Navbar';
import { StickyFooterMobile } from '../../Components/StickyFooterMobile';
import { useForm } from 'react-hook-form';
import { InputField } from '../../Components/InputField';
import { Button } from '../../Components/Button';
import { getRequestWithToken, postRequestWithToken } from '../../Services/Api';

// sample form data : {
//     name1 : 'Rahul',
//     name2 : 'Rahul',
//     student_id : '123',
//     mobilr : '123',
//     arrival_date : '12-12-2021',
//     purpose : 'for meeting',
// }

const AddParentVisit = () => {

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm()

    register('StudentID', { required: 'Student ID is required' })
    register('Visitor1Name', { required: 'Visitor 1 Name is required' })
    // register('Visitor2Name', { required: 'Visitor 2 Name is required' })
    register('Mobile', { required: 'Mobile Number is required' })
    register('ArrivalDate', { required: 'Arrival Date is required' })
    register('Purpose', { required: 'Purpose is required' })

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
        // console.log(data)
        try {

            const isStudent = await verifyStudent(data.StudentID)
            if (!isStudent) {
                alert('Student not found')
                return
            }
            else {

                const msg = "Student Name : " + isStudent.name + "\nStudent ID : " + isStudent.student_id + "\n\nAre you sure you want to add this visit?"
                // console.log(msg)
                // take confirmation from user
                const confirmation = window.confirm(msg, { title: 'Confirm Visit' })
                if (!confirmation) {
                    return
                }
            }

            // console.log(data)
            const dataToSend = {
                student_id: data.StudentID,
                name1: data.Visitor1Name,
                name2: data.Visitor2Name,
                mobile: data.Mobile,
                arrival_date: data.ArrivalDate,
                purpose: data.Purpose,
            }

            const res = await postRequestWithToken('hostelWarden/addParentVisit', dataToSend)
            // console.log(res)

            if (res.status == 200) {
                alert('Parent Visit added successfully')
                reset()
            }
            else if (res.status == 400) {
                alert('Failed to add parent visit')
            }
            else {
                alert('Failed to add parent visit')
            }
        } catch (error) {
            alert('Failed to add vehicle')
        }
    }


    return (
        <div className='h-screen'>
            <Navbar />
            {/* <h1 className="text-2xl font-bold text-center mt-5">Visitors</h1> */}
            <div className='w-screen md:w-1/2 mx-auto mt-2 flex items-center justify-center top-0 sticky' >
                <div className='mt-8'>
                    <form className='md:bg-white p-10 md:rounded-2xl md:shadow-2xl w-[400px] space-y-5 ' autoComplete='off'
                        id='loginForm' onSubmit={handleSubmit(onSubmit)}>

                        <h1 className='text-2xl font-bold'>Add Parent Visit</h1>
                        <p className='text-gray-500'>Please fill the form to add parent visit.</p>

                        <InputField
                            placeholder='Student ID'
                            label='StudentID'
                            type='text'
                            register={register}
                            error={errors.StudentID?.message}
                        />

                        <InputField
                            placeholder="Visitor 1's Name"
                            label='Visitor1Name'
                            type='text'
                            register={register}
                            error={errors.Visitor1Name?.message}
                        />

                        <InputField
                            placeholder="Visitor 2's Name"
                            label='Visitor2Name'
                            type='text'
                            register={register}
                            error={errors.Visitor2Name?.message}
                        />

                        <InputField
                            placeholder='Mobile Number'
                            label='Mobile'
                            type='text'
                            register={register}
                            error={errors.Mobile?.message}
                        />

                        <InputField
                            placeholder='Arrival Date'
                            label='ArrivalDate'
                            type='date'
                            register={register}
                            min={new Date().toISOString().split('T')[0]}
                            error={errors.ArrivalDate?.message}
                        />

                        <InputField
                            placeholder='Purpose'
                            label='Purpose'
                            type='text'
                            register={register}
                            error={errors.Purpose?.message}
                        />

                        <Button type='submit'> Add Visitor </Button>
                    </form>
                </div>
            </div>
            <StickyFooterMobile />
        </div>
    )
}

export default AddParentVisit

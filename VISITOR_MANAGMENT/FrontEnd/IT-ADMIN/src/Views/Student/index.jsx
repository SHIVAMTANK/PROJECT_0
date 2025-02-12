import React from 'react'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Navbar } from '../../Components/Navbar';
import { StickyFooterMobile } from '../../Components/StickyFooterMobile';
import { useForm } from 'react-hook-form';
import { useLocation, Link } from 'react-router-dom';
import AddStudent from './AddStudent';
import AddBatch from './AddBatch';
import DeleteStudent from './DeleteStudent';
import DeleteBatch from './Deletebatch';

const Student = () => {


    const location = useLocation();

    const getTabIndex = (pathname) => {
        switch (pathname) {
            case '/delete-batch':
                return 3;
            case '/delete-student':
                return 2;
            case '/add-batch':
                return 1;
            case '/add-student':
            default:
                return 0;
        }
    };

    return (
        <div className='h-screen'>
            <Navbar />
            {/* <h1 className="text-2xl font-bold text-center mt-5">Visitors</h1> */}
            <div className='w-screen md:w-1/2 mx-auto mt-5 flex items-center justify-center top-0 sticky' >
                <Tabs
                selectedIndex={getTabIndex(location.pathname)} onSelect={(index) => {
                    switch (index) {
                        case 3:
                            window.history.pushState(null, '', '/delete-batch');
                            break;
                        case 2:
                            window.history.pushState(null, '', '/delete-student');
                            break;
                        case 1:
                            window.history.pushState(null, '', '/add-batch');
                            break;
                        case 0:
                        default:
                            window.history.pushState(null, '', '/add-student');
                            break;
                    }
                }}>
                    <TabList className="flex p-1 bg-gray-100 rounded-full mx-auto mb-4" style={{ width: 'fit-content' }}>
                        <Tab className="px-4 py-2 rounded-full cursor-pointer focus:outline-none" selectedClassName="bg-blue3 text-white">
                            <Link to="/add-student">Add Student</Link>
                        </Tab>

                        <Tab className="px-4 py-2 rounded-full cursor-pointer focus:outline-none" selectedClassName="bg-blue3 text-white">
                            <Link to="/add-batch">Add Batch</Link>
                        </Tab>

                        <Tab className="px-4 py-2 rounded-full cursor-pointer focus:outline-none" selectedClassName="bg-blue3 text-white">
                            <Link to="/delete-student">Delete Student</Link>
                        </Tab>

                        <Tab className="px-4 py-2 rounded-full cursor-pointer focus:outline-none" selectedClassName="bg-blue3 text-white">
                            <Link to="/delete-batch">Delete Batch</Link>
                        </Tab>
                    </TabList>
                
                    <TabPanel className={'flex flex-col items-center'}>
                        <AddStudent />
                    </TabPanel>

                    <TabPanel className={'flex flex-col items-center'}>
                        <AddBatch />
                    </TabPanel>

                    <TabPanel className={'flex flex-col items-center'}>
                        <DeleteStudent />
                    </TabPanel>

                    <TabPanel className={'flex flex-col items-center'}>
                        <DeleteBatch />
                    </TabPanel>
                </Tabs>
            </div>
            <StickyFooterMobile />
        </div>
    )
}

export default Student

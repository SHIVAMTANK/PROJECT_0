import React from 'react'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Navbar } from '../../Components/Navbar';
import { StickyFooterMobile } from '../../Components/StickyFooterMobile';
import { useLocation, Link } from 'react-router-dom';
import RegistrarList from './Registrar';
import HostelWardenList from './HostelWarden';
import SecurityAdminList from './SecurityAdmin';
import { Button } from '../../Components/Button';
import { useNavigate } from 'react-router-dom';
import FacultyAdminBlockList from './FacultyAdminBlock';

const OtherUsers = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const getTabIndex = (pathname) => {
        switch (pathname) {
            case '/faculty-adminblock':
                return 3;
            case '/registrar':
                return 2;
            case '/hostel-warden':
                return 1;
            case '/security-admin':
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
                                window.history.pushState(null, '', '/faculty-adminblock');
                                break;
                            case 2:
                                window.history.pushState(null, '', '/registrar');
                                break;
                            case 1:
                                window.history.pushState(null, '', '/hostel-warden');
                                break;
                            case 0:
                            default:
                                window.history.pushState(null, '', '/security-admin');
                                break;
                        }
                    }}>
                    <TabList className="flex p-1 bg-gray-100 rounded-full mx-auto mb-4" style={{ width: 'fit-content' }}>

                        <Tab className="px-4 py-2 rounded-full cursor-pointer focus:outline-none" selectedClassName="bg-blue3 text-white">
                            <Link to="/security-admin">Security Admin</Link>
                        </Tab>

                        <Tab className="px-4 py-2 rounded-full cursor-pointer focus:outline-none" selectedClassName="bg-blue3 text-white">
                            <Link to="/hostel-warden">Hostel Warden</Link>
                        </Tab>

                        <Tab className="px-4 py-2 rounded-full cursor-pointer focus:outline-none" selectedClassName="bg-blue3 text-white">
                            <Link to="/registrar">Registrar</Link>
                        </Tab>
                        
                        <Tab className="px-4 py-2 rounded-full cursor-pointer focus:outline-none" selectedClassName="bg-blue3 text-white">
                            <Link to="/faculty-adminblock">Faculty / Admin</Link>
                        </Tab>
                    </TabList>

                    <div className='w-screen mx-auto mt-5 flex items-center justify-end top-0 sticky px-8'>
                        <button className='bg-blue3 text-white px-6 py-3  rounded-xl cursor-pointer focus:outline-none'
                         onClick={() => navigate('/add-user')}>Add User</button>
                    </div>

                    <TabPanel className={'flex flex-col items-center'}>
                        <SecurityAdminList />
                    </TabPanel>

                    <TabPanel className={'flex flex-col items-center'}>
                        <HostelWardenList />
                    </TabPanel>

                    <TabPanel className={'flex flex-col items-center'}>
                        <RegistrarList />
                    </TabPanel>

                    <TabPanel className={'flex flex-col items-center'}>
                        <FacultyAdminBlockList />
                    </TabPanel>
                </Tabs>
            </div>
            <StickyFooterMobile />
        </div>
    )
}

export default OtherUsers

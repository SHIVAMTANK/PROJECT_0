import React from 'react'
import { Navbar } from '../../Components/Navbar'
import { StickyFooterMobile } from '../../Components/StickyFooterMobile'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import ScheduleList from './ScheduleList';
import PastScheduleList from './PastSchedule';


const ScheduleHome = () => {

    const getTabIndex = (pathname) => {
        switch (pathname) {
            case '/past-schedule':
                return 1;
            case '/view-schedule':
            default:
                return 0;
        }
    };

    return (
        <>
            <Navbar />
            
            <div className='w-screen md:w-1/2 mx-auto mt-5 flex items-center justify-center top-0 sticky' >
                <Tabs selectedIndex={getTabIndex(location.pathname)} onSelect={(index) => {
                    switch (index) {
                        case 1:
                            window.history.pushState(null, '', '/past-schedule');
                            break;
                        case 0:
                        default:
                            window.history.pushState(null, '', '/view-schedule');
                            break;
                    }
                }}>
                    <TabList className="flex p-1 bg-gray-100 rounded-full mx-auto mb-4" style={{ width: 'fit-content' }}>
                        <Tab className="px-4 py-2 rounded-full cursor-pointer focus:outline-none" selectedClassName="bg-blue3 text-white">
                            <Link to="/view-schedule">View Schedule</Link>
                        </Tab>
                        <Tab className="px-4 py-2 rounded-full cursor-pointer focus:outline-none" selectedClassName="bg-blue3 text-white">
                            <Link to="/past-schedule">Past Schedule</Link>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <ScheduleList />
                    </TabPanel>
                    <TabPanel>
                        <PastScheduleList />
                    </TabPanel>
                </Tabs>
            </div>

            {/* <ParentListGrid /> */}

            <StickyFooterMobile />

        </>
    )
}

export default ScheduleHome

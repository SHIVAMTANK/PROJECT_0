import React from 'react'
import { Navbar } from '../../Components/Navbar'
import { StickyFooterMobile } from '../../Components/StickyFooterMobile'
import ParentListGrid from './ParentList'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import OthersListGrid from './OtherList';


const VisitsForToday = () => {

    const getTabIndex = (pathname) => {
        switch (pathname) {
            case '/other-visit-list-today':
                return 1;
            case '/parent/list-today':
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
                            window.history.pushState(null, '', '/other-visit-list-today');
                            break;
                        case 0:
                        default:
                            window.history.pushState(null, '', '/parent/list-today');
                            break;
                    }
                }}>
                    <TabList className="flex p-1 bg-gray-100 rounded-full mx-auto mb-4" style={{ width: 'fit-content' }}>
                        <Tab className="px-4 py-2 rounded-full cursor-pointer focus:outline-none" selectedClassName="bg-blue3 text-white">
                            <Link to="/parent/list-today">Parent Visits For Today</Link>
                        </Tab>
                        <Tab className="px-4 py-2 rounded-full cursor-pointer focus:outline-none" selectedClassName="bg-blue3 text-white">
                            <Link to="/other-visit-list-today">Other Scheduled Visits for Today</Link>
                        </Tab>
                    </TabList>

                    <TabPanel>
                        <ParentListGrid />
                    </TabPanel>
                    <TabPanel>
                        <OthersListGrid />
                    </TabPanel>
                </Tabs>
            </div>

            {/* <ParentListGrid /> */}

            <StickyFooterMobile />

        </>
    )
}

export default VisitsForToday

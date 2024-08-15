// pages/orders/[view].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SideNav from '@/components/SideNav';
import IncomingOrders from '@/components/incomingOrders';
import InProgressOrders from '@/components/inProgressOrders';
import CompletedOrders from '@/components/completedOrders';
import { Box, Flex, Spacer } from '@chakra-ui/react';
import { withRole } from '../../../../lib/auth';

const Orders = () => {
    const router = useRouter();
    const { view } = router.query;
    // console.log(view);
    const [currentView, setCurrentView] = useState(view || 'incoming');

    useEffect(() => {
        setCurrentView(view || 'incoming');
    }, [view]);

    const renderOrders = () => {
        switch (currentView) {
            case 'inProgress':
                return <InProgressOrders />;
            case 'completed':
                return <CompletedOrders />;
            case 'incoming':
            default:
                return <IncomingOrders />;
        }
    };

    return (
        <Box bg="#f0f0f0" overflowX="auto">
            <Flex>
                <SideNav setCurrentView={setCurrentView} />
                <Box flex="1" py={5} px={{ base: 4, md: 12 }}>
                    {renderOrders()}
                </Box>
            </Flex>

            {/* <Footer /> */}
        </Box>
    );
};


//auth
export const getServerSideProps = withRole(['employee', 'admin'], '/employee/login');

export default Orders;

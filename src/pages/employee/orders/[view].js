// pages/orders/[view].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SideNav from '@/components/SideNav';
import IncomingOrders from '@/pages/employee/incomingOrders';
import InProgressOrders from '@/pages/employee/inProgressOrders';
import CompletedOrders from '@/pages/employee/completedOrders';
import { Box, Flex, Spacer } from '@chakra-ui/react';

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
        <Box bg="#bcc8c3">
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

export default Orders;


import React from "react";
import { useDrinkContext } from "../../context/drinkContext";
import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import OrdersColumn from "./OrdersColumn";

const CompletedOrders = () => {
    const { customers } = useDrinkContext();

    // Function to handle order status change (not needed in this component)
    const handleOrderStatusChange = (customerId, orderId, newStatus) => {
        // Function not needed for displaying completed orders only
    };

    // Calculate number of completed orders
    const completedOrdersCount = customers.reduce((count, user) => {
        return (
            count +
            user.orders.filter((order) => order.orderStatus === "completed").length
        );
    }, 0);

    return (
        <Box bg="#bcc8c3" minHeight="100vh" ml="250px">
            <Box py={5} px={{ base: 4, md: 12 }}>
                <Heading color="white" textAlign="center" mt={20}>
                    Completed Orders ({completedOrdersCount})
                </Heading>
                <SimpleGrid columns={1} mt={5} spacing={5}>
                    {/* Display Completed Orders */}
                    <OrdersColumn
                        orders={customers
                            .filter((user) =>
                                user.orders.some((order) => order.orderStatus === "completed")
                            )
                            .map((user) => ({
                                ...user,
                                orders: user.orders.filter(
                                    (order) => order.orderStatus === "completed"
                                ),
                            }))}
                        onStatusChange={handleOrderStatusChange} // No status change needed
                    />
                </SimpleGrid>
            </Box>
        </Box>
    );
};

export default CompletedOrders;

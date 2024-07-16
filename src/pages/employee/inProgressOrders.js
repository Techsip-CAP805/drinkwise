
import React from "react";
import { useDrinkContext } from "../../../context/drinkContext";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SideNav from "../../components/SideNav";
import { Box, Heading, SimpleGrid, useToast } from "@chakra-ui/react";
import OrdersColumn from "../../components/OrdersColumn";

const InProgressOrders = () => {
    const { customers, setCustomers } = useDrinkContext();
    const toast = useToast();

    // Function to handle order status change
    const handleOrderStatusChange = (customerId, orderId, newStatus) => {
        // Find the specific customer
        const updatedCustomers = customers.map((customer) => {
            if (customer._id.$oid === customerId) {
                // Find the specific order and update its status
                const updatedOrders = customer.orders.map((order) => {
                    if (order.orderID === orderId) {
                        return { ...order, orderStatus: newStatus };
                    }
                    return order;
                });

                // Return updated customer with updated orders
                return { ...customer, orders: updatedOrders };
            }
            return customer;
        });

        // Update the state with the modified customers array
        setCustomers(updatedCustomers);

        // Show appropriate toast message
        if (newStatus === "completed") {
            toast({
                description: "Order Completed!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-right"
            });
        }
    };

    // Calculate number of inProgress orders
    const inProgressOrdersCount = customers.reduce((count, user) => {
        return (
            count +
            user.orders.filter((order) => order.orderStatus === "inProgress").length
        );
    }, 0);

    return (
        <Box bg="#bcc8c3" minHeight="100vh">
            <Navbar />
            <SideNav />
            <Box py={5} px={{ base: 4, md: 12 }}>
                <Heading color="white" textAlign="center" mt={20}>
                    In Progress Orders ({inProgressOrdersCount})
                </Heading>
                <SimpleGrid columns={1} mt={5} spacing={5}>
                    {/* Display In Progress Orders */}
                    <OrdersColumn
                        orders={customers
                            .filter((user) =>
                                user.orders.some((order) => order.orderStatus === "inProgress")
                            )
                            .map((user) => ({
                                ...user,
                                orders: user.orders.filter(
                                    (order) => order.orderStatus === "inProgress"
                                ),
                            }))}
                        onStatusChange={handleOrderStatusChange}
                    />
                </SimpleGrid>
            </Box>
            <Footer />
        </Box>
    );
};

export default InProgressOrders;

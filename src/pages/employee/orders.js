import React from "react";
import { useDrinkContext } from "../../../context/drinkContext";
import Navbar from "../../components/Navbar";
import Footer from "@/components/Footer";
import SideNav from "../../components/SideNav";
import {
    Box,
    Heading,
    SimpleGrid,
    useToast,
} from "@chakra-ui/react";
import OrdersColumn from "../../components/OrdersColumn";

const Orders = () => {
    const { customers, setCustomers } = useDrinkContext();
    const toast = useToast();
    const inProgressLimit = 5;

    // Function to handle order status change
    const handleOrderStatusChange = (customerId, orderId, newStatus) => {
        // Calculate number of orders in inProgress status
        const inProgressOrdersCount = customers.reduce((count, user) => {
            return (
                count +
                user.orders.filter(order => order.orderStatus === "inProgress").length
            );
        }, 0);

        // Check if inProgressOrdersCount is already 5
        if (newStatus === "inProgress" && inProgressOrdersCount >= inProgressLimit) {
            toast({
                description: "Cannot accept more than 5 orders in progress!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom-right"
            });
            return; // Exit function without updating status
        }

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
        if (newStatus === "inProgress") {
            toast({
                description: "Order Accepted!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-right"
            });
        } else if (newStatus === "rejected") {
            toast({
                description: "Order Rejected!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom-right"
            });
        } else if (newStatus === "completed") {
            toast({
                description: "Order Completed!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom-right"
            });
        }
    };

    // Calculate number of orders in each status
    const pendingOrdersCount = customers.reduce((count, user) => {
        return count + user.orders.filter(order => order.orderStatus === "pending").length;
    }, 0);

    const inProgressOrdersCount = customers.reduce((count, user) => {
        return count + user.orders.filter(order => order.orderStatus === "inProgress").length;
    }, 0);

    const completedOrdersCount = customers.reduce((count, user) => {
        return count + user.orders.filter(order => order.orderStatus === "completed").length;
    }, 0);

    return (
        <Box bg="#bcc8c3">
            <Navbar />
            <SideNav />
            <Box py={5}>
                <Heading color="white" textAlign="center" mt={20}>
                    Orders
                </Heading>
                <SimpleGrid
                    columns={{ base: 1, md: 3 }}
                    px={{ base: 4, md: 12 }}
                    mt={5}
                    overflowY="auto"
                    css={{
                        "&::-webkit-scrollbar": {
                            width: "8px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            bg: "gray.400",
                            borderRadius: "8px",
                        },
                    }}
                >
                    {/* Column for Incoming Orders */}
                    <Box>
                        <Heading color="white" textAlign="center">
                            Incoming ({pendingOrdersCount})
                        </Heading>
                        <OrdersColumn
                            orders={customers
                                .filter((user) =>
                                    user.orders.some(
                                        (order) => order.orderStatus === "pending"
                                    )
                                )
                                .map((user) => ({
                                    ...user,
                                    orders: user.orders.filter(
                                        (order) => order.orderStatus === "pending"
                                    ),
                                }))}
                            onStatusChange={handleOrderStatusChange}
                        />
                    </Box>

                    {/* Column for In Progress Orders */}
                    <Box>
                        <Heading color="white" textAlign="center">
                            In Progress ({inProgressOrdersCount}/{inProgressLimit})
                        </Heading>
                        <OrdersColumn
                            orders={customers
                                .filter((user) =>
                                    user.orders.some(
                                        (order) => order.orderStatus === "inProgress"
                                    )
                                )
                                .map((user) => ({
                                    ...user,
                                    orders: user.orders.filter(
                                        (order) => order.orderStatus === "inProgress"
                                    ),
                                }))}
                            onStatusChange={handleOrderStatusChange}
                        />
                    </Box>

                    {/* Column for Completed Orders */}
                    <Box>
                        <Heading color="white" textAlign="center">
                            Completed ({completedOrdersCount})
                        </Heading>
                        <OrdersColumn
                            orders={customers
                                .filter((user) =>
                                    user.orders.some(
                                        (order) => order.orderStatus === "completed"
                                    )
                                )
                                .map((user) => ({
                                    ...user,
                                    orders: user.orders.filter(
                                        (order) => order.orderStatus === "completed"
                                    ),
                                }))}
                            onStatusChange={handleOrderStatusChange}
                        />
                    </Box>
                </SimpleGrid>
            </Box>
            <Footer />
        </Box>
    );
};

export default Orders;

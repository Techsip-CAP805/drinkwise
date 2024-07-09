import React from "react";
import { useDrinkContext } from "../../context/drinkContext";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import SideNav from "../components/SideNav";

import {
    Box,
    Text,
    Heading,
    VStack,
    Card,
    CardBody,
    Stack,
    Container,
    Flex,
    Button,
    useColorModeValue,
    HStack,
} from "@chakra-ui/react";

const IncomingOrders = () => {
    const { customers } = useDrinkContext();
    const cardBgColor = useColorModeValue("#a0b2ab", "#283E38");

    let cardNumber = 1;

    // Filter and sort orders by order date (oldest to newest)
    const filteredOrders = customers
        .filter((user) => user.orders.some((order) => order.orderStatus === "pending"))
        .sort((a, b) => {
            // Sort orders within each user
            const oldestOrderA = a.orders.reduce((oldest, current) =>
                oldest.orderDate < current.orderDate ? oldest : current
            );
            const oldestOrderB = b.orders.reduce((oldest, current) =>
                oldest.orderDate < current.orderDate ? oldest : current
            );
            return oldestOrderA.orderDate - oldestOrderB.orderDate;
        });

    const handleAccept = () => {
        // Handle accept logic here 
        console.log("Order accepted!");
    };

    const handleReject = () => {
        // Handle cancel logic here
        console.log("Order Rejected!");
    };

    return (
        <Box bg="#bcc8c3">
            <Navbar />
            <SideNav />
            <Container w="100vw" minH="100vh" maxW="7xl" py={10}>
                <Flex direction="column" justify="center" align="center" w="100%" h="100%" mt={20}>
                    <VStack spacing={6} p={4} w="100%" align="center">
                        <Heading color="white">Incoming Orders</Heading>
                        {filteredOrders.map((user, index) =>
                            user.orders.map((order, orderIndex) => (
                                <Card
                                    key={`${index}-${orderIndex}`}
                                    borderRadius="lg"
                                    width={{ base: "90%", md: "80%", lg: "60%" }}
                                    overflow="hidden"
                                    boxShadow="md"
                                    bg={cardBgColor}
                                >
                                    <CardBody p={4}>
                                        <Stack spacing={3}>
                                            <Text color="gray.500" fontSize="sm">
                                                #{cardNumber++}
                                            </Text>
                                            <Heading size="md" textAlign="center" color="white">
                                                Order ID: {order.orderID}
                                            </Heading>
                                            <Text textAlign="center" color="white">
                                                Customer Name: {user.customerName}
                                            </Text>
                                            <Text textAlign="center" color="white">
                                                Order Date: {new Date(order.orderDate).toLocaleDateString("en-US")}
                                            </Text>
                                            <Text color="white" fontSize="md" textAlign="center">
                                                Total Amount: ${order.totalAmount}
                                            </Text>
                                            <HStack spacing={4} mt={6}>
                                                <Button onClick={handleAccept} colorScheme="green" w="50%">
                                                    Accept
                                                </Button>
                                                <Button onClick={handleReject} colorScheme="red" w="50%">
                                                    Reject
                                                </Button>
                                            </HStack>
                                        </Stack>
                                    </CardBody>
                                </Card>
                            ))
                        )}
                    </VStack>
                </Flex>
            </Container>
            <Footer />
        </Box>
    );
};

export default IncomingOrders;

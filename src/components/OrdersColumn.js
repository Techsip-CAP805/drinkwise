import React from "react";
import {
    VStack,
    Text,
    Heading,
    Card,
    CardBody,
    Stack,
    Button,
    useColorModeValue,
    HStack,
    Box,
} from "@chakra-ui/react";



const OrdersColumn = ({ orders, onStatusChange }) => {
    const cardBgColor = useColorModeValue("#a0b2ab", "#283E38");

    const handleStatusChange = (customerId, orderId, newStatus) => {
        onStatusChange(customerId, orderId, newStatus);
    };

    return (
        <Box
            px={{ base: 4, md: 12 }}
            mb={10}
        >
            <VStack align="center">
                {/* Removed Heading component for title */}
                {orders.map((user, index) =>
                    user.orders.map((order, orderIndex) => (
                        <Card
                            key={`${index}-${orderIndex}`}
                            borderRadius="lg"
                            width={{ base: "90%", md: "80%", lg: "60%" }}
                            overflow="hidden"
                            boxShadow="md"
                            bg={cardBgColor}
                            mb={4}
                        >
                            <CardBody p={4}>
                                <Stack spacing={3}>
                                    {/* <Text color="gray.500" fontSize="sm">
                                        #{index + 1}
                                    </Text> */}
                                    <Heading
                                        size="md"
                                        textAlign="center"
                                        color="white"
                                    >
                                        Order ID: {order.orderID}
                                    </Heading>
                                    <Text textAlign="center" color="white">
                                        Customer Name: {user.customerName}
                                    </Text>
                                    <Text textAlign="center" color="white">
                                        Order Date:{" "}
                                        {new Date(
                                            order.orderDate
                                        ).toLocaleDateString("en-US")}
                                    </Text>
                                    <Text
                                        color="white"
                                        fontSize="md"
                                        textAlign="center"
                                    >
                                        Total Amount: ${order.totalAmount}
                                    </Text>
                                    <HStack
                                        spacing={4}
                                        mt={6}
                                        justify="center"
                                    >
                                        {/* Display buttons based on order status */}
                                        {order.orderStatus === "pending" && (
                                            <>
                                                <Button
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            user._id.$oid,
                                                            order.orderID,
                                                            "inProgress"
                                                        )
                                                    }
                                                    colorScheme="green"
                                                    w="50%"
                                                >
                                                    Accept
                                                </Button>
                                                <Button
                                                    onClick={() =>
                                                        handleStatusChange(
                                                            user._id.$oid,
                                                            order.orderID,
                                                            "rejected"
                                                        )
                                                    }
                                                    colorScheme="red"
                                                    w="50%"
                                                >
                                                    Reject
                                                </Button>
                                            </>
                                        )}
                                        {order.orderStatus === "inProgress" && (
                                            <Button
                                                onClick={() =>
                                                    handleStatusChange(
                                                        user._id.$oid,
                                                        order.orderID,
                                                        "completed"
                                                    )
                                                }
                                                colorScheme="blue"
                                                w="50%"
                                            >
                                                Complete
                                            </Button>
                                        )}
                                    </HStack>
                                </Stack>
                            </CardBody>
                        </Card>
                    ))
                )}
            </VStack>
        </Box>
    );
};

export default OrdersColumn;

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import SideNav from "../../components/SideNav";
import IncomingOrders from "./incomingOrders";
import InProgressOrders from "./inProgressOrders";
import CompletedOrders from "./completedOrders";
import { Box, Flex, Link, Text } from "@chakra-ui/react";

const Orders = () => {
  const [currentView, setCurrentView] = useState("incoming");

  const renderOrders = () => {
    switch (currentView) {
      case "inProgress":
        return <InProgressOrders />;
      case "completed":
        return <CompletedOrders />;
      case "incoming":
      default:
        return <IncomingOrders />;
    }
  };

  return (
    <Box bg="#bcc8c3">
      <Box>
      <Flex>
        <SideNav setCurrentView={setCurrentView} />
        <Box flex="1" py={5} px={{ base: 4, md: 12 }} ml="250px">
          {renderOrders()}
        </Box>
      </Flex>
      </Box>
      <Footer />
    </Box>
  );
};

export default Orders;

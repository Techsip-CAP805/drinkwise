// pages/dashboard.js
import {
    Flex,
    Box,
    Heading,
    Text,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Grid,
    VStack,
  } from '@chakra-ui/react';
  import { Line } from 'react-chartjs-2';
  import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
  
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [300, 400, 200, 300, 500, 700],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };
  
  export default function Dashboard() {
    return (
      <Flex direction="column" minHeight="100vh" bg="#bcc8c3" p={4}>
        <Flex>
          <VStack align="start" spacing={4} width="200px" p={4}>
            <Heading size="md">Drinkwise</Heading>
            <Text>dashboard</Text>
            <Text>locations</Text>
            <Text>Sales</Text>
            <Text ml={4}>sales overview</Text>
            <Text>Menu</Text>
            <Text ml={4}>edit main menu</Text>
            <Text ml={4}>edit order menu</Text>
            <Text>Locations</Text>
            <Text ml={4}>add location</Text>
          </VStack>
          <Box flex="1" p={4}>
            <Heading>Dashboard</Heading>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mt={4}>
              <Stat p={4} bg="white" borderRadius="md" shadow="md">
                <StatLabel>total sales</StatLabel>
                <StatNumber>$1,250,000</StatNumber>
                <StatHelpText>
                  <StatArrow type="increase" />
                  27.7%
                </StatHelpText>
              </Stat>
              <Stat p={4} bg="white" borderRadius="md" shadow="md">
                <StatLabel>total order</StatLabel>
                <StatNumber>1,267</StatNumber>
                <StatHelpText>this month</StatHelpText>
              </Stat>
            </Grid>
            <Box p={4} bg="white" borderRadius="md" shadow="md" mt={6}>
              <Heading size="md" mb={4}>
                Revenue Trend
              </Heading>
              <Line data={data} />
            </Box>
          </Box>
          <Box p={4} bg="white" borderRadius="md" shadow="md" width="200px">
            <Heading size="md">Location earning</Heading>
            <Text mt={4}>Location 1</Text>
            <Text mt={4}>Location 2</Text>
            <Text mt={4}>Location 3</Text>
          </Box>
        </Flex>
      </Flex>
    );
  }
  
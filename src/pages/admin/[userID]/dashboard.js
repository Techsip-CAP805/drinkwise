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
  Divider,
} from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import Link from 'next/link';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { withRole } from '../../../../lib/auth';
import AdminSideNav from '@/components/AdminSideNav';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue',
      data: [300, 400, 200, 300, 500, 700],
      fill: false,
      borderColor: '#4A90E2', // Softer blue for the line
      tension: 0.1,
    },
  ],
};

export default function Dashboard() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`);
      const data = await res.json();
      setLocations(data);
    };

    fetchLocations();
  }, []);

  return (
    <Flex direction="row" minHeight="100vh" bg="#f7f7f7">  {/* Lighter background */}
      <Box width="250px" position="fixed" height="100vh" bg="#ffffff"> {/* White background for the navbar */}
        <AdminSideNav />
      </Box>
      <Box flex="1" p={6} ml="250px">
        <Heading mb={6} size="lg" color="#2D3748">Dashboard</Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <Stat p={4} bg="white" borderRadius="md" shadow="sm"> {/* Smaller shadow for subtleness */}
            <StatLabel fontSize="md" color="#4A5568">Total Sales</StatLabel>
            <StatNumber fontSize="2xl" color="#2D3748">$1,250,000</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              27.7%
            </StatHelpText>
          </Stat>
          <Stat p={4} bg="white" borderRadius="md" shadow="sm">
            <StatLabel fontSize="md" color="#4A5568">Total Orders</StatLabel>
            <StatNumber fontSize="2xl" color="#2D3748">1,267</StatNumber>
            <StatHelpText>This Month</StatHelpText>
          </Stat>
          <Box p={4} bg="white" borderRadius="md" shadow="sm">
            <Heading size="md" mb={4} color="#2D3748">Location Earnings</Heading>
            <Divider mb={4} />
            <VStack spacing={4} align="start">
              {locations.map((location) => (
                <Text key={location._id} color="#2D3748">{location.branchName}</Text>
              ))}
            </VStack>
          </Box>
        </Grid>
        <Box p={4} bg="white" borderRadius="md" shadow="sm" mt={6}>
          <Heading size="md" mb={4} color="#2D3748">
            Revenue Trend
          </Heading>
          <Line data={data} />
        </Box>
      </Box>
    </Flex>
  );
}

//auth
export const getServerSideProps = withRole(['admin'], '/admin/login');

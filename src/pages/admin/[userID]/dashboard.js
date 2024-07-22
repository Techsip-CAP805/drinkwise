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
import Link from 'next/link';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import AdminSideNav from '@/components/AdminSideNav.js';
import { withRole } from '../../../../lib/auth';

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
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    async function fetchLocations() {
      try {
        const response = await fetch('/api/locations');
        const data = await response.json();
        setLocations(data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    }

    fetchLocations();
  }, []);

  return (
    <Flex direction="column" minHeight="100vh" bg="#a8b8b1">
      <Box>
        {/* <VStack align="start" spacing={4} width='12vw' p={4} bg='#8fa39b' borderRadius='5px' boxShadow='lg'>
          <Heading size="md">Drinkwise</Heading>
          <Link href='/admin/userid/dashboard'>dashboard</Link>
          <Text>Sales</Text>
          <Link href='/admin/userid/sales' ml={4}>sales overview</Link>
          <Text>Menu</Text>
          <Link href='/admin/userid/edit/menu/main' ml={4}>edit main menu</Link>
          <Link href='/admin/userid/edit/menu/order' ml={4}>edit order menu</Link>
          <Text>Locations</Text>
          <Link href='/admin/userid/edit/locations'>edit locations</Link>
        </VStack> */}
        <AdminSideNav />
        <Box flex="1" p={4} ml="250px">
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
          <Heading size="md" mb={1}>Location earning</Heading>
          {locations.map((location) => (
            <Text mt={2} key={location._id}>{location.branchName}</Text>
          ))}
        </Box>
      </Box>
    </Flex>
  );
}


//auth
export const getServerSideProps = withRole(['admin'], '/admin');
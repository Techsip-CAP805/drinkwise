import React from 'react'
import { Box, VStack, Heading, Text } from '@chakra-ui/react'
import Link from 'next/link';
import AdminSideNav from '@/components/AdminSideNav';

const sales = () => {
  return (
    <Box bg='#bcc8c3' vw='100vw' minH='100vh'>
      {/* <VStack align="start" spacing={4} w='12vw' p={4} mt={4} ml={4} h='90vh' bg='#8fa39b' borderRadius='5px' boxShadow='lg' position='fixed' >
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
      <AdminSideNav/>
      <Text fontSize='xl' textAlign='center' pt='30vh'>Currently deciding on implementation...</Text>
    </Box>
  )
}

export default sales
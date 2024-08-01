import React from 'react';
import {
  Stack,
  Box,
  Heading,
  Link,
  Text,
  Center,
  useColorModeValue
} from '@chakra-ui/react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

const AdminSideNav = () => {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' });
  };

  return (
    <Box
      position="fixed"
      width="250px"
      height="100vh"
      p={5}
      boxShadow="xl"
      borderRight="1px solid #e2e8f0"
      bg={useColorModeValue('#ffffff40', '#20202380')}
      backdropFilter='auto'
      backdropBlur='8px'
    >
      <Stack spacing={8}>
        <Center mb={6}>
          <Image src='/header-log.png' width={150} height={100} alt='logo' />
        </Center>
        <Link href="/admin/userid/dashboard">
          <Heading size="md" color="#2D3748">Dashboard</Heading>
        </Link>
        <Link href="/admin/userid/sales">
          <Heading size="md" color="#2D3748">Sales</Heading>
        </Link>
        <Link href="/admin/userid/sales">
          <Text pl={6} fontSize="sm" color="#4A5568">Sales Overview</Text>
        </Link>
        <Link href="/admin/userid/edit/menu/main">
          <Heading size="md" color="#2D3748">Menu</Heading>
        </Link>
        <Link href="/admin/userid/edit/menu/main">
          <Text pl={6} fontSize="sm" color="#4A5568">Edit Main Menu</Text>
        </Link>
        <Link href="/admin/userid/edit/menu/order">
          <Text pl={6} fontSize="sm" color="#4A5568">Edit Order Menu</Text>
        </Link>
        <Link href='/admin/userid/edit/locations'>
          <Heading size="md" color="#2D3748">Locations</Heading>
        </Link>
        <Link href='/admin/userid/edit/locations'>
          <Text pl={6} fontSize="sm" color="#4A5568">Edit Locations</Text>
        </Link>
        <Link href='/admin/userid/edit/adminRegister'>
          <Heading size="md" color="#2D3748">Registration</Heading>
        </Link>
        <Link href='/admin/userid/edit/adminRegister'>
          <Text pl={6} fontSize="sm" color="#4A5568">Register Employee</Text>
        </Link>
        <Link href='#' onClick={handleSignOut}>
          <Heading size="md" color="#E53E3E">Sign Out</Heading>
        </Link>
      </Stack>
    </Box>
  );
};

export default AdminSideNav;

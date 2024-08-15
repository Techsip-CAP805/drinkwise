import React from 'react';
import {
  Stack,
  Box,
  Heading,
  Link,
  Text,
  Center,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import '@fontsource/poppins'; // Ensure this import is working

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
      fontFamily="Poppins, sans-serif" // Apply Poppins font
    >
      <Stack spacing={5}> {/* Adjust spacing */}
        <Center mb={4}>
          <Image src='/header-log.png' width={150} height={100} alt='logo' />
        </Center>
        <Link href="/admin/userid/dashboard">
          <Heading size="sm" color="#2D3748">Dashboard</Heading> {/* Adjusted heading size */}
        </Link>
        <Link href="/admin/userid/sales">
          <Heading size="sm" color="#2D3748">Sales</Heading> {/* Adjusted heading size */}
        </Link>
        <Link href="/admin/userid/sales">
          <Text pl={6} fontSize="md" color="#4A5568">Sales Overview</Text> {/* Adjusted text size */}
        </Link>
        <Link href="/admin/userid/edit/menu/main">
          <Heading size="sm" color="#2D3748">Menu</Heading> {/* Adjusted heading size */}
        </Link>
        <Link href="/admin/userid/edit/menu/main">
          <Text pl={6} fontSize="md" color="#4A5568">Edit Main Menu</Text> {/* Adjusted text size */}
        </Link>
        <Link href="/admin/userid/edit/menu/order">
          <Text pl={6} fontSize="md" color="#4A5568">Edit Order Menu</Text> {/* Adjusted text size */}
        </Link>
        <Link href='/admin/userid/edit/locations'>
          <Heading size="sm" color="#2D3748">Locations</Heading> {/* Adjusted heading size */}
        </Link>
        <Link href='/admin/userid/edit/locations'>
          <Text pl={6} fontSize="md" color="#4A5568">Edit Locations</Text> {/* Adjusted text size */}
        </Link>
        <Link href='/admin/userid/edit/adminRegister'>
          <Heading size="sm" color="#2D3748">Registration</Heading> {/* Adjusted heading size */}
        </Link>
        <Link href='/admin/userid/edit/adminRegister'>
          <Text pl={6} fontSize="md" color="#4A5568">Register Employee</Text> {/* Adjusted text size */}
        </Link>
        <Link href='#' onClick={handleSignOut}>
          <Heading size="sm" color="#E53E3E">Sign Out</Heading> {/* Adjusted heading size */}
        </Link>
      </Stack>
    </Box>
  );
};

export default AdminSideNav;

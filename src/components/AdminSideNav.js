import React from 'react';
import {
  Stack,
  Box,
  Heading,
  Link,
  Text,
  Center
} from '@chakra-ui/react';
import Image from 'next/image';

const AdminSideNav = () => {

  return (
    <Box
      position="fixed"
      bg="#A0B2AB"
      width="250px"
      height="100vh"
      p={5}
    >
      <Stack spacing={5}>
        <Link href="/admin/userid/dashboard" my={3}>
          <Center><Image src='/header-log.png' width={150} height={100} alt='logo' /></Center>
        </Link>
        <Link href="/admin/userid/dashboard">
          <Heading size="md">Dashboard</Heading>
        </Link>
        <Link href="/admin/userid/sales">
          <Heading size="md">Sales</Heading>
        </Link>
        <Link href="/admin/userid/sales">
          <Text pl={10}>Sales Overview</Text>
        </Link>
        <Link href="/admin/userid/edit/menu/main">
          <Heading size="md">Menu</Heading>
        </Link>
        <Link href="/admin/userid/edit/menu/main">
          <Text pl={10}>Edit Main Menu</Text>
        </Link>
        <Link href="/admin/userid/edit/menu/order">
          <Text pl={10}>Edit Order Menu</Text>
        </Link>
        <Link href='/admin/userid/edit/locations'>
          <Heading size="md">Locations</Heading>
        </Link>
        <Link href='/admin/userid/edit/locations'>
          <Text pl={10}>Edit Locations</Text>
        </Link>
        <Link href='/admin/userid/edit/adminRegister'>
          <Heading size="md">Registration</Heading>
        </Link>
        <Link href='/admin/userid/edit/adminRegister'>
          <Text pl={10}>Register Employee</Text>
        </Link>
      </Stack>
    </Box>
  );
};

export default AdminSideNav;

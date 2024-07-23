import React from 'react';
import {
  Stack,
  Box,
  Heading,
  Link,
  Text,
  Center
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import Image from 'next/image';

import { signOut } from 'next-auth/react';

const SideNav = ({ setCurrentView }) => {
  
  const handleSignOut = () => {
    signOut({ callbackUrl: '/employee/login' });
  };

  return (
    <Box
      position="fixed"
      bg="#A0B2AB"
      width="250px"
      height="100vh"
      p={5}
    >
      <Stack spacing={5}>
        <Link href="/employee/orders/incoming"  my={3}>
          <Center><Image src='/header-log.png' width={150} height={100} alt='logo'/></Center>
        </Link>
        <Heading size="md">Orders</Heading>
        <Link href="/employee/orders/incoming">
          <Text pl={10}>Incoming</Text>
        </Link>
        <Link href="/employee/orders/inProgress">
          <Text pl={10}>In Progress</Text>
        </Link>
        <Link href="/employee/orders/completed">
          <Text pl={10}>Completed</Text>
        </Link>
        <Heading size="md">Availability</Heading>
        <Link href='/employee/editMenu'>
          <Text pl={10}>Drinks</Text>
        </Link>
        <Link href='/employee/ingredients'>
          <Text pl={10}>Ingredients</Text>
        </Link>
        <Heading size="md">Account</Heading>
        <Link href='/employee/employeeAccount'>
          <Text pl={10}>Edit Info</Text>
        </Link>
        <Link href='#' onClick={handleSignOut}>
          <Text as='b' fontSize='lg'>Sign Out</Text>
        </Link>
      </Stack>
    </Box>
  );
};

export default SideNav;

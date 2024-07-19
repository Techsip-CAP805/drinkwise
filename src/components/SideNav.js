import React from 'react';
import {
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Stack,
  Box,
  Heading,
  Link,
  Text,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';

const SideNav = ({ setCurrentView }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Stack align="center" p={20} spacing={5}>
      <Link href='/employee/orders' textDecoration='underline'>
        <Heading size="xl">Orders</Heading>
        </Link>
        <Link onClick={() => setCurrentView("incoming")} textDecoration='underline'><Text as='b' fontSize='m'>Incoming</Text></Link>
        <Link onClick={() => setCurrentView("inProgress")} textDecoration='underline'><Text as='b' fontSize='m'>In Progress</Text></Link>
        <Link onClick={() => setCurrentView("completed")} textDecoration='underline'><Text as='b' fontSize='m'>Completed</Text></Link>
        <Heading size="xl">Menu</Heading>
        <Link href='/employee/editMenu' textDecoration='underline'><Text as='b' fontSize='m'>Edit Menu</Text></Link>
        <Link href='/employee/ingredients' textDecoration='underline'><Text as='b' fontSize='m'>Ingredients</Text></Link>
        <Heading size="xl">Account</Heading>
        <Link href='/employee/employeeAccount' textDecoration='underline'><Text as='b' fontSize='m'>Edit Info</Text></Link>
      </Stack>
    </>
  );
};

export default SideNav;

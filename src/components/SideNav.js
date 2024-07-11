
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

const SideNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label={isOpen ? 'Close' : 'Open'}
        icon={isOpen ? <ArrowBackIcon /> : <ArrowForwardIcon />}
        colorScheme='teal'
        onClick={isOpen ? onClose : onOpen}
        position='fixed'
        top='50%'
        left='0'
        transform='translateY(-50%)'
        zIndex={1}
        size="lg"
        borderRadius='0 50% 50% 0'
        height="50px"
      />
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <Stack align="center" p={20} spacing={5}>
              <Heading size="xl">Orders</Heading>
              <Link href='/employee/incomingOrders' textDecoration='underline'><Text as='b' fontSize='m'>Incoming</Text></Link>
              <Link href='/employee/inProgressOrders' textDecoration='underline'><Text as='b' fontSize='m'>In Progress</Text></Link>
              <Link href='/employee/completedOrders' textDecoration='underline'><Text as='b' fontSize='m'>Completed</Text></Link>
              <Heading size="xl">Menu</Heading>
              <Link href='/employee/editMenu' textDecoration='underline'><Text as='b' fontSize='m'>Edit Menu</Text></Link>
              <Link href='/employee/ingredients' textDecoration='underline'><Text as='b' fontSize='m'>Ingredients</Text></Link>
              <Heading size="xl">Account</Heading>
              <Link href='/employee/employeeAccount' textDecoration='underline'><Text as='b' fontSize='m'>Edit Info</Text></Link>


            </Stack>
          </DrawerBody>

        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideNav;
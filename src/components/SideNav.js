
import React from 'react';
import {
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Stack,
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
              <Heading size="2xl">Orders</Heading>
              <Link href='/incomingOrders' textDecoration='underline'><Text as='b' fontSize='lg'>Incoming</Text></Link>
              <Link href='/inProgressOrders' textDecoration='underline'><Text as='b' fontSize='lg'>In Progress</Text></Link>
              <Link href='/completedOrders' textDecoration='underline'><Text as='b' fontSize='lg'>Completed</Text></Link>
            </Stack>
          </DrawerBody>

        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideNav;
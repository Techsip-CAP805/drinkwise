import React, {useState, useEffect} from 'react';
import {
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Stack,
  Link,
  Text,
  List,
  ListItem,
  ListIcon,
  HStack,
  Box
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import { FaBook, FaClipboardList, FaCreditCard, FaMapMarkerAlt, FaGlobe, FaUser } from 'react-icons/fa';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';




const OrderSideNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [signedIn, setSignedIn] = useState(false);

  const {data: session} = useSession();
  console.log("something");

  // const validateSession = async() => {
  //   session ? setSignedIn(prevValue => !prevValue) : setSignedIn(prevValue => !prevValue) 
  // }

  useEffect(()=> {
    console.log('something else');
    session ? setSignedIn(true) : setSignedIn(false);
  },[signedIn])

  
  // user sign out
  const handleSignOut = () => {
    signOut({ callbackUrl: '/user/sign-in' });
  };


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
            <List spacing={4} pt={10} pl={5}>
              <ListItem>
                <ListIcon as={FaBook} color='teal.500' />
                <Link href='/catalogue'>
                  <Text as='b' fontSize='lg'>Catalogue</Text>
                </Link>
              </ListItem>
              <ListItem>
                <ListIcon as={FaClipboardList} color='teal.500' />
                <Link href='/orders'>
                  <Text as='b' fontSize='lg'>My Orders</Text>
                </Link>
              </ListItem>
              <ListItem>
                <ListIcon as={FaCreditCard} color='teal.500' />
                <Link href='/payment'>
                  <Text as='b' fontSize='lg'>Payment</Text>
                </Link>
              </ListItem>
              <ListItem>
                <ListIcon as={FaMapMarkerAlt} color='teal.500' />
                <Link href='/order/search-location'>
                  <Text as='b' fontSize='lg'>Change Location</Text>
                </Link>
              </ListItem>
              <ListItem >
                <HStack justfiy='flex-start'>
                  <ListIcon as={FaGlobe} color='teal.500' />
                  <Text as='b' fontSize='lg'>Language</Text>
                  <select>
                    <option value='en'>English</option>
                    <option value='fr'>French</option>
                    <option value='es'>Spanish</option>
                  </select>
                </HStack>
              </ListItem>
                  {!signedIn && (
                    <ListItem>
                    <ListIcon as={FaUser} color='teal.500' />
                    <Link href='/user/sign-in'>
                      <Text as='b' fontSize='lg'>Sign In</Text>
                    </Link>
                  </ListItem>
                  )}
                  {signedIn && (
                    <ListItem>
                    <ListIcon as={FaUser} color='teal.500' />
                    <Link href='#' onClick={handleSignOut}>
                      <Text as='b' fontSize='lg'>Sign Out</Text>
                    </Link>
                  </ListItem>
                  )}
            </List>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default OrderSideNav;

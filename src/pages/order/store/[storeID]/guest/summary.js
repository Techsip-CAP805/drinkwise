import React, { useState } from 'react';
import { Box, VStack, HStack, Text, Image, Divider, Button, Flex, useDisclosure } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useDrinkContext } from '../../../../../../context/drinkContext';
import Checkout from '@/components/Checkout'; // Import the new Checkout component

const OrderSummary = () => {
  const { cart, total } = useDrinkContext();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg='#bcc8c3' minH='100vh'>
      <Navbar />
      <Box maxW='container.lg' mx='auto' py={10} pt={32}>
        <VStack spacing={6} align='stretch'>
          <Text fontSize='2xl' fontWeight='bold' mb={4}>Order Summary</Text>
          {cart.map((item, index) => (
            <Box key={index} bg='white' p={6} borderRadius='md' boxShadow='lg'>
              <Flex direction={{ base: 'column', md: 'row' }} align='center'>
                <Image src={item.imagePath} alt={item.drinkName} boxSize='150px' borderRadius='md' />
                <VStack align='start' spacing={1} ml={{ base: 0, md: 6 }} mt={{ base: 4, md: 0 }}>
                  <Text fontSize='lg' fontWeight='bold'>{item.drinkName}</Text>
                  <HStack>
                    <Text>Quantity:</Text>
                    <Text fontWeight='bold'>{item.quantity}</Text>
                  </HStack>
                  <HStack>
                    <Text>Price:</Text>
                    <Text fontWeight='bold'>${item.basePrice.toFixed(2)} each</Text>
                  </HStack>
                  <HStack>
                    <Text>Total:</Text>
                    <Text fontWeight='bold'>${(item.basePrice * item.quantity).toFixed(2)}</Text>
                  </HStack>
                  <Text>Sugar Level: {item.selectedSugar}%</Text>
                  <Text>Ice Level: {item.selectedIce}%</Text>
                  <Text>Toppings: {item.selectedToppings.join(', ')}</Text>
                </VStack>
              </Flex>
            </Box>
          ))}
          <Divider />
          <HStack justify='space-between' w='full'>
            <Text fontSize='xl' fontWeight='bold'>Total:</Text>
            <Text fontSize='xl' fontWeight='bold'>${total.toFixed(2)}</Text>
          </HStack>
          <Button colorScheme='teal' size='lg' alignSelf='center' onClick={onOpen}>Proceed to Checkout</Button>
        </VStack>
      </Box>
      <Footer />
      <Checkout isOpen={isOpen} onClose={onClose} /> {/* Add Checkout modal */}
    </Box>
  );
};

export default OrderSummary;

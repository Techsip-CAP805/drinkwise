import React from 'react';
import { Box, VStack, HStack, Text, Image, Divider, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { useDrinkContext } from '../../../../../../context/drinkContext';
import Checkout from '@/components/Checkout';
import { useRouter } from 'next/router';

const OrderSummary = () => {
  const { cart, total } = useDrinkContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  return (
    <Box bg='#f0f4f8' minH='100vh' py={10} px={4}>
      <Box maxW='container.md' mx='auto' bg='white' borderRadius='lg' boxShadow='xl' p={8}>
        <Button colorScheme='teal' variant='link' mb={6} onClick={() => router.back()}>
          &larr; Back
        </Button>
        <Text fontSize='xl' fontWeight='bold' mb={6} textAlign='center'>Order Summary</Text>
        <VStack spacing={6} align='stretch'>
          {cart.map((item, index) => (
            <Box key={index} bg='#f9fafb' p={4} borderRadius='md' boxShadow='md'>
              <Flex direction={{ base: 'column', md: 'row' }} align='center'>
                <Image src={item.imagePath} alt={item.drinkName} boxSize='100px' borderRadius='md' />
                <VStack align='start' spacing={1} ml={{ base: 0, md: 4 }} mt={{ base: 4, md: 0 }} w='full'>
                  <Text fontSize='lg' fontWeight='bold'>{item.drinkName}</Text>
                  <HStack justify='space-between' w='full'>
                    <Text>Quantity:</Text>
                    <Text fontWeight='bold'>{item.quantity}</Text>
                  </HStack>
                  <HStack justify='space-between' w='full'>
                    <Text>Price:</Text>
                    <Text fontWeight='bold'>${item.basePrice.toFixed(2)} each</Text>
                  </HStack>
                  <HStack justify='space-between' w='full'>
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
            <Text fontSize='lg' fontWeight='bold'>Total:</Text>
            <Text fontSize='lg' fontWeight='bold'>${total.toFixed(2)}</Text>
          </HStack>
          <Button colorScheme='teal' size='lg' w='full' onClick={onOpen}>Proceed to Checkout</Button>
        </VStack>
      </Box>
      <Checkout isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default OrderSummary;

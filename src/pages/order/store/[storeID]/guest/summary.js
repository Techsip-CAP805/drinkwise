import React, { useEffect, useState } from 'react';
import { Box, VStack, HStack, Text, Image, Divider, Button, Flex, IconButton, Input, useDisclosure } from '@chakra-ui/react';
import { useDrinkContext } from '../../../../../../context/drinkContext';
import Checkout from '@/components/Checkout';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';

const OrderSummary = () => {
  const { cart, setCart } = useDrinkContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = cart.reduce((acc, item) => acc + item.basePrice * item.quantity, 0);
      setTotal(totalAmount);
    };

    calculateTotal();
  }, [cart]);

  const handleDelete = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedCart = cart.map((item, i) =>
      i === index ? { ...item, quantity: Math.max(1, parseInt(quantity)) || 1 } : item
    );
    setCart(updatedCart);
  };

  return (
    <Box bg='#f0f4f8' minH='100vh' py={10} px={4}>
      <Box maxW='container.md' mx='auto' bg='white' borderRadius='lg' boxShadow='xl' p={8}>
        <Button colorScheme='teal' variant='link' mb={6} onClick={() => router.back()}>
          &larr; Back
        </Button>
        <Text fontSize='2xl' fontWeight='bold' mb={6} textAlign='center'>Order Summary</Text>
        <VStack spacing={6} align='stretch'>
          {cart.map((item, index) => (
            <Box key={index} bg='#f9fafb' p={4} borderRadius='md' boxShadow='md'>
              <Flex direction={{ base: 'column', md: 'row' }} align='center'>
                <Image src={item.imagePath} alt={item.drinkName} boxSize='100px' borderRadius='md' />
                <VStack align='start' spacing={1} ml={{ base: 0, md: 4 }} mt={{ base: 4, md: 0 }} w='full'>
                  <Flex justifyContent="space-between" width="100%">
                    <Text fontSize='lg' fontWeight='bold'>{item.drinkName}</Text>
                    <IconButton
                      aria-label='Delete item'
                      icon={<CloseIcon />}
                      size='sm'
                      onClick={() => handleDelete(index)}
                    />
                  </Flex>
                  <HStack justify='space-between' w='full'>
                    <Text>Quantity:</Text>
                    <Input
                      type='number'
                      value={item.quantity}
                      min={1}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                      width='60px'
                    />
                  </HStack>
                  <Text>Price: ${item.basePrice.toFixed(2)} each</Text>
                  <Text>Total: ${(item.basePrice * item.quantity).toFixed(2)}</Text>
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

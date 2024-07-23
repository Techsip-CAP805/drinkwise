import React, { useState } from 'react';
import { Box, VStack, HStack, Text, Image, Divider, Button, Flex, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Select } from '@chakra-ui/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useDrinkContext } from '../../../../context/drinkContext';

const OrderSummary = () => {
  const { cart, total } = useDrinkContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [contactDetails, setContactDetails] = useState({ name: '', email: '', phone: '' });
  const [orderMethod, setOrderMethod] = useState('Pickup');
  const [timeChoice, setTimeChoice] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleCheckout = () => {
    onOpen();
  };

  const handlePlaceOrder = () => {
    // Logic to handle order placement
    onClose();
  };

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
          <Button colorScheme='teal' size='lg' alignSelf='center' onClick={handleCheckout}>Proceed to Checkout</Button>
        </VStack>
      </Box>
      <Footer />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Checkout</ModalHeader>
          <ModalBody>
            <VStack spacing={4}>
              <Box>
                <Text fontSize='lg' fontWeight='bold'>Contact</Text>
                <Input placeholder='First Name' value={contactDetails.name} onChange={(e) => setContactDetails({ ...contactDetails, name: e.target.value })} />
                <Input placeholder='Email' value={contactDetails.email} onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })} mt={2} />
                <Input placeholder='Telephone' value={contactDetails.phone} onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })} mt={2} />
              </Box>
              <Box>
                <Text fontSize='lg' fontWeight='bold'>Ordering Method</Text>
                <Select value={orderMethod} onChange={(e) => setOrderMethod(e.target.value)}>
                  <option value='Pickup'>Pickup</option>
                  <option value='Delivery'>Delivery</option>
                </Select>
              </Box>
              <Box>
                <Text fontSize='lg' fontWeight='bold'>Available Time Choice</Text>
                <Select value={timeChoice} onChange={(e) => setTimeChoice(e.target.value)}>
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={`${i + 1}:00 PM`}>{`${i + 1}:00 PM`}</option>
                  ))}
                </Select>
              </Box>
              <Box>
                <Text fontSize='lg' fontWeight='bold'>Payment Method</Text>
                <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value='Credit Card'>Credit Card</option>
                  <option value='Cash'>Cash</option>
                </Select>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='gray' mr={3} onClick={onClose}>Cancel</Button>
            <Button colorScheme='teal' onClick={handlePlaceOrder}>Place Order</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default OrderSummary;

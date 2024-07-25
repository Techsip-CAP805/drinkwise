import React, { useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast
} from '@chakra-ui/react';
import { useDrinkContext } from '../../context/drinkContext';

const Checkout = ({ isOpen, onClose }) => {
  const contactRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const orderingMethodRef = useRef();
  const timeChoiceRef = useRef();
  const paymentMethodRef = useRef();
  const { cart, setCart, setTotal } = useDrinkContext();
  const toast = useToast();

  const handlePlaceOrder = async () => {
    const contact = contactRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const orderingMethod = orderingMethodRef.current.value;
    const timeChoice = timeChoiceRef.current.value;
    const paymentMethod = paymentMethodRef.current.value;

    if (!contact || !email || !phone || !orderingMethod || !timeChoice || !paymentMethod) {
      toast({
        title: 'Error',
        description: 'All fields are required.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const orderDetails = {
      contact,
      email,
      phone,
      orderingMethod,
      timeChoice,
      paymentMethod,
      items: cart,
    };

    console.log('Order Details:', orderDetails);

    try {
      const response = await fetch('/api/guestCheckout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to place order');
      }

      const result = await response.json();
      console.log('Order placed successfully:', result);

      toast({
        title: 'Order placed!',
        description: '您的order送出去了',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Empty cart & clear total
      setCart([]);
      setTotal(0);
      onClose(); // Close the modal after placing the order
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: 'Error',
        description: 'Failed to place order. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Checkout</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Contact</FormLabel>
            <Input placeholder="Name" ref={contactRef} />
            <Input placeholder="Email" mt={2} ref={emailRef} />
            <Input placeholder="Phone" mt={2} ref={phoneRef} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Ordering Method</FormLabel>
            <Select ref={orderingMethodRef} defaultValue="Pickup">
              <option value="Pickup">Pickup</option>
              <option value="Delivery">Delivery</option>
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Available Time Choice</FormLabel>
            <Select ref={timeChoiceRef} defaultValue="1:00 PM">
              {Array.from({ length: 24 }, (_, i) => {
                const hour = (i + 11) % 12 + 1;
                const period = i < 12 ? 'AM' : 'PM';
                const time = `${hour}:00 ${period}`;
                return <option key={time} value={time}>{time}</option>;
              })}
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Payment Method</FormLabel>
            <Select ref={paymentMethodRef} defaultValue="Credit Card">
              <option value="Credit Card">Credit Card</option>
              <option value="Cash">Cash</option>
              <option value="PayPal">PayPal</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button colorScheme="teal" ml={3} onClick={handlePlaceOrder}>
            Place Order
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Checkout;

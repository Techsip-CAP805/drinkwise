import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { useDrinkContext } from '../../context/drinkContext';

const Checkout = ({ isOpen, onClose }) => {
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [orderingMethod, setOrderingMethod] = useState('Pickup');
  const [timeChoice, setTimeChoice] = useState('1:00 PM');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const {cart, setCart} = useDrinkContext();

  const handlePlaceOrder = () => {
    const orderDetails = {
      contact,
      email,
      phone,
      orderingMethod,
      timeChoice,
      paymentMethod,
      items: cart
    };

    console.log('Order Details:', orderDetails);

    //upload to db

    onClose(); // Close the modal after placing the order
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
            <Input placeholder="Name" value={contact} onChange={(e) => setContact(e.target.value)} />
            <Input placeholder="Email" mt={2} value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Phone" mt={2} value={phone} onChange={(e) => setPhone(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Ordering Method</FormLabel>
            <Select value={orderingMethod} onChange={(e) => setOrderingMethod(e.target.value)}>
              <option value="Pickup">Pickup</option>
              <option value="Delivery">Delivery</option>
            </Select>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Available Time Choice</FormLabel>
            <Select value={timeChoice} onChange={(e) => setTimeChoice(e.target.value)}>
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
            <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
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

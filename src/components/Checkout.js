import React, { useRef, useEffect, useState } from 'react';
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
import { useSession } from 'next-auth/react';

const Checkout = ({ isOpen, onClose }) => {
  const contactRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const orderingMethodRef = useRef();
  const timeChoiceRef = useRef();
  const paymentMethodRef = useRef();
  const { cart, dispatch, setTotal } = useDrinkContext();
  const toast = useToast();
  const { data: session } = useSession();

  const [emailValue, setEmailValue] = useState('');
  const [nameValue, setNameValue] = useState('');

  useEffect(() => {
    if (session) {
      setEmailValue(session.user.email);
      setNameValue(session.user.name);
    } else {
      setEmailValue('');
      setNameValue('');
    }
  }, [session]);

  const handlePlaceOrder = async () => {
    const contact = contactRef.current?.value;
    const email = emailRef.current?.value;
    const phone = phoneRef.current?.value;
    const orderingMethod = orderingMethodRef.current.value;
    const timeChoice = timeChoiceRef.current.value;
    const paymentMethod = paymentMethodRef.current.value;

    if (!session && (!contact || !email)) {
      toast({
        title: 'Error',
        description: 'Contact and email are required.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!orderingMethod || !timeChoice || !paymentMethod) {
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
      email: session ? undefined : email,
      order: {
        contact: session ? undefined : contact,
        phone: session ? undefined : phone,
        orderingMethod: orderingMethod,
        timeChoice: timeChoice,
        paymentMethod: paymentMethod,
        items: cart,
        orderStatus: "pending",
      }
    };

    console.log(session?.user);
    console.log('Order Details:', orderDetails);

    if (!session) {
      try {
        const response = await fetch("/api/addCustomerOrder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        });

        if (!response.ok) {
          throw new Error("Failed to place order");
        }

        const result = await response.json();
        console.log("Order placed successfully:", result);

        toast({
          title: "Order placed!",
          description: "Your order has been successfully placed.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        dispatch({ type: "LOAD_CART", payload: [] });
        setTotal(0);
        localStorage.removeItem("cart");

        onClose();
      } catch (error) {
        console.error("Error placing order:", error);
        toast({
          title: "Error",
          description: "Failed to place order. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      try {
        const customerRes = await fetch(`/api/getCustomerByID?id=${session.user.sub}`);
        if (!customerRes.ok) {
          throw new Error('Failed to fetch customer data');
        }
        const customerData = await customerRes.json();

        const updatedOrders = [
          ...customerData.orders,
          {
            orderingMethod,
            timeChoice,
            paymentMethod,
            items: cart,
            orderStatus: "pending",
          }
        ];

        const updateRes = await fetch(`/api/updateCustomer`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _id: session.user.sub,
            orders: updatedOrders,
          }),
        });

        if (!updateRes.ok) {
          throw new Error('Failed to update customer');
        }

        const result = await updateRes.json();
        console.log('Customer updated successfully:', result);

        toast({
          title: "Order placed!",
          description: "Your order has been successfully placed.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        dispatch({ type: "LOAD_CART", payload: [] });
        setTotal(0);
        localStorage.removeItem("cart");

        onClose();
      } catch (error) {
        console.error("Error updating customer:", error);
        toast({
          title: "Error",
          description: "Failed to place order. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Checkout</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {!session && (
            <FormControl mb={4}>
              <FormLabel>Contact</FormLabel>
              <Input placeholder="Name" ref={contactRef} value={nameValue} onChange={(e) => setNameValue(e.target.value)} />
              <Input placeholder="Email" mt={2} ref={emailRef} value={emailValue} onChange={(e) => setEmailValue(e.target.value)} />
              <Input placeholder="Phone" mt={2} ref={phoneRef} />
            </FormControl>
          )}
          {session && (
            <FormControl mb={4}>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Name" value={nameValue} isReadOnly />
              <FormLabel>Email</FormLabel>
              <Input placeholder="Email" mt={2} value={emailValue} isReadOnly />
              <FormLabel>Phone</FormLabel>
              <Input placeholder="Phone" mt={2} ref={phoneRef} />
            </FormControl>
          )}
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

import React, { useRef, useState } from 'react';
import { Box, Button, Input, Textarea, VStack, HStack, useToast, useBreakpointValue } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const [errors, setErrors] = useState({ name: false, phone: false, email: false, message: false });

  const toast = useToast();
  const stackDirection = useBreakpointValue({ base: 'column', md: 'row' });

  const validatePhone = (phone) => {
    const phoneRegex = /^(\+1\s?)?(\(?[2-9][0-9]{2}\)?[\s.-]?[2-9][0-9]{2}[\s.-]?[0-9]{4})$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = () => {
    const name = nameRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const message = messageRef.current.value.trim();

    const nameValid = name !== '';
    const phoneValid = validatePhone(phone);
    const emailValid = validateEmail(email);
    const messageValid = message !== '';

    setErrors({
      name: !nameValid,
      phone: !phoneValid,
      email: !emailValid,
      message: !messageValid,
    });

    if (nameValid && phoneValid && emailValid && messageValid) {
      const formData = { name, phone, email, message };
      // console.log(formData);

      nameRef.current.value = '';
      phoneRef.current.value = '';
      emailRef.current.value = '';
      messageRef.current.value = '';
      toast({
        description: "Message sent!",
        status: 'success',
        position: 'top',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        description: "Please fill in all fields correctly.",
        status: 'error',
        position: 'top',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Navbar />
      <Box display="flex" justifyContent="center" alignItems="center" bg='#bcc8c3' h="100vh">
        <VStack
          spacing={4}
          padding={6}
          boxShadow="md"
          bg="gray.50"
          borderRadius="md"
          border="1px"
          borderColor="gray.200"
          h={{ base: "auto", md: "60%" }}
          w={{ base: "90%", md: "60%" }}>
          <HStack spacing={4} w="100%" flexDirection={stackDirection}>
            <Box w="100%" border="1px" borderColor={errors.name ? 'red.500' : 'gray.200'} padding={2} borderRadius="md">
              <label>Name:</label>
              <Input type="text" ref={nameRef} borderColor={errors.name ? 'red.500' : 'gray.200'} />
            </Box>
            <Box w="100%" border="1px" borderColor={errors.phone ? 'red.500' : 'gray.200'} padding={2} borderRadius="md">
              <label>Phone:</label>
              <Input type="text" ref={phoneRef} borderColor={errors.phone ? 'red.500' : 'gray.200'} />
            </Box>
            <Box w="100%" border="1px" borderColor={errors.email ? 'red.500' : 'gray.200'} padding={2} borderRadius="md">
              <label>Email:</label>
              <Input type="text" ref={emailRef} borderColor={errors.email ? 'red.500' : 'gray.200'} />
            </Box>
          </HStack>
          <Box w="100%" h="100%" border="1px" borderColor={errors.message ? 'red.500' : 'gray.200'} padding={2} borderRadius="md">
            <label>Message:</label>
            <Textarea ref={messageRef} h="90%" resize="none" placeholder="Enter your message here..." borderColor={errors.message ? 'red.500' : 'gray.200'} />
          </Box>
          <Button _hover={{ bg: 'teal' }} onClick={handleSubmit} w={{ base: "100%", md: "20%" }} py={4} border="1px" borderColor="gray.200" borderRadius="md">
            Send my msg!
          </Button>
        </VStack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Contact;

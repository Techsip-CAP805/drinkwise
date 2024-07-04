import React, { useRef } from 'react';
import { Box, Button, Input, Textarea, VStack, HStack, useToast, useBreakpointValue } from '@chakra-ui/react';
import Navbar from '../components/Navbar';

const Contact = () => {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const toast = useToast();
  const stackDirection = useBreakpointValue({ base: 'column', md: 'row' });

  const handleSubmit = () => {
    const name = nameRef.current.value.trim();
    const phone = phoneRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const message = messageRef.current.value.trim();

    if (name && phone && email && message) {
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
        description: "Please fill in all fields.",
        status: 'error',
        position: 'top',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Navbar/>
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
            <Box w="100%" border="1px" borderColor="gray.200" padding={2} borderRadius="md">
              <label>Name:</label>
              <Input type="text" ref={nameRef} />
            </Box>
            <Box w="100%" border="1px" borderColor="gray.200" padding={2} borderRadius="md">
              <label>Phone:</label>
              <Input type="text" ref={phoneRef} />
            </Box>
            <Box w="100%" border="1px" borderColor="gray.200" padding={2} borderRadius="md">
              <label>Email:</label>
              <Input type="text" ref={emailRef} />
            </Box>
          </HStack>
          <Box w="100%" h="100%" border="1px" borderColor="gray.200" padding={2} borderRadius="md">
            <label>Message:</label>
            <Textarea ref={messageRef} h="90%" resize="none" placeholder="Enter your message here..." />
          </Box>
          <Button onClick={handleSubmit} w={{ base: "100%", md: "20%" }} py={4} border="1px" borderColor="gray.200" borderRadius="md" >
            Send my msg!
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Contact;

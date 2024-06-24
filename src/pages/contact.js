import React, { useRef } from 'react';
import { Box, Button, Input, Textarea, VStack, HStack } from '@chakra-ui/react';

const Contact = () => {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const handleSubmit = () => {
    console.log('Name:', nameRef.current.value);
    console.log('Phone:', phoneRef.current.value);
    console.log('Email:', emailRef.current.value);
    console.log('Message:', messageRef.current.value);
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" bg="gray.50" h="100vh">
      <VStack spacing={4} padding={6} boxShadow="md" bg="white" borderRadius="md" border="1px" borderColor="gray.200" h="80%">
        <HStack spacing={4} width="100%">
          <Box width="100%" border="1px" borderColor="gray.200" padding={2} borderRadius="md">
            <label>Name:</label>
            <Input type="text" ref={nameRef} />
          </Box>
          <Box width="100%" border="1px" borderColor="gray.200" padding={2} borderRadius="md">
            <label>Phone:</label>
            <Input type="text" ref={phoneRef} />
          </Box>
          <Box width="100%" border="1px" borderColor="gray.200" padding={2} borderRadius="md">
            <label>Email:</label>
            <Input type="text" ref={emailRef} />
          </Box>
        </HStack>
        <Box width="100%" h="100%" border="1px" borderColor="gray.200" padding={2} borderRadius="md">
          <label>Message:</label>
          <Textarea ref={messageRef} h="93%" resize="none" placeholder="Enter your message here..." />
        </Box>
        <Button onClick={handleSubmit} colorScheme="blue" width="20%">Send my msg!</Button>
      </VStack>
    </Box>
  );
};

export default Contact;
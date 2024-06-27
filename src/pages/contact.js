import React, { useRef } from 'react';
import { Box, Button, Input, Textarea, VStack, HStack, useToast } from '@chakra-ui/react';

const Contact = () => {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);

  const toast = useToast()
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
      })
    }
    return;
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" bg="gray.50" h="100vh">
      <VStack spacing={4} padding={6} boxShadow="md" bg="white" borderRadius="md" border="1px" borderColor="gray.200" h="60%" w="60%">
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
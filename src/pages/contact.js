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
    <Box>
      <VStack>
        <HStack>
          <Box>
            <label>Name:</label>
            <Input type="text" ref={nameRef} />
          </Box>
          <Box>
            <label>Phone:</label>
            <Input type="text" ref={phoneRef} />
          </Box>
          <Box>
            <label>Email:</label>
            <Input type="text" ref={emailRef} />
          </Box>
        </HStack>
        <Box>
          <label>Message:</label>
          <Textarea ref={messageRef} placeholder="Enter your message here..." />
        </Box>
        <Button onClick={handleSubmit} colorScheme="blue" width="100%">Send my msg!</Button>
      </VStack>
    </Box>
  );
};

export default Contact;

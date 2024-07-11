import React, {useState, useContext, useEffect} from 'react';
import {DrinkContext} from '../../context/drinkContext';
import { Box, Container, Flex, Input, Button, InputGroup, Stack, Link, FormControl, FormHelperText, InputRightElement, Avatar} from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
// import { FaUserAlt, FaLock } from "react-icons/fa";

const login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Box bg='#bcc8c3'>
    <Navbar/>
    <Container w='100vw' h='100vh' maxH='100vh' maxW='7xl'>
    {/* <Flex direction='row'  w='100%' h='100%' justify='center' align='center' pb={40}> */}
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
    //   backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        {/* <Avatar bg='tomato' /> */}
        <Box minW={{ base: "90%", md: "468px"}}>
        {/* <Box> */}
          <form >
            <Stack
              spacing={4}
              p="3rem"
              backgroundColor="#a0b2ab"
              boxShadow="md"
              borderRadius='2em'
            >
              <FormControl>
                <InputGroup>
                  <Input type="email" placeholder="you@domain.com" backgroundColor="whiteAlpha.900" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    backgroundColor="whiteAlpha.900" 
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link _hover={{color:'teal'}}>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={'2em'}
                type="submit"
                variant="solid"
                // colorScheme="teal"
                width="full"
                _hover={{bg:'teal'}}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        New to us?{" "}
        <Link href="#" _hover={{color:'teal'}}> Sign Up </Link>
      </Box>
    </Flex>
    <Footer/>
    </Container>
    </Box>


    // <Flex
    //   flexDirection="column"
    //   width="100wh"
    //   height="100vh"
    //   backgroundColor="gray.200"
    //   justifyContent="center"
    //   alignItems="center"
    // >
      
    // </Flex>
  )
}

export default login
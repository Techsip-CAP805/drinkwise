// pages/login.js
import { Flex, Box, Heading, Input, Button, Stack, Text, useToast } from '@chakra-ui/react';
import { useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useDrinkContext } from '../../context/drinkContext';
import Router from 'next/router';
import { signIn, getSession } from 'next-auth/react';
// import { useSession } from "next-auth/react"

export default function Login() {

  // const router = useRouter();
  // const pathname = usePathname();
  // const { employees, setEmployees } = useDrinkContext();
  // const userNameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const toast = useToast()

  // console.log(usePathname());

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      userType: 'employee' //use EMPLOYEE collection for admin login
    });
    const session = await getSession();

    if (session && session.user.role === 'admin') {
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      Router.push('/admin/userid/dashboard');
    } else {
      toast({
        title: 'Login Failed',
        description: result.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Flex minHeight="100vh" align="center" justify="center" bg="#bcc8c3">
      <Box
        p={10}
        maxWidth="600px"
        w={[300, 400]}
        borderWidth={1}
        borderRadius={12}
        boxShadow="lg"
        bg="white"
      >
        <Box textAlign="center">
          <Heading size="lg">Sign in</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={onSubmit}>
            <Stack spacing={4}>
              <Input
                type="text"
                isRequired={true}
                // ref={userNameRef}
                ref={emailRef}
                placeholder="Email"
                bg="gray.100"
                border={0}
                color="gray.800"
                _placeholder={{ color: 'gray.500' }}
              />
              <Input
                type="password"
                isRequired={true}
                ref={passwordRef}
                placeholder="Password"
                bg="gray.100"
                border={0}
                color="gray.800"
                _placeholder={{ color: 'gray.500' }}
              />
              <Button
                type="submit"
                bg="purple.400"
                color="white"
                _hover={{ bg: 'purple.500' }}
              >
                Continue
              </Button>
            </Stack>
          </form>
        </Box>
        <Link href='/admin/resetpass'><Text as='u'>Reset Password</Text></Link>
      </Box>
    </Flex>
  );
}

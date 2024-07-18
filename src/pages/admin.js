// pages/login.js
import { Flex, Box, Heading, Input, Button, Stack, Text, useToast} from '@chakra-ui/react';
import {useRef} from 'react';
import Link from 'next/link';
import {useRouter, usePathname} from 'next/navigation';
import { useDrinkContext} from '../../context/drinkContext';

export default function Login() {

  const router = useRouter();
  const pathname = usePathname();
  const userNameRef = useRef("");
  const passwordRef = useRef("");
  const {employees, setEmployees} = useDrinkContext();
  const toast = useToast()

  // console.log(usePathname());

  const onSubmit = (e) => {
    e.preventDefault();

    // console.log("username: ", userNameRef.current.value);
    // console.log("password: ", passwordRef.current.value);

    //check if username and password is empty
    if (userNameRef.current.value && passwordRef.current.value){
      //get list of employees that are admins
      const admins = employees.filter((employee)=> employee.isAdmin ==true);
      //go to employeeData and check for info
      const user = admins.filter((admin)=> admin.emailAddress == userNameRef.current.value && admin.password == passwordRef.current.value);

      //if matches, redirect to /admin/userid/dashboard
        if (user.length > 0){
          router.push(pathname + `/${user[0].emailAddress.split('@')[0]}/dashboard`);
        }else{
          toast({
            title: 'Did not find an acconut',
            description: "please check username and password",
            status: 'error',
            duration: 8000,
            isClosable: true,
          })
        }
    }
  }

  return (
    <Flex minHeight="100vh" align="center" justify="center" bg="#bcc8c3">
      <Box
        p={10}
        maxWidth="600px"
        w={[300,400]}
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
                ref={userNameRef}
                placeholder="Username"
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

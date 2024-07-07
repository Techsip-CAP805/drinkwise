// pages/login.js
import { Flex, Box, Heading, Input, Button, Stack } from '@chakra-ui/react';

export default function Login() {
  return (
    <Flex minHeight="100vh" align="center" justify="center" bg="#bcc8c3">
      <Box
        p={10}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={12}
        boxShadow="lg"
        bg="white"
      >
        <Box textAlign="center">
          <Heading size="lg">Sign in</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form>
            <Stack spacing={4}>
              <Input
                type="text"
                placeholder="Username"
                bg="gray.100"
                border={0}
                color="gray.800"
                _placeholder={{ color: 'gray.500' }}
              />
              <Input
                type="password"
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
        <Flex mt={4} justifyContent="space-around">
          <Button
            bg="white"
            border="1px"
            borderColor="gray.200"
            borderRadius="full"
            p={2}
          >
            F
          </Button>
          <Button
            bg="white"
            border="1px"
            borderColor="gray.200"
            borderRadius="full"
            p={2}
          >
            G
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}

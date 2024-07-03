import { VStack, Text, Flex, Box, Spacer, Center} from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Flex boxShadow='md' w='100%' px={8} py={4} bg='white.100'>
    <VStack>
    <Text>(416) 551-9666</Text>
    <Text>drinkwise@gmail.com</Text>
    <Text>420 Yonge St, North York, ON M2N5V5, Canada</Text>
    </VStack>
    <Spacer/>
    <Center w={24} h={24}>LOGO</Center>
    </Flex>
  )
}

export default Footer
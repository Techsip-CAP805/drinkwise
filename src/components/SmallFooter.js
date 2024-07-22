import React from 'react'
import {Text, Flex, useColorModeValue} from '@chakra-ui/react';

const SmallFooter = () => {
  return (
    <Flex bg={useColorModeValue('#ffffff40', '#20202380')} h='5vh' align='center' _hover={{cursor: 'default'}}>
        <Text fontSize={13} pl={4}>© All Rights Reserved By Drinkwise Canada</Text>
    </Flex>
  )
}

export default SmallFooter
import React from 'react'
import {Box, Text} from '@chakra-ui/react'
import Navbar from '@/components/Navbar'

const order = () => {
  return (
    <Box bg='#bcc8c3' w='100vw' h='100vh'>
    <Navbar/>
    <Text color='black'>Navbar</Text>
    </Box>
  )
}

export default order
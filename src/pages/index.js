import React, { useContext } from 'react';
import { DrinkContext } from '../../context/drinkContext';
import { Box, Container, Flex, Text, IconButton, VStack, HStack, Image, SimpleGrid} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Link from 'next/link';
import { ArrowDownIcon } from '@chakra-ui/icons';

const Home = () => {
  const { locations, setLocations } = useContext(DrinkContext);

  return (
    <Box bg='#bcc8c3' minH='100vh'>
      <Navbar />
      <Container w='100vw' minH='100vh' maxW='7xl' pt='10vh'>
        <Flex direction='column' w='100%' minH='100vh' justify='space-around' align='center'>
          <VStack h='100vh' justify='center'>
            <Link href='/recommendation'>
              <Box
                width="40vw"
                height="35vh"
                bg='gray.100'
                display='flex'
                direction='row'
                justifyContent='center'
                alignItems='center'
                borderRadius='20px'
              >
                <video autoPlay loop muted style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '20px' }}>
                  <source src='/KidsEnjoyingTea.mp4' type='video/mp4' />
                </video>
              </Box>
            </Link>
            <Text color='white' fontSize='2xl' as='em' my={14}>&quot;It&#39;s not a choice, It&#39;s a Lifestyle.&quot;</Text>
            <IconButton
              aria-label='Scroll down'
              icon={<ArrowDownIcon />}
              size='lg'
              borderRadius='full'
              bg='gray.200'
              _hover={{ bg: 'white' }}
              _active={{ bg: 'white' }}
              mt={4}
            />
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20} w='100%' minH='100vh' mt={8} px={8}>
            <VStack spacing={4} align='center' >
              <Image src='/holding_tea.jpg' alt='Story Image 1' borderRadius='md' boxSize='200px' />
              <Text fontSize='lg' fontWeight='bold'>Drinkwise&#39;s Story</Text>
              <Text  fontSize='sm' w='70%' noOfLines={[3, 5]}>The aesthetics of our shops provide a space for creativity and originality. We want our customers to feel Machimachi&#39;s imagination flowing through their body when they hold a Machimachi bottle.</Text>
            </VStack>
            <VStack spacing={4} align='center' >
              <Image src='/holding_tea.jpg' alt='Story Image 2' borderRadius='md' boxSize='200px' />
              <Text fontSize='lg' fontWeight='bold'>Our drink&#39;s Story</Text>
              <Text textAlign='center' w='70%' fontSize='sm'>Our vision is to create a variety of beverages that people will enjoy falling in love with everyday.</Text>
            </VStack>
            <VStack spacing={4} align='center'>
              <Image src='/holding_tea.jpg' alt='Story Image 3' borderRadius='md' boxSize='200px' />
              <Text fontSize='lg' fontWeight='bold'>Drinkwise&#39;s Mission</Text>
              <Text textAlign='center'w='70%' fontSize='sm' noOfLines={[3, 5]}>We are dedicated to using only high quality ingredients to produce our concept of tea drinking. Our Innovation & Research team is focused on creating the best recipes out of natural ingredients.</Text>
            </VStack>
            <VStack spacing={4} align='center'>
              <Image src='/holding_tea.jpg' alt='Story Image 4' borderRadius='md' boxSize='200px' />
              <Text fontSize='lg' fontWeight='bold'>More about Drinkwise</Text>
              <Text textAlign='center' w='70%' fontSize='sm' noOfLines={[2, 3, 5]}>We are an innovative, artsy, comfortable brand that offers natural, healthy, yet tasty handmade beverages and toppings. Our specialty drinks, unique bottles and modern stores deliver a pleasing experience of Asian tea culture. We hope to make MachiMachi a truly positive and friendly lifestyle in our community.</Text>
            </VStack>
          </SimpleGrid>
          <VStack w='100%' minH='100vh' pt={24}>
          <Text fontSize='xl' color='white' as='b'>First time and can&#39;t decide? </Text>
          <Text fontSize='lg'>Checkout our recommendation tool!</Text>
          <Box bg='#93a39d' h='40vh' w='100%' textAlign='center'>Carousel here</Box>
          <IconButton
              aria-label='Scroll down'
              icon={<ArrowDownIcon />}
              size='lg'
              borderRadius='full'
              bg='gray.200'
              _hover={{ bg: 'white' }}
              _active={{ bg: 'white' }}
              mt={4}
            />
          </VStack>
        </Flex>
      </Container>
      <Footer />
    </Box>
  );
};

export default Home;

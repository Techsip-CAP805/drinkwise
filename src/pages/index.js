import React, { useContext } from 'react';
import { DrinkContext } from '../../context/drinkContext';
import { Box, Container, Flex, Text, IconButton, VStack, HStack, Image, SimpleGrid, Divider} from '@chakra-ui/react';
import {Link as ScrollLink, animateScroll as scroll} from 'react-scroll';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from '@chakra-ui/next-js'
import { ArrowDownIcon } from '@chakra-ui/icons';
import {Fira_Sans} from 'next/font/google'

const fira = Fira_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: '400',
  style: 'italic'
})

const Home = () => {

  const { locations, setLocations } = useContext(DrinkContext);

  const scrollMore = (pixel) => {
    scroll.scrollMore(pixel); // Scrolling an additional 100px from the current scroll position.
  };
  
  return (
    <Box bg='#bcc8c3' minH='100vh'>
      <Navbar />
      <Container w='100vw' minH='100vh' maxW='7xl' pt='10vh'>
        <Flex direction='column' w='100%' minH='100vh' justify='space-around' align='center' position='relative'>
          <VStack h='100vh' justify='center'>
            <Link href='/recommendation'>
              <Box
                width={['80vw', '70vw','40vw']}
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
            <Text color='#374B43' fontSize={['19px','20px', '22px']} as='em' mt={6} mb={12} textAlign='center' _hover={{cursor: 'default'}}>&quot;It&#39;s not a choice, It&#39;s a Lifestyle.&quot;</Text>
            <ScrollLink 
              spy={true} 
              smooth={true} 
              offset={-70} 
              duration={500}
              activeClass='active'
              to="storySection"
            >
              <IconButton
                aria-label='Scroll down'
                icon={<ArrowDownIcon />}
                size='lg'
                borderRadius='full'
                bg='gray.200'
                _hover={{ bg: 'white' }}
                _active={{ bg: 'white' }}
                mt={3}
              />
            </ScrollLink>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={20} w='100%' minH='100vh' mt={8} px={8} className="element" name="storySection">
            <VStack spacing={4} align='center'>
              <Image src='/holding_tea.jpg' alt='Story Image 1' borderRadius='md' boxSize='200px' />
              <Text fontSize='lg' fontWeight='bold'>Drinkwise&#39;s Story</Text>
              <Text fontSize='sm' w='70%' noOfLines={[3, 5]}>The aesthetics of our shops provide a space for creativity and originality. We want our customers to feel Machimachi&#39;s imagination flowing through their body when they hold a Machimachi bottle.</Text>
            </VStack>
            <VStack spacing={4} align='center'>
              <Image src='/holding_tea.jpg' alt='Story Image 2' borderRadius='md' boxSize='200px' />
              <Text fontSize='lg' fontWeight='bold'>Our drink&#39;s Story</Text>
              <Text textAlign='center' w='70%' fontSize='sm'>Our vision is to create a variety of beverages that people will enjoy falling in love with everyday.</Text>
            </VStack>
            <VStack spacing={4} align='center'>
              <Image src='/holding_tea.jpg' alt='Story Image 3' borderRadius='md' boxSize='200px' />
              <Text fontSize='lg' fontWeight='bold'>Drinkwise&#39;s Mission</Text>
              <Text textAlign='center' w='70%' fontSize='sm' noOfLines={[3, 5]}>We are dedicated to using only high quality ingredients to produce our concept of tea drinking. Our Innovation & Research team is focused on creating the best recipes out of natural ingredients.</Text>
            </VStack>
            <VStack spacing={4} align='center'>
              <Image src='/holding_tea.jpg' alt='Story Image 4' borderRadius='md' boxSize='200px' />
              <Text fontSize='lg' fontWeight='bold'>More about Drinkwise</Text>
              <Text textAlign='center' w='70%' fontSize='sm' noOfLines={[2, 3, 5]}>We are an innovative, artsy, comfortable brand that offers natural, healthy, yet tasty handmade beverages and toppings. Our specialty drinks, unique bottles and modern stores deliver a pleasing experience of Asian tea culture. We hope to make MachiMachi a truly positive and friendly lifestyle in our community.</Text>
            </VStack>
          </SimpleGrid>
          <Box position='absolute' top='50%' left='50%' transform='translate(-50%, -50%)'> 
              <ScrollLink
                activeClass='active'
                to="carousel"
                spy={true} 
                smooth={true}
                offset={-100}
                duration={500} 
              >
                <IconButton
                  aria-label='Scroll down'
                  icon={<ArrowDownIcon />}
                  size='lg'
                  borderRadius='full'
                  bg='gray.200'
                  _hover={{ bg: 'white' }}
                  _active={{ bg: 'white' }}
                />
              </ScrollLink>
          </Box>
          <VStack w='100%' minH='100vh' pt={24} className="element" name="carousel">
            <Text fontSize='xl' as='b'>First time and can&#39;t decide?</Text>
            <Text fontSize='lg'>Checkout our recommendation tool!</Text>
            <Box bg='#93a39d' h='40vh' w='100%' textAlign='center' pt={40}>Carousel here</Box>
              <IconButton
                aria-label='Scroll down'
                icon={<ArrowDownIcon />}
                size='lg'
                borderRadius='full'
                bg='gray.200'
                _hover={{ bg: 'white' }}
                _active={{ bg: 'white' }}
                mt={4}
                onClick={()=> scroll.scrollToBottom()}
              />
          </VStack>
        </Flex>
      </Container>
      <Footer />
    </Box>
  );
  

};

export default Home;

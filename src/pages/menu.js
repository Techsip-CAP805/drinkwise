import React, {useState, useContext, useEffect} from 'react';
import {DrinkContext} from '../../context/drinkContext';
import { Box, Container, Text, HStack, VStack, Flex } from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const menu = () => {

  const {drinks, setDrinks} = useContext(DrinkContext);
  const categories = drinks.map(drinks => drinks.category);
  const uniqueCategories = [... new Set(categories)];
  console.log(uniqueCategories);
  const [menu, setMenu] = useState({});

  useEffect(() => {
    const catDrinks = uniqueCategories.reduce((acc, category) => {
      acc[category] = drinks.filter(item => item.category === category).slice(0, 5);
      return acc;
    }, {});
    setMenu(catDrinks);
  }, []);

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const chunks = chunkArray(uniqueCategories, 3);
  
  return (
    <Box bg='gray.200'>
    <Navbar/>
    <Container w='100vw' h='100vh' maxH='100vh' maxW='7xl'>
    <Flex direction='row'  w='100%' h='100%' justify='center' align='center' pb={40}>
      {/* <Box width={60} h={80} bg='gray.100' borderRadius='2rem' display='flex' direction='row' justifyContent='center' alignItems='center' _hover={{bg:'tomato'}}>
      <Text>.mp4 is inserted here</Text>
      </Box> */}
        <div className='menuPane'>
        {chunks.map((chunk, index) => (
          <HStack key={index} spacing='24px' align='flex-start'>
            {chunk.map((category) => (
              <VStack key={category} spacing='24px'>
                <Box className="menuCategory" marginTop={'24px'} padding={'30px'} bg='gray.100' borderRadius='2rem'>
                  <Text fontSize='md' fontWeight={700}>{category}</Text>
                  <table>
                    {menu[category] && menu[category].map((item) => (
                      <tr key={item.drinkId}>
                        <td>{item.drinkName}</td>
                        <td>{item.sizeOptions.map(size => size.size).join(',')}</td>
                        {/* <td>{item.basePrice.toFixed(2)} CAD</td> */}
                      </tr>
                    ))}
                  </table>
                </Box>
              </VStack>
            ))}
          </HStack>
        ))}
        </div>
    </Flex>
    <Footer/>
    </Container>
    </Box>
  )
}

export default menu
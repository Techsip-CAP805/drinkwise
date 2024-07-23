import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Text,
  Container,
  Flex,
  Input,
  SimpleGrid,
  Card,
  CardBody,
  Image,
  VStack,
  Divider,
  Heading,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { useDrinkContext } from '../../../../context/drinkContext';
import { Link } from '@chakra-ui/next-js';
import OrderSideNav from '@/components/OrderSideNav';
import { MdOutlineShoppingCart } from 'react-icons/md';

const LocationDetails = ({ locations, drinks }) => {
  const router = useRouter();
  const { storeID } = router.query;
  const { total } = useDrinkContext();
  const [location, setLocation] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (storeID && locations.length) {
      const foundLocation = locations.find((location) => location._id === storeID);
      setLocation(foundLocation);
    }
  }, [storeID, locations]);

  if (!location) {
    return <Text>Loading...</Text>;
  }

  const filteredDrinks = drinks.filter((drink) =>
    drink.drinkName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = Array.from(new Set(filteredDrinks.map((drink) => drink.category)));

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };

  return (
    <Box bg='#bcc8c3' minH='100vh'>
      <Flex>
        <OrderSideNav />
        <Container maxW='container.xl' py={10} pt={20}>
          <Flex direction='column' align='center' mb={6}>
            <Text fontSize='3xl' fontWeight='bold'>
              {location.branchName}
            </Text>
            <Text>{location.branchLocation.postalCode}</Text>
          </Flex>
          <Input
            placeholder='Search drinks...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            bg='white'
            mb={8}
          />
          <Tabs variant='enclosed' colorScheme='teal' defaultIndex={0}>
            <TabList>
              <Tab>All</Tab>
              {categories.map((category) => (
                <Tab key={category}>{category}</Tab>
              ))}
            </TabList>
            <TabPanels>
              <TabPanel>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
                  {filteredDrinks.map((drink) => (
                    <Link href={`/order/store/${storeID}/drink/${drink.drinkID}`} key={drink.drinkID}>
                      <Card bg='white' h='150px' borderRadius='md' boxShadow='sm'>
                        <CardBody display='flex' flexDirection='row' alignItems='center'>
                          <Image src={drink.imagePath} alt={drink.drinkName} boxSize='60px' borderRadius='full' mr={4} />
                          <VStack align='start' spacing={1}>
                            <Text fontSize='lg' fontWeight='bold'>
                              {drink.drinkName}
                            </Text>
                            <Text fontSize='md'>${drink.basePrice.toFixed(2)}</Text>
                          </VStack>
                        </CardBody>
                      </Card>
                    </Link>
                  ))}
                </SimpleGrid>
              </TabPanel>
              {categories.map((category) => (
                <TabPanel key={category}>
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5}>
                    {filteredDrinks
                      .filter((drink) => drink.category === category)
                      .map((drink) => (
                        <Link href={`/order/store/${storeID}/drink/${drink.drinkID}`} key={drink.drinkID}>
                          <Card bg='white' h='150px' borderRadius='md' boxShadow='sm'>
                            <CardBody display='flex' flexDirection='row' alignItems='center'>
                              <Image src={drink.imagePath} alt={drink.drinkName} boxSize='60px' borderRadius='full' mr={4} />
                              <VStack align='start' spacing={1}>
                                <Text fontSize='lg' fontWeight='bold'>
                                  {drink.drinkName}
                                </Text>
                                <Text fontSize='md'>${drink.basePrice.toFixed(2)}</Text>
                              </VStack>
                            </CardBody>
                          </Card>
                        </Link>
                      ))}
                  </SimpleGrid>
                </TabPanel>
              ))}
            </TabPanels>
          </Tabs>
        </Container>
      </Flex>
      <Link href='/order/guest/summary'>
        <Button
          position='fixed'
          bottom={14}
          right={40}
          p={6}
          colorScheme='teal'
          borderRadius='full'
          boxShadow='lg'
          onClick={handleAddToCart}
        >
          <MdOutlineShoppingCart />
          <Text as='abbr'>${total.toFixed(2)}</Text>
        </Button>
      </Link>
    </Box>
  );
};

export async function getServerSideProps(context) {

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/locations`);
  const locations = await res.json();
  const drinkRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orderMenu`);
  const drinks = await drinkRes.json();
  return {
    props: { locations, drinks },
  };
}

export default LocationDetails;

import React, { useContext } from 'react';
import { DrinkContext } from '../../context/drinkContext';
import { Box, Image, Text, Heading, Grid, GridItem, Card, CardBody, Stack, Divider, CardFooter, ButtonGroup, Button } from '@chakra-ui/react';

const Locations = () => {
const { locations } = useContext(DrinkContext);

return (
   
<Box bg="purple.200">
<header>
<Box display="flex" justifyContent="space-between" p="10px 20px" bg="gray.100">
<Text fontSize="2xl">LogoHere</Text>
<Box display="flex" gap="20px">
<Text>Menu</Text>
<Text>Locations</Text>
<Text>Order Online</Text>
<Text>Contact Us</Text>
</Box>
</Box>
</header>
<Box as="main" p="20px">
<Grid templateColumns="repeat(3, 1fr)" gap={6}>
{locations.map((location, index) => (
<GridItem key={index}>
  <Card maxW='sm'>
    <CardBody bg ="red.200">
      {location.image && (
        <Image
          src={location.image}
          alt={`${location.name} location`}
          borderRadius='lg'
          objectFit='cover'
          height='150px'
          width='100%'
        />
      )}
      <Stack mt='6' spacing='3'>
        <Heading size='md'>{location.name}</Heading>
        <Text>
          Operating Hours: {location.operatingHour}
        </Text>
        <Text color='red.600' fontSize='md'>
          Phone: {location.phoneNumber}
        </Text>
      </Stack>
    </CardBody>
    <Divider />
    <CardFooter>
      <ButtonGroup spacing='2'>
        <Button variant='solid' colorScheme='red'>
          View Details
        </Button>
        <Button variant='ghost' colorScheme='red'>
          Contact
        </Button>
      </ButtonGroup>
    </CardFooter>
  </Card>
</GridItem>
))}
</Grid>
</Box>
</Box>
);
}

export default Locations;

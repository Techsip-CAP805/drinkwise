import React from 'react';
import { useRouter } from 'next/router';
import { Box, Text, Image, Button, VStack, HStack, IconButton } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { useDrinkContext } from '../../../../context/drinkContext';

const DrinkDetails = () => {
  const router = useRouter();
  const { storeID, drinkID } = router.query;
  const { drinks, addToCart } = useDrinkContext();

  const drink = drinks.find(d => d.drinkID == drinkID);

  if (!drink) {
    return <Text>Loading...</Text>;
  }

  return (
    <Box bg='white' p={8} borderRadius='md' boxShadow='lg' maxW='md' mx='auto' mt={20}>
      <HStack justify='space-between'>
        <Text fontSize='2xl' fontWeight='bold'>{drink.drinkName}</Text>
        <IconButton icon={<CloseIcon />} onClick={() => router.back()} />
      </HStack>
      <Image src={drink.imagePath} alt={drink.drinkName} boxSize='200px' borderRadius='full' mx='auto' my={4} />
      <Text>{drink.description}</Text>
      <Text>Price: ${drink.basePrice.toFixed(2)}</Text>
      <Text>Category: {drink.category}</Text>
      <Text>Sugar Level Options:</Text>
      {drink.sugarLevelOptions.map((option, index) => (
        <Text key={index}>Sugar: {option.sugarLevel}%</Text>
      ))}
      <Text>Ice Level Options:</Text>
      {drink.iceLevelOptions.map((option, index) => (
        <Text key={index}>Ice: {option.iceLevel}%</Text>
      ))}
      <Button mt={4} colorScheme='teal' onClick={() => addToCart(drink)}>Add to Cart</Button>
    </Box>
  );
};

export default DrinkDetails;

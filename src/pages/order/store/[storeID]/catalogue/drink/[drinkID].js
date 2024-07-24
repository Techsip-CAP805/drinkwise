import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Text, Image, Button, VStack, HStack, IconButton, Radio, RadioGroup, Stack, Checkbox, CheckboxGroup, Divider, Flex } from '@chakra-ui/react';
import { CloseIcon, AddIcon, MinusIcon } from '@chakra-ui/icons';
import { useDrinkContext } from '../../../../../../../context/drinkContext';

const DrinkDetails = ({drinks}) => {
  const router = useRouter();
  const { storeID, drinkID } = router.query;
  const { addToCart, toppings, cart, total, setTotal } = useDrinkContext();
  const [quantity, setQuantity] = useState(1);
  const [selectedSugar, setSelectedSugar] = useState('');
  const [selectedIce, setSelectedIce] = useState('');
  const [selectedToppings, setSelectedToppings] = useState([]);


  const drink = drinks.find(d => d.drinkID == drinkID);

  // console.log(drink);
  if (!drink) {
    return <Text>Loading...</Text>;
  }

  const handleAddToCart = () => {
    const toppingsTotal = selectedToppings.reduce((total, topping) => total + parseFloat(topping.split(':')[1]), 0);
    const toppingsList = selectedToppings.map(topping => topping.split(':')[0]);
    addToCart(prevItems => [...prevItems, { ...drink, quantity, selectedSugar, selectedIce, selectedToppings: toppingsList, toppingsTotal }]);
    setTotal(prevTotal => prevTotal + (drink.basePrice + toppingsTotal) * quantity);
    router.back();
  };

  const handleToppingChange = (topping) => {
    setSelectedToppings(prevToppings => {
      const toppingName = topping.name;
      const toppingPrice = topping.price.toFixed(2);
      const toppingValue = `${toppingName}:${toppingPrice}`;
      if (prevToppings.includes(toppingValue)) {
        return prevToppings.filter(t => t !== toppingValue);
      } else {
        return [...prevToppings, toppingValue];
      }
    });
  };

  return (
    <Box bg='white' p={8} borderRadius='md' boxShadow='lg' maxW='md' mx='auto' mt={20}>
      <HStack justify='space-between'>
        <Text fontSize='2xl' fontWeight='bold'>{drink.drinkName}</Text>
        <IconButton icon={<CloseIcon />} onClick={() => router.back()} />
      </HStack>
      <Image src={drink.imagePath} alt={drink.drinkName} boxSize='200px' borderRadius='full' mx='auto' my={4} />
      <Text>{drink.description}</Text>
      <Text>Price: ${drink.basePrice.toFixed(2)}</Text>
      <Divider my={4} />

      <Text fontWeight='bold'>Sugar Level Options:</Text>
      <RadioGroup value={selectedSugar} onChange={setSelectedSugar}>
        <Stack direction='column'>
          {drink.sugarLevelOptions.map((option, index) => (
            <Radio key={index} value={option.sugarLevel.toString()}>Sugar: {option.sugarLevel}%</Radio>
          ))}
        </Stack>
      </RadioGroup>

      <Divider my={4} />

      <Text fontWeight='bold'>Ice Level Options:</Text>
      <RadioGroup value={selectedIce} onChange={setSelectedIce}>
        <Stack direction='column'>
          {drink.iceLevelOptions.map((option, index) => (
            <Radio key={index} value={option.iceLevel.toString()}>Ice: {option.iceLevel}%</Radio>
          ))}
        </Stack>
      </RadioGroup>

      <Divider my={4} />

      <Text fontWeight='bold'>Toppings:</Text>
      <CheckboxGroup value={selectedToppings}>
        <Stack direction='column'>
          {toppings.map((topping, index) => (
            <Checkbox key={index} value={`${topping.name}:${topping.price.toFixed(2)}`} onChange={() => handleToppingChange(topping)}>
              {topping.name} +${topping.price.toFixed(2)}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>

      <Divider my={4} />

      <Flex justifyContent='center' alignItems='center'>
        <IconButton icon={<MinusIcon />} onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} />
        <Text mx={4} fontSize='xl'>{quantity}</Text>
        <IconButton icon={<AddIcon />} onClick={() => setQuantity(quantity + 1)} />
      </Flex>

      <Button mt={4} colorScheme='teal' onClick={handleAddToCart} w='full'>
        Add {quantity} Item{quantity > 1 ? 's' : ''} to Cart
      </Button>
    </Box>
  );
};

export async function getServerSideProps(context) {

  const drinkRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orderMenu`);
  const drinks = await drinkRes.json();
  return {
    props: {drinks},
  };
}


export default DrinkDetails;

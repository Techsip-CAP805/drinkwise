import React, {useState, useContext, useEffect} from 'react';
import {DrinkContext} from '../../context/drinkContext';
import {Box, Container, Text} from '@chakra-ui/react';

const menu = () => {

  const {drinks, setDrinks} = useContext(DrinkContext);
  const categories = drinks.map(drinks => drinks.category);
  const uniqueCategories = [... new Set(categories)];
  console.log(uniqueCategories);
  const [menu, setMenu] = useState({});

  useEffect (() => {
    //store items by category, limit to 5 per category
    const catDrinks = uniqueCategories.reduce((acc, category) => {
      acc[category] = drinks.filter(item => item.category === category).slice(0,5);
      return acc;
    }, {});

    setMenu(catDrinks);
  }, []);

  

  return (
    <Box bg='white.100'>
    <Container centerContent p={6}>
    <Text fontSize='lg' fontWeight={700}>Menu</Text>
    <div className='menuPane'>
      {uniqueCategories.map((category) => (
        <div className = "menuCategory" key={category}>
          <Text fontSize='md' fontWeight={700}>{category}</Text>
          <table>
            {menu[category] && menu[category].map((item) => (
                <tr key={item.drinkId}>
                  <td>{item.drinkName}</td>
                  <td>{item.sizeOptions.map(size=> size.size).join(',')}</td>
                  {/* <td>{item.basePrice.toFixed(2)} CAD</td> */}
                </tr>
              ))}
          </table>
        </div>
      ))}
    </div>
    </Container>  
    </Box>

    // <Box bg='green.100'>
    //   <Container centerContent p={6}>
    //     <Text fontSize='lg' fontWeight={700}>Drinks</Text>
    //     {drinks.map((drinks, index)=> (
    //       <Box bg='blue.100'>
    //         <div key={index}>
    //         <h2>{drinks.drinkName}</h2>
    //         <p>{drinks.category}</p>
    //         <p>{drinks.basePrice}</p>
    //         </div>
    //       </Box>
    //     ))}
    //   </Container>
    // </Box>
  )
}

export default menu
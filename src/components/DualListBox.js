import React, { useEffect, useState } from "react";
import { Box, HStack, VStack, Text } from '@chakra-ui/react';

const DualListbox = ({ ingredients = [], selectedIngredients = [], onAddIngredient, onRemoveIngredient }) => {
    const [availableItems, setAvailableItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {
        const available = ingredients
            .filter(ingredient => !selectedIngredients.some(selected => selected.ingredientName === ingredient.ingredientName))
            .sort((a, b) => a.ingredientName.localeCompare(b.ingredientName));
        setAvailableItems(available);
        setSelectedItems(selectedIngredients);
    }, [ingredients, selectedIngredients]);

    return (
        <HStack spacing={4}>
            <VStack>
                <Text>Available</Text>
                <Box
                    borderWidth="1px"
                    borderRadius="md"
                    overflow="hidden"
                    width="170px"
                    height="200px"
                    p={2}
                    overflowY="scroll"
                    backgroundColor="#F3F1E8"
                    borderColor="#7B7875"
                >
                    {availableItems.map((item) => (
                        <Box
                            key={item.ingredientName}
                            padding={2}
                            borderBottomWidth="1px"
                            cursor="pointer"
                            _hover={{ backgroundColor: 'gray.100' }}
                            onClick={() => onAddIngredient(item)}
                        >
                            {item.ingredientName}
                        </Box>
                    ))}
                </Box>
            </VStack>
            <VStack>
                <Text>Selected</Text>
                <Box
                    borderWidth="1px"
                    borderRadius="md"
                    overflow="hidden"
                    width="170px"
                    height="200px"
                    p={2}
                    overflowY="scroll"
                    backgroundColor="#F3F1E8"
                    borderColor="#7B7875"
                >
                    {selectedItems.map((item) => (
                        <Box
                            key={item.ingredientName}
                            padding={2}
                            borderBottomWidth="1px"
                            cursor="pointer"
                            _hover={{ backgroundColor: 'gray.100' }}
                            onClick={() => onRemoveIngredient(item)}
                        >
                            {item.ingredientName}
                        </Box>
                    ))}
                </Box>
            </VStack>
        </HStack>
    );
};

export default DualListbox;

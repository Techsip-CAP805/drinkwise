import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input, 
    Image, 
    Box, 
    Spacer,
    HStack, 
    VStack, 
    Flex, 
    Select, 
    CheckboxGroup, 
    Checkbox, 
    Textarea
} from '@chakra-ui/react';

// Function to check if an image exists
const imageExists = async (url) => {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
};

const EditMenuModal = (props) => {
    const { drink, isOpen, onClose, setDrinkImage } = props;
    const [imageSrc, setImageSrc] = useState('/boba.jpeg'); // Default fallback image

    useEffect(() => {
        const fetchImage = async () => {
            if (drink?.imagePath) {
                const exists = await imageExists(drink.imagePath);
                setImageSrc(exists ? drink.imagePath : '/boba.jpeg');
            }
        };

        fetchImage();
    }, [drink]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent color="#372F2F" backgroundColor="#BCC8C3" maxWidth="550px">
                <ModalHeader>
                    <VStack>
                        <Image src={imageSrc} w={300} ratio={1} mt="50px" />
                        <Input
                            width="300px"
                            type="file"
                            accept="image/*"
                            mt={2}
                            borderColor="#BCC8C3"
                            _hover={{ borderColor: "#BCC8C3" }}
                            _focus={{ borderColor: "#BCC8C3" }}
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setDrinkImage(reader.result);
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </VStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <Flex align="center">
                            <FormLabel color="#372F2F">Name</FormLabel>
                            <Spacer />
                            <Input
                                defaultValue={drink?.drinkName}
                                backgroundColor="#F3F1E8"
                                borderColor="#7B7875"
                                width="320px"
                                _hover={{ borderColor: "#A0B2AB" }}
                                _focus={{ borderColor: "#A0B2AB" }}
                                isReadOnly
                            />
                        </Flex>
                    </FormControl>

                    <FormControl mt={4}>
                        <Flex align="center">
                            <FormLabel color="#372F2F">Description</FormLabel>
                            <Spacer />
                            <Input
                                defaultValue={drink?.description} 
                                backgroundColor="#F3F1E8"
                                borderColor="#7B7875"
                                width="320px"
                                _hover={{ borderColor: "#A0B2AB" }}
                                _focus={{ borderColor: "#A0B2AB" }}
                                isReadOnly
                            />
                        </Flex>
                    </FormControl>

                    <FormControl mt={4}>
                        <Flex align="center">
                            <FormLabel color="#372F2F">Category</FormLabel>
                            <Spacer />
                            <Input
                                defaultValue={drink?.category}
                                backgroundColor="#F3F1E8"
                                borderColor="#7B7875"
                                width="320px"
                                _hover={{ borderColor: "#A0B2AB" }}
                                _focus={{ borderColor: "#A0B2AB" }}
                                isReadOnly
                            />
                        </Flex>
                    </FormControl>

                    <FormControl mt={4}>
                        <Flex align="center">
                            <FormLabel color="#372F2F">Ingredients</FormLabel>
                            <Spacer />
                            <Textarea
                                defaultValue={drink?.ingredients?.map(ingredient => ingredient.ingredientName).join('\n')}
                                backgroundColor="#F3F1E8"
                                borderColor="#7B7875"
                                width="320px"
                                _hover={{ borderColor: "#A0B2AB" }}
                                _focus={{ borderColor: "#A0B2AB" }}
                                rows={3}
                                isReadOnly
                            />
                        </Flex>
                    </FormControl>

                    <FormControl mt={4}>
                        <Flex align="center">
                            <FormLabel color="#372F2F">Base Price</FormLabel>
                            <Spacer />
                            <Box pr="5px">$</Box>
                            <Input
                                defaultValue={drink?.basePrice}
                                backgroundColor="#F3F1E8"
                                borderColor="#7B7875"
                                width="80px"
                                _hover={{ borderColor: "#A0B2AB" }}
                                _focus={{ borderColor: "#A0B2AB" }}
                                isReadOnly
                            />
                        </Flex>
                    </FormControl>

                    <FormControl mt={4}>
                        <Flex align="center">
                            <FormLabel color="#372F2F">Size Options</FormLabel>
                            <Spacer />
                            <CheckboxGroup defaultValue={drink?.sizeOptions} width="320px">
                                <HStack spacing={4}>
                                    <Checkbox value="M" colorScheme="teal">M</Checkbox>
                                    <Checkbox value="L" colorScheme="teal">L</Checkbox>
                                </HStack>
                            </CheckboxGroup>
                        </Flex>
                    </FormControl>

                    <FormControl mt={4}>
                        <Flex align="center">
                            <FormLabel color="#372F2F">Ice Level Options</FormLabel>
                            <Spacer />
                            <CheckboxGroup defaultValue={drink?.iceLevelOptions}>
                                <Flex width="320px" justifyContent="flex-end">
                                    <VStack align="flex-end" spacing={4}>
                                        <Flex justifyContent="flex-end" width="100%">
                                            <Checkbox value="0%" colorScheme="teal">0%</Checkbox>
                                            <Checkbox pl="12px" value="25%" colorScheme="teal">25%</Checkbox>
                                            <Checkbox pl="12px" value="50%" colorScheme="teal">50%</Checkbox>
                                            <Checkbox pl="12px" value="75%" colorScheme="teal">75%</Checkbox>
                                            <Checkbox pl="12px" value="100%" colorScheme="teal">100%</Checkbox>
                                        </Flex>
                                    </VStack>
                                </Flex>
                            </CheckboxGroup>
                        </Flex>
                    </FormControl>

                    <FormControl mt={4}>
                        <Flex align="center">
                            <FormLabel color="#372F2F">Sugar Level Options</FormLabel>
                            <Spacer />
                            <CheckboxGroup defaultValue={drink?.sugarLevelOptions}>
                                <Flex width="320px" justifyContent="flex-end">
                                    <VStack align="flex-end" spacing={4}>
                                        <Flex justifyContent="flex-end" width="100%">
                                            <Checkbox value="0%" colorScheme="teal">0%</Checkbox>
                                            <Checkbox pl="12px" value="25%" colorScheme="teal">25%</Checkbox>
                                            <Checkbox pl="12px" value="50%" colorScheme="teal">50%</Checkbox>
                                            <Checkbox pl="12px" value="75%" colorScheme="teal">75%</Checkbox>
                                            <Checkbox pl="12px" value="100%" colorScheme="teal">100%</Checkbox>
                                        </Flex>
                                    </VStack>
                                </Flex>
                            </CheckboxGroup>
                        </Flex>
                    </FormControl>
                </ModalBody>
                <HStack>
                    <Spacer />
                    <ModalFooter>
                        <Button
                            onClick={onClose}
                            backgroundColor="#A0B2AB"
                            marginRight={3}
                            _hover={{ backgroundColor: "#8f9f9a" }}
                            color="#372F2F"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onClose}
                            backgroundColor="#A0B2AB"
                            _hover={{ backgroundColor: "#8f9f9a" }}
                            color="#372F2F"
                        >
                            Save
                        </Button>
                    </ModalFooter>
                </HStack>
            </ModalContent>
        </Modal>
    );
};

export default EditMenuModal;

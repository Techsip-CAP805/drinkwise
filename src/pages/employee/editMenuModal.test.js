import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EditMenuModal from './editMenuModal.js';
import '@testing-library/jest-dom';

// Mock props for testing
const mockDrink = {
    imagePath: 'mock-image-path.jpg',
    drinkName: 'Mock Drink',
    description: 'Mock description',
    category: 'Milk Tea',
    sizeOptions: ['M'],
    iceLevelOptions: ['50%'],
    sugarLevelOptions: ['50%'],
    ingredients: [{ ingredientName: 'Mock Ingredient 1' }, { ingredientName: 'Mock Ingredient 2' }],
    basePrice: '4.50'
};

describe('EditMenuModal Component', () => {
    // Test rendering
    it('renders correctly', () => {
        const { getByText, getByLabelText } = render(
            <EditMenuModal isOpen={true} onClose={() => {}} drink={mockDrink} />
        );

        // Check if modal elements are rendered
        expect(getByText('Name')).toBeInTheDocument();
        expect(getByLabelText('Name')).toHaveValue('Mock Drink');
        expect(getByText('Description')).toBeInTheDocument();
        expect(getByLabelText('Description')).toHaveValue('Mock description');
        // Add more checks for other elements as needed
    });

    it('Closes modal on click of Save', () => {
        const onClose = jest.fn();
        const { getByText } = render(
            <EditMenuModal isOpen={true} onClose={onClose} drink={mockDrink} />
        );

        const saveButton = getByText('Save');
        fireEvent.click(saveButton);

        expect(onClose).toHaveBeenCalled();
    });

    it('Closes modal on click of Cancel', () => {
        const onClose = jest.fn();
        const { getByText } = render(
            <EditMenuModal isOpen={true} onClose={onClose} drink={mockDrink} />
        );

        const cancelButton = getByText('Cancel');
        fireEvent.click(cancelButton);

        expect(onClose).toHaveBeenCalled();
    });
});

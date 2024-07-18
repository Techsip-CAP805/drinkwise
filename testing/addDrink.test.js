// __tests__/OrderMenu.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderMenu from '../src/pages/admin/[userID]/edit/menu/order';
import { useDrinkContext } from '../context/drinkContext';

// Mock the useDrinkContext
jest.mock('../context/drinkContext', () => ({
  useDrinkContext: jest.fn(),
}));

describe('OrderMenu', () => {
  const mockSetDrinks = jest.fn();

  beforeEach(() => {
    useDrinkContext.mockReturnValue({
      locations: [{ id: 1, name: 'Location 1' }],
      drinks: [
        { drinkID: 1, drinkName: 'Drink 1', description: 'Desc 1', basePrice: 1.00, imagePath: 'path1' },
        { drinkID: 2, drinkName: 'Drink 2', description: 'Desc 2', basePrice: 2.00, imagePath: 'path2' },
      ],
      setDrinks: mockSetDrinks,
    });
    mockSetDrinks.mockClear();
  });

  it('should add a new drink and update the length of drinks', () => {
    render(<OrderMenu />);

    // Verify initial length of drinks
    expect(useDrinkContext().drinks.length).toBe(2);

    // Simulate clicking the "Add to all" button to add a new drink
    const addButton = screen.getByText(/Add to all/i);
    fireEvent.click(addButton);

    // Assuming that the modal is open, we fill in the form
    fireEvent.change(screen.getByLabelText(/Drink Name/i), { target: { value: 'New Drink' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'New Description' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '3.00' } });
    fireEvent.change(screen.getByLabelText(/Image URL/i), { target: { value: 'newpath' } });

    // Click the save button in the modal
    const saveButton = screen.getByText(/Save/i);
    fireEvent.click(saveButton);

    // Assert that setDrinks was called with the updated list of drinks
    expect(mockSetDrinks).toHaveBeenCalledWith(expect.any(Function));

    // Mocking the result of the state update function
    const updatedDrinks = [
      { drinkID: 1, drinkName: 'Drink 1', description: 'Desc 1', basePrice: 1.00, imagePath: 'path1' },
      { drinkID: 2, drinkName: 'Drink 2', description: 'Desc 2', basePrice: 2.00, imagePath: 'path2' },
      { drinkID: 3, drinkName: 'New Drink', description: 'New Description', basePrice: 3.00, imagePath: 'newpath' },
    ];

    // Simulate state update
    const setDrinksFunction = mockSetDrinks.mock.calls[0][0];
    expect(setDrinksFunction(useDrinkContext().drinks)).toEqual(updatedDrinks);
  });
});






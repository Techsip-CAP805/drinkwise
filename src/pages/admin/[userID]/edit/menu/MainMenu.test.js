import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainMenu from './main'; 
import { DrinkContext } from '../../../../../../context/drinkContext';

const mockDrinks = [
  {
    drinkID: 1,
    drinkName: 'Coffee',
    description: 'Hot coffee',
    category: 'Beverage',
    basePrice: 2.5,
    imagePath: '/images/coffee.jpg',
    onMenu: true,
  }
];

const mockSetDrinks = jest.fn();

describe('MainMenu Component', () => {
  it('renders add new drink form', () => {
    render(
      <DrinkContext.Provider value={{ drinks: mockDrinks, setDrinks: mockSetDrinks }}>
        <MainMenu />
      </DrinkContext.Provider>
    );

    expect(screen.getByPlaceholderText('Drink Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Description')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Category')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Base Price')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Image Path')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add drink/i })).toBeInTheDocument();
  });

  it('adds a new drink', () => {
    render(
      <DrinkContext.Provider value={{ drinks: mockDrinks, setDrinks: mockSetDrinks }}>
        <MainMenu />
      </DrinkContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Drink Name'), { target: { value: 'Tea' } });
    fireEvent.change(screen.getByPlaceholderText('Description'), { target: { value: 'Hot tea' } });
    fireEvent.change(screen.getByPlaceholderText('Category'), { target: { value: 'Beverage' } });
    fireEvent.change(screen.getByPlaceholderText('Base Price'), { target: { value: '1.5' } });
    fireEvent.change(screen.getByPlaceholderText('Image Path'), { target: { value: '/images/tea.jpg' } });
    fireEvent.click(screen.getByRole('button', { name: /add drink/i }));

    expect(mockSetDrinks).toHaveBeenCalledWith([
      ...mockDrinks,
      {
        drinkID: 2,
        drinkName: 'Tea',
        description: 'Hot tea',
        category: 'Beverage',
        basePrice: 1.5,
        imagePath: '/images/tea.jpg',
        onMenu: true,
      }
    ]);
  });
});

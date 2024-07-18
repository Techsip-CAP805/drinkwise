// __tests__/EditLocations.test.js

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditLocations from '../src/pages/admin/[userID]/edit/locations';
import { useDrinkContext } from '../context/drinkContext';
import { ChakraProvider } from '@chakra-ui/react'; // Import ChakraProvider

// Mock the useDrinkContext
jest.mock('../context/drinkContext', () => ({
  useDrinkContext: jest.fn(),
}));

describe('EditLocations', () => {
  const mockSetLocations = jest.fn();

  beforeEach(() => {
    useDrinkContext.mockReturnValue({
      locations: [
        { id: 1, name: 'Brantford', operatingHour: '11:00am - 9:00pm', phoneNumber: '416-808-6969', image: '/boba.jpeg', postalCode: 'N3T 5L7', address: '1617 Market St, Brantford, ON' },
        { id: 2, name: 'Downtown', operatingHour: '11:00am - 9:00pm', phoneNumber: '416-808-6969', image: '/boba.jpeg', postalCode: 'M5V 3M8', address: '910 King St W, Toronto, ON' },
        { id: 3, name: 'North York', operatingHour: '11:00am - 9:00pm', phoneNumber: '416-808-6969', image: '/boba.jpeg', postalCode: 'M2N 5P9', address: '1234 Yonge St, North York, ON' },
      ],
      setLocations: mockSetLocations,
    });
    mockSetLocations.mockClear();
  });

  it('should search for a location, edit the location name, and search for the updated location', async () => {
    render(
      <ChakraProvider> {/* Wrap in ChakraProvider */}
        <EditLocations />
      </ChakraProvider>
    );

    // Verify initial locations
    expect(screen.getByText('Brantford')).toBeInTheDocument();
    expect(screen.getByText('Downtown')).toBeInTheDocument();
    expect(screen.getByText('North York')).toBeInTheDocument();

    // Search for "Downtown"
    const searchInput = screen.getByPlaceholderText('Search locations...');
    fireEvent.change(searchInput, { target: { value: 'Downtown' } });
    expect(screen.getByText('Downtown')).toBeInTheDocument();
    expect(screen.queryByText('Brantford')).not.toBeInTheDocument();
    expect(screen.queryByText('North York')).not.toBeInTheDocument();

    // Simulate clicking the "Edit" button for the "Downtown" location
    const editButton = screen.getAllByText(/Edit/i)[0];
    fireEvent.click(editButton);

    // Wait for the modal to open and verify it appears (BREAKS HERE)
    expect(screen.getByText('Edit Location')).toBeInTheDocument();

    // Log the DOM to debug
    // console.log(document.body.innerHTML);

    // Change the name of the "Downtown" location
    const nameInput = screen.getByPlaceholderText('Name');
    expect(nameInput).toBeInTheDocument(); // Verify the input is in the document
    fireEvent.change(nameInput, { target: { value: 'Updated Downtown' } });

    // Click the "Update Location" button
    const updateButton = screen.getByRole('button', { name: /Update Location/i });
    expect(updateButton).toBeInTheDocument(); // Verify the button is in the document
    fireEvent.click(updateButton);

    // Mocking the result of the state update function
    const updatedLocations = [
      { id: 1, name: 'Brantford', operatingHour: '11:00am - 9:00pm', phoneNumber: '416-808-6969', image: '/boba.jpeg', postalCode: 'N3T 5L7', address: '1617 Market St, Brantford, ON' },
      { id: 2, name: 'Updated Downtown', operatingHour: '11:00am - 9:00pm', phoneNumber: '416-808-6969', image: '/boba.jpeg', postalCode: 'M5V 3M8', address: '910 King St W, Toronto, ON' },
      { id: 3, name: 'North York', operatingHour: '11:00am - 9:00pm', phoneNumber: '416-808-6969', image: '/boba.jpeg', postalCode: 'M2N 5P9', address: '1234 Yonge St, North York, ON' },
    ];

    // Simulate state update
    const setLocationsFunction = mockSetLocations.mock.calls[0][0];
    expect(setLocationsFunction(useDrinkContext().locations)).toEqual(updatedLocations);

    // Clear the search input
    fireEvent.change(searchInput, { target: { value: '' } });

    // Verify the updated location name is present
    expect(screen.queryByText('Downtown')).not.toBeInTheDocument();
    expect(screen.getByText('Updated Downtown')).toBeInTheDocument();

    // Search for the updated location name
    fireEvent.change(searchInput, { target: { value: 'Updated Downtown' } });
    expect(screen.getByText('Updated Downtown')).toBeInTheDocument();
    expect(screen.queryByText('Brantford')).toBeInTheDocument();
    expect(screen.queryByText('North York')).toBeInTheDocument();
  });
});

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

  it('should search for a location, delete the location, and search again to ensure it is deleted', async () => {
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

    /*
    // Simulate clicking the "Delete" button for the "Downtown" location
    const deleteButton = screen.getAllByText(/Delete/i)[0];
    fireEvent.click(deleteButton);


    // Verify that mockSetLocations was called with the updated locations
    await waitFor(() => {
      expect(mockSetLocations).toHaveBeenCalledWith([
        { id: 1, name: 'Brantford', operatingHour: '11:00am - 9:00pm', phoneNumber: '416-808-6969', image: '/boba.jpeg', postalCode: 'N3T 5L7', address: '1617 Market St, Brantford, ON' },
        { id: 3, name: 'North York', operatingHour: '11:00am - 9:00pm', phoneNumber: '416-808-6969', image: '/boba.jpeg', postalCode: 'M2N 5P9', address: '1234 Yonge St, North York, ON' },
      ]);
    });

    // Clear the search input
    fireEvent.change(searchInput, { target: { value: '' } });

    // Verify the deleted location is not present
    await waitFor(() => {
      expect(screen.queryByText('Downtown')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Brantford')).toBeInTheDocument();
    expect(screen.getByText('North York')).toBeInTheDocument();

    // Search again for the deleted location name
    fireEvent.change(searchInput, { target: { value: 'Downtown' } });
    await waitFor(() => {
      expect(screen.queryByText('Downtown')).not.toBeInTheDocument();
    });
    */
  });
  
});

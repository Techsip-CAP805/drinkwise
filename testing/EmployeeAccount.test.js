import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Ensure this is imported to use the custom matchers
import EmployeeAccount from '../src/pages/employee/employeeAccount';
import employees from '../data/employeeData.json';

jest.mock('../data/employeeData.json', () => [
  {
    "employeeID": 1,
    "firstName": "Jane",
    "lastName": "Doe",
    "branchName": "Downtown",
    "SIN": 123456789,
    "isAdmin": true,
    "emailAddress": "jane@example.com",
    "password": "hashedpassword456"
  }
]);

test('renders employee form fields', () => {
  render(<EmployeeAccount />);
  
  expect(screen.getByPlaceholderText('Enter Employee ID')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /fetch data/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
});

test('fetches and displays employee data', async () => {
  render(<EmployeeAccount />);
  
  fireEvent.change(screen.getByPlaceholderText('Enter Employee ID'), { target: { value: '1' } });
  fireEvent.click(screen.getByRole('button', { name: /fetch data/i }));

  expect(await screen.findByText(/first name: jane/i)).toBeInTheDocument();
  expect(await screen.findByText(/last name: doe/i)).toBeInTheDocument();
  expect(await screen.findByText(/branch name: downtown/i)).toBeInTheDocument();
  expect(await screen.findByText(/sin: 123456789/i)).toBeInTheDocument();
  expect(await screen.findByText(/email: jane@example.com/i)).toBeInTheDocument();
});

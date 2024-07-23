import React from 'react';
import {
    render
    , screen
    , fireEvent
} from '@testing-library/react';
import LoginPage from '../src/pages/employee/login.js';
import {
    ChakraProvider
    , useToast
} from '@chakra-ui/react';
import '@testing-library/jest-dom';

jest.mock('@chakra-ui/react', () => {
    const originalChakra = jest.requireActual('@chakra-ui/react');
    return {
        ...originalChakra,
        useToast: jest.fn(),
    };
});

describe('Employee Login Page', () => {
    const mockToast = jest.fn();
    beforeEach(() => {
        useToast.mockReturnValue(mockToast);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Sucessful Page Render', () => {
        render(
            <ChakraProvider>
                <LoginPage />
            </ChakraProvider>
        );
        expect(screen.getByText(/Employee Login/i)).toBeInTheDocument();
    });

    // it('Exclude SideNav on Login Page', () => {
    //     render(
    //         <ChakraProvider>
    //             <LoginPage />
    //         </ChakraProvider>
    //     );

    //     // expect(screen.getByText(/Contact Us/i)).toBeInTheDocument();
    //     expect(screen.getByText(/Edit Menu/i)).toBeInTheDocument();
    //     // expect(screen.getByText(/Footer/i)).toBeInTheDocument();

    // });

    it('Successful Login Prompt', () => {
        render(
            <ChakraProvider>
                <LoginPage />
            </ChakraProvider>
        );

        fireEvent.change(screen.getByPlaceholderText(/Email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: 'password' },
        });

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        expect(mockToast).toHaveBeenCalledWith({
            title: 'Login successful.',
            description: "You have successfully logged in.",
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    });

    it('Invalid Credentials Prompt', () => {
        render(
            <ChakraProvider>
                <LoginPage />
            </ChakraProvider>
        );

        fireEvent.change(screen.getByPlaceholderText(/Email/i), {
            target: { value: 'invalid@email.com' },
        });
        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: 'wrongpassword' },
        });

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        expect(mockToast).toHaveBeenCalledWith({
            title: 'Login failed.',
            description: "Invalid email or password.",
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    });

    it('Empty Email Field', () => {
        render(
            <ChakraProvider>
                <LoginPage />
            </ChakraProvider>
        );

        fireEvent.change(screen.getByPlaceholderText(/Password/i), {
            target: { value: 'wrongpassword' },
        });

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        expect(mockToast).toHaveBeenCalledWith({
            title: 'Login failed.',
            description: "Email field is required.",
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    });

    it('Empty Password Field', () => {
        render(
            <ChakraProvider>
                <LoginPage />
            </ChakraProvider>
        );

        fireEvent.change(screen.getByPlaceholderText(/Email/i), {
            target: { value: 'test@example.com' },
        });

        fireEvent.click(screen.getByRole('button', { name: /Login/i }));

        expect(mockToast).toHaveBeenCalledWith({
            title: 'Login failed.',
            description: "Password field is required.",
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    });
});
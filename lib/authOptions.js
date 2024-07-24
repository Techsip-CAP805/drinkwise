// lib/authOptions.js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from './mongodb';
import Customer from '../model/customerModel';
import Employee from '../model/employeeModel';
import bcrypt from 'bcrypt';

export const authOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                userType: { label: "User Type", type: "text" }
            },
            async authorize(credentials) {
                await connectToDatabase();

                let user;
                if (credentials.userType === 'customer') {
                    user = await Customer.findOne({ emailAddress: credentials.email }).exec();
                } else if (credentials.userType === 'employee' || credentials.userType === 'admin') {
                    user = await Employee.findOne({ emailAddress: credentials.email }).exec();
                } else {
                    return null;
                }

                if (user && await bcrypt.compare(credentials.password, user.password)) {
                    if (credentials.userType === 'employee' || credentials.userType === 'admin') {
                        return { id: user._id, email: user.emailAddress, role: user.role, branchName: user.branchName };
                    } else {
                        return { id: user._id, email: user.emailAddress, role: user.role };
                    }
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
                if (user.branchName) {
                    token.branchName = user.branchName;
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },
};

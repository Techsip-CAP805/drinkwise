
// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectToDatabase } from '../../../../lib/mongodb';
import Customer from '../../../../model/customerModel';
import Employee from '../../../../model/employeeModel';
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
                        return { id: user._id, email: user.emailAddress, role: user.role, branchName: user.branchName, employeeID: user.employeeID};
                    } else {
                        return { id: user._id, email: user.emailAddress, role: user.role, employeeID: user.employeeID };
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
        maxAge: 7 * 24 * 60 * 60, // 7 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    jwt: {
        maxAge: 7 * 24 * 60 * 60, // 7 days
        secret: process.env.NEXTAUTH_SECRET,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id;
                token.employeeID = user.employeeID;
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

export default NextAuth(authOptions);

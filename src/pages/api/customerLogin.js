// // pages/api/customerLogin.js
// import bcrypt from 'bcrypt';
// import Customer from '../../../model/customerModel';
// import { connectToDatabase } from '../../../lib/mongodb';
// // import cookie from 'cookie';

// export default async function handler(req, res) {
//   await connectToDatabase();

//   if (req.method === 'POST') {
//     const { emailAddress, password } = req.body;

//     try {
//       const customer = await Customer.findOne({ emailAddress }).exec();
      
//       if (customer && await bcrypt.compare(password, customer.password)) {
//         // Password Matching Successful

//         // Set cookie with a simple token
//         // res.setHeader('Set-Cookie', cookie.serialize('token', 'your-generated-token', {
//         //   httpOnly: true,
//         //   secure: process.env.NODE_ENV === 'production', // Set to true in production
//         //   maxAge: 60 * 60 * 24 * 7, // 7 days
//         //   path: '/',
//         // }));

//         res.status(200).json({ message: 'Login successful' });
//       } else {
//         // Password mismatch or user does not exist
//         res.status(401).json({ error: 'Invalid credentials' });
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       res.status(500).json({ error: 'Something went wrong' });
//     }
//   } else {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

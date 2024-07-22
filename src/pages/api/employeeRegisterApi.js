// pages/api/employeeRegisterApi.js
import { connectToDatabase } from '../../../lib/mongodb';
import Employee from '../../../model/employeeModel';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { employeeID, firstName, lastName, branchName, emailAddress, password } = req.body;

    // Check if the email already exists
    const existingEmployee = await Employee.findOne({ emailAddress }).exec();
    if (existingEmployee) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new employee
    const newEmployee = new Employee({
      employeeID,
      firstName,
      lastName,
      branchName,
      emailAddress,
      password: hashedPassword,
    });

    try {
      const savedEmployee = await newEmployee.save();
      res.status(201).json({ message: 'Employee registered successfully', employee: savedEmployee });
    } catch (error) {
      console.error('Error registering employee:', error);
      res.status(500).json({ error: 'Failed to register employee' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import { connectToDatabase } from '../../../lib/mongodb';
import Employee from '../../../model/employeeModel';

export default async function handler(req, res) {
  await connectToDatabase();

  switch (req.method) {
    case 'GET':
      try {
        const { employeeID } = req.query;
        const employee = await Employee.findOne({ employeeID: parseInt(employeeID) });
        if (!employee) {
          res.status(404).json({ error: 'Employee not found' });
          return;
        }
        res.status(200).json(employee);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).json({ error: 'Failed to fetch employee data' });
      }
      break;

    case 'PUT':
      try {
        const { employeeID } = req.query;
        const updatedData = req.body;
        const employee = await Employee.findOneAndUpdate({ employeeID: parseInt(employeeID) }, updatedData, { new: true });
        if (!employee) {
          res.status(404).json({ error: 'Employee not found' });
          return;
        }
        res.status(200).json(employee);
      } catch (error) {
        console.error('Error updating employee data:', error);
        res.status(500).json({ error: 'Failed to update employee data' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

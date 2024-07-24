// pages/api/locations.js
import { connectToDatabase } from '../../../lib/mongodb';
import Location from '../../../model/locationModel';
import Employee from '../../../model/employeeModel';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../../../lib/authOptions';
import { withApiAuth } from '../../../lib/apiAuth';

// export default async function handler(req, res) {
const handler = async (req, res) => {
  await connectToDatabase();

  try {
    // Fetch the session directly
    // const session = await getServerSession(req, res, authOptions);

    // console.log("Session:", session); // Log session to verify

    // Check if session exists and if branchName is present
    // if (!session || !session.user || !session.user.branchName) {
    //   return res.status(401).json({ error: 'Unauthorized or branchName not available in session' });
    // }

    // Handle GET requests
    if (req.method === 'GET') {
      // Retrieve branchName from query parameters
      const { email } = req.query;

      // Validate that branchName is provided
      if (!email) {
        return res.status(400).json({ error: 'Branch name is required' });
      }

      const employee = await Employee.find({ emailAddress: email }).exec();
      const userBranch = employee[0].branchName;

      // Use the parameter in the database query
      const currentBranch = await Location.find({ branchName: userBranch }).exec();
      // console.log(currentBranch);
      // console.log("BRAAAAAAAAAAAAAAAAAAANCH");
      // console.log(currentBranch);
      res.status(200).json(currentBranch);
    } else {
      // Handle unsupported methods
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Error fetching current branch:', error);
    res.status(500).json({ error: 'Failed to fetch current branch' });
  }
}

//auth
export default withApiAuth(['employee', 'admin'], handler);
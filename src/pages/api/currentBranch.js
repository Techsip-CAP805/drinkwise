// pages/api/locations.js
import { connectToDatabase } from '../../../lib/mongodb';
import Location from '../../../model/locationModel';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      console.log("try");
      const currentBranch = await Location.find({branchName: "Unionville Markham"}).exec();
      console.log("Current Employee Branch: " + currentBranch);
      res.status(200).json(currentBranch);
    } catch (error) {
      console.error('Error fetching current branch:', error);
      res.status(500).json({ error: 'Failed to fetch current branch' });
    }
  } else {
    console.log("try another");
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

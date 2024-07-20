// pages/api/editLocations/[id].js
import { connectToDatabase } from '../../../../lib/mongodb';
import Location from '../../../../model/locationModel';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await connectToDatabase();

  switch (method) {
    case 'PUT':
      try {
        const location = await Location.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!location) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: location });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    case 'DELETE':
      try {
        const deletedLocation = await Location.deleteOne({ _id: id });
        if (!deletedLocation) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error });
      }
      break;
    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
      break;
  }
}

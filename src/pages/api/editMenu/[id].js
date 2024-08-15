import { connectToDatabase } from '../../../../lib/mongodb';
import Drink from '../../../../model/menuModel';

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  await connectToDatabase();

  switch (method) {
    case 'GET':
      try {
        const drink = await Drink.findById(id);
        if (!drink) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: drink });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const drink = await Drink.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!drink) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: drink });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'DELETE':
      try {
        const deletedDrink = await Drink.deleteOne({ _id: id });
        if (!deletedDrink) {
          return res.status(404).json({ success: false });
        }
        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}

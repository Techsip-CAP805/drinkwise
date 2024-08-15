// pages/api/editLocations/index.js
import { connectToDatabase } from '../../../../lib/mongodb';
import Location from '../../../../model/locationModel';

export default async function handler(req, res) {
    const { method } = req;

    await connectToDatabase();

    switch (method) {
        case 'GET':
            try {
                const locations = await Location.find({});
                res.status(200).json({ success: true, data: locations });
            } catch (error) {
                res.status(400).json({ success: false, error });
            }
            break;
        case 'POST':

            const { branchName, address, postalCode, phoneNumber, operatingHour, imagePath } = req.body;
            const newLocation = new Location({

                branchName: branchName,
                branchLocation: {
                    addressLine1: address,
                    addressLine2: '',
                    city: '',
                    province: '',
                    postalCode: postalCode,
                },
                contactNumber: phoneNumber,
                schedule: operatingHour,
                imagePath: imagePath,
                unavailableDrinks: [],
                unavailableIngredients: [],
            });
            // try {
            //     const location = await Location.create(req.body);
            //     res.status(201).json({ success: true, data: location });
            // } catch (error) {
            //     res.status(400).json({ success: false, error });
            // }
            try {
                const savedLocation = await newLocation.save();
                res.status(201).json({ message: 'Location added successfully', location: savedLocation });
            } catch (error) {
                console.error('Error adding location:', error);
                res.status(500).json({ error: 'Failed to add location' });
            }
            break;
        default:
            res.status(405).json({ success: false, error: 'Method not allowed' });
            break;
    }
}

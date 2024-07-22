// model/employeeModel.js
import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  employeeID: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  branchName: { type: String, required: true },
  emailAddress: { type: String, required: true, unique: true },
  password: { type: String, required: true },
 
}, { collection: 'EMPLOYEE' });

const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);

export default Employee;

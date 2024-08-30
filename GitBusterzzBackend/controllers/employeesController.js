const { Employee } = require("../models/employeeModel")
var mongoose = require("mongoose");
const { Organization } = require("../models/organizationModel");

const checkID = (req, res, next, val) => {
  console.log(`Employee id is: ${val}`);
  next();
}

const getAllEmployees = async (req, res) => {

  const allEmployees = await Employee.find()

  res.send(allEmployees)
}

const getOneEmployee = async (req, res) => {

  const OneEmployee = await Employee.findById(req.params.id)
  res.send(OneEmployee)
}

// const createEmployee = async (req, res) => {
//   var newId = new mongoose.mongo.ObjectId();
//   req.body._id = newId;

//   const newEmployee = await Employee.create(req.body)
//   console.log(req.body)
//   const org = await Organization.findOne({ "name": req.body.name })
//   console.log(org, newEmployee)
//   console.log("new employee===============" + newEmployee)
//   org.addEmployee(newEmployee)
//   await org.save()
//   res.send(newEmployee)
//   console.log(newEmployee)
// }

const createEmployee = async (req, res) => {
  var newId = new mongoose.mongo.ObjectId();
  req.body._id = newId;

  const newEmployee = await Employee.create(req.body)
  console.log(req.body)
  const org = await Organization.findOne({ "name": req.body.empCompany })
  console.log(org, newEmployee)
  
  org.addEmployee(newEmployee)
  await org.save()
  res.send(newEmployee)
  console.log("new employee===============" + newEmployee)
}

const updateEmployee = async (req, res) => {
  
  const updateEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body)
  console.log("updateEmployee========" + updateEmployee)
  res.send(updateEmployee)
}



const deleteEmployee = async (req, res) => { 

  const deleteEmployee = await Employee.findById(req.params.id); 
  const mongoUpdateEmployeeList = await Employee.deleteOne(deleteEmployee);
  const org = await Organization.findOne({"name":req.params.empCompany});
  console.log("Emp Company is " + req.params.empCompany)
  console.log("Organisation is " + org)
  const deletedEmployee=org.employees.pop(deleteEmployee);
  console.log("deletedEmployee" + deletedEmployee);
  const finalUpdatedOrganization = await Organization.updateOne({"name":req.body.empCompany},org);
  console.log("Organizations Details"+org);
  console.log(finalUpdatedOrganization);
  res.send(deleteEmployee);
}



module.exports = {
  checkID,
  getAllEmployees,
  createEmployee,
  updateEmployee,
  getOneEmployee,
  deleteEmployee
}
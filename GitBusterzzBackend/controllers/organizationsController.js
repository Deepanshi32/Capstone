const { Organization } = require("../models/organizationModel")
var mongoose = require("mongoose");

const checkID = (req, res, next, val) => {
  console.log(`Organisation id is: ${val}`);
  next();
}

const getOrganizations = async (req, res) => {

  // database me se get all the organizations & return back in json
  const allOrganizations = await Organization.find().populate({
                              path: 'employees',
                              select: 'empName empMobile empAge empSalary empAddress empCompany empMail empAdhar'
                            })

  res.send(allOrganizations)
}

const getOneOrganization = async (req, res) => {

  const OneOrganization = await Organization.findById(req.params.id).populate('employees')
  res.send(OneOrganization)
}

const createOrganization = async (req, res) => {

  var newId = new mongoose.mongo.ObjectId();
  req.body._id = newId;

  const newOrganization = await Organization.create(req.body)

  res.send(newOrganization)
}

const updateOrganization = async (req, res) => {
  
  const updateOrganization = await Organization.findByIdAndUpdate(req.params.id, req.body)
  res.send(updateOrganization)
}



const deleteOrganization = async (req, res) => {

  const deleteOrganization = await Organization.findByIdAndDelete(req.params.id, req.body)

  res.send(deleteOrganization)
}




module.exports = {
  checkID,
  getOrganizations,
  createOrganization,
  updateOrganization,
  getOneOrganization,
  deleteOrganization,
  
}
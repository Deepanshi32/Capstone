const { EmployeePassword } = require("../models/EmployeePasswordModel")

const getEmployeePassword = async (req, res) => {

  const getEmployeePassword = await EmployeePassword.find()
  
  res.send(getEmployeePassword)
}

const createEmployeePassword = async (req, res) => {

  const newEmployeePassword = await EmployeePassword.create(req.body)

  res.send(newEmployeePassword)
}

const updateEmployeePassword = async (req, res) => {

  const updateEmployeePassword = await EmployeePassword.findByIdAndUpdate(req.params.id, req.body)

  res.send(updateEmployeePassword)
}

const deleteEmployeePassword = async (req, res) => {

  const deleteEmployeePassword = await EmployeePassword.findByIdAndDelete(req.params.id, req.body)

  res.send(deleteEmployeePassword)
}

module.exports = {
  getEmployeePassword,
  createEmployeePassword,
  updateEmployeePassword,
  deleteEmployeePassword
}
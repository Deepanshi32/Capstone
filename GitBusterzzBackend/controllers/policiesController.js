const { Policy } = require("../models/policyModel")
var mongoose = require("mongoose");
const { Client } = require("../models/clientModel");

const checkID = (req, res, next, val) => {
  console.log(`Policy id is: ${val}`);
  next();
};

const getPolicies = async (req, res) => {

  const allPolicies = await Policy.find()

  res.send(allPolicies)
}

const getOnePolicy = async (req, res) => {

  const OnePolicy = await Policy.findById(req.params.id)

  res.send(OnePolicy)
}

const createPolicy = async (req, res) => {
  var newId = new mongoose.mongo.ObjectId();
  req.body._id = newId;

  console.log(req.body);

  const newPolicy = await Policy.create(req.body)
  const client = await Client.findOne({ "name": req.body.ClientName })
  console.log(client, newPolicy)
  client.addPolicy(newPolicy)
  await client.save()
  res.send(newPolicy)
}

const updatePolicy = async (req, res) => {
  const updatePolicy = await Policy.findByIdAndUpdate(req.params.id, req.body)
  res.send(updatePolicy)
}

const deletePolicy = async (req, res) => {
  //Policy ID, ClientName
  console.log(req);
  const deletePolicy = await Policy.findById(req.params.id); 
  const mongoUpdatePolicyList = await Policy.deleteOne(deletePolicy);
  const client = await Client.findOne({"name":req.params.clientName});
  const deletedPolicy=client.policies.pop(deletePolicy);
  console.log("deletedPolicy" + deletedPolicy);
  const finalUpdatedClient = await Client.updateOne({"name":req.body.ClientName},client);
  console.log("Client Details"+client);
  console.log(finalUpdatedClient);
  res.send(deletePolicy)
}



module.exports = {
  checkID,
  getPolicies,
  createPolicy,
  updatePolicy,
  getOnePolicy,
  deletePolicy
}


// // const getallPolicy = async (req, res) => {

//   const getallPolicy = await Policy.findById(req.params.id, req.body)

//   res.send(allPolicies)

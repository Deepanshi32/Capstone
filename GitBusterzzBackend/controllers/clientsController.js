const { Client } = require("../models/clientModel")
var mongoose = require("mongoose");

const checkID = (req, res, next, val) => {
  console.log(`Client id is: ${val}`);
  next();
};

const getAllClient = async (req, res) => {

  const allClients = await Client.find().populate({
    path: 'policies',
    select: 'PolicyName Premium ClientName Age Residance Dependants Description'
  })

  res.send(allClients)
}

const createClient = async (req, res) => {

  var newId = new mongoose.mongo.ObjectId();
  req.body._id = newId;
  console.log("client's controller");
  console.log(req.body);
  // var newClient = new Client({
  //   "_id" : req.body._id,
  //   "policies" : [],
  //   "name" : req.body.clientName
  // });
  const newClientObject = await Client.create(req.body);
  
  res.send(newClientObject)
}

const getOneClient = async (req, res) => {

  const oneClient = await Client.findById(req.params.id)

  res.send(oneClient)
}

const updateClient = async (req, res) => {

  const updateClient = await Client.findByIdAndUpdate(req.params.id, req.body)

  res.send(updateClient)
}

const deleteClient = async (req, res) => {

  const deleteClient = await Client.findByIdAndDelete(req.params.id, req.body)

  res.send(deleteClient)
}

const addPolicyInClient = async (req, res) => {

  const addPolicy = await Client.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    function(err, acc) {
      if (err) {
        console.log(err);
      }
      res.render('/client/:id/policy', {
        PolicyName: req.user.PolicyName,
        ClientName: req.user.ClientName,
        Age: req.user.Age,
        Residance: req.user.Residance,
        Dependants: req.user.Dependants,
        Premium: req.user.Premium,
        Description: req.user.Description
      });
    }
  )
  res.send(addPolicy)
}

module.exports = {
  checkID,
  getAllClient,
  createClient,
  getOneClient,
  updateClient,
  deleteClient,
  addPolicyInClient
}
const knex = require("../db");
const moment=require("moment")

const createUser = async (req, res) => {
  
  knex("users")
    .insert({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      address: req.body.address,
    })
    .then(() => {
      res.json({
        message: `Book \ ${req.body.FirstName} and ${req.body.LastName} and ${req.body.Address} and ${req.body.DOB} created`,
      });
    })
    .catch((err) => {
      res.send({
        message: `there are error while creating a user ${req.body.FirstName} ${req.body.LastName}`,
      });
    });
};

const getUser = async (req, res) => {
  knex
    .select("*")
    .from("users")
    .then((data) => res.json({ data: data }))
    .catch((err) => console.log(err));
};

const updateUser = async (req, res) => {
  
  knex("users")
    .where("id", req.params.id)
    .update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      address: req.body.address,
    })
    .then((data) => {
      res.send({message:"users updated successfully"})
    })
    .catch((err) => {
      res.send({message:"erro while updating",err})
    });
};

const deleteUser = async (req, res) => {
  knex("users")
    .where("id", req.body.id)
    .del()
    .then(() => {
      res.json({ message: `Book ${req.body.id} deleted.` });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { createUser, getUser, updateUser, deleteUser };

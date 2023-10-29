  const knex = require("../db");


  const validateUserFields = (fields) => {
    const requiredFields = ['firstName', 'lastName', 'dob', 'address'];
    const emptyFields = [];
  
    for (const field of requiredFields) {
      if (!fields[field]) {
        emptyFields.push(field);
      }
    }
  
    if (emptyFields.length > 0) {
      return `${emptyFields.join(', ')} ${emptyFields.length > 1 ? 'are' : 'is'} required`;
    }
  
    return null;
  };

  const createUser = async (req, res) => {
    try {
      const { firstName, lastName, dob, address } = req.body;
      const validationError = validateUserFields(req.body);

      if (validationError) {
        res.status(400).json({ message: validationError });
      } else {
        await knex("users").insert({
          firstName,
          lastName,
          dob,
          address,
        });
        res.json({
          message: `User ${firstName} ${lastName} with address ${address} and date of birth ${dob} created`,
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while creating a user" });
    }
  };


  const getUser = async (req, res) => {
    try {
      const data = await knex.select("*").from("users");
      res.json({ data: data });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "An error occurred while fetching users" });
    }
  };

  const updateUser = async (req, res) => {
    try {
      await knex("users").where("id", req.params.id).update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dob: req.body.dob,
        address: req.body.address,
      });
      res.send({ message: "User updated successfully" });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while updating the user" });
    }
  };

  const deleteUser = async (req, res) => {
    try {
      await knex("users").where("id", req.body.id).del();
      res.json({ message: `User ${req.body.id} deleted.` });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the user" });
    }
  };

  module.exports = { createUser, getUser, updateUser, deleteUser };

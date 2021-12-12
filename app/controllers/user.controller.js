const db = require("../models");
const User = db.users;
const bcrypt = require("bcryptjs");

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.email && !req.body.password ) {
    res.status(400).send({ message: "Email and Password can not be empty!" });
    return;
  }
   // hash the password
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  // Create a Tutorial
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password
  });

  // Save Tutorial in the database
  user
    .save(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating User."
      });
    });
};


// Retrieve all User from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};
  
    User.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };

  // Retrieve all User from the database.
exports.findOneByEmail = (req,res) => {
  User.find({ email: req.body.email })
    .then(data => {
      res.send(data);
    })
    .catch(err => {

      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
  
  // Find a single User with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    User.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found user with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving User with id=" + id });
      });
  };
  
  // Update a Tutorial by the id in the request
  exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`
          });
        } else res.send({ message: "User was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };
  
  // Delete a User with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    User.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete User with id=${id}. Maybe User was not found!`
          });
        } else {
          res.send({
            message: "User was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete User with id=" + id
        });
      });
  };
  
  // Delete all User from the database.
  exports.deleteAll = (req, res) => {
    User.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} User were deleted successfully!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all User."
        });
      });
  };


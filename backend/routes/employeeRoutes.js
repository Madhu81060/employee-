const express = require("express");
const router = express.Router();

// Import all controller functions
const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require("../controllers/employeeController");


// 🔹 GET all employees
router.get("/", getEmployees);

// 🔹 CREATE new employee
router.post("/", createEmployee);

// 🔹 UPDATE employee by ID
router.put("/:id", updateEmployee);

// 🔹 DELETE employee by ID
router.delete("/:id", deleteEmployee);


module.exports = router;
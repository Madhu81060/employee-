const db = require("../config/db");

// ✅ GET all employees
exports.getEmployees = (req, res) => {
  db.query("SELECT * FROM employees ORDER BY id DESC", (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};


// ✅ CREATE employee
exports.createEmployee = (req, res) => {
  const { name, email, phone, designation, salary } = req.body;

  // simple validation
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Name, Email, Phone required" });
  }

  const sql = `
    INSERT INTO employees (name, email, phone, designation, salary)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, email, phone, designation, salary], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({
      message: "Employee added successfully",
      id: result.insertId
    });
  });
};


// ✅ UPDATE employee
exports.updateEmployee = (req, res) => {
  const { id } = req.params;
  const { name, email, phone, designation, salary } = req.body;

  const sql = `
    UPDATE employees 
    SET name=?, email=?, phone=?, designation=?, salary=? 
    WHERE id=?
  `;

  db.query(sql, [name, email, phone, designation, salary, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: "Employee updated successfully" });
  });
};


// ✅ DELETE employee
exports.deleteEmployee = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM employees WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: "Employee deleted successfully" });
  });
};
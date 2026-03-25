import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FormPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    salary: ""
  });

  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  // ✅ BASE URL (added)
  const API = "https://employee-9uvq.onrender.com/api/employees";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name || !form.email || !form.phone) {
      return "Please fill all required fields";
    }
    if (!/^\d{10}$/.test(form.phone)) {
      return "Phone must be 10 digits";
    }
    return "";
  };

  const showToast = (msg, type = "success") => {
    setToast({ show: true, message: msg, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      showToast(error, "error");
      return;
    }

    try {
      // ✅ UPDATED API
      await axios.post(API, form);

      showToast("Employee added successfully!", "success");

      setTimeout(() => navigate("/employees"), 1200);
    } catch (err) {
      showToast("Something went wrong", "error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">

      {/* Toast */}
      {toast.show && (
        <div
          className={`fixed top-6 right-6 px-5 py-3 rounded-xl shadow-lg text-white font-medium
          ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {toast.message}
        </div>
      )}

      {/* Card */}
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-pink-500 p-6 text-white">
          <h2 className="text-2xl font-bold">Employee Management</h2>
          <p className="text-sm opacity-90">
            Add and manage employee information
          </p>
        </div>

        {/* Form */}
        <form className="p-6 grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>

          {[
            { name: "name", placeholder: "Full Name" },
            { name: "email", placeholder: "Email", type: "email" },
            { name: "phone", placeholder: "Phone Number" },
            { name: "designation", placeholder: "Designation" },
            { name: "salary", placeholder: "Salary", type: "number" }
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label className="text-sm text-gray-600 mb-1 capitalize">
                {field.name}
              </label>

              <input
                type={field.type || "text"}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              />
            </div>
          ))}

          {/* Buttons */}
          <div className="md:col-span-2 flex justify-end gap-3 mt-4">

            <button
              type="button"
              onClick={() => navigate("/employees")}
              className="px-5 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-600 to-pink-500 hover:scale-105 transition shadow-md"
            >
              Save Employee
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}

export default FormPage;
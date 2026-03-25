import EmployeeTable from "../components/EmployeeTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function ListPage() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  // Fetch data
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees");
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Search filter
  const filteredData = employees.filter((emp) =>
    emp.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">

      {/* 🔥 SIDEBAR */}
      <div className="w-64 bg-gradient-to-b from-indigo-600 via-purple-600 to-pink-500 text-white p-6 hidden md:flex flex-col shadow-xl">

        <h2 className="text-2xl font-bold mb-10 tracking-wide">
          ⚡ Admin Panel
        </h2>

        <nav className="space-y-3">
          <div className="bg-white/20 p-3 rounded-lg font-medium">
            📊 Dashboard
          </div>

          <div className="hover:bg-white/20 p-3 rounded-lg cursor-pointer">
            👩‍💼 Employees
          </div>

          <div className="hover:bg-white/20 p-3 rounded-lg cursor-pointer">
            ⚙ Settings
          </div>
        </nav>

        <div className="mt-auto text-xs opacity-70">
          © 2026 Employee System
        </div>
      </div>

      {/* 🔥 MAIN CONTENT */}
      <div className="flex-1 p-6">

        {/* 🔝 HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">

          <div>
            <h1 className="text-3xl font-bold text-indigo-700">
              Employee Dashboard
            </h1>
            <p className="text-gray-500 text-sm">
              Manage and monitor employees
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-xl font-semibold shadow-md hover:scale-105 transition"
          >
            + Add Employee
          </button>
        </div>

        {/* 📊 STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

          <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-lg border-l-4 border-indigo-500">
            <p className="text-gray-500 text-sm">Total Employees</p>
            <h2 className="text-3xl font-bold text-indigo-600 mt-2">
              {employees.length}
            </h2>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-lg border-l-4 border-green-500">
            <p className="text-gray-500 text-sm">Active</p>
            <h2 className="text-3xl font-bold text-green-500 mt-2">
              {employees.length}
            </h2>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-lg border-l-4 border-pink-500">
            <p className="text-gray-500 text-sm">Departments</p>
            <h2 className="text-3xl font-bold text-pink-500 mt-2">
              5
            </h2>
          </div>

        </div>

        {/* 📋 TABLE SECTION */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6">

          {/* TOP BAR */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-5 gap-3">

            <h3 className="text-xl font-semibold text-gray-700">
              📋 Employee List
            </h3>

            <input
              type="text"
              placeholder="🔍 Search employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border px-4 py-2 rounded-xl outline-none focus:ring-2 focus:ring-indigo-400 w-full md:w-72"
            />

          </div>

          {/* TABLE */}
          <EmployeeTable data={filteredData} refresh={fetchData} />

        </div>

      </div>
    </div>
  );
}

export default ListPage;
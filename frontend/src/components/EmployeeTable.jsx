import { useEffect, useState } from "react";
import axios from "axios";

function EmployeeTable({ data = [], refresh }) {
  const [tableData, setTableData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({});

  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Fetch (fallback if no props)
  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/employees");
    setTableData(res.data);
  };

  useEffect(() => {
    if (data.length > 0) {
      setTableData(data);
    } else {
      fetchData();
    }
  }, [data]);

  // Edit
  const handleEdit = (emp) => {
    setEditId(emp.id);
    setEditData(emp);
  };

  // Update
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/employees/${editId}`,
        editData
      );
      setEditId(null);
      refresh ? refresh() : fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  // Delete
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/employees/${deleteId}`
      );
      setShowModal(false);
      refresh ? refresh() : fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full">

      {/* TABLE CARD */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-white px-6 py-4">
          <h2 className="text-lg font-semibold">Employee Records</h2>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-center">

            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3">Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Designation</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((emp) => (
                <tr
                  key={emp.id}
                  className="border-b hover:bg-indigo-50 transition"
                >

                  {editId === emp.id ? (
                    <>
                      {["name", "email", "phone", "designation", "salary"].map((field) => (
                        <td key={field}>
                          <input
                            value={editData[field]}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                [field]: e.target.value
                              })
                            }
                            className="border px-2 py-1 rounded focus:ring-2 focus:ring-indigo-400"
                          />
                        </td>
                      ))}

                      <td>
                        <button
                          onClick={handleUpdate}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded m-1 transition"
                        >
                          Save
                        </button>

                        <button
                          onClick={() => setEditId(null)}
                          className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded m-1 transition"
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{emp.name}</td>
                      <td>{emp.email}</td>
                      <td>{emp.phone}</td>
                      <td>{emp.designation}</td>
                      <td className="font-semibold text-indigo-600">
                        ₹{emp.salary}
                      </td>

                      <td>
                        <button
                          onClick={() => handleEdit(emp)}
                          className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded m-1 transition"
                        >
                          ✏ Edit
                        </button>

                        <button
                          onClick={() => openDeleteModal(emp.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded m-1 transition"
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </>
                  )}

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white rounded-2xl p-6 shadow-xl text-center w-80 animate-scaleIn">

            <h3 className="text-lg font-bold text-red-500 mb-2">
              Confirm Delete
            </h3>

            <p className="text-gray-600 mb-4">
              This action cannot be undone
            </p>

            <div className="flex justify-center gap-3">

              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
              >
                Delete
              </button>

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded transition"
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeTable;
function ConfirmModal({ show, onClose, onConfirm }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-5 rounded shadow-lg">
        <p className="mb-4">Are you sure you want to delete?</p>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-3 py-1 bg-gray-300 rounded">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-3 py-1 bg-red-500 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
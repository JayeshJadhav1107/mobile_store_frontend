export default function DeleteProduct({ productName, onCancel, onConfirm }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
                <p className="mb-4">Are you sure you want to delete <span className="font-medium">{productName}</span>?</p>
                <div className="flex justify-end gap-2">
                    <button onClick={onCancel} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                    <button onClick={onConfirm} className="bg-red-600 text-white px-4 py-2 rounded">Yes, Delete</button>
                </div>
            </div>
        </div>
    );
}

import { useState } from "react";
import API from "../services/api";

export default function UpdateProduct({ product, onClose }) {
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name,
        price: product.price,
        description: product.description,
    });

    const [showSuccess, setShowSuccess] = useState(false); // 👈 New state for popup

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await API.put(`/products/${product.ID}`, updatedProduct, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setShowSuccess(true); // 👈 Show success popup
            setTimeout(() => {
                setShowSuccess(false);
                onClose();
                window.location.reload(); // Reload page to show updated product list
            }, 2000); // Delay for showing popup
        } catch (err) {
            alert("Error updating product: " + (err.response?.data?.error || err.message));
        }
    };

    return (
        <>
            {/* Main Update Modal */}
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-40">
                <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                    <h3 className="text-lg font-semibold mb-4">Update Product</h3>
                    <form onSubmit={handleUpdateSubmit} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            className="w-full border p-2 rounded"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Price"
                            value={updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: parseFloat(e.target.value) || 0 })}
                            className="w-full border p-2 rounded"
                            required
                        />
                        <textarea
                            placeholder="Description"
                            value={updatedProduct.description}
                            onChange={(e) => setUpdatedProduct({ ...updatedProduct, description: e.target.value })}
                            className="w-full border p-2 rounded"
                            required
                        />
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Cancel</button>
                            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>

            {/* ✅ Success Popup Modal */}
            {showSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-sm text-center">
                        <h2 className="text-2xl font-bold text-green-600 mb-2">Product Updated</h2>
                        <p className="text-gray-700">Changes saved successfully!</p>
                    </div>
                </div>
            )}
        </>
    );
}

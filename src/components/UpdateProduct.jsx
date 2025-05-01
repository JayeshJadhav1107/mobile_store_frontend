import { useState } from "react";
import API from "../services/api";

export default function UpdateProduct({ product, onClose }) {
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name,
        price: product.price,
        description: product.description,
    });

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            // Send PUT request to update product
            await API.put(`/products/${product.ID}`, updatedProduct, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Product updated successfully!");
            onClose();
            window.location.reload(); // Reload page to show updated product list
        } catch (err) {
            alert("Error updating product: " + (err.response?.data?.error || err.message));
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
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
    );
}

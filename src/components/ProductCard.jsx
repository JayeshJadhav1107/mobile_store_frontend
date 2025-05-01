import { useState } from "react";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";
import API from "../services/api";

export default function ProductCard({ product, role, onViewDetails }) {
    const [isDeleted, setIsDeleted] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem("token");
            await API.delete(`/products/${product.ID}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setIsDeleted(true);
            alert("Product deleted successfully!");
        } catch (err) {
            alert("Error deleting product: " + (err.response?.data?.error || err.message));
        } finally {
            setShowConfirm(false);
        }
    };

    if (isDeleted) return null;

    return (
        <>
            <div className="border p-4 rounded shadow relative bg-white">
                <h2 className="font-semibold">{product.name}</h2>
                {/* <p>Price: ₹{product.price}</p> */}
                {/* <p>Description: {product.description}</p> */}
                <button onClick={() => onViewDetails(product)} className="text-blue-600 mt-2">
                    View Details
                </button>

                {role === "admin" && (
                    <div className="mt-4">
                        <button onClick={() => setShowUpdate(true)} className="bg-yellow-500 text-white px-4 py-2 rounded mr-2">
                            Update
                        </button>
                        <button onClick={() => setShowConfirm(true)} className="bg-red-500 text-white px-4 py-2 rounded">
                            Delete
                        </button>
                    </div>
                )}
            </div>

            {showConfirm && (
                <DeleteProduct
                    productName={product.name}
                    onCancel={() => setShowConfirm(false)}
                    onConfirm={handleDelete}
                />
            )}

            {showUpdate && (
                <UpdateProduct
                    product={product}
                    onClose={() => setShowUpdate(false)}
                />
            )}
        </>
    );
}

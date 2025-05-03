import { useState } from "react";
import API from "../services/api";

export default function CreateProduct() {
    // Product state
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: 0,
    });
    const [successPopup, setSuccessPopup] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token"); // get token from storage
            await API.post("/products", product, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSuccessPopup(true);
            setTimeout(() => setSuccessPopup(false), 2000); // auto-close after 2 seconds

            // Reset form
            setProduct({ name: "", description: "", price: 0 });
        } catch (err) {
            console.error(err);
            alert("Error creating product: " + (err.response?.data?.error || err.message));
        }
    };


    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Create New Product</h2>

            {successPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded shadow-lg text-center max-w-sm w-full">
                        <h2 className="text-2xl font-bold text-green-600 mb-4">✅ Product Created</h2>
                        <p className="text-gray-700">Your product has been successfully added!</p>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-2 mb-3 border"
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Description"
                    className="w-full p-2 mb-3 border"
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    required
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    className="w-full p-2 mb-4 border"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) || 0 })}
                    required
                />
                <input
                    placeholder="Url"
                    className="w-full p-2 mb-3 border"
                    value={product.url}
                    onChange={(e) => setProduct({ ...product, url: e.target.value })}
                />
                <button type="submit" className="bg-blue-600 text-white w-full p-2 rounded">
                    Create Product
                </button>
            </form>
        </div>
    );
}

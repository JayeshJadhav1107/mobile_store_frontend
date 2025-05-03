import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

export default function AdminPage() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [selectedProduct, setSelectedProduct] = useState(null);


    useEffect(() => {
        // Fetching products created by the logged-in admin
        const fetchProducts = async () => {
            try {
                const adminId = localStorage.getItem("userID"); // Fetch admin ID from local storage
                console.log("adminId", adminId)
                // Fetch products created by this specific admin
                const res = await API.get(`/products-by-admin?admin_id=${adminId}`);
                setProducts(res.data); // Set the fetched products in the state
            } catch (err) {
                alert("Failed to fetch products");
                console.error(err);
            }
        };

        fetchProducts();
    }, []);

    // Logout and redirect to login
    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    const closeModal = () => setSelectedProduct(null);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Admin Product Dashboard</h1>
                <div className="space-x-2">
                    <Link to="/admin" className="bg-blue-600 text-white px-4 py-2 rounded">
                        Add New Product
                    </Link>
                    <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded">
                        Logout
                    </button>
                </div>
            </div>

            {/* Display product cards */}
            {products.length === 0 ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-2xl font-semibold text-gray-500 text-center">
                        You haven’t created any products yet. <br /> Click on “Add New Product” to get started!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {products.map((product) => (
                        <ProductCard key={product.ID} product={product} role="admin" onViewDetails={setSelectedProduct} />
                    ))}
                </div>
            )}

            {/* Product detail modal */}
            {selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg max-w-md w-full relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                        >
                            &times;
                        </button>

                        {selectedProduct.url ? (
                            <img
                                src={selectedProduct.url}
                                alt={selectedProduct.name}
                                className="w-full h-64 object-contain mb-4 rounded"
                            />
                        ) : (
                            <div className="w-full h-64 bg-gray-300 flex items-center justify-center text-white rounded mb-4">
                                <span>No Image Available</span>
                            </div>
                        )}

                        <h2 className="text-xl font-bold mb-2">{selectedProduct.name}</h2>
                        <p className="mb-1">Price: ₹{selectedProduct.price}</p>
                        <p>Description: {selectedProduct.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

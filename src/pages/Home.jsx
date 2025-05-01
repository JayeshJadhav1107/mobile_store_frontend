import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import ProductCard from "../components/ProductCard";

export default function Home() {
    // States for products, user role, and selected product
    const [products, setProducts] = useState([]);
    const [role, setRole] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const navigate = useNavigate();

    // Fetch products and user role on component mount
    useEffect(() => {
        API.get("/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.error("Error fetching products", err));

        const storedRole = localStorage.getItem("role");
        if (storedRole) setRole(storedRole);
    }, []);

    // Logout user
    const handleLogout = () => {
        localStorage.clear();
        setRole("");
        navigate("/login");
    };

    // Close product detail modal
    const closeModal = () => setSelectedProduct(null);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">All Mobile Phones</h1>
                <div className="space-x-2">
                    {role ? (
                        <>
                            {role === "admin" && (
                                <Link to="/admin" className="bg-blue-600 text-white px-4 py-2 rounded">Add New Product</Link>
                            )}
                            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded">Login</Link>
                            <Link to="/register" className="bg-green-500 text-white px-4 py-2 rounded">Sign Up</Link>
                        </>
                    )}
                </div>

            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products.map((p) => (
                    <ProductCard key={p.ID} product={p} role={role} onViewDetails={setSelectedProduct} />
                ))}
            </div>

            {/* Product Detail Modal */}
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

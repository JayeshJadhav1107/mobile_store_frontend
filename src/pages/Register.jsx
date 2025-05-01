import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
    // Form state for email, password, and role
    const [form, setForm] = useState({ email: "", password: "", role: "customer" });
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send registration data to backend
            await API.post("/register", form);
            alert("Registration successful!");
            navigate("/login");
        } catch (err) {
            alert("Error: " + err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="flex justify-center mt-20">
            <form onSubmit={handleSubmit} className="w-80 bg-white p-6 rounded shadow">
                <h2 className="text-xl mb-4 font-semibold">Register</h2>
                <input className="mb-2 p-2 w-full border" placeholder="Email" type="email" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <input className="mb-2 p-2 w-full border" placeholder="Password" type="password" value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <select className="mb-4 p-2 w-full border" value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="bg-blue-600 text-white w-full p-2 rounded">Register</button>
            </form>
        </div>
    );
}

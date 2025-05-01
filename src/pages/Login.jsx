import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send login request to backend
            const res = await API.post("/login", form);
            // Store token and user info in localStorage
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("userID", res.data.userID)
            
            // Navigate based on role
            if (res.data.role === "admin") navigate("/admin-page");
            else navigate("/");
        } catch (err) {
            alert("Login failed: " + err.response?.data?.message || err.message);
        }
    };

    return (
        <div className="flex justify-center mt-20">
            <form onSubmit={handleSubmit} className="w-80 bg-white p-6 rounded shadow">
                <h2 className="text-xl mb-4 font-semibold">Login</h2>
                <input className="mb-2 p-2 w-full border" placeholder="Email" type="email" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <input className="mb-4 p-2 w-full border" placeholder="Password" type="password" value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                <button type="submit" className="bg-green-600 text-white w-full p-2 rounded">Login</button>
            </form>
        </div>
    );
}

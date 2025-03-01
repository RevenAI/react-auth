import { useState } from "react";
import useDynamicAxios from "../hooks/useDynamicAxios";
import "./styles/RegisterAdmin.css";

const RegisterAdmin = () => {
    const dynamicAxios = useDynamicAxios();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMessage("");
        
        try {
            const response = await dynamicAxios.post("/admins", formData);
            setSuccessMessage("Admin registered successfully!");
            setFormData({ firstName: "", lastName: "", email: "", password: "" });
        } catch (error) {
            setError(error.response?.data?.message || "Failed to register admin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-admin-container">
            <h2>Register New Admin</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="register-form">
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
            </form>
        </div>
    );
};

export default RegisterAdmin;

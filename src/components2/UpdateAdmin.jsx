import { useState } from "react";
import useDynamicAxios from "../hooks/useDynamicAxios";
import "./styles/UpdateAdmin.css";

const UpdateAdmin = ({ adminData }) => {
    const dynamicAxios = useDynamicAxios();
    const [formData, setFormData] = useState({
        _id: adminData?._id || "",
        firstName: adminData?.firstName || "",
        lastName: adminData?.lastName || "",
        email: adminData?.email || "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData._id) {
            setError("Admin ID is missing.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccessMessage("");

        try {
            await dynamicAxios.patch(`/admins/${formData._id}/update`, formData);
            setSuccessMessage("Admin records updated successfully!");
        } catch (error) {
            setError(error.response?.data?.message || "Failed to update admin.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-admin-container">
            <h2>Update Admin</h2>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            <form onSubmit={handleSubmit} className="register-form">
                <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="New Password" value={formData.password} onChange={handleChange} />
                <button type="submit" disabled={loading}>{loading ? "Updating..." : "Update"}</button>
            </form>
        </div>
    );
};

export default UpdateAdmin;

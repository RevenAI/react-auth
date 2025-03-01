import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useDynamicAxios from "../hooks/useDynamicAxios";
import "./styles/SingleAdmin.css";

const SingleAdmin = () => {
    const { adminID } = useParams();
    const dynamicAxios = useDynamicAxios();
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAdmin = async () => {
            setLoading(true);
            setError(null); // Reset error state before request
            try {
                const response = await dynamicAxios.get(`/admins/${adminID}`);
                setAdmin(response.data || null); // Ensure `null` if no data
            } catch (error) {
                setError(error.response?.data?.message || "Failed to fetch admin.");
            } finally {
                setLoading(false);
            }
        };

        fetchAdmin();
    }, [adminID, dynamicAxios]);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!admin) return <div className="no-admin">Admin not found</div>;

    return (
        <div className="admin-container">
            <div className="admin-card">
                <h2>{admin?.firstName} {admin?.lastName}</h2>
                <p><strong>Email:</strong> {admin?.email}</p>
                <p><strong>Posts Created:</strong> {admin?.postsCreated?.length || 0}</p>
            </div>
        </div>
    );
};

export default SingleAdmin;

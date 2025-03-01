import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import useDynamicAxios from "../hooks/useDynamicAxios";
import "./styles/AdminList.css";

const AdminList = () => {
    const dynamicAxios = useDynamicAxios();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const response = await dynamicAxios.get("/admins", { signal: controller.signal });

                if (isMounted.current) {
                    setData(response.data.data);
                    setError(null);
                }
            } catch (error) {
                if (error.response) {
                    setError(error.response.data.message || "An error occurred");
                } else if (error.request) {
                    setError("No response from the server. Please try again.");
                } else {
                    setError(error.message || "Something went wrong.");
                }
            } finally {
                if (isMounted.current) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted.current = false;
            controller.abort();
        };
    }, [dynamicAxios]);

    const handleDelete = async (id) => {
        const admin = data.find((admin) => admin._id === id);
        if (!admin || !window.confirm(`Are you sure you want to delete ${admin.lastName}?`)) return;

        try {
            await dynamicAxios.delete(`/admins/${id}`);
            setData((prevData) => prevData.filter((admin) => admin._id !== id));
        } catch (error) {
            alert(`Failed to delete ${admin.lastName}.`);
        }
    };

    const handleBlock = async (id) => {
        const admin = data.find((admin) => admin._id === id);
        if (!admin || !window.confirm(`Are you sure you want to block ${admin.lastName}?`)) return;

        try {
            await dynamicAxios.patch(`/admins/${id}/block`);
            alert(`${admin.lastName} has been blocked.`);
        } catch (error) {
            alert(`Failed to block ${admin.lastName}.`);
        }
    };

    const handleUpdate = (id) => {
        window.location.href = `/admins/${id}/update`;
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="admin-container">
            {data.length === 0 ? (
                <div className="no-admin">No admin found in Admin records</div>
            ) : (
                <>
                    <h1 className="admin-title">Admins</h1>
                    <ul className="admin-list">
                        {data.map((admin) => (
                            <li key={admin._id} className="admin-card">
                                <div className="admin-info">
                                    <h2>{admin.firstName} {admin.lastName}</h2>
                                    <p>
                                        <strong>Email:</strong> 
                                        <Link to={`/admins/${admin._id}`} className="admin-email-link">
                                            {admin.email}
                                        </Link>
                                    </p>
                                    <p>
                                        <strong>Posts Created:</strong> 
                                        <Link to={`/admin/${admin._id}/posts`} className="admin-posts-link">
                                            {admin.postsCreated.length}
                                        </Link>
                                    </p>
                                </div>
                                <div className="admin-actions">
                                    <button className="update-btn" onClick={() => handleUpdate(admin._id)}>Update</button>
                                    <button className="block-btn" onClick={() => handleBlock(admin._id)}>Block</button>
                                    <button className="delete-btn" onClick={() => handleDelete(admin._id)}>Delete</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default AdminList;

import { API_URL } from '../api/axios';
import apiRequest from '../api/axios'; 
import { useEffect, useState } from 'react';

const TestPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await apiRequest(`${API_URL}/admins`);
                
                if (response.status === 404) {
                    setError(response.data.message);
                } else if (response.status === 200) {
                    setData(response.data.data);
                    setSuccess(response.data.message);
                }
                
            } catch (error) {
                const errMsg = error.response?.data?.message || error.message;
                setError(errMsg);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div style={{ color: "green", fontWeight: "bold" }}>Loading...</div>;
    if (error) return <div style={{ color: "red", fontWeight: "bold" }}>Error: {error}</div>;

    return (
        <>
            {data.length === 0 && success === "Admins record is empty" ? (
                <div style={{ color: "red", fontWeight: "bold" }}>
                    No admin found in Admins records
                </div>
            ) : (
                <div>
                    <h1>Admins</h1>
                    <ul>
                        {data.map((admin) => (
                            <li key={admin._id || admin.email}> 
                                <p>{admin.firstName}</p>
                                <p>{admin.lastName}</p>
                                <p>{admin.email}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default TestPage;


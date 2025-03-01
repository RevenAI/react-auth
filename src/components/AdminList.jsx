import { useEffect, useState, useRef } from 'react';
import useDynamicAxios from '../hooks/useDynamicAxios';

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
                const response = await dynamicAxios.get("/admins", {
                    signal: controller.signal
                });

                if (isMounted.current) {
                    //testing
                    console.log("Data object", response.data);
                    console.log("Data props", response.data.data);
                    setData(response.data.data);
                    setError(null);
                }
            } catch (error) {
                if (error.response) {
                    setError(error.response.data.message || "An error occurred");
                    //testing
                    console.log("Error Response:", error.response);
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

    if (loading) return <div style={{ color: "green", fontWeight: "bold" }}>Loading...</div>;
    if (error) return <div style={{ color: "red", fontWeight: "bold" }}>Error: {error}</div>;

    return (
        <>
            {data.length === 0 ? (
                <div style={{ color: "red", fontWeight: "bold" }}>
                    No admin found in Admins records
                </div>
            ) : (
                <div>
                    <h1>Admins</h1>
                    <ul>
                        {data.map((admin) => (
                            <li key={admin._id}>
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

export default AdminList;


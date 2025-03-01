import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import dynamicAxios from '../api/axios';
import './styles/Login.css';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await dynamicAxios.post(
                "/admins/login",
                { email, password }
            );            
                
            //testing
            console.log("Full Response:", response);
            console.log("Response Data:", response?.data?.data);

            const accessToken = response?.data?.data?.accessToken;
            const role = response?.data?.data?.role;

            setAuth({ email, role, accessToken });

            setEmail('');
            setPassword('');
            //testing
            console.log("Navigating to:", from);
            navigate(from, { replace: true });
        } catch (err) {
            if (err?.response) {
                //testing
                console.log("Error response", err.response);
                
                setErrMsg(err?.response.data.message || "An error occurred");
            } else if (err.request) {
                const reqMsg = import.meta.env.DEV ? `Server is not responding: ${err.request}` : "Server error. Please try again."
                //testing
                console.log("Request error", reqMsg);
                setErrMsg(reqMsg);
            } else {
                //testing
                console.log("Error message", err.message);
                setErrMsg(err.message || "Something went wrong.");
            }
            errRef.current?.focus();
        }
    };

    return (
        <section className="signin-container">
            {/* Error Message */}
            <p ref={errRef} className={`error-msg ${errMsg ? "show" : "hide"}`} aria-live="assertive">
                {errMsg}
            </p>

            {/* Sign In Heading */}
            <h1 className="signin-title">Sign In</h1>

            {/* Form Section */}
            <form onSubmit={handleSubmit} className="signin-form">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    ref={userRef}
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />

                <button type="submit">Sign In</button>
            </form>

            {/* Register Link */}
            <p className="register-link">
                Need an Account? <br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>
    );
};

export default Login;


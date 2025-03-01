import AdminList from "./AdminList";
import { Link } from "react-router-dom";
import "./styles/Admins.css"; 

const Admins = () => {
  return (
    <div className="admin-container">
      {/* Navigation Links */}
      <nav className="admin-nav">
        <Link to="/admins" className="admin-link">Admins</Link>
        <Link to="/admins/register" className="admin-link">Register New Admin</Link>
        <Link to="/" className="admin-link">Back to Homepage</Link>
      </nav>

      {/* Admin List Component */}
      <AdminList />
    </div>
  );
};

export default Admins;

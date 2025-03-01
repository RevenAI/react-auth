import { Link } from "react-router-dom";
import "./styles/NotFound.css";

const NotFound = () => {
  return (
    <article className="notfound-container">
      <h1 className="notfound-title">Oops!</h1>
      <p className="notfound-text">Page Not Found</p>
      
      <Link to="/" className="notfound-button">
        Visit Our Homepage
      </Link>
    </article>
  );
};

export default NotFound;

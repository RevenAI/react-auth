import { Link } from "react-router-dom";
import "./styles/Home.css"; 

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">BlogerX App</h1>

      <div className="nav-links">
        <Link to="/admins" className="nav-button admins">Admins</Link>
        <Link to="/bloggers" className="nav-button bloggers">Bloggers</Link>
        <Link to="/posts" className="nav-button posts">Posts</Link>
        <Link to="/posts" className="nav-button posts">Chat</Link>
      </div>
    </div>
  );
};

export default Home;

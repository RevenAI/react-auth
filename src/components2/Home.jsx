import { Link } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken"

const Home = () => {
    const refresh = useRefreshToken();

  return (
    <div>
         <h1>Admin Records</h1>

        <Link to="/admins">
            Go to Admins
        </Link>

        <button onClick={()=> refresh()}>Refresh</button>
    </div>
  )
}

export default Home
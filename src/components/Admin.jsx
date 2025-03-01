import { Link } from "react-router-dom"
import AdminList from './AdminList'

const Admin = () => {
    return (
        <section>
            <h1>Admins Page</h1>
            <br />
            <AdminList />
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Admin

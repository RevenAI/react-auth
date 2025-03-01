import Login from './components2/Login';
import Home from './components2/Home';
import Layout from './components2/Layout';
import UpdateAdmin from './components2/UpdateAdmin';
import { Routes, Route } from 'react-router-dom';
import RegisterAdmin from './components2/RegisterAdmin';
import Admins from "./components2/Admins";
import NotFound from "./components2/NotFound";
import SingleAdmin from "./components2/SingleAdmin";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={ <Home /> } />
        
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="/admins/register" element={<RegisterAdmin />} />
        <Route path="/admins/:adminID/update" element={<UpdateAdmin />} />
        <Route path="/admins/:adminID" element={<SingleAdmin />} />

        {/* protected routes */}
        <Route path="/admins" element={ <Admins /> } />

  
 
        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

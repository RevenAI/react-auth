import Login from './components2/Login';
import Home from './components2/Home';
import Layout from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Register from './components2/Register';
import Admins from "./components2/Admins";
import NotFound from "./components2/NotFound";

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={ <Home /> } />
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route path="register" element={ <Register /> } />
        <Route path="admins" element={ <Admins /> } />

  
 
        {/* catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

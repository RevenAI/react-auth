import Register from '../src/components/Register';
import Login from '../src/components/Login';
import Home from '../src/components/Home';
import Layout from './components/Layout';
import Editor from '../src/components/Editor';
import Admin from '../src/components/Admin';
import Missing from '../src/components/Missing';
import Unauthorized from '../src/components/Unauthorized';
import Lounge from '../src/components/Lounge';
import LinkPage from '../src/components/LinkPage';
import RequireAuth from '../src/components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import AdminList from './components/AdminList';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="admin-list" element={<AdminList />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;

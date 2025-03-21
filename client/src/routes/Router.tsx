import { Routes, Route } from "react-router-dom";
import Layout from "../Layout.tsx";
import Landing from "../pages/Landing.tsx";
import Singleplayer from "../pages/Singleplayer.tsx";
import Multiplayer from "../pages/Multiplayer.tsx";
import Profile from "../pages/Profile.tsx";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import Register from "../pages/Register.tsx"
import NotFound from "../pages/NotFound.tsx";
import ProtectedRoutes from "./ProtectedRoute.tsx";
import PublicRoutes from "./PublicRoute.tsx";

function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
      
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Landing />} />
        </Route>
      
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/singleplayer" element={<Singleplayer />} />
          <Route path="/multiplayer" element={<Multiplayer />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>


      <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default Router;
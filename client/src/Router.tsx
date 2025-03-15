import { Routes, Route } from "react-router-dom";
import Layout from "./Layout.tsx";



import Landing from "./pages/Landing";
import Singleplayer from "./pages/Singleplayer";
import Multiplayer from "./pages/Multiplayer";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"
import NotFound from "./pages/NotFound";

function Router() {
    return (
      <Routes>
        {/* Pages within layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/singleplayer" element={<Singleplayer />} />
          <Route path="/multiplayer" element={<Multiplayer />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
        </Route>
  
        {/* Pages without layout*/}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    );
  }

export default Router;
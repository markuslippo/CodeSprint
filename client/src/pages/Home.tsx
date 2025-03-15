import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <h1>Welcome to CodeSprint!</h1>
      <nav>
        <Link to="/singleplayer">Singleplayer</Link> 
        <Link to="/multiplayer">Multiplayer</Link>
        <Link to ="/profile">Profile</Link>
      </nav>
    </div>
  );
}

export default Landing;

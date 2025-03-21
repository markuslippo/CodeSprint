import { Link } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin.tsx";

function Login() {
    return (
    <div>

        <div>
            <h1>CodeSprint</h1>
            <p>Log in to your CodeSprint account</p>
        </div>

        <div>
        <GoogleLogin />
        </div>

        <div>
            <p>Don't have an account?</p>
            <Link to="/register">Register</Link> 
        </div>
    
    </div>
    
    );
}
  
export default Login;
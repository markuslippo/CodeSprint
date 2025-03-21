import { Link } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin.tsx";

function Register() {
    return (
    <div>

        <div>
            <h1>CodeSprint</h1>
            <p>Create your CodeSprint account</p>
            <ul>
                <li>Measure your coding WPM</li>
                <li>Practice to make your coding faster</li>
                <li>Track your progress</li>
                <li>Compete against others</li>
            </ul>
        </div>

        <div>
        <GoogleLogin />
        </div>
    

        <div>
            <p>Already registered?</p>
            <Link to="/register">Login</Link> 
        </div>
    </div>
    
    );
}
  
export default Register;
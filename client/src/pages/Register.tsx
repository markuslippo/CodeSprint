import GoogleLogin from "../components/GoogleLogin.tsx";

function Register() {
    return (
    <div>

        <div>
            <h1>Register to CodeSprint</h1>
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
    
    </div>
    
    );
}
  
export default Register;
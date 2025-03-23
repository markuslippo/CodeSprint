import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const clientId = "411121955373-ip2arfe9ublrtble1vvu34lomem9mpss.apps.googleusercontent.com";

const GoogleLoginForm = () => {
	const { loginWithGoogle } = useAuth();
  	const navigate = useNavigate();

	const handleSuccess = async (credentialResponse: any) => {
		await loginWithGoogle(credentialResponse.credential);
		navigate('/home', { replace: true });
	};

	const handleFailure = () => {
		console.error("Google API error");
	};

	return (
		<div>
			<GoogleOAuthProvider clientId={clientId}>
				<GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
			</GoogleOAuthProvider>
		</div>
	);
};

export default GoogleLoginForm;

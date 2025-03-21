import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId = "411121955373-ip2arfe9ublrtble1vvu34lomem9mpss.apps.googleusercontent.com";

const GoogleLoginForm = () => {

  const handleSuccess = async (credentialResponse: any) => {
    
  };

  const handleFailure = () => {
    console.error("Google Sign-In failed.");
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

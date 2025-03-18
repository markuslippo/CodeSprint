import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const clientId = "411121955373-ip2arfe9ublrtble1vvu34lomem9mpss.apps.googleusercontent.com";

const Login = () => {
  const handleSuccess = async (credentialResponse: any) => {
    console.log("Google Token:", credentialResponse.credential);

    const res = await fetch("http://localhost:8080/auth/google", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: credentialResponse.credential }),
    });

    const data = await res.json();
    console.log("Backend response:", data);
    localStorage.setItem("accessToken", data.access_token);
    localStorage.setItem("refreshToken", data.refresh_token);
  };

  const handleFailure = () => {
    console.error("Google Sign-In failed.");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <GoogleLogin onSuccess={handleSuccess} onError={handleFailure} />
    </GoogleOAuthProvider>
  );
};

export default Login;

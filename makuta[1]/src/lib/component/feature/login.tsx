"use client";

import React from "react";
import Logo from "@/assets/icons/logo.svg";
import { Button } from "@/components/ui/button";

const Login = () => {
  const handleSignIn = () => {
    // Direct redirect to Cognito hosted UI
    const cognitoUrl =
      "https://eu-central-1lg7yecqer.auth.eu-central-1.amazoncognito.com/login?client_id=6jdv0m88l5p4127a4va78pca3u&redirect_uri=http://localhost:3000/auth/callback&response_type=code&scope=email+openid+phone";

    // Redirect to Cognito hosted UI
    window.location.href = cognitoUrl;
  };

  return (
    <div className="bg-background flex min-h-screen w-full">
      {/* Left Panel - Brand Section */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center bg-black p-10">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Makuta Logo */}
          <div className="flex items-center justify-center">
            <Logo />
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 lg:px-0">
        <div className="flex w-full max-w-[400px] flex-col items-center gap-2 text-center py-2">
          <h1 className="text-2xl lg:text-[32px] font-bold leading-tight lg:leading-[40px] text-foreground">
            Makuta Admin Center
          </h1>
          <p className="text-sm lg:text-[16px] font-normal leading-normal lg:leading-[20px] text-muted-foreground">
            Please Login to Continue
          </p>
        </div>

        <div className="flex w-full max-w-[400px] flex-col gap-6">
          <div className="flex w-full flex-col gap-5">
            <Button
              onClick={handleSignIn}
              className="h-9 w-full bg-black text-white hover:bg-black/90 rounded-md shadow-sm text-sm font-medium cursor-pointer"
            >
              Login with Cognito
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

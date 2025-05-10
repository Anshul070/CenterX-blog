import React, { useState } from "react";
import type {SigninUser, SignupUser} from "@devxhustler/common"
import axios from "../utils/axios";
import AuthCard from "../components/AuthCard";
import { useNavigate } from "react-router";
type Mode = "signup" | "signin"; 
function Auth() {

  const navigate = useNavigate();

  const [mode, setMode] = useState<Mode>("signup");
  const signinInfo = {
    fields: ["Email", "Password"],
    placeholder: ["m@example.com", "abcd1234"],
    title: "Welcome back",
    subtitle: "No account ?",
    buttonText: "Craete one",
    actionButtonText: "Sign In",
    submitOperation: async (e: any) => {
      e.preventDefault();
      const formdata : SigninUser  = {
        email: e.target.elements[0].value,
        password: e.target.elements[1].value,
      };
        const res = await axios.post("/user/signin/", formdata);
        const token = res.headers["authorization"];
        if (token) {
          localStorage.setItem("token", token);
        }
        if (res.status === 200) {
          navigate("/blogs");
        }
    },
    toggleMode: () => {
      setMode((prevMode) => (prevMode === "signup" ? "signin" : "signup"));
    },
    tagline:
      "Welcome back to CenterX — your hub for ideas and inspiration. Sign in to continue exploring and expressing your voice.",
  };
  const signupInfo = {
    fields: ["Username", "Email", "Password"],
    placeholder: ["example123", "m@example.com", "abcd1234"],
    title: "Create an account",
    subtitle: "Already have an account ?",
    buttonText: "Login",
    actionButtonText: "Sign Up",
    submitOperation: async (e: any) => {
      e.preventDefault();
      const formdata :SignupUser  = {
        username: e.target.elements[0].value,
        email: e.target.elements[1].value,
        password: e.target.elements[2].value,
      };
        const res = await axios.post("/user/signup/", formdata);
        if (res.status === 200) {
            
        }
    },
    toggleMode: () => {
      setMode((prevMode) => (prevMode === "signup" ? "signin" : "signup"));
    },
    tagline:
      "Join CenterX and become part of a community where your thoughts matter. Create your account to start writing, sharing, and connecting.",
  };

  return mode === "signup" ? (
    <AuthCard info={signupInfo} />
  ) : (
    <AuthCard info={signinInfo} />
  );
}

export default Auth;

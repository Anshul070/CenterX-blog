import { useEffect, useState } from "react";
import type { SigninUser, SignupUser } from "@devxhustler/common";
import axios from "../utils/axios";
import AuthCard from "../components/AuthCard";
import { useNavigate } from "react-router";
import { OrbitProgress } from "react-loading-indicators";
import { useAuth } from "../hooks/auth";
type Mode = "signup" | "signin";
function Auth() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();
    useEffect(() => {
      if (!isLoading && isAuthenticated) {
        navigate('/blogs');
      }
    }, [isAuthenticated, isLoading, navigate]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [error]);

  const [mode, setMode] = useState<Mode>("signup");
  const signinInfo = {
    fields: ["email", "password"],
    placeholder: ["m@example.com", "abcd1234"],
    title: "Welcome back",
    subtitle: "No account ?",
    buttonText: "Craete one",
    actionButtonText: "Sign In",
    submitOperation: async (userInfo : SigninUser) => {
      setLoading(true);
      const formdata: SigninUser = {
        email: userInfo.email,
        password: userInfo.password,
      };
      try {
        const res = await axios.post("/user/signin/", formdata);
        if (res.status === 401) {
          alert("Invalid credentials");
          setLoading(false);
          return;
        }
        const token = res.headers["authorization"];
        if (token) {
          localStorage.setItem("token", token);
        }
        if (res.status === 200) {
          navigate("/blogs", {
            state: {
              name: res?.data?.data?.name,
            }
          });
        }
      } catch (err: any) {
        setError(err.response.data.error);
        setLoading(false);
      }
    },
    toggleMode: () => {
      setMode((prevMode) => (prevMode === "signup" ? "signin" : "signup"));
    },
    tagline:
      "Welcome back to CenterX — your hub for ideas and inspiration. Sign in to continue exploring and expressing your voice.",
  };
  const signupInfo = {
    fields: ["username", "email", "password"],
    placeholder: ["example123", "m@example.com", "abcd1234"],
    title: "Create an account",
    subtitle: "Already have an account ?",
    buttonText: "Login",
    actionButtonText: "Sign Up",
    submitOperation: async (userInfo : SignupUser) => {
      setLoading(true)
      const formdata: SignupUser = userInfo
      try {
      const res = await axios.post("/user/signup/", formdata);
      if (res.status === 400) {
          alert("Invalid credentials");
          setLoading(false);
          return;
        }
        const token = res.headers["authorization"];
        if (token) {
          localStorage.setItem("token", token);
        }
        if (res.status === 200) {
          navigate("/blogs", {
            state: {
              name: res.data.user.name,
            }
          });
        }
      } catch (err: any) {
        setError(err.response.data.error);
        setLoading(false);
      }
    },
    toggleMode: () => {
      setMode((prevMode) => (prevMode === "signup" ? "signin" : "signup"));
    },
    tagline:
      "Join CenterX and become part of a community where your thoughts matter. Create your account to start writing, sharing, and connecting.",
  };
  if (isLoading) {
      return (
        <div className="h-screen bg-white flex items-center justify-center">
          <OrbitProgress
            color="#00000070"
            size="medium"
            text="Loading"
            textColor="#000"
          />
        </div>
      );
    }

  return (
    <>
      <div
        className={`h-screen flex items-center justify-center w-full absolute bg-gray-300/50 backdrop-blur-xs z-100 ${
          loading ? "block" : "hidden "
        }`}
      >
        <OrbitProgress
          color="#00000070"
          size="medium"
          text="Loading"
          textColor="#000"
        />
      </div>
      <div className="fixed z-100 mt-4 w-full px-14 left-0 flex justify-center pointer-events-none">
        {error && (
          <div
            className="w-fit h-fit  border-red-400 border p-4  rounded-lg bg-red-50 text-red-400"
            role="alert"
          >
            <span className="font-medium">Error :</span> {error.toString()}
          </div>
        )}
      </div>
      {mode === "signup" ? (
        <AuthCard key={1} info={signupInfo} />
      ) : (
        <AuthCard key={2} info={signinInfo} />
      )}
    </>
  );
}

export default Auth;

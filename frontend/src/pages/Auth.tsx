import { useEffect, useState } from "react";
import type { SigninUser, SignupUser } from "@devxhustler/common";
import axios from "../utils/axios";
import AuthCard from "../components/AuthCard";
import { useNavigate } from "react-router";
import { OrbitProgress } from "react-loading-indicators";
type Mode = "signup" | "signin";
function Auth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
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
      } catch (err) {
        setError(err as any);
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
              name: res.data.user.name,
            }
          });
        }
      } catch (err) {
        setError(err as any);
        setLoading(false);
      }
    },
    toggleMode: () => {
      setMode((prevMode) => (prevMode === "signup" ? "signin" : "signup"));
    },
    tagline:
      "Join CenterX and become part of a community where your thoughts matter. Create your account to start writing, sharing, and connecting.",
  };

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
      {error && (
        <div className="absolute top-4 left-[50%] -translate-x-[50%] px-4 sm:px-10 md:px-20 xl:px-52">
          <div
            className="bg-red-100 border w-108 border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error.toString()}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
              </svg>
            </span>
          </div>
        </div>
      )}
      {mode === "signup" ? (
        <AuthCard key={1} info={signupInfo} />
      ) : (
        <AuthCard key={2} info={signinInfo} />
      )}
    </>
  );
}

export default Auth;

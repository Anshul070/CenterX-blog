import axios from "../utils/axios";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  function checkAuth() {
    if(!localStorage.getItem("token")){
        setIsLoading(false);
        return
    }

    axios
      .get("/user/isAuthenticated", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setIsAuthenticated(true);
        }
        if (res.status === 404) {
          setIsError(true);
        }
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  useEffect(() => {
        checkAuth();
  });

  return { isAuthenticated, isError, isLoading };
};

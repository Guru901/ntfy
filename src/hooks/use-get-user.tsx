"use client";

import { useUserStore } from "@/store/userStore";
import axios from "axios";
import { useState, useEffect } from "react";

export default function useGetUser() {
  const { user, setUser } = useUserStore();
  const [error, setError] = useState("");

  useEffect(() => {
    if (user._id.length === 0) {
      const fetchUser = async () => {
        try {
          const { data } = await axios.post("/api/getLoggedInUser");
          if (data.success === false) {
            setError("User not logged in");
            return;
          }
          setUser(data.user);
        } catch (error) {
          setError("error in getLoggedInUser");
        }
      };

      fetchUser();
    }
  }, [user, setUser]);

  return { user, error };
}

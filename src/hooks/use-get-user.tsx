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
          const { data } = await axios.get("/api/getLoggedInUser");
          if (data.success === false) {
            setError("User not logged in");
            return;
          }
          setUser({
            _id: data.user._id,
            username: data.user.username,
            wantImages: data.user.wantImages,
            wantQuesCount: data.user.wantQuesCount,
            whatToTrack: data.user.whatToTrack,
            email: data.user.email,
            topic: data.user.topic,
          });
        } catch (error) {
          setError("error in getLoggedInUser");
        }
      };

      fetchUser();
    }
  }, [user, setUser]);

  return { user, error };
}

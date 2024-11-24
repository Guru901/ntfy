import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "@/lib/type";

type UserState = {
  user: User;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: {
        _id: "",
        username: "",
        wantImages: false,
        wantQuesCount: false,
        whatToTrack: [
          {
            value: "",
            label: "",
          },
        ],
        email: "",
        topic: "",
      },
      setUser: (user) => set({ user }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

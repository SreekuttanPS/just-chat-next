"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { userStore } from "@/zustand/userStore";

type UserResponse = {
  username: string;
  name: string;
};

function GetUser() {
  const router = useRouter();
  const addUser = userStore((state) => state.addUser);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        console.log("res: ", res);

        if (res.ok) {
          const user: UserResponse = await res.json();
          addUser(user);
        } else {
          router.replace("/auth/login");
        }
      } catch {
        toast.error("Something went wrong, Please login again!");
      }
    }
    fetchUser();
  }, [addUser, router]);

  return null;
}

export default GetUser;

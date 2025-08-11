"use client";

import Link from "next/link";
import { useRef, useState } from "react";

type ErrorState = {
  username?: string;
  password?: string;
};

const userRegEx = /^[A-Za-z0-9]{4,12}$/;
const userError = "Are you sure this is the username? Check again.";

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{6,16}$/;
const passwordError = "Are you sure this is the password? Check again.";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<ErrorState>({});

  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Manual Validation
    const isUserNameValid = username.trim() && userRegEx.test(username);
    if (!isUserNameValid) {
      setError((prev) => ({
        ...prev,
        username: userError,
      }));
      userNameRef?.current?.focus();
      return;
    }

    const isPasswordValid = passwordRegEx.test(password);
    if (!isPasswordValid) {
      setError((prev) => ({
        ...prev,
        password: passwordError,
      }));
      passwordRef?.current?.focus();
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      alert("Logged in! Cookie is set 🍪");
    } else {
      const body = (await res.json()) as ErrorState;
      if (body?.username) {
        setError((prev) => ({
          ...prev,
          username: body?.username,
        }));
      }
      if (body?.password) {
        setError((prev) => ({
          ...prev,
          password: body?.password,
        }));
      }
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-3 max-w-sm mx-auto"
    >
      <input
        ref={userNameRef}
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setError({});
          setUsername(e.target.value);
        }}
        className="border p-2 rounded-md dark:text-gray-400 "
      />
      {error?.username ? (
        <p className="text-red-500">{error?.username}</p>
      ) : null}
      <input
        ref={passwordRef}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setError({});
          setPassword(e.target.value);
        }}
        className="border p-2 rounded-md dark:text-gray-400"
      />
      {error?.password ? (
        <p className="text-red-500">{error?.password}</p>
      ) : null}
      <button className="bg-blue-500 text-white p-2 rounded-md dark:invert">
        Login
      </button>
      <div className="text-center text-xs text-gray-400 mt-6">
        Don&apos;t have an account? Please{" "}
        <Link href={"/auth/signup"}>
          <u>Sign up</u>
        </Link>
      </div>
    </form>
  );
}

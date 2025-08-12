"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

type ErrorState = {
  name?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
  other?: string;
};

const nameError = "Name is required and must be at least 3 characters!";

const userRegEx = /^[A-Za-z0-9]+$/;
const userError =
  "Username is invalid, Please note that username can only contain letters and numbers and it is case sensitive.";

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{6,16}$/;
const passwordError =
  "Please enter a password with at lease one uppercase, one lowecase, one number and no whitespaces!";

const confirmPasswordError = "Passwords should match. No tricks please.";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<ErrorState>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Manual Validation
    const isNameValid = !!name.trim() && name.length >= 3;
    if (!isNameValid) {
      setError((prev) => ({
        ...prev,
        name: nameError,
      }));
      nameRef?.current?.focus();
      return;
    }

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

    const isConfirmPasswordValid = confirmPassword === password;
    if (!isConfirmPasswordValid) {
      setError((prev) => ({
        ...prev,
        confirmPassword: confirmPasswordError,
      }));
      confirmPasswordRef?.current?.focus();
      return;
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password }),
      });

      if (res.ok) {
        toast.success("User created successfully, Please login.")
        router.push("/auth/login");
      } else {
        console.log("res: ", res);
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
    } catch (e) {
      setError((prev) => ({
        ...prev,
        other: (e as Error)?.message,
      }));
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-3 max-w-sm mx-auto"
    >
      <input
        ref={nameRef}
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setError({});
          setName(e.target.value);
        }}
        className="border p-2 rounded-md dark:text-gray-400"
      />
      {error?.name ? <p className="text-red-500">{error?.name}</p> : null}
      <input
        ref={userNameRef}
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => {
          setError({});
          setUsername(e.target.value);
        }}
        className="border p-2 rounded-md dark:text-gray-400"
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
      <input
        ref={confirmPasswordRef}
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => {
          setError({});
          setConfirmPassword(e.target.value);
        }}
        className="border p-2 rounded-md dark:text-gray-400"
      />
      {error?.confirmPassword ? (
        <p className="text-red-500">{error?.confirmPassword}</p>
      ) : null}
      <button className="bg-blue-500 text-white p-2 rounded-md dark:invert">
        Sign Up
      </button>
      <div className="text-center text-xs text-gray-400 mt-6">
        Already have an account? Please{" "}
        <Link href={"/auth/login"}>
          <u>Sign in</u>
        </Link>
      </div>
    </form>
  );
}

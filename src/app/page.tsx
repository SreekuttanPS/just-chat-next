import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center h-screen gap-3">
      <Link href={"auth/login"} className="border p-3 rounded-2xl hover:scale-105 transition ease-in-out">
        Login
      </Link>
      <Link href={"auth/signup"} className="border p-3 rounded-2xl hover:scale-105 transition ease-in-out">
        Sign Up
      </Link>
    </div>
  );
}

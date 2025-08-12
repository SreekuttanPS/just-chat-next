import Link from "next/link";

import gitHub from "@/assets/github.svg";
import linkedIn from "@/assets/linkedin.svg";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br to-pink-500 text-white dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 dark:text-gray-100 p-3">
      {/* App Name */}
      <h1 className="text-4xl sm:text-6xl font-extrabold tracking-wide mb-4">
        Just <span className="text-blue-400">Chat</span>
      </h1>

      {/* Description */}
      <p className="text-center max-w-lg text-black mb-6 text-sm sm:text-base leading-relaxed dark:invert">
        <span className="font-bold">Just Chat</span> is your go-to real-time
        hangout spot — powered by <span className="font-semibold">Next.js</span>
        , <span className="font-semibold">Node.js</span>, and{" "}
        <span className="font-semibold">Socket.IO</span>, styled with sleek{" "}
        <span className="font-semibold">Tailwind CSS</span>, and deployed
        globally via <span className="font-semibold">Vercel</span> +{" "}
        <span className="font-semibold">Render</span>.<br />
        <br />
        Right now, we’ve got a lively{" "}
        <span className="font-semibold">common group chat</span> where everyone
        can vibe together.
        <span className="italic"> Direct messages?</span> Yeah, they’re in the
        oven — coming soon to make your convos even more personal.
        <br />
        <br />
        This is just the beginning, so hop in and be part of the build-in-public
        journey 🚀.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mb-8">
        <Link
          href="/auth/login"
          className="px-5 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition"
        >
          Login
        </Link>
        <Link
          href="/auth/signup"
          className="px-5 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition"
        >
          Signup
        </Link>
      </div>

      {/* Social Links */}
      Check my socials here.
      <div className="flex gap-6 text-2xl mt-2">
        <a
          href="https://github.com/SreekuttanPS"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          <Image src={gitHub} alt="GitHub" className="w-10 h-10 dark:invert" />
        </a>
        <a
          href="https://www.linkedin.com/in/sreekuttan-p-s"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          <Image
            src={linkedIn}
            alt="LinkedIn"
            className="w-10 h-10 dark:invert"
          />
        </a>
      </div>
    </main>
  );
}

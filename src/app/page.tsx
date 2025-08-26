import Image from "next/image";

import gitHub from "@/assets/github.svg";
import linkedIn from "@/assets/linkedin.svg";
import instagram from "@/assets/instagram.svg";
import HomPageAuthButtons from "@/components/HomPageAuthButtons";

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
        <span className="font-semibold">Render</span>.
        <br />
        <br />
        We&apos;ve got a lively{" "}
        <span className="font-semibold">common group chat</span> where everyone
        can vibe together, and now —{" "}
        <span className="font-semibold">direct messages</span> for those
        one-on-one convos.
        <br />
        <br />
        Everything runs on your{" "}
        <span className="font-semibold">local storage</span> for a fast,
        lightweight experience (so yeah, try not to mess with it unless
        you&apos;re feeling adventurous).
        <br />
        <br />
        ⚠️ Heads up: this project’s still in{" "}
        <span className="font-semibold">active development</span>, so you might
        run into the occasional bug or quirk — that’s all part of the ride 🚀.
        <br />
        <br />
        This is just the beginning 🚀 — got a feature idea?{" "}
        <span className="italic font-bold">Hit me up via my socials</span> and
        let&apos;s make it happen.
      </p>
      {/* Buttons */}
      <HomPageAuthButtons />
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
        <a
          href="https://www.instagram.com/zavian_._/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-400 transition"
        >
          <Image
            src={instagram}
            alt="LinkedIn"
            className="w-10 h-10 dark:invert"
          />
        </a>
      </div>
    </main>
  );
}

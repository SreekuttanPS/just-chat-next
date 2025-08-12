import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 dark:text-gray-100">
      {/* Outer wrapper */}
      <div className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg dark:bg-black">
        {/* Logo / Branding */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-400">
            Just Chat
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Welcome! Please fill your details.
          </p>
        </div>

        {/* Auth Page Content */}
        {children}

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} Just Chat. All rights reserved.
        </div>
      </div>
    </div>
  );
}

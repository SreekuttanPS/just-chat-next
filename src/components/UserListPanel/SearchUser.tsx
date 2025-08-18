"use client";
import React from "react";

function SearchUser() {
  return (
    <div className="p-3">
      <input
        type="text"
        placeholder="Search users..."
        className="w-full px-3 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white shadow-sm dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-400 dark:focus:ring-gray-100"
      />
    </div>
  );
}

export default SearchUser;

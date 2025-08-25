import React from "react";

function LoaderComponent() {
  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center
            bg-black/40 backdrop-blur-sm pointer-events-auto"
    >
      <div
        className="flex flex-col items-center gap-3"
        role="status"
        aria-live="polite"
      >
        <svg
          width="800px"
          height="800px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-3 size-10 animate-spin dark:invert"
        >
          <path
            d="M12 3V6M12 18V21M6 12H3M21 12H18M5.63672 5.63672L7.75977 7.75977M16.2422 16.2422L18.3633 18.3633M18.3652 5.63477L16.2441 7.75586M7.75781 16.2422L5.63477 18.3652"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="text-white text-sm">Loading…</p>
      </div>
    </div>
  );
}

export default LoaderComponent;

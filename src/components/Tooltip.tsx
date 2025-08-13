import { useState, useEffect, useRef } from "react";

export default function Tooltip({
  trigger,
  children,
  className,
}: {
  trigger: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
    tooltipRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "BUTTON") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block" ref={tooltipRef}>
      <div onClick={handleToggle} className="inline-flex">
        {trigger}
      </div>
      {isOpen && (
        <div
          className={`absolute z-50 mt-2 rounded-lg p-3 shadow-lg
          animate-fadeIn text-sm ${className || ""}`}
          onClick={handleClick}
        >
          {children}
        </div>
      )}
    </div>
  );
}

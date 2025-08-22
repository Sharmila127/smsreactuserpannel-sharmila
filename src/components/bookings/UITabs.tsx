import React from "react";

export const Tabs = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-full">{children}</div>;
};

export const TabsList = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex space-x-2 border-b">{children}</div>;
};

export const TabsTrigger = ({
  children,
  isActive,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  value: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 font-medium ${isActive ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
        } ${className}`}
    >
      {children}
    </button>
  );
};

import React from "react";

export interface NavIndicatorProps {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  className?: string;
}

export const NavIndicator: React.FC<NavIndicatorProps> = ({
  label,
  icon,
  onClick,
  isActive = false,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-lg
        font-medium text-sm transition duration-200
        cursor-pointer select-none
        ${
          isActive
            ? "bg-accent/20 text-accent border border-accent/50"
            : "bg-surface-secondary text-foreground border border-border hover:border-accent/50 hover:text-accent hover:bg-surface-secondary/80"
        }
        active:scale-95
        ${className}
      `}
    >
      {icon && <span className="text-lg">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};
import { Label as HeroLabel } from "@heroui/react";
import React from "react";

type LabelVariant =
  | "title"
  | "subtitle"
  | "text"
  | "info"
  | "link"
  | "required"
  | "disabled"
  | "invalid";

export interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  variant?: LabelVariant;
  isRequired?: boolean;
  isDisabled?: boolean;
  isInvalid?: boolean;
  className?: string;
  onClick?: () => void;
}

const variantStyles: Record<LabelVariant, string> = {
  title: "text-2xl font-bold text-foreground",
  subtitle: "text-lg font-semibold text-foreground",
  text: "text-base font-normal text-foreground",
  info: "text-sm font-normal text-muted italic",
  link: "text-base font-medium text-link hover:opacity-80 cursor-pointer underline",
  required: "text-base font-normal text-foreground",
  disabled: "text-base font-normal opacity-50 cursor-not-allowed",
  invalid: "text-base font-normal text-danger",
};

export const Label: React.FC<LabelProps> = ({
  htmlFor,
  children,
  variant = "text",
  isRequired = false,
  isDisabled = false,
  isInvalid = false,
  className = "",
  onClick,
}) => {
  let finalVariant = variant;
  if (isDisabled) finalVariant = "disabled";
  if (isInvalid) finalVariant = "invalid";

  const baseClasses = variantStyles[finalVariant];
  const requiredIndicator = isRequired ? " *" : "";

  if (variant === "link") {
    return (
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
        }}
        className={`${baseClasses} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <HeroLabel
      htmlFor={htmlFor}
      isRequired={isRequired}
      isDisabled={isDisabled}
      isInvalid={isInvalid}
      className={`${baseClasses} ${className}`}
    >
      {children}
      {requiredIndicator && (
        <span className="text-danger">{requiredIndicator}</span>
      )}
    </HeroLabel>
  );
};

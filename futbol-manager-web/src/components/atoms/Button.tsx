"use client";

import { Button as HeroButton, Spinner } from "@heroui/react";
import React, { ReactNode } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "outline"
  | "ghost"
  | "danger"
  | "danger-soft";

type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void | Promise<void>;
  onPress?: () => void | Promise<void>;
  isDisabled?: boolean;
  isIconOnly?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
  loadingText?: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  onPress,
  isDisabled = false,
  isIconOnly = false,
  fullWidth = false,
  isLoading = false,
  icon,
  loadingText = "Loading...",
  className = "",
  type = "button",
  ariaLabel,
}) => {
  const handlePress = () => {
    if (onClick) {
      onClick();
    }
    if (onPress) {
      onPress();
    }
  };

  return (
    <HeroButton
      size={size}
      variant={variant}
      isDisabled={isDisabled || isLoading}
      isIconOnly={isIconOnly}
      fullWidth={fullWidth}
      isPending={isLoading}
      onPress={handlePress}
      type={type}
      aria-label={ariaLabel}
      className={className}
    >
      {isLoading && isIconOnly ? (
        <Spinner color="current" size="sm" />
      ) : isLoading ? (
        <>
          <Spinner color="current" size="sm" />
          {loadingText}
        </>
      ) : (
        <>
          {icon && icon}
          {children}
        </>
      )}
    </HeroButton>
  );
};
import {
  Description,
  FieldError,
  Input as HeroInput,
  Label,
  TextField,
} from "@heroui/react";
import React, { useState } from "react";

type InputType = "text" | "password" | "number" | "email" | "url" | "tel";

export interface InputProps {
  id?: string;
  name: string;
  type?: InputType;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  description?: string;
  maxLength?: number;
  minLength?: number;
  min?: number;
  max?: number;
  className?: string;
  isDisabled?: boolean;
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type = "text",
  label,
  placeholder,
  value = "",
  onChange,
  isRequired = false,
  isInvalid = false,
  errorMessage,
  description,
  maxLength,
  minLength,
  min,
  max,
  className = "w-full max-w-sm",
  isDisabled = false,
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const displayValue = value !== undefined ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const characterCount = displayValue.length;
  const maxLengthReached = maxLength && characterCount >= maxLength;

  return (
    <TextField
      id={id}
      name={name}
      type={type}
      isRequired={isRequired}
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      className={className}
    >
      <Label>{label}</Label>
      <HeroInput
        id={id}
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        maxLength={maxLength}
        min={type === "number" ? min : undefined}
        max={type === "number" ? max : undefined}
        className={maxLengthReached ? "text-warning" : ""}
      />
      {errorMessage && !isInvalid ? (
        <Description>{errorMessage}</Description>
      ) : null}
      {isInvalid && errorMessage && <FieldError>{errorMessage}</FieldError>}
      {description && !isInvalid && <Description>{description}</Description>}
      {maxLength && (
        <Description
          className={maxLengthReached ? "text-warning font-semibold" : ""}
        >
          {characterCount}/{maxLength} caracteres
        </Description>
      )}
    </TextField>
  );
};

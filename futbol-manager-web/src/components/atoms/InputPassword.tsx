import { Eye, EyeSlash } from "@gravity-ui/icons";
import {
  Description,
  FieldError,
  Label,
  TextField,
  InputGroup,
  Button,
} from "@heroui/react";
import React, { useState } from "react";

export interface InputPasswordProps {
  name: string;
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  isRequired?: boolean;
  isInvalid?: boolean;
  errorMessage?: string;
  description?: string;
  className?: string;
}

export const InputPassword: React.FC<InputPasswordProps> = ({
  name,
  label,
  placeholder,
  value = "",
  onChange,
  isRequired = false,
  isInvalid = false,
  errorMessage,
  description,
  className = "w-full max-w-sm",
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const displayValue = value !== undefined ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <TextField
      name={name}
      isRequired={isRequired}
      isInvalid={isInvalid}
      className={className}
    >
      <Label>{label}</Label>
      <InputGroup>
        <InputGroup.Input
          placeholder={placeholder}
          type={isPasswordVisible ? "text" : "password"}
          value={displayValue}
          onChange={handleChange}
        />
        <InputGroup.Suffix className="pr-0">
          <Button
            isIconOnly
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            size="sm"
            variant="ghost"
            onPress={togglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <Eye className="size-4" />
            ) : (
              <EyeSlash className="size-4" />
            )}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
      {isInvalid && errorMessage && <FieldError>{errorMessage}</FieldError>}
      {description && !isInvalid && <Description>{description}</Description>}
    </TextField>
  );
};

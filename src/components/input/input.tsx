import { Input as AntInput } from "antd";
import type { InputProps, InputRef } from "antd/es/input";
import React from "react";

export const Input = React.forwardRef<InputRef, InputProps>(
  (
    {
      placeholder,
      variant = "outlined",
      size = "large",
      className,
      onChange,
      type = "text",
      ...rest
    },
    ref
  ) => {
    return (
      <AntInput
        placeholder={placeholder}
        variant={variant}
        size={size}
        className={className}
        onChange={onChange}
        type={type}
        ref={ref}
        {...rest}
      />
    );
  }
);

// Optional: give the component a display name for debugging
Input.displayName = "Input";

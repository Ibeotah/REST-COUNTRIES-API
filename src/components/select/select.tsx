import type { SelectProps } from "antd";
import { Select as AntSelect } from "antd";

// You might add defaultValue
// defaultValue = "lucy";
export const Select: React.FC<SelectProps> = ({
  onChange,
  options,
  defaultValue,
    className,
  placeholder,
  ...rest
}) => {
  return (
    <AntSelect
      onChange={onChange}
      options={options}
      defaultValue={defaultValue}
          className={className}
      placeholder={placeholder}
      {...rest}
    />
  );
};

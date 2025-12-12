import { forwardRef } from "react";

type Props = {
  id: string;
  name: string;
  label: string;
  className?: string;
  type: string;
  placeholder: string;
  errorMs?: string;
  value?: string;
  defaultValue?: string;
  max?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      name,
      label,
      type = "text",
      placeholder,
      className = "",
      onChange,
      errorMs = "",
      value,
      defaultValue,
      max,
    },
    ref
  ) => {
    return (
      <div className="flex flex-col">
        <label htmlFor={id} className="font-bold flex items-end">
          {label}
        </label>

        <input
          maxLength={max}
          ref={ref}
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          className={`
            outline-none border border-gray-300 rounded-lg py-2.5 indent-2.5 
            focus-visible:border-blue-600
            ${className}
          `}
        />

        {errorMs && (
          <span className="text-red-600 text-sm mt-1">{errorMs}</span>
        )}
      </div>
    );
  }
);

export default Input;

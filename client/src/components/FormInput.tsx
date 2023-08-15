import React,{ChangeEvent} from "react";

interface FormInputProps {
  type: React.HTMLInputTypeAttribute;
  name: string;
  onChange:(field: string | ChangeEvent<any>) => void;
  value: string;
  label: string;
}

const FormInput: React.FC<FormInputProps> = ({
  type,
  name,
  onChange,
  value,
  label,
}) => {
  return (
    <div className="relative z-0 w-full group">
      <input
        type={type}
        name={name}
        id={`floating_${name}`}
        className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent rounded-md border border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
        onChange={onChange}
        value={value}
      />
      <label
        htmlFor={`floating_${name}`}
        className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 z-10 bg-white px-1 origin-[0] left-1 peer-focus:left-1 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label}
      </label>
    </div>
  );
};

export default FormInput;

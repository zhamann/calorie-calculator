import React, { ChangeEvent } from 'react';

interface SelectInputProps {
  name: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ name, value, options, onChange }) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="border border-gray-300 p-2 bg-white rounded mb-4 appearance-none"
      style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
    >
      <option value="">{name}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;

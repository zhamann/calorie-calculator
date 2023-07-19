import React, { ChangeEvent } from 'react';

interface MeasurementInputProps {
  label: string;
  value: string;
  unitValue: string;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onUnitChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  unitOptions: { label: string; value: string }[];
}

const MeasurementInput: React.FC<MeasurementInputProps> = ({
  label,
  value,
  unitValue,
  onInputChange,
  onUnitChange,
  unitOptions,
}) => {
  const inputName = `${label.toLowerCase()}Value`; // e.g., "weightValue" or "heightValue"
  const unitName = `${label.toLowerCase()}Unit`; // e.g., "weightUnit" or "heightUnit"

  return (
    <div className="flex mb-4">
      <input
        type="number"
        name={inputName}
        placeholder={label}
        value={value}
        onChange={onInputChange}
        className="border border-gray-300 p-2 rounded mr-2"
      />
      <select
        name={unitName}
        value={unitValue}
        onChange={onUnitChange}
        className="border border-gray-300 p-2 rounded appearance-none w-full"
        style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
      >
        {unitOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MeasurementInput;

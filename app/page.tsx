'use client'

import { useState, ChangeEvent } from 'react';

interface FormData {
  weightValue: string;
  weightUnit: string;
  heightValue: string;
  heightUnit: string;
  age: string;
  activity: string;
}

const InputCard: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    weightValue: '',
    weightUnit: 'lb',
    heightValue: '',
    heightUnit: 'in',
    age: '',
    activity: '',
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleWeightUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      weightUnit: value,
    }));
  };

  const handleHeightUnitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      heightUnit: value,
    }));
  };

  const handleCalculate = () => {
    // Perform calculation logic here based on the form data
    // Example: console.log(formData);
  };

  return (
    <div>
      <div className="card border p-4 rounded mb-4 bg-white drop-shadow-md flex flex-col">
        <div className="flex mb-4">
          <input
            type="number"
            name="weightValue"
            placeholder="Weight"
            value={formData.weightValue}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded mr-2"
          />
          <select
            name="weightUnit"
            value={formData.weightUnit}
            onChange={handleWeightUnitChange}
            className="border border-gray-300 p-2 rounded appearance-none"
            style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
          >
            <option value="lb">lb</option>
            <option value="kg">kg</option>
          </select>
        </div>
        <div className="flex mb-4">
          <input
            type="number"
            name="heightValue"
            placeholder="Height"
            value={formData.heightValue}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded mr-2"
          />
          <select
            name="heightUnit"
            value={formData.heightUnit}
            onChange={handleHeightUnitChange}
            className="border border-gray-300 p-2 rounded appearance-none"
            style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
          >
            <option value="in">in</option>
            <option value="cm">cm</option>
          </select>
        </div>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded mb-4"
        />
        <select
          name="activity"
          value={formData.activity}
          onChange={handleInputChange}
          className="border border-gray-300 p-2 rounded mb-4 appearance-none"
          style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
        >
          <option value="">Activity Level</option>
          <option value="1">1 - Sedentary</option>
          <option value="2">2 - Lightly Active</option>
          <option value="3">3 - Moderately Active</option>
          <option value="4">4 - Very Active</option>
          <option value="5">5 - Super Active</option>
        </select>
        <button
          type="button"
          onClick={handleCalculate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default InputCard;

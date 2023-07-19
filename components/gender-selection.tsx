import React from 'react';

interface GenderSelectionProps {
  selectedGender: string;
  onGenderChange: (gender: string) => void;
}

const GenderSelection: React.FC<GenderSelectionProps> = ({ selectedGender, onGenderChange }) => {
  return (
    <div className="flex mb-4">
      <div className="flex items-center w-full">
        <button
          type="button"
          onClick={() => onGenderChange('male')}
          className={`border p-2 rounded-l w-full ${
            selectedGender === 'male' ? 'bg-blue-500 text-white' : 'bg-white text-black'
          }`}
        >
          Male
        </button>
        <button
          type="button"
          onClick={() => onGenderChange('female')}
          className={`border p-2 rounded-r w-full ${
            selectedGender === 'female' ? 'bg-blue-500 text-white' : 'bg-white text-black'
          }`}
        >
          Female
        </button>
      </div>
    </div>
  );
};

export default GenderSelection;

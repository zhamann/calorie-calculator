'use client'

import { useState, ChangeEvent } from 'react';
import data from '../data/inputs.json';

const activityLevels = data.activityLevels
const goals = data.goals

import GenderSelection from '../components/gender-selection';
import MeasurementInput from '../components/measurement-input';
import SelectInput from '../components/select-input';
import ResultsCard from '../components/results-card';

interface FormData {
  gender: string;
  weightValue: string;
  weightUnit: string;
  heightValue: string;
  heightUnit: string;
  age: string;
  activity: string;
  goal: string;
}

const HomePage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    gender: 'male',
    weightValue: '',
    weightUnit: 'lb',
    heightValue: '',
    heightUnit: 'in',
    age: '',
    activity: '',
    goal: '',
  });

  const [showResults, setShowResults] = useState(false);
  const [bmrResult, setBmrResult] = useState<number | null>(null);
  const [tdeeResult, setTdeeResult] = useState<number | null>(null);
  const [goalResult, setGoalResult] = useState<number | null>(null);

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

  const handleGenderChange = (selectedGender: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      gender: selectedGender,
    }));
  };

  const handleActivityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      activity: value,
    }));
  };
  
  const handleGoalChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      goal: value,
    }));
  };

  const validateFormData = (): boolean => {
    const {
      weightValue,
      heightValue,
      age,
      activity,
      goal,
    } = formData;

    const weight = parseFloat(weightValue);
    const height = parseFloat(heightValue);
    const ageValue = parseInt(age);

    if (isNaN(weight) || isNaN(height) || isNaN(ageValue)) {
      return false;
    }

    const activityOption = activityLevels.find((level) => level.value === activity);
    if (!activityOption) {
      return false;
    }

    const goalOption = goals.find((goalItem) => goalItem.value === goal);
    if (!goalOption) {
      return false;
    }

    return true;
  };

  const handleCalculate = () => {
    const isValid = validateFormData();

    if (!isValid) {
      return;
    }

    const gender = formData.gender;
    var weight = parseFloat(formData.weightValue);
    const weightUnit = formData.weightUnit;
    var height = parseFloat(formData.heightValue);
    const heightUnit = formData.heightUnit;
    const age = parseInt(formData.age);
    const selectedActivity = activityLevels.find((level) => level.value === formData.activity);
    const selectedGoal = goals.find((goal) => goal.value === formData.goal);

    if (weight && height && age && selectedActivity && selectedGoal) {
      if (weightUnit === 'lb') {
        weight /= 2.205;
      }
      if (heightUnit === 'in') {
        height *= 2.54;
      }

      const activityMultiplier = selectedActivity.multiplier;
      const goalMultiplier = selectedGoal.multiplier;

      // Calculate the Basal Metabolic Rate (BMR)
      var bmr = 0
      if (gender === 'male') {
        var bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      } else {
        var bmr = 10 * weight + 6.25 * height - 5 * age - 161;
      }
      setBmrResult(Math.round(bmr));

      // Calculate the Total Daily Energy Expenditure (TDEE)
      const tdee = bmr * activityMultiplier;
      setTdeeResult(Math.round(tdee));

      // Calculate the Goal
      const goal = tdee * goalMultiplier;
      setGoalResult(Math.round(goal));
    }

    setShowResults(true);
  };

  const handleGoBack = () => {
    setBmrResult(null);
    setTdeeResult(null);
    setGoalResult(null);
    setShowResults(false);
  };

  return (
    <div>
      <div className="card-wrapper flex justify-center">
        <div className={`card border p-4 drop-shadow-md rounded mb-4 bg-white flex flex-col ${showResults ? 'hidden' : ''}`}>
          <GenderSelection selectedGender={formData.gender} onGenderChange={handleGenderChange} />

          <MeasurementInput
            label="Weight"
            value={formData.weightValue}
            unitValue={formData.weightUnit}
            onInputChange={handleInputChange}
            onUnitChange={handleWeightUnitChange}
            unitOptions={[{ label: 'lb', value: 'lb' }, { label: 'kg', value: 'kg' }]}
          />

          <MeasurementInput
            label="Height"
            value={formData.heightValue}
            unitValue={formData.heightUnit}
            onInputChange={handleInputChange}
            onUnitChange={handleHeightUnitChange}
            unitOptions={[{ label: 'in', value: 'in' }, { label: 'cm', value: 'cm' }]}
          />

          <input
            type="text"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleInputChange}
            inputMode="numeric"
            className="border border-gray-300 p-2 rounded mb-4"
          />

          <SelectInput
            name="Activity Level"
            value={formData.activity}
            options={activityLevels.map((level) => ({ label: level.label, value: level.value }))}
            onChange={handleActivityChange}
          />

          <SelectInput
            name="Goal"
            value={formData.goal}
            options={goals.map((goal) => ({ label: goal.label, value: goal.value }))}
            onChange={handleGoalChange}
          />

          <button
            type="button"
            onClick={handleCalculate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Calculate
          </button>
        </div>

        {showResults && (
          <ResultsCard bmr={bmrResult} tdee={tdeeResult} goal={goalResult} onGoBack={handleGoBack} />
        )}
      </div>
    </div>
  );
};

export default HomePage;

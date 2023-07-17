'use client'

import { useState, ChangeEvent } from 'react';
import { activityLevels, goals } from '../data.json'; // Import the activityLevels and goals data

interface FormData {
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
    weightValue: '',
    weightUnit: 'lb',
    heightValue: '',
    heightUnit: 'in',
    age: '',
    activity: '',
    goal: '',
  });

  const [showResults, setShowResults] = useState(false);
  const [bmrResult, setBmrResult] = useState<number | null>(null); // State to hold the BMR result
  const [tdeeResult, setTdeeResult] = useState<number | null>(null); // State to hold the TDEE result
  const [goalResult, setGoalResult] = useState<number | null>(null); // State to hold the Goal result

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
      const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
      setBmrResult(Math.round(bmr)); // Set the BMR result in the state

      // Calculate the Total Daily Energy Expenditure (TDEE)
      const tdee = bmr * activityMultiplier;
      setTdeeResult(Math.round(tdee)); // Set the TDEE result in the state

      // Calculate the Goal
      const goal = tdee * goalMultiplier;
      setGoalResult(Math.round(goal)); // Set the goal result in the state
    }

    setShowResults(true); // Show the results after calculation
  };

  const handleGoBack = () => {
    setBmrResult(null); // Reset the BMR result
    setTdeeResult(null); // Reset the TDEE result
    setGoalResult(null); // Reset the Goal result
    setShowResults(false); // Go back to the input form
  };

  return (
    <div>
      <div className="card-wrapper">
        <div
          className={`card border p-4 drop-shadow-md rounded mb-4 bg-white flex flex-col ${
            showResults ? 'hidden' : ''
          }`}
        >
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
            {activityLevels.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
          <select
            name="goal"
            value={formData.goal}
            onChange={handleInputChange}
            className="border border-gray-300 p-2 rounded mb-4 appearance-none"
            style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
          >
            <option value="">Goal</option>
            {goals.map((goal) => (
              <option key={goal.value} value={goal.value}>
                {goal.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleCalculate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Calculate
          </button>
        </div>
        {showResults && (
          <div className="card border p-4 drop-shadow-md rounded mb-4 bg-white">
            <div className="flex">
              <div className="w-1/2 pr-4">
                <h2 className="text-2xl font-bold mb-4">Results</h2>
                <p>Basal Metabolic Rate (BMR): {bmrResult}</p>
                <p>Total Daily Energy Expenditure (TDEE): {tdeeResult}</p>
                <p>Goal: {goalResult}</p>

                <button
                  type="button"
                  onClick={handleGoBack}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;

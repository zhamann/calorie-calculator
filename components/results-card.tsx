import React from 'react';
import ReactMarkdown from 'react-markdown';
import resultsText from '../data/resultsText';

interface ResultsCardProps {
  bmr: number | null;
  tdee: number | null;
  goal: number | null;
  onGoBack: () => void;
}

const ResultsCard: React.FC<ResultsCardProps> = ({ bmr, tdee, goal, onGoBack }) => {
  return (
    <div className="card border mt-4 sm:mt-12 mb-4 sm:mb-12 ml-4 mr-4 p-4 sm:p-8 drop-shadow-md rounded bg-white flex flex-col max-w-2xl">
      <button
        type="button"
        onClick={onGoBack}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-8"
      >
        Back
      </button>
      
      <p>
        Basal Metabolic Rate (BMR): <strong>{bmr}</strong> calories per day.
      </p>
      <p>
        Total Daily Energy Expenditure (TDEE): <strong>{tdee}</strong> calories per day.
      </p>
      <p>
        Goal Calories: <strong>{goal}</strong> calories per day.
      </p>

      <ReactMarkdown className='mt-8 whitespace-pre-wrap'>{resultsText}</ReactMarkdown>

      <button
        type="button"
        onClick={onGoBack}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Back
      </button>
    </div>
  );
};

export default ResultsCard;

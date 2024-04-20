import React from 'react';
import { Bar } from 'react-chartjs-2';

// Redefining the types based on your usage for predictions
type Prediction = {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
  class: string;
  class_id: number;
  detection_id: string;
};

// Definition for the list of predictions
type PredictionsData = Prediction[];

// Props for the BarChartWithPredictions component
type Props = {
  predictions: PredictionsData;
};

const BarChartWithPredictions: React.FC<Props> = ({ predictions }) => {
  let count = 1;
  
  return (
    <div className='flex flex-row'>
      {predictions.map(prediction => (
        <div key={prediction.detection_id} style={{ marginRight: '20px' }}>
          <h2>Area {count++}: {Math.round(prediction.confidence * 100)}%</h2>
          <Bar
            data={{
              labels: ['Confidence'],
              datasets: [
                {
                  label: 'Confidence',
                  data: [Math.round(prediction.confidence * 100)],
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1,
                }
              ]
            }}
            options={{
              scales: {
                y: {
                  min: 0,
                  max: 100,
                }
              },
              maintainAspectRatio: false
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default BarChartWithPredictions;

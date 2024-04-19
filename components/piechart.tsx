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
  return (
  
    <div className='flex flex-row'>
      {predictions.map(prediction => (
        <div key={prediction.detection_id} style={{ marginRight: '20px' }}>
          <h2>Bar Chart - Confidence: {Math.round(prediction.confidence * 100)}%</h2>
          <Bar
            data={{
              labels: ['Confidence'],  // Just showing confidence, no 'Other' for bars
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
                  min: 80,     // Starting at 0 for full effect
                  max: 100,   // 100% as maximum
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
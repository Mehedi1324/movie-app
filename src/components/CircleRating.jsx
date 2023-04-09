import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const CircleRating = ({ rating }) => {
  return (
    <div className="w-12 h-12 font-bold rounded-full bg-slate-200 md:w-14 md:h-14 lg:w-16 lg:h-16">
      <CircularProgressbar
        value={rating}
        styles={buildStyles({
          textColor: 'black',

          trailColor: 'white',
          backgroundColor: 'white',
          textSize: '26px',
          fontWeight: '800',
          pathColor: `${
            rating < 5 ? 'red' : `${rating < 7 ? 'orange' : 'green'}`
          }`,
        })}
        maxValue={10}
        text={rating}
      />
    </div>
  );
};

export default CircleRating;

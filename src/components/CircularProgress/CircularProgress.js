import React from 'react';

import { CircularProgress } from '@material-ui/core';
import './CircularProgress.css'

 export const CircularProgressComponent = props =>  {
  const {} = props;

  return (
    <div className="circular-progress-container">
      <CircularProgress />
    </div>
  );
}
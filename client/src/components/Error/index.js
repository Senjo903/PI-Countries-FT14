import React from 'react';
import './Error.css';

function ErrorMsj(error) {
  return (
    <div className="style-error">
        <div className="box-error">
          <h2 className="red">
            Error: {error.data}
          </h2>
        </div>
    </div>
  )
};

export default ErrorMsj;
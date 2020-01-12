import React from "react";

const Error = props => (
  <div className='container'>
    <div className='row'>
      <div className='col text-center mt-5'>
        <strong>
          <p className='text-danger'>{`Error: ${props.message}`}</p>
        </strong>
      </div>
    </div>
  </div>
);

export default Error;

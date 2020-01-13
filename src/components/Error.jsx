import React from "react";

const Error = props => {
  let styles = props.styles;
  return (
    <div
      className='container d-flex align-items-center justify-content-center'
      style={{ height: "80vh", overflow: "hidden" }}
    >
      <div className='row'>
        <div className='col text-center mt-5'>
          <strong>
            <p className={styles}>{props.message}</p>
          </strong>
        </div>
      </div>
    </div>
  );
};

export default Error;

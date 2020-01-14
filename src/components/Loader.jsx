import React from "react";
//Assets
import "../assets/styles/Loader.css";

const Loader = () => (
  <div className='row'>
    <div className='col-12 loader-content'>
      <div className='lds-default'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  </div>
);

export default Loader;

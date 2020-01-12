//React
import React from "react";

//Assets
import instaLogo from "../assets/static/insta-logo.png";
import "../assets/styles/Header.css";

const Header = props => {
  return (
    <nav className='navbar container-fluid navbar-light bg-light fixed-top down-line'>
      <div className='container justify-content-center'>
        <div className='row'>
          <div className='col-2 d-flex align-items-center'>
            <img style={{ maxHeight: "40px" }} src={instaLogo} alt='' />
          </div>
          <div className='col-9 d-flex align-items-center'>
            <form
              onSubmit={e => {
                e.preventDefault();
              }}
              className='form-inline ml-auto'
            >
              <input
                className='form-control mr-sm-2'
                type='search'
                placeholder='Search by tag'
                aria-label='Search'
              />
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

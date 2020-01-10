//React
import React from "react";

//Assets
import instaLogo from "../assets/static/insta-logo.png";
import "../assets/styles/Header.css";

const Header = () => (
  <header className='container-fluid bg-custom py-2'>
    <div className='text-white d-flex'>
      <div className='mx-auto'>
        <img src={instaLogo} alt='' />
        <strong>InstaPet</strong>
      </div>
    </div>
  </header>
);

export default Header;

import React from "react";
import instaLogo from "../assets/static/insta-logo.png";

const Header = () => (
  <header>
    <div className='container-fluir bg-dark text-white d-flex align-items-center'>
      <a className='mx-auto text-decoration-none'>
        <img src={instaLogo} alt='' />
        <strong>InstaPet</strong>
      </a>
    </div>
  </header>
);

export default Header;

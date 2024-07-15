import React from 'react';
import Logo from '../atoms/logo.atom';

const Header = () => (
  <div className="bg-white shadow-md p-4 flex justify-between items-center">
    <Logo />
  </div>
);

export default Header;

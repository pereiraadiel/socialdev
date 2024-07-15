import React from 'react';
import { Link } from 'react-router-dom';

type NavItemProps = {
  icon: React.ReactNode;
  label: string;
  link: string;
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, link }) => (
  <Link to={link} className="flex items-center p-2 hover:bg-gray-200 rounded cursor-pointer">
    <span className="text-gray-600">{icon}</span>
    <span className="ml-2 text-gray-700">{label}</span>
  </Link>
);

export default NavItem;

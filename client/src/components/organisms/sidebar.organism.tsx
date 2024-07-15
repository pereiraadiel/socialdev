import NavItem from '../molecules/navitem.molecule';
import { User, Home } from 'lucide-react'

const Sidebar = () => (
  <div className="w-64 bg-white shadow-md h-screen p-4">
    <NavItem icon={<Home />} label="Feed" link="/"/>
    <NavItem icon={<User />} label="Perfil" link="/u/adiel" />
  </div>
);

export default Sidebar;

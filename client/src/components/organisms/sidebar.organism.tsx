import { useEffect, useState } from 'react';
import NavItem from '../molecules/navitem.molecule';
import { User, Home, LogOut } from 'lucide-react'
import Button from '../atoms/button.atom';
import { ApiIntegration } from '../../integrations/api.integration';

const Sidebar = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('@socialdev:username') || '');
  }, []);

  const handleLogout = () => {
    ApiIntegration.logout();
    window.location.reload();
  }

  if(!username) return null;

  return (
    <div className="w-64 bg-white shadow-md h-screen-minus-68 p-4 flex flex-col justify-between">
      <div className="flex flex-col">
        <NavItem icon={<Home />} label="Feed" link="/"/>
        <NavItem icon={<User />} label="Perfil" link={`/u/${username}`}/>
      </div>

      <Button text='Sair da conta' className='w-full uppercase' onClick={handleLogout} />
    </div>
  )
};

export default Sidebar;

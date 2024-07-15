import { FormEvent, useState } from 'react';
import InputField from '../atoms/input-field.atom';
import Button from '../atoms/button.atom';
import Form from '../molecules/form.molecule';
import { Link, useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
		setIsLoading(true);
    // Implement your sign-in logic here
    console.log('Username:', username);
    console.log('Password:', password);
		setTimeout(() => {
			setIsLoading(false);
			setUsername('');
			setPassword('');
			navigate('/')
		}, 5000);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Form onSubmit={handleSubmit} isLoading={isLoading}>
        <h2 className="text-2xl font-bold mb-6 text-center">SocialDEV</h2>
        <InputField 
          label="Usuário" 
          type="text" 
          name="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <InputField 
          label="Senha" 
          type="password" 
          name="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
				<div className='flex items-center'>
					<Button text="Entrar" type="submit" className='flex-1'/>
					<Link to="/sign/up" className='text-blue-500 font-bold ml-4'>Registrar-se</Link>
				</div>
      </Form>
    </div>
  );
};

export default SignInPage;

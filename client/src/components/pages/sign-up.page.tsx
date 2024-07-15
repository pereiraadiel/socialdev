import { FormEvent, useState } from 'react';
import InputField from '../atoms/input-field.atom';
import Button from '../atoms/button.atom';
import Form from '../molecules/form.molecule';
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
		setIsLoading(true);
    // Implement your sign-up logic here
    console.log('Username:', username);
    console.log('Nome:', name);
    console.log('Sobrenome:', lastname);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
		if(password !== confirmPassword) {
			alert('As senhas não coincidem');
			setIsLoading(false);
			return;
		}
		setTimeout(() => {
			setIsLoading(false);
			setName('');
			setLastname('');
			setUsername('');
			setPassword('');
			setConfirmPassword('')
			navigate('/sign/in')
		}, 5000);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Form onSubmit={handleSubmit} isLoading={isLoading}>
        <h2 className="text-2xl font-bold mb-6 text-center">SocialDEV</h2>
        <InputField 
          label="Nome" 
          type="text" 
          name="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <InputField 
          label="Sobrenome" 
          type="text" 
          name="lastname" 
          value={lastname} 
          onChange={(e) => setLastname(e.target.value)} 
        />
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
        <InputField 
          label="Confirme a senha" 
          type="password" 
          name="confirmPassword" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
        <div className='flex items-center'>
					<Link to="/sign/in" className='text-blue-500 font-bold mr-4 flex-1'>Entrar</Link>
					<Button text="Registrar" type="submit" className='w-[50%]'/>
				</div>
      </Form>
    </div>
  );
};

export default SignUpPage;

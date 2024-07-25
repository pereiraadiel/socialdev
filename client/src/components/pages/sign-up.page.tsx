import { FormEvent, useEffect, useState } from 'react';
import InputField from '../atoms/input-field.atom';
import Button from '../atoms/button.atom';
import Form from '../molecules/form.molecule';
import { Link, useNavigate } from 'react-router-dom';
import { ApiIntegration } from '../../integrations/api.integration';
import { Boy, Girl } from '@mui/icons-material';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [biography, setBiography] = useState('');
  const [password, setPassword] = useState('');
  const [sex, setSex] = useState<'MALE' | 'FEMALE'>('MALE');
  const [confirmPassword, setConfirmPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    username: '',
    name: '',
    biography: '',
    lastname: '',
    password: '',
    confirmPassword: ''
  });
	const navigate = useNavigate();

  useEffect(() => {
    setError({
      username: '',
      name: '',
      biography: '',
      lastname: '',
      password: '',
      confirmPassword: ''
    });
  }, [username, name, lastname, password, confirmPassword, biography])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
		setIsLoading(true);
    if(!username || !name || !lastname || !password || !confirmPassword || !biography) {
      setError({
        username: !username ? 'Preencha este campo': '',
        name: !name ? 'Preencha este campo': '',
        lastname: !lastname ? 'Preencha este campo': '',
        password: !password ? 'Preencha este campo' : '',
        confirmPassword: !confirmPassword ? 'Preencha este campo' : '',
        biography: !biography ? 'Preencha este campo' : ''
      })
      setIsLoading(false);
      return;
    }
		if(password !== confirmPassword) {
      setError({
        username: '',
        name: '',
        biography: '',
        lastname: '',
        password: 'As senhas não coincidem',
        confirmPassword: 'As senhas não coincidem'
      })
			setIsLoading(false);
			return;
		}

    function resetInputFields() {
      setUsername('');
      setName('');
      setLastname('');
      setPassword('');
      setConfirmPassword('');
    }

    ApiIntegration.registerUser({ 
      username, 
      firstName: name, 
      lastName: lastname,
      biography,
      sex,
      pictureURL: `https://ui-avatars.com/api/?name=${name}+${lastname}&background=random&color=fff&size=256`,
      password 
    }).then(response => {
      resetInputFields()
      setIsLoading(false);
      navigate('/sign/in');
    }).catch(err => {
      if(err.response?.status === 409) {
        setError({
          ...error,
          username: 'Usuário já registrado'
        });
      }
      if(err.response?.status === 400) {
        setError({
          ...error,
          username: err.response.data.message.find((key: string) => key.includes('usuário') ? key : ''),
          name: err.response.data.message.find((key: string) => key.includes(' nome ') ? key : ''),
          lastname: err.response.data.message.find((key: string) => key.includes('sobrenome') ? key : ''),
          password: err.response.data.message.find((key: string) => key.includes('senha') ? key : ''),
          confirmPassword: err.response.data.message.find((key: string) => key.includes('senha') ? key : ''),
          biography: err.response.data.message.find((key: string) => key.includes('biografia') ? key : '')
        });
      }
      setIsLoading(false);
    });
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
          error={error.name}
          onChange={(e) => setName(e.target.value)} 
        />
        <InputField 
          label="Sobrenome" 
          type="text" 
          name="lastname" 
          value={lastname}
          error={error.lastname}
          onChange={(e) => setLastname(e.target.value)} 
        />
        <InputField 
          label="Biografia" 
          type="text" 
          name="biography" 
          variant='lg'
          value={biography}
          error={error.biography}
          onChange={(e) => setBiography(e.target.value)} 
        />
				<InputField 
          label="Usuário" 
          type="text" 
          name="username" 
          value={username} 
          error={error.username}
          onChange={(e) => setUsername(e.target.value)} 
        />
        <InputField 
          label="Senha" 
          type="password" 
          name="password" 
          value={password} 
          error={error.password}
          onChange={(e) => setPassword(e.target.value)} 
        />
        <InputField 
          label="Confirme a senha" 
          type="password" 
          name="confirmPassword" 
          value={confirmPassword} 
          error={error.confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
        <h2 className="mb-2">
          Sexo
        </h2>
        <div className="flex items-center mb-4">
          <Button text="" onClick={() => setSex('MALE')} className={`rounded-full flex items-center justify-center ${sex === 'MALE' ? 'bg-blue-600 h-12 w-12' : 'bg-blue-400 h-10 w-10'}`} type='button'>
            <Boy fontSize='large'/>
          </Button>
          <Button text="" onClick={() => setSex('FEMALE')} className={`rounded-full flex items-center justify-center ml-1 hover:bg-pink-700 ${sex === 'FEMALE' ? 'bg-pink-600 h-12 w-12' : 'bg-pink-400 h-10 w-10'}`} type='button'>
            <Girl fontSize='large'/>
          </Button>
        </div>
        <div className='flex items-center'>
					<Link to="/sign/in" className='text-blue-500 font-bold mr-4 flex-1'>Entrar</Link>
					<Button text="Registrar" type="submit" className='w-[50%]'/>
				</div>
      </Form>
    </div>
  );
};

export default SignUpPage;

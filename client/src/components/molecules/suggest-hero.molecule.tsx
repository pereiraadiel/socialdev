import { useEffect, useState } from "react";
import { UserInterface } from "../../interfaces/user.interface";
import Button from "../atoms/button.atom";
import { ApiIntegration } from "../../integrations/api.integration";

type SuggestHeroMoleculeProps = {
	user: UserInterface
};

const SuggestHeroMolecule: React.FC<SuggestHeroMoleculeProps> = ({ user }) => {

	const [loggedUserIsFan, setLoggedUserIsFan] = useState(false);
	
	useEffect(() => {
		ApiIntegration.getHeroes(user.id)
			.then(heroes => {
				const loggedUsername = localStorage.getItem('@socialdev:username');
				const isFan = heroes.some(hero => hero.username === loggedUsername);
				setLoggedUserIsFan(isFan)
			})
			.catch(error => {
				setLoggedUserIsFan(false)
			});
	}, [user]);

	const handleBecomeFanClick = () => {
		ApiIntegration.becomeFan(user.id)
			.then(() => {
				setLoggedUserIsFan(true)
			}
		)
		.catch(error => {
			setLoggedUserIsFan(false)
		});
	}

	return (
		<div className='bg-white shadow-md rounded p-4 mb-4 flex items-center justify-center relative mr-2 flex-col w-[200px]'>
			<div className='flex items-center flex-col justify-center px-2'>
				<img src={user.pictureURL} alt={user.username} className='w-16 h-16 rounded-full flex flex-col items-center justify-center'/>
				<div className='justify-center flex items-center flex-col mb-2'>
					<p className='font-semibold'>{user.fullname}</p>
					<p className='text-gray-500 text-sm'>@{user.username}</p>
				</div>
			</div>
			{!loggedUserIsFan && (
				<Button text='Seja um fã' className="w-full uppercase" onClick={handleBecomeFanClick}/>
			)}
		</div>
	);
}

export default SuggestHeroMolecule;
import { UserInterface } from "../../interfaces/user.interface";
import SuggestHeroMolecule from "../molecules/suggest-hero.molecule";

type SuggestedHeroesOrganismProps = {
	users: UserInterface[]
};

const SuggestedHeroesOrganism: React.FC<SuggestedHeroesOrganismProps> = ({ users }) => {
	return (
		<div className='bg-gray-100 py-4 rounded-md'>
			<h2 className='text-xl font-semibold mb-2'>Talvez você conheça</h2>
			<div className="flex items-center px-2 overflow-x-scroll">
				{users.map(user => (
					<SuggestHeroMolecule key={user.id} user={user}/>
				))}
			</div>
		</div>
	);
}

export default SuggestedHeroesOrganism;
import { UserInterface } from "../../interfaces/user.interface";
import ModalMolecule from "../molecules/modal.molecule";
import UserInfo from "../molecules/user-info.molecule";

type FriendsModalOrganismProps = {
	isOpen: boolean;
	onClose: () => void;
	friends: UserInterface[];
	title: string;
}

const FriendsModalOrganism: React.FC<FriendsModalOrganismProps> = ({ isOpen, onClose, friends, title }) => {
	return (
		<ModalMolecule isOpen={isOpen} onClose={onClose} className="p-4">
			<div className="min-w-72">
				<h2 className="mb-6 text-2xl font-bold text-center">{title}</h2>
				<div className="flex items-start flex-col overflow-y-scroll max-h-80 min-h-80 justify-items-start">
					{friends.length > 0 ? friends.map((friend) => (
						<UserInfo
							key={friend.id}
							user={friend}
							className='mb-4'
						/>
					))
					: (
						<p className='text-center text-gray-500 w-full'>Nenhum amigo encontrado</p>
					)}
				</div>
			</div>
		</ModalMolecule>
	);
}

export default FriendsModalOrganism;
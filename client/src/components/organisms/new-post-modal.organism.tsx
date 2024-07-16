import { useState } from "react";
import Button from "../atoms/button.atom";
import InputField from "../atoms/input-field.atom";
import ModalMolecule from "../molecules/modal.molecule";

type NewPostModalOrganismProps = {
	isOpen: boolean;
	onClose: () => void;
};

const NewPostModalOrganism: React.FC<NewPostModalOrganismProps> = ({ isOpen, onClose }) => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	return (
		<ModalMolecule isOpen={isOpen} onClose={onClose}>
			<h2 className="text-2xl font-bold mb-6 text-center">Nova Publicação</h2>
			<InputField label="Título" type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} />
			<InputField variant='lg' label="Conteúdo" type="text" name="content" value={content} onChange={e => setContent(e.target.value)} />
			<Button text="Publicar" type="submit" className="flex-1 w-full" />
		</ModalMolecule>
	);
};

export default NewPostModalOrganism;
import { X } from "lucide-react";

type ModalMoleculeProps = {
	children: React.ReactNode;
	isOpen: boolean;
	onClose: () => void;
	className?: string;
};

const ModalMolecule: React.FC<ModalMoleculeProps> = ({ children, isOpen, onClose, className }) => {
	return (
		<>
			{isOpen && (
				<div className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-lg flex items-center justify-center ${className}`}>
					<div className='bg-white p-4 rounded-lg relative'>
						{children}
						<button onClick={onClose} className='bg-red-500 text-white rounded-full w-10 h-10 items-center justify-center flex mt-4 absolute right-[-6%] top-[-9%]'>
							<X/>
						</button>
					</div>
				</div>
			)}
		</>
	)
};

export default ModalMolecule;
import Loader from "../atoms/loader.atom";

type FormProps = {
	children: React.ReactNode;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	isLoading?: boolean;
};

const Form: React.FC<FormProps> = ({ children, onSubmit, isLoading }) => {
	
	return (
		<div className="relative">
			{isLoading && (<Loader/>)}
			<form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
				{children}
			</form>
		</div>
	)
};

export default Form;

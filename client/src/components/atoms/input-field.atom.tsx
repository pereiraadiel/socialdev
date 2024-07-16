type InputFieldProps = {
	label: string;
	type: string;
	name: string;
	value: string;
  variant?: 'sm' | 'lg';
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange, variant = 'sm' }) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
      {label}
    </label>

    {variant === 'lg' ? (
      <textarea 
        className="shadow appearance-none border rounded w-full min-h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        id={name}
        name={name}
        value={value}
        placeholder={label}
        onChange={onChange}
      />
    ) : (
      <input 
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
        id={name}
        type={type}
        name={name}
        value={value}
        placeholder={label}
        onChange={onChange}
      />
    )}
  </div>
);

export default InputField;

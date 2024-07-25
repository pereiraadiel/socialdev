type InputFieldProps = {
	label: string;
	type: string;
	name: string;
	value: string;
  variant?: 'sm' | 'lg';
  error?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({ label, type, name, value, onChange, variant = 'sm', error }) => {
  
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
        {label}
      </label>

      {variant === 'lg' ? (
        <>
          <textarea 
            className={`shadow appearance-none border rounded w-full min-h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error && 'border-red-600 text-red-600 placeholder:text-red-300'}`} 
            id={name}
            name={name}
            value={value}
            placeholder={label}
            onChange={onChange}
          />
          <p className="text-red-600 ml-1 font-xs italic lowercase max-w-[240px] break-words">{error}</p>
        </>
      ) : (
        <>
          <input 
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error && 'border-red-600 text-red-600 placeholder:text-red-300'}`}  
            id={name}
            type={type}
            name={name}
            value={value}
            placeholder={label}
            onChange={onChange}
          />
          <p className="text-red-600 ml-1 font-xs italic lowercase max-w-[240px] break-words">{error}</p>
        </>
      )}
    </div>
  )
};

export default InputField;

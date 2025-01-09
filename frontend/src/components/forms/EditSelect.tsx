import inputClassName from '@/utils/inputClassName';
import inputFormClassName from '@/utils/inputFormClassName';

interface ComponentProps {
  data: string;
  setData: (value: string) => void;
  options: string[];
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  title?: string;
  description?: string;
}

export default function EditSelect({
  data,
  setData,
  required = false,
  disabled = false,
  placeholder = '',
  title = '',
  description = '',
  options,
}: ComponentProps) {
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const inputValue = e.target.value;
    setData(inputValue);
  };

  return (
    <div className="w-full">
      <span className="dark:text-dark-txt block text-sm font-bold text-gray-900">{title}</span>
      <span className="dark:text-dark-txt-secondary mb-2 block text-sm text-gray-500">
        {description}
      </span>
      <div className={`${inputFormClassName}`}>
        <select
          className={`${inputClassName}`}
          value={data}
          required={required}
          disabled={disabled}
          onChange={handleSelectChange}
        >
          {placeholder && (
            <option className="dark:text-dark-txt" value="" disabled>
              {placeholder}
            </option>
          )}
          {options?.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0).toUpperCase() + option.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

EditSelect.defaultProps = {
  required: false,
  disabled: false,
  placeholder: '',
  title: '',
  description: '',
};

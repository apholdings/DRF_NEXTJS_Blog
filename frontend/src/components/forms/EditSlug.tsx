import inputClassName from '@/utils/inputClassName';
import inputFormClassName from '@/utils/inputFormClassName';

interface ComponentProps {
  data: string;
  setData: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  maxTextLength?: number;
  showMaxTextLength?: boolean;
  placeholder?: string;
  title?: string;
  description?: string;
}

export default function EditSlug({
  data,
  setData,
  required = false,
  disabled = false,
  maxTextLength = 120,
  showMaxTextLength = false,
  placeholder = '',
  title = '',
  description = '',
}: ComponentProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    const spaceReplacedValue = inputValue.replace(/\s/g, '-');
    const slugValue = spaceReplacedValue.replace(/[^a-zA-Z0-9-_]/g, '');

    if (slugValue.length <= maxTextLength) {
      setData(slugValue);
    }
  };

  return (
    <div className="w-full">
      <span className="dark:text-dark-txt block text-sm font-bold text-gray-900">{title}</span>
      <span className="dark:text-dark-txt-secondary mb-2 block text-sm text-gray-500">
        {description}
      </span>
      <div className={`${inputFormClassName}`}>
        <input
          type="text"
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          value={data}
          maxLength={maxTextLength}
          className={`${inputClassName}`}
          onChange={handleInputChange}
        />
        {showMaxTextLength && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <span className="dark:text-dark-txt-secondary text-gray-500 sm:text-sm">
              {data?.length} of {maxTextLength}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

EditSlug.defaultProps = {
  required: false,
  disabled: false,
  maxTextLength: 120,
  showMaxTextLength: false,
  placeholder: '',
  title: '',
  description: '',
};

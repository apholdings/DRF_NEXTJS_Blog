import inputClassName from '@/utils/inputClassName';
import inputFormClassName from '@/utils/inputFormClassName';
import moment from 'moment';

interface EditDateProps {
  data: string;
  setData: any;
  required?: boolean;
  disabled?: boolean;
  title?: string;
  useTime?: boolean;
}

export default function EditDate({
  data,
  setData,
  required = false,
  title,
  disabled = false,
  useTime = true,
}: EditDateProps) {
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setData(selectedDate);
  };

  const formattedDate = moment(data).format(useTime ? 'YYYY-MM-DDTHH:mm' : 'YYYY-MM-DD');

  return (
    <div className="w-full">
      <span className="dark:text-dark-txt block text-sm font-bold text-gray-900">{title}</span>
      <div className={`${inputFormClassName}`}>
        <input
          type={useTime ? 'datetime-local' : 'date'}
          value={formattedDate}
          required={required}
          onChange={handleDateChange}
          className={`${inputClassName}`}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

EditDate.defaultProps = {
  required: false,
  disabled: false,
  title: '',
  useTime: true,
};

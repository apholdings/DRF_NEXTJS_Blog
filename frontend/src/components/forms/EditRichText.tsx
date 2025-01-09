import inputFormClassName from '@/utils/inputFormClassName';
import TiptapEditor from '../tiptap/TipTapEditor';

interface ComponentProps {
  data: string;
  setData: (value: string) => void;
  title?: string;
  description?: string;
  maxTextLength?: number;
}

export default function EditRichText({
  data,
  setData,
  title = '',
  description = '',
  maxTextLength = 1200,
}: ComponentProps) {
  return (
    <div className="flex w-full flex-col">
      <span className="dark:text-dark-txt block text-sm font-bold text-gray-900">{title}</span>
      <span className="dark:text-dark-txt-secondary mb-2 block text-sm text-gray-500">
        {description}
      </span>
      <div className={`${inputFormClassName} relative p-2`}>
        <TiptapEditor data={data} setData={setData} maxTextLength={maxTextLength} />
      </div>
    </div>
  );
}

EditRichText.defaultProps = {
  title: '',
  description: '',
  maxTextLength: 1200,
};

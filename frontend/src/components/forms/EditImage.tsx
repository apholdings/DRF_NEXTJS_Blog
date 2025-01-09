import { v4 as uuidv4 } from 'uuid';
import ReactDropzone from 'react-dropzone';
import { Line } from 'rc-progress';
import Image from 'next/image';
import { ToastError } from '../toast/alerts';

interface ComponentProps {
  encoding?: string;
  data: any;
  setData: any;
  onLoad?: any;
  percentage?: number;
  variant?: string;
  title?: string;
  description?: string;
}

export default function EditImage({
  encoding = 'multipart',
  data,
  setData,
  onLoad = null,
  percentage = 0,
  variant = 'profile',
  title = 'File',
  description = '',
}: ComponentProps) {
  const handleDrop = (acceptedFiles: any) => {
    const acceptedFile = acceptedFiles[0];

    if (acceptedFile.size > 2 * 1024 * 1024) {
      ToastError('Image must be Max 2MB');
      return;
    }

    const allowedFileTypes = ['image/jpeg', 'image/png'];

    if (!allowedFileTypes.includes(acceptedFile.type)) {
      ToastError(
        `${acceptedFile.type} is not allowed. Only .jpg, .jpeg or .png extensions are allowed`,
      );
      return;
    }

    const reader = new FileReader();

    if (encoding === 'base64') {
      reader.readAsDataURL(acceptedFile);
      reader.onload = () => {
        const sizeInKB = acceptedFile.size / 1024;
        const fileTypeMapping: { [key: string]: string } = {
          'image/jpeg': '.jpg',
          'image/png': '.png',
        };
        const newItem = {
          id: uuidv4(),
          title: acceptedFile.name,
          file: reader.result,
          size: `${sizeInKB.toFixed(2)} KB`,
          type: fileTypeMapping[acceptedFile.type] || acceptedFile.type,
          lastModified: acceptedFile.lastModified,
        };
        setData(newItem);
        if (onLoad) {
          onLoad(newItem);
        }
      };
    }

    if (encoding === 'multipart') {
      const sizeInKB = acceptedFile.size / 1024;
      const fileTypeMapping: { [key: string]: string } = {
        'image/jpeg': '.jpg',
        'image/png': '.png',
      };
      const newItem = {
        id: uuidv4(),
        title: acceptedFile.name,
        file: acceptedFile,
        size: `${sizeInKB.toFixed(2)} KB`,
        type: fileTypeMapping[acceptedFile.type] || acceptedFile.type,
        lastModified: acceptedFile.lastModified,
      };
      setData(newItem);
      if (onLoad) {
        onLoad(newItem);
      }
    }
  };

  const isValidUrl = (string: string) => {
    try {
      // eslint-disable-next-line
      const url = new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  const getSrcUrl = () => {
    if (isValidUrl(data)) {
      return data;
    }

    if (encoding === 'base64' && data?.file) {
      return data.file;
    }

    if (encoding === 'multipart' && data?.file) {
      return URL.createObjectURL(data.file);
    }

    return '/assets/img/placeholder/media.jpg';
  };

  const srcUrl = getSrcUrl();

  const normalStyle = <div>Normal style</div>;

  const bannerStyle = (
    <div>
      <span className="dark:text-dark-txt block text-sm font-bold text-gray-900">{title}</span>
      <span className="dark:text-dark-txt-secondary mb-2 block text-sm text-gray-500">
        {description}
      </span>
      <div className="w-full">
        <div className="flex flex-col-reverse">
          {data && (
            <Image
              width={512}
              height={512}
              src={srcUrl}
              alt=""
              className="h-48 w-auto object-cover"
            />
          )}
        </div>
      </div>
      <div className="mt-2 w-full">
        <ReactDropzone onDrop={handleDrop}>
          {({ getRootProps, getInputProps }) => (
            <div
              className="form-control text-md dark:border-dark-border dark:bg-dark-second dark:text-dark-txt-secondary hover:dark:bg-dark-third m-0 block w-full flex-grow cursor-pointer rounded border-2 border-dashed border-gray-200 bg-white bg-clip-padding p-4 text-gray-700 transition ease-in-out hover:border-gray-300 hover:bg-gray-50 focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <span>{data?.file ? data?.title : 'Drag and drop or click to upload file'}</span>
            </div>
          )}
        </ReactDropzone>
        <div className="mt-2">
          <Line
            percent={percentage}
            strokeWidth={2}
            strokeColor={percentage < 70 ? '#e6007a' : '#b1fec5'}
          />
        </div>
      </div>
    </div>
  );

  const profileStyle = (
    <div>
      <span className="dark:text-dark-txt block text-sm font-bold text-gray-900">{title}</span>
      <span className="dark:text-dark-txt-secondary mb-2 block text-sm text-gray-500">
        {description}
      </span>
      <div className="flex flex-col items-center gap-2 md:flex-row">
        <div className="flex-shrink-0">
          <div className="aspect-w-0.5 aspect-h-0.5 w-32">
            {data && (
              <Image
                width={512}
                height={512}
                src={srcUrl}
                alt=""
                className="h-32 w-auto rounded-full object-cover object-center"
              />
            )}
          </div>
        </div>
        <div className="w-full">
          <ReactDropzone onDrop={handleDrop}>
            {({ getRootProps, getInputProps }) => (
              <div
                className="form-control text-md dark:border-dark-border dark:bg-dark-second dark:text-dark-txt-secondary hover:dark:bg-dark-third m-0 block w-full flex-grow cursor-pointer rounded border-2 border-dashed border-gray-200 bg-white bg-clip-padding p-4 text-gray-700 transition ease-in-out hover:border-gray-300 hover:bg-gray-50 focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <span>{data?.file ? data?.title : 'Drag and drop or click to upload file'}</span>
              </div>
            )}
          </ReactDropzone>
          <div className="mt-2">
            <Line
              percent={percentage}
              strokeWidth={2}
              strokeColor={percentage < 70 ? '#e6007a' : '#b1fec5'}
            />
          </div>
        </div>
      </div>
    </div>
  );

  switch (variant) {
    case 'profile':
      return profileStyle;
    case 'normal':
      return normalStyle;
    case 'banner':
      return bannerStyle;
    default:
      return null;
  }
}

EditImage.defaultProps = {
  encoding: 'multipart',
  onLoad: null,
  percentage: 0,
  variant: 'profile',
  title: 'File',
  description: '',
};

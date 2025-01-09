import { EnvelopeIcon } from '@heroicons/react/24/outline';
import EmailForm from './EmailForm';

export default function EmailInput() {
  return (
    <div className="dark:bg-dark-primary col-span-5 m-2 rounded bg-blue-500 p-6">
      <EnvelopeIcon className="mb-4 h-6 w-auto text-white" />
      <h3 className="text-2xl font-semibold leading-6 text-white">Stay in the loop</h3>
      <p className="text-md mt-4 text-lg text-gray-100">
        Get free expert insights and tips to grow your knowledge business sent right to your inbox.{' '}
      </p>
      <EmailForm />
      <p className="mt-2 text-xs leading-normal text-white">
        By submitting you agree to receive our monthly Knowledge Newsletter as well as other
        promotional emails from us. You may withdraw your consent at any time via the “Unsubscribe”
        link in any email or view our privacy policy at any time.
      </p>
    </div>
  );
}

import Button from '@/components/Button';
import EditEmail from '@/components/forms/EditEmail';
import EditText from '@/components/forms/EditText';
import EditTextArea from '@/components/forms/EditTextArea';
import LoadingMoon from '@/components/loaders/LoadingMoon';
import SEO, { SEOProps } from '@/components/SEO';
import { ToastError, ToastSuccess } from '@/components/toast/alerts';
import Layout from '@/hocs/Layout';
import sendContactForm, { SendContactFormProps } from '@/utils/api/contact/SendContactForm';
import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Page() {
  const SEOList: SEOProps = {
    title: 'Contact Us',
    description: 'Description here',
    keywords: 'test1, test2, test3',
    href: `${process.env.DOMAIN}/`,
    robots: 'all',
    author: `${process.env.DOMAIN_NAME}`,
    publisher: `${process.env.DOMAIN_NAME}`,
    image: '/assets/img/thumbnails/cursos_online.png',
    twitterHandle: '@boomslag_',
  };

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [loading, setLoading] = useState<boolean>(false);

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const contactFormData: SendContactFormProps = {
        firstName,
        lastName,
        email,
        phoneNumber,
        message,
      };
      const res = await sendContactForm(contactFormData);
      if (res.status === 201) {
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhoneNumber('');
        setMessage('');
        ToastSuccess('Contact message sent');
      }
    } catch (err) {
      ToastError('Error sending contact message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SEO {...SEOList} />
      <div className="relative isolate">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                Get in touch
              </h2>
              <p className="dark:text-dark-txt mt-6 text-lg/8 text-gray-600">
                Proin volutpat consequat porttitor cras nullam gravida at. Orci molestie a eu arcu.
                Sed ut tincidunt integer elementum id sem. Arcu sed malesuada et magna.
              </p>
              <dl className="dark:text-dark-txt-secondary mt-10 space-y-4 text-base/7 text-gray-600">
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Address</span>
                    <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                  </dt>
                  <dd>
                    545 Mavis Island
                    <br />
                    Chicago, IL 99191
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Telephone</span>
                    <PhoneIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                  </dt>
                  <dd>
                    <a href="tel:+1 (555) 234-5678" className="hover:text-gray-900">
                      +1 (555) 234-5678
                    </a>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-gray-400" />
                  </dt>
                  <dd>
                    <a href="mailto:hello@example.com" className="hover:text-gray-900">
                      hello@example.com
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <form onSubmit={handleOnSubmit} className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <EditText required data={firstName} setData={setFirstName} title="First name" />
                <EditText required data={lastName} setData={setLastName} title="Last name" />

                <div className="sm:col-span-2">
                  <EditEmail required data={email} setData={setEmail} title="Email" />
                </div>
                <div className="sm:col-span-2">
                  <EditText
                    required
                    data={phoneNumber}
                    setData={setPhoneNumber}
                    title="Phone number"
                  />
                </div>
                <div className="sm:col-span-2">
                  <EditTextArea required title="Message" data={message} setData={setMessage} />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <Button disabled={loading} type="submit">
                  {loading ? <LoadingMoon /> : 'Send message'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

Page.getLayout = function getLayout(page: React.ReactElement) {
  return <Layout>{page}</Layout>;
};

import { ToastError } from '@/components/toast/alerts';

export interface SendContactFormProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  message: string;
}

export default async function sendContactForm(props: SendContactFormProps) {
  try {
    const res = await fetch('/api/contact/send_contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: props.firstName,
        lastName: props.lastName,
        email: props.email,
        phoneNumber: props.phoneNumber,
        message: props.message,
      }),
    });

    const data = await res.json();

    return data;
  } catch (err) {
    ToastError('Error sending email');
  }

  return null;
}

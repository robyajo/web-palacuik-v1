import { FormAuthSignUp } from '@/components/form/auth-signup';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication | Sign Up',
  description: 'Sign Up page for authentication.'
};

export default function Page() {
  return (
    <FormAuthSignUp />
  );
}

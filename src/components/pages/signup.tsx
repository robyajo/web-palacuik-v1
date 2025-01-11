import { Metadata } from 'next';
import { FormAuthSignUp } from '../form/auth-signup';

export const metadata: Metadata = {
    title: 'Authentication | Sign Up',
    description: 'Authentication forms built using the components.'
};

export default function SignupPage() {
    return (
        <FormAuthSignUp />
    );
}

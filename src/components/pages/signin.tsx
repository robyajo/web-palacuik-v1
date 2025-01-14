import { Metadata } from 'next';
import { FormAuthSignIn } from '../form/auth-signin';

export const metadata: Metadata = {
    title: 'Authentication',
    description: 'Authentication forms built using the components.'
};

export default function SigninPage() {
    return (
        <FormAuthSignIn />
    );
}

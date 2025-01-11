import { Metadata } from 'next';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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

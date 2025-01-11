import React from 'react'
import {
    Credenza,
    CredenzaBody,
    CredenzaClose,
    CredenzaContent,
    CredenzaDescription,
    CredenzaFooter,
    CredenzaHeader,
    CredenzaTitle,
    CredenzaTrigger,
} from '@/components/ui/credenza';
import { Button } from '../ui/button';

interface DrawerAlertProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    content?: string;
    btnConfirmText?: string;
    description: string;
}


const DrawerAlert: React.FC<DrawerAlertProps> = ({ isOpen, onClose, onConfirm, title, content, btnConfirmText = 'Confirm', description }) => {
    return (
        <Credenza open={isOpen} onOpenChange={onClose}>
            <CredenzaContent>
                <CredenzaHeader>
                    <CredenzaTitle>{title}</CredenzaTitle>
                    <CredenzaDescription>
                        {description}
                    </CredenzaDescription>
                </CredenzaHeader>
                <CredenzaBody className="space-y-4 text-sm sm:pb-0 sm:text-left">
                    {content}
                </CredenzaBody>
                <CredenzaFooter>
                    <CredenzaClose asChild>
                        <Button variant="outline" onClick={onClose} className='w-full mr-2'>Batal</Button>
                    </CredenzaClose>
                    <Button variant="default" onClick={onConfirm} className='w-full'>{btnConfirmText}</Button>
                </CredenzaFooter>
            </CredenzaContent>
        </Credenza>
    )
}

export default DrawerAlert;
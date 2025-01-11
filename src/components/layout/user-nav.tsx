'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { signOut, useSession } from 'next-auth/react';
import ResDEV from '../debug/respon-debug';
import DrawerAlert from '../modal/drawer-alert';
import { toast } from 'sonner';
import { startTransition, useState } from 'react';
import { API_LOGOUT } from '@/lib/api';
export function UserNav() {
  const [logoutOpen, setLogOutOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  const handleOpenAlertLogout = () => {
    try {
      setLogOutOpen(true);
    } catch (error: any) {
      toast.error(error.response.data.message, {
        duration: 3000,
        position: "top-right",
      });
    }
  };
  const handleLogout = async () => {
    startTransition(async () => {
      try {

        const res = await fetch(API_LOGOUT, {
          method: 'POST',
          headers: {
            'Authorization': `${session?.user?.token_type} ${session?.user?.access_token}`,
          },
        });

        const responseData = await res.json();
        console.log('responseData', responseData);
        if (!res.ok) {
          // Ekstrak pesan error dari respons JSON
          const errorMessage = responseData.message || 'Terjadi kesalahan saat logout';

          throw new Error(errorMessage);

        }
        toast.success(responseData.message, {
          duration: 3000,
          position: "top-right",
        });
        signOut({
          callbackUrl: "/",
          redirect: true,
        });

      } catch (err: unknown) {
        console.error('Error tidak terduga:', err);
        const pesanError = err instanceof Error ? err.message : 'Terjadi kesalahan yang tidak terduga';
        toast.error(pesanError, {
          position: "top-right",
        });
      }
    });
  }
  if (session) {
    return (
      <>
        <ResDEV response={session?.user?.access_token} />
        <DrawerAlert
          isOpen={logoutOpen}
          onClose={() => setLogOutOpen(false)}
          onConfirm={() => signOut()}
          btnConfirmText='Ya'
          title="Keluar dari akun ini ?"
          description="Tindakan ini akan keluar dari akun. Apakah Anda yakin untuk keluar ?"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
              <Avatar className='h-8 w-8'>
                <AvatarImage
                  src={session.user?.image ?? ''}
                  alt={session.user?.name ?? ''}
                />
                <AvatarFallback>{session.user?.name?.[0]}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {session.user?.name}
                </p>
                <p className='text-xs leading-none text-muted-foreground'>
                  {session.user?.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>New Team</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleOpenAlertLogout()}>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
}

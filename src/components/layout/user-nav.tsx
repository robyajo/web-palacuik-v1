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
import { LogOut } from 'lucide-react';
import { isAxiosError } from 'axios';
import axios from '@/lib/axios';
export function UserNav() {
  const [logoutOpen, setLogOutOpen] = useState<boolean>(false);
  const { data: session } = useSession();
  // console.log('session', session?.user.access_token);
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
        const response = await axios.post(API_LOGOUT, null, {
          headers: {
            'Authorization': `${session?.user?.token_type} ${session?.user?.access_token}`,
            'Accept': 'application/json',
          },
        });

        toast.success(response.data.message || 'Berhasil logout', {
          duration: 3000,
          position: "top-right",
        });

        signOut({
          callbackUrl: "/",
          redirect: true,
        });

      } catch (error) {
        console.error('Error:', error);
        if (isAxiosError(error)) {
          const pesanError = error.response?.data?.message ||
            'Terjadi kesalahan saat logout';
          toast.error(pesanError, {
            position: "top-right",
          });
        } else {
          toast.error('Terjadi kesalahan yang tidak terduga', {
            position: "top-right",
          });
        }
      }
    });
  }

  if (session) {
    return (
      <>
        {/* <ResDEV response={session?.user?.access_token} /> */}
        <DrawerAlert
          isOpen={logoutOpen}
          onClose={() => setLogOutOpen(false)}
          // onConfirm={() => signOut()}
          onConfirm={handleLogout}
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
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              //  onClick={() => handleOpenAlertLogout()}
              onClick={() => handleOpenAlertLogout()}
            >
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }
}

'use client'

import { ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from './data-table-column-header'
import { Button } from '@/components/ui/button';
import { Edit, Eye, MoreHorizontal, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from 'next/image';
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { API_MARKET_SHOW } from '@/lib/api';
import { useSession } from 'next-auth/react';
import ResDEV from '@/components/debug/respon-debug';

export const CellComponent = ({ row }: any) => {
  // console.log(row.original)
  const { data: session } = useSession()
  const [openDetail, setOpenDetail] = useState<boolean>(false)
  const [akSatuBaru, setAkSatuBaru] = useState<any | undefined>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_MARKET_SHOW}/${row.original.uuid}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session?.user?.access_token}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Gagal mengambil data profil');
        }
        const result = await response.json();
        setAkSatuBaru(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleOpenDetail = () => {
    setOpenDetail(true)
  }

  return (
    <>
      <ResDEV response={akSatuBaru} />
      <Credenza open={openDetail} onOpenChange={setOpenDetail}>
        <CredenzaContent className="sm:max-w-xl">
          <CredenzaHeader>
            <CredenzaTitle >
              {row.original.nama_layanan}
            </CredenzaTitle>
          </CredenzaHeader>
          <CredenzaBody className="space-y-4 text-sm sm:pb-0 sm:text-left">
            <ScrollArea className="h-[300px]">
              <div className="px-2">
                {row.original.layanan_name === 'AK1' ? (
                  <>
                    fdfd
                  </>
                ) : (
                  <>
                    fdfdf
                  </>
                )}
              </div>
            </ScrollArea>
          </CredenzaBody>
          <CredenzaFooter>
            <CredenzaClose asChild>
              <Button variant="outline" className='w-full lg:w-auto lg:mr-4'>Tutup</Button>
            </CredenzaClose>
          </CredenzaFooter>
        </CredenzaContent>
      </Credenza>


      <div className="flex float-right px-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={"icon"} variant="default" onClick={handleOpenDetail}><Eye size={18} /></Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Detail</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </>
  );
};

// Mendefinisikan kolom-kolom tabel
export const columns: ColumnDef<any>[] = [
  // {
  //   id: 'no_urut',
  //   header: 'No',
  //   cell: ({ row }) => {
  //     return row.index + 1;
  //   },
  // },
  {
    accessorKey: 'logo',
    header: 'Logo',
    cell: ({ row }) => {
      return (
        <div className='relative aspect-square w-12 h-12'>
          {
            row.original.logo ? (
              <Image
                src={row.original.logo_path}
                alt={row.original.name}
                fill
                className='rounded-lg'
              />
            ) : (
              <Image
                src="/assets/no_img.png"
                alt={row.original.name}
                fill
                className='rounded-lg'
              />
            )
          }
        </div>
      );
    }
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Name" />
      )
    }
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellComponent row={row} />
  }
];

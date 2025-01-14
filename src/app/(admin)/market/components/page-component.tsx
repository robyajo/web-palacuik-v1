'use client'
import ResDEV from '@/components/debug/respon-debug'
import { columns } from '@/components/table/market-place/columns'
import { DataTable } from '@/components/table/market-place/data-table'
import { buttonVariants } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton'
import { API_MARKET } from '@/lib/api'
import { cn } from '@/lib/utils'
import { Plus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { Suspense, useEffect, useState } from 'react'

export default function PageCompoent() {
    const { data: session } = useSession();
    const [dataFecth, setDataFecth] = useState<any | null>(null)
    const [loading, setLoading] = useState(true)
    const [errorFecth, setErrorFecth] = useState<string | null>(null)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(API_MARKET, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${session?.user?.access_token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Gagal mengambil data profil');
                }

                const result = await response.json();
                // console.log('result', result);
                setDataFecth(result.data.data);
            } catch (err) {
                setErrorFecth(err instanceof Error ? err.message : 'Terjadi kesalahan');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [session?.user?.role, session?.user?.access_token]);
    if (errorFecth) {
        return <p>{errorFecth}</p>;
    }
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center">
                Loading...
            </div>
        )
    }
    return (
        <>
            <ResDEV response={dataFecth} />
            <div className='space-y-4'>
                <div className='flex items-start justify-between'>
                    <Heading
                        title='Market Place'
                        description='Manage market place integrations'
                    />
                    <Link
                        href='/market/new'
                        className={cn(buttonVariants(), 'text-xs md:text-sm')}
                    >
                        <Plus className='mr-2 h-4 w-4' /> Add New
                    </Link>
                </div>
                <Separator />
                <Suspense
                    key='market'
                    fallback={<DataTableSkeleton columnCount={5} rowCount={10} />}
                >
                    <DataTable
                        searchKey='name'
                        columns={columns}
                        data={dataFecth}
                    />
                </Suspense>
            </div>
        </>
    )
}

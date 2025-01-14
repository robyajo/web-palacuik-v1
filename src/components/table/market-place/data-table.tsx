'use client'

import { Suspense, useEffect, useState } from 'react'

import {
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  ColumnFiltersState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import React from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useMediaQuery } from 'react-responsive'
import { DataTablePagination } from './data-table-pagination'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { ListFilter } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  searchKey: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [isLoading, setIsLoading] = useState(true);

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [yearFilter, setYearFilter] = useState<string>('');
  const [monthFilter, setMonthFilter] = useState<string>('');

  useEffect(() => {
    // Simulasikan pemuatan data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Ubah durasi sesuai kebutuhan

    return () => clearTimeout(timer);
  }, []);
  // console.log(data)

  const resetFilters = () => {
    table.getColumn('service_id')?.setFilterValue('');
    table.getColumn('status_proses')?.setFilterValue('');
    table.getColumn('created_at')?.setFilterValue('');
    table.getColumn('opd_id')?.setFilterValue('');
    setYearFilter('');
    setMonthFilter('');
  };
  const handleOpenSheet = () => {
    setOpenModal(true);
  }
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  })

  return (
    <>
      <div className="justify-between w-full gap-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 md:grid-cols-1">
        <Input
          placeholder={`Search...`}
          value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn(searchKey)?.setFilterValue(event.target.value)
          }
          className="w-full md:max-w-sm"
        />
        <Sheet open={openModal} onOpenChange={setOpenModal}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full lg:w-[240px] ml-auto" onClick={handleOpenSheet}>
              <ListFilter className="w-4 h-4 mr-2" /> Filter Pencarian
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter Pencarian</SheetTitle>
              <SheetDescription>
                Pilih filter pencarian data
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Separator />


              <div className="grid items-center grid-cols-1 gap-4">
                <Input
                  placeholder={`Tahun`}
                  value={yearFilter}
                  onChange={(event) => setYearFilter(event.target.value)}
                  className="w-full md:max-w-sm"
                />
              </div>


              <div className="grid items-center grid-cols-2 gap-4" >
                <Button onClick={resetFilters} className="w-full " variant="outline">
                  Reset
                </Button>

              </div>
            </div>


          </SheetContent>
        </Sheet>
      </div>

      <ScrollArea className='grid h-[calc(80vh-220px)] rounded-md border md:h-[calc(90dvh-240px)]'>
        <Table className='relative'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
      <div className='flex items-center justify-end py-1 space-x-2'>
        <DataTablePagination table={table} />
      </div>
    </>
  );
}



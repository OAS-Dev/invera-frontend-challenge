'use client';

import {useState} from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
} from '@tanstack/react-table';
import {
  Button,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@/components/ui';
import {FiSearch} from 'react-icons/fi';
import {IoArrowBack, IoArrowForward} from 'react-icons/io5';

// Definimos la interfaz para el meta de la columna
interface ColumnMeta {
  className?: string;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      globalFilter,
      sorting,
      rowSelection,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <>
      <div className='rounded-xl border border-[#5F5F5F] pt-6 bg-[#121212] text-white overflow-hidden'>
        <div className='px-0 rounded-xl'>
          <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-4 px-6 md:px-8 lg:px-6'>
            <div className='flex items-center gap-4'>
              <h2 className='text-2xl font-bold'>All Users</h2>
              <div className='relative ml-4'>
                <input
                  type='text'
                  placeholder='Search for...'
                  className='bg-transparent border border-[#5F5F5F] rounded-lg py-2 px-10 text-white w-[160px] md:w-[320px]'
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                />
                <div className='absolute inset-y-0 left-3 flex items-center'>
                  <FiSearch className='text-gray-400' />
                </div>
              </div>
            </div>

            <div className='text-sm text-gray-400'>
              <span className='text-[#7B99FF]'>
                {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} -{' '}
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length,
                )}
              </span>{' '}
              of {table.getFilteredRowModel().rows.length}
            </div>
          </div>

          <div className='w-full'>
            {/* Estructura simplificada para que los bordes cubran todo el ancho */}
            <div className='w-full'>
              <div className='min-w-full'>
                <Table className='w-full mt-1'>
                  <thead className='border-t border-[#5F5F5F]'>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id} className='border-b border-[#5F5F5F]'>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead
                              key={header.id}
                              className={`px-4  ${(header.column.columnDef.meta as ColumnMeta)?.className}`}
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                          );
                        })}
                      </TableRow>
                    ))}
                  </thead>
                  <TableBody>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row, index) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && 'selected'}
                          className={`border-b border-[#5F5F5F] ${
                            index % 2 === 0 ? 'bg-[#212121]' : 'bg-[#121212]'
                          } hover:bg-[#212121]`}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell
                              key={cell.id}
                              className={`px-4 ${(cell.column.columnDef.meta as ColumnMeta)?.className}`}
                            >
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={columns.length} className='h-24 text-center'>
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Pagination */}
      <div className='flex items-center gap-2 justify-between md:hidden'>
        {/* Contador de páginas - siempre a la izquierda */}
        <div className='text-base text-[#FFFFFF]'>
          {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} -{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length,
          )}{' '}
          of {table.getFilteredRowModel().rows.length}
        </div>

        {/* Selector de filas - en el centro */}
        <div className='flex items-center justify-center'>
          <p className='text-base text-[#FFFFFF] mr-1'>Rows per page:</p>
          <Select onValueChange={(value) => table.setPageSize(+value)}>
            <SelectTrigger className='w-[60px] bg-[#121212] border-[#5F5F5F]'>
              <SelectValue placeholder='10' />
            </SelectTrigger>
            <SelectContent className='bg-[#121212]'>
              <SelectGroup>
                <SelectItem value='10'>10</SelectItem>
                <SelectItem value='20'>20</SelectItem>
                <SelectItem value='50'>50</SelectItem>
                <SelectItem value='100'>100</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Botones de navegación - a la derecha */}
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className='border-[#5F5F5F] w-8 text-white hover:bg-[#1A1A1A]'
          >
            <IoArrowBack className='h-4 w-4' color='#7B99FF' />
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className='border-[#5F5F5F] w-8 text-white hover:bg-[#1A1A1A]'
          >
            <IoArrowForward className='h-4 w-4' color='#7B99FF' />
          </Button>
        </div>
      </div>

      {/* Desktop Pagination */}
      <div className='items-center gap-2 justify-between hidden md:flex'>
        {/* Contador de páginas - siempre a la izquierda */}
        <div className='text-base text-[#FFFFFF]'>
          {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} -{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length,
          )}{' '}
          of {table.getFilteredRowModel().rows.length}
        </div>

        <div className='flex items-center gap-8'>
          {/* Selector de filas - en el centro */}
          <div className='flex items-center justify-center'>
            <p className='text-base text-[#FFFFFF] mr-1'>Rows per page:</p>
            <Select onValueChange={(value) => table.setPageSize(+value)}>
              <SelectTrigger className='w-[60px] bg-[#121212] border-[#5F5F5F]'>
                <SelectValue placeholder='10' />
              </SelectTrigger>
              <SelectContent className='bg-[#121212]'>
                <SelectGroup>
                  <SelectItem value='10'>10</SelectItem>
                  <SelectItem value='20'>20</SelectItem>
                  <SelectItem value='50'>50</SelectItem>
                  <SelectItem value='100'>100</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Botones de navegación - a la derecha */}
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className='border-[#5F5F5F] w-8 text-white hover:bg-[#1A1A1A]'
            >
              <IoArrowBack className='h-4 w-4' color='#7B99FF' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className='border-[#5F5F5F] w-8 text-white hover:bg-[#1A1A1A]'
            >
              <IoArrowForward className='h-4 w-4' color='#7B99FF' />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

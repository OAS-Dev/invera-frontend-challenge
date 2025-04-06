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
import {Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from '@/components/ui';
import {FiSearch} from 'react-icons/fi';

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
    <div>
      <div className='flex flex-col md:flex-row md:justify-between md:items-center  mb-4'>
        <div className='flex items-center gap-4'>
          <h2 className='text-2xl font-bold'>All Users</h2>
          <div className='relative ml-4'>
            <input
              type='text'
              placeholder='Search for...'
              className='bg-transparent border border-[#5F5F5F] rounded-lg py-2 px-10 text-white w-[160px] md:w-[350px]'
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

      <div>
        <Table>
          <TableHeader className='border-b border-[#5F5F5F]'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={(header.column.columnDef.meta as ColumnMeta)?.className}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='border-b border-[#5F5F5F] hover:bg-[#1A1A1A]'
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className={(cell.column.columnDef.meta as ColumnMeta)?.className}>
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

        <div className='flex items-center justify-end space-x-2 py-4'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className='border-[#5F5F5F] text-white hover:bg-[#1A1A1A]'
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className='border-[#5F5F5F] text-white hover:bg-[#1A1A1A]'
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

'use client';

import {useState, useMemo} from 'react';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
  Row,
} from '@tanstack/react-table';
import {
  Button,
  Select,
  SelectContent,
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
import {HiMiniPencil} from 'react-icons/hi2';
import {TbTrashFilled} from 'react-icons/tb';

// Definimos la interfaz para el meta de la columna
interface ColumnMeta {
  className?: string;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];

  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

export function DataTable<TData, TValue>({columns, data, onEdit, onDelete}: DataTableProps<TData, TValue>) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const updatedColumns = useMemo(() => {
    return columns.map((column) => {
      if (column.id === 'actions') {
        return {
          ...column,
          cell: ({row}: {row: Row<TData>}) => {
            const id = (row.original as {id: number}).id;
            return (
              <div className='flex justify-end md:justify-start -ml-40 md:-ml-3 lg:ml-0'>
                <button
                  onClick={() => onEdit && onEdit(id)}
                  className='p-2 text-gray-400 hover:text-white transition-colors'
                >
                  <HiMiniPencil size={18} />
                </button>
                <button
                  onClick={() => onDelete && onDelete(id)}
                  className='p-2 text-gray-400 hover:text-white transition-colors'
                >
                  <TbTrashFilled size={18} />
                </button>
              </div>
            );
          },
        };
      }
      return column;
    });
  }, [columns, onEdit, onDelete]);

  const table = useReactTable({
    data,
    columns: updatedColumns,
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
      <div className='rounded-xl border border-[#5F5F5F] dark:border-[#5F5F5F] pt-6 bg-white dark:bg-[#121212] text-black dark:text-white overflow-hidden shadow-sm'>
        <div className='px-0 rounded-xl'>
          <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-4 px-6 md:px-8 lg:px-6'>
            <div className='flex items-center gap-4'>
              <h2 className='text-2xl font-bold'>All Users</h2>
              <div className='relative ml-4'>
                <input
                  type='text'
                  placeholder='Search for...'
                  className='bg-transparent border border-gray-300 dark:border-[#5F5F5F] rounded-lg py-2 px-10 text-black dark:text-white w-[160px] md:w-[320px] focus:outline-none focus:ring-1 focus:ring-[#7B99FF]'
                  value={globalFilter}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                />
                <div className='absolute inset-y-0 left-3 flex items-center'>
                  <FiSearch className='text-gray-400' />
                </div>
              </div>
            </div>

            <div className='text-sm text-gray-500 dark:text-gray-400'>
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
            <div className='w-full'>
              <div className='min-w-full'>
                <Table className='w-full mt-1'>
                  <thead className='border-t border-gray-200 dark:border-[#5F5F5F]'>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id} className='border-b border-gray-200 dark:border-[#5F5F5F]'>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead
                              key={header.id}
                              className={`px-4 text-gray-700 dark:text-white ${
                                (header.column.columnDef.meta as ColumnMeta)?.className || ''
                              }`}
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
                          className={`border-b border-gray-200 dark:border-[#5F5F5F] ${
                            index % 2 === 0 ? 'bg-gray-50 dark:bg-[#1A1A1A]' : 'bg-white dark:bg-[#121212]'
                          }`}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className='px-4 py-4'>
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

      {/* Unified Pagination */}
      <div className='mt-4'>
        <div className='grid grid-cols-3 items-center gap-2 justify-between'>
          <div className='text-sm md:text-base text-gray-700 dark:text-[#FFFFFF]'>
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} -{' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length,
            )}{' '}
            of {table.getFilteredRowModel().rows.length}
          </div>

          <div className='flex items-center justify-center'>
            <p className='text-sm md:text-base text-gray-700 dark:text-[#FFFFFF] mr-1'>
              <span className='hidden md:inline'>Rows per page:</span>
              <span className='inline md:hidden'>Rows:</span>
            </p>
            <Select onValueChange={(value) => table.setPageSize(+value)}>
              <SelectTrigger className='h-8 w-[70px] border-gray-300 dark:border-[#5F5F5F] bg-white dark:bg-[#212121] text-black dark:text-white'>
                <SelectValue placeholder={table.getState().pagination.pageSize} />
              </SelectTrigger>
              <SelectContent className='bg-white dark:bg-[#212121] text-black dark:text-white border-gray-300 dark:border-[#5F5F5F]'>
                {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className='flex items-center gap-2 justify-end'>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className='border-gray-300 dark:border-[#5F5F5F] w-8 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#1A1A1A]'
            >
              <IoArrowBack className='h-4 w-4' color='#7B99FF' />
            </Button>
            <Button
              variant='outline'
              size='sm'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className='border-gray-300 dark:border-[#5F5F5F] w-8 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#1A1A1A]'
            >
              <IoArrowForward className='h-4 w-4' color='#7B99FF' />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

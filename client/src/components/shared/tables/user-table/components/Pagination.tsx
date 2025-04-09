import {Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from '@/components/ui';
import {IoArrowBack, IoArrowForward} from 'react-icons/io5';
import {Table} from '@tanstack/react-table';

export const Pagination = <TData,>({table}: {table: Table<TData>}) => {
  return (
    <div className='mt-4'>
      <div
        className='grid grid-cols-3 md:grid-cols-2 items-center gap-2 justify-between'
        data-testid='pagination-container'
      >
        <div className='text-sm md:text-base text-gray-700 dark:text-[#FFFFFF]' data-testid='page-counter'>
          {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} -{' '}
          {Math.min(
            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
            table.getFilteredRowModel().rows.length,
          )}{' '}
          of {table.getFilteredRowModel().rows.length}
        </div>

        {/* En móvil: centrado en la segunda columna */}
        {/* En md y lg: junto a los botones de navegación */}
        <div className='flex items-center md:hidden justify-center' data-testid='rows-per-page-mobile'>
          <p className='text-sm text-gray-700 dark:text-[#FFFFFF] mr-1'>
            <span className='inline'>Rows:</span>
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

        <div className='flex items-center gap-2 justify-end col-span-1 md:col-span-1' data-testid='navigation-buttons'>
          <div className='hidden md:flex items-center mr-4' data-testid='rows-per-page-desktop'>
            <p className='text-base text-gray-700 dark:text-[#FFFFFF] mr-1'>Rows per page:</p>
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
  );
};

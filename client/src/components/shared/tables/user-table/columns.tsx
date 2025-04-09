'use client';

import Image from 'next/image';
import {ColumnDef} from '@tanstack/react-table';
import {Button, Checkbox} from '@/components/ui';
import {User} from '@/interfaces/user.interface';
import {CONFIG} from '@/config/config';

import {BiSolidPhone} from 'react-icons/bi';
import {FaUser} from 'react-icons/fa';
import {IoIosCheckbox} from 'react-icons/io';
import {IoLocationSharp} from 'react-icons/io5';
import {TbBriefcase2Filled} from 'react-icons/tb';
import {RxCaretSort} from 'react-icons/rx';

export type UserColumns = User;

export const columns: ColumnDef<UserColumns>[] = [
  {
    id: 'select',
    header: ({table}) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({row}) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({column}) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        <div className='flex items-center gap-2'>
          <FaUser className='h-4 w-4' />
          <span className='font-bold'>Name</span>
        </div>
        <RxCaretSort className=' h-4 w-4' />
      </Button>
    ),
    cell: ({row}) => {
      const user = row.original;
      // Generar un número aleatorio entre 1 y 5
      const randomImageId = Math.floor(Math.random() * 5) + 1;
      return (
        <div className='flex items-center gap-2 pl-1'>
          <div className='relative h-8 w-8 flex-shrink-0'>
            <Image
              src={`/images/${randomImageId}.png`}
              alt={user.name}
              className='rounded-full object-cover'
              fill
              sizes='40px'
            />
          </div>
          <div className='min-w-0 flex-1'>
            <p className='text-xs md:text-xs md:font-normal truncate'>{user.name}</p>
            <p className='text-xs md:text-xs md:font-normal text-gray-400 truncate'>{user.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'phone',
    header: ({column}) => (
      <div className='hidden md:flex md:w-16 lg:w-full md:justify-center md:-ml-4 lg:-ml-8'>
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <div className='hidden md:flex items-center gap-2'>
            <BiSolidPhone className='h-4 w-4' />
            <span className='font-bold'>Phone</span>
          </div>
          <RxCaretSort className='hidden md:flex h-4 w-4' />
        </Button>
      </div>
    ),
    cell: ({row}) => {
      return <div className='hidden md:table-cell md:text-xs md:font-normal'>{row.getValue('phone')}</div>;
    },
    meta: {
      className: 'hidden md:table-cell',
    },
  },
  {
    accessorKey: 'location',
    header: ({column}) => (
      <div className='hidden md:flex md:w-16 lg:w-full md:justify-center lg:justify-start md:-ml-6 lg:-ml-5'>
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <div className='hidden md:flex items-center gap-2'>
            <IoLocationSharp className='h-4 w-4' />
            <span className='font-bold'>Location</span>
          </div>
          <RxCaretSort className='hidden md:flex h-4 w-4' />
        </Button>
      </div>
    ),
    cell: ({row}) => {
      return <div className='hidden md:table-cell md:text-xs md:font-normal'>{row.getValue('location')}</div>;
    },
    meta: {
      className: 'hidden md:table-cell',
    },
  },
  {
    accessorKey: 'company',
    header: ({column}) => (
      <div className='hidden md:flex md:w-16 lg:w-full md:justify-center lg:justify-start lg:-ml-5'>
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <div className='hidden md:flex items-center gap-2'>
            <TbBriefcase2Filled className='h-4 w-4' />
            <span className='font-bold hidden md:block'>Company</span>
          </div>
          <RxCaretSort className='hidden md:flex h-4 w-4' />
        </Button>
      </div>
    ),
    cell: ({row}) => {
      const company = row.getValue('company') as string | undefined;

      // Asegurarse de que company no sea undefined antes de llamar a toLowerCase
      const companySlug = company ? company.toLowerCase().replace(/\s+/g, '') : '';

      const hasLogo = company && CONFIG.LOGOS.includes(companySlug);
      const logoPath = hasLogo ? `/icons/company/${companySlug}.svg` : '';

      return (
        <div className='hidden md:flex items-center gap-2 md:text-xs md:font-normal md:-ml-5 lg:ml-0'>
          {hasLogo && (
            <div className='relative h-5 w-5 flex-shrink-0'>
              <Image src={logoPath} alt={`${company} logo`} className='object-contain' fill sizes='20px' />
            </div>
          )}
          <span className='hidden md:block md:text-xs md:font-normal'>{company}</span>
        </div>
      );
    },
    meta: {
      className: 'hidden md:table-cell',
    },
  },
  {
    accessorKey: 'status',
    header: ({column}) => (
      <div className='md:w-8 lg:w-full md:flex md:justify-center lg:justify-start -ml-36 md:ml-4 lg:-ml-5'>
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          <div className='items-center gap-2 hidden md:flex'>
            <IoIosCheckbox className='h-4 w-4' />
            <span className='font-bold'>Status</span>
          </div>
          <RxCaretSort className='h-4 w-4 hidden md:flex' />
        </Button>
      </div>
    ),
    cell: ({row}) => {
      const status = row.getValue('status') as string;
      return (
        <div
          className={`-ml-28 md:-ml-5 lg:ml-0 px-1 py-0.5 md:px-2 md:py-1 rounded-md text-[10px] md:text-xs inline-flex items-center gap-0.5 md:gap-1 ${
            status === 'Online' ? 'bg-green-900 text-green-500' : 'bg-gray-700 text-gray-400'
          }`}
        >
          <span className='h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-current'></span>
          <span className='md:text-xs md:font-normal'>{status}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: () => null,
    header: () => <div className='hidden md:table-cell'>Actions</div>,
  },
];

'use client';

import {ColumnDef} from '@tanstack/react-table';
import {BiSolidPhone} from 'react-icons/bi';
import {FaUser} from 'react-icons/fa';
import {IoIosCheckbox} from 'react-icons/io';
import {IoLocationSharp} from 'react-icons/io5';
import {TbBriefcase2Filled} from 'react-icons/tb';
import {FiEdit, FiTrash2} from 'react-icons/fi';
import Image from 'next/image';
import {User} from '@/interfaces/user.interface';
import {Button, Checkbox} from '@/components/ui';
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
      return (
        <div className='flex items-center gap-3'>
          <div className='relative h-10 w-10'>
            <Image
              src={`https://ui-avatars.com/api/?name=${user.name.replace(' ', '+')}&background=4B5563&color=fff`}
              alt={user.name}
              className='rounded-full object-cover'
              fill
              sizes='40px'
            />
          </div>
          <div>
            <p className='font-medium'>{user.name}</p>
            <p className='text-sm text-gray-400'>{user.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'phone',
    header: ({column}) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        <div className='flex items-center gap-2'>
          <BiSolidPhone className='h-4 w-4' />
          <span className='font-bold'>Phone</span>
        </div>
        <RxCaretSort className='h-4 w-4' />
      </Button>
    ),
    cell: ({row}) => {
      return <div>{row.getValue('phone')}</div>;
    },
    meta: {
      className: 'hidden md:table-cell',
    },
  },
  {
    accessorKey: 'location',
    header: ({column}) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        <div className='flex items-center gap-2'>
          <IoLocationSharp className='h-4 w-4' />
          <span className='font-bold'>Location</span>
        </div>
        <RxCaretSort className='h-4 w-4' />
      </Button>
    ),
    cell: ({row}) => {
      return <div>{row.getValue('location')}</div>;
    },
    meta: {
      className: 'hidden md:table-cell',
    },
  },
  {
    accessorKey: 'company',
    header: ({column}) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        <div className='flex items-center gap-2'>
          <TbBriefcase2Filled className='h-4 w-4' />
          <span className='font-bold'>Company</span>
        </div>
        <RxCaretSort className='h-4 w-4' />
      </Button>
    ),
    cell: ({row}) => {
      return <div>{row.getValue('company')}</div>;
    },
    meta: {
      className: 'hidden md:table-cell',
    },
  },
  {
    accessorKey: 'status',
    header: ({column}) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        <div className='items-center gap-2 hidden md:flex'>
          <IoIosCheckbox className='h-4 w-4' />
          <span className='font-bold'>Status</span>
        </div>
        <RxCaretSort className='h-4 w-4 hidden md:flex' />
      </Button>
    ),
    cell: ({row}) => {
      const status = row.getValue('status') as string;
      return (
        <div
          className={`px-2 py-1 rounded-md text-xs inline-flex items-center gap-1 ${
            status === 'Online' ? 'bg-green-900 text-green-500' : 'bg-gray-700 text-gray-400'
          }`}
        >
          <span className='h-2 w-2 rounded-full bg-current'></span>
          <span>{status}</span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className='text-right font-bold hidden md:block'>Actions</div>,
    cell: ({row}) => {
      return (
        <div className='flex justify-end gap-2'>
          <button
            onClick={() => console.log('Edit user', row.original.id)}
            className='p-2 text-gray-400 hover:text-white transition-colors'
          >
            <FiEdit size={18} />
          </button>
          <button
            onClick={() => console.log('Delete user', row.original.id)}
            className='p-2 text-gray-400 hover:text-white transition-colors'
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      );
    },
  },
];
